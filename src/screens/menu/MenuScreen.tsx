import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutUser } from '@wd/redux-store/reducers/user-reducer';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

const MenuScreen = () => {
  const dispatch = useDispatch();
  return (
    <View>
      <Text>MenuScreen</Text>

      <Pressable
        onPress={async () => {
          dispatch(logoutUser());
          await AsyncStorage.clear();
        }}
      >
        <Text>LOGOUT</Text>
      </Pressable>
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({});
