import React from 'react'
import { Dimensions, Image } from 'react-native'

interface Props {
  uri: string
}

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const SHOW_WIDTH = SCREEN_WIDTH - 18 >> 1

export default ({ uri }: Props) => {
  const [imageHeight, setImageHeight] = React.useState<number>(200)

  React.useEffect(() => {
    Image.getSize(uri, (width: number, height: number) => {
      const showHeight = SHOW_WIDTH * height / width

      setImageHeight(showHeight)
    })
  }, [uri])

  return (
    <Image
      style={{ width: SCREEN_WIDTH - 18 >> 1, height: imageHeight, resizeMode: 'cover' }}
      source={{ uri }}
    />
  )
}
