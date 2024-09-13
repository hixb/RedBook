import React from 'react'
import { Image, Text, View } from 'react-native'

interface Props {
  icon: number
  tips: string
}

export default ({ icon, tips }: Props) => {
  return (
    <View className="items-center pt-32">
      <Image style={{ resizeMode: 'contain' }} source={icon} className="w-24 h-24" />
      <Text className="text-sm text-[#bbb] mt-4">{tips}</Text>
    </View>
  )
}
