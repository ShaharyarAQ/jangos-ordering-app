import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';

import { colors } from '../globals/styles';

import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { MaterialIcons } from '@expo/vector-icons';


const Categories = () => {
  return <View style={style.container}>
    <Text style={style.head}>Categories</Text>

    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={style.box}>
        <FontAwesome5 name="hamburger" size={20} color="black" style={style.boxIcon} />
        <Text style={style.boxText}>Burgers</Text>
      </View>
      <View style={style.box}>
        <MaterialCommunityIcons name="food-turkey" size={24} color="black" style={style.boxIcon} />
        <Text style={style.boxText}>Chicken</Text>
      </View>
      <View style={style.box}>
        <MaterialCommunityIcons name="food-hot-dog" size={24} color="black" style={style.boxIcon} />
        <Text style={style.boxText}>Wraps</Text>
      </View>
      <View style={style.box}>
        <MaterialCommunityIcons name="food-croissant" size={24} color="black" style={style.boxIcon} />
        <Text style={style.boxText}>Desserts</Text>
      </View>
      <View style={style.box}>
        <Entypo name="drink" size={24} color="black" style={style.boxIcon} />
        <Text style={style.boxText}>Beverages</Text>
      </View>
    </ScrollView>

  </View>
};

export default Categories;

const style = StyleSheet.create({

  container: {
    backgroundColor: 'white',
    width: '100%',
    elevation: 10,
    // borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    marginBottom: 10,
  },
  head: {
    color: colors.main,
    fontSize: 20,
    margin: 10,
    alignSelf: 'center',

  },
  box: {
    backgroundColor: 'white',
    elevation: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    margin: 10,
    padding: 10,
    // borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  boxIcon: {
    marginRight: 10,
  }

});
