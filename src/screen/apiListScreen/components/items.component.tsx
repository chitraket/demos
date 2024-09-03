import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Items = ({title}: {title: string}) => {
  return (
    <View style={styles.viewStyle}>
      <Text>{title || ''}</Text>
    </View>
  );
};

export default Items;

const styles = StyleSheet.create({
  viewStyle: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    padding: 8,
  },
});
