import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen name="detail" options={{ headerShown: false }} />
        <Stack.Screen name="add" options={{ headerShown: false }} />
        <Stack.Screen name="edit" options={{ headerShown: false }} />
    </Stack>
  )
}

export default _layout
