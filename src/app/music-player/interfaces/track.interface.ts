import { MarkerParams } from 'wavesurfer.js/src/plugin/markers';
import { RegionParams } from 'wavesurfer.js/src/plugin/regions';

export interface Track {
  id: number;
  title: string;
  url: string;
  cover: string;
  artist: string;

  regions?: RegionParams[];
  markers?: MarkerParams[];
}
