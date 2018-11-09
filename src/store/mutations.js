import * as type from './mutation-types.js'


const mutations = {
  //将首页发送的请求数据添加到list各项中去，进行渲染页
  [type.GET_NEWSLIST](state,payload){
    console.log(payload.data);
    for (var item in payload.data) {
      state.list[payload.kind].push(payload.data[item]);
    };
    console.log("mutations");
  },

  // 新闻切换时loading(加载)图片的展示的状态
  [type.CHANGE_LOADING_STATE](state,flag){
    state.loading = flag;
  },

  // 判断是否有请求数据返回
  [type.RETURN](state,flag){
    state.ifReturnMsg = flag;
  }
};


export default mutations;
