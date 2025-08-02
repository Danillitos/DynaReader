import React, { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SafeAreaView } from "react-native";
import { RootStackParamList } from "../types";
import { forgotPassword } from "../services/userService";
import LottieView from 'lottie-react-native'

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState<'error' | 'success' | ''>('')
    const [isloading, setIsLoading] = useState(false)


    type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ForgotPasswordScreen'>
    const navigation = useNavigation()

    const handleForgotPassword = async() => {
        setIsLoading(true)

        if (!email) {
            setMessage('Por favor, informe seu endereço de email.')
            setMessageType('error')
        }

        try {
            const response = await forgotPassword(email)
            console.log(response.data)
            setMessage('Email enviado com sucesso! Por favor, verifique sua caixa de entrada ou spam.')
            setMessageType('success')
        }
        catch (error: any) {
            console.error('Erro ao realizar procedimento de recuperação de senha:', error)
            
            if (error.response) {
                const status = error.response.status
                const messageText = error.response.data?.message || 'Erro desconhecido'

                setMessage(Array.isArray(messageText) ? messageText.join(',') : messageText)
                setMessageType('error')
            }
            else if (error.request) {
                setMessage('Não foi possível conectar ao servidor. Verifique sua conexão de internet.')
                setMessageType('error')
            }
            else {
                setMessage('Ocorrou um erro inesperado. Tente novamente mais tarde.')
                setMessageType('error')
            }
        }
        finally {
            setIsLoading(false)
        }

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F2F0' }}>
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

            {message ? (
                <Text style={[
                    styles.messageText,
                    messageType === 'error' ? styles.errorText : styles.successText

                ]}>{message}</Text>
            ): null}

            <Text style={styles.SecLabels}>E-mail:</Text>

            <TextInput
                style={styles.input}
                autoCapitalize='none'
                placeholder="seuemail@example.com"
                keyboardType='email-address'
                onChangeText={setEmail}
                value={email}
            />

            <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
                <Text style={styles.buttonText}>Enviar Link</Text> 
            </TouchableOpacity>

            {isloading && (
                <View style={styles.loadingContainer}>
                    <LottieView
                        source={require('../assets/animations/Trail-loading.json')}
                        autoPlay
                        loop
                        style={styles.loadingIcon}
                    />
                    <Text style={styles.loadingText}>Carregando...</Text>
                </View>

            )}

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
    messageText: {
        textAlign: 'center',
        fontSize: 14,
        marginVertical: 10,
        paddingHorizontal: 20,
        fontFamily: 'Montserrat_400Regular',
    },
    errorText: {
        color: '#B00020',
    },
    successText: {
        color: '#2E7D32',
    },
    loadingContainer: {
        position: 'absolute',
        top: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingIcon: {
        width: 60,
        height: 60,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 14,
        color: '#414A40',
        fontFamily: 'Montserrat_400Regular',
        textAlign: 'center',
    }
})