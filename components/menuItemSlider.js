import { React, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';


import { CartContext } from '../store/cart-context';

import { colors } from '../globals/styles'

const MenuItemSlider = ({ title, data, navigation, addItemToCart, cartItems }) => {

    const cartItemsCtx = useContext(CartContext);

    const openDescriptionPage = (item) => {
        navigation.navigate('Description', item);
    }

    const addToCart = (item) => {
        const itemAdded = cartItems.find(cartItem => cartItem.name === item.foodName);
        if (itemAdded) {
            alert('Already Added to Cart');
        }
        else {
            let cartItem = {
                name: item.foodName,
                imageUrl: item.foodImageUrl,
                price: item.foodPrice,
                quantity: 1
            };
            addItemToCart(cartItem);
            alert('Added to Cart');
        }
    }

    return <View style={style.container}>
        <Text style={style.title}>
            {title}
        </Text>

        <FlatList style={style.cardcontainer} data={data} horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (

                <View style={style.card}>
                    <TouchableOpacity key={item.id}
                        onPress={() => { openDescriptionPage(item) }}>
                        <View style={style.cardImageContainer}>
                            <Image source={{ uri: item.foodImageUrl }} style={style.cardImage} />
                        </View>

                        <View style={style.cardDetailContainer}>
                            <Text style={style.itemName}>{item.foodName}</Text>
                            <View style={style.itemPriceContainer}>
                                <Text style={style.itemPrice}>£{item.foodPrice}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.cardButtonContainer}
                        onPress={() => { openDescriptionPage(item) }}>
                        <View style={style.addButton}>
                            <Text style={style.buttonText}>Add to Cart</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            )} />
    </View>
};

export default MenuItemSlider;

const style = StyleSheet.create({

    container: {
        marginVertical: 10,
    },

    title: {
        color: colors.main,
        width: '90%',
        fontSize: 25,
        borderRadius: 10,
        marginHorizontal: 10
    },

    cardcontainer: {
        width: '100%',
    },

    card: {
        width: 300,
        height: 300,
        margin: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'grey'
    },

    cardImage: {
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        width: '100%',
        height: 200,
    },

    cardDetailContainer: {
        top: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    itemName: {
        fontSize: 18,
        color: colors.main,
        marginHorizontal: 5,
        width: 150
    },

    itemPriceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5
    },

    itemPrice: {
        fontSize: 18,
        marginRight: 5,
        color: colors.main,
    },

    cardButtonContainer: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 5,
        width: '100%',
    },

    addButton: {
        backgroundColor: colors.main,
        color: colors.secondary,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 20,
        borderRadius: 8,
        width: '80%',
    },

    buttonText: {
        color: colors.secondary,
        textAlign: 'center',
        fontSize: 15,
    }

});
