import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-loop-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loop-button.component.html',
  styleUrls: ['./loop-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoopButtonComponent {

  @Input() isLooping: boolean = false;
  @Output() readonly isLoopingChange: EventEmitter<boolean> = new EventEmitter();

}
