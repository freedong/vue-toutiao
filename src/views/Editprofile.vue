<template lang="html">
  <div id="Editprofile">
    <!-- 头部栏 -->
    <header-bar>
      <div class="editprofile-header" slot="editprofile-header">
        <Icon type="ios-arrow-back" size="28" color="#000" class="fl back" @click.native="goBack"></Icon>
        编辑资料
      </div>
    </header-bar>
    <!-- 内容区 -->
    <div class="editprofile_item_1">
      <div class="containner">
        <div class="editprofile_item">
          头像
          <Icon type="ios-arrow-forward" size="26" color="#ccc" class="fr toEdit"></Icon>
          <img src="../assets/imgs/head.jpg" alt="" class="fr headPic">
          <input type="file" class="file">
        </div>
        <el-button is="div" type="text"  class="editprofile_item">
            用户名
            <Icon type="ios-arrow-forward" size="26" color="#ccc" class="fr toEdit"></Icon>
            <span class="fr username" v-model="userName">{{userName}}</span>
        </el-button>
        <el-button is="div" type="text" @click="editintroduce"  class="editprofile_item">
            介绍
            <Icon type="ios-arrow-forward" size="26" color="#ccc" class="fr toEdit"></Icon>
            <span class="fr username" v-model="introduce">{{introduce}}</span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from '../components/header-bar.vue'
import * as type from '../store/mutation-types.js'
import {
  mapGetters,
  mapActions
} from 'vuex'
export default {
  components:{
    headerBar
  },
  methods:{
    goBack(){
      this.$router.go(-1);
    },
    editintroduce(){
      this.$prompt('请输入介绍','修改介绍',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        inputValue:this.introduce,
      }).then((res)=>{
        console.log(res);
        if(res.value.length < 25){
          // 改变个人介绍的值
          this.$store.commit(type.CHANGEINTRODUCE,res.value);
        }else{
          alert('请少于25字')
        }
      }).catch((err)=>{
        console.log(err);
      });
    },
  },
  computed:{
    ...mapGetters([
      'introduce',
      'userName'
    ]),
  }
}
</script>


<style lang="less">
@import '../assets/css/border.less';
#Editprofile {
    .editprofile-header {
        background: #fff;
        font-size: 18px;
        color: #000;
        box-shadow: 0 0 3px #ccc;
        .borderBottom(1px,#ccc);
        .back {
            line-height: 1.2rem;
            margin-left: 0.3rem;
        }
    }
    .editprofile_item_1{
        margin-top: 1.5rem;
        .containner{
            width: 94%;
            margin: 0 auto;
           .editprofile_item{
                display: block;
                height: 1.1rem;
                width: 100%;
                line-height: 1.1rem;
                color: #000;
                position: relative;
                padding-left: 0.3rem;
                font-weight: bold;
                font-size: 16px;
                .borderBottom(1px,#ccc);
                .toEdit{
                    margin-top: .2rem;
                }
                .username{
                    margin-right: .2rem;
                    font-size: 14px;
                    font-weight: normal;
                }
                .headPic{
                    margin-right: .2rem;
                    margin-top: .15rem;
                    border-radius: 50%;
                    height: 25px;
                    width: 25px;
                }
                .file{
                    position: absolute;
                    top :-5px;
                    display: inline-block;
                    opacity: 0
                }
            }
        }
    }
}
.el-message-box{
    width: 100% !important;
}
</style>
