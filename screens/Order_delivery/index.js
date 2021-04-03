import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_API_KEY, COLORS, FONTS, SIZES, Icons} from '../../constants';
import Icon from '../../constants/global/icon';
import {RedPin} from '../../constants/icons';

const OrderDelivery = ({route, naivigation}) => {
  const mapView = React.useRef();

  const [restaurant, setRestaurant] = React.useState(null);
  const [streetName, setStreetName] = React.useState('');
  const [fromLocation, setFromLocation] = React.useState(null);
  const [toLocation, setToLocation] = React.useState(null);
  const [region, setRegion] = React.useState(null);

  const [angle, setAngle] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [isReady, setIsReady] = React.useState(false);

  //component did mount
  React.useEffect(() => {
    let {restaurant, currentLocation} = route.params;

    let fromLoc = currentLocation.gps;
    let toLoc = restaurant.location;
    let street = currentLocation.streetName;

    let mapRegion = {
      latitude: (fromLoc.latitude + toLoc.latitude) / 2,
      longitude: (fromLoc.longitude + toLoc.longitude) / 2,
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
      longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
    };
    setRestaurant(restaurant);
    setStreetName(street);
    setFromLocation(fromLoc);
    setToLocation(toLoc);
    setRegion(mapRegion);
  }, []);

  function calculateAngle(coordinates) {
    let startLat = coordinates[0].latitude;
    let startLng = coordinates[0].longitude;
    let endLat = coordinates[1].latitude;
    let endLng = coordinates[1].longitude;
    let dx = endLat - startLat;
    let dy = endLng - startLng;

    return (Math.atan2(dy, dx) * 180) / Math.PI;
  }

  function destinationHeader() {
    return (
      <View
        style={{
          position: 'absolute',
          top: 20,
          left: 0,
          right: 0,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: SIZES.width * 0.9,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding * 2,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
          }}>
          <Image
            source={Icons.RedPin}
            style={{
              width: 30,
              height: 30,
              marginRight: SIZES.padding,
            }}
          />

          <View style={{flex: 1}}>
            <Text style={{...FONTS.body3}}>{streetName}</Text>
          </View>

          <Text style={{...FONTS.body3}}>{Math.ceil(duration)} mins</Text>
        </View>
      </View>
    );
  }

  function map() {
    const destinationMarker = () => (
      <Marker coordinate={toLocation}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.primary,
            }}>
            <Icon
              name={'location-sharp'}
              type={'Ionicons'}
              style={{
                width: 25,
                height: 25,
                fontSize: 25,
                color: COLORS.white,
              }}
            />
            {/*<Image*/}
            {/*  source={Icons.Pin}*/}
            {/*  style={{*/}
            {/*    width: 25,*/}
            {/*    height: 25,*/}
            {/*    tintColor: COLORS.white,*/}
            {/*  }}*/}
            {/*/>*/}
          </View>
        </View>
      </Marker>
    );

    const carIcon = () => (
      <Marker
        coordinate={fromLocation}
        anchor={{x: 0.5, y: 0.5}}
        flat={true}
        rotation={angle}>
        <Image
          source={Icons.Car}
          style={{
            width: 40,
            height: 40,
          }}
        />
      </Marker>
    );

    return (
      <View style={{flex: 1}}>
        <MapView
          ref={mapView}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          style={{flex: 1}}>
          <MapViewDirections
            destination={toLocation}
            origin={fromLocation}
            strokeWidth={2}
            apikey={GOOGLE_API_KEY}
            strokeColor={COLORS.primary}
            optimizeWaypoints={true}
            onReady={(result) => {
              setDuration(result.duration);

              if (!isReady) {
                // Fit route into maps
                mapView.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: SIZES.width / 20,
                    bottom: SIZES.height / 4,
                    left: SIZES.width / 20,
                    top: SIZES.height / 8,
                  },
                });

                // Reposition the car
                let nextLoc = {
                  latitude: result.coordinates[0].latitude,
                  longitude: result.coordinates[0].longitude,
                };

                if (result.coordinates.length >= 2) {
                  let angle = calculateAngle(result.coordinates);
                  setAngle(angle);
                }

                setFromLocation(nextLoc);
                setIsReady(true);
              }
            }}
          />

          {destinationMarker()}
          {carIcon()}
        </MapView>
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      {map()}
      {destinationHeader()}
    </View>
  );
};

export default OrderDelivery;
