import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

export function HeaderComponent(navigation) {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>Select videos or photos</Text>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigation.goBack()}>
        <Image source={require('../../../res/images/cross.png')} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 54,
  },
  description: {marginStart: 25, alignSelf: 'center', fontWeight: '700'},
  touchable: {marginEnd: 25, alignSelf: 'center'},
});
