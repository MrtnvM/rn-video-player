import React from 'react';
import {Image, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

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
      <Image source={require('../../../res/images/trimmer_edge_icon.png')} />
    </View>
  );
};

const SelectedArea = () => {
  return <View style={styles.selectedArea} />;
};

export const TrimmerBar = () => {
  return (
    <View style={styles.container}>
      <LeftTrimmerBorder />
      <SelectedArea />
      <RightTrimmerBorder />
    </View>
  );
};

const trimmerColor = '#2D6AC7';

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: 'red',
    borderColor: trimmerColor,
    borderWidth: 2,
    marginHorizontal: 12,
    borderRadius: 4,
    flexDirection: 'row',
  },
  trimmerBorder: {
    flexDirection: 'row',
    width: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: trimmerColor,
  },
  leftTrimmerBorder: {
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  rightTrimmerBorder: {
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },

  selectedArea: {
    backgroundColor: 'green',
    flex: 1,
  },

  trimmerBorderContent: {},
});
