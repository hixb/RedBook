import { observable } from 'mobx'
import { request } from '~/utils/request'
import Loading from '~/components/widget/Loading'

interface InfoTypes {
  followCount: number
  fans: number
  favorateCount: number
}

export default class MineStore {
  @observable noteList: ArticleSimple[] = []
  @observable collectionList: ArticleSimple[] = []
  @observable favorateList: ArticleSimple[] = []
  @observable refreshing: boolean = false

  @observable info: InfoTypes | null = null

  requestAll = async () => {
    Loading.show()
    this.refreshing = true
    Promise.all([
      this.requestNoteList(),
      this.requestCollectionList(),
      this.requestFavorateList(),
      this.requestInfo(),
    ]).then(() => {
      Loading.hide()
      this.refreshing = false
    })
  }

  requestNoteList = async () => {
    try {
      const { data } = await request<object, ArticleSimple[]>('noteList', {})
      this.noteList = data || []
    }
    catch (error) {
      console.log(error)
    }
  }

  requestCollectionList = async () => {
    try {
      const { data } = await request<object, ArticleSimple[]>('collectionList', {})
      this.collectionList = data || []
    }
    catch (error) {
      console.log(error)
    }
  }

  requestFavorateList = async () => {
    try {
      const { data } = await request<object, ArticleSimple[]>('favorateList', {})
      this.favorateList = data || []
    }
    catch (error) {
      console.log(error)
    }
  }

  requestInfo = async () => {
    try {
      const { data } = await request<object, InfoTypes>('accountInfo', {})
      this.info = data || {}
    }
    catch (error) {
      console.log(error)
    }
  }
}
