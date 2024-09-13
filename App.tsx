import React from 'react'
import { Platform, StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import type { TransitionPreset } from '@react-navigation/stack/src/types.tsx'
import { Pushy, PushyProvider } from 'react-native-update'
import _update_config from './update.json'
import Welcome from '~/modules/welcome/welcome'
import Login from '~/modules/login/login'
import MainTab from '~/modules/mainTab/mainTab.tsx'
import ArticleDetail from '~/modules/articleDetail/articleDetail.tsx'
import SearchGoods from '~/modules/searchGoods/searchGoods.tsx'

const Stack = createStackNavigator()

interface IRouter {
  name: RouterNames
  component: () => React.JSX.Element
  options?: {
    headerShown?: boolean
    TransitionPreset?: TransitionPreset
    presentation?: 'modal' | 'card' | 'transparentModal'
  }
}

const { appKey } = (_update_config as any)[Platform.OS]

const pushyClient = new Pushy({
  appKey,
  // 注意，默认情况下，在开发环境中不会检查更新
  // 如需在开发环境中调试更新，请设置debug为true
  // 但即便打开此选项，也仅能检查、下载热更，并不能实际应用热更。实际应用热更必须在release包中进行。
  // debug: true,
  // updateStrategy: null,
})

function App(): React.JSX.Element {
  const initialRouteName: RouterNames = 'Welcome'

  const defaultOptions: IRouter['options'] = {
    headerShown: false,
    ...TransitionPresets.ModalPresentationIOS,
  }
  const defineRouters: IRouter[] = [
    { name: 'Welcome', component: Welcome, options: defaultOptions },
    { name: 'Login', component: Login, options: defaultOptions },
    { name: 'MainTab', component: MainTab, options: defaultOptions },
    { name: 'ArticleDetail', component: ArticleDetail, options: defaultOptions },
    { name: 'SearchGoods', component: SearchGoods, options: { headerShown: false, presentation: 'transparentModal' } },
  ]

  return (
    <PushyProvider client={pushyClient}>
      <SafeAreaProvider>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="white"
        />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{
              cardStyle: { elevation: 1 },
            }}
          >
            {
              defineRouters.map((router) => (
                <Stack.Screen
                  key={router.name}
                  name={router.name}
                  component={router.component}
                  options={router.options}
                />
              ))
            }
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PushyProvider>
  )
}

export default App
