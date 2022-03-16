import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import {DragAndDropLabel} from './components/DragAndDropLabel';
import {SelectedTimeLabel} from './components/SelectedTimeLabel';
import {TrimmerBar} from './components/TrimmerBar';
import {VideoList} from './components/VideoList';
import {useTrimmingNavigationBar} from './hooks/useTrimmingNavigationBar';

export const TrimmingScreen = () => {
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
        <SelectedTimeLabel />
        <TrimmerBar />
        <DragAndDropLabel />
        <VideoList />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {flex: 1},
  playerContainer: {flex: 1, marginTop: 16},
  player: {flex: 1},
});
