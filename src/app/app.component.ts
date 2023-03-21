import { Component, OnInit, Renderer2 } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Track } from './music-player/_types/interfaces';
import { TRACKS } from './tracks.data';

type Theme = 'light' | 'dark';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public tracks: Track[] = TRACKS;
  showDarkMode$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this._initTheme();
  }

  private _initTheme(): void {
    this.showDarkMode$
      .pipe(takeUntil(this._destroy$))
      .subscribe((isDark: boolean) => {
        const body: HTMLElement = document.body;
        this.renderer.addClass(body, `theme--${isDark ? 'dark' : 'light'}`);
        this.renderer.removeClass(body, `theme--${!isDark ? 'dark' : 'light'}`);
      });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
