import { React, useState, useContext, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { colors, btn2 } from '../globals/styles'


const AddAddress = ({ addAddress }) => {

    const [enteredAddress, setEnteredAddress] = useState('');
    const [enteredTown, setEnteredTown] = useState('');
    const [enteredPostcode, setEnteredPostcode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function addAddressHandler() {
        if (enteredAddress.length == 0) {
            setErrorMessage('Please enter an address');
            return;
        }
        else if (enteredTown.length == 0) {
            setErrorMessage('Please enter a town or city');
            return;
        }
        else if (enteredPostcode.length == 0) {
            setErrorMessage('Please enter a postcode');
            return;
        }
        addAddress(enteredAddress, enteredTown, enteredPostcode)
        setEnteredAddress('');
        setEnteredTown('');
        setEnteredPostcode('');
    };

    return (
        <View style={style.inputContainer}>
            {errorMessage !== '' && <Text style={style.errormsg}>{errorMessage}</Text>}
            <TextInput style={style.addressInput} placeholder="House Address"
                value={enteredAddress}
                onFocus={() => { setErrorMessage('') }}
                onChangeText={(text) => setEnteredAddress(text)} />
            <View style={style.adressInputInner}>
                <TextInput style={style.townInput} placeholder="City/Town"
                    onFocus={() => { setErrorMessage('') }}
                    value={enteredTown}
                    onChangeText={(text) => setEnteredTown(text)} />
                <TextInput style={style.postcodeInput} placeholder="Postcode"
                    onFocus={() => { setErrorMessage('') }}
                    value={enteredPostcode}
                    onChangeText={(text) => setEnteredPostcode(text)} />
            </View>
            <View style={style.buttonContainer}>
                <TouchableOpacity style={btn2} onPress={addAddressHandler}>
                    <Text style={style.btntxt}>
                        Add Address
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default AddAddress;

const style = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 14,
        backgroundColor: colors.background,
        borderRadius: 30,
        elevation: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        shadowOpacity: 0.10,
        marginBottom: 10
    },

    addressInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '100%',
        padding: 16
    },

    adressInputInner: {
        flexDirection: 'row',
        marginTop: 10,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',

    },

    townInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '48%',
        padding: 16
    },

    postcodeInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '48%',
        padding: 16,
    },

    buttonContainer: {
        marginTop: 5,
        flexDirection: 'row'
    },

    btntxt: {
        color: "white"
    },
    errormsg: {
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10
    },
});
