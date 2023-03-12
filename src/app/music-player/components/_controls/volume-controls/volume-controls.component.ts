import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-volume-controls',
  templateUrl: './volume-controls.component.html',
  styleUrls: ['./volume-controls.component.scss'],
})
export class VolumeControlsComponent {
  @Input() readonly isMuted: boolean = false;
  @Input() readonly volume: number = 0;

  @Output() readonly onVolumeChange: EventEmitter<number> = new EventEmitter();
  @Output() readonly onIsMuteChange: EventEmitter<null> = new EventEmitter();

  constructor() {}

  volumeChange(event: any) {
    const value: number = event.target.value;
    this.onVolumeChange.emit(value);
  }

  isMuteChange() {
    this.onIsMuteChange.emit();
  }
}
