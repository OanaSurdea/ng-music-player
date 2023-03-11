import { Injectable } from '@angular/core';
import WaveSurfer from 'wavesurfer.js/src/wavesurfer';
import { Track } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class PlaylistService {
  private _playlist: Track[] = [];

  public get playlist(): Track[] {
    return this._playlist;
  }

  public set playlist(playlist: Track[]) {
    this._playlist = playlist;
  }

  constructor() {}

  playTrack(wave: WaveSurfer, track: Track) {
    if (!wave && !track) return;

    if (wave && wave.isPlaying()) {
      wave.stop();
    }

    wave.load(track.url);
    wave.on('ready', () => wave.play());
  }
}
