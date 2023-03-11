import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RegionParams } from 'wavesurfer.js/src/plugin/regions';

@Component({
  selector: 'app-waveform-comments',
  templateUrl: './waveform-comments.component.html',
  styleUrls: ['./waveform-comments.component.scss'],
})
export class WaveformCommentsComponent {
  @Input() readonly regions: RegionParams[] = [];
  @Input() readonly isPlaying: boolean = false;

  @Output() readonly onRegionCommentClick: EventEmitter<RegionParams> =
    new EventEmitter();

  constructor() {}

  regionCommentClick(region: RegionParams) {
    this.onRegionCommentClick.emit(region);
  }
}
