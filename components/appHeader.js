import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { colors } from '../globals/styles'

import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';



const AppHeader = ({ navigation }) => {
  return <View style={style.container}>
    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
      <FontAwesome name="user-circle" size={26} color={colors.main} style={style.icon} />
    </TouchableOpacity>
    <View>
      <Text style={style.brand}>JANGO'S</Text>
    </View>
    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
      <FontAwesome name="shopping-cart" size={26} color={colors.main}
        style={style.icon} />
    </TouchableOpacity>
  </View>
};

export default AppHeader;

const style = StyleSheet.create({

  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    // backgroundColor: colors.main,
    // elevation: 20,
    // shadowColor: 'black',
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 6,
    // shadowOpacity: 0.25,
  },

  brand: {
    color: colors.main,
    fontSize: 23,
    elevation: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.25,
  },
  icon: {
    elevation: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.25,
  }


});
