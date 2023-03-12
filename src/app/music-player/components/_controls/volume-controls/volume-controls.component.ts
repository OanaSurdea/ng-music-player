import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-volume-controls',
  templateUrl: './volume-controls.component.html',
  styleUrls: ['./volume-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VolumeControlsComponent {
  @Input() readonly isMuted: boolean;
  @Input() readonly volume: number;

  @Output() readonly onVolumeChange: EventEmitter<number> = new EventEmitter();
  @Output() readonly onIsMuteChange: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  volumeChange(event: any) {
    const value: number = event.target.value;
    this.onVolumeChange.emit(value);
  }

  isMuteChange() {
    this.onIsMuteChange.emit(!this.isMuted);
  }
}
