import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';
import {VideoConfig} from '../../../models/video_config';
import {VideoData} from '../../../models/video_data';
import {ThumbnailsBackground} from './ThumbnailsBackground';
import {LeftTrimmerBorder, RightTrimmerBorder} from './TrimmerBorders';
import {
  TrimmerEdgeWorkletContext,
  updateLeftOffsetWorklet,
  updateRightOffsetWorklet,
  updateSelectedSecondsWorklet,
} from './TrimmerEdgesView.utils';

type ContextType = {
  leftOffset: number;
  rightOffset: number;
};

export const TrimmerEdgesView = (props: {
  video: VideoData;
  videoConfig: VideoConfig;
  maxWidth: number;
}) => {
  const {video, videoConfig, maxWidth} = props;

  const selectedSeconds = useSharedValue('');
  const leftOffset = useSharedValue(videoConfig.selectedInterval.start);
  const rightOffset = useSharedValue(
    Math.abs((video.length - videoConfig.selectedInterval.end) / video.length) *
      maxWidth,
  );

  useEffect(() => {
    const {start, end} = videoConfig.selectedInterval;
    const videoDuration = (end - start).toFixed(1) + 's selected';
    selectedSeconds.value = videoDuration;

    leftOffset.value = 0;
    rightOffset.value = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoConfig, selectedSeconds]);

  const context: TrimmerEdgeWorkletContext = {
    video,
    videoConfig,
    maxWidth,
    leftOffset,
    rightOffset,
    selectedSeconds,
  };

  const leftEdgePanEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, eventContext) => {
      eventContext.leftOffset = leftOffset.value;
    },
    onActive: (event, eventContext) => {
      updateLeftOffsetWorklet({context: context, event, eventContext});
      updateSelectedSecondsWorklet({context});
    },
  });

  const rightEdgePanEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, eventContext) => {
      eventContext.rightOffset = rightOffset.value;
    },
    onActive: (event, eventContext) => {
      updateRightOffsetWorklet({context: context, event, eventContext});
      updateSelectedSecondsWorklet({context});
    },
  });

  const edgesPanEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, eventContext) => {
      eventContext.leftOffset = leftOffset.value;
      eventContext.rightOffset = rightOffset.value;
    },
    onActive: (event, eventContext) => {
      updateLeftOffsetWorklet({context: context, event, eventContext});
      updateRightOffsetWorklet({context: context, event, eventContext});
      updateSelectedSecondsWorklet({context});
    },
  });

  const edgesStyle = useAnimatedStyle(() => ({
    left: leftOffset.value,
    right: -rightOffset.value,
  }));

  return (
    <View style={styles.container}>
      <ReText style={styles.timeLabel} text={selectedSeconds} />

      <View style={styles.trimmerEdgesWrapper}>
        <View style={styles.trimmerEdgesInnerWrapper}>
          <ThumbnailsBackground />

          <Animated.View style={[styles.trimmerEdgesContainer, edgesStyle]}>
            <PanGestureHandler onGestureEvent={edgesPanEvent}>
              <Animated.View style={styles.edgesBackgroundView} />
            </PanGestureHandler>

            <PanGestureHandler onGestureEvent={leftEdgePanEvent}>
              <Animated.View style={styles.leftEdgeStyle}>
                <LeftTrimmerBorder />
              </Animated.View>
            </PanGestureHandler>

            <PanGestureHandler onGestureEvent={rightEdgePanEvent}>
              <Animated.View style={styles.rightEdgeStyle}>
                <RightTrimmerBorder />
              </Animated.View>
            </PanGestureHandler>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const trimmerColor = '#2D6AC7';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  trimmerEdgesWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  trimmerEdgesInnerWrapper: {
    width: '100%',
    height: 54,
  },

  trimmerEdgesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    borderColor: trimmerColor,
    borderWidth: 2,
    borderRadius: 4,
    height: 51,
  },
  leftEdgeStyle: {
    position: 'absolute',
    left: 0,
  },
  rightEdgeStyle: {
    position: 'absolute',
    right: 0,
  },
  edgesBackgroundView: {
    flex: 1,
    backgroundColor: '#11333333',
  },
  timeLabel: {
    marginVertical: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});
