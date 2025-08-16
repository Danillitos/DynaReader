import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function HomeScreen() {
    const route = useRoute();
    

    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Text>Welcome to the Home Screen!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F2F0',
    }
})