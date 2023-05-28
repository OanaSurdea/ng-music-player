import { getRandomColor } from './music-player/helpers';
import { Track } from './music-player/_types/interfaces';

export const TRACKS: Track[] = [
  {
    id: 1,
    title: 'Godfather Theme 1',
    artist: 'Nino Rota',
    url: 'https://ia800508.us.archive.org/15/items/LoveThemeFromTheGodfather/02LoveThemeFromTheGodfather.mp3',
    cover: 'https://i.scdn.co/image/ab67616d0000b273532d6c2da59560659e672fdd',
    // regions: [
    //   {
    //     id: 'wavesurfer_vsrbqhq3t68',
    //     color: 'rgba(2, 130, 202, 0.5)' || getRandomColor(0.5),
    //     start: 47.5,
    //     end: 78.5,
    //     data: { note: 'Fantastic solo!' },
    //     attributes: { label: 'abc', highlight: 'true', active: 'false' },
    //     drag: false,
    //     handleStyle: {
    //       left: {
    //         backgroundColor: 'rgba(0, 0, 0, 0)',
    //       },
    //       right: {
    //         backgroundColor: 'rgba(0, 0, 0, 0)',
    //       },
    //     },
    //   },
    //   {
    //     id: 'wavesurfer_82mtosart9',
    //     color: 'rgba(36, 63, 181, 0.5)' || getRandomColor(0.5),
    //     start: 126,
    //     end: 140.1,
    //     data: { note: 'Beautiful 🎉' },
    //     attributes: { active: 'false' },
    //     drag: false,
    //     handleStyle: {
    //       left: {
    //         backgroundColor: 'rgba(0, 0, 0, 0)',
    //       },
    //       right: {
    //         backgroundColor: 'rgba(0, 0, 0, 0)',
    //       },
    //     },
    //   },
    // ],
    // markers: [
    //   {
    //     time: 94.2,
    //     label: 'Clarinet Solo',
    //     color: '#0075ff',
    //     position: 'top',
    //   },
    //   {
    //     time: 47.5,
    //     label: 'Accordion Solo',
    //     color: '#0075ff',
    //     position: 'top',
    //   },
    //   {
    //     time: 126,
    //     label: 'Crescendo & Descrescendo',
    //     color: '#0075ff',
    //     position: 'top',
    //   },
    // ],
  },
  {
    id: 2,
    title: 'Pink Panther Theme Song',
    artist: 'T. Schürger',
    url: 'https://soundboardguy.com/wp-content/uploads/2022/07/the-pink-panther-theme-song-original-version.mp3',
    cover: 'https://i1.sndcdn.com/artworks-000193575970-i2owe2-t500x500.jpg',
  },
  {
    id: 3,
    title: 'Random Track Mashup',
    artist: 'T. Schürger',
    url: 'https://wavesurfer-js.org/example/media/stereo.mp3',
    cover: 'https://f4.bcbits.com/img/a1723011251_10.jpg',
  },
  {
    id: 4,
    title: 'Random Guitar',
    artist: 'T. Schürger',
    url: 'https://wavesurfer-js.org/example/media/demo.wav',
    cover:
      'https://swall.teahub.io/photos/small/288-2882748_black-acoustic-guitar-wallpaper-data-src-w-full.jpg',
  },
];
