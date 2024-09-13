import { action, flow, observable } from 'mobx'
import { request } from '~/utils/request.ts'

const PAGE_SIZE = 10

export class ShopStore {
  @observable page = 1
  @observable isEnd = false
  @observable refreshing = false

  @observable goodsList: GoodsSimple[] = []
  @observable categoryList: GoodsCategory[] = []

  @action
  refresh = () => {
    this.page = 1
    this.isEnd = false
    this.requestGoodsList()
  }

  requestGoodsList = async () => {
    try {
      if (this.refreshing || this.isEnd)
        return

      this.refreshing = true

      const params = {
        page: this.page,
        size: PAGE_SIZE,
      }

      const { data } = await request<{ page: number; size: number }, GoodsSimple[]>('goodsList', params)

      if (this.page === 1)
        this.goodsList = []

      if (!data.length) {
        this.isEnd = true
        return
      }

      this.page++
      this.goodsList.push(...data)
    }
    catch (e) {
      console.error(e)
    }
    finally {
      this.refreshing = false
    }
  }

  @action
  requestTop10Category = flow(function* (this: ShopStore) {
    try {
      const { data } = yield request<object, GoodsCategory[]>('top10Category', {})
      this.categoryList = data || []
    }
    catch (error) {
      console.log(error)
    }
  })
}
