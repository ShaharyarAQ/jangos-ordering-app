import { React, useState, useContext, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { colors, btn2 } from '../globals/styles'


const AddContact = ({ addContact }) => {

    const [enteredContact, setEnteredContact] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function addContactHandler() {
        if (enteredContact.length == 0) {
            setErrorMessage('Please enter a contact number');
            return;
        }
        else if (enteredContact.length < 11) {
            setErrorMessage('Please enter a valid contact number');
            return;
        }
        addContact(enteredContact)
        setEnteredContact('');
    };

    return (
        <View style={style.inputContainer}>
            {errorMessage !== '' && <Text style={style.errormsg}>{errorMessage}</Text>}
            <TextInput style={style.addressInput} placeholder="Contact Number"
                value={enteredContact}
                onFocus={() => { setErrorMessage('') }}
                onChangeText={(text) => setEnteredContact(text)} />
            <View style={style.buttonContainer}>
                <TouchableOpacity style={btn2} onPress={addContactHandler}>
                    <Text style={style.btntxt}>
                        Add Contact
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default AddContact;

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
