import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-play-pause-button',
  templateUrl: './play-pause-button.component.html',
  styleUrls: ['./play-pause-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayPauseButtonComponent {
  @Input() readonly isPlaying: boolean = false;
  @Output() readonly onPlayPauseChange: EventEmitter<null> = new EventEmitter();

  @HostListener('document:keyup', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    if (event.code === 'Enter' || event.code === 'Space') {
      event.preventDefault();
      return this.onPlayPauseChange.emit();
    }

    // ToDo: Add arrow key waveform navigation
    // if ((event.code === 'ArrowLeft' || event.code === 'ArrowRight') && !this.wave?.isPlaying()) {
    //   return this.wave?.play(this.wave.getCurrentTime());
    // }
  }

  constructor() {}

  playPauseChange() {
    this.onPlayPauseChange.emit();
  }
}
