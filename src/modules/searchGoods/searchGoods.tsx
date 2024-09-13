import { Image, LayoutAnimation, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import icon_search from '~/assets/images/icon_search.png'
import icon_arrow from '~/assets/images/icon_arrow.png'

export default () => {
  const navigation = useNavigation<ScreenNavigationProp<'SearchGoods'>>()

  const [showBack, setShowBack] = React.useState(false)
  const useInputRef = React.useRef<TextInput>(null)

  React.useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut()
      setShowBack(true)
      useInputRef.current?.focus()
    }, 100)
  }, [])

  function exit() {
    LayoutAnimation.easeInEaseOut()
    setShowBack(false)
    useInputRef.current?.blur()
    setTimeout(() => navigation.goBack(), 300)
  }

  return (
    <View className="w-full h-full bg-transparent">
      {/* 搜索 */}
      <View className="w-full h-10 flex-row items-center bg-white">
        {
          showBack
            ? (
              <TouchableOpacity className="pl-4 justify-center" onPress={exit}>
                <Image className="w-5 h-5" source={icon_arrow} />
              </TouchableOpacity>
              )
            : null
        }
        <View className="h-8 flex-1 bg-[#f0f0f0] rounded-full flex-row items-center px-4 ml-4">
          <Image className="w-5 h-5" source={icon_search} />
          <TextInput
            ref={useInputRef}
            className="text-sm text-[#bbb] ml-1.5 px-2"
            placeholder="小麦粉"
            placeholderTextColor="#bbb"
          >
            bm吊带
          </TextInput>
        </View>
        <Text className="text-base text-[#666] mx-3">搜索</Text>
      </View>
    </View>
  )
}
