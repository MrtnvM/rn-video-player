import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import {MediaFilesContext} from '../../../context/MediaFilesContext';

export function BottomConfirmComponent(navigation) {
  const {selectedMediaFiles} = useContext(MediaFilesContext);
  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        You can select both videos and photos
      </Text>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => {
          if (selectedMediaFiles.length > 3) {
            Alert.alert(
              'Content too long',
              'You can only select up to 1 minute of content from your camera roll. Crop video outside of app to use in this post.',
              [
                {
                  text: 'Close',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
              ],
            );
          } else {
            navigation.goBack();
            navigation.navigate('MockVideo');
          }
        }}>
        <Text style={styles.text}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 102,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  description: {alignSelf: 'center', color: '#8C8C8C'},
  touchable: {
    height: 42,
    width: 79,
    backgroundColor: '#2D6AC7',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {color: 'white', fontWeight: '700', fontSize: 14},
});
