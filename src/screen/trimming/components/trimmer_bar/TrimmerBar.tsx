import React, {useCallback, useState} from 'react';
import {Dimensions, LayoutChangeEvent, StyleSheet, View} from 'react-native';
import {VideoConfig} from '../../models/video_config';
import {VideoData} from '../../models/video_data';
import {TrimmerEdgesView} from './components/TrimmerEdgesView';

const HORIZONTAL_MARGIN = 12;

type Props = {
  video: VideoData;
  videoConfig: VideoConfig;
};

export const TrimmerBar = (props: Props) => {
  const {video, videoConfig} = props;
  const [maxWidth, setMaxWidth] = useState(
    Dimensions.get('window').width - HORIZONTAL_MARGIN * 2,
  );

  const updateMaxWidth = useCallback((event: LayoutChangeEvent) => {
    setMaxWidth(event.nativeEvent.layout.width - HORIZONTAL_MARGIN * 2);
  }, []);

  return (
    <View style={styles.container} onLayout={updateMaxWidth}>
      <TrimmerEdgesView
        video={video}
        videoConfig={videoConfig}
        maxWidth={maxWidth}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 123,
    marginHorizontal: HORIZONTAL_MARGIN,
    flexDirection: 'row',
  },
});
