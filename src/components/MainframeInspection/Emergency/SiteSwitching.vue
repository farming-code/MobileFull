<template>
  <div class="main">
    <div
      v-if="site === 'jd'? true : false"
      class="photos">
      <img
        src="../../../assets/images/siteSwitching2.jpg"
        alt=""
        preview="0"
        preview-text="嘉定站点" >
    </div>
    <div
      v-else
      class="photos">
      <img
        src="../../../assets/images/siteSwitching1.jpg"
        alt=""
        preview="0"
        preview-text="外高桥站点" >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      site: ''
    };
  },
  created() {
    this.checkoutSite();
  },
  mounted() {},
  methods: {
    checkoutSite() {
      if (localStorage.getItem('mainSite')) {
        this.site = localStorage.getItem('mainSite');
      } else {
        this.site = 'jd';
      }
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
}

.photos {
  margin-top: 100px;

  img {
    width: 100%;
    height: 100%;
  }
}

.pswp__caption {
  height: 40px;

  .pswp__caption__center {
    font-size: 36px;
  }
}
</style>
