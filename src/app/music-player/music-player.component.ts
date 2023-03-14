import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import WaveSurfer from 'wavesurfer.js/src/wavesurfer.js';
import {
  Region,
  RegionParams,
} from 'wavesurfer.js/src/plugin/regions';
import {
  MarkerParams,
} from 'wavesurfer.js/src/plugin/markers';
import { MusicPlayerService } from './services/music-player.service';
import { convertToSeconds } from './helpers/convert-to-seconds.helper';
import { PlaylistService } from './services/playlist.service';
import { BehaviorSubject, Subject, takeUntil, distinctUntilChanged } from 'rxjs';
import { Track } from './_types/interfaces';
import { PlayTypeEnum } from './_types/enums';
import { fadeAnimation } from '../shared/animations';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
  animations: [fadeAnimation],
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
  // Selected Track
  @Input() tracks$: BehaviorSubject<Track[]> = new BehaviorSubject(null);
  @Input() set tracks(v: Track[]) { this.tracks$.next(v); }

  selectedTrack$: BehaviorSubject<Track | null> = new BehaviorSubject(null);

  @Input() showComments$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  @Input() set showComments(v: boolean) { this.showComments$.next(v); }

  @Input() showDarkMode$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  @Input() set showDarkMode(v: boolean) { this.showDarkMode$.next(v); }

  // Settings
  trackProgress$: BehaviorSubject<string> = new BehaviorSubject('0:00');
  trackDuration$: BehaviorSubject<string> = new BehaviorSubject('0:00');
  volume$: BehaviorSubject<number> = new BehaviorSubject(0.5);

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

  ngOnInit() {
    this.showDarkMode$
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((value: boolean) => this.wave?.setWaveColor(value ? '#4f5963' : '#e0e0e0')
      );

    this.isMinimized$
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((_value: boolean) => this.wave?.setHeight(46));

    this.tracks$
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (tracks: Track[]) => {
          this._playlistService.playlist = tracks;
          this.selectedTrack$.next(tracks[0]);
          this._reloadTrack();
          this._reloadWave();
        }
      );

    this.selectedTrack$
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (_selectedTrack: Track) => {
          this._reloadTrack();
          this._reloadWave();
        }
      );
  }

  // Child Events
  handleIsMuteChange(value: boolean) {
    this.wave?.setMute(value);
  }

  handleVolumeChange(value: number) {
    if (this.wave && value) {
      this.volume$.next(value <= 0 ? 0 : value);
      this.wave.setMute(this.volume$.value <= 0);
      this.wave.setVolume(this.volume$.value);
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
      this.showDarkMode$.value
    );
    this.iterableRegions = Object.values(this.wave?.regions?.list);
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
      this.wave.setVolume(this.volume$.value);
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
    const selectedTrack: Track | null = this.selectedTrack$.value;

    if(!selectedTrack) return;

    this.wave?.destroy();
    this._initWave(selectedTrack.regions, selectedTrack.markers);
    this.wave?.load(selectedTrack.url);
  }

  private _reloadTrack(): void {
    const selectedTrack: Track | null = this.selectedTrack$.value;

    this.selectedTrack$.next(selectedTrack);
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
