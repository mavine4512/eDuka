import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';

import {COLORS, FONTS, SIZES, Icons} from '../../constants';

const Restaurant = ({route, navigation}) => {
  const scrollX = new Animated.Value(0);
  const [restaurant, setRestaurant] = React.useState(null);
  const [currentLocation, setCurrentLocation] = React.useState(null);

  React.useEffect(() => {
    let {item, currentLocation} = route.params;
    setRestaurant(item);
    setCurrentLocation(currentLocation);
  }, [route.params]);

  function HeaderTop() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <Image
            source={Icons.Back_Icon}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>

        {/* Restaurant Name Section */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: SIZES.padding * 3,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightgrey3,
            }}>
            {/*optional parameter .name can be null*/}
            <Text style={{...FONTS.h3}}>{restaurant?.name}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: 'center',
          }}>
          <Image
            source={Icons.List}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
  function foodDetails() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}>
        {restaurant?.menu.map((item, index) => (
          <View style={{alignItems: 'center'}}>
            <View style={{height: SIZES.height * 0.29}}>
              <Image
                source={item.photo}
                style={{
                  width: SIZES.width,
                  height: '100%',
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: -20,
                  width: SIZES.width,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopLeftRadius: 25,
                    borderBottomLeftRadius: 25,
                  }}>
                  <Text
                    style={{
                      color: COLORS.black,
                      ...FONTS.body2,
                    }}>
                    -
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{...FONTS.h2}}>1</Text>
                </View>
                <TouchableOpacity
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopRightRadius: 25,
                    borderBottomRightRadius: 25,
                  }}>
                  <Text
                    style={{
                      color: COLORS.black,
                      ...FONTS.body2,
                    }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                width: SIZES.width,
                alignItems: 'center',
                marginTop: 15,
                paddingHorizontal: SIZES.padding * 2,
              }}>
              <Text
                style={{
                  marginVertical: 10,
                  textAlign: 'center',
                  ...FONTS.h3,
                }}>
                {item.name} - Ksh {item.price.toFixed(2)}
              </Text>
              <Text style={{...FONTS.body3}}>{item.description}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
              }}>
              <Image
                source={Icons.Fire}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 10,
                }}
              />
              <Text style={{...FONTS.body3, color: COLORS.darkgrey}}>
                {item.calories.toFixed(2)}
              </Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    );
  }
  function dotsOnTop() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);
    return (
      <View syle={{height: 30}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: SIZES.padding,
          }}>
          {restaurant?.menu.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: 'clamp',
            });

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.darkgrey, COLORS.primary, COLORS.darkgrey],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }
  function orderFood() {
    return (
      <View>
        {dotsOnTop()}
        <View
          style={{
            backgroundColor: COLORS.secondary,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            marginTop: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
              borderBottomColor: COLORS.lightgrey2,
              borderBottomWidth: 1,
            }}>
            <Text style={{...FONTS.h3}}>Cart items</Text>
            <Text style={{...FONTS.h3}}>Ksh 45</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: SIZES.padding * 2.5,
              paddingVertical: SIZES.padding * 2,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image
                source={Icons.Pin}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.darkgrey,
                }}
              />
              <Text
                style={{
                  marginLeft: SIZES.padding,
                  ...FONTS.h4,
                }}>
                Location
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {HeaderTop()}
      {foodDetails()}
      {orderFood()}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightgrey2,
  },
});
export default Restaurant;
