import { ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-zoom-controls',
  templateUrl: './zoom-controls.component.html',
  styleUrls: ['./zoom-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZoomControlsComponent {
  @Input() readonly zoom: number;
  @Output() readonly onZoomChange: EventEmitter<number> = new EventEmitter();

  constructor() {}

  zoomChange(value: number) {
    this.onZoomChange.emit(value);
  }
}
