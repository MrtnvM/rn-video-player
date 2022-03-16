import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Button, StatusBar} from 'react-native';

export const useTrimmingNavigationBar = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          onPress={() => navigation.goBack()}
          title="Cancel"
          color="#fff"
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    return () => StatusBar.setBarStyle('dark-content');
  }, []);
};
