import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const BottomSheet = forwardRef(({toggleSheet, duration = 500}, ref) => {
  const height = useSharedValue(0);
  const isOpen = useSharedValue(false);
  const insets = useSafeAreaInsets();

  const progress = useDerivedValue(() =>
    withTiming(isOpen.value ? 0 : 1, {duration}),
  );
  const [sheetContent, setSheetContent] = useState({
    title: '',
    description: '',
    handleConfirm: () => {},
    handleClose: () => {},
  });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{translateY: progress.value * 2 * height.value}],
  }));

  const backgroundColorSheetStyle = {
    backgroundColor: '#f8f9ff',
  };

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    zIndex: isOpen.value
      ? 1
      : withDelay(duration, withTiming(-1, {duration: 0})),
  }));

  useImperativeHandle(ref, () => ({
    open: () => {
      isOpen.value = true;
    },
    close: () => {
      isOpen.value = false;
    },
    setContent: ({title, description, handleConfirm, handleClose}: any) => {
      setSheetContent({
        title: title || sheetContent.title,
        description: description || sheetContent.description,
        handleConfirm: handleConfirm || sheetContent.handleConfirm,
        handleClose: handleClose || sheetContent.handleClose,
      });
    },
  }));

  return (
    <>
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <TouchableOpacity style={styles.flex} onPress={toggleSheet} />
      </Animated.View>
      <Animated.View
        onLayout={e => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={[styles.sheet, sheetStyle, backgroundColorSheetStyle]}>
        <Text style={styles.title}>{sheetContent.title}</Text>
        <Text style={styles.description}>{sheetContent.description}</Text>
        <View
          style={{
            paddingBottom: Math.max(insets.bottom, 15),
            ...styles.buttonContainer,
          }}>
          <TouchableOpacity
            style={styles.bottomSheetButton}
            onPress={sheetContent.handleClose}>
            <Text style={[styles.bottomSheetButtonText, styles.closeButton]}>
              Close
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomSheetButton}
            onPress={sheetContent.handleConfirm}>
            <Text style={[styles.bottomSheetButtonText, styles.confirmButton]}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
});

export default BottomSheet;
const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  sheet: {
    paddingTop: 16,
    paddingHorizontal: 15,
    backgroundColor: 'green',
    minHeight: 150,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  bottomSheetButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  bottomSheetButtonText: {
    fontWeight: '600',
  },
  closeButton: {
    color: 'red',
  },
  confirmButton: {
    color: 'green',
  },
});
