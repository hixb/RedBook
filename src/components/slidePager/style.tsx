import { Dimensions, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('screen')
export const styles = StyleSheet.create({
  caroselImageStyle: {
    width,
    resizeMode: 'contain',
    height: 300,
  },
  previewImageContainerStyle: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImageStyle: {
    width: width - 32,
    resizeMode: 'contain',
    height: height - 72,
  },
})
