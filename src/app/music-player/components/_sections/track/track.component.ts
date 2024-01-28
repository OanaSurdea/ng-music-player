import { CommonModule } from '@angular/common';
import { Component, InputSignal, input } from '@angular/core';
import { Track } from '../../../types/interfaces';
import { LoadingSpinnerComponent } from '../../_other';
import { TrackCoverComponent, TrackTimeComponent, TrackTitleComponent } from './components';

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [
    CommonModule,
    TrackTimeComponent,
    TrackCoverComponent,
    TrackTitleComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
})
export class TrackComponent {

  selectedTrack: InputSignal<Track> = input.required();
  currentTime: InputSignal<string> = input.required();
  duration: InputSignal<string> = input.required();
  isLoading: InputSignal<boolean> = input.required();

}
