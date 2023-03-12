import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
})
export class TrackComponent implements OnInit {
  @Input() currentTime: string;
  @Input() duration: string;
  @Input() isLoading: boolean = true;

  constructor() {}

  ngOnInit() {}
}
