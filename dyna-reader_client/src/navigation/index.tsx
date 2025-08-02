import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "../screens/LoginScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import SignUpScreen from "../screens/SignUpScreen";

export type RootStackParamList = {
    LoginScreen: undefined;
    ForgotPasswordScreen: undefined;
    SignUpScreen: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ animation: 'none' }} />
                <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ animation: 'none' }} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ animation: 'none' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}