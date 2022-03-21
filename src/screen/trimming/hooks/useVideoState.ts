import {useMemo, useState} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {videos} from '../mocks/videos_mocks';
import {createNewVideoConfig, VideoConfigMap} from '../models/video_config';

export const useVideoState = () => {
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  const initialVideoConfigMap = useMemo<VideoConfigMap>(
    () =>
      videos.reduce<VideoConfigMap>((acc, curr) => {
        acc[curr.id] = createNewVideoConfig(curr);
        return acc;
      }, {}),
    [],
  );
  const videoConfigMap = useSharedValue<VideoConfigMap>(initialVideoConfigMap);

  return {
    videos,
    selectedVideo: {
      video: selectedVideo,
      config: videoConfigMap.value[selectedVideo.id],
    },
    selectVideo: setSelectedVideo,
    videoConfigMap,
  };
};
