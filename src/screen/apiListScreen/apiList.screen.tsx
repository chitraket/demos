import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {useApiList} from './hooks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Empty, Items, Loading} from './components';

const ApiListScreen = () => {
  const {response, loading} = useApiList();
  const insets = useSafeAreaInsets();
  const renderItem = (item: any) => {
    return <Items {...item} />;
  };
  if (loading) return <Loading />;
  return (
    <FlatList
      data={response}
      style={{
        marginTop: Math.max(Number(insets?.top), 15),
      }}
      contentContainerStyle={{
        paddingLeft: Math.max(Number(insets?.left), 15),
        paddingRight: Math.max(Number(insets?.right), 15),
      }}
      ItemSeparatorComponent={() => <View style={styles.itemSeparatorStyle} />}
      renderItem={({item}) => renderItem(item)}
      renderEmptyListComponent={() => <Empty />}
    />
  );
};

export default ApiListScreen;

const styles = StyleSheet.create({
  itemSeparatorStyle: {
    marginBottom: 8,
  },
});
