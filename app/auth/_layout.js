import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} />
    </Stack>
  )
}

export default _layout

const styles = StyleSheet.create({})