import React from 'react';
import { View, Text, FlatList, Picker, TextInput } from 'react-native';
import { ListItem, SearchBar, Divider } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import dateString from '../utilities/dateString';

const List = props => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <SearchBar
        lightTheme
        clearIcon={{ name: 'close' }}
        inputStyle={{ fontSize: 14 }}
        containerStyle={{
          backgroundColor: 'white',
          borderTopColor: 'white',
          borderBottomColor: 'white'
        }}
        onChangeText={props.updateKeyword}
        onClearText={() => props.updateKeyword('')}
        placeholder="Type name or address to search"
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 10,
          justifyContent: 'space-between'
        }}>
        <Text style={{ fontSize: 18, color: '#43484d' }}>For: </Text>
        <Picker
          selectedValue={props.filters.group}
          style={{ width: 150 }}
          mode="dropdown"
          onValueChange={group => props.updateGroup(group)}>
          <Picker.Item label="Any group" value="ALL" />
          <Picker.Item label="A+" value="A+" />
          <Picker.Item label="A-" value="A-" />
          <Picker.Item label="B+" value="B+" />
          <Picker.Item label="B-" value="B-" />
          <Picker.Item label="O+" value="O+" />
          <Picker.Item label="O-" value="O-" />
          <Picker.Item label="AB+" value="AB+" />
          <Picker.Item label="AB-" value="AB-" />
        </Picker>
        <Text style={{ fontSize: 18, color: '#43484d' }}>Who: </Text>
        <Picker
          selectedValue={props.filters.available}
          style={{ width: 150 }}
          mode="dropdown"
          onValueChange={available => props.updateAvailable(available)}>
          <Picker.Item label="Anyone" value="ALL" />
          <Picker.Item label="Can donate" value="AVAILABLE" />
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
                // item.phone,
                item.lastDonation &&
                  'Last donated - ' + dateString(new Date(item.lastDonation), 'short')
              ]
                .filter(x => x)
                .join('  |  ')}
              roundAvatar
              avatar={
                item.fbId && {
                  uri: `https://graph.facebook.com/${item.fbId}/picture`
                }
              }
              onPress={() =>
                props.navigation.navigate('ProfileInfo', { uid: item.uid })
              }
            />
          );
        }}
      />
      {props.actionButton && (
        <ActionButton
          hideShadow={false}
          buttonColor="#FF9800"
          nativeFeedbackRippleColor="rgba(255,255,255,0.40)"
          onPress={() =>
            props.navigation.navigate('EditProfile', { uid: 'NEW' })
          }
        />
      )}
    </View>
  );
};

export default List;
