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
import { AntDesign } from '@expo/vector-icons';
// import { db, collection, getDocs } from '../firebase/firebaseConfig';
import { colors, btn1, btn2, hr80, increse_decrease, quantityValue, quantityContainer } from '../globals/styles'
import { CartContext } from '../store/cart-context';



const Cart = ({ navigation }) => {

    // const [cartItems, setCartItems] = useState([]);
    const cartItemsCtx = useContext(CartContext);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);


    // useEffect(() => {
    //     const fetchData = async () => {
    //         await setCartItems(cartItemsCtx.itemNames);
    //     };
    //     fetchData();
    // }, []);

    useEffect(() => {
        const assignData = async () => {
            await setCart(cartItemsCtx.itemNames);
        };
        assignData();
    }, [])

    useEffect(() => {
        const assignData = async () => {
            await setCart(cartItemsCtx.itemNames);
        };
        assignData();
    }, [cartItemsCtx.itemNames])

    const increaseQuantity = (id) => {
        cartItemsCtx.increaseQuantity(id);
    }

    const decreaseQuantity = (id) => {
        cartItemsCtx.decreaseQuantity(id);
    }

    useEffect(() => {
        if (cart != null) {
            let total = 0;
            cart.map((item) => {
                total = item.total * item.quantity + total;
            })
            setTotal(total);
        }
    }, [cart])

    const openCheckoutPage = (cart, total) => {

        let orderDetails = {
            items: cart,
            total: total
        };
        navigation.navigate('Checkout', orderDetails);
    }


    const calculateImgHeight = (numAddons) => {
        const baseHeight = 150;
        const addonHeight = 20;
        return baseHeight + numAddons * addonHeight;
    };

    return (
        <SafeAreaView style={style.container}>
            <View style={style.container}>
                {cart.length > 0 ? (
                    <>
                        <FlatList style={style.cardlist} data={cart}
                            renderItem={
                                ({ item }) => {
                                    return (
                                        <View style={style.cartcard}>

                                            <Image source={{ uri: item.imageUrl }}
                                                style={[style.cartimg, { height: calculateImgHeight(item.addons ? item.addons.length : 0) }]} />

                                            <View style={style.cartcardin}>

                                                <View style={style.c1}>
                                                    <Text style={style.txt1}>{item.quantity}&nbsp;{item.name}</Text>
                                                    <Text style={style.txt2}>£{item.price}/each</Text>
                                                </View>
                                                {item.addons && item.addons.length > 0 && (
                                                    <View style={style.c2}>
                                                        <Text style={style.addons}>Add-ons</Text>
                                                        {item.addons.map((addon, addonIndex) => (
                                                            <View key={addonIndex} style={style.c1}>
                                                                <Text style={style.txt4}>{addon.itemName} - £{addon.itemPrice}</Text>
                                                            </View>
                                                        ))}
                                                    </View>
                                                )}
                                                <View style={style.c2}>
                                                    <Text style={style.txt3}>Total: £{item.total*item.quantity}</Text>
                                                </View>
                                                <View style={style.c4}>
                                                    <View style={quantityContainer}>
                                                        <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
                                                            <AntDesign name="minuscircleo" style={increse_decrease} />
                                                        </TouchableOpacity>
                                                        <View style={quantityValue}><Text>{item.quantity}</Text></View>
                                                        <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
                                                            <AntDesign name="pluscircleo" style={increse_decrease} />
                                                        </TouchableOpacity>
                                                    </View>
                                                    <TouchableOpacity onPress={() => cartItemsCtx.removeCartItem(item)}>
                                                        <AntDesign name="delete" size={18} color="black" style={style.del} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }
                            } />
                        <View style={style.btncont}>
                            <View style={style.c3}>
                                <Text style={style.txt5}>Total</Text>
                                <Text style={style.txt6}>£{total.toFixed(2)}</Text>
                            </View>
                            <TouchableOpacity style={btn2} onPress={() => openCheckoutPage(cart, total)}>
                                <Text style={style.btntxt}>
                                    Checkout
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </>
                ) :
                    (
                        <Text style={style.head2}>Cart is empty</Text>
                    )}
            </View>
        </SafeAreaView>

    )
};

export default Cart;

const style = StyleSheet.create({

    container: {
        flex: 1,
        // alignItems: 'center',
        width: '100%'

    },

    head2: {
        flex: 1,
        fontSize: 30,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.main,
    },
    cardlist: {
        width: '100%'
    },
    cartcard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginVertical: 5,
        borderRadius: 10,
        width: '95%',
        alignSelf: 'center',
        elevation: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.25,
        alignItems: 'center'
    },
    cartimg: {
        width: 130,
        // height: 150,
        borderRadius: 10,
        margin: 1
    },
    cartcardin: {
        flexDirection: 'column',
        margin: 5,
        width: '58%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    c1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    c2: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    txt1: {
        fontSize: 13,
        color: colors.main,
        width: 180
    },
    txt2: {
        fontSize: 13,
        color: colors.main,
    },
    addons: {
        marginTop: 5,
        marginBottom: 2,
        fontSize: 15,
    },
    txt3: {
        marginVertical: 5,
        fontSize: 13,
        borderColor: colors.main,
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
    },
    txt4: {
        color: colors.main,
        fontSize: 13,
    },
    del: {
        color: colors.main
    },
    c4: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%'
    },
    btncont: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        flexDirection: 'row',
        marginBottom: 80,
        borderTopWidth: 0.8,
        borderTopColor: colors.main
    },
    btntxt: {
        color: colors.secondary,
        fontSize: 20,
    },
    c3: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    txt5: {
        fontSize: 20,
    },
    txt6: {
        fontSize: 25,
        marginHorizontal: 5,
    }
});
