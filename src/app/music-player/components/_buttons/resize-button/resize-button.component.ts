import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-resize-button',
  templateUrl: './resize-button.component.html',
  styleUrls: ['./resize-button.component.scss'],
})
export class ResizeButtonComponent implements OnInit {
  @Input() readonly isMinimized: boolean;
  @Output() readonly onMinimize: EventEmitter<null> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  toggleMinimize(): void {
    this.onMinimize.emit();
  }
}
