import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./screens/login";
import Signup from "./screens/signup"
import Mainmenu from "./screens/mainmenu";
import ItemDescription from "./screens/itemDescription";
import Cart from "./screens/cart";
import Checkout from "./screens/checkout";
import Confirmation from "./screens/confirmation";

import { colors } from "./globals/styles";

const RootNavigation = () => {

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Mainmenu">
                <Stack.Screen name="Mainmenu" component={Mainmenu} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login}
                    options={{ headerTitle: '', headerTransparent: true, headerTintColor: colors.main }} />
                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                <Stack.Screen name="Description" component={ItemDescription}
                    options={{ headerTitle: '', headerTransparent: true, headerTintColor: colors.main }} />
                <Stack.Screen name="Cart" component={Cart}
                    options={{ headerTransparent: true, headerTintColor: colors.main }} />
                <Stack.Screen name="Checkout" component={Checkout}
                    options={{ headerTransparent: true, headerTintColor: colors.main }} />
                <Stack.Screen name="Confirmation" component={Confirmation} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation;