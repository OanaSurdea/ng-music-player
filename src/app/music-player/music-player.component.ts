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
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Track } from './_types/interfaces';
import { PlayTypeEnum } from './_types/enums';
import { fadeAnimation } from '../shared/animations';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
  animations: [fadeAnimation],
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
  isMinimized$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  iterableRegions: Region[] = [];

  // WaveSurfer
  wave: WaveSurfer | null = null;

  private destroy$: Subject<void> = new Subject<void>();

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
      this.wave?.setWaveColor(
        c['showDarkMode']?.currentValue ? '#4f5963' : '#e0e0e0'
      );
  }

  ngOnInit() {
    this.isMinimized$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: boolean) => this.wave.setHeight(46));
  }

  // Child Events
  handleIsMuteChange(value: boolean) {
    this.wave?.setMute(value);
  }

  handleVolumeChange(value: number) {
    if (this.wave && value) {
      this.volume = value <= 0 ? 0 : value;
      this.wave.setMute(this.volume <= 0);
      this.wave.setVolume(this.volume);
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
        this.wave?.playPause();
        break;

      case PlayTypeEnum.PlayNext:
        const nextTrack: Track = tracks[currentIdx + 1] || tracks[0];
        this.handleTrackChange(nextTrack);
        break;
    }
  }

  handleTrackChange(track: Track) {
    if (!this.wave || !track) return;

    this.selectedTrack$.next(track);

    this._reloadTrack();
    this._reloadWave();

    this.wave.on('ready', (e) => this.handlePlay(PlayTypeEnum.PlayPause));
  }

  handleMinimizeChange() {
    this.isMinimized$.next(!this.isMinimized$.value);
    setTimeout(() => this.wave?.drawBuffer(), 400);
  }

  handleRegionCommentClick(region: Region) {
    if (this.wave) {
      region.attributes.active = 'true';
      this.wave.play(region.start, region.end);
    }
  }

  // Inits
  private _initWave(regions?: RegionParams[], markers?: MarkerParams[]): void {
    this.wave = this._musicPlayerService.createWave(
      regions,
      markers,
      this.showDarkMode
    );
    this.iterableRegions = Object.values(this.wave.regions.list);
    this._initWaveEventHandlers();
  }

  private _initWaveEventHandlers(): void {
    // Region Events
    this.wave?.on('region-click', (region: Region) => region.play());

    this.wave?.on('region-click', (region: Region, event: Event) => {
      event.stopPropagation();
      region.attributes.active = 'true';
      region.play();
    });

    // Progress events
    this.wave.on('ready', (e) => {
      this.trackDuration$.next(convertToSeconds(this.wave.getDuration()));
      this.wave.setVolume(this.volume);
    });

    this.wave.on('audioprocess', (ms: number) => {
      this.trackProgress$.next(convertToSeconds(ms));
      this._cdRef.detectChanges();
    });

    this.wave.on('seek', (ms: number) => {
      this.trackProgress$.next(
        convertToSeconds((ms *= this.wave.getDuration()))
      );
    });
  }

  private _reloadWave(): void {
    this.wave?.destroy();
    this._initWave(this.selectedTrack.regions, this.selectedTrack.markers);
    this.wave?.load(this.selectedTrack.url);
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
    this.wave?.destroy();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
