import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-play-controls',
  templateUrl: './play-controls.component.html',
  styleUrls: ['./play-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayControlsComponent {
  @Input() readonly isPlaying: boolean = false;

  @Output() readonly onPlayPauseChange: EventEmitter<null> = new EventEmitter();
  @Output() readonly onPlayPrevious: EventEmitter<null> = new EventEmitter();
  @Output() readonly onPlayNext: EventEmitter<null> = new EventEmitter();

  @HostListener('document:keyup', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    switch (event.code) {
      case 'ArrowLeft':
      case 'ArrowUp':
        this.onPlayPrevious.emit();
        break;

      case 'Enter':
      case 'Space':
        this.onPlayPauseChange.emit();
        break;

      case 'ArrowRight':
      case 'ArrowDown':
        this.onPlayNext.emit();
        break;
    }
  }

  constructor() {}

  playPrevious() {
    this.onPlayPrevious.emit();
  }

  playPauseChange() {
    this.onPlayPauseChange.emit();
  }

  playNext() {
    this.onPlayNext.emit();
  }
}
