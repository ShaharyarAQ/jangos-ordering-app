import { createContext, useState } from "react";

export const AuthContext = createContext({
    toggleLogin: () => {},
    saveDetails: (userDetails) => {},
    isLogin: false,
    userDetails: {},
    
});

function AuthContextProvider({ children }) {

    const [login, setLogin] = useState(false);
    const [details, setDetails] = useState({});

    async function toggleLogin() {
        await setLogin(!login);
    }

    async function saveDetails(userDetails) {
        setDetails(userDetails);
    }


    const value = {
        isLogin: login,
        toggleLogin: toggleLogin,
        userDetails: details,
        saveDetails: saveDetails
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}

export default AuthContextProvider;