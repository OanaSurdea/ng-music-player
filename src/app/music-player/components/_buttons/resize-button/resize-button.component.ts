import { Component, EventEmitter, InputSignal, Output, input } from '@angular/core';

@Component({
  selector: 'app-resize-button',
  standalone: true,
  imports: [],
  templateUrl: './resize-button.component.html',
  styleUrls: ['./resize-button.component.scss'],
})
export class ResizeButtonComponent {

  isMinimized: InputSignal<boolean> = input.required();
  @Output() readonly onIsMinimizedChange: EventEmitter<void> = new EventEmitter();

}
