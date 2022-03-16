import React from 'react';
import {StyleProp, Text, View, ViewStyle} from 'react-native';

export function SelectorComponent(
  style: StyleProp<ViewStyle> = {},
  text: String,
) {
  return !text ? (
    <View
      style={[
        {
          height: 20,
          width: 20,
          borderColor: 'white',
          borderWidth: 0.75,
          borderRadius: 20,
        },
        style,
      ]}
    />
  ) : (
    <View
      style={[
        {
          height: 20,
          width: 20,
          backgroundColor: '#2D6AC7',
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}>
      <Text style={{fontWeight: '700', fontSize: 10, color: 'white'}}>
        {text}
      </Text>
    </View>
  );
}
