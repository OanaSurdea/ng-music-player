import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { LoopButtonComponent } from './components/loop-button/loop-button.component';
import { PlayControlsComponent } from './components/play-controls/play-controls.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { ResizeButtonComponent } from './components/resize-button/resize-button.component';
import { TrackCoverComponent } from './components/track-cover/track-cover.component';
import { TrackTimeComponent } from './components/track-time/track-time.component';
import { TrackTitleComponent } from './components/track-title/track-title.component';
import { TrackComponent } from './components/track/track.component';
import { VolumeControlsComponent } from './components/volume-controls/volume-controls.component';
import { WaveformCommentsComponent } from './components/waveform-comments/waveform-comments.component';
import { ZoomControlsComponent } from './components/zoom-controls/zoom-controls.component';
import { MusicPlayerComponent } from './music-player.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    MusicPlayerComponent,

    // Controls
    ZoomControlsComponent,
    VolumeControlsComponent,
    PlayControlsComponent,
    LoopButtonComponent,

    // Track
    TrackComponent,
    TrackCoverComponent,
    TrackTimeComponent,
    TrackTitleComponent,

    // Sections
    PlaylistComponent,
    WaveformCommentsComponent,

    // Other
    LoaderComponent,
    ResizeButtonComponent,
  ],
  exports: [MusicPlayerComponent],
})
export class MusicPlayerModule {}
