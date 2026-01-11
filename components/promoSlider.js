import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import Swiper from 'react-native-swiper';
import { colors } from '../globals/styles'

const PromoSlider = () => {
  return <View>
    <View style={style.sliderContainer}>
      <Swiper autoplay = {true} showsPagination = {false}>
          <View style={style.slide}>
            <Image source = {require('../assets/images/hot.jpg')} style={style.slideImage}/>
          </View>
          <View style={style.slide}>
            <Image source = {require('../assets/images/happy.png')} style={style.slideImage}/>
          </View>
          <View style={style.slide}>
            <Image source = {require('../assets/images/24hours.png')} style={style.slideImage}/>
          </View>
      </Swiper>
    </View>
  </View>
};

export default PromoSlider;

const style = StyleSheet.create({

  sliderContainer: {
    width: '100%',
    height: 200,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },

  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },

  slideImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20
  }


});
