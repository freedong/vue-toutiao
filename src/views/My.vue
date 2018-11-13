<template lang="html">
  <div id="my">
    <!-- 头部栏 -->
    <!-- 登录状态 -->
    <div class="my-header" v-if="logined">
      <router-link to="/selfpage" class="my-info">
        <img src="../assets/imgs/head.jpg" alt="" class="my-head-portrait fl">
        <span class="my-name fl">{{userName}}</span>
        <Icon type="ios-arrow-forward" size="26" color="#fff" class="fr toMyself"></Icon>
      </router-link>
      <ul class="info-bar clearfix">
        <router-link to="/selfpage" class="info-bar-item">
          <p>1</p>动态
        </router-link>
        <router-link to="/care" class="info-bar-item">
          <p>{{vitality.follow}}</p>关注
        </router-link>
        <router-link to="/care" class="info-bar-item">
          <p>{{vitality.fans}}</p>粉丝
        </router-link>
        <router-link to="/care" class="info-bar-item">
          <p>{{vitality.visitor}}</p>7天访量
        </router-link>
      </ul>
    </div>
    <!-- 未登录状态 -->
    <div class="loginBox" v-else>
      <h2 class="loginTitl">登录你的头条，精彩永不丢失</h2>
      <Input class="admin loginInfo" placeholder="账号" v-model="admin"></Input>
      <Input class="password loginInfo" placeholder="密码" type="password" v-model="password"></Input>
      <br>
      <Button @click="login" @keyup.enter="login" type="ghost" shape="circle" class="submit">进入头条</Button>
    </div>

    <!-- 收藏和历史 -->
    <ul class="midBar">
      <li is="router-link" class="fl collect isLi" to="/collect/my">
        <Icon type="ios-cube" size="24" color="#f69e32"></Icon><br> 收藏
      </li>
      <li is="router-link" class="fl history isLi" to="/collect/readhistory">
        <Icon type="ios-timer-outline" size="24" color="#658cf5"></Icon><br> 历史
      </li>
    </ul>

    <!-- 消息通知 -->
    <div class="tipItems">
        消息通知
    </div>

    <!-- 系统设置 -->
    <router-link to="/setup" class="tipItems">
      系统设置
      <Icon type="ios-arrow-forward" size="26" color="#ccc" class="fr toSetup"></Icon>
    </router-link>
    <!-- github项目 -->
    <a class="tipItems" href="https://github.com/freedong/vue-toutiao" target=_blank>
    	Github项目地址
      <Icon type="ios-arrow-forward" size="26" color="#ccc" class="fr toSetup"></Icon>
    </a>


    <!-- 底部导航栏 -->
    <bottom-nav></bottom-nav>
  </div>
</template>

<script>
import bottomNav from '../components/bottom-nav.vue'
import * as type from '../store/mutation-types.js'
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  components:{
    bottomNav
  },
  computed:{
    ...mapGetters([
      'logined',
      'userName',
      'vitality'
    ])
  },
  methods:{
    ...mapActions([
      'setUserInfo',
    ]),
    login(){
      if(this.admin === 'admin' && this.password === 'admin'){
        this.setUserInfo(this.admin);
        // 登录后显示   退出登录按钮
        this.$store.commit(type.SHOWLOGOFF,true);
        this.admin = '';
        this.password = '';
      }else if(this.admin === ''){
        this.open('1')
      }else if(this.password == ''){
        this.open('2')
      }else {
        this.open('3')
      }
    },
    open(nodesc){
      if(nodesc === '1'){
        this.$Notice.open({
          title:'账号不能为空',
          duration:2
        });
      }else if(nodesc === '2'){
        this.$Notice.open({
          title:'密码不能为空',
          duration:2
        });
      }else {
        this.$Notice.open({
            title: '账号或密码错误',
            duration: 2
        });
      }
    },
  },
  data(){
    return{
      admin:'',
      password:''
    }
  },
}
</script>


<style lang="less">
@import '../assets/css/border.less';
.my-header {
    height: 5.5rem;
    width: 100%;
    background: rgba(51,51,51,1);
    .my-info {
        height: 4rem;
        display: block;
        .my-head-portrait {
            height: 1.6rem;
            width: 1.6rem;
            border-radius: 50%;
            margin-top: 1.2rem;
            margin-left: 1rem;
        }
        .my-name {
            font-size: 18px;
            font-weight: bold;
            color: #ffd;
            margin-top: 1.6rem;
            margin-left: 0.7rem;
        }
        .toMyself {
            margin-top: 1.6rem;
            margin-right: 0.5rem;
        }
    }
    .info-bar {
        height: 1.5rem;
        .info-bar-item {
            float: left;
            width: 25%;
            height: 1.2rem;
            box-sizing: border-box;
            border-left: 1px solid #666;
            text-align: center;
            font-size: 13px;
            color: #777;
            &:first-child {
                border: 0;
            }
            p {
                font-size: 16px;
                color: #ffd;
            }
        }
    }
}
.loginBox {
    height: 5.5rem;
    width: 100%;
    background: #d43d3d;
    text-align: center;
    color: #fff;
    .loginTitl {
        font-size: 20px;
        color: #fff;
        padding-top: 0.7rem;
        margin-bottom: 0.4rem;
    }
    .loginInfo {
        width: 70%;
        font-size: 18px;
        height: 1.2rem;
    }
    .submit {
        color: #fff;
        width: 70%;
    }
}
.midBar {
    height: 1.6rem;
    position: relative;
    .borderBottom(1px,#ccc);
    .isLi {
        width: 50%;
        text-align: center;
        margin-top: 0.2rem;
        box-sizing: border-box;
        font-size: 13px;
        color: #000;
    }
    .collect {
        position: relative;
        display: block;
        &::after {
            content: "";
            box-sizing: border-box;
            position: absolute;
            height: 100%;
            right: 0;
            top: 0;
            border-right: 1px solid #bbb;
            @media screen and (-webkit-min-device-pixel-ratio: 3) {
                transform: scaleY(0.33333);
            }
            @media screen and (-webkit-min-device-pixel-ratio: 2) {
                transform: scaleY(0.5);
            }
        }
    }
}
.tipItems {
    display: block;
    height: 1.1rem;
    width: 100%;
    margin-top: 0.3rem;
    color: #000;
    font-size: 16px;
    line-height: 1.1rem;
    font-weight: bold;
    position: relative;
    padding-left: 0.3rem;
    .verticalBorder(1px,#ccc);
    .toSetup{
        margin-right: .3rem;
        margin-top: .2rem;
    }
}
</style>
