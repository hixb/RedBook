import { observable } from 'mobx'
import { request } from '~/utils/request.ts'

export class ArticleStore {
  @observable detail: Article | null = null

  requestArticleDetail = async (id: number) => {
    try {
      const { data } = await request<{ id: number }, Article>('articleDetail', { id })

      this.detail = data
    }
    catch (e) {
      console.error(e)
    }
  }
}
