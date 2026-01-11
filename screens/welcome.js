import { StyleSheet, View, Image, Text, SafeAreaView, TouchableOpacity } from "react-native";

import { colors } from "../globals/styles";

function Welcome({onPress}) {
    return <SafeAreaView style={style.container}>
        <View style={style.imagecontainer}>
            <Image style={style.image} source={require("../assets/images/logo.png")}/>
        </View>

        <View>
            <Text style={style.text}>BURGERS, PERI PERI CHICKEN & MILKSHAKES</Text>
        </View>

        <TouchableOpacity activeOpacity={0.8} onPress={onPress}> 
        <View style={style.buttoncontainer}>
           
        <Text style={style.buttontext}>GET STARTED!</Text>
        </View>
        </TouchableOpacity>



    </SafeAreaView>
}

export default Welcome;

const style = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: colors.main
    },

    imagecontainer: {
        height: 400,
        
    },

    image: {
        width: "100%",
        resizeMode: 'contain', 

    },

    text: {
        fontSize: 32,
        textAlign: 'center'
    },

    buttoncontainer:{
        backgroundColor: colors.secondary,
        height: 60,
        margin: 100,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'

    },

    buttontext: {
        fontSize: 23
    }






});