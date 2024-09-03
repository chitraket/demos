import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {BottomSheet} from './components';

const BottomSheetScreen = () => {
  const bottomSheetRef: any = React.useRef();
  const openSheet = () => {
    bottomSheetRef.current?.setContent({
      title: 'Dynamic Title',
      description: 'This is a dynamic description that can be changed via ref.',
      handleConfirm: () => {
        console.log('Confirmed!');
        bottomSheetRef.current.close();
      },
      handleClose: () => {
        console.log('Closed!');
        bottomSheetRef.current.close();
      },
    });
    bottomSheetRef.current.open();
  };
  return (
    <>
      <View style={styles.viewStyle}>
        <TouchableOpacity onPress={openSheet} style={styles.toggleButton}>
          <Text style={styles.toggleButtonText}>Open Bottom Sheet</Text>
        </TouchableOpacity>
      </View>
      <BottomSheet ref={bottomSheetRef} />
    </>
  );
};

export default BottomSheetScreen;

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButton: {
    backgroundColor: '#b58df1',
    padding: 12,
    borderRadius: 48,
  },
  toggleButtonText: {
    color: 'white',
  },
});
