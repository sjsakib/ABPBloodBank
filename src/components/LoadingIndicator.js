import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export default (LoadingIndicator = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <ActivityIndicator size="large" />
  </View>
));
