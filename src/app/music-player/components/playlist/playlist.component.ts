import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Track } from '../../interfaces';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  @Input() readonly selectedTrack: Track = null;
  @Input() readonly tracks: Track[] = [];
  public selectedTrackId: number | null = null;

  @Output() readonly onTrackChange: EventEmitter<Track> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  trackChange(track: Track) {
    this.selectedTrackId = track.id;
    this.onTrackChange.emit(track);
  }
}
