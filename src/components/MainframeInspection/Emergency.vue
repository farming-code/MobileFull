<template>
  <div>
    <child class="health_top" />
    <div class="nav">
      <h1>智能应急</h1>
    </div>
    <div class="bar">
      <ul class="clearfix">
        <li>
          <router-link :to="{name:'TradingBlockage'}">
            <i class="iconfont icon-jiaoyirongliang"/>
            <span>交易堵塞</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{name:'SiteSwitching'}">
            <i class="iconfont icon-zhandianqiehuan_"/>
            <span>站点切换</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{name:'EmerTables'}">
            <i class="iconfont icon-yingjigongjuxiang"/>
            <span>应急工具箱</span>
          </router-link>
        </li>
        <li>
          <a href="javascript:;">
            <i class="iconfont icon-yingjiyuan_"/>
            <span>应急预案</span>
          </a>
        </li>
      </ul>
    </div>
    <!-- 下面的内容 -->
    <div class="yj">应急情况</div>
    <div class="bottom">
      <div class="mui-scroll-wrapper">
        <div class="mui-scroll">
          <!-- 这里面放置真实的DOM内容 -->
          <ul class="yj_content">
            <li
              v-for="(item,i) in list "
              :key="i">
              <p class="text">{{ item.content }}<span class="circle"/></p>
              <p class="time">{{ item.timestamp }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoHome from '@/components/Common/GoHome';
export default {
  components: {
    child:GoHome
  },
  data(){
    return {
      list:[],
      lisHeight:'',
      timeId: ''
    };
  },
  watch: {
    lisHeight(curVal) {
      document.querySelector('.mui-scroll').style.height = curVal;
      // 在每次点击的时候,让ul的位置放在0.0的位置
      this.mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,1);
    }
  },
  mounted(){
    this.getList();
    this.mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    this.timeId = setInterval(()=> {
      this.getList();
    },60000);
  },
  beforeDestroy() {
    clearInterval(this.timeId);
    this.timeId = null;
  },
  methods:{
    getList(){
      this.$http.get(`${this.$path.node}/mobile/yps/load_auto_yj`)
        .then(data => {
          this.list = data.data.yjs;
          this.$nextTick(function(){
            this.lisHeight = this.getChildrenHeight('.yj_content li') + 'px'; // 获取lis中的高度
          });
        });
    },
    // 获取元素计算后的样式
    getStyle(element){
      let num = document.defaultView.getComputedStyle(element,null)['marginBottom'];
      return num.substring(0,num.length - 2) - 0;
    },
    // 动态计算父元素中的所有子元素高度
    getChildrenHeight(far){
      // 获取DOM出错
      const childs = document.querySelectorAll(far);
      if(childs){
        let height = 240;
        // 遍历数组,获得每一个a标签的高度
        childs.forEach((item) => {
          height += item.offsetHeight + this.getStyle(item);
        });
        return height;
      }

    },
    // 获取随机颜色
    getColor(){
      return '#'+Math.floor(Math.random()*16777215).toString(16);
    }
  },
};
</script>

<style lang="less" scoped>
  .health_top {
    margin-bottom: 10px;
  }
  .nav {
    h1 {
      padding-left: 50px;
      font-size: 36px;
      color: #434343;
    }
  }

  .bar {
    padding: 30px;

    li {
      float: left;
      width: 47%;
      height: 100px;
      border-radius: 14px;
      overflow: hidden;
      background: #000;

      a {
        display: block;
        width: 100%;
        height: 100%;
        padding-top: 32px;
        font-size: 24px;
        text-align: center;
        color: #fff;

        i {
          margin-right: 10px;
          font-size: 54px;
          vertical-align: middle;
        }

        span {
          display: inline-block;
          padding-top: 10px;
          vertical-align: middle;
        }
      }
    }

    li:nth-child(even) {
      float: right;
    }

    li:first-child,
    li:nth-child(2) {
      margin-bottom: 30px;
    }

    li:nth-child(1) {
      background: #fff url("../../assets/images/jiaoyirongliang.png") center center no-repeat;
      background-size: 100%;
      box-shadow: 0 10px 30px 0 #b2b3f6;
    }

    li:nth-child(2) {
      background: #fff url("../../assets/images/zhandianqiehuan.png") center center no-repeat;
      background-size: 100%;
      box-shadow: 0 10px 30px 0 #efafaf;
    }

    li:nth-child(3) {
      background: #fff url("../../assets/images/yingjigonjuxiang.png") center center no-repeat;
      background-size: 100%;
      box-shadow: 0 10px 30px 0 #adf0a8;
    }

    li:nth-child(4) {
      background: #fff url("../../assets/images/yingjiyuan.png") center center no-repeat;
      background-size: 100%;
      box-shadow: 0 10px 30px 0 #f1d7a4;
    }
  }

  .yj {
    margin-top: 40px;
    margin-bottom: 40px;
    margin-left: 40px;
    font-weight: 700;
    font-size: 36px;
    color: #434343;
  }

  .mui-scroll-wrapper {
    touch-action: none;
  }

  .bottom {
    position: relative;
    height: 1100px;
    padding: 40px;

    .yj_content {
      width: 100%;
      height: 100%;
      padding: 0 30px;
      overflow: auto;

      li {
        width: 100%;
        padding: 30px 30px 30px 80px;
        margin-bottom: 30px;
        border-radius: 24px;
        background-color: #fff;
        box-shadow: 0 10px 30px 5px #e0e0e0;

        .text {
          position: relative;
          margin-bottom: 30px;
          font-size: 30px;
          line-height: 40px;
          text-align: justify;
          color: #424242;

          span {
            position: absolute;
            top: 12px;
            left: -40px;
            width: 14px;
            height: 14px;
            border-radius: 20px;
            background-color: #6f80e8;
            box-shadow: 1px 0 10px 1px #6f80e8;
          }
        }

        .time {
          font-size: 26px;
        }
      }
    }
  }

  .noEmer {
    position: relative;
    height: 100%;

    div {
      height: 140px;
      font-size: 28px;
      line-height: 140px;
      text-align: center;
    }
  }
</style>
