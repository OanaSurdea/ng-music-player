import { Injectable } from '@angular/core';

import TimelinePlugin from 'wavesurfer.js/src/plugin/timeline';
import CursorPlugin from 'wavesurfer.js/src/plugin/cursor';
import RegionsPlugin, {
  RegionParams,
  RegionsPluginParams,
} from 'wavesurfer.js/src/plugin/regions';
import MarkersPlugin, {
  MarkerParams,
  MarkersPluginParams,
} from 'wavesurfer.js/src/plugin/markers';
import WaveSurfer = require('wavesurfer.js');
import { convertToSeconds } from '../helpers';

@Injectable({ providedIn: 'root' })
export class MusicPlayerService {
  public wave: WaveSurfer | null = null;

  constructor() {}

  public createWave(
    regions?: RegionParams[],
    markers?: MarkerParams[],
    showDarkMode?: boolean
  ): WaveSurfer {
    return WaveSurfer.create({
      container: '#waveform',

      // Wave style
      waveColor: showDarkMode ? '#999' : '#4f5963',
      progressColor: '#90CAF9',
      cursorColor: '#2196F3',
      barWidth: 2,
      barRadius: 1,
      barGap: 2,
      cursorWidth: 0,
      responsive: true,
      hideScrollbar: true,
      height: 56,
      // backend: 'MediaElement',
      pixelRatio: 10,
      splitChannels: false,
      closeAudioContext: true,
      // barHeight: 1.5,
      // barMinHeight: 150,
      // normalize: true,

      // Plugins
      plugins: [
        CursorPlugin.create({
          showTime: true,
          formatTimeCallback: (ms: number) => convertToSeconds(ms),
          opacity: '1',
          color: '#2196F3',
          customShowTimeStyle: {
            'background-color': '#2196F3',
            color: '#fff',
            padding: '5px',
            'margin-top': '0px',
            'font-size': '10px',
          },
        }),
        RegionsPlugin.create({ regions: regions }),
        MarkersPlugin.create({ markers: markers }),
      ],
    });
  }
}
