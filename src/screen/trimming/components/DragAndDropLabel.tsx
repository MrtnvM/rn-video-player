import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const DragAndDropLabel = () => {
  return useMemo(
    () => (
      <View style={styles.container}>
        <Text style={styles.timeLabel}>Tap to edit, drag to reorder</Text>
      </View>
    ),
    [],
  );
};

const styles = StyleSheet.create({
  container: {
    height: 16,
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
    alignItems: 'flex-start',
  },
  timeLabel: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'left',
    color: '#8C8C8C',
  },
});
