import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
const OrderDelivery = () => {
  function map() {
    return (
      <View style={{flex: 1}}>
        <MapView style={{flex: 1}} />
      </View>
    );
  }
  return <View style={{flex: 1}}>{map()}</View>;
};

export default OrderDelivery;
