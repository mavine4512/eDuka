import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import Svg, {Path} from 'react-native-svg';
import {Home} from '../screens';
import {COLORS, Icons} from '../constants';

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({accessibilityState, children, onPress}) => {
  let isSelected = accessibilityState.selected;

  if (isSelected) {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{flexDirection: 'row', position: 'absolute', top: 0}}>
          <View style={{flex: 1, backgroundColor: COLORS.white}} />
          <Svg width={55} height={40} viewBox="0 0 55 40">
            <Path
              d="M318.37,85.45L422.53,190.11,158.89,455,54.79,350.38ZM501.56,60.2L455.11,13.53a45.93,45.93,0,0,0-65.11,0L345.51,58.24,449.66,162.9l51.9-52.15A35.8,35.8,0,0,0,501.56,60.2ZM0.29,497.49a11.88,11.88,0,0,0,14.34,14.17l116.06-28.28L26.59,378.72Z"
              fill={COLORS.white}
            />
          </Svg>
          <View style={{flex: 1, backgroundColor: COLORS.white}} />
        </View>
        <TouchableOpacity
          style={{
            top: -20,
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: COLORS.white,
          }}
          onPress={onPress}>
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={{flex: 1, height: 60, backgroundColor: COLORS.white}}
        activeOpacity={1}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
};
const CustomTabBar = (props) => {
  return (
    <View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 15,
          backgroundColor: COLORS.white,
        }}
      />
      <BottomTabBar {...props.props} />
    </View>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
      tabBar={(props) => <CustomTabBar props={props} />}>
      <Tab.Screen
        name="Home"
        component={Home}
        style={{borderRadius: 40, elevation: 1}}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={Icons.EatIcon}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={Icons.Search}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Star"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={Icons.like}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="User"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={Icons.User}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};
export default Tabs;
