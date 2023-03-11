import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-track-time',
  templateUrl: './track-time.component.html',
  styleUrls: ['./track-time.component.scss'],
})
export class TrackTimeComponent implements OnInit {
  @Input() time: string;

  constructor() {}

  ngOnInit() {}
}
