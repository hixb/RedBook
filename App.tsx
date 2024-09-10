import React from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import Welcome from '~/modules/welcome/welcome'
import Login from '~/modules/login/login'
import Home from '~/modules/home/home'

const Stack = createStackNavigator()

interface IRouter {
  name: RouterNames
  component: () => React.JSX.Element
}

function App(): React.JSX.Element {
  const initialRouteName: RouterNames = 'Welcome'
  const defineRouters: IRouter[] = [
    { name: 'Welcome', component: Welcome },
    { name: 'Login', component: Login },
    { name: 'Home', component: Home },
  ]

  return (
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
                options={{ headerShown: false }}
              />
            ))
          }
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App
