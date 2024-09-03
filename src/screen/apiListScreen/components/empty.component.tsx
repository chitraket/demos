import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Empty = () => {
  return (
    <View style={styles.loadingView}>
      <Text>No data found</Text>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
