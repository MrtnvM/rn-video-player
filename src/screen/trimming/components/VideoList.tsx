import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getVideoDurationString} from '../../../utils/duration';

type VideoData = {
  id: number;
  thumbnail: ImageSourcePropType;
  seconds: number;
};

const videos: VideoData[] = [
  {
    id: 1,
    thumbnail: require('../../../res/images/thumbnail1.png'),
    seconds: 10,
  },
  {id: 2, thumbnail: require('../../../res/images/thumbnail2.png'), seconds: 9},
  {
    id: 3,
    thumbnail: require('../../../res/images/thumbnail2.png'),
    seconds: 3600,
  },
  {
    id: 0,
    thumbnail: require('../../../res/images/plus_icon.png'),
    seconds: 0,
  },
];

const VideoListItem = (props: {
  video: VideoData;
  isSelected: boolean;
  selectVideo: (video: VideoData) => void;
}) => {
  const {video, isSelected, selectVideo} = props;
  const style = isSelected
    ? styles.selectedVideoItem
    : styles.unselectedVideoItem;

  const containerStyle = isSelected
    ? styles.selectedVideoItemContainer
    : styles.videoItemContainer;

  return (
    <TouchableOpacity
      onPress={() => selectVideo(video)}
      style={[containerStyle]}>
      <View style={styles.videoItem}>
        <Image source={video.thumbnail} style={style} />
        <Text style={styles.timeLabel}>
          {getVideoDurationString(video.seconds)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const AddVideoButton = () => {
  return (
    <TouchableOpacity style={styles.addVideoButton}>
      <Image
        style={styles.plusIcon}
        source={require('../../../res/images/plus_icon.png')}
      />
    </TouchableOpacity>
  );
};

export const VideoList = () => {
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  return (
    <FlatList
      horizontal={true}
      contentInset={{left: 20, right: 20}}
      keyExtractor={item => item.id.toString()}
      data={videos}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({item}) => {
        const isSelected = selectedVideo.id === item.id;

        if (item.id === 0) {
          return <AddVideoButton />;
        }

        return (
          <VideoListItem
            video={item}
            isSelected={isSelected}
            selectVideo={setSelectedVideo}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  videoItemContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 50,
  },
  selectedVideoItemContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60,
  },
  videoItem: {
    position: 'absolute',
  },
  selectedVideoItem: {
    height: 60,
    width: 60,
  },
  unselectedVideoItem: {
    height: 50,
    width: 50,
  },
  timeLabel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontWeight: '700',
    color: '#fff',
    lineHeight: 24,
    fontSize: 10,
  },
  addVideoButton: {
    height: 50,
    width: 50,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    backgroundColor: '#333333',
  },
  plusIcon: {
    height: 15,
    width: 15,
  },
  separator: {
    width: 10,
  },
});
