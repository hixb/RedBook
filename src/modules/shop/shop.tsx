import React from 'react'
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { observer, useLocalStore } from 'mobx-react'
import { useNavigation } from '@react-navigation/native'
import { ShopStore } from '~/modules/shop/shopStore.ts'

import icon_search from '~/assets/images/icon_search.png'
import icon_shop_car from '~/assets/images/icon_shop_car.png'
import icon_orders from '~/assets/images/icon_orders.png'
import icon_menu_more from '~/assets/images/icon_menu_more.png'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const ITEM_WIDTH = (SCREEN_WIDTH - 18) / 2

export default observer(() => {
  const store = useLocalStore(() => new ShopStore())
  const navigation = useNavigation<ScreenNavigationProp<'SearchGoods'>>()

  React.useEffect(() => {
    store.requestGoodsList()
    store.requestTop10Category()
  }, [store])

  function onSearchPress() {
    navigation.push('SearchGoods')
  }

  return (
    <View className="w-full h-full bg-white">
      {/* 搜索 */}
      <View className="w-full h-10 flex-row items-center px-4">
        <TouchableOpacity className="h-8 flex-1 bg-[#f0f0f0] rounded-full flex-row items-center px-4" onPress={onSearchPress}>
          <Image className="w-5 h-5" source={icon_search} />
          <Text className="text-sm text-[#bbb] ml-1.5">bm吊带</Text>
        </TouchableOpacity>
        <Image className="w-5 h-5 mx-1.5" source={icon_shop_car} />
        <Image className="w-5 h-5 mx-1.5" source={icon_orders} />
        <Image className="w-5 h-5 mx-1.5" source={icon_menu_more} />
      </View>

      {/* 分类 */}
      <FlatList
        data={store.goodsList}
        style={{ flex: 1 }}
        extraData={[store.categoryList]}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="rounded-lg overflow-hidden ml-1.5 mt-1.5" style={{ width: ITEM_WIDTH }}>
            <Image className="w-full h-[200]" source={{ uri: item.image }} style={{ resizeMode: 'cover' }} />
            <Text className="text-sm text-[#333] mt-1.5 px-2">{item.title}</Text>
            {
              item.promotion
                ? <Text className="text-xs text-[#999] rounded border border-[#bbb] text-center w-20 mt-1">{item.promotion}</Text>
                : null
            }
            <Text className="text-sm text-[#333] font-bold mt-1">
              ¥
              <Text className="text-xl text-[#333] font-bold text-justify">{item.price}</Text>
              {item.originPrice ? <Text className="text-xs text-[#999]">    原价: {item.originPrice}</Text> : null}
            </Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex-row flex-wrap">
            {
              store.categoryList.map((cate) => (
                <View className="items-center w-[20%] py-4" key={cate.id}>
                  <Image className="w-10 h-10" style={{ resizeMode: 'contain' }} source={{ uri: cate.image }} />
                  <Text className="text-sm text-[#333] mt-1.5">{cate.name}</Text>
                </View>
              ))
            }
          </View>
        )}
      />
    </View>
  )
})
