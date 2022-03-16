import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {BottomConfirmComponent} from './components/BottomConfirmComponent';
import {HeaderComponent} from './components/HeaderComponent';
import {SelectedMediaFilesComponent} from './components/SelectedMediaFilesComponent';
import {PhotosTab} from './photos_tab/PhotosTabContent';
import {VideosTab} from './videos_tab/VideosTabContent';

const Tab = createMaterialTopTabNavigator();

export function MediaFilesScreen({navigation}) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {HeaderComponent(navigation)}

        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarLabel: ({focused, color}) => {
              return focused ? (
                <Text style={[styles.topBar, {color}]}>{route.name}</Text>
              ) : (
                <Text style={{color}}>{route.name}</Text>
              );
            },
          })}>
          <Tab.Screen name="Videos" component={VideosTab} />
          <Tab.Screen name="Photos" component={PhotosTab} />
        </Tab.Navigator>

        {SelectedMediaFilesComponent()}
        {BottomConfirmComponent(navigation)}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1, marginTop: 50},
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
  },
  topBar: {fontWeight: '700', marginStart: -2},
});
