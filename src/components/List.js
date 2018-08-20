import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

const renderItem = ({ item }) => {
  return (
    <ListItem
      title={item.name}
      subtitle={item.group}
      leftAvatar={{
        source: item.fbId && { uri: `https://graph.facebook.com/${item.fbId}/picture` },
        title: item.name
      }}
    />
  );
};

const List = props => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList data={props.users} keyExtractor={(item, index) => item.name} renderItem={renderItem} />
    </View>
  );
};

export default List;
