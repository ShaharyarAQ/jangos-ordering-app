import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import { AuthContext } from "../store/auth-context";
import { colors, btn1, hr80 } from "../globals/styles";
import { React, useState, useContext, useEffect } from 'react';

import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Profile from "./profile";
import { SafeAreaView } from "react-native";

function Login({ navigation }) {

    const authCtx = useContext(AuthContext);
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    //Saving Form Data
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loggedIn, setLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        const assign = async () => {
            if (authCtx.isLogin == true) {
                setLoggedIn(true);
                setUserDetails(authCtx.userDetails);
            }
            else {
                setLoggedIn(false);
            }
        };
        assign();
    }, [])

    useEffect(() => {
        const assign = async () => {
            if (authCtx.isLogin == true) {
                setLoggedIn(true);
                setUserDetails(authCtx.userDetails);
            }
            else {
                setLoggedIn(false);
            }
        };
        assign();
    }, [authCtx.isLogin])




    const loginHandler = async () => {


        if (email.length == 0) {
            setErrorMessage('Please enter an email address');
            return;
        }
        else if (password.length == 0) {
            setErrorMessage('Please enter a password');
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    let userDetails = {
                        email: user.user.email,
                        id: user.user.uid
                    };
                    authCtx.saveDetails(userDetails);
                    alert('Logged In successfully');
                    authCtx.toggleLogin();
                })
                .catch((error) => {
                    if (error.message == 'Firebase: Error (auth/invalid-email).') {
                        setErrorMessage('Invalid email address');
                    }
                    else if (error.message == 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).') {
                        setErrorMessage('Account temporarily disabled');
                    }
                    else if (error.message == 'Firebase: Error (auth/invalid-login-credentials).') {
                        setErrorMessage('Invalid credentials');
                    }

                    else {
                        console.log(error.message);
                    }
                })
        }
        catch (error) {
            console.log('System log in Error', error.message);
            setErrorMessage('System error');
        }

    }

    return (

        <>
            {loggedIn == true ?
                <Profile />
                :
                <>
                    <View style={styles.container}>
                        <Text style={styles.head1}>Log In</Text>
                        {errorMessage !== '' && <Text style={styles.errormsg}>{errorMessage}</Text>}
                        <View style={styles.inputout}>
                            <MaterialCommunityIcons name="email-outline" size={24} color=
                                {emailFocus === true ? colors.main : 'black'} />
                            <TextInput style={styles.input}
                                keyboardType="email-address" autoCapitalize="none" placeholder="Email"
                                onFocus={() => {
                                    setEmailFocus(true);
                                    setPasswordFocus(false);
                                    setShowPassword(false);
                                    setErrorMessage('');
                                }} onChangeText={(text) => setEmail(text)} />
                        </View>
                        <View style={styles.inputout}>
                            <MaterialCommunityIcons name="lock-outline" size={24}
                                color={passwordFocus == true ? colors.main : 'black'} />
                            <TextInput style={styles.input} placeholder="Password"
                                onFocus={() => {
                                    setEmailFocus(false);
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
                        <TouchableOpacity style={btn1} onPress={() => loginHandler()}>
                            <Text style={{ color: colors.secondary, fontSize: 24 }}>Log In</Text>
                        </TouchableOpacity>
                        <Text style={styles.forgot}>Forgot Password?</Text>

                        <View style={hr80}></View>
                        <Text>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                            <Text style={styles.signup} > Sign Up</Text>
                        </TouchableOpacity>
                        <View style={hr80}></View>
                    </View>
                </>
            }
        </>
    )
}

export default Login;

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
        marginBottom: 20,
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