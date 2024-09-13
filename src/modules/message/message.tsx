import React from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'

import { useLocalStore } from 'mobx-react'
import { MessageStore } from '~/modules/message/MessageStore.ts'

import icon_star from '~/assets/images/icon_star.png'
import icon_group from '~/assets/images/icon_group.png'
import icon_new_follow from '~/assets/images/icon_new_follow.png'
import icon_comments from '~/assets/images/icon_comments.png'

export default () => {
  const store = useLocalStore(() => new MessageStore())

  return (
    <View className="w-full h-full bg-white">
      <View className="w-full h-12 flex-row items-center justify-center">
        <Text className="text-lg text-[#333]">消息</Text>
        <TouchableOpacity className="flex-row items-center absolute right-4">
          <Image className="w-4 h-4" source={icon_group} />
          <Text className="text-sm text-[#333] ml-1.5">群聊</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ flex: 1 }}
        data={store.messageList}
        extraData={[store.unread]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(item) => (
          <View />
        )}
        ListHeaderComponent={() => (
          <View className="px-4 flex-row py-5">
            <View className="flex-1 items-center">
              <Image className="w-14 h-14" source={icon_star} style={{ resizeMode: 'contain' }} />
              <Text className="text-base text-[#333] mt-2">赞和收藏</Text>
            </View>
            <View className="flex-1 items-center">
              <Image className="w-14 h-14" source={icon_new_follow} style={{ resizeMode: 'contain' }} />
              <Text className="text-base text-[#333] mt-2">新增关注</Text>
            </View>
            <View className="flex-1 items-center">
              <Image className="w-14 h-14" source={icon_comments} style={{ resizeMode: 'contain' }} />
              <Text className="text-base text-[#333] mt-2">评论和@</Text>
            </View>
          </View>
        )}
      />
    </View>
  )
}
