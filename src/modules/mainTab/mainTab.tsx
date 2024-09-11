import React from 'react'
import { Image, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '~/modules/home/home.tsx'
import Shop from '~/modules/shop/shop.tsx'
import Message from '~/modules/message/message.tsx'
import Mine from '~/modules/mine/mine.tsx'

import icon_tab_home_normal from '~/assets/images/icon_tab_home_normal.png'
import icon_tab_home_selected from '~/assets/images/icon_tab_home_selected.png'
import icon_tab_shop_normal from '~/assets/images/icon_tab_shop_normal.png'
import icon_tab_shop_selected from '~/assets/images/icon_tab_shop_selected.png'
import icon_tab_message_normal from '~/assets/images/icon_tab_message_normal.png'
import icon_tab_message_selected from '~/assets/images/icon_tab_message_selected.png'
import icon_tab_mine_normal from '~/assets/images/icon_tab_mine_normal.png'
import icon_tab_mine_selected from '~/assets/images/icon_tab_mine_selected.png'

type NameType = 'Home' | 'Shop' | 'Message' | 'Mine'

interface TabTypes {
  name: NameType
  component: () => React.JSX.Element
  options: { title: string }
}

const BottomTab = createBottomTabNavigator()
const tabIcons: Record<NameType, { normal: any; selected: any }> = {
  Home: { normal: icon_tab_home_normal, selected: icon_tab_home_selected },
  Shop: { normal: icon_tab_shop_normal, selected: icon_tab_shop_selected },
  Message: { normal: icon_tab_message_normal, selected: icon_tab_message_selected },
  Mine: { normal: icon_tab_mine_normal, selected: icon_tab_mine_selected },
}

function TabBarIcon({ name, focused, size }: { name: NameType; focused: boolean; size: number }) {
  const { normal, selected } = tabIcons[name]
  return (
    <Image
      source={focused ? selected : normal}
      style={{ width: size, height: size }}
    />
  )
}

export default () => {
  const tabs: TabTypes[] = [
    {
      name: 'Home',
      component: Home,
      options: { title: '首页' },
    },
    {
      name: 'Shop',
      component: Shop,
      options: { title: '购物' },
    },
    {
      name: 'Message',
      component: Message,
      options: { title: '消息' },
    },
    {
      name: 'Mine',
      component: Mine,
      options: { title: '我的' },
    },
  ]

  return (
    <View className="w-full h-full">
      <BottomTab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size }) => <TabBarIcon name={route.name as NameType} focused={focused} size={size} />,
        })}
      >
        {tabs.map((tab) => (
          <BottomTab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            options={tab.options}
          />
        ))}
      </BottomTab.Navigator>
    </View>
  )
}
