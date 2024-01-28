import { CommonModule } from '@angular/common';
import { Component, EventEmitter, InputSignal, Output, input } from '@angular/core';
import { RegionParams } from 'wavesurfer.js/src/plugin/regions';

@Component({
  selector: 'app-wave-comments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wave-comments.component.html',
  styleUrls: ['./wave-comments.component.scss'],
})
export class WaveCommentsComponent {

  regions: InputSignal<RegionParams[]> = input([]);
  isPlaying: InputSignal<boolean> = input(false);

  @Output() readonly onRegionCommentClick: EventEmitter<RegionParams> = new EventEmitter();

}
