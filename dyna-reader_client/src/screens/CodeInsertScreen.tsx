import React, { useState, useRef } from "react";
import { View, Text, TextInput, Image, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SafeAreaView } from "react-native";
import { RootStackParamList } from "../types";
import LottieView from 'lottie-react-native'

export default function CodeInsertScreen() {
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState<'error' | 'success' | ''>('')
    const [isloading, setIsLoading] = useState(false)

    const length = 5
    const [code, setCode] = useState(new Array(length).fill(''))
    const inputs = useRef<Array<TextInput | null>>([])

    type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CodeInsertScreen'>
    const navigation = useNavigation()

    const handleChange = (text: string, index: number) => {
        const newCode = [...code]
        newCode[index] = text
        setCode(newCode)

        if (text && index < length - 1) {
            inputs.current[index + 1]?.focus()
        }
    }

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
            inputs.current[index - 1]?.focus()
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
                Por favor, verifique seu e-mail e informe o código enviado para recuperação da senha.
            </Text>

            {message ? (
                <Text style={[
                    styles.messageText,
                    messageType === 'error' ? styles.errorText : styles.successText

                ]}>{message}</Text>
            ): null}

            <Text style={styles.SecLabels}>Código:</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10}}>
                {code.map((value, index) => (
                    <TextInput
                        key={index}
                        ref={ref => { inputs.current[index] = ref; }}
                        style={{
                            width: 50,
                            height: 50,
                            borderWidth: 1,
                            borderRadius: 10,
                            textAlign: 'center',
                            fontSize: 20,
                            borderColor: '#414A40',
                            backgroundColor: '#fff',
                            marginHorizontal: 5,
                        }}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={value}
                        onChangeText={text => handleChange(text, index)}
                        onKeyPress={e => handleKeyPress(e, index)}
                    />
                ))}
            </View>

            <TouchableOpacity style={styles.button}>
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