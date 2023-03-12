import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Track } from '../../../_types/interfaces';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
})
export class TrackComponent implements OnInit {
  @Input() selectedTrack$: BehaviorSubject<Track>;
  @Input() currentTime: string;
  @Input() duration: string;
  @Input() isLoading: boolean;

  constructor() {}

  ngOnInit() {}
}
