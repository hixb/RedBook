import React from 'react'
import { Image, LayoutAnimation, Linking, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

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

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
})

export default () => {
  const [loginType, setLoginType] = React.useState<'quick' | 'input'>('input')
  const [agreementCheck, setAgreementCheck] = React.useState<boolean>(false)
  const [viewPassword, setViewPassword] = React.useState<boolean>(false)

  const navigation = useNavigation<ScreenNavigationProp<'Home'>>()

  const renderAgreementReading = () => {
    const agreementStyles = StyleSheet.create({
      agreementLayout: { width: '100%', flexDirection: 'row', marginBottom: 32 },
      radioButton: { width: 20, height: 20 },
      labelTxt: { fontSize: 12, color: '#999', marginLeft: 6 },
      protocolTxt: { fontSize: 12, color: '#666', textDecorationLine: 'underline' },
    })

    return (
      <View style={agreementStyles.agreementLayout}>
        <TouchableOpacity onPress={() => setAgreementCheck(!agreementCheck)}>
          <Image style={agreementStyles.radioButton} source={agreementCheck ? icon_selected : icon_unselected} />
        </TouchableOpacity>
        <Text style={agreementStyles.labelTxt}>我已阅读并同意</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://google.com/')}>
          <Text style={agreementStyles.protocolTxt}>
            《用户协议》《隐私政策》
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderQuickLogin = () => {
    const quickStyles = StyleSheet.create({
      container: { width: '100%', height: '100%', flexDirection: 'column-reverse', alignItems: 'center', paddingHorizontal: 56 },
      logo: { width: 200, height: 105, marginBottom: 200, resizeMode: 'contain' },
      buttonArea: { width: '100%' },
      button: { width: '100%', height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginBottom: 20 },
      buttonText: { color: 'white', fontSize: 16 },
      wechatIcon: { width: 30, height: 30, marginRight: 10 },
      otherWays: { marginBottom: 150 },
    })

    return (
      <View style={quickStyles.container}>
        {renderAgreementReading()}
        <TouchableOpacity
          style={quickStyles.otherWays}
          onPress={changeLoginType}
        >
          <Text>其他登录方式&gt;</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[quickStyles.button, { backgroundColor: '#02b856' }]} activeOpacity={0.7}>
          <Image style={quickStyles.wechatIcon} source={icon_wx_logo} />
          <Text style={quickStyles.buttonText}>微信登录</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[quickStyles.button, { backgroundColor: '#ff203a' }]}
          activeOpacity={0.7}
          onPress={() => navigation.replace('Home')}
        >
          <Text style={quickStyles.buttonText}>一键登录</Text>
        </TouchableOpacity>
        <Image style={quickStyles.logo} source={icon_main_logo} />
      </View>
    )
  }

  const renderInputLogin = () => {
    const inputStyles = StyleSheet.create({
      container: { width: '100%', height: '100%', flexDirection: 'column', alignItems: 'center', paddingHorizontal: 56 },
      titleText: { fontSize: 28, color: '#333', marginTop: 56, fontWeight: 'bold' },
      tip: { fontSize: 14, color: '#bbb', marginTop: 8 },
      phoneLayout: { width: '100%', height: 60, alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ddd', marginTop: 28 },
      pre: { fontSize: 24, color: '#999' },
      triangle: { width: 12, height: 6, marginLeft: 6 },
      phoneInput: { flex: 1, backgroundColor: 'transparent', height: '100%', textAlign: 'left', textAlignVertical: 'center', fontSize: 24, color: '#333' },
      passwordLayout: { width: '100%', height: 60, alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ddd', marginTop: 10 },
      passwordInput: { marginRight: 16 },
      changeMethods: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 },
      captcha: { flexDirection: 'row', alignItems: 'center' },
      exchange: { width: 20, height: 15, marginRight: 5 },
      methodText: { color: '#222' },
      loginButton: { width: '100%', height: 56, borderRadius: 100, backgroundColor: '#f5f5f5', marginTop: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
      closeWrap: { position: 'absolute', top: 25, left: 25 },
      closeIcon: { width: 30, height: 30 },
      threePartyLogin: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 40, width: '100%' },
      icons: { width: 50, height: 50 },
    })

    return (
      <View style={inputStyles.container}>
        <TouchableOpacity style={inputStyles.closeWrap} onPress={changeLoginType}>
          <Image style={inputStyles.closeIcon} source={icon_close_modal} />
        </TouchableOpacity>
        <Text style={inputStyles.titleText}>账号密码登录</Text>
        <Text style={inputStyles.tip}>未注册的手机号登陆后将自动注册</Text>
        <View style={inputStyles.phoneLayout}>
          <Text style={inputStyles.pre}>+86</Text>
          <Image style={inputStyles.triangle} source={icon_triangle} />
          <TextInput
            style={[inputStyles.phoneInput, { marginLeft: 16 }]}
            placeholder="请输入手机号码"
            placeholderTextColor="#bbb"
            autoFocus={false}
          />
        </View>
        <View style={inputStyles.passwordLayout}>
          <TextInput
            style={[inputStyles.phoneInput, inputStyles.passwordInput]}
            placeholder="请输入密码"
            placeholderTextColor="#bbb"
            autoFocus={false}
          />
          <TouchableOpacity onPress={() => setViewPassword(!viewPassword)}>
            <Image style={{ width: 25, height: 20 }} source={viewPassword ? icon_eye_open : icon_eye_close} />
          </TouchableOpacity>
        </View>
        <View style={inputStyles.changeMethods}>
          <TouchableOpacity style={inputStyles.captcha}>
            <Image style={inputStyles.exchange} source={icon_exchange} />
            <Text style={inputStyles.methodText}>验证码登录</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={inputStyles.methodText}>忘记密码?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={inputStyles.loginButton} onPress={() => navigation.replace('Home')}>
          <Text>登录</Text>
        </TouchableOpacity>
        {renderAgreementReading()}
        <View style={inputStyles.threePartyLogin}>
          <Image style={inputStyles.icons} source={icon_wx_logo} />
          <Image style={inputStyles.icons} source={icon_qq} />
        </View>
      </View>
    )
  }

  function changeLoginType() {
    LayoutAnimation.easeInEaseOut()
    setLoginType(loginType === 'quick' ? 'input' : 'quick')
  }

  return (
    <View style={styles.root}>
      {loginType === 'quick' ? renderQuickLogin() : renderInputLogin()}
    </View>
  )
}
