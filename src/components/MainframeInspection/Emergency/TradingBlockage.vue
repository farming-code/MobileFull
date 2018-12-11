<template>
  <div class="content">
    <div
      class="top"
      @click="click">
      <img
        src="../../../assets/images/goback@3x.png"
        alt="">
      <span>主站点应急操作</span>
    </div>
    <ul class="mainSite_list">
      <li>A.封闭交易 <span>ET-2-1</span></li>
      <li>B.杀超时交易 <span>ET-2-2</span></li>
      <li>C.杀DB2 Thread <span>ET-2-3</span></li>
      <li>D.隔离批量 <span>ET-1-1</span></li>
      <li>E.停止XRC <span>ET-4-1</span></li>
      <li>F.隔离联机 <span>ET-3-1</span></li>
      <li>G.隔离通道 <span>ET-4-2</span></li>
    </ul>
    <div class="bottom_name">并行站点应急操作</div>
    <ul class="bottom_list">
      <li><span>H.双活状态检查</span><span>KP1A:MT-9</span></li>
      <li><span>I.双活切换准备</span><span>主机同城自动化切换系统-安全切换</span></li>
      <li><span>J.双活切换</span><span>KP1A:应答 OK</span></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  created() {

  },
  methods: {
    click(){
      this.$router.push('/MainframeInspection/Emergency');
    }
  }
};
</script>

<style lang="less" scoped>
  .content {
    padding: 50px;
  }

  .top {
    height: 50px;
    margin-top: 20px;

    img {
      position: relative;
      top: 4px;
      display: inline-block;
      width: 20px;
    }

    span {
      font-weight: 700;
      font-size: 40px;
    }
  }

  .bottom_name {
    margin-top: 40px;
    margin-bottom: 40px;
    font-weight: 700;
    font-size: 40px;
  }

  .mainSite_list {
    padding: 5px 26px;
    margin-top: 20px;
    border-radius: 30px;
    background-color: #fff;

    li {
      position: relative;
      height: 60px;
      border-bottom: 1px solid #ccc;
      font-size: 24px;
      line-height: 60px;

      span {
        position: absolute;
        top: 0;
        right: 20px;
        color: #5579ef;
      }
    }

    li:last-child {
      border: none;
    }
  }

  .bottom_list {
    padding: 5px 26px;
    border-radius: 30px;
    background-color: #fff;

    li {
      position: relative;
      height: 60px;
      font-size: 24px;
      line-height: 60px;

      span:last-child {
        position: absolute;
        top: 0;
        right: 10px;
        color: #5579ef;
      }
    }
  }

</style>
