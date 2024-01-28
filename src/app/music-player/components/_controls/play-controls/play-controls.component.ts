import { ChangeDetectionStrategy, Component, EventEmitter, InputSignal, Output, input } from '@angular/core';
import { PlayTypeEnum } from '../../../types/enums';
import { CommonModule } from '@angular/common';
import { PlayButtonComponent } from '../../_buttons';

@Component({
  selector: 'app-play-controls',
  standalone: true,
  imports: [CommonModule, PlayButtonComponent],
  templateUrl: './play-controls.component.html',
  styleUrls: ['./play-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayControlsComponent {

  isPlaying: InputSignal<boolean> = input.required();
  @Output() readonly onIsPlayingChange: EventEmitter<PlayTypeEnum> = new EventEmitter();

  // Helpers
  playTypeEnum: typeof PlayTypeEnum = PlayTypeEnum;

}
