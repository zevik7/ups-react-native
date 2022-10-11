import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist'

export default function Customer() {
  const tw = useTailwind()

  return (
    <View>
      <Text style={tw("text-blue-500")}>Customer</Text>
    </View>
  )
}