import {VideoData} from '../models/video_data';

export const videos: VideoData[] = [
  {
    id: 1,
    thumbnail: require('../../../res/images/thumbnail1.png'),
    length: 10,
  },
  {id: 2, thumbnail: require('../../../res/images/thumbnail2.png'), length: 9},
  {
    id: 3,
    thumbnail: require('../../../res/images/thumbnail2.png'),
    length: 3600,
  },
];
