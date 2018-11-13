

// 封装项目中的状态信息
const state = {
  loading:true,             //新闻列表切换时loading图片的展示
  ifReturnMsg:'',           //是否有数据返回
  routerChange:true,        //路由变化
  Sharebox:false,           //share分享组件是否显示
  collected:false,       //是否收藏
  logined:JSON.parse(localStorage.getItem('logined')) || false,               //是否登录状态
  userName:JSON.parse(localStorage.getItem('userName')) || {},               //用户名字
  downLoadMore:false,        //首页新闻底部是否加载更多
  showLog_off: true,     //setup页退出登录是否显示
  vitality: {            //my页个人信息（暂无用，等后续处理）
      follow: 14,
      fans: 0,
      visitor: 1
  },
  list:{                     //首页所有新闻栏目内容
    __all__: [],            //首页  推荐   数据
    news_hot: [],
    news_society: [],
    news_entertainment: [],
    news_tech: [],
    news_car: [],
    news_sports: [],
    news_finance: [],
    news_military: [],
    news_world: [],
    news_fashion: []
  },
};

export default state;
