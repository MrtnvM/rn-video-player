import React, {useState} from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';

const videoThumbnail = require('../../../../../res/images/thumbnail3.png');

type Item = {
  id: number;
  thumbnail: any;
};

export const ThumbnailsBackground = () => {
  const [data] = useState<Item[]>([
    {id: 1, thumbnail: videoThumbnail},
    {id: 2, thumbnail: videoThumbnail},
    {id: 3, thumbnail: videoThumbnail},
    {id: 4, thumbnail: videoThumbnail},
    {id: 5, thumbnail: videoThumbnail},
    {id: 6, thumbnail: videoThumbnail},
    {id: 7, thumbnail: videoThumbnail},
    {id: 8, thumbnail: videoThumbnail},
    {id: 9, thumbnail: videoThumbnail},
  ]);

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        contentInset={{left: 0, top: 0, right: 0, bottom: 0}}
        data={data}
        keyExtractor={i => i.id.toString()}
        renderItem={({item}) => <Image source={item.thumbnail} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 3,
    left: 0,
    right: 0,
    bottom: 3,
  },
});
