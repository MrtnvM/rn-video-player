import React from 'react';
import {Image, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {TRIMMER_COLOR} from '../trimmer_bar_consts';

const TrimmerBorderContent = (props: {style: StyleProp<ViewStyle>}) => {
  const {style} = props;

  return (
    <View style={[styles.trimmerBorder, style]}>
      <Image
        source={require('../../../../../res/images/trimmer_edge_icon.png')}
      />
    </View>
  );
};

export const LeftTrimmerBorder = () => {
  return <TrimmerBorderContent style={styles.leftTrimmerBorder} />;
};

export const RightTrimmerBorder = () => {
  return <TrimmerBorderContent style={styles.rightTrimmerBorder} />;
};

const styles = StyleSheet.create({
  trimmerBorder: {
    flexDirection: 'row',
    width: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: TRIMMER_COLOR,
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
});
