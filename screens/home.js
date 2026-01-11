import { StyleSheet } from "react-native";
import RootNavigation from "../rootNavigation";
import CartContextProvider from "../store/cart-context";
import AuthContextProvider from "../store/auth-context";


function Home() {
    return (
        <AuthContextProvider>
            <CartContextProvider>
                <RootNavigation />
            </CartContextProvider>
        </AuthContextProvider>
    )
}

export default Home;

const style = StyleSheet.create({

    container: {
        flex: 1,

    },
});