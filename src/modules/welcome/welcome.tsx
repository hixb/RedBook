import React from 'react'
import { Image, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import icon_main_logo from '~/assets/images/icon_main_logo.png'

export default () => {
  const navigation = useNavigation<ScreenNavigationProp<'Login'>>()

  const navigateToLogin = React.useCallback(() => navigation.replace('Login'), [navigation])

  React.useEffect(() => {
    setTimeout(() => navigateToLogin(), 3000)
  }, [navigateToLogin])

  return (
    <View className="w-full h-full bg-white flex-col items-center">
      <Image style={{ resizeMode: 'contain' }} className="w-[100] h-[105 mt-200]" source={icon_main_logo} />
    </View>
  )
}
