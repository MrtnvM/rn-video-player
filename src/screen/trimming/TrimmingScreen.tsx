import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import {SelectedTimeLabel} from './components/SelectedTimeLabel';
import {TrimmerBar} from './components/TrimmerBar';
import {useTrimmingNavigationBar} from './hooks/useTrimmingNavigationBar';

export const TrimmingScreen = () => {
  useTrimmingNavigationBar();

  return (
    <View style={{flex: 1}}>
      <Video
        source={require('../../res/videos/nba.mp4')}
        style={{flex: 1}}
        controls={true}
        // onBuffer={this.videoBuffer}
        // ref={playerRef}
      />

      <SafeAreaView>
        <SelectedTimeLabel />
        <TrimmerBar />
      </SafeAreaView>
    </View>
  );
};
