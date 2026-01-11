import { StyleSheet, View, Text, SafeAreaView, Image } from "react-native";
import { React, useState, useEffect, useRef } from 'react';
import { colors } from "../globals/styles";
import { db, collection, onSnapshot } from '../firebase/firebaseConfig';
import { waitForPendingWrites } from "firebase/firestore";

function Confirmation({ navigation, route }) {

    const orderNumber = route.params;
    if (route.params === undefined) {
        navigation.navigate('Checkout');
    }
    const ordersRef = useRef(orders);
    const [orders, setOrders] = useState([]);
    const [specifcOrder, setSpecificOrder] = useState({});


    useEffect(() => {
        // Reference to the 'orders' collection
        const ordersCollection = collection(db, 'orders');

        // Subscribe to real-time updates
        const unsubscribe = onSnapshot(ordersCollection, (querySnapshot) => {
            const updatedOrders = querySnapshot.docs.map(doc => ({
                orderId: doc.id,
                ...doc.data()
            }));
            let sortedArray = updatedOrders.sort((a, b) => b.date.localeCompare(a.date));
            ordersRef.current = sortedArray;
            setOrders(sortedArray);
        });
        return () => unsubscribe();
    }, []);


    useEffect(() => {
        // Find the specific order based on orderNumber
        const foundOrder = orders.find(order => order.orderNumber === orderNumber);

        if (foundOrder) {
            setSpecificOrder(foundOrder);
        } else {
            // Handle the case where the order is not found
            console.log(`Order with orderNumber ${orderNumber} not found.`);
        }
    }, [orderNumber, orders]);


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imagecontainer}>
                <Image style={styles.image} source={require("../assets/images/logo.png")} />
            </View>
            {specifcOrder.status === "pending" ?
                <View style={styles.centeredContainer}>
                    <Text style={styles.text}>Thank You for your order</Text>
                    <Text style={styles.text}>It will be confirmed soon!</Text>
                </View>
                :
                <View style={styles.centeredContainer}>
                    <Text style={styles.text}>Your order has been confirmed</Text>
                    <Text style={styles.text}>It will be delivered soon!</Text>
                </View>
            }

        </SafeAreaView>
    );
}

export default Confirmation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    imagecontainer: {
        height: 400,
        
    },

    image: {
        width: "100%",
        resizeMode: 'contain', 

    },

    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        fontSize: 32,
        color: colors.main,
        textAlign: 'center',
    },
});
