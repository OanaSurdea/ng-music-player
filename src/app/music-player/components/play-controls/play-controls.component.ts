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
    if (event.code === 'ArrowLeft' || event.code === 'ArrowUp') {
      event.preventDefault();
      return this.onPlayPrevious.emit();
    }

    if (event.code === 'Enter' || event.code === 'Space') {
      event.preventDefault();
      return this.onPlayPauseChange.emit();
    }

    if (event.code === 'ArrowRight' || event.code === 'ArrowDown') {
      event.preventDefault();
      return this.onPlayNext.emit();
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
