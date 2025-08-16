import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';
import { useAuth } from './src/context/AuthContext';
import { ActivityIndicator } from 'react-native';


function RootNavigator() {
  const { isLoggedIn, loading } = useAuth()

  if (loading) {
    return <ActivityIndicator size='large' color={'#000'} />
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  )
}
