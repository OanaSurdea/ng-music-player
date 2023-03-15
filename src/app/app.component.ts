import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Track } from './music-player/_types/interfaces';
import { TRACKS } from './tracks.data';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public tracks: Track[] = TRACKS;
  showDarkMode$: BehaviorSubject<boolean> = new BehaviorSubject(true);
}
