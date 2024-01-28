import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2, WritableSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { Track } from './music-player/types/interfaces';
import { TRACKS } from './tracks.data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, MusicPlayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  tracks: Track[] = TRACKS;
  selectedTrack: WritableSignal<Track> = signal(this.tracks[0]);
  showDarkMode: WritableSignal<boolean> = signal(true);

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this._initThemeToggle();
  }

  private _initThemeToggle(): void {
    const body: HTMLElement = document.body;
    this.renderer.addClass(body, `theme--${this.showDarkMode() ? 'dark' : 'light'}`);
    this.renderer.removeClass(body, `theme--${!this.showDarkMode() ? 'dark' : 'light'}`);
  }

}
