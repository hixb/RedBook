import { action, observable } from 'mobx'
import { request } from '~/utils/request.ts'

const PAGE_SIZE = 10

export class HomeStore {
  @observable page = 1
  @observable isEnd = false
  @observable refreshing = false

  @observable homeList: ArticleSimple[] = []

  @action
  refresh = () => {
    this.page = 1
    this.isEnd = false
    this.requestHomeList()
  }

  requestHomeList = async () => {
    try {
      if (this.refreshing || this.isEnd)
        return

      this.refreshing = true

      const params = {
        page: this.page,
        size: PAGE_SIZE,
      }

      const { data } = await request<{ page: number; size: number }, ArticleSimple[]>('homeList', params)

      if (this.page === 1)
        this.homeList = []

      if (!data.length) {
        this.isEnd = true
        return
      }

      this.page++
      this.homeList.push(...data)
    }
    catch (e) {
      console.error(e)
    }
    finally {
      this.refreshing = false
    }
  }
}
