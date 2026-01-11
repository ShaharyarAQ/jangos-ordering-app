import { React, useState, useContext, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    FlatList,
    Text,
    View,
} from 'react-native';
import { colors } from '../globals/styles'
import { db, collection, getDocs } from '../firebase/firebaseConfig';
import { AuthContext } from "../store/auth-context";


const Orders = () => {

    [orders, setOrders] = useState([]);
    [filteredOrders, setFilteredOrders] = useState([]);
    const [userId, setUserId] = useState('');

    const authCtx = useContext(AuthContext);

    useEffect(() => {
        async function getData() {
            await setUserId(authCtx.userDetails.id);
            const snapshot = collection(db, 'orders');
            const ordersSnapshot = await getDocs(snapshot);
            const ordersList = await ordersSnapshot.docs.map(doc => doc.data());
            setOrders(ordersList);
        };
        getData();
    }, [])

    useEffect(() => {
        async function filterOrders() {
            const FilteredOrdersList = orders.filter(order => order.userId == userId);
            let sortedArray = FilteredOrdersList.sort((a, b) => b.date.localeCompare(a.date));
            setFilteredOrders(sortedArray);
            
        };
        filterOrders();
    }, [orders])


    return (
        <SafeAreaView style={style.container}>
            <FlatList
                data={filteredOrders}
                renderItem={
                    ({ item }) =>
                    (
                        <View style={style.row}>
                            <Text style={style.cell} >{item.date}</Text>
                            <View>
                            {
                                item.OrderItems.map((orderItem) => {
                                    return (
                                        <Text style={style.cell1} key={orderItem.name}>
                                            {orderItem.quantity}&nbsp;{orderItem.name}
                                        </Text>
                                    )
                                }
                                )
                            }
                            </View>
                            <Text style={style.cell}>£{item.total}</Text>
                        </View>
                    )
                }
            />
        </SafeAreaView>


    )
};

export default Orders;

const style = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: 20,
        width: '90%',
        alignSelf: 'center'

    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 8,
        marginHorizontal: 2,
        elevation: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        shadowOpacity: 0.20,
        borderRadius: 10,
        borderColor: colors.main,
        borderWidth: 2,
        padding: 10,
        backgroundColor: 'white'
    },
    cell: {
        fontSize: 14,
        textAlign: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1
    },
    cell1: {
        fontSize: 12,
        textAlign: 'center',
        flex: 1
    },
});
