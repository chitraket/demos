import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';

const Loading = () => {
  return (
    <View style={styles.loadingView}>
      <ActivityIndicator />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
