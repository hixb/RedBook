import React from 'react'
import { Dimensions, Image, LayoutAnimation, Modal, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useLocalStore } from 'mobx-react'
import { useNavigation } from '@react-navigation/native'
import UserStore from '~/stores/user'
import MineStore from '~/modules/mine/MineStore.ts'
import Empty from '~/components/Empty.tsx'
import Heart from '~/components/Heart.tsx'

import icon_menu from '~/assets/images/icon_menu.png'
import icon_mine_bg from '~/assets/images/icon_mine_bg.png'
import icon_shop_car from '~/assets/images/icon_shop_car.png'
import icon_share from '~/assets/images/icon_share.png'
import icon_add from '~/assets/images/icon_add.png'
import icon_qrcode from '~/assets/images/icon_qrcode.png'
import icon_male from '~/assets/images/icon_male.png'
import icon_female from '~/assets/images/icon_female.png'
import icon_setting from '~/assets/images/icon_setting.png'
import icon_no_note from '~/assets/images/icon_no_note.webp'
import icon_no_collection from '~/assets/images/icon_no_collection.webp'
import icon_no_favorate from '~/assets/images/icon_no_favorate.webp'
import icon_service from '~/assets/images/icon_service.png'
import icon_scan from '~/assets/images/icon_scan.png'
import icon_fid_user from '~/assets/images/icon_find_user.png'
import icon_draft from '~/assets/images/icon_draft.png'
import icon_create_center from '~/assets/images/icon_create_center.png'
import icon_browse_histroy from '~/assets/images/icon_browse_history.png'
import icon_packet from '~/assets/images/icon_packet.png'
import icon_free_net from '~/assets/images/icon_free_net.png'
import icon_nice_goods from '~/assets/images/icon_nice_goods.png'
import icon_orders from '~/assets/images/icon_orders.png'
import icon_coupon from '~/assets/images/icon_coupon.png'
import icon_wish from '~/assets/images/icon_wish.png'
import icon_red_vip from '~/assets/images/icon_red_vip.png'
import icon_community from '~/assets/images/icon_community.png'
import icon_exit from '~/assets/images/icon_exit.png'
import { remove } from '~/utils/storage.ts'

interface MenusTypes {
  icon: number
  name: string
}

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const CONTENT_WIDTH = SCREEN_WIDTH * 0.75

const EMPTY_CONFIG = [
  { icon: icon_no_note, tips: '快去发布今日的好心情吧～' },
  { icon: icon_no_collection, tips: '快去收藏你喜欢的作品吧～' },
  { icon: icon_no_favorate, tips: '喜欢点赞的人运气不会太差哦～' },
]
const MENUS: MenusTypes[][] = [
  [
    { icon: icon_fid_user, name: '发现好友' },
  ],
  [
    { icon: icon_draft, name: '我的草稿' },
    { icon: icon_create_center, name: '创作中心' },
    { icon: icon_browse_histroy, name: '浏览记录' },
    { icon: icon_packet, name: '钱包' },
    { icon: icon_free_net, name: '免流量' },
    { icon: icon_nice_goods, name: '好物体验' },
  ],
  [
    { icon: icon_orders, name: '订单' },
    { icon: icon_shop_car, name: '购物车' },
    { icon: icon_coupon, name: '卡券' },
    { icon: icon_wish, name: '心愿单' },
    { icon: icon_red_vip, name: '小红书会员' },
  ],
  [
    { icon: icon_community, name: '社区公约' },
    { icon: icon_exit, name: '退出登陆' },
  ],
]

const BOTTOM_MENUS = [
  { icon: icon_setting, txt: '设置' },
  { icon: icon_service, txt: '帮助与客服' },
  { icon: icon_scan, txt: '扫一扫' },
]

