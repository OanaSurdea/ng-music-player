import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-track-title',
  templateUrl: './track-title.component.html',
  styleUrls: ['./track-title.component.scss'],
})
export class TrackTitleComponent implements OnInit {
  @Input() title: string;
  @Input() artist: string;

  constructor() {}

  ngOnInit() {}
}
