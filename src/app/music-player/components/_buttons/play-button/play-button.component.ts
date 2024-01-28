import { CommonModule } from '@angular/common';
import { Component, InputSignal, input } from '@angular/core';

@Component({
  selector: 'app-play-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.scss'],
})
export class PlayButtonComponent {

  title: InputSignal<string> = input.required();
  icon: InputSignal<string> = input.required();
  classes: InputSignal<string> = input(null);

}
