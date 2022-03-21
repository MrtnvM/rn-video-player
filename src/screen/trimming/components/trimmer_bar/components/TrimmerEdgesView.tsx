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
import {Seconds, VideoData} from '../../../models/video_data';
import {EDGE_WIDTH} from '../trimmer_bar_consts';
import {ThumbnailsBackground} from './ThumbnailsBackground';
import {LeftTrimmerBorder, RightTrimmerBorder} from './TrimmerBorders';

type ContextType = {
  leftOffset: number;
  rightOffset: number;
};

export const TrimmerEdgesView = (props: {
  video: VideoData;
  maxWidth: number;
  selectVideoInterval(params: {
    videoId: number;
    start: Seconds;
    end: Seconds;
  }): void;
}) => {
  const {video, maxWidth} = props;

  const selectedSeconds = useSharedValue('');
  const leftOffset = useSharedValue(0);
  const rightOffset = useSharedValue(0);

  useEffect(() => {
    const videoDuration = video.length.toFixed(1) + 's selected';
    selectedSeconds.value = videoDuration;
  }, [video, selectedSeconds]);

  const leftEdgePanEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.leftOffset = leftOffset.value;
    },
    onActive: (event, context) => {
      const calculatedOffset = event.translationX + context.leftOffset;
      const maxPossibleOffset = maxWidth + rightOffset.value - EDGE_WIDTH / 2;
      const newOffset = Math.min(
        Math.max(calculatedOffset, 0),
        maxPossibleOffset,
      );

      leftOffset.value = newOffset;

      const totalSeconds = video.length;
      const start = totalSeconds * (leftOffset.value / maxWidth);
      const end =
        totalSeconds - totalSeconds * (Math.abs(rightOffset.value) / maxWidth);

      const seconds = (end - start).toFixed(1) + 's selected';
      selectedSeconds.value = seconds;
    },
  });

  const rightEdgePanEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.rightOffset = rightOffset.value;
    },
    onActive: (event, context) => {
      const calculatedOffset = event.translationX + context.rightOffset;
      const maxPossibleOffset = -maxWidth + leftOffset.value + EDGE_WIDTH / 2;
      const newOffset = Math.min(
        Math.max(calculatedOffset, maxPossibleOffset),
        0,
      );

      rightOffset.value = newOffset;

      const totalSeconds = video.length;
      const start = totalSeconds * (leftOffset.value / maxWidth);
      const end =
        totalSeconds - totalSeconds * (Math.abs(rightOffset.value) / maxWidth);

      const seconds = (end - start).toFixed(1) + 's selected';
      selectedSeconds.value = seconds;
    },
  });

  const edgesPanEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.leftOffset = leftOffset.value;
      context.rightOffset = rightOffset.value;
    },
    onActive: (event, context) => {
      const calculatedLeftOffset = event.translationX + context.leftOffset;
      const maxPossibleLeftOffset =
        maxWidth + rightOffset.value - EDGE_WIDTH / 2;
      const newLeftOffset = Math.min(
        Math.max(calculatedLeftOffset, 0),
        maxPossibleLeftOffset,
      );
      leftOffset.value = newLeftOffset;

      const calculatedRightOffset = event.translationX + context.rightOffset;
      const maxPossibleRightOffset =
        -maxWidth + leftOffset.value + EDGE_WIDTH / 2;
      const newRightOffset = Math.min(
        Math.max(calculatedRightOffset, maxPossibleRightOffset),
        0,
      );
      rightOffset.value = newRightOffset;

      const totalSeconds = video.length;
      const start = totalSeconds * (leftOffset.value / maxWidth);
      const end =
        totalSeconds - totalSeconds * (Math.abs(rightOffset.value) / maxWidth);

      const seconds = (end - start).toFixed(1) + 's selected';
      selectedSeconds.value = seconds;
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
