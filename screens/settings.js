import { React, useState, useContext, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    FlatList,
    Text,
    Image,
    TouchableOpacity,
    View
} from 'react-native';
import { colors, btn1, btn2, hr80, increse_decrease, quantityValue, quantityContainer } from '../globals/styles'
import { db, collection, addDoc } from '../firebase/firebaseConfig';
import { AuthContext } from "../store/auth-context";


const Settings = () => {

    return (
        <SafeAreaView>
            <Text>Settings</Text>
        </SafeAreaView>


    )
};

export default Settings;

const style = StyleSheet.create({

});
