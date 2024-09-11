import React from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import { observer, useLocalStore } from 'mobx-react'
import { HomeStore } from '~/modules/home/homeStore.ts'

import icon_heart_empty from '~/assets/images/icon_heart_empty.png'
import FlowList from '~/components/flow/FlowList.jsx'
import ResizeImage from '~/components/ResizeImage.tsx'

// import icon_heart from '~/assets/images/icon_heart.png'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default observer(() => {
  const store = useLocalStore(() => new HomeStore())

  React.useEffect(() => {
    store.requestHomeList()
  }, [store])

  return (
    <View className="w-full h-full justify-center items-center">
      <FlowList
        className="w-full h-full"
        contentContainerStyle={{ paddingTop: 6 }}
        data={store.homeList}
        numColumns={2}
        refreshing={store.refreshing}
        onRefresh={store.refresh}
        onEndReachedThreshold={0.1}
        onEndReached={store.requestHomeList}
        onContentSizeChange={() => !store.homeList.length && store.requestHomeList()}
        renderItem={({ item, index }: { item: ArticleSimple; index: number }) => (
          <View
            style={{ width: SCREEN_WIDTH - 18 >> 1 }}
            className="bg-white ml-1.5 mb-1.5 rounded-lg overflow-hidden"
            key={item.id + index}
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
                  <Image className="w-5 h-5 rounded-full" source={icon_heart_empty} style={{ resizeMode: 'contain' }} />
                  <Text className="ml-1 text-sm">{item.favoriteCount}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <Text className="w-ful text-xs text-[#999] my-3 text-center">没有更多数据了~</Text>
        )}
      />
    </View>
  )
})
