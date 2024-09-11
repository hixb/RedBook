/// <reference types="nativewind/types" />

import type { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types'

declare global {
  declare module '*.png';
  declare module '*.svg';
  declare module '*.jpeg';
  declare module '*.jpg';
  declare module '*.webp';

  interface RootStackParamList {
    Welcome: undefined
    Login: undefined
    MainTab: undefined
  }

  type RouterNames = keyof RootStackParamList

  type ScreenNavigationProp<T extends RouterNames> = StackNavigationProp<RootStackParamList, T>

  interface ArticleComment {
    userName: string
    avatarUrl: string
    message: string
    dateTime: string
    location: string
    favoriteCount: number
    isFavorite: boolean
    children?: ArticleComment[]
  }

  interface Article {
    id: number
    title: string
    desc: string
    tag: string[]
    dateTime: string
    location: string
    userId: number
    userName: string
    isFollow: boolean
    avatarUrl: string
    images: string[]
    favoriteCount: number
    collectionCount: number
    isFavorite: boolean
    isCollection: boolean
    comments?: ArticleComment[]
  }

  interface ArticleSimple {
    id: number
    title: string
    userName: string
    avatarUrl: string
    favoriteCount: number
    isFavorite: boolean
    image: string
  }

  interface Category {
    name: string
    default: boolean
    isAdd: boolean
  }

  interface GoodsSimple {
    id: number
    title: string
    image: string
    price: number
    originPrice: number | undefined
    promotion: string | undefined
  }

  interface GoodsCategory {
    id: number
    name: string
    image: string
  }

  interface MessageListItem {
    id: number
    name: lastMessage
    avatarUrl: string
    lastMessage?: string
    lastMessageTime?: string
  }

  interface UnRead {
    unreadFavorate: number
    newFollow: number
    comment: number
  }
}
