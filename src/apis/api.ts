export const apiRoutes: IApiRoutes = {
  login: {
    url: '/user/login',
    method: 'get',
  },
  homeList: {
    url: '/home/homeList',
    method: 'get',
  },
}

interface IApiRoutes {
  [key: string]: {
    url: string
    method: 'get' | 'post'
  }
}
