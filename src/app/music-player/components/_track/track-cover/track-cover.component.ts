import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-track-cover',
  templateUrl: './track-cover.component.html',
  styleUrls: ['./track-cover.component.scss'],
})
export class TrackCoverComponent implements OnInit {
  @Input() imageUrl: string;

  constructor() {}

  ngOnInit() {}
}
