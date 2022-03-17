import React from 'react';
import {
  FlatList,
  Image,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

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

const videoThumbnail = require('../../../res/images/thumbnail3.png');

const SelectedArea = () => {
  return (
    <View style={styles.selectedArea} pointerEvents="none">
      <FlatList
        horizontal={true}
        contentInset={{left: 0, top: 0, right: 0, bottom: 0}}
        data={[
          {id: 1, thumbnail: videoThumbnail},
          {id: 2, thumbnail: videoThumbnail},
          {id: 3, thumbnail: videoThumbnail},
          {id: 4, thumbnail: videoThumbnail},
          {id: 5, thumbnail: videoThumbnail},
          {id: 6, thumbnail: videoThumbnail},
          {id: 7, thumbnail: videoThumbnail},
          {id: 8, thumbnail: videoThumbnail},
          {id: 9, thumbnail: videoThumbnail},
        ]}
        keyExtractor={i => i.id.toString()}
        ItemSeparatorComponent={() => <View />}
        renderItem={({item}) => <Image source={item.thumbnail} />}
      />
    </View>
  );
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
    height: 48,
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
    flex: 1,
  },

  trimmerBorderContent: {},
});
