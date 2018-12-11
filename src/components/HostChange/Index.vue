<template>
  <div class="_host_change">
    <router-view/>
    <mt-tabbar
      v-model="selected"
      class="footer">
      <mt-tab-item id="/HostChange/TheHostChanges">
        <i class="icon iconfont icon-zhujibiangeng"/>
        <p>主机变更</p>
      </mt-tab-item>
      <mt-tab-item id="/HostChange/TheHostTemplate">
        <i class="icon iconfont icon-biangengmokuai"/>
        <p>变更模版</p>
      </mt-tab-item>
      <mt-tab-item id="/HostChange/TheHostPortrait">
        <i class="icon iconfont icon-biangenghuaxiang"/>
        <p>变更画像</p>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
// 引入公共样式
import '@/assets/css/index.css';
// 引入iconfont
import '@/assets/fonts/iconfont.css';
export default {
  name: 'App',
  data() {
    return {
      selected: ''
    };
  },
  watch: {
    selected(val, oldVal) {
      if (oldVal === '') {
        return;
      }

      this.$router.push(this.selected);
    }
  },
  created() {
    this.getSelected();
  },
  methods: {
    getSelected() {
      let hash = location.hash.slice(1);
      if(hash.indexOf('/Details/')) {
        hash = '/HostChange/TheHostChanges';
      }
      this.selected = hash;
    }
  }
};
</script>

<style lang="less" scoped>
._host_change {
  height: 93%;
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
