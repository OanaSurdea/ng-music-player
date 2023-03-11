import { Injectable, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import WaveSurfer from 'wavesurfer.js/src/wavesurfer';
import { Track } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class PlaylistService {
  _playlist$: BehaviorSubject<Track[]> = new BehaviorSubject([]);

  get playlist(): Track[] {
    return this._playlist$.value;
  }

  set playlist(value: Track[]) {
    this._playlist$.next(value);
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
