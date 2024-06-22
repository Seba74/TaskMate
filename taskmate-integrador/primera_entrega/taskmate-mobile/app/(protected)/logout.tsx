import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

// context
import { useAuth } from '../../context/AuthContext'
import { router } from 'expo-router';
export default function Logout() {

  // context
  const { onLogout } = useAuth();

  useEffect(() => {
    onLogout!();
    router.push('/');
  }, [])

  return (
    <View>
      <Text>Logout...</Text>
    </View>
  )
}