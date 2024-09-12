export const apiRoutes: IApiRoutes = {
  login: {
    url: '/user/login',
    method: 'get',
  },
  homeList: {
    url: '/home/homeList',
    method: 'get',
  },
  articleDetail: {
    url: '/article/articleDetail',
    method: 'get',
  },
}

interface IApiRoutes {
  [key: string]: {
    url: string
    method: 'get' | 'post'
  }
}
