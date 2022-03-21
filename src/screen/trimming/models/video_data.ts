import {ImageSourcePropType} from 'react-native';

export type Seconds = number;

export type VideoData = {
  id: number;
  thumbnail: ImageSourcePropType;
  length: Seconds;
};
