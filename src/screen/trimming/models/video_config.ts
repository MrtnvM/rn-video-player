import {VideoData} from './video_data';

export type VideoConfig = {
  videoId: number;
  selectedInterval: {
    start: number;
    end: number;
  };
};

export type VideoConfigMap = {[key: number]: VideoConfig};

export const createNewVideoConfig = (video: VideoData): VideoConfig => {
  return {
    videoId: video.id,
    selectedInterval: {
      start: 0,
      end: video.length,
    },
  };
};
