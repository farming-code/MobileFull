<template>
  <div id="app">
    <router-view/>
    <!-- 脚部 -->
    <mt-tabbar
      v-model="selected"
      class="footer">
      <mt-tab-item id="/MainframeInspection/HealthDegree">
        <i class="iconfont icon-jiankangdu"/>
        <p>健康度</p>
      </mt-tab-item>

      <mt-tab-item id="/MainframeInspection/Broadcast">
        <i class="iconfont icon-pingtaibobao"/>
        <p>事件播报</p>
      </mt-tab-item>

      <mt-tab-item id="/MainframeInspection/Emergency">
        <i class="iconfont icon-zhinengyingji"/>
        <p>智能应急</p>
      </mt-tab-item>

      <mt-tab-item id="/MainframeInspection/Indicators">
        <i class="iconfont icon-xiangxizhibiao"/>
        <p>详细指标</p>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
// 引入iconfont
import '@/assets/fonts/iconfont.css';
// 引入公共的样式
import '@/assets/css/index.css';
export default {
  name: 'App',

  data(){
    return {
      selected: '',
    };
  },

  watch: {
    selected(val, oldVal) {
      if (oldVal === '') {
        return;
      }

      let path = this.selected;
      if (path !== '/MainframeInspection/Indicators') {
        this.$router.push(path);
      } else {
        this.$router.push({name: 'Indicators', params: { isToggle: true}});
      }
    }
  },

  created(){
    this.getSelected();
  },

  methods:{
    getSelected() {
      let hash = location.hash.slice(1);
      if (hash === '/MainframeInspection') {
        hash = '/MainframeInspection/Emergency';
      }else if(hash  === '/MainframeInspection/SiteSwitching'){
        hash = '/MainframeInspection/Emergency';
      }else if(hash  === '/MainframeInspection/TradingBlockage') {
        hash = '/MainframeInspection/Emergency';
      }else if(hash  === '/MainframeInspection/EmerTables') {
        hash = '/MainframeInspection/Emergency';
      }

      this.selected = hash;

    }
  },


};
</script>

<style lang="less" scoped>
  #app {
    position: relative;
    z-index: 9;
    height: 100%;
  }

  .mint-tab-item-label {
    i {
      display: block;
      margin-top: 10px;
      font-size: 30px;
      color: #767676;
    }

    p {
      padding-top: 14px;
      font-size: 24px;
      color: inherit;
    }
  }

  .footer {
    position: fixed;
    z-index: 9999;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 6px 20px 20px #f0f0f0;

    a {
      float: left;
      width: 25%;
      height: 110px;
      text-align: center;
    }
  }

  .mint-tabbar > .mint-tab-item {
    i {
      color: #434343;
    }

    p {
      color: #434343;
    }
  }

  .mint-tabbar > .mint-tab-item.is-selected {
    background-color: #fff;

    i {
      font-size: 30px;
      color: #5c76e3;
    }

    p {
      color: #5c76e3;
    }
  }

</style>
