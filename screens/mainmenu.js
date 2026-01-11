import { React, useContext } from 'react';
import {
    StyleSheet,
    StatusBar, Text, View,
    Button, TouchableOpacity,
    SafeAreaView, TextInput, ScrollView, FlatList
} from "react-native";

import AppHeader from "../components/appHeader";
import PromoSlider from "../components/promoSlider";
import MenuItemSlider from "../components/menuItemSlider";
import Cart from "./cart";

import { colors } from "../globals/styles";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useState, useEffect } from "react";

import { db, collection, getDocs, } from '../firebase/firebaseConfig';
import CartContextProvider from "../store/cart-context";
import { CartContext } from "../store/cart-context";
import AuthContextProvider from '../store/auth-context';

function Mainmenu({ navigation }) {

    const { itemNames, addCartItem } = useContext(CartContext);

    const [foodData, setFoodData] = useState([]);
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([]);
    const [categorizedItems, setCategorizedItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const handleCategoryPress = (categoryName) => {
        setSelectedCategory(categoryName);
    };


    useEffect(() => {
        async function getData() {
            const snapshot = collection(db, 'foodData');
            const foodSnapshot = await getDocs(snapshot);
            const foodList = await foodSnapshot.docs.map(doc => doc.data());
            setFoodData(foodList);


            const categoriesSnapshot = collection(db, 'categories');
            const categorySnapshot = await getDocs(categoriesSnapshot);
            const categoriesList = await categorySnapshot.docs.map(doc => doc.data());
            setCategories(categoriesList);
        };
        getData();

    }, [])

    // useEffect(() => {
    //     const categorized = categories.map(category => ({
    //         category: category.name,
    //         items: foodData.filter(item => item.foodCategory === category.name)
    //     }));
    //     setCategorizedItems(categorized);
    // }, [categories, foodData]);

    useEffect(() => {
        // Filter items based on the selected category
        const filteredItems =
            selectedCategory === 'All'
                ? foodData
                : foodData.filter(item => item.foodCategory === selectedCategory);

        // Categorize the filtered items
        const categorized = categories.map(category => ({
            category: category.name,
            items: filteredItems.filter(item => item.foodCategory === category.name),
        }));
        setCategorizedItems(categorized);
    }, [selectedCategory, categories, foodData]);


    return (
        <AuthContextProvider>
            <CartContextProvider>
                <SafeAreaView style={style.container}>
                    <StatusBar barStyle='dark-content' backgroundColor='black' />
                    <AppHeader navigation={navigation} />
                    <ScrollView>
                        <PromoSlider />
                        <View style={style.searchContainer}>
                            <Ionicons name="search" size={24} style={style.searchIcon} />
                            <TextInput placeholder="Search"
                                onChangeText={(text) => { setSearch(text) }}
                                style={style.searchInput} />
                        </View>
                        {search != '' && <View style={style.searchResultContainer}>

                            <View style={style.searchResultsList}>
                                {
                                    foodData.map((food) => {
                                        if (food.foodName.toLowerCase().includes(search.toLowerCase())) {
                                            return (
                                                <View key={food.foodName} style={style.searchResult}>
                                                    <AntDesign name='arrowright' size={24} color={colors.main} />
                                                    <TouchableOpacity onPress={() => navigation.navigate('Description', food)}>
                                                        <Text style={style.searchResultText}>{food.foodName}</Text>
                                                    </TouchableOpacity>

                                                </View>
                                            )
                                        }
                                    }
                                    )
                                }
                            </View>
                        </View>}
                        <View style={style.categoriesContainer}>
                            <Text style={style.head}>Categories</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <TouchableOpacity
                                    style={[style.box, selectedCategory === 'All' && style.selectedBox]}
                                    onPress={() => handleCategoryPress('All')}>
                                    <Text style={[style.boxText, selectedCategory === 'All' && style.selectedBoxText]}>All</Text>
                                </TouchableOpacity>
                                {categories.map((category, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[style.box, selectedCategory === category.name && style.selectedBox]}
                                        onPress={() => handleCategoryPress(category.name)}>
                                        <Text style={[style.boxText, selectedCategory === category.name && style.selectedBoxText]}>
                                            {category.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                        {categorizedItems.map((categoryItem, index) => (
                            <View key={index}>
                                {categoryItem.items.length > 0 && (
                                    <>
                                        <Text style={style.title}>{categoryItem.category}</Text>
                                        <MenuItemSlider
                                            data={categoryItem.items}
                                            navigation={navigation}
                                            addItemToCart={addCartItem}
                                            cartItems={itemNames}
                                        />
                                    </>
                                )}
                            </View>
                        ))}
                    </ScrollView>
                </SafeAreaView>
            </CartContextProvider>
        </AuthContextProvider>
    )
}

export default Mainmenu;

const style = StyleSheet.create({

    container: {
        flex: 1,
        width: '100%'
    },
    searchContainer: {
        flexDirection: 'row',
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 30,
        alignItems: 'center',
        padding: 10,
        margin: 20,
        elevation: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
    searchInput: {
        marginLeft: 10,
        width: '90%',
        fontSize: 18,
        color: colors.main
    },
    searchIcon: {
        color: colors.main
    },

    searchResultContainer: {
        width: '100%',
        marginHorizontal: 30,
        height: '100%',

    },

    searchResultsList: {
        width: '100%'
    },

    searchResult: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5
    },

    searchResultText: {
        marginLeft: 10,
        fontSize: 18,

    },
    title: {
        color: colors.main,
        width: '100%',
        fontSize: 25,
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: -20
    },

    ////Categories
    categoriesContainer: {
        backgroundColor: 'white',
        width: '95%',
        elevation: 10,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
        marginBottom: 10,
        alignSelf: 'center'
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
        marginHorizontal: 10,
        marginTop: 5,
        marginBottom: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 10
    },
    selectedBox: {
        backgroundColor: colors.main,
    },
    selectedBoxText: {
        color: 'white',
    },
    boxIcon: {
        marginRight: 10,
    }
});