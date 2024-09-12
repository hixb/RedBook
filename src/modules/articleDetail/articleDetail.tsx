import React from 'react'
import { View } from 'react-native'
import { useLocalStore } from 'mobx-react'
import { useRoute } from '@react-navigation/native'
import { ArticleStore } from '~/modules/articleDetail/articleDetailStore.ts'

export default () => {
  const store = useLocalStore(() => new ArticleStore())
  const route = useRoute<RoutePropType<'ArticleDetail'>>()

  React.useEffect(() => {
    console.log(route.params)
    store.requestArticleDetail(route.params.id)
  }, [route, store])

  return (
    <View className="w-full h-full bg-white" />
  )
}
