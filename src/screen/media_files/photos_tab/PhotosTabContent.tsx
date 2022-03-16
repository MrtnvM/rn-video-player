import React from 'react';
import {useContext} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SelectorComponent} from '../../../components/SelectorComponent';
import {MediaFilesContext} from '../../../context/MediaFilesContext';

export function PhotosTab() {
  return <View style={styles.root}>{PhotosTabContent()}</View>;
}

function PhotosTabContent() {
  const {videoMediaFiles, setSelectedMediaFiles} =
    useContext(MediaFilesContext);
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={videoMediaFiles}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => {
              setSelectedMediaFiles({...item, index});
            }}>
            <Image
              style={styles.image}
              source={require('../../../res/images/pitcher.png')}
            />
            <Text style={styles.text}>{item.duration}</Text>
            {SelectorComponent(
              {
                position: 'absolute',
                end: 5,
                top: 5,
              },
              item.index,
            )}
          </TouchableOpacity>
        )}
        numColumns={4}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    backgroundColor: 'white',
  },
  touchable: {marginStart: 1, marginEnd: 1},
  image: {height: 92, width: 92, borderRadius: 2},
  text: {
    height: 22,
    width: 38,
    position: 'absolute',
    bottom: 0,
    end: 5,
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
  },
});
