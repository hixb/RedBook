import { action, flow, observable } from 'mobx'
import { request } from '~/utils/request.ts'

const PAGE_SIZE = 10

export class MessageStore {
  @observable page = 1
  @observable isEnd = false
  @observable refreshing = false

  @observable messageList: MessageListItem[] = []
  @observable unread: UnRead | null = null

  @action
  refresh = () => {
    this.page = 1
    this.isEnd = false
    this.requestMessageList()
  }

  requestMessageList = async () => {
    try {
      if (this.refreshing || this.isEnd)
        return

      this.refreshing = true

      const params = {
        page: this.page,
        size: PAGE_SIZE,
      }

      const { data } = await request<{ page: number; size: number }, MessageListItem[]>('messageList', params)

      if (this.page === 1)
        this.messageList = []

      if (!data.length) {
        this.isEnd = true
        return
      }

      this.page++
      this.messageList.push(...data)
    }
    catch (e) {
      console.error(e)
    }
    finally {
      this.refreshing = false
    }
  }

  @action
  requestUnRead = flow(function* (this: MessageStore) {
    try {
      const { data } = yield request<object, UnRead>('unread', {})
      this.unread = data
    }
    catch (error) {
      console.log(error)
    }
  })
}
