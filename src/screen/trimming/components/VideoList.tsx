import React, {useCallback, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getVideoDurationString} from '../../../utils/duration';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {VideoData} from '../models/video_data';

const VideoListItem = (props: {video: VideoData; isSelected: boolean}) => {
  const {video, isSelected} = props;
  const style = isSelected
    ? styles.selectedVideoItem
    : styles.unselectedVideoItem;

  const containerStyle = isSelected
    ? styles.selectedVideoItemContainer
    : styles.videoItemContainer;

  return (
    <View style={[containerStyle]}>
      <View style={styles.videoItem}>
        <Image source={video.thumbnail} style={style} />
        <Text style={styles.timeLabel}>
          {getVideoDurationString(video.length)}
        </Text>
      </View>
    </View>
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

export const VideoList = (props: {
  videos: VideoData[];
  selectedVideo: VideoData;
  selectVideo: (video: VideoData) => void;
}) => {
  const {videos, selectedVideo, selectVideo} = props;
  const [data, setData] = useState(videos);

  const renderItem = useCallback(
    ({item, drag, isActive}: RenderItemParams<VideoData>) => {
      const isSelected = selectedVideo.id === item.id;

      return (
        <ScaleDecorator>
          <TouchableOpacity
            onPress={() => selectVideo(item)}
            onLongPress={drag}
            disabled={isActive}>
            <VideoListItem video={item} isSelected={isSelected} />
          </TouchableOpacity>
        </ScaleDecorator>
      );
    },
    [selectVideo, selectedVideo.id],
  );

  return (
    <DraggableFlatList
      horizontal={true}
      contentInset={{left: 20, right: 20}}
      keyExtractor={item => item.id.toString()}
      data={data}
      onDragEnd={p => setData(p.data)}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListFooterComponent={<AddVideoButton />}
      renderItem={renderItem}
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
    marginLeft: 10,
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
