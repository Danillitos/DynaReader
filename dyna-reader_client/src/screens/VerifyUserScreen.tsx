import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, {useState, useEffect, useRef} from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Image, StyleSheet, TouchableOpacity, View, Text, TextInput} from "react-native";
import { RootStackParamList } from "../types";
import { title } from "process";

export default function VerifyUserScreen() {

    const length = 5
    const [code, setCode] = useState(Array(length).fill(''))
    const inputs = useRef<Array<TextInput | null>>([])

    const handleChange = (text: string, index: number) => {
        const newCode = [...code]
        newCode[index] = text
        setCode(newCode)

        if (text && index < length - 1) {
            const nextInput = inputs.current[index + 1];
            if (nextInput) {
                nextInput.focus();
            }
        }
    }

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    }

    type NavigationProp = RouteProp<RootStackParamList, 'VerifyUserScreen'>;
    const Route = useRoute<NavigationProp>()
    const email = 'Teste'

    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.iconButton, {marginTop: 20}]}>
                <Image
                    source={require("../assets/arrow-back.png")}
                    style={{ width: 30, height: 30, tintColor: "#414A40" }}
                />
            </TouchableOpacity>

            <Image
                source={require('../assets/logo.png')}
                style={styles.logoImage}
            />

            <Text style={styles.title}>DynaReader</Text>

            <Text style={styles.textLabel}>
                Um e-mail de verificação foi enviado para {email}. Por favor, insira o código enviado por e-mail no campo abaixo.
            </Text>

            <View style={styles.inputRow}>
                {code.map((value, index) => (
                <TextInput
                    key={index}
                    ref={ref =>{inputs.current[index] = ref}}
                    style={styles.input}
                    value={value}
                    onChangeText={text => handleChange(text, index)}
                    onKeyPress={e => handleKeyPress(e, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    textAlign="center"
                />
                ))}
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Verificar conta</Text> 
            </TouchableOpacity>
        </View>
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
    textLabel: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Montserrat_400Regular',
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 30,
    },
    input: {
        width: 40,
        height: 50,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#333',
        fontSize: 18,
    },
    iconButton: {
        width: 50,
        height: 50,
        position: 'absolute',
        left: 20,
        top: 50,
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