import React from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { observer, useLocalStore } from 'mobx-react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ArticleStore } from '~/modules/articleDetail/articleDetailStore.ts'
import { ImageSlider } from '~/components/slidePager'
import UserStore from '~/stores/user.ts'
import { extractMonthAndDay } from '~/utils/date.ts'
import Heart from '~/components/Heart.tsx'

import icon_arrow from '~/assets/images/icon_arrow.png'
import icon_share from '~/assets/images/icon_share.png'
import icon_collection from '~/assets/images/icon_collection.png'
import icon_collection_selected from '~/assets/images/icon_collection_selected.png'
import icon_edit_comment from '~/assets/images/icon_edit_comment.png'

// import icon_comment from '~/assets/images/icon_comment.png'

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
  const userInfo = React.useMemo(() => UserStore.userInfo, [])

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
        {
          detail?.avatarUrl
            ? (
              <Image
                className="w-10 h-10 rounded-full"
                style={{ resizeMode: 'cover' }}
                source={{ uri: detail?.avatarUrl ?? '' }}
              />
              )
            : null
        }
        <Text className="ml-4 text-base text-[#333] flex-1">{detail?.userName}</Text>
        <TouchableOpacity className="px-4 h-7 rounded-full border border-[#ff2442] items-center justify-center">
          <Text className="text-xs text-[#ff2442]">关注</Text>
        </TouchableOpacity>
        <Image source={icon_share} className="w-7 h-7 mx-4" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
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

        {/* 标题简介区 */}
        <Text className="text-lg text-[#333] font-bold px-4">{detail?.title ?? ''}</Text>
        <Text className="text-xs text-[#333] mt-1.5 px-4">{detail?.desc ?? ''}</Text>
        <Text className="text-xs text-[#3050d0] mt-1.5 px-4">{detail?.tag.map(i => `# ${i}`).join(' ')}</Text>
        <Text className="text-xs text-[#bbb] my-4 px-4">{detail?.dateTime}  {detail?.location}</Text>
        <View className="mx-4 bg-[#eee]" style={{ height: StyleSheet.hairlineWidth }} />

        {/* 评论区 */}
        <Text className="text-sm text-[#666] mt-5 ml-4">
          {
            detail?.comments?.length
              ? `共 ${detail?.comments.length} 条评论`
              : '暂无评论'
          }
        </Text>
        <View className="p-4 flex-row items-center">
          {
            userInfo?.avatar
              ? (
                <Image
                  source={{ uri: userInfo?.avatar ?? '' }}
                  className="w-8 h-8 rounded-full"
                  style={{ resizeMode: 'cover' }}
                />
                )
              : null
          }
          <TextInput
            placeholder="说点什么吧, 万一火了呢~"
            className="flex-1 h-8 rounded-full ml-4 bg-[#f0f0f0] text-sm text-[#333] py-0 px-3"
            placeholderTextColor="#bbb"
          />
        </View>
        {
          detail?.comments?.length
            ? (
              <View className="px-4 pt-4 mb-8">
                {
                  detail.comments.map((comment) => (
                    <View key={comment.message}>
                      <View className="w-full flex-row">
                        <Image
                          className="w-8 h-8 rounded-full"
                          style={{ resizeMode: 'cover' }}
                          source={{ uri: comment.avatarUrl }}
                        />
                        <View className="flex-1 mx-3">
                          <Text className="text-sm text-[#999]">{comment.userName}</Text>
                          <Text className="text-sm text-[#999] mt-1.5">
                            {comment.message}
                            <Text className="text-xs text-[#bbb]"> {extractMonthAndDay(comment.dateTime)} {comment.location}</Text>
                          </Text>
                          {
                            comment.children?.length
                              ? (
                                  comment.children.map((child) => (
                                    <View key={child.message} className="w-full flex-row my-3" style={{ width: SCREEN_WIDTH - 76 }}>
                                      <Image
                                        className="w-8 h-8 rounded-full"
                                        style={{ resizeMode: 'cover' }}
                                        source={{ uri: child.avatarUrl }}
                                      />
                                      <View className="flex-1 mx-3">
                                        <Text className="text-sm text-[#999]">{child.userName}</Text>
                                        <Text className="text-sm text-[#999] mt-1.5">
                                          {child.message}
                                          <Text className="text-xs text-[#bbb]"> {extractMonthAndDay(child.dateTime)} {child.location}</Text>
                                        </Text>
                                      </View>
                                      <View className="flex-col items-center">
                                        <Heart value={child.isFavorite} size={20} />
                                        <Text className="text-xs mt-0.5 text-[#666]">{child.favoriteCount}</Text>
                                      </View>
                                    </View>
                                  ))
                                )
                              : null
                          }
                        </View>
                        <View className="flex-col items-center">
                          <Heart value={comment.isFavorite} size={20} />
                          <Text className="text-xs mt-0.5 text-[#666]">{comment.favoriteCount}</Text>
                        </View>
                      </View>
                      <View className="ml-[50] bg-[#eee] mb-4" style={{ height: StyleSheet.hairlineWidth }} />
                    </View>
                  ))
                }
              </View>
              )
            : <Text>没有评论~</Text>
        }
      </ScrollView>
      <View className="w-full h-16 flex-row items-center px-4 border-t border-t-[#eee]">
        <View className="h-10 flex-1 bg-[#f0f0f0] rounded-full flex-row items-center px-3 mr-3">
          <Image className="w-5 h-5" source={icon_edit_comment} />
          <TextInput
            placeholder="说点什么..."
            className="text-xs text-[#333] h-full"
            placeholderTextColor="#666"
          />
        </View>
        <Heart value={detail?.isFavorite ?? false} size={30} />
        <Text className="text-xs text-[#333] font-bold ml-2.5">{detail?.favoriteCount ?? 0}</Text>
        <Image
          className="w-[30] h-[30] ml-3"
          style={{ resizeMode: 'contain' }}
          source={detail?.isCollection ? icon_collection_selected : icon_collection}
        />
        <Text className="text-xs text-[#333] font-bold ml-2.5">{detail?.favoriteCount ?? 0}</Text>
      </View>
    </View>
  )
})
