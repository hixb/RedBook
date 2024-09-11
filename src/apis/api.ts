export const apiRoutes: IApiRoutes = {
  login: {
    url: '/user/login',
    method: 'get',
  },
}

interface IApiRoutes {
  [key: string]: {
    url: string
    method: 'get' | 'post'
  }
}
