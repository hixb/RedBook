import React from 'react'
import { Image, LayoutAnimation, Linking, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import icon_unselected from '~/assets/images/icon_unselected.png'
import icon_selected from '~/assets/images/icon_selected.png'
import icon_main_logo from '~/assets/images/icon_main_logo.png'
import icon_wx_logo from '~/assets/images/icon_wx.png'
import icon_triangle from '~/assets/images/icon_triangle.png'
import icon_eye_open from '~/assets/images/icon_eye_open.png'
import icon_eye_close from '~/assets/images/icon_eye_close.png'
import icon_exchange from '~/assets/images/icon_exchange.png'
import icon_close_modal from '~/assets/images/icon_close_modal.png'
import icon_qq from '~/assets/images/icon_qq.webp'
import { request } from '~/utils/request.ts'

export default () => {
  const [loginType, setLoginType] = React.useState<'quick' | 'input'>('input')
  const [agreementCheck, setAgreementCheck] = React.useState<boolean>(false)
  const [viewPassword, setViewPassword] = React.useState<boolean>(false)

  const navigation = useNavigation<ScreenNavigationProp<'Home'>>()

  const [phoneNumber, setPhoneNumber] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  const checkDisabled = agreementCheck && password.length > 6 && phoneNumber.length === 13

  const RenderAgreementReading = (
    <View className="w-full flex-row mb-8">
      <TouchableOpacity onPress={() => setAgreementCheck(!agreementCheck)}>
        <Image className="w-5 h-5" source={agreementCheck ? icon_selected : icon_unselected} />
      </TouchableOpacity>
      <Text className="text-xs text-[#999] ml-1.5">我已阅读并同意</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://google.com/')}>
        <Text className="text-xs text-[#666] underline">
          《用户协议》《隐私政策》
        </Text>
      </TouchableOpacity>
    </View>
  )

  const RenderQuickLogin = (
    <View className="w-full h-full flex-col-reverse items-center px-14">
      {RenderAgreementReading}
      <TouchableOpacity className="mb-36" onPress={changeLoginType}>
        <Text>其他登录方式&gt;</Text>
      </TouchableOpacity>
      <TouchableOpacity className="w-full h-12 rounded-full items-center justify-center flex-row mb-5 bg-[#02b856]" activeOpacity={0.7}>
        <Image className="w-[30] h-[30] mr-2.5" source={icon_wx_logo} />
        <Text className="text-white text-base">微信登录</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="w-full h-12 rounded-full items-center justify-center flex-row mb-5 bg-[#ff203a]"
        activeOpacity={0.7}
        onPress={() => navigation.replace('Home')}
      >
        <Text className="text-white text-base">一键登录</Text>
      </TouchableOpacity>
      <Image style={{ resizeMode: 'contain' }} className="w-[200] h-[105] mb-[200]" source={icon_main_logo} />
    </View>
  )

  const RenderInputLogin = (
    <View className="w-full h-full flex-col items-center px-[56]">
      <TouchableOpacity className="absolute top-[25] left-[25]" onPress={changeLoginType}>
        <Image className="w-[30] h-[30]" source={icon_close_modal} />
      </TouchableOpacity>
      <Text className="text-2xl text-[#333] mt-12 font-bold">账号密码登录</Text>
      <Text className="text-sm text-[#bbb] mt-2">未注册的手机号登陆后将自动注册</Text>
      <View className="w-full h-[60] items-center flex-row border-b border-b-[#ddd] mt-7">
        <Text className="text-2xl text-[#999]">+86</Text>
        <Image className="w-3 h-1.5 ml-1.5" source={icon_triangle} />
        <TextInput
          className="flex-1 bg-transparent h-full text-left ml-4 text-2xl text-[#333]"
          placeholder="请输入手机号码"
          placeholderTextColor="#bbb"
          autoFocus={false}
          keyboardType="number-pad"
          maxLength={13}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(formatPhoneNumber(text.replace(/\D/g, '')))}
        />
      </View>
      <View className="w-full h-[60] items-center flex-row border-b border-b-[#ddd] mt-2.5">
        <TextInput
          className="flex-1 bg-transparent h-full text-left mr-4 text-2xl text-[#333]"
          placeholder="请输入密码"
          placeholderTextColor="#bbb"
          autoFocus={false}
          maxLength={16}
          keyboardType="numbers-and-punctuation"
          value={password}
          secureTextEntry={!viewPassword}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={() => setViewPassword(!viewPassword)}>
          <Image className="w-5 h-5" source={viewPassword ? icon_eye_open : icon_eye_close} />
        </TouchableOpacity>
      </View>
      <View className="w-full flex-row items-center justify-between mt-5">
        <TouchableOpacity className="flex-row items-center">
          <Image className="w-5 h-[15] mr-1" source={icon_exchange} />
          <Text className="text-[#222]">验证码登录</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-[#222]">忘记密码?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="w-full h-14 rounded-full bg-[#ff203a] mt-5 items-center justify-center mb-5"
        style={[checkDisabled ? {} : { backgroundColor: '#ddd' }]}
        onPress={login}
        disabled={!checkDisabled}
      >
        <Text className="text-white text-lg">登录</Text>
      </TouchableOpacity>
      {RenderAgreementReading}
      <View className="flex-row justify-around items-center mt-10 w-full">
        <Image className="w-[50] h-[50]" source={icon_wx_logo} />
        <Image className="w-[50] h-[50]" source={icon_qq} />
      </View>
    </View>
  )

  function changeLoginType() {
    LayoutAnimation.easeInEaseOut()
    setLoginType(loginType === 'quick' ? 'input' : 'quick')
  }

  function formatPhoneNumber(number: string) {
    const cleaned = number.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{0,4})(\d{0,4})$/)

    return match
      ? match[1] + (match[2] ? `-${match[2]}` : '') + (match[3] ? `-${match[3]}` : '')
      : cleaned
  }

  function login() {
    if (!checkDisabled)
      return

    const phone = phoneNumber.replace(/\D/g, '')

    request('login', { name: 'dagongjue', pwd: 123456 })
      .then((res) => {
        console.log(res)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  return (
    <View className="w-full h-full bg-white flex-col items-center">
      {loginType === 'quick' ? RenderQuickLogin : RenderInputLogin}
    </View>
  )
}
