import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolate, Extrapolation } from 'react-native-reanimated';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';


export default function HomeScreen() {
    const { token, logout, isLoggedIn } = useContext(AuthContext)

    const navigation = useNavigation()
    const height = Dimensions.get('window').height

    const MIN_TRANSLATE_Y = -height * 0.89
    const MAX_TRANSLATE_Y = 0
    const startY = useSharedValue(MAX_TRANSLATE_Y)
    const translateY = useSharedValue(MAX_TRANSLATE_Y)

    const panGesture = Gesture.Pan()
        .onBegin(() => {
            startY.value = translateY.value
        })
        .onUpdate((event) => {
            const nextY = startY.value + event.translationY
            translateY.value = Math.min(MAX_TRANSLATE_Y, Math.max(MIN_TRANSLATE_Y, nextY))
        })
        .onEnd(() => {
            const distanceTotal = MAX_TRANSLATE_Y - MIN_TRANSLATE_Y;
            
            const limiarUp   = MAX_TRANSLATE_Y - distanceTotal * 0.15; 
            const limiarDown = MIN_TRANSLATE_Y + distanceTotal * 0.3; 

            if (translateY.value <= limiarUp) {
                translateY.value = withSpring(MIN_TRANSLATE_Y, { damping: 50 });
                
            }
            else if (translateY.value >= limiarDown) {

                translateY.value = withSpring(MAX_TRANSLATE_Y, { damping: 50 });
            }
            else {
                const meio = (MAX_TRANSLATE_Y + MIN_TRANSLATE_Y) / 2;
                translateY.value = translateY.value < meio
                ? withSpring(MIN_TRANSLATE_Y, { damping: 50 })
                : withSpring(MAX_TRANSLATE_Y, { damping: 50 });
            }
        })
    
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }]
    }))

    const arrowAnimatedStyle = useAnimatedStyle(() => {
        const angle = interpolate(
            translateY.value,
            [MAX_TRANSLATE_Y, MIN_TRANSLATE_Y],
            [0, Math.PI],
            Extrapolation.CLAMP
        )

        const offsetY = interpolate(
            translateY.value,
            [MAX_TRANSLATE_Y, MIN_TRANSLATE_Y],
            [0, -50],
            Extrapolation.CLAMP
        )
        return {
            transform: [
                { rotate: `${angle}rad`},
                { translateY: offsetY }
            ]

        }
    })

    const bookTextAnimatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            translateY.value,
            [MAX_TRANSLATE_Y, MIN_TRANSLATE_Y],
            [1, 0],
            Extrapolation.CLAMP
        )

        const offsetY = interpolate(
            translateY.value,
            [MAX_TRANSLATE_Y, MIN_TRANSLATE_Y],
            [20, 0],
            Extrapolation.CLAMP
        )

        return {
            opacity,
            transform: [{translateY: offsetY}]
        }
    })

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            {/*Home Screen*/}
            <View style={styles.page}>
                <View style={styles.upperRectangle}>
                    <View style={styles.iconRow}>
                        <TouchableOpacity>
                            <Image
                                source={require('../assets/menu.png')}
                                style={{ width: 40, height: 40}}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity>
                        <Image
                            source={require('../assets/profile.png')}
                            style={{ width: 40, height: 40}}
                        />
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.circle}>
                    <Text style={styles.dailyObjective}>Meta Diária</Text>
                    <Text style={styles.pagCount}>0/0 Páginas</Text>
                    <Text style={styles.fire}>0 🔥</Text>
                </View>

                <GestureDetector gesture={panGesture}>
                    <Animated.View style={[ styles.lowerRectangle, animatedStyle ]}>
                        <Animated.Image
                            source={require('../assets/swipe-up.png')}
                            style={[{ width: 50, height: 50, top: -20 }, arrowAnimatedStyle]}
                        />
                        <Animated.Text style={[styles.bookText, bookTextAnimatedStyle]}>Livros</Animated.Text>
                    </Animated.View>
                </GestureDetector>
            </View>

            <Animated.View style={[{        
                position: 'absolute',
                bottom: -height, // começa fora da tela
                width: '100%',
                height: height,
                backgroundColor: '#F2F2F0',
                justifyContent: 'center',
                alignItems: 'center',
            }, 
            animatedStyle ]}>
                <Text>Conteúdo dos Livros</Text>
            </Animated.View>
        </GestureHandlerRootView>
    );
}

const { width } = Dimensions.get('window')
const circleSize = width * 0.5
const rectSize = width * 0.8

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F2F0',
    },
    page: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2,
        backgroundColor: '#2b523de0',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#1E1E1E',
        borderWidth: 5,
        elevation: 5,
        top: -170

    },
    dailyObjective: {
        fontSize: 23.61,
        fontFamily: 'Montserrat_700Bold',
        color: '#DBD4D0',
        fontWeight: 'bold',
        top: -20
    },
    pagCount: {
        fontSize: 20.74,
        fontFamily: 'Montserrat_400Regular',
        color: '#DBD4D0',
        top: -20
    },
    fire: {
        position: 'absolute',
        top: 20,
        left: 200,
    },
    upperRectangle: {
        width: rectSize * 1.7,
        height: rectSize * 0.45,
        backgroundColor: '#F9F9F9',
        position: 'absolute',
        top: 0,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lowerRectangle: {
        width: rectSize * 1.7,
        height: rectSize * 0.35,
        backgroundColor: '#F9F9F9',
        position: 'absolute',
        bottom: 0,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bookText: {
        fontSize: 16,
        fontFamily: 'Montserrat_400Regular',
        color: '#1E1E1E',
        top: -50
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '65%',
        height: '5%',
    }
})