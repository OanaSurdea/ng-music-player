import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-loop-button',
  templateUrl: './loop-button.component.html',
  styleUrls: ['./loop-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoopButtonComponent {
  @Input() readonly isLooping: boolean = false;
  @Output() readonly onIsLoopingChange: EventEmitter<null> = new EventEmitter();

  constructor() {}

  isLoopingChange(): void {
    this.onIsLoopingChange.emit();
  }
}
