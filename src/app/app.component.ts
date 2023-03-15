import { Component, OnInit, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Track } from './music-player/_types/interfaces';
import { TRACKS } from './tracks.data';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public tracks: Track[] = TRACKS;
  public cards: any[] = ['#f3ad5e', '#f3ad5e', '#f3ad5e'];
  showDarkMode$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.showDarkMode$.subscribe((showDarkMode: boolean) => {
      this.renderer.addClass(
        document.body,
        (showDarkMode ? 'theme--dark' : 'theme--light')
      );
      this.renderer.removeClass(
        document.body,
        (!showDarkMode ? 'theme--dark' : 'theme--light')
      );
    });
  }
}
