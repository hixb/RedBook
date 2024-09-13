import React from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'

import { useLocalStore } from 'mobx-react'
import { MessageStore } from '~/modules/message/MessageStore.ts'

import icon_star from '~/assets/images/icon_star.png'
import icon_group from '~/assets/images/icon_group.png'
import icon_new_follow from '~/assets/images/icon_new_follow.png'
import icon_comments from '~/assets/images/icon_comments.png'
import icon_to_top from '~/assets/images/icon_to_top.png'

export default () => {
  const store = useLocalStore(() => new MessageStore())

  const messageColumn = React.useMemo(() => {
    const { unread } = store

    return [
      { title: '赞和收藏', icon: icon_star, count: unread?.unreadFavorate ?? 0 },
      { title: '新增关注', icon: icon_new_follow, count: unread?.newFollow ?? 0 },
      { title: '评论和@', icon: icon_comments, count: unread?.comment ?? 0 },
    ]
  }, [store])

  React.useEffect(() => {
    store.requestUnRead()
    store.requestMessageList()
  }, [store])

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
        renderItem={({ item }) => (
          <View className="w-full h-20 flex-row items-center px-4">
            <Image className="w-12 h-12 rounded-full" style={{ resizeMode: 'cover' }} source={{ uri: item.avatarUrl }} />
            <View className="flex-1 mx-3">
              <Text className="text-lg font-bold text-[#333]">{item.name}</Text>
              <Text className="text-sm text-[#999] mt-1">{item.lastMessage}</Text>
            </View>
            <View className="items-end">
              <Text className="text-xs text-[#999]">{item.lastMessageTime}</Text>
              <Image className="w-2 h-4 mt-1.5" style={{ resizeMode: 'contain' }} source={icon_to_top} />
            </View>
          </View>
        )}
        ListHeaderComponent={() => {
          return (
            (
              <View className="px-4 flex-row py-5">
                {
                  messageColumn.map((msg) => (
                    <View className="flex-1 items-center" key={msg.title}>
                      <View>
                        <Image className="w-14 h-14" source={msg.icon} style={{ resizeMode: 'contain' }} />
                        {
                          msg.count
                            ? (
                              <Text className="absolute -top-1.5 -right-2.5 bg-[#ff2442] px-2 py-1 rounded-full text-xs text-white items-center">
                                {msg.count > 99 ? '99+' : msg.count}
                              </Text>
                              )
                            : null
                        }
                      </View>
                      <Text className="text-base text-[#333] mt-2">{msg.title}</Text>
                    </View>
                  ))
                }
              </View>
            )
          )
        }}
      />
    </View>
  )
}
