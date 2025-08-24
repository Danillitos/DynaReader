import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Button } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolate, Extrapolation } from 'react-native-reanimated';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useSwipePanel } from '../hooks/useSwipePanel';
import BookList from '../components/bookList'
import { usePdfService } from '../services/pdfService';


export default function HomeScreen() {
    const { token, logout, isLoggedIn } = useContext(AuthContext)
    const { pdfs, pickPdfs } = usePdfService();
    const navigation = useNavigation()

    const { 
        panGesture,
        animatedStyle,
        arrowAnimatedStyle,
        bookTextAnimatedStyle,
        height,
        togglePanel
    } = useSwipePanel()

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            {/*Home Screen*/}
            <View style={styles.page}>
                <View style={styles.upperRectangle}>
                    <View style={styles.iconRow}>
                        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
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
                        <TouchableOpacity onPress={togglePanel}>
                            <Animated.Image
                                source={require('../assets/swipe-up.png')}
                                style={[{ width: 50, height: 50, top: -20 }, arrowAnimatedStyle]}
                            />
                            <Animated.Text style={[styles.bookText, bookTextAnimatedStyle]}>Livros</Animated.Text>
                        </TouchableOpacity>
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
                <Button title="Adicionar PDF" onPress={pickPdfs} />
                <BookList pdfs={pdfs} />
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