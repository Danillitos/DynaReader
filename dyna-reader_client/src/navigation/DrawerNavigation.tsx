import React from "react";
import { createDrawerNavigator, DrawerContentComponentProps } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

interface TokenPayLoad {
    sub: number,
    username: string,
}

const Drawer = createDrawerNavigator()

function CustomDrawerContent(props: DrawerContentComponentProps) {
    const { logout, token } = useAuth()

    let username = ''
    if (token) {
        const decoded = jwtDecode<TokenPayLoad>(token)
        username = decoded.username
    }

    const handleLogout = () => {
        logout()
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }]
        })

    }


    return(
        <View style={{ flex: 1}}>
            <View style={{ padding: 20, alignItems: 'center' }}>
                <Image
                    source={require('../assets/logo.png')}
                    style={styles.logoImage}
                />
                <Text style={styles.title}>DynaReader</Text>

                <Text style={styles.userMessage}>Olá, {username}!</Text>

                <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
                    <Image
                        source={require('../assets/go-back.png')}
                        style={styles.goBack}
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => handleLogout()}>
                <Text>Logout</Text>
            </TouchableOpacity>

            <Text style={styles.version}>Versão 1.0</Text>

        </View>
    )
}

export default function DrawerNavigator() {
    return(
        <Drawer.Navigator 
            screenOptions={{ 
                headerShown: false,
                drawerStyle: {
                    backgroundColor: '#F2F2F0',
                    width: 170
                },
                drawerLabelStyle: {
                    color: '#1E1E1E',
                    fontSize: 16
                }
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
            <Drawer.Screen name='Home' component={HomeScreen}/>
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontFamily: 'Montserrat_700Bold',
    },
    version: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 16,
    },
    logoImage: {
        marginTop: 25,
        width: 70,
        height: 70,
        alignSelf: 'center',
        tintColor: '#414A40',
    },
    goBack: {
        marginTop: 20,
        width: 40,
        height: 40
    },
    userMessage: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 16,
    }
})