import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '~/modules/home/home.tsx'
import Shop from '~/modules/shop/shop.tsx'
import Message from '~/modules/message/message.tsx'
import Mine from '~/modules/mine/mine.tsx'

import icon_tab_publish from '~/assets/images/icon_tab_publish.png'

type NameType = 'Home' | 'Shop' | 'Message' | 'Mine' | 'Publish'

interface TabTypes {
  name: NameType
  component: () => React.JSX.Element
  options: { title: string }
}

const BottomTab = createBottomTabNavigator()

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
      name: 'Publish',
      component: Shop,
      options: { title: '占位' },
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

  const RedBookTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const { routes, index } = state

    return (
      <View className="w-full h-14 flex-row items-center bg-white px-10 justify-between">
        {
          routes.map((route, idx) => {
            const { options } = descriptors[route.key]
            const label = options.title
            const isFocused = index === idx

            return idx === 2
              ? (
                <TouchableOpacity
                  key={label}
                  className="h-full flex-1 justify-center items-center"
                >
                  <Image source={icon_tab_publish} className="w-14 h-10" style={{ resizeMode: 'contain' }} />
                </TouchableOpacity>
                )
              : (
                <TouchableOpacity
                  key={label}
                  className="h-full flex-1 justify-center items-center"
                  onPress={() => navigation.navigate(route.name)}
                >
                  <Text
                    style={{
                      color: isFocused ? 'red' : 'black',
                      fontSize: isFocused ? 18 : 16,
                      fontWeight: isFocused ? 'bold' : 'normal',
                    }}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
                )
          })
        }
      </View>
    )
  }

  return (
    <View className="w-full h-full">
      <BottomTab.Navigator
        // screenOptions={({ route }) => ({
        //   tabBarIcon: ({ focused, size }) => <TabBarIcon name={route.name as NameType} focused={focused} size={size} />,
        // })}
        tabBar={(props) => <RedBookTabBar {...props} />}
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
