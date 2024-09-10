/**
 * @format
 */

import { AppRegistry, Platform, UIManager } from 'react-native'

import App from './App'
import { name as appName } from './app.json'

// Enable LayoutAnimation on Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental)
    UIManager.setLayoutAnimationEnabledExperimental(true)
}

AppRegistry.registerComponent(appName, () => App)
