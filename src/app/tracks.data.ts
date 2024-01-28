import { getRandomColor } from './music-player/helpers';
import { Track } from './music-player/types/interfaces';

export const TRACKS: Track[] = [
  {
    id: 1,
    title: 'Pink Panther Theme Song',
    artist: 'Henry Mancini and His Orchestra',
    url: '../assets/tracks/the-pink-panther-theme.mp3',
    cover: 'https://ia800109.us.archive.org/BookReader/BookReaderImages.php?zip=/0/items/cd_the-pink-panther-and-other-hits_henry-mancini-and-his-orchestra/cd_the-pink-panther-and-other-hits_henry-mancini-and-his-orchestra_jp2.zip&file=cd_the-pink-panther-and-other-hits_henry-mancini-and-his-orchestra_jp2/cd_the-pink-panther-and-other-hits_henry-mancini-and-his-orchestra_0000.jp2&id=cd_the-pink-panther-and-other-hits_henry-mancini-and-his-orchestra',
  },
  {
    id: 2,
    title: 'Godfather Theme 1',
    artist: 'Nino Rota',
    url: '../assets/tracks/love-theme-from-the-godfather.mp3',
    cover: 'https://i.scdn.co/image/ab67616d0000b273532d6c2da59560659e672fdd',
    regions: [
      {
        id: 'wavesurfer_vsrbqhq3t68',
        color: 'rgba(2, 130, 202, 0.5)' || getRandomColor(0.5),
        start: 47.5,
        end: 78.5,
        data: { note: 'Fantastic solo!' },
        attributes: { label: 'abc', highlight: 'true', active: 'false' },
        drag: false,
        handleStyle: {
          left: {
            backgroundColor: 'rgba(0, 0, 0, 0)',
          },
          right: {
            backgroundColor: 'rgba(0, 0, 0, 0)',
          },
        },
      },
      {
        id: 'wavesurfer_82mtosart9',
        color: 'rgba(36, 63, 181, 0.5)' || getRandomColor(0.5),
        start: 126,
        end: 140.1,
        data: { note: 'Beautiful 🎉' },
        attributes: { active: 'false' },
        drag: false,
        handleStyle: {
          left: {
            backgroundColor: 'rgba(0, 0, 0, 0)',
          },
          right: {
            backgroundColor: 'rgba(0, 0, 0, 0)',
          },
        },
      },
    ],
    markers: [
      {
        time: 94.2,
        label: 'Clarinet Solo',
        color: '#0075ff',
        position: 'top',
      },
      {
        time: 47.5,
        label: 'Accordion Solo',
        color: '#0075ff',
        position: 'top',
      },
      {
        time: 126,
        label: 'Crescendo & Descrescendo',
        color: '#0075ff',
        position: 'top',
      },
    ],
  },
  {
    id: 3,
    title: 'Random Track Mashup',
    artist: 'T. Schürger',
    url: '../assets/tracks/random-track-mashup..mp3',
    cover: 'https://f4.bcbits.com/img/a1723011251_10.jpg',
  },
  {
    id: 4,
    title: 'Random Guitar Demo',
    artist: 'T. Schürger',
    url: '../assets/tracks/random-guitar-demo.wav',
    cover:
      'https://swall.teahub.io/photos/small/288-2882748_black-acoustic-guitar-wallpaper-data-src-w-full.jpg',
  },
];
