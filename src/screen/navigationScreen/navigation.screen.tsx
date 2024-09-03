import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {navigationString} from '../../navigation/utils';

const NavigationScreen: React.FC<{navigation: any}> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(navigationString.NavigationDetailsScreen, {
            message: 'Hello from Home!',
          })
        }>
        <Text>Go to Details</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavigationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});
