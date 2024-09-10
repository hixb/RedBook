import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import icon_main_logo from '~/assets/images/icon_main_logo.png'

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoMain: {
    width: 200,
    height: 105,
    marginTop: 200,
    resizeMode: 'contain',
  },
})

export default () => {
  return (
    <View style={styles.root}>
      <Image style={styles.logoMain} source={icon_main_logo} />
    </View>
  )
}
