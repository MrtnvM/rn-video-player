import React from 'react';
import {StyleSheet} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {EDGE_WIDTH} from '../trimmer_bar_consts';
import {LeftTrimmerBorder, RightTrimmerBorder} from './TrimmerBorders';

type ContextType = {
  leftOffset: number;
  rightOffset: number;
};

export const TrimmerEdgesView = (props: {maxWidth: number}) => {
  const {maxWidth} = props;

  const leftOffset = useSharedValue(0);
  const rightOffset = useSharedValue(0);

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
    },
  });

  const edgesStyle = useAnimatedStyle(() => ({
    left: leftOffset.value,
    right: -rightOffset.value,
  }));

  return (
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
  );
};

const trimmerColor = '#2D6AC7';

const styles = StyleSheet.create({
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
});
