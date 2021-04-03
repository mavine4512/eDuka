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
import Icon from '../../constants/global/icon';

const Restaurant = ({route, navigation}) => {
  const scrollX = new Animated.Value(0);
  const [restaurant, setRestaurant] = React.useState(null);
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [orderItems, setOrderItems] = React.useState([]);

  React.useEffect(() => {
    let {item, currentLocation} = route.params;
    setRestaurant(item);
    setCurrentLocation(currentLocation);
  }, [route.params]);

  function editOrder(action, menuId, price) {
    let orderList = orderItems.slice();
    let item = orderList.filter((a) => a.menuId === menuId);

    if (action === '+') {
      if (item.length > 0) {
        let newQty = item[0].qty + 1;
        item[0].qty = newQty;
        item[0].total = item[0].qty * price;
      } else {
        const newItem = {
          menuId: menuId,
          qty: 1,
          price: price,
          total: price,
        };
        orderList.push(newItem);
      }
      setOrderItems(orderList);
    } else {
      if (item.length > 0) {
        if (item[0]?.qty > 0) {
          let newQty = item[0].qty - 1;
          item[0].qty = newQty;
          item[0].total = newQty + price;
        }
      }
      setOrderItems(orderList);
    }
  }

  function getTotalItemCount() {
    let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0);
    return itemCount;
  }

  function getSumOrder() {
    let total = orderItems.reduce((a, b) => a + (b.total || 0), 0);

    return total.toFixed(2);
  }

  function getOrderQty(menuId) {
    let orderItem = orderItems.filter((a) => a.menuId === menuId);
    if (orderItem.length > 0) {
      return orderItem[0].qty;
    }
    return 0;
  }

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
          <Icon
            name={'chevron-back'}
            type={'Ionicons'}
            style={{
              width: 40,
              height: 40,
              fontSize: 30,
            }}
          />
          {/*<Image*/}
          {/*  source={Icons.Back_Icon}*/}
          {/*  resizeMode="contain"*/}
          {/*  style={{*/}
          {/*    width: 30,*/}
          {/*    height: 30,*/}
          {/*  }}*/}
          {/*/>*/}
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
              marginBottom: 10,
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
          <Icon
            name={'format-list-bulleted'}
            type={'MaterialCommunityIcons'}
            style={{
              width: 40,
              height: 40,
              fontSize: 30,
            }}
          />
          {/*<Image*/}
          {/*  source={Icons.List}*/}
          {/*  resizeMode="contain"*/}
          {/*  style={{*/}
          {/*    width: 30,*/}
          {/*    height: 30,*/}
          {/*  }}*/}
          {/*/>*/}
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
                  }}
                  onPress={() => editOrder('-', item.menuId, item.price)}>
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
                  <Text style={{...FONTS.h2}}>{getOrderQty(item.menuId)}</Text>
                </View>
                <TouchableOpacity
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopRightRadius: 25,
                    borderBottomRightRadius: 25,
                  }}
                  onPress={() => editOrder('+', item.menuId, item.price)}>
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
            <Text style={{...FONTS.h3}}>{getTotalItemCount()} Cart items</Text>
            <Text style={{...FONTS.h3}}>Ksh {getSumOrder()}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: SIZES.padding * 2,
              paddingVertical: SIZES.padding * 2,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Icon
                name={'location-sharp'}
                type={'Ionicons'}
                style={{
                  width: 20,
                  height: 20,
                  fontSize: 20,
                  color: COLORS.darkgrey,
                }}
              />
              {/*<Image*/}
              {/*  source={Icons.Pin}*/}
              {/*  resizeMode="contain"*/}
              {/*  style={{*/}
              {/*    width: 20,*/}
              {/*    height: 20,*/}
              {/*    tintColor: COLORS.darkgrey,*/}
              {/*  }}*/}
              {/*/>*/}
              <Text
                style={{
                  marginLeft: SIZES.padding,
                  ...FONTS.h4,
                }}>
                Location
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={Icons.Mastercard}
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
                Payment
              </Text>
            </View>
          </View>

          <View
            style={{
              padding: SIZES.padding * 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: SIZES.width * 0.91,
                padding: SIZES.padding,
                alignItems: 'center',
                backgroundColor: COLORS.primary,
                borderRadius: SIZES.radius,
              }}
              onPress={() =>
                navigation.navigate('OrderDelivery', {
                  restaurant: restaurant,
                  currentLocation: currentLocation,
                })
              }>
              <Text style={{...FONTS.h2, color: COLORS.white}}>Make Order</Text>
            </TouchableOpacity>
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
