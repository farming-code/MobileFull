<template>
  <div class="far" >
    <!-- 外面的边框 -->
    <div class="content-far">
      <!-- 内部的div -->
      <div class="content-intranet">
        <!-- 内部的内部的div -->
        <div class="in-content">
          <!-- 应用补账 -->
          <div class="receivables">应用补账</div>
          <!-- 移行相关大表 -->
          <div class="line_correlation_big">移行相关大表</div>
          <!-- 移行相关小表 -->
          <div class="line_correlation_small">移行相关小表</div>
          <!-- 移行无关大表 -->
          <div class="diabasis">移行无关大表</div>
        </div>
        <!-- 投产日提前移行无 -->
        <div class="productionBefore">
          <bar />
        </div>
        <!-- 应用系统交互 -->
        <div class="system_visible">
          <bar />
        </div>
      </div>
      <!-- CICS安装无 -->
      <div class="cics">
        <bar :msgobj="progressObj.CICS" />
      </div>
      <!-- 下联机 -->
      <div class="next-online">下联机</div>
      <!-- 启联机 无-->
      <div class="open-online">启联机 无</div>
      <!-- 网管升级进度 -->
      <div class="network-management">
        <bar />
      </div>
    </div>

  </div>
</template>

<script>
import ProgressBar from '@/components/Common/ProgressBar';
export default {
  components: {
    bar: ProgressBar
  },
  data() {
    return {
      progressObj:{
        CICS: {
          value: 30,
          state: 1,
          cndesc: 'CICS安装无'
        }
      }
    };
  },
  created() {},
  mounted() {},
  methods: {

  }
};
</script>

<style lang="less" scoped>
.far {
  width: 100%;
  height: 100%;
  padding: 100px 70px 200px 70px;
  // background: url('../../assets/images/itdemo.png') 0 0 no-repeat;
  // background-size: contain;
  // 中间的内容
  .content-far {
    width: 100%;
    height: 100%;
    border: 4px solid #586AD8;
    border-radius: 30px;
    position: relative;
    // 内部的content
    .content-intranet {
      width: 100%;
      height: 80%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      border-top: 4px solid #586AD8;
      border-bottom: 4px solid #586AD8;
      border-radius: 30px;
      // 投产日提前移行无
      .productionBefore {
        position: absolute;
        left: 40px;
        top: -20px;
      }
      // 应用系统交互
      .system_visible {
        position: absolute;
        left: 40px;
        bottom: -76px;
      }
      // 里面内部的东西
      .in-content {
        width: 100%;
        height: 80%;
        border-top: 4px solid #586AD8;
        border-bottom: 4px solid #586AD8;
        border-radius: 30px;
        position:absolute;
        top:50%;
        transform: translateY(-50%);
        // 应用补账
        .receivables {
          position: absolute;
        }
        // 移行相关大表
        .line_correlation_big{
          position: absolute;
        }
      }
    }
    // cics安装
    .cics {
      position: absolute;
      left: 40px;
      top: -22px;
    }
     // 网管升级进度
    .network-management {
      position: absolute;
      left: 40px;
      bottom: -77px;
    }
    // 下联机
    .next-online {
      position: absolute;
      left: -46px;
      top: 50%;
      transform: translateY(-50%);
      writing-mode: tb-rl;
      -webkit-writing-mode: tb-rl;
      padding: 10px 8px;
      font-size: 24px;
      border: 4px solid #F5F5F5;
      border-radius: 10px;
      overflow: hidden;
      color: #fff;
      background-color: #586AD8;
    }
    // 启联机
    .open-online {
      position: absolute;
      top: 50%;
      right: 1px;
      transform: translateY(-50%);
      writing-mode: tb-rl;
      -webkit-writing-mode: tb-rl;
      padding: 10px 8px;
      font-size: 24px;
      border: 4px solid #F5F5F5;
      border-radius: 10px;
      overflow: hidden;
      color: #fff;
      background-color: #586AD8;
      // &::before,
      &::after {
        content: '';
        position: absolute;
        right: 9px;
        top: -30px;
        width: 20px;
        height: 20px;
        background-color: yellow;
        // background: url('../../assets/images/arrow.png') center 0 no-repeat;
        // background-size: contain;
      }
    }
  }
}
.demos {
  margin-top: 40px;
  margin-left: 100px;
}
</style>
