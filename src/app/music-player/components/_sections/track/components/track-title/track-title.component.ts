import { Component, InputSignal, input } from '@angular/core';

@Component({
  selector: 'app-track-title',
  standalone: true,
  imports: [],
  templateUrl: './track-title.component.html',
  styleUrls: ['./track-title.component.scss'],
})
export class TrackTitleComponent {

  title: InputSignal<string> = input.required();
  artist: InputSignal<string> = input.required();

}
