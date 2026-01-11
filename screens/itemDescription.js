import React, { useState, useContext, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Image,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { db, collection, getDocs } from '../firebase/firebaseConfig';
import {
    colors,
    btn2,
} from '../globals/styles';
import { CartContext } from '../store/cart-context';

const ItemDescription = ({ navigation, route }) => {
    const cartItemsCtx = useContext(CartContext);

    const item = route.params;
    if (route.params === undefined) {
        navigation.navigate('Mainmenu');
    }

    const [addOns, setAddons] = useState([]);
    const [selectedAddons, setSelectedAddons] = useState([]);
    const [filteredAddons, setFilteredAddons] = useState([]);
    const [totalPrice, setTotalPrice] = useState(item.foodPrice);

    useEffect(() => {
        async function getData() {
            const snapshot = collection(db, 'addons');
            const addonsSnapshot = await getDocs(snapshot);
            const addonsList = await addonsSnapshot.docs.map((doc) => doc.data());
            setAddons(addonsList);
        }
        getData();
    }, []);


    useEffect(() => {
        if (item.foodAddons) {
            const filteredAddons = addOns.filter((addon) =>
                item.foodAddons.includes(addon.name)
            );
            setFilteredAddons(filteredAddons);
        }
    }, [addOns]);


    const handleAddonItemSelection = (addonName, itemName, itemPrice) => {
        setSelectedAddons((prevSelectedAddons) => {
            const index = prevSelectedAddons.findIndex(addon => addon.addonName === addonName);

            if (index !== -1) {
                // Remove the addon if it's already selected
                const newSelectedAddons = [...prevSelectedAddons];
                newSelectedAddons.splice(index, 1);
                return newSelectedAddons;
            } else {
                // Add a new addon to the list
                return [...prevSelectedAddons, { addonName, itemName, itemPrice }];
            }
        });
    };


    useEffect(() => {
        const addonsPrice = selectedAddons.reduce(
            (total, addon) => parseFloat(total) + parseFloat(addon.itemPrice),
            0
        );
        const subTotal = (parseFloat(item.foodPrice) + parseFloat(addonsPrice)).toFixed(2);
        setTotalPrice(subTotal);
    }, [selectedAddons]);



    // const addToCart = () => {

    //     let cartItem = {
    //         name: item.foodName,
    //         imageUrl: item.foodImageUrl,
    //         price: item.foodPrice,
    //         quantity: 1,
    //         addons: selectedAddons,
    //         total: totalPrice,

    //     };
    //     cartItemsCtx.addCartItem(cartItem);
    //     alert('Added to Cart');

    // };


    const addToCart = () => {
        if (cartItemsCtx.itemNames) {
            const existingCartItemIndex = cartItemsCtx.itemNames.findIndex(
                (cartItem) =>
                    cartItem.name === item.foodName &&
                    JSON.stringify(cartItem.addons) === JSON.stringify(selectedAddons)
            );

            if (existingCartItemIndex !== -1) {
                alert('Already Added to Cart');
            } else {
                const randomId = Math.floor(Math.random() * 1000);
                let cartItem = {
                    id: randomId,
                    name: item.foodName,
                    imageUrl: item.foodImageUrl,
                    price: item.foodPrice,
                    quantity: 1,
                    addons: selectedAddons,
                    total: totalPrice,
                };
                cartItemsCtx.addCartItem(cartItem);
                alert('Added to Cart');
            }
        }
    };



    return (
        <SafeAreaView style={style.container}>
            <ScrollView>
                <View style={style.descriptionContainer}>
                    <View style={style.imageContainer}>
                        <Image
                            source={{ uri: item.foodImageUrl }}
                            style={style.cardImage}
                        />
                    </View>

                    <View style={style.detailsContainer}>
                        <View style={style.detailsContainerInner}>
                            <Text style={style.foodName}>{item.foodName}</Text>
                            <Text style={style.foodPrice}>£{item.foodPrice}</Text>
                        </View>

                        <View style={style.aboutContainer}>
                            <Text style={style.about}>About</Text>
                            <Text style={style.foodDescription}>
                                {item.foodDescription}
                            </Text>
                        </View>
                    </View>
                    <View style={style.addonsContainer}>
                        <View style={style.addonsList}>
                            {filteredAddons.map((addon, addonIndex) => (
                                <View key={addonIndex} style={style.addonItemContainer}>
                                    <Text style={style.addonName}>{addon.name}</Text>
                                    {addon.addonItems &&
                                        addon.addonItems.length > 0 ? (
                                        <View style={style.itemsList}>
                                            {addon.addonItems.map(
                                                (item, itemIndex) => (
                                                    <TouchableOpacity
                                                        key={itemIndex}
                                                        style={[
                                                            style.addonItem,
                                                            selectedAddons.find(selectedAddon => selectedAddon.addonName === addon.name && selectedAddon.itemName === item.name) &&
                                                            style.selectedAddonItem,
                                                        ]}
                                                        onPress={() =>
                                                            handleAddonItemSelection(addon.name, item.name, item.price)
                                                        }
                                                    >
                                                        <Text>{item.name}</Text>
                                                        <Text>+ £{item.price}</Text>
                                                    </TouchableOpacity>
                                                )
                                            )}
                                        </View>
                                    ) : null}
                                </View>
                            ))}
                        </View>
                    </View>
                    <Text style={style.totalText}>Total: £{totalPrice}</Text>
                    <View style={style.buttonContainer}>
                        <TouchableOpacity
                            style={btn2}
                            onPress={() => addToCart()}
                        >
                            <Text style={style.buttonText}>Add to Cart</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    descriptionContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    imageContainer: {
        width: '100%',
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    cardImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    detailsContainerInner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    foodName: {
        fontSize: 25,
        color: colors.main,
        width: 220,
        marginRight: 10,
    },
    foodPrice: {
        fontSize: 24,
        color: colors.main,
    },
    aboutContainer: {
        backgroundColor: colors.mainsecondary,
        padding: 20,
        borderRadius: 10,
        elevation: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        shadowOpacity: 0.25,
    },
    about: {
        fontSize: 24,
        color: colors.secondary,
        textAlign: 'center',
    },
    foodDescription: {
        marginVertical: 10,
        fontSize: 15,
        color: colors.secondary,
    },
    container3: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    itemName: {
        color: colors.main,
        fontSize: 18,
        textAlign: 'center',
    },
    txt3: {
        color: colors.main,
        fontSize: 16,
        textAlign: 'center',
    },
    addonsContainer: {
        marginTop: 20,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    addonItemContainer: {
        marginBottom: 10,
    },
    addonName: {
        fontSize: 18,
        color: colors.main,
    },
    itemsList: {
        marginTop: 10,
        marginLeft: 20,
    },
    addonItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5
    },
    totalText: {
        fontSize: 20,
        color: colors.main,
        marginTop: 10,
        alignSelf: 'center'
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        backgroundColor: colors.main,
        color: colors.secondary,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 17,
        borderRadius: 10,
        width: '90%',
        textAlign: 'center',
    },
    selectedAddonItem: {
        borderColor: colors.main,
        padding: 5,
        borderWidth: 2,
        borderRadius: 5,
    },
});

export default ItemDescription;
