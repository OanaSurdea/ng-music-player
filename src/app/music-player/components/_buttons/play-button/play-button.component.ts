import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.scss'],
})
export class PlayButtonComponent implements OnInit {
  @Input() readonly title: string;
  @Input() readonly icon: string;
  @Input() readonly classes: string;
  @Output() readonly onClick: EventEmitter<null> = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
