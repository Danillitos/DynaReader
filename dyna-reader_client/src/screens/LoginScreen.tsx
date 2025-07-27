import React, { useState } from 'react'
import { View, Text, TextInput, Image, StyleSheet, Alert, TouchableOpacity, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types'
import { loginUser } from '../services/userService'
import LottieView from 'lottie-react-native'

export default function LoginScreen() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState<'error' | 'success' | ''>('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [isloading, setIsLoading] = useState(false)

    type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'LoginScreen'>
    const navigation = useNavigation<NavigationProp>()

    const handleLogin = async() => {
        setIsLoading(true)

        // Verifica se os campos estão preenchidos
        if (!email || !password) {
            setMessage('Por favor, preencha todos os campos para realizar o login.')
            setMessageType('error')
            setIsLoading(false)
            return
        }

        // Tenta realizar o login
        try {
            const response = await loginUser(email, password)
            console.log(response.data)
            setMessage('Login realizado com sucesso!')
            setMessageType('success')
        }
        // Pega os erros enviados pelo servidor
        catch (error: any) {
            console.error('Erro ao realizar login:', error)
            
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
                <Image
                    source={require('../assets/logo.png')}
                    style={styles.logoImage}
                />
                <Text style={styles.title}>DynaReader</Text>

                {isloading && (
                    <View style={styles.loadingContainer}>
                        <LottieView
                            source={require('../assets/animations/Trail-loading.json')}
                            autoPlay
                            loop
                            style={styles.loadingIcon}
                        />
                    </View>
                )}

                {message ? (
                    <Text style={[
                        styles.messageText,
                        messageType === 'error' ? styles.errorText : styles.successText

                    ]}>{message}</Text>
                ): null}

                <Text style={styles.SecLabels}>E-mail:</Text>

                <TextInput
                    style={styles.input}
                    placeholder='seuemail@exemplo.com'
                    autoCapitalize='none'
                    keyboardType='email-address'
                    onChangeText={setEmail}
                    value={email}
                />

                
                <Text style={styles.SecLabels}>Senha:</Text>

                <TextInput
                    style={styles.passwordInput}
                    secureTextEntry={!passwordVisible}
                    placeholder='Digite sua senha'
                    onChangeText={setPassword}
                    value={password}
                />

                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    <Image
                        source={passwordVisible ? require('../assets/eye-on.png') : require('../assets/eye-off.png')}
                        style={{ width: 20, height: 20, position: 'absolute', right: 40, top: -31 }}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                    <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
                </TouchableOpacity>
                

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text> 
                </TouchableOpacity>

                <View style={styles.dividerContainer}>
                    <View style={styles.line}/>
                    <Text style={styles.ouText}>Ou</Text>
                    <View style={styles.line}/>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                    <Text style={styles.signUp}>Criar Conta</Text>
                </TouchableOpacity>

                <View style={styles.iconRow}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Image
                            source={require('../assets/Google_logo.png')}
                            style={styles.iconImage}
                        />
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.iconButton}>
                        <Image
                            source={require('../assets/Dropbox_logo.png')}
                            style={styles.iconImage}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F2F2F0'
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 45,
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
    passwordInput: {
        height: 40,
        width: '85%',
        alignSelf: 'center',
        borderColor: '#414A40',
        backgroundColor: '#D9D9D9',
        borderWidth: 1,
        marginBottom: 1,
        paddingHorizontal: 10,
        borderRadius: 17, 
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        paddingRight: 30,
        marginBottom: 20,
        color: '#5E3267',
        fontSize: 16,
        textDecorationLine: 'underline',
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
    logoImage: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        tintColor: '#414A40',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
        marginTop: 25,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#414A40',
    },
    ouText: {
        marginHorizontal: 10,
        fontSize: 16,
        color: '#414A40',
        fontFamily: 'Montserrat_400Regular',
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
    },
    iconButton: {
        width: 50,
        height: 50,
        borderRadius: 15,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
    },
    iconImage: {
        width: 30,
        height: 30,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        borderWidth: 1,
        borderColor: '#414A40',
        borderRadius: 17,
        height: 40,
        paddingHorizontal: 10,
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
    signUp: {
        alignSelf: 'center',
        marginBottom: 20,
        color: '#5E3267',
        fontSize: 16,
        textDecorationLine: 'underline',
        fontFamily: 'Montserrat_400Regular',
    },
        loadingContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingIcon: {
        width: 60,
        height: 60,
    },
});