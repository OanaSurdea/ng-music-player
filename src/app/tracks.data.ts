import { getRandomColor } from './music-player/helpers';
import { Track } from './music-player/types/interfaces';

export const TRACKS: Track[] = [
  {
    id: 1,
    title: 'Pink Panther Theme Song',
    artist: 'Henry Mancini and His Orchestra',
    url: '../assets/media/audio/the-pink-panther-theme.mp3',
    cover: '../assets/media/images/the-pink-panther-theme-cover.jpeg',
  },
  {
    id: 2,
    title: 'Godfather Theme 1',
    artist: 'Nino Rota',
    url: '../assets/media/audio/love-theme-from-the-godfather.mp3',
    cover: '../assets/media/images/love-theme-from-the-godfather-cover.jpeg',
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
    id: 3,
    title: 'Random Track Mashup',
    artist: 'T. Schürger',
    url: '../assets/media/audio/random-track-mashup.mp3',
    cover: '../assets/media/images/random-track-mashup-cover.jpeg',
  },
  {
    id: 4,
    title: 'Random Guitar Demo',
    artist: 'T. Schürger',
    url: '../assets/media/audio/random-guitar-demo.wav',
    cover: '../assets/media/images/random-guitar-demo-cover.jpeg',
  },
];
