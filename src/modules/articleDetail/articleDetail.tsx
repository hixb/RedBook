import React from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { observer, useLocalStore } from 'mobx-react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ArticleStore } from '~/modules/articleDetail/articleDetailStore.ts'
import { ImageSlider } from '~/components/slidePager'

import icon_arrow from '~/assets/images/icon_arrow.png'
import icon_share from '~/assets/images/icon_share.png'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const styles = StyleSheet.create({
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ff2442',
  },
  inActiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#c0c0c0',
  },
})

export default observer(() => {
  const store = useLocalStore(() => new ArticleStore())
  const route = useRoute<RoutePropType<'ArticleDetail'>>()
  const navigation = useNavigation<ScreenNavigationProp<'MainTab'>>()

  const [height, setHeight] = React.useState(0)

  const detail = React.useMemo(() => store.detail, [store.detail])

  React.useEffect(() => {
    store.requestArticleDetail(route.params.id)
  }, [route.params.id, store])

  React.useEffect(() => {
    if (!detail?.images.length)
      return

    const firstImage = detail.images[0]
    Image.getSize(firstImage, (w, h) => {
      const showHeight = SCREEN_WIDTH * h / w
      setHeight(showHeight)
    })
  }, [detail?.images])

  return (
    <View className="w-full h-full bg-white">
      <View className="w-full h-14 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.pop()} className="px-4 h-full justify-center">
          <Image source={icon_arrow} className="w-5 h-5" />
        </TouchableOpacity>
        <Image
          className="w-10 h-10 rounded-full"
          style={{ resizeMode: 'cover' }}
          source={{ uri: detail?.avatarUrl ?? '' }}
        />
        <Text className="ml-4 text-base text-[#333] flex-1">{detail?.userName}</Text>
        <TouchableOpacity className="px-4 h-7 rounded-full border border-[#ff2442] items-center justify-center">
          <Text className="text-xs text-[#ff2442]">关注</Text>
        </TouchableOpacity>
        <Image source={icon_share} className="w-7 h-7 mx-4" />
      </View>
      <ScrollView className="" showsVerticalScrollIndicator={false}>
        {
          detail?.images.length
            ? (
              <View className="pb-8">
                <ImageSlider
                  indicatorContainerStyle={{ bottom: -40 }}
                  caroselImageStyle={{ height }}
                  data={detail.images.map(i => ({ img: i }))}
                  autoPlay={false}
                  closeIconColor="white"
                  activeIndicatorStyle={styles.activeDot}
                  inActiveIndicatorStyle={styles.inActiveDot}
                />
              </View>
              )
            : null
        }
      </ScrollView>
    </View>
  )
})
