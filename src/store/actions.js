import axios from 'axios'
import jsonp from 'jsonp'
import * as type from './mutation-types.js'



const actions = {
  // 首页数据请求
  getNews({commit,state},pay){
    if(pay.kind && pay.flag){
      let newUrl = 'http://m.toutiao.com/list/?tag=' + pay.kind + '&ac=wap&count=20&format=json_raw&as=A125A8CEDCF8987&cp=58EC18F948F79E1&min_behot_time=' + parseInt((new Date().getTime())/1000);
      jsonp(newUrl,function(err,res){
        commit(type.GET_NEWSLIST,{
          data:res.data,
          kind:pay.kind
        });
        console.log('vuex action');
        console.log(pay.kind);
        console.log(res);
        console.log(res.return_count);


        // 改变loading的状态
        commit(type.CHANGE_LOADING_STATE,false);
        // 改变ifReturnMsg的状态
        // 判断请求是否有数据
        if(res.return_count){
          commit(type.RETURN,true);
        }else{
          commit(type.RETURN,false);
        }
      })
    }
  },
  // 下拉点击后加载数据
  pulldownloadmore({commit,state},payload) {
    if(payload.flag && payload.kind){
      // 控制下拉加载数据的按钮
      commit(type.PULLDOWNBTN,false);
      let pullUrl = 'http://m.toutiao.com/list/?tag=' + payload.kind + '&ac=wap&count=20&format=json_raw&as=A125A8CEDCF8987&cp=58EC18F948F79E1&min_behot_time=' + parseInt((new Date().getTime())/1000);
      jsonp(pullUrl,function(err,res){
        commit(type.GET_NEWSLIST,{
          data:res.data,
          kind:payload.kind
        });
      });
    }
  },


  // 登录操作
  setUserInfo({commit,state},res){
    localStorage.setItem('userName',JSON.stringify(res));
    localStorage.setItem('logined',true);
    commit(type.LOGINING,true);
    commit(type.GETUSERDATA,res);
  },
  // 退出登录操作
  setSignOut({commit}){
    localStorage.removeItem('userName');
    localStorage.setItem('logined',false);
    commit(type.LOGINING,false);
    commit(type.SHOWLOGOFF,false);
  },
};

export default actions;
