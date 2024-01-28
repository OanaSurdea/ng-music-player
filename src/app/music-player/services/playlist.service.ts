import { Injectable, WritableSignal, signal } from '@angular/core';
import WaveSurfer from 'wavesurfer.js/src/wavesurfer';
import { Track } from '../types/interfaces';

@Injectable({ providedIn: 'root' })
export class PlaylistService {

  playlist: WritableSignal<Track[]> = signal([]);

  playTrack(wave: WaveSurfer, track: Track): void {
    if (!wave && !track) return;
    if (wave && wave.isPlaying()) wave.stop();

    wave.load(track.url);
    wave.on('ready', () => wave.play());
  }

}
