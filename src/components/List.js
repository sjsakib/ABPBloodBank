import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

const renderItem = ({ item }) => {
  return (
    <ListItem
      title={item.name}
      subtitle={item.group}
      leftAvatar={{
        source: item.photoURL && { uri: item.photoURL },
        title: item.name
      }}
    />
  );
};

const List = props => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList data={props.userList} keyExtractor={(item, index) => item.name} renderItem={renderItem} />
    </View>
  );
};

export default List;
