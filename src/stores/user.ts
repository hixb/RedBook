import { flow } from 'mobx'
import { request } from '~/utils/request.ts'
import { save } from '~/utils/storage.ts'

interface UserInfoRequest {
  name: string
  pwd: string
}

interface UserInfoTypes {
  name: string
  avatar: string
  desc: string
  sex: string
  redBookId: number
  location: string
  nickName: string
}

class UserStore {
  userInfo: UserInfoTypes | null = null

  requestLogin = flow(function* (this: UserStore, params: UserInfoRequest & { callback?: (success: boolean) => void }) {
    try {
      const res = yield request<UserInfoRequest, UserInfoTypes>('login', params)
      if (res.data.name) {
        this.userInfo = res.data
        params.callback?.(true)
        save('userInfo', res.data)
      }
      else {
        params.callback?.(false)
      }
    }
    catch (e) {
      console.error(e)
      params.callback?.(false)
    }
  })
}

export default new UserStore()
