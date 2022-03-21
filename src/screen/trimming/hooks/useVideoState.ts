import {useCallback, useMemo, useState} from 'react';
import {videos} from '../mocks/videos_mocks';
import {createNewVideoConfig, VideoConfigMap} from '../models/video_config';
import {Seconds} from '../models/video_data';

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
  const [videoConfigMap, setVideoConfigMap] = useState<VideoConfigMap>(
    initialVideoConfigMap,
  );

  const selectVideoInterval = useCallback(
    (params: {videoId: number; start: Seconds; end: Seconds}) => {
      const {videoId, start, end} = params;
      const videoConfig = videoConfigMap[videoId];
      videoConfig.selectedInterval = {start, end};
      setVideoConfigMap({...videoConfigMap, [videoId]: videoConfig});

      console.log(videoConfig);
    },
    [videoConfigMap, setVideoConfigMap],
  );

  return {
    videos,
    selectedVideo: {
      video: selectedVideo,
      config: videoConfigMap[selectedVideo.id],
    },
    selectVideo: setSelectedVideo,
    videoConfigMap,
    selectVideoInterval,
  };
};
