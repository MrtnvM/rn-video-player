import React from 'react';
import {Image, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const EDGE_WIDTH = 13;

type ContextType = {
  leftOffset: number;
  rightOffset: number;
};

const LeftTrimmerBorder = () => {
  return <TrimmerBorderContent style={styles.leftTrimmerBorder} />;
};

const RightTrimmerBorder = () => {
  return <TrimmerBorderContent style={styles.rightTrimmerBorder} />;
};

const TrimmerBorderContent = (props: {style: StyleProp<ViewStyle>}) => {
  const {style} = props;

  return (
    <View style={[styles.trimmerBorder, style]}>
      <Image source={require('../../../../res/images/trimmer_edge_icon.png')} />
    </View>
  );
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

  const edgesStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: leftOffset.value,
    right: -rightOffset.value,
  }));

  return (
    <Animated.View style={[styles.trimmerEdgesContainer, edgesStyle]}>
      <PanGestureHandler onGestureEvent={leftEdgePanEvent}>
        <Animated.View>
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
  trimmerBorder: {
    flexDirection: 'row',
    width: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: trimmerColor,
    height: 44,
  },
  leftTrimmerBorder: {
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    left: 0,
    top: 0,
    position: 'absolute',
  },
  rightTrimmerBorder: {
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    right: 0,
    top: 0,
    position: 'absolute',
  },
  rightEdgeStyle: {
    position: 'absolute',
    right: 0,
  },
});
