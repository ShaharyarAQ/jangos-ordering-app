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
import AddAddress from '../components/addAddress';
import AddContact from '../components/addContact';
import { AntDesign } from '@expo/vector-icons';
import { colors, btn1, btn2, hr80, increse_decrease, quantityValue, quantityContainer } from '../globals/styles'
import { db, collection, addDoc, getDocs } from '../firebase/firebaseConfig';
import { AuthContext } from "../store/auth-context";



const Checkout = ({ navigation, route }) => {

    const authCtx = useContext(AuthContext);
    const [islogin, setIsLogin] = useState(false);
    const [user, setUser] = useState('');
    const [userId, setUserId] = useState('');

    const [addresses, setAddresses] = useState([]);
    const [filteredAddresses, setFilteredAddresses] = useState([]);
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');


    const orderDetails = route.params;
    if (route.params === undefined) {
        navigation.navigate('Cart');
    }

    useEffect(() => {
        const assignData = async () => {
            if (authCtx.isLogin == true) {
                await setIsLogin(true);
                await setUser(authCtx.userDetails.email);
                await setUserId(authCtx.userDetails.id);
            }
            else {
                await setIsLogin(false);
                await setUser('');
                await setUserId('Guest User');
            }
        };
        assignData();
    }, [])

    useEffect(() => {
        async function getData() {
            await setUserId(authCtx.userDetails.id);
            const snapshot = collection(db, 'addresses');
            const addressesSnapshot = await getDocs(snapshot);
            const addressesList = addressesSnapshot.docs.map(doc => ({
                addressId: doc.id,
                ...doc.data()
            }));
            setAddresses(addressesList);
        };
        getData();
    }, [islogin])

    useEffect(() => {
        async function filterAddresses() {
            const FilteredAddressesList = addresses.filter(address => address.userId == userId);
            let sortedArray = FilteredAddressesList.sort((a, b) => b.date.localeCompare(a.date));
            setFilteredAddresses(sortedArray);
        };
        filterAddresses();
    }, [addresses])

    const FilteredOrderItems = orderDetails?.items?.map(item => {
        return { name: item.name, quantity: item.quantity, addons: item.addons };
    });

    const total = orderDetails.total.toFixed(2);
    const subTotal = (parseFloat(total) + 5 + 0.50).toFixed(2);


    async function selectedAddressHandler(address) {

        let tempAddress = {
            address: address.address,
            town: address.town,
            postcode: address.postcode,
        };
        setAddress(tempAddress);
    };

    async function addAddressHandler(enteredAddress, enteredTown, enteredPostcode) {
        let address = {
            address: enteredAddress,
            town: enteredTown,
            postcode: enteredPostcode,
        };
        setAddress(address);
    };

    async function addContactHandler(enteredContact) {
        setContact(enteredContact);
    };

    const generateUniqueOrderNumber = () => {
        const timestamp = Date.now();
        const uniqueId = userId || Math.random().toString(36).substring(2, 15);
        const randomValue = Math.floor(Math.random() * 1000000);
        const orderNumber = timestamp+uniqueId+randomValue;
        return orderNumber;
    }

    const placeOrder = async () => {

        if (address.length == 0) {
            alert('Please enter an address');
            return;
        }

        if (contact.length == 0) {
            alert('Please enter contact number');
            return;
        }

        const orderNumber = await generateUniqueOrderNumber();

        let orderDetails = {
            orderNumber: orderNumber,
            OrderItems: FilteredOrderItems,
            total: total,
            subTotal: subTotal,
            address: address,
            user: user,
            userId: userId,
            contact: contact,
            status: "pending",
            date: new Date().toLocaleString()
        };
        await addDoc(collection(db, "orders"), orderDetails);
        navigation.navigate('Confirmation' , orderNumber);
    }


    return (
        <SafeAreaView style={style.container}>
            {islogin ? (
                <>
                    <FlatList
                        data={filteredAddresses}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={style.addressRow} onPress={() => selectedAddressHandler(item)}>
                                <View style={style.addressDetails}>
                                    <Text style={style.addressText}>{item.address}, {item.town} {item.postcode}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                    <AddContact addContact={addContactHandler} />
                </>
            ) : (
                <>
                    <ScrollView scrollEnabled={false}>
                        <AddAddress addAddress={addAddressHandler} />
                        <AddContact addContact={addContactHandler} />
                    </ScrollView>
                </>
            )}
            <View style={style.btncont}>
                <View style={style.c2}>
                    <Text style={style.txt5}>Address</Text>
                    <Text style={style.txt4}>{address.address}</Text>
                    <Text style={style.txt4}>{address.town} {address.postcode}</Text>
                </View>
                <View style={style.c2}>
                    <Text style={style.txt5}>Contact Number</Text>
                    <Text style={style.txt4}>{contact}</Text>
                </View>
                <View style={style.surcharges}>
                    <View style={style.c3}>
                        <Text style={style.txt5}>Delivery Charges</Text>
                        <Text style={style.txt6}>£5.00</Text>
                    </View>
                    <View style={style.c3}>
                        <Text style={style.txt5}>Service Charges</Text>
                        <Text style={style.txt6}>£0.50</Text>
                    </View>
                </View>
                <View style={style.total}>
                    <View style={style.c3}>
                        <Text style={style.txt5}>Total</Text>
                        <Text style={style.txt6}>£{subTotal}</Text>
                    </View>
                </View>
                <TouchableOpacity style={btn2} onPress={() => placeOrder()}>
                    <Text style={style.btntxt}>
                        Place Order
                    </Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};

export default Checkout;

const style = {
    container: {
        flex: 1,
        marginTop: 10,
        width: '90%',
        alignSelf: 'center'
    },
    title: {
        color: colors.main,
        width: '90%',
        marginVertical: 20,
        fontSize: 23,
        borderRadius: 10,
        marginHorizontal: 10
    },
    addressRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 12,
        marginBottom: 8,
        elevation: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 1,
        shadowOpacity: 0.10,
    },
    addressDetails: {
        flex: 1,
    },
    addressText: {
        fontSize: 16,
        color: '#333',
    },
    deleteIcon: {
        marginLeft: 10,
    },

    btncont: {
        paddingTop: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 80,
        borderTopWidth: 0.8,
        borderTopColor: colors.main
    },
    surcharges: {
        marginTop: 10,
    },
    btntxt: {
        color: colors.secondary,
        fontSize: 20,
    },
    c2: {
        marginTop: 5,
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 0.8,
        borderBottomColor: colors.main,
        paddingBottom: 10
    },
    c3: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    txt4: {
        fontSize: 15,
        marginHorizontal: 5,
    },
    txt5: {
        fontSize: 20,
    },
    txt6: {
        fontSize: 20,
        marginHorizontal: 5,
    },
    total: {
        marginBottom: 10
    }
};
