import type { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types'

declare global {
  declare module '*.png';
  declare module '*.svg';
  declare module '*.jpeg';
  declare module '*.jpg';

  interface RootStackParamList {
    Welcome: undefined
    Login: undefined
    Home: undefined
  }

  type RouterNames = keyof RootStackParamList

  type ScreenNavigationProp<T extends RouterNames> = StackNavigationProp<RootStackParamList, T>
}
