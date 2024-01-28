import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, InputSignal, Output, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-volume-controls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './volume-controls.component.html',
  styleUrls: ['./volume-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VolumeControlsComponent {

  isMuted: InputSignal<boolean> = input.required();
  volume: InputSignal<number> = input.required();

  @Output() readonly onVolumeChange: EventEmitter<number> = new EventEmitter();
  @Output() readonly onIsMutedChange: EventEmitter<boolean> = new EventEmitter();

}
