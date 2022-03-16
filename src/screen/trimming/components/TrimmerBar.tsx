import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export const TrimmerBar = () => {
  return (
    <View style={styles.container}>
      <Text>TrimmerBar</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: 'red',
  },
});
