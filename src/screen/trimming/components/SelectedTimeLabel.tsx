import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const SelectedTimeLabel = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.timeLabel}>6.8s selected</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 22,
    marginTop: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  timeLabel: {
    fontFamily: 'SF Pro Display',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});
