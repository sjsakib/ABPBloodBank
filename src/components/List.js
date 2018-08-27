import React from 'react';
import { View, Text, FlatList, Picker, TextInput } from 'react-native';
import { ListItem, SearchBar, Divider } from 'react-native-elements';
import dateString from '../utilities/dateString';

const renderItem = ({ item }) => {
  return (
    <ListItem
      containerStyle={{ borderBottomColor: '#e1e8ee' }}
      title={item.name}
      subtitle={[
        item.group,
        item.phone,
        item.lastDonation && dateString(new Date(item.lastDonation), 'short')
      ]
        .filter(x => x)
        .join('  |  ')}
      roundAvatar
      avatar={
        item.fbId && {
          uri: `https://graph.facebook.com/${item.fbId}/picture`
        }
      }
    />
  );
};

const List = props => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <SearchBar
        lightTheme
        clearIcon={{ name: 'close' }}
        noIcon
        onChangeText={props.updateKeyword}
        onClearText={props.updateKeyword}
        placeholder="Type name or address..."
      />
      <View style={{ flexDirection: 'row' }}>
        <Picker
          selectedValue={props.filters.group}
          style={{ width: 200 }}
          mode="dropdown"
          onValueChange={group => props.updateGroup(group)}>
          <Picker.Item label="All" value="ALL" />
          <Picker.Item label="A+" value="A+" />
          <Picker.Item label="A-" value="A-" />
          <Picker.Item label="B+" value="B+" />
          <Picker.Item label="B-" value="B-" />
          <Picker.Item label="O+" value="O+" />
          <Picker.Item label="O-" value="O-" />
        </Picker>
        <Picker
          selectedValue={props.filters.available}
          style={{ width: 200 }}
          mode="dropdown"
          onValueChange={available => props.updateAvailable(available)}>
          <Picker.Item label="All" value="ALL" />
          <Picker.Item label="Available" value="AVAILABLE" />
        </Picker>
      </View>
      <Divider />
      <FlatList
        data={props.users}
        keyExtractor={(item, index) => item.uid}
        renderItem={({ item }) => {
          return (
            <ListItem
              containerStyle={{ borderBottomColor: '#e1e8ee' }}
              title={item.name}
              subtitle={[
                item.group,
                item.phone,
                item.lastDonation &&
                  dateString(new Date(item.lastDonation), 'short')
              ]
                .filter(x => x)
                .join('  |  ')}
              roundAvatar
              avatar={
                item.fbId && {
                  uri: `https://graph.facebook.com/${item.fbId}/picture`
                }
              }
              onPress={() => props.navigation.navigate('ProfileInfo', { uid: item.uid})}
            />
          );
        }}
      />
    </View>
  );
};

export default List;
