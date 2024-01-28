import { NgForOf } from '@angular/common';
import { Component, EventEmitter, InputSignal, Output, input } from '@angular/core';
import { Track } from '../../../types/interfaces';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent {

  tracks: InputSignal<Track[]> = input.required();
  selectedTrack: InputSignal<Track> = input.required();

  @Output() readonly onSelectedTrackChange: EventEmitter<Track> = new EventEmitter();

}
