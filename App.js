import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartContextProvider from './store/cart-context';


import Welcome from './screens/welcome';
import Home from './screens/home';


import { useState } from 'react';


const Stack = createNativeStackNavigator();


export default function App() {

  const [buttonPressed, setbuttonPressed] = useState(false);

  function changeWelcomeScreenHandler() {
    setbuttonPressed(true);
  };

  return (
    <View style={styles.rootScreen}>{buttonPressed === false ? <Welcome onPress={changeWelcomeScreenHandler}/> : <Home/>}</View>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex:1
  },
});
