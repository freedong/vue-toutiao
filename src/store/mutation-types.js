// 使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然



export const GET_NEWSLIST = 'GET_NEWSLIST'  //新闻列表信息

export const CHANGE_LOADING_STATE = 'CHANGE_LOADING_STATE' //loading状态的切换

export const RETURN = 'RETURN'   //判断是否有请求数据返回

export const PULLDOWNBTN = 'PULLDOWNBTN'   //控制下拉加载数据的按钮


export const ROUTERCHANGE = 'ROUTERCHANGE'   //判断路有变化



export const SHOWSHAREBOX = 'SHOWSHAREBOX'   //share分享组件是否显示


export const COLLECTED = 'COLLECTED'   //判断是否收藏


export const GETUSERDATA = 'GETUSERDATA'   //渲染用户名数据


export const LOGINING = 'LOGINING'   //登陆和退出


export const SHOWLOGOFF = 'SHOWLOGOFF'  //是否显示退出登录
