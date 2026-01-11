import { React, useState, useContext, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    FlatList,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import AddAddress from '../components/addAddress';
import { colors, btn1, btn2, hr80, increse_decrease, quantityValue, quantityContainer } from '../globals/styles'
import { AntDesign } from '@expo/vector-icons';
import { db, collection, addDoc, getDocs, doc, deleteDoc } from '../firebase/firebaseConfig';
import { AuthContext } from "../store/auth-context";


const Addresses = () => {

    const [addresses, setAddresses] = useState([]);
    const [filteredAddresses, setFilteredAddresses] = useState([]);
    const [userId, setUserId] = useState('');

    const authCtx = useContext(AuthContext);

    async function fetch() {
        const snapshot = collection(db, 'addresses');
        const addressesSnapshot = await getDocs(snapshot);
        const addressesList = addressesSnapshot.docs.map(doc => ({
            addressId: doc.id,
            ...doc.data()
        }));
        setAddresses(addressesList);
        const FilteredAddressesList = addresses.filter(address => address.userId == userId);
        let sortedArray = FilteredAddressesList.sort((a, b) => b.date.localeCompare(a.date));
        setFilteredAddresses(sortedArray);
    }

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
    }, [])

    useEffect(() => {
        async function filterAddresses() {
            const FilteredAddressesList = addresses.filter(address => address.userId == userId);
            let sortedArray = FilteredAddressesList.sort((a, b) => b.date.localeCompare(a.date));
            setFilteredAddresses(sortedArray);
        };
        filterAddresses();
    }, [addresses])

    async function addAddressHandler(enteredAddress, enteredTown, enteredPostcode) {
        let address = {
            address: enteredAddress,
            town: enteredTown,
            postcode: enteredPostcode,
            userId: userId,
            date: new Date().toLocaleDateString()
        };
        await addDoc(collection(db, "addresses"), address);
        await fetch();
    };

    async function deleteAddressHandler(item) {

        try {
            const addressRef = doc(db, 'addresses', item.addressId);
            await deleteDoc(addressRef);
            await fetch();
        } catch (error) {
            console.error('Error deleting address:', error);
        }
    }

    return (
        <SafeAreaView style={style.container}>
            <AddAddress addAddress={addAddressHandler} />
            <FlatList
                data={filteredAddresses}
                renderItem={
                    ({ item }) =>
                    (
                        <View style={style.row}>
                            <Text style={style.cell} >{item.address}, {item.town} {item.postcode}</Text>
                            <TouchableOpacity onPress={() => { deleteAddressHandler(item) }}>
                                <AntDesign name="delete" size={18} color="black" style={style.del} />
                            </TouchableOpacity>
                        </View>
                    )
                }
            />
        </SafeAreaView>
    )
};

export default Addresses;

const style = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: 10,
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
    del: {
        color: colors.main
    },
});
