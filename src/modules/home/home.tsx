import React from 'react'
import { Dimensions, Image, LayoutAnimation, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { observer, useLocalStore } from 'mobx-react'
import { Modal } from 'nativewind/dist/preflight'
import { useNavigation } from '@react-navigation/native'
import { HomeStore } from '~/modules/home/homeStore.ts'

import FlowList from '~/components/flow/FlowList.jsx'
import ResizeImage from '~/components/ResizeImage.tsx'
import Heart from '~/components/Heart.tsx'
import { save } from '~/utils/storage.ts'

import icon_daily from '~/assets/images/icon_daily.png'
import icon_search from '~/assets/images/icon_search.png'
import icon_arrow from '~/assets/images/icon_arrow.png'
import icon_delete from '~/assets/images/icon_delete.png'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default observer(() => {
  const store = useLocalStore(() => new HomeStore())
  const navigation = useNavigation<ScreenNavigationProp<'ArticleDetail'>>()

  const [tabIndex, setTabIndex] = React.useState<number>(1)
  const [currentCate, setCurrentCate] = React.useState<string>('推荐')

  const [myChannel, setMyChannel] = React.useState<Category[]>([])
  const [recommendChannel, setRecommendChannel] = React.useState<Category[]>([])

  const [visible, setVisible] = React.useState<boolean>(false)
  const [isEdit, setIsEdit] = React.useState<boolean>(false)

  const tabList = [
    { name: '关注', active: false },
    { name: '发现', active: true },
    { name: '广州', active: false },
  ]

  React.useEffect(() => {
    store.requestHomeList()
    store.getCategoryList()
  }, [store])

  React.useEffect(() => {
    setMyChannel(store.categoryList.filter((cate) => cate.isAdd))
    setRecommendChannel(store.categoryList.filter((cate) => !cate.isAdd))
  }, [store.categoryList])

  const onMyItemPress = React.useCallback((cate: Category, index: number) => () => {
    if (!isEdit)
      return

    const newChannel = myChannel.filter((_, i) => i !== index)
    const copy = { ...cate, isAdd: false }
    const newRecommend = [...recommendChannel, copy]

    LayoutAnimation.easeInEaseOut()

    setMyChannel(newChannel)
    setRecommendChannel(newRecommend)
  }, [isEdit, myChannel, recommendChannel])

  const onRecommendItemPress = React.useCallback((cate: Category, index: number) => () => {
    if (!isEdit)
      return

    const newRecommend = recommendChannel.filter((_, i) => i !== index)
    const copy = { ...cate, isAdd: true }
    const newChannel = [...myChannel, copy]

    LayoutAnimation.easeInEaseOut()

    setMyChannel(newChannel)
    setRecommendChannel(newRecommend)
  }, [isEdit, myChannel, recommendChannel])

  const onArticlePress = React.useCallback((article: ArticleSimple) => {
    navigation.push('ArticleDetail', { id: article.id })
  }, [navigation])

  return (
    <View className="w-full h-full justify-center items-center">
      <View className="w-full h-12 flex-row items-center bg-white px-4">
        <TouchableOpacity className="h-full justify-center items-center pl-3 mr-11">
          <Image className="w-[26] h-[26]" source={icon_daily} />
        </TouchableOpacity>
        {
          tabList.map((tab, index) => (
            <TouchableOpacity
              className="flex-1 h-full flex-col items-center justify-center"
              key={tab.name}
              onPress={() => setTabIndex(index)}
            >
              <Text className="text-[#999]" style={{ fontSize: index === tabIndex ? 18 : 15 }}>{tab.name}</Text>
              {index === tabIndex && <View className="w-7 h-0.5 bg-[#ff2442] rounded absolute bottom-1.5" />}
            </TouchableOpacity>
          ))
        }
        <TouchableOpacity className="h-full justify-center items-center pl-3 ml-11">
          <Image className="w-[26] h-[26]" source={icon_search} />
        </TouchableOpacity>
      </View>
      <FlowList
        className="w-full h-full"
        data={store.homeList}
        numColumns={2}
        refreshing={store.refreshing}
        keyExtractor={(item: ArticleSimple, index: number) => item.id + index}
        onRefresh={store.refresh}
        onEndReachedThreshold={0.1}
        onEndReached={store.requestHomeList}
        onContentSizeChange={() => !store.homeList.length && store.requestHomeList()}
        ListHeaderComponent={() => {
          const myList = store.categoryList.filter((cate) => cate.isAdd)

          return (
            <View className="w-full h-9 flex-row bg-white mb-1.5">
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-1 h-full">
                {
                  myList.map((cate) => {
                    const isSelected = cate.name === currentCate

                    return (
                      <TouchableOpacity
                        className="w-16 h-full items-center justify-center"
                        key={cate.name}
                        onPress={() => setCurrentCate(cate.name)}
                      >
                        <Text
                          className="text-xs"
                          style={{ color: isSelected ? '#222' : '#999', fontWeight: isSelected ? 'bold' : 'normal' }}
                        >
                          {cate.name}
                        </Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </ScrollView>
              <TouchableOpacity className="w-10 h-full justify-center items-center" onPress={() => setVisible(true)}>
                <Image source={icon_arrow} className="w-5 h-5 -rotate-90" />
              </TouchableOpacity>
            </View>
          )
        }}
        renderItem={({ item, index }: { item: ArticleSimple; index: number }) => (
          <TouchableOpacity
            style={{ width: SCREEN_WIDTH - 18 >> 1 }}
            className="bg-white ml-1.5 mb-1.5 rounded-lg overflow-hidden"
            key={item.id + index}
            onPress={() => onArticlePress(item)}
          >
            <ResizeImage uri={item.image} />
            <View className="px-2 mt-2 mb-3">
              <Text className="truncate text-lg text-black">{item.title}</Text>
              <View className="flex-row items-center justify-between mt-2">
                <View className="flex-row items-center">
                  <Image className="w-6 h-6 rounded-full" source={{ uri: item.avatarUrl }} style={{ resizeMode: 'contain' }} />
                  <Text className="ml-1 text-sm">{item.userName}</Text>
                </View>
                <View className="flex-row items-center">
                  <Heart
                    value={item.isFavorite}
                    onValueChanged={(value: boolean) => {
                      console.log(value)
                    }}
                  />
                  <Text className="ml-1 text-sm">{item.favoriteCount}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={() => <Text className="w-ful text-xs text-[#999] my-3 text-center">没有更多数据了~</Text>}
      />

      <Modal
        transparent
        visible={visible}
        statusBarTranslucent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View className="w-full h-full bg-transparent">
          <View className="w-full h-4/5 bg-white px-4" style={{ marginTop: 48 + (StatusBar.currentHeight || 0) }}>
            <View className="flex-row items-center w-full">
              <Text className="text-xs text-[#333] font-bold">我的频道</Text>
              <Text className="text-xs text-[#999] ml-3">点击进入频道</Text>
              <TouchableOpacity
                className="px-2 h-6 bg-[#eee] rounded-full items-center justify-center ml-auto"
                onPress={() => {
                  setIsEdit((edit) => {
                    edit && save('categoryList', [...myChannel, ...recommendChannel])
                    return !edit
                  })
                }}
              >
                <Text className="text-xs text-[#3050ff]">{isEdit ? '完成编辑' : '进入编辑'}</Text>
              </TouchableOpacity>
              <TouchableOpacity className="p-2" onPress={() => setVisible(false)}>
                <Image source={icon_arrow} className="w-4 h-4 rotate-90" style={{ resizeMode: 'contain' }} />
              </TouchableOpacity>
            </View>
            <View className="flex-row flex-wrap">
              {
                myChannel.map((cate, index) => (
                  <View key={cate.name} className="w-1/4 mt-3">
                    <TouchableOpacity
                      className="h-9 justify-center items-center border border-[#eee] rounded-md mr-4"
                      style={{ backgroundColor: cate.default ? '#f4f4f4' : '#fff' }}
                      onPress={onMyItemPress(cate, index)}
                    >
                      <Text className="text-base text-[#666]">{cate.name}</Text>
                      {
                        isEdit && !cate.default
                          ? <Image source={icon_delete} className="absolute -top-2.5 -right-2.5 w-5 h-5" />
                          : null
                      }
                    </TouchableOpacity>
                  </View>
                ))
              }
            </View>

            <View className="flex-row items-center w-full mt-5">
              <Text className="text-xs text-[#333] font-bold">推荐频道</Text>
              <Text className="text-xs text-[#999] ml-3">点击添加频道</Text>
            </View>
            <View className="flex-row flex-wrap">
              {
                recommendChannel.map((cate, index) => (
                  <View key={cate.name} className="w-1/4 mt-3">
                    <TouchableOpacity
                      className="h-9 justify-center items-center border border-[#eee] rounded-md mr-4"
                      onPress={onRecommendItemPress(cate, index)}
                    >
                      <Text className="text-base text-[#666]">+ {cate.name}</Text>
                    </TouchableOpacity>
                  </View>
                ))
              }
            </View>
          </View>
          <View className="w-full flex-1 bg-[#00000060]" />
        </View>
      </Modal>
    </View>
  )
})
