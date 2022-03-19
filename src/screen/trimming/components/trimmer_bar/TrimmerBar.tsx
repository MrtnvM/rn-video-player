import React, {useCallback, useState} from 'react';
import {Dimensions, LayoutChangeEvent, StyleSheet, View} from 'react-native';
import {ThumbnailsBackground} from './components/ThumbnailsBackground';
import {TrimmerEdgesView} from './components/TrimmerEdgesView';

const HORIZONTAL_MARGIN = 12;

export const TrimmerBar = () => {
  const [maxWidth, setMaxWidth] = useState(
    Dimensions.get('window').width - HORIZONTAL_MARGIN * 2,
  );

  const updateMaxWidth = useCallback((event: LayoutChangeEvent) => {
    setMaxWidth(event.nativeEvent.layout.width - HORIZONTAL_MARGIN * 2);
  }, []);

  return (
    <View style={styles.container} onLayout={updateMaxWidth}>
      <ThumbnailsBackground />
      <TrimmerEdgesView maxWidth={maxWidth} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    marginHorizontal: HORIZONTAL_MARGIN,
    flexDirection: 'row',
  },
});
