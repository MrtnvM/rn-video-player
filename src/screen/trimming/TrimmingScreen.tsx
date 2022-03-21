import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import {DragAndDropLabel} from './components/DragAndDropLabel';
import {TrimmerBar} from './components/trimmer_bar/TrimmerBar';
import {VideoList} from './components/VideoList';
import {useTrimmingNavigationBar} from './hooks/useTrimmingNavigationBar';
import {useVideoState} from './hooks/useVideoState';

export const TrimmingScreen = () => {
  const videoState = useVideoState();

  useTrimmingNavigationBar();

  return (
    <View style={styles.screenContainer}>
      <View style={styles.playerContainer}>
        <Video
          style={styles.player}
          source={require('../../res/videos/nba.mp4')}
          controls={true}
        />
      </View>

      <SafeAreaView>
        <TrimmerBar
          video={videoState.selectedVideo.video}
          videoConfig={videoState.selectedVideo.config}
        />
        <DragAndDropLabel />
        <VideoList
          videos={videoState.videos}
          selectedVideo={videoState.selectedVideo.video}
          selectVideo={videoState.selectVideo}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {flex: 1},
  playerContainer: {flex: 1, marginTop: 16},
  player: {flex: 1},
});
