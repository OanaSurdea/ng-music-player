import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { PlayTypeEnum } from 'src/app/music-player/_types/enums';

@Component({
  selector: 'app-play-controls',
  templateUrl: './play-controls.component.html',
  styleUrls: ['./play-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayControlsComponent {
  @Input() readonly isPlaying: boolean = false;
  @Output() readonly onChange: EventEmitter<PlayTypeEnum> = new EventEmitter();

  playTypeEnum: typeof PlayTypeEnum = PlayTypeEnum;

  @HostListener('document:keyup', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    switch (event.code) {
      case 'ArrowLeft':
      case 'ArrowUp':
        this.onChange.emit(PlayTypeEnum.PlayPrevious);
        break;

      case 'Enter':
      case 'Space':
        this.onChange.emit(PlayTypeEnum.PlayPause);
        break;

      case 'ArrowRight':
      case 'ArrowDown':
        this.onChange.emit(PlayTypeEnum.PlayNext);
        break;
    }
  }

  constructor() {}
}