export default () => {
  const navigation = useNavigation<ScreenNavigationProp<'ArticleDetail'>>()
  const store = useLocalStore(() => new MineStore())
  const { userInfo } = UserStore

  const [tabIndex, setTabIndex] = React.useState<number>(0)
  const [bgImageHeight, setBgImageHeight] = React.useState<number>(400)
  const [visible, setVisible] = React.useState(true)
  const [open, setOpen] = React.useState(true)

  const tabList = [
    { name: '关注', active: false },
    { name: '发现', active: true },
    { name: '广州', active: false },
  ]

  const renderList = React.useMemo(() => {
    const { noteList, collectionList, favorateList } = store
    return [noteList, collectionList, favorateList][tabIndex]
  }, [store, tabIndex])

  const countInfo = React.useMemo(() => {
    const { info } = store

    return [
      { title: '关注', count: info?.followCount },
      { title: '粉丝', count: info?.fans },
      { title: '获赞与收藏', count: info?.favorateCount },
    ]
  }, [store])

  React.useEffect(() => {
    store.requestAll()
  }, [store])

  const onArticlePress = React.useCallback((article: ArticleSimple) => {
    navigation.push('ArticleDetail', { id: article.id })
  }, [navigation])

  const onMenuItemPress = React.useCallback(async (item: MenusTypes) => {
    if (item.name === '退出登陆') {
      hideModal()

      await remove('userInfo')
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
    }
  }, [navigation])

  function showModal() {
    setVisible(true)
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut()
      setOpen(true)
    }, 100)
  }

  function hideModal() {
    LayoutAnimation.easeInEaseOut()
    setOpen(false)
    setTimeout(() => {
      setVisible(false)
    }, 300)
  }

  return (
    <View className="w-full h-full bg-white">
      <Image source={icon_mine_bg} className="absolute top-0 w-full" style={{ height: bgImageHeight + 64 }} />
      <View className="w-full h-12 flex-row items-center">
        <TouchableOpacity className="h-full px-4 justify-center mr-auto" onPress={showModal}>
          <Image source={icon_menu} className="w-7 h-7" style={{ resizeMode: 'contain' }} />
        </TouchableOpacity>
        {
          [icon_shop_car, icon_share].map((icon, index) => (
            <Image key={index} className="w-7 h-7 mx-3" style={{ tintColor: 'white' }} source={icon} />
          ))
        }
      </View>
      <ScrollView
        className="w-full flex-1"
        refreshControl={(
          <RefreshControl
            refreshing={store.refreshing}
            onRefresh={store.requestAll}
          />
        )}
      >
        <View
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout
            setBgImageHeight(height)
          }}
        >
          <View className="w-full flex-row items-end p-4">
            <Image source={{ uri: userInfo?.avatar }} className="w-24 h-24 rounded-full" style={{ resizeMode: 'cover' }} />
            <Image source={icon_add} className="w-7 h-7 -ml-7 mb-1.5" />
            <View className="ml-5 mb-5">
              <Text className="text-2xl text-white font-bold">{userInfo?.nickName ?? ''}</Text>
              <View className="flex-row items-center mt-4">
                <Text className="text-xs text-[#bbb]">小红书号: {userInfo?.redBookId ?? 0}</Text>
                <Image source={icon_qrcode} className="w-2 h-2 ml-1.5" style={{ tintColor: '#bbb' }} />
              </View>
            </View>
          </View>
          <Text className="text-sm text-white px-4">{userInfo?.desc ?? ''}</Text>
          <View className="w-8 h-6 bg-[#ffffff50] rounded-full mt-3 ml-4 justify-center items-center">
            <Image className="w-3 h-3" style={{ resizeMode: 'contain' }} source={userInfo?.sex === 'male' ? icon_male : icon_female} />
          </View>
          <View className="w-full pr-4 flex-row items-center mt-5 mb-7">
            {
              countInfo.map((item, index) => (
                <View key={index} className="items-center px-2">
                  <Text className="text-xs text-[#ddd] mt-1">{item.count}</Text>
                  <Text className="text-lg text-white">{item.title}</Text>
                </View>
              ))
            }
            <TouchableOpacity className="border border-white bg-[#ffffff20] px-2.5 rounded-full h-8 ml-auto justify-center items-center">
              <Text className="text-white">编辑资料</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border border-white bg-[#ffffff20] px-2.5 rounded-full h-8 ml-4 justify-center items-center">
              <Image source={icon_setting} className="w-5 h-5" style={{ tintColor: 'white' }} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="w-full h-12 flex-row items-center bg-white px-28 rounded-t-xl border-b border-b-[#eee]">
          {
            tabList.map((tab, index) => (
              <TouchableOpacity
                className="flex-1 h-full flex-col items-center justify-center"
                key={tab.name}
                onPress={() => setTabIndex(index)}
              >
                <Text className="text-[#999] text-lg">{tab.name}</Text>
                {index === tabIndex && <View className="w-7 h-0.5 bg-[#ff2442] rounded absolute bottom-1.5" />}
              </TouchableOpacity>
            ))
          }
        </View>
        {
          !renderList.length
            ? <Empty icon={EMPTY_CONFIG[tabIndex].icon} tips={EMPTY_CONFIG[tabIndex].tips} />
            : (
              <View className="w-full flex-row flex-wrap bg-white">
                {
                  renderList.map((item, index) => (
                    <TouchableOpacity
                      style={{ width: SCREEN_WIDTH - 18 >> 1 }}
                      className="bg-white ml-1.5 mb-1.5 rounded-lg overflow-hidden"
                      key={item.id + index}
                      onPress={() => onArticlePress(item)}
                    >
                      <Image source={{ uri: item.image }} style={{ width: SCREEN_WIDTH - 18 >> 1, height: 240 }} />
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
                              onValueChanged={(_: boolean) => {}}
                            />
                            <Text className="ml-1 text-sm">{item.favoriteCount}</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))
                }
              </View>
              )
        }
      </ScrollView>

      <Modal
        transparent
        visible={visible}
        statusBarTranslucent
        animationType="fade"
        onRequestClose={hideModal}
      >
        <TouchableOpacity activeOpacity={1} className="w-full h-full bg-[#000000c0] flex-row" onPress={hideModal}>
          <View className="h-full bg-white" style={{ width: CONTENT_WIDTH, marginLeft: open ? 0 : -CONTENT_WIDTH }}>
            <ScrollView
              className="w-full flex-1"
              contentContainerStyle={{
                paddingTop: 72,
                paddingHorizontal: 28,
                paddingBottom: 12,
              }}
              showsVerticalScrollIndicator={false}
            >
              {
                MENUS.map((menu, index) => (
                  <View key={index}>
                    {
                      menu.map((sub, idx) => (
                        <TouchableOpacity key={idx} className="w-full h-16 flex-row items-center" onPress={() => onMenuItemPress(sub)}>
                          <Image source={sub.icon} className="w-8 h-8" style={{ resizeMode: 'contain' }} />
                          <Text className="text-base text-[#333] ml-3">{sub.name}</Text>
                        </TouchableOpacity>
                      ))
                    }
                    {MENUS.length === index + 1 ? null : <View className="w-full h-[1] bg-[#eee]" />}
                  </View>
                ))
              }
            </ScrollView>
            <View className="w-full flex-row pt-3 pb-5">
              {
                BOTTOM_MENUS.map((menu) => (
                  <TouchableOpacity key={menu.txt} className="flex-1 items-center">
                    <View className="p-2.5 bg-[#f0f0f0] rounded-full">
                      <Image className="w-[26] h-[26]" source={menu.icon} />
                    </View>
                    <Text className="text-[13] text-[#666] mt-2">{menu.txt}</Text>
                  </TouchableOpacity>
                ))
              }
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}
