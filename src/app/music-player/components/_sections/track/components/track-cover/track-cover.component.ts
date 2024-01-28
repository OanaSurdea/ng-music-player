import { Component, InputSignal, input } from '@angular/core';

@Component({
  selector: 'app-track-cover',
  standalone: true,
  imports: [],
  templateUrl: './track-cover.component.html',
  styleUrls: ['./track-cover.component.scss'],
})
export class TrackCoverComponent {

  imageUrl: InputSignal<string> = input('');

}
