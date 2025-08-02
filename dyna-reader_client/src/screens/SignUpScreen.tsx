import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SafeAreaView } from "react-native";
import { RootStackParamList } from "../types";
import { signUp } from "../services/userService";
import LottieView from 'lottie-react-native'

export default function SignUpScreen() {
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState<'error' | 'success' | ''>('')
    const [isloading, setIsLoading] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [isKeyboardVisible, setKeyboardVisible] = useState(false)


    type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUpScreen'>
    const navigation = useNavigation()

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true)
        })
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false)
        })

        return () => {
            showSubscription.remove()
            hideSubscription.remove()
        }
    }, [])

    const handleSignUp = async() => {
        setIsLoading(true)

        if (!email || !username || !password || !confirmPassword) {
            setMessage('Por favor, preencha todos os campos')
            setMessageType('error')
            return
        }

        if (password !== confirmPassword) {
            setMessage('O campo de confirmação de senha precisa estar identico ao campo de senha.')
            setMessageType('error')
            return
        }

        try {
            const response = await signUp(email, username, password)
            console.log(response.data)
            setMessage('Conta criada com sucesso! Por favor verifique seu E-mail para confirmar seu e-mail.')
            setMessageType('success')
        }
        catch (error: any) {
            console.error('Erro ao realizar procedimento de criar nova conta:', error)
            
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
            <KeyboardAvoidingView
                style={{ flex: 1}}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={[
                        styles.scrollContainer,
                        { justifyContent: isKeyboardVisible ? 'flex-start' : 'center' }
                    ]}
                    keyboardShouldPersistTaps='handled'
                    showsVerticalScrollIndicator={false}
                >
                    <View style={[
                        styles.container,
                        { justifyContent: isKeyboardVisible ? 'flex-start' : 'center' }    
                    ]}>

                    
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
                        Olá! Para criar sua conta Dynareader, por favor preencha os dados abaixo.
                    </Text>

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

                    {message ? (
                        <Text style={[
                            styles.messageText,
                            messageType === 'error' ? styles.errorText : styles.successText

                        ]}>{message}</Text>
                    ): null}

                    <Text style={styles.SecLabels}>Nome de usuário:</Text>

                    <TextInput
                        style={styles.input}
                        autoCapitalize='words'
                        placeholder="Seu nome de usuário"
                        keyboardType='default'
                        onChangeText={setUsername}
                        value={username}
                    />

                    <Text style={styles.SecLabels}>E-mail:</Text>

                    <TextInput
                        style={styles.input}
                        autoCapitalize='none'
                        placeholder="seuemail@example.com"
                        keyboardType='email-address'
                        onChangeText={setEmail}
                        value={email}
                    />

                    <Text style={styles.SecLabels}>Senha:</Text>

                    <TextInput
                        style={styles.input}
                        secureTextEntry={!passwordVisible}
                        autoCapitalize='none'
                        placeholder="Insira sua senha"
                        keyboardType='default'
                        onChangeText={setPassword}
                        value={password}
                    />

                    <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                        <Image
                            source={passwordVisible ? require('../assets/eye-on.png') : require('../assets/eye-off.png')}
                            style={{ width: 20, height: 20, position: 'absolute', right: 40, top: -45 }}
                        />
                    </TouchableOpacity>

                    <Text style={styles.SecLabels}>Confirme sua senha:</Text>

                    <TextInput
                        style={styles.input}
                        secureTextEntry={!passwordVisible}
                        autoCapitalize='none'
                        placeholder="Confirme sua senha"
                        keyboardType='default'
                        onChangeText={setConfirmPassword}
                        value={confirmPassword}
                    />

                    <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                        <Image
                            source={passwordVisible ? require('../assets/eye-on.png') : require('../assets/eye-off.png')}
                            style={{ width: 20, height: 20, position: 'absolute', right: 40, top: -45 }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <Text style={styles.buttonText}>Criar conta</Text> 
                    </TouchableOpacity>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
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
        flex: 1,
        minHeight: '100%',
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
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 40,
    },
})