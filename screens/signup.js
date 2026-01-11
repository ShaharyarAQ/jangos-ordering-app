import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import { colors, btn1, hr80 } from "../globals/styles";
import { useState } from "react";

import { auth, collection, db, addDoc } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";


function Signup({ navigation }) {

    const [emailFocus, setEmailFocus] = useState(false);
    const [contactFocus, setContactFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);


    //Saving Form Data
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const signupHandler = () => {

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        else if (email.length == 0) {
            setErrorMessage('Please enter an email address');
            return;
        }
        else if (contact.length != 10) {
            setErrorMessage('Contact Number should be 10 digits');
            return;
        }

        try {
            createUserWithEmailAndPassword(auth, email, password)
                .then((newUser) => {
                    const userData = {
                        email: email,
                        contact: contact,
                        password: password,
                        userId: newUser.user.uid
                    }
                    alert('Signed up successfully');
                    navigation.navigate('Login')
                })
                .catch((error) => {
                    console.log('Firebase Sign Up Error', error.message);
                    if (error.message == 'Firebase: Error (auth/email-already-in-use).') {
                        setErrorMessage('Email already in use');
                    }
                    else if (error.message == 'Firebase: Error (auth/invalid-email).') {
                        setErrorMessage('Invalid email address');
                    }
                })
        }
        catch (error) {
            console.log('System Sign Up Error', error.message);
            setErrorMessage('System error');
        }
    }

    return <View style={styles.container}>
        <Text style={styles.head1}>Sign Up</Text>
        {errorMessage !== '' && <Text style={styles.errormsg}>{errorMessage}</Text>}
        <View style={styles.inputout}>
            <MaterialCommunityIcons name="email-outline" size={24} color=
                {emailFocus === true ? colors.main : 'black'} />
            <TextInput style={styles.input}
                keyboardType="email-address" autoCapitalize="none" placeholder="Email"
                onFocus={() => {
                    setEmailFocus(true);
                    setContactFocus(false);
                    setPasswordFocus(false);
                    setShowPassword(false);
                    setConfirmPasswordFocus(false);
                    setShowConfirmPassword(false);
                    setErrorMessage('');
                }} onChangeText={(text) => setEmail(text)} />
        </View>


        <View style={styles.inputout}>
            <Feather name="phone" size={24} color=
                {contactFocus === true ? colors.main : 'black'} />
            <TextInput style={styles.input} keyboardType='phone-pad' placeholder="Contact Number"
                onFocus={() => {
                    setContactFocus(true),
                        setEmailFocus(false);
                    setPasswordFocus(false);
                    setShowPassword(false);
                    setConfirmPasswordFocus(false);
                    setShowConfirmPassword(false);
                    setErrorMessage('');
                }} onChangeText={(text) => setContact(text)} />
        </View>


        <View style={styles.inputout}>
            <MaterialCommunityIcons name="lock-outline" size={24}
                color={passwordFocus == true ? colors.main : 'black'} />
            <TextInput style={styles.input} placeholder="Password"
                onFocus={() => {
                    setEmailFocus(false);
                    setContactFocus(false);
                    setConfirmPasswordFocus(false);
                    setPasswordFocus(true);
                    setErrorMessage('');
                }} onChangeText={(text) => setPassword(text)}
                secureTextEntry={showPassword === false ? true : false}
            />
            <Octicons name={showPassword == false ? 'eye-closed' : 'eye'}
                size={24} color='black' onPress={() => {
                    setShowPassword(!showPassword)
                }} />
        </View>

        <View style={styles.inputout}>
            <MaterialCommunityIcons name="lock-outline" size={24}
                color={confirmPasswordFocus == true ? colors.main : 'black'} />
            <TextInput style={styles.input} placeholder="Confirm Password"
                onFocus={() => {
                    setEmailFocus(false);
                    setContactFocus(false);
                    setConfirmPasswordFocus(true);
                    setPasswordFocus(false);
                    setErrorMessage('');
                }} onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry={showConfirmPassword === false ? true : false}
            />
            <Octicons name={showConfirmPassword == false ? 'eye-closed' : 'eye'}
                size={24} color='black' onPress={() => {
                    setShowConfirmPassword(!showConfirmPassword)
                }} />
        </View>


        <TouchableOpacity style={btn1} onPress={() => signupHandler()}>
            <Text style={{ color: colors.secondary, fontSize: 24 }}>Sign Up</Text>
        </TouchableOpacity>



        <View style={hr80}></View>
        <Text>Already have an account?</Text>
        <TouchableOpacity>
            <Text style={styles.signup} onPress={() => navigation.navigate('Login')}> Log In</Text>
        </TouchableOpacity>
        <View style={hr80}></View>



    </View>
}

export default Signup;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    head1: {
        color: colors.main,
        fontSize: 30,
        textAlign: 'center',
        marginVertical: 10
    },
    inputout: {
        flexDirection: 'row',
        width: '80%',
        marginVertical: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        elevation: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        shadowOpacity: 0.25
    },
    input: {
        fontSize: 18,
        marginLeft: 10,
        width: '80%'
    },
    forgot: {
        color: colors.secondary100,
        marginTop: 10,
        marginBottom: 40,
        fontSize: 15
    },
    signup: {
        color: colors.main,
    },
    errormsg: {
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    },
});