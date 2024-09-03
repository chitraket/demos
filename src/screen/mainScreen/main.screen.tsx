import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {navigationString} from '../../navigation/utils';

const MainScreen = ({navigation: {navigate}}) => {
  return (
    <View style={styles.mainView}>
      <TouchableOpacity
        onPress={() => navigate(navigationString.ToDoScreen)}
        style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>To Do</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigate(navigationString.ApiListScreen)}
        style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>Api List</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigate(navigationString.BottomSheetScreen)}
        style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>Bottom Sheet</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigate(navigationString.NavigationScreen)}
        style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>Navigation </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigate(navigationString.FormScreen)}
        style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>From</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButton: {
    backgroundColor: '#b58df1',
    padding: 12,
    borderRadius: 48,
    marginBottom: 20,
  },
  toggleButtonText: {
    color: 'white',
  },
});
