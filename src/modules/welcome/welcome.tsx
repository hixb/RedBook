import React from 'react'
import { Image, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import icon_main_logo from '~/assets/images/icon_main_logo.png'
import { fetch } from '~/utils/storage.ts'
import UserStore from '~/stores/user.ts'

export default () => {
  const navigation = useNavigation<ScreenNavigationProp<'Login'>>()

  const navigateToPage = React.useCallback(async () => {
    const userInfo = await fetch<UserInfoTypes>('userInfo')

    userInfo && UserStore.setUserInfo(userInfo)

    navigation.replace(userInfo ? 'MainTab' : 'Login')
  }, [navigation])

  React.useEffect(() => {
    setTimeout(() => navigateToPage(), 3000)
  }, [navigateToPage])

  return (
    <View className="w-full h-full bg-white flex-col items-center">
      <Image style={{ resizeMode: 'contain' }} className="w-[200] h-[105] mt-[200]" source={icon_main_logo} />
    </View>
  )
}
