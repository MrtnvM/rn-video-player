import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Button, Text, View} from 'react-native';
import Video from 'react-native-video';
import {MediaFilesContextProvider} from './src/context/MediaFilesContextProvider';
import {MediaFilesScreen} from './src/screen/media_files/MediaFilesScreen';
import {TrimmingScreen} from './src/screen/trimming/TrimmingScreen';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to MediaFiles"
        onPress={() => navigation.navigate('MediaFiles')}
      />
      <Button
        title="Go to Trimming"
        onPress={() => navigation.navigate('Trimming')}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <MediaFilesContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="MediaFiles"
              component={MediaFilesScreen}
              options={{headerShown: false, presentation: 'transparentModal'}}
            />
            <Stack.Screen
              name="MockVideo"
              component={MockVideo}
              options={{headerShown: true, presentation: 'card'}}
            />
          </Stack.Group>
          <Stack.Group screenOptions={{presentation: 'fullScreenModal'}}>
            <Stack.Screen
              name="Trimming"
              component={TrimmingScreen}
              options={{
                title: 'Adjust Clips',
                contentStyle: {backgroundColor: 'black'},
                headerStyle: {backgroundColor: 'black'},
                headerTitleStyle: {color: 'white'},
                headerRight: () => (
                  <Button
                    onPress={() => console.log('Trimming result saved')}
                    title="Save"
                    color="#fff"
                  />
                ),
              }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </MediaFilesContextProvider>
  );
}

function MockVideo(navigation: any) {
  return (
    <View style={{flex: 1}}>
      <Video
        source={require('./src/res/videos/nba.mp4')}
        style={{flex: 1}}
        controls={true}
        onBuffer={this.videoBuffer}
        ref={ref => {
          this.player = ref;
        }}
      />
    </View>
  );
}

export default App;
