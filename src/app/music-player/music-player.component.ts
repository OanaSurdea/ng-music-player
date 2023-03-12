import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import WaveSurfer from 'wavesurfer.js/src/wavesurfer.js';
import {
  Region,
  RegionParams,
  RegionsPluginParams,
} from 'wavesurfer.js/src/plugin/regions';
import {
  MarkerParams,
  MarkersPluginParams,
} from 'wavesurfer.js/src/plugin/markers';
import { MusicPlayerService } from './services/music-player.service';
import { convertToSeconds } from './helpers/convert-to-seconds.helper';
import { PlaylistService } from './services/playlist.service';
import { BehaviorSubject } from 'rxjs';
import { Track } from './_types/interfaces';
import { PlayTypeEnum } from './_types/enums';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
})
export class MusicPlayerComponent implements OnChanges, OnInit, OnDestroy {
  // Selected Track
  selectedTrack$: BehaviorSubject<Track | null> = new BehaviorSubject(null);

  get selectedTrack(): Track | null {
    return this.selectedTrack$.getValue();
  }

  @Input() set selectedTrack(value: Track) {
    this.selectedTrack$.next(value);
  }

  tracks$: BehaviorSubject<Track[]> = new BehaviorSubject(null);

  // Tracks
  get tracks(): Track[] {
    return this.tracks$.getValue();
  }

  @Input() set tracks(value: Track[]) {
    this.tracks$.next(value);
  }

  @Input() readonly showComments: boolean = true;
  @Input() readonly showDarkMode: boolean = false;

  // Settings
  trackProgress$: BehaviorSubject<string> = new BehaviorSubject('0:00');
  trackDuration$: BehaviorSubject<string> = new BehaviorSubject('0:00');
  volume: number = 0.5;

  // Helpers
  isMuted$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isPlaying$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isLooping$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  isMinimized$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  iterableRegions: Region[] = [];

  // WaveSurfer
  private _wave: WaveSurfer | null = null;

  constructor(
    private _musicPlayerService: MusicPlayerService,
    private _playlistService: PlaylistService,
    private _cdRef: ChangeDetectorRef
  ) {}

  ngOnChanges(c: SimpleChanges): void {
    const didTracksChange = this._didInputChange(c, 'tracks');
    const didSelectedTrackChange = this._didInputChange(c, 'selectedTrack');
    const didShowDarkModeChange = this._didInputChange(c, 'showDarkMode');

    if (didTracksChange)
      this._playlistService.playlist = c['tracks']?.currentValue;

    if (didTracksChange || didSelectedTrackChange) {
      this._reloadTrack();
      this._reloadWave();
    }

    if (didShowDarkModeChange)
      this._wave?.setWaveColor(
        c['showDarkMode']?.currentValue ? '#4f5963' : '#e0e0e0'
      );
  }

  ngOnInit() {}

  // Child Events
  handleIsMuteChange() {
    if (this._wave) {
      this.isMuted$.next(!this.isMuted$.value);
      this._wave.setMute(this.isMuted$.value);
    }
  }

  handleIsLoopingChange() {
    if (this._wave) this.isLooping$.next(!this.isLooping$.value);
  }

  handleVolumeChange(value: number) {
    if (this._wave && value) {
      this.volume = value <= 0 ? 0 : value;
      this.isMuted$.next(this.volume <= 0);
      this._wave.setVolume(this.volume);
    }
  }

  handlePlay(type: PlayTypeEnum) {
    const tracks = this.tracks$.value;
    const currentIdx = tracks.indexOf(this.selectedTrack$.value);

    switch (type) {
      case PlayTypeEnum.PlayPrevious:
        const lastIndex: number = tracks.length - 1;
        const prevTrack: Track = tracks[currentIdx - 1] || tracks[lastIndex];
        this.handleTrackChange(prevTrack);
        break;

      case PlayTypeEnum.PlayPause:
        this._wave?.playPause();
        break;

      case PlayTypeEnum.PlayNext:
        const nextTrack: Track = tracks[currentIdx + 1] || tracks[0];
        this.handleTrackChange(nextTrack);
        break;
    }
  }

  handleTrackChange(track: Track) {
    if (!this._wave || !track) return;

    this.selectedTrack$.next(track);

    this._reloadTrack();
    this._reloadWave();

    this._wave.on('ready', (e) => this.handlePlay(PlayTypeEnum.PlayPause));
  }

  handleMinimizeChange() {
    this.isMinimized$.next(!this.isMinimized$.value);
    setTimeout(() => this._wave?.drawBuffer(), 400);
  }

  handleRegionCommentClick(region: Region) {
    if (this._wave) {
      region.attributes.active = 'true';
      this._wave.play(region.start, region.end);
    }
  }

  // Inits
  private _initWave(regions?: RegionParams[], markers?: MarkerParams[]): void {
    this._wave = this._musicPlayerService.createWave(
      regions,
      markers,
      this.showDarkMode
    );
    this.iterableRegions = Object.values(this._wave.regions.list);
    this._initWaveEventHandlers();
  }

  private _initWaveEventHandlers(): void {
    // Region Events
    this._wave?.on('region-click', (region: Region) => region.play());

    this._wave?.on('region-click', (region: Region, event: Event) => {
      event.stopPropagation();
      region.attributes.active = 'true';
      region.play();
    });

    // Progress events
    this._wave.on('ready', (e) => {
      this.trackDuration$.next(convertToSeconds(this._wave.getDuration()));
      this._wave.setVolume(this.volume);
      this.isLoading$.next(false);
    });

    this._wave.on('audioprocess', (e) => {
      this.trackProgress$.next(convertToSeconds(e));
      this._cdRef.detectChanges();
    });

    this._wave.on('seek', (e) => {
      this.trackProgress$.next(
        convertToSeconds((e *= this._wave.getDuration()))
      );

      console.log(this._wave);
      console.log(this._wave.isPlaying());

      console.log(this._wave.getVolume());
    });

    this._wave.on('loading', (e) => this.isLoading$.next(true));
    this._wave.on('play', (e) => this.isPlaying$.next(true));
    this._wave.on('pause', (e) => this.isPlaying$.next(false));

    this._wave?.on('finish', () => {
      if (this.isLooping$.value) return this._wave?.play();

      this.isPlaying$.next(false);
      this._cdRef.detectChanges();
    });
  }

  private _reloadWave(): void {
    this._wave?.destroy();
    this._initWave(this.selectedTrack.regions, this.selectedTrack.markers);
    this._wave?.load(this.selectedTrack.url);
  }

  private _reloadTrack(): void {
    this.selectedTrack$.next(this.selectedTrack || this.tracks[0]);
    this.trackProgress$.next('0:00');
  }

  private _didInputChange(c: SimpleChanges, inputName: string): boolean {
    return (
      c[inputName]?.firstChange ||
      c[inputName]?.currentValue !== c[inputName]?.previousValue
    );
  }

  ngOnDestroy() {
    this._wave?.destroy();
  }
}
