import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import {COLORS, FONTS, SIZES, Images, Icons} from '../../constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  bakedFries,
  burgerRestaurant,
  burgerRestaurant2,
  chicagoHotDog,
  ChikenPizza,
  crispyChickenBurger,
  friesRestaurant,
  hawaiianPizza,
  honeyMustardChickenBurger,
  HotDogRestaurant,
  iceKacang,
  japaneseRestaurant,
  kekLapis,
  kekLapisShop,
  koloMee,
  nasiBriyaniMutton,
  nasiLemak,
  noodleShop,
  pizza,
  pizzaRestaurant,
  sarawakLaksa,
  sushi,
  tehCPeng,
  tomatoPasta,
} from '../../constants/images';

const Home = () => {
  const initialCurrentLocation = {
    streetName: 'Nairobi',
    gps: {
      latitude: 1.2659896295332462,
      longitude: 36.910320886223715,
    },
  };

  const categoryData = [
    {
      id: 1,
      name: 'Rice',
      icon: Icons.RiceBowl,
    },
    {
      id: 2,
      name: 'Noodles',
      icon: Icons.Noodle,
    },
    {
      id: 3,
      name: 'Hot Dogs',
      icon: Icons.Hotdog,
    },
    {
      id: 4,
      name: 'Salads',
      icon: Icons.Salad,
    },
    {
      id: 5,
      name: 'Burgers',
      icon: Icons.Hamburger,
    },
    {
      id: 6,
      name: 'Pizza',
      icon: Icons.Pizza,
    },
    {
      id: 7,
      name: 'Snacks',
      icon: Icons.Fries,
    },
    {
      id: 8,
      name: 'Sushi',
      icon: Icons.Sushi,
    },
    {
      id: 9,
      name: 'Desserts',
      icon: Icons.Donut,
    },
    {
      id: 10,
      name: 'Drinks',
      icon: Icons.Drink,
    },
  ];

  // prices
  const affordable = 1;
  const fairPrice = 2;
  const expensive = 3;

  const restaurantData = [
    {
      id: 1,
      name: 'Best Food in Town',
      rating: 4.8,
      categories: [5, 7],
      priceRating: affordable,
      photo: Images.bakedFries,
      duration: '30 - 45 min',
      location: {
        latitude: 1.2659896295332462,
        longitude: 31.35632207358996,
      },
      courier: {
        avatar: Images.avatar3,
        name: 'Oyugi',
      },
      menu: [
        {
          menuId: 1,
          name: 'Crispy Chicken Burger',
          photo: Images.burgerRestaurant,
          description: 'Burger with crispy chicken, cheese and lettuce',
          calories: 200,
          price: 10,
        },
        {
          menuId: 2,
          name: 'Crispy Chicken Burger with Honey Mustard',
          photo: Images.burgerRestaurant2,
          description: 'Crispy Chicken Burger with Honey Mustard Coleslaw',
          calories: 250,
          price: 15,
        },
        {
          menuId: 3,
          name: 'Crispy Baked French Fries',
          photo: Images.chicagoHotDog,
          description: 'Crispy Baked French Fries',
          calories: 194,
          price: 8,
        },
      ],
    },
    {
      id: 2,
      name: 'Life is Good',
      rating: 4.8,
      categories: [2, 4, 6],
      priceRating: expensive,
      photo: Images.crispyChickenBurger,
      duration: '15 - 20 min',
      location: {
        latitude: 1.556306570595712,
        longitude: 110.35504616746915,
      },
      courier: {
        avatar: Images.avatar1,
        name: 'Naaman',
      },
      menu: [
        {
          menuId: 4,
          name: 'Hawaiian Pizza',
          photo: Images.friesRestaurant,
          description: 'Kenyan bacon, homemade pizza crust, pizza sauce',
          calories: 250,
          price: 15,
        },
        {
          menuId: 5,
          name: 'Tomato & Basil Pizza',
          photo: Images.pizza,
          description:
            'Fresh tomatoes, aromatic basil pesto and melted bocconcini',
          calories: 250,
          price: 20,
        },
        {
          menuId: 6,
          name: 'Tomato Pasta',
          photo: Images.hawaiianPizza,
          description: 'Pasta with fresh tomatoes',
          calories: 100,
          price: 10,
        },
        {
          menuId: 7,
          name: 'Mediterranean Chopped Salad ',
          photo: Images.honeyMustardChickenBurger,
          description: 'Finely chopped lettuce, tomatoes, cucumbers',
          calories: 100,
          price: 10,
        },
      ],
    },
    {
      id: 3,
      name: 'online Best Food',
      rating: 4.8,
      categories: [3],
      priceRating: expensive,
      photo: Images.sarawakLaksa,
      duration: '20 - 25 min',
      location: {
        latitude: 1.5238753474714375,
        longitude: 110.34261833833622,
      },
      courier: {
        avatar: Images.avatar3,
        name: 'Mavine',
      },
      menu: [
        {
          menuId: 8,
          name: 'Chicago Style Hot Dog',
          photo: Images.HotDogRestaurant,
          description: 'Fresh tomatoes, all beef hot dogs',
          calories: 100,
          price: 20,
        },
      ],
    },
    {
      id: 4,
      name: 'stomach doctor',
      rating: 4.8,
      categories: [8],
      priceRating: fairPrice,
      photo: Images.sushi,
      duration: '10 - 15 min',
      location: {
        latitude: 1.5578068150528928,
        longitude: 110.35482523764315,
      },
      courier: {
        avatar: Images.avatar3,
        name: 'Faith',
      },
      menu: [
        {
          menuId: 9,
          name: 'Sushi sets',
          photo: Images.sushi,
          description: 'Fresh salmon, sushi rice, fresh juicy avocado',
          calories: 100,
          price: 50,
        },
      ],
    },
    {
      id: 5,
      name: 'katolo food',
      rating: 4.8,
      categories: [1, 2],
      priceRating: affordable,
      photo: Images.japaneseRestaurant,
      duration: '15 - 20 min',
      location: {
        latitude: 1.558050496260768,
        longitude: 110.34743759630511,
      },
      courier: {
        avatar: Images.avatar4,
        name: 'Emily',
      },
      menu: [
        {
          menuId: 10,
          name: 'Kolo Mee',
          photo: Images.kekLapisShop,
          description: 'Noodles with char siu',
          calories: 200,
          price: 5,
        },
        {
          menuId: 11,
          name: 'Sarawak Laksa',
          photo: Images.kekLapis,
          description: 'Vermicelli noodles, cooked prawns',
          calories: 300,
          price: 8,
        },
        {
          menuId: 12,
          name: 'Nasi Lemak',
          photo: Images.koloMee,
          description: 'A traditional Malay rice dish',
          calories: 300,
          price: 8,
        },
        {
          menuId: 13,
          name: 'Nasi Briyani with Mutton',
          photo: Images.nasiLemak,
          description: 'A traditional Indian rice dish with mutton',
          calories: 300,
          price: 8,
        },
      ],
    },
    {
      id: 6,
      name: 'Nairobian food',
      rating: 4.9,
      categories: [9, 10],
      priceRating: affordable,
      photo: Images.nasiBriyaniMutton,
      duration: '35 - 40 min',
      location: {
        latitude: 1.5573478487252896,
        longitude: 110.35568783282145,
      },
      courier: {
        avatar: Images.avatar5,
        name: 'Billy Boss',
      },
      menu: [
        {
          menuId: 12,
          name: 'Teh C Peng',
          photo: Images.noodleShop,
          description: 'Three Layer Teh C Peng',
          calories: 100,
          price: 2,
        },
        {
          menuId: 13,
          name: 'ABC Ice Kacang',
          photo: Images.pizza,
          description: 'Shaved Ice with red beans',
          calories: 100,
          price: 3,
        },
        {
          menuId: 14,
          name: 'Kek Lapis',
          photo: Images.pizzaRestaurant,
          description: 'Layer cakes',
          calories: 300,
          price: 20,
        },
      ],
    },

    {
      id: 7,
      name: 'stomach doctor',
      rating: 4.8,
      categories: [8],
      priceRating: fairPrice,
      photo: Images.tehCPeng,
      duration: '10 - 15 min',
      location: {
        latitude: 1.5578068150528928,
        longitude: 110.35482523764315,
      },
      courier: {
        avatar: Images.avatar3,
        name: 'Faith',
      },
      menu: [
        {
          menuId: 15,
          name: 'Sushi sets',
          photo: Images.sushi,
          description: 'Fresh salmon, sushi rice, fresh juicy avocado',
          calories: 100,
          price: 50,
        },
      ],
    },
    {
      id: 8,
      name: 'stomach doctor',
      rating: 4.8,
      categories: [8],
      priceRating: expensive,
      photo: Images.tomatoPasta,
      duration: '10 - 15 min',
      location: {
        latitude: 1.5578068150528928,
        longitude: 110.35482523764315,
      },
      courier: {
        avatar: Images.avatar3,
        name: 'Faith',
      },
      menu: [
        {
          menuId: 16,
          name: 'Sushi sets',
          photo: Images.sushi,
          description: 'Fresh salmon, sushi rice, fresh juicy avocado',
          calories: 100,
          price: 50,
        },
      ],
    },
    {
      id: 9,
      name: 'stomach doctor',
      rating: 4.8,
      categories: [8],
      priceRating: fairPrice,
      photo: Images.iceKacang,
      duration: '10 - 15 min',
      location: {
        latitude: 1.5578068150528928,
        longitude: 110.35482523764315,
      },
      courier: {
        avatar: Images.avatar3,
        name: 'Faith',
      },
      menu: [
        {
          menuId: 17,
          name: 'Sushi sets',
          photo: Images.ChikenPizza,
          description: 'Fresh salmon, sushi rice, fresh juicy avocado',
          calories: 100,
          price: 50,
        },
      ],
    },
  ];

  const [categories, setCategories] = React.useState(categoryData);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [restaurants, setRestaurants] = React.useState(restaurantData);
  const [currentLocation, setCurrentLocation] = React.useState(
    initialCurrentLocation,
  );

  function onSelectCategory(category) {
    // filter restaurant
    let restaurantList = restaurantData.filter((a) =>
      a.categories.includes(category.id),
    );
    setRestaurants(restaurantList);
    setSelectedCategory(category);
  }
  function HeaderTop() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 40,
          marginTop: 4,
        }}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center',
            marginTop: 5,
          }}>
          <Image
            source={Icons.Nearby}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              width: '70%',
              height: '100%',
              backgroundColor: COLORS.lightgrey3,
              borderRadius: SIZES.radius,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{...FONTS.h4}}>{currentLocation.streetName}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: 'center',
          }}>
          <Image
            source={Icons.ShoppingBasket}
            resizeMde="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function mainCategories() {
    const renderItems = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
            backgroundColor:
              selectedCategory?.id === item.id ? COLORS.primary : COLORS.white,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: SIZES.padding,
            ...styles.shadow,
          }}
          onPress={() => onSelectCategory(item)}>
          <View
            style={{
              width: 52,
              height: 35,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                selectedCategory?.id === item.id
                  ? COLORS.white
                  : COLORS.lightgrey,
            }}>
            <Image
              source={item.icon}
              resizeMode="contain"
              style={{
                width: 40,
                height: 40,
              }}
            />
          </View>
          <Text
            style={{
              marginTop: SIZES.padding,
              color:
                selectedCategory?.id == item.id ? COLORS.white : COLORS.black,
              ...FONTS.body5,
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{padding: SIZES.padding}}>
        <Text style={{...FONTS.h2}}>Main</Text>
        <Text style={{...FONTS.h1}}>Categories</Text>

        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={renderItems}
          contentContainerStyle={{paddingVertical: SIZES.padding}}
        />
      </View>
    );
  }

  function restaurantList() {
    const renderItem = ({item}) => (
      <TouchableOpacity
        style={{marginBottom: SIZES.padding * 2}}
        onPress={() => console.log('move to the restaurant page with data')}>
        <View>
          <Image
            source={item.photo}
            resizeMode="cover"
            style={{
              width: '100%',
              height: 200,
              borderRadius: SIZES.radius,
            }}
          />
        </View>
      </TouchableOpacity>
    );
    return (
      <FlatList
        data={restaurants}
        vertical
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
        }}
      />
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {HeaderTop()}
      {mainCategories()}
      {restaurantList()}
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightgrey4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
    },
  },
});
