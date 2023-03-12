import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MusicPlayerControlsComponent } from './components/music-player-controls/music-player-controls.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { WaveformCommentsComponent } from './components/waveform-comments/waveform-comments.component';

import {
  LoopButtonComponent,
  PlayButtonComponent,
  ResizeButtonComponent,
} from './components/_buttons';

import {
  PlayControlsComponent,
  VolumeControlsComponent,
  ZoomControlsComponent,
} from './components/_controls';

import { LoaderComponent } from './components/_other';

import {
  TrackComponent,
  TrackCoverComponent,
  TrackTimeComponent,
  TrackTitleComponent,
} from './components/_track';

import { MusicPlayerComponent } from './music-player.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    MusicPlayerComponent,

    // Controls
    MusicPlayerControlsComponent,
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
    PlayButtonComponent,
  ],
  exports: [MusicPlayerComponent],
})
export class MusicPlayerModule {}
