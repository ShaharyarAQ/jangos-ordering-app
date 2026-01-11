import { React, useState, useContext, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View

} from 'react-native';
import { colors, btn1, btn2, hr80, increse_decrease, quantityValue, quantityContainer } from '../globals/styles'
import { AuthContext } from "../store/auth-context";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { signOut  } from "firebase/auth";


import Orders from './orders';
import Addresses from './addresses';

const Tab = createMaterialTopTabNavigator();

const Profile = () => {

    const authCtx = useContext(AuthContext);
    const [user, setUser] = useState('');
    const [userId, setUserId] = useState('');


    useEffect(() => {
        const assignData = async () => {
            if (authCtx.isLogin == true) {
                await setUser(authCtx.userDetails.email);
                await setUserId(authCtx.userDetails.id);
            }
            else {
                await setUser('');
                await setUserId('Guest User');
            }
        };
        assignData();
    }, [])

    const logoutHandler = async () => { 
        authCtx.saveDetails({});
        alert('Logged Out');
        authCtx.toggleLogin();

    }

    return (
        <SafeAreaView style={style.container}>
            <View style={style.btnContainer}>
                <TouchableOpacity style={btn2} onPress={() => logoutHandler()}>
                    <Text style={style.btntxt}>
                        Log Out
                    </Text>
                </TouchableOpacity>
            </View>
            <Tab.Navigator
                initialRouteName="Orders"
                screenOptions={{
                    tabBarActiveTintColor: colors.main,
                    tabBarInactiveTintColor: colors.secondary100,
                    tabBarLabelStyle: { "fontSize": 14 },
                    tabBarIndicatorStyle: { backgroundColor: colors.mainsecondary },

                }}
            >
                <Tab.Screen
                    name="Orders"
                    component={Orders}
                    options={{ topBarLabel: 'Orders' }}
                />
                <Tab.Screen
                    name="My Addresses"
                    component={Addresses}
                    options={{ topBarLabel: 'My Addresses' }}
                />
                {/* <Tab.Screen
                        name="Settings"
                        component={Settings}
                        options={{ topBarLabel: 'Settings' }}
                    /> */}
            </Tab.Navigator>
        </SafeAreaView>
    )
};

export default Profile;

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    btnContainer: {
        alignItems: 'center'
    },
    btntxt: {
        color: colors.secondary,
        fontSize: 20,
    },
});
