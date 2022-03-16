import React, {useContext} from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {MediaFilesContext} from '../../../context/MediaFilesContext';

export function SelectedMediaFilesComponent() {
  const {selectedMediaFiles, removeSelectedVideoFile} =
    useContext(MediaFilesContext);
  return (
    <View style={styles.container}>
      <FlatList
        data={selectedMediaFiles}
        renderItem={({item}) => (
          <View style={{}}>
            <Image
              style={styles.image}
              source={require('../../../res/images/pitcher.png')}
            />
            <Text style={styles.duration}>{item.duration}</Text>
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => {
                removeSelectedVideoFile(item);
              }}>
              <Image
                style={styles.cross}
                source={require('../../../res/images/cross.png')}
              />
            </TouchableOpacity>
          </View>
        )}
        horizontal={true}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {marginStart: 20, marginTop: 10, marginBottom: 10},
  image: {height: 50, width: 50, borderRadius: 2},
  duration: {
    height: 24,
    width: 31,
    position: 'absolute',
    bottom: -8,
    alignSelf: 'center',
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
  },
  touchable: {
    position: 'absolute',
    height: 14,
    width: 14,
    justifyContent: 'center',
    end: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  cross: {
    height: 8,
    width: 8,
    tintColor: 'white',
    alignSelf: 'center',
  },
  separator: {width: 15},
});
