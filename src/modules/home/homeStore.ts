import { action, observable } from 'mobx'
import { request } from '~/utils/request.ts'
import { fetch } from '~/utils/storage.ts'

const PAGE_SIZE = 10
const DEFAULT_CATEGORY_LIST: Category[] = [
  // 默认添加频道
  { name: '推荐', default: true, isAdd: true },
  { name: '视频', default: true, isAdd: true },
  { name: '直播', default: true, isAdd: true },
  { name: '摄影', default: false, isAdd: true },

  { name: '穿搭', default: false, isAdd: true },
  { name: '读书', default: false, isAdd: true },
  { name: '影视', default: false, isAdd: true },
  { name: '科技', default: false, isAdd: true },

  { name: '健身', default: false, isAdd: true },
  { name: '科普', default: false, isAdd: true },
  { name: '美食', default: false, isAdd: true },
  { name: '情感', default: false, isAdd: true },

  { name: '舞蹈', default: false, isAdd: true },
  { name: '学习', default: false, isAdd: true },
  { name: '男士', default: false, isAdd: true },
  { name: '搞笑', default: false, isAdd: true },

  { name: '汽车', default: false, isAdd: true },
  { name: '职场', default: false, isAdd: true },
  { name: '运动', default: false, isAdd: true },
  { name: '旅行', default: false, isAdd: true },

  { name: '音乐', default: false, isAdd: true },
  { name: '护肤', default: false, isAdd: true },
  { name: '动漫', default: false, isAdd: true },
  { name: '游戏', default: false, isAdd: true },

  // 默认添加频道
  { name: '家装', default: false, isAdd: false },
  { name: '心理', default: false, isAdd: false },
  { name: '户外', default: false, isAdd: false },
  { name: '手工', default: false, isAdd: false },

  { name: '减脂', default: false, isAdd: false },
  { name: '校园', default: false, isAdd: false },
  { name: '社科', default: false, isAdd: false },
  { name: '露营', default: false, isAdd: false },

  { name: '文化', default: false, isAdd: false },
  { name: '机车', default: false, isAdd: false },
  { name: '艺术', default: false, isAdd: false },
  { name: '婚姻', default: false, isAdd: false },

  { name: '家居', default: false, isAdd: false },
  { name: '母婴', default: false, isAdd: false },
  { name: '绘画', default: false, isAdd: false },
  { name: '壁纸', default: false, isAdd: false },

  { name: '头像', default: false, isAdd: false },
]

export class HomeStore {
  @observable page = 1
  @observable isEnd = false
  @observable refreshing = false

  @observable homeList: ArticleSimple[] = []
  @observable categoryList: Category[] = []

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

  getCategoryList = async () => {
    const cacheListStr = await fetch('categoryList')

    if (cacheListStr) {
      const cacheList = JSON.parse(cacheListStr) as Category[]
      this.categoryList = cacheList?.length ? cacheList : DEFAULT_CATEGORY_LIST
    }
    else {
      this.categoryList = DEFAULT_CATEGORY_LIST
    }
  }
}
