

// 封装项目中的状态信息
const state = {
  loading:true,             //新闻列表切换时loading图片的展示
  ifReturnMsg:'',           //是否有数据返回
  routerChange:true,        //路由变化
  downLoadMore:false,        //首页新闻底部是否加载更多
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
