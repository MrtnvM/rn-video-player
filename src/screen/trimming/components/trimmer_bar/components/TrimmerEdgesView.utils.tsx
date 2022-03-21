import {PanGestureHandlerEventPayload} from 'react-native-gesture-handler';
import {SharedValue} from 'react-native-reanimated';
import {VideoConfig} from '../../../models/video_config';
import {VideoData} from '../../../models/video_data';
import {EDGE_WIDTH} from '../trimmer_bar_consts';
import {TrimmerEdgesViewContext} from './TrimmerEdgesViewContext';

export type TrimmerEdgeWorkletContext = {
  video: VideoData;
  videoConfig: VideoConfig;
  maxWidth: number;
  leftOffset: SharedValue<number>;
  rightOffset: SharedValue<number>;
  selectedSeconds: SharedValue<string>;
};

export function updateSelectedSecondsWorklet(params: {
  context: TrimmerEdgeWorkletContext;
}) {
  'worklet';

  const {video, maxWidth, leftOffset, rightOffset, selectedSeconds} =
    params.context;
  const totalSeconds = video.length;
  const start = totalSeconds * (leftOffset.value / maxWidth);
  const end =
    totalSeconds - totalSeconds * (Math.abs(rightOffset.value) / maxWidth);

  const seconds = (end - start).toFixed(1) + 's selected';
  selectedSeconds.value = seconds;
}

export function updateLeftOffsetWorklet(params: {
  context: TrimmerEdgeWorkletContext;
  event: PanGestureHandlerEventPayload;
  eventContext: TrimmerEdgesViewContext;
}) {
  'worklet';

  const {event, context, eventContext} = params;
  const {maxWidth, leftOffset, rightOffset} = context;

  const calculatedOffset = event.translationX + eventContext.leftOffset;
  const maxPossibleOffset = maxWidth + rightOffset.value - EDGE_WIDTH / 2;
  const newOffset = Math.min(Math.max(calculatedOffset, 0), maxPossibleOffset);

  leftOffset.value = newOffset;
}

export function updateRightOffsetWorklet(params: {
  context: TrimmerEdgeWorkletContext;
  event: PanGestureHandlerEventPayload;
  eventContext: TrimmerEdgesViewContext;
}) {
  'worklet';

  const {event, context, eventContext} = params;
  const {maxWidth, leftOffset, rightOffset} = context;

  const calculatedOffset = event.translationX + eventContext.rightOffset;
  const maxPossibleOffset = -maxWidth + leftOffset.value + EDGE_WIDTH / 2;
  const newOffset = Math.min(Math.max(calculatedOffset, maxPossibleOffset), 0);

  rightOffset.value = newOffset;
}
