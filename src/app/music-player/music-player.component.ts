import WaveSurfer from 'wavesurfer.js/src/wavesurfer.js';
import { Component, Input, InputSignal, OnDestroy, OnInit, WritableSignal, effect, input, signal } from '@angular/core';
import { Region, RegionParams } from 'wavesurfer.js/src/plugin/regions';
import { MarkerParams } from 'wavesurfer.js/src/plugin/markers';
import { MusicPlayerService } from './services/music-player.service';
import { convertToSeconds } from './helpers/convert-to-seconds.helper';
import { PlaylistService } from './services/playlist.service';
import { BehaviorSubject, Subject, takeUntil, distinctUntilChanged } from 'rxjs';
import { Track } from './types/interfaces';
import { PlayTypeEnum } from './types/enums';
import { fadeAnimation } from '../shared/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoopButtonComponent, ResizeButtonComponent } from './components/_buttons';
import { VolumeControlsComponent, PlayControlsComponent } from './components/_controls';
import { PlaylistComponent } from './components/_sections/playlist/playlist.component';
import { TrackComponent } from './components/_sections/track/track.component';
import { WaveCommentsComponent } from './components/_sections/wave-comments/wave-comments.component';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    // Controls
    LoopButtonComponent,
    VolumeControlsComponent,
    PlayControlsComponent,

    // Track
    TrackComponent,

    // Sections
    PlaylistComponent,
    WaveCommentsComponent,

    // Other
    ResizeButtonComponent,
  ],
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
  animations: [fadeAnimation],
})
export class MusicPlayerComponent implements OnInit, OnDestroy {

  // Tracks
  @Input() set tracks(value: Track[]) { this.tracks$.next(value); }
  tracks$: BehaviorSubject<Track[]> = new BehaviorSubject(null);
  selectedTrack: WritableSignal<Track> = signal(null);

  // Preferences
  @Input() isMinimized(value: boolean) { this.isMinimized$.next(value) }
  isMinimized$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  showComments: InputSignal<boolean> = input(false);
  showDarkMode: InputSignal<boolean> = input.required();
  volume: InputSignal<number> = input(1.5);

  // Settings
  trackProgress: WritableSignal<string> = signal('0:00');
  trackDuration: WritableSignal<string> = signal('0:00');

  // WaveSurfer
  wave: WaveSurfer | null = null;
  trackIterableRegions: WritableSignal<Region[]> = signal([]);

  // Handlers
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _musicPlayerService: MusicPlayerService,
    private _playlistService: PlaylistService,
  ) { }

  // Hooks -------------------------------------------------------------------

  ngOnInit() {
    this._watchInputChanges();
  }

  ngOnDestroy() {
    this.wave?.destroy();
    this._destroy$.next();
    this._destroy$.complete();
    this._showDarkModeEffect.destroy();
  }

  // Child Events
  handleIsMutedChange(value: boolean) {
    this.wave?.setMute(value);
  }

  handleVolumeChange(value: number) {
    this.wave?.setMute(value === 0);
    this.wave?.setVolume(value);
  }

  handlePlay(type: PlayTypeEnum) {
    const tracks = this.tracks$.value;
    const currentIdx = tracks.indexOf(this.selectedTrack());
    const prevTrack: Track = tracks[currentIdx - 1] || tracks[tracks.length - 1];
    const nextTrack: Track = tracks[currentIdx + 1] || tracks[0];

    switch (type) {
      case PlayTypeEnum.PlayPrevious:
        return this.handleSelectedTrackChange(prevTrack);

      case PlayTypeEnum.PlayPause:
        return this.wave?.playPause();

      case PlayTypeEnum.PlayNext:
        return this.handleSelectedTrackChange(nextTrack);
    }
  }

  handleSelectedTrackChange(track: Track) {
    if (!this.wave || !track) return;

    this.selectedTrack.set(track);
    this._reloadWave();

    this.wave.on('ready', () => this.handlePlay(PlayTypeEnum.PlayPause));
  }

  handleIsMinimizedChange() {
    this.isMinimized$.next(!this.isMinimized$.value);
    setTimeout(() => this.wave?.drawBuffer(), 400);
  }

  handleRegionCommentClick(region: RegionParams) {
    if (!this.wave) return;

    region.attributes.active = 'true';
    this.wave.play(region.start, region.end);
  }

  // Inits -------------------------------------------------------------------

  private _initWave(regions?: RegionParams[], markers?: MarkerParams[]): void {
    this.wave = this._musicPlayerService.createWave(regions, markers, this.showDarkMode());
    this.trackIterableRegions.set(Object.values(this.wave?.regions?.list));
    this._initWaveEventHandlers();
  }

  private _initWaveEventHandlers(): void {
    if (!this.wave) return;

    // Region events
    this.wave.on('region-click', (region: Region, event: Event) => {
      event.stopPropagation();
      region.attributes.active = 'true';
      region.play();
    });

    // Progress events
    this.wave.on('ready', () => {
      this.trackDuration.set(convertToSeconds(this.wave.getDuration()));
      this.wave.setVolume(this.volume());
      this.wave.setMute(!this.volume());
    });

    this.wave.on('audioprocess', (ms: number) =>
      this.trackProgress.set(convertToSeconds(ms))
    );

    this.wave.on('seek', (ms: number) =>
      this.trackProgress.set(convertToSeconds((ms *= this.wave.getDuration())))
    );
  }

  // Effects -----------------------------------------------------------------

  private _showDarkModeEffect = effect(() =>
    this.wave?.setWaveColor(this.showDarkMode() ? '#4f5963' : '#e0e0e0')
  );

  // Other -------------------------------------------------------------------

  private _reloadWave(): void {
    if (!this.selectedTrack()) return;
    const { regions, markers, url } = this.selectedTrack();

    this.trackProgress.set('0:00');
    this.trackDuration.set('0:00');

    this.wave?.destroy();
    this._initWave(regions, markers);
    this.wave?.load(url);
  }

  private _watchInputChanges(): void {
    this.isMinimized$
      .pipe(
        distinctUntilChanged(),
        takeUntil(this._destroy$)
      )
      .subscribe(() => this.wave?.setHeight(46));

    this.tracks$
      .pipe(
        distinctUntilChanged(),
        takeUntil(this._destroy$)
      )
      .subscribe((tracks: Track[]) => {
        this._playlistService.playlist.set(tracks);
        this.selectedTrack.set(tracks[0]);
        this._reloadWave();
      });
  }

}
