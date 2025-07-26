import React, { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SafeAreaView } from "react-native";
import { RootStackParamList } from "../types";

export default function ForgotPasswordScreen() {
    type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ForgotPasswordScreen'>
    const navigation = useNavigation()


    return (
        <SafeAreaView>
            <View style={styles.container}>

            
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
                <Image
                    source={require("../assets/arrow-back.png")}
                    style={{ width: 30, height: 30, tintColor: "#414A40" }}
                />
            </TouchableOpacity>

            <Image
                source={require("../assets/logo.png")}
                style={styles.logoImage}
            />

            <Text style={styles.title}>DynaReader</Text>

            <Text style={styles.textLabel}>
                Ops! Parece que está com dificuldades para acessar sua conta DynaReader. 
                Por favor, insira seu E-mail abaixo e enviaremos um link para alterar sua senha.
            </Text>

            <Text style={styles.SecLabels}>E-mail:</Text>

            <TextInput
                style={styles.input}
                autoCapitalize='none'
                placeholder="seuemail@example.com"
                keyboardType='email-address'
            />

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Enviar Link</Text> 
            </TouchableOpacity>

            </View>
        </SafeAreaView>
    ) 
}

const styles = StyleSheet.create({
    logoImage: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        tintColor: '#414A40',
    },
    container: {
        flex: .75,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F2F2F0',
    },
    iconButton: {
        width: 50,
        height: 50,
    },
    title: {
        fontSize: 24,
        paddingBottom: 30,
        textAlign: 'center',
        fontFamily: 'Montserrat_700Bold',
    },
    SecLabels: {
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'center',
        fontFamily: 'Montserrat_400Regular',
    },
    input: {
        height: 40,
        width: '85%',
        alignSelf: 'center',
        borderColor: '#414A40',
        backgroundColor: '#D9D9D9',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 17,
    },
    textLabel: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Montserrat_400Regular',
    },
    button: {
        marginTop: 20,
        width: '50%',
        height: 50,
        alignSelf: 'center',
        backgroundColor: '#C7C7C7',
        borderWidth: 1,
        borderColor: '#414A40',
        padding: 10,
        borderRadius: 17,
        elevation: 3,
    },
    buttonText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 16,
        fontFamily: 'Montserrat_400Regular',
    },
})