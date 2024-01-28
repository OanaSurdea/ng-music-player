import { Component, InputSignal, input } from '@angular/core';

@Component({
  selector: 'app-track-time',
  standalone: true,
  imports: [],
  templateUrl: './track-time.component.html',
  styleUrls: ['./track-time.component.scss'],
})
export class TrackTimeComponent {

  time: InputSignal<string> = input.required();

}
