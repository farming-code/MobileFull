<template>
  <div class="mode-box">
    <div class="far" >
      <!-- 外面的边框 -->
      <div class="content-far">
        <!-- 内部的div -->
        <div class="content-intranet">
          <!-- 投产日提前移行无 -->
          <div class="productionBefore">
            <bar :msgobj="progressObj.TQYX"/>
            <div class="arrow-right production-arrow" />
          </div>
          <!-- 上面大盒子 -->
          <div class="top-box">
            <!-- 上面的应用补账 -->
            <div class="app-payment">
              <div class="payment">
                <bar :msgobj="progressObj.XHHB"/>
                <div class="arrow-right payment-arrow" />
              </div>
            </div>
          </div>

          <!-- 下面的大盒子 -->
          <div class="down-line-box">
            <!-- 左边移行相关的表 -->
            <div class="left-down-line">
              <!-- 移行相关的表 -->
              <div class="shift-related-tables">
                <!-- 移行相关大表 -->
                <div class="transfer-related-tables">
                  <bar :msgobj="progressObj.YXXG_L" />
                  <div class="arrow-right transfer-related-arrow" />
                </div>
                <!-- 移行相关小表 -->
                <div class="shift-related-tabular">
                  <bar :msgobj="progressObj.YXXG_S"/>
                  <div class="arrow-right shift-related-arrow" />
                </div>
                <!-- 移行无关大表 -->
                <div class="large-related-tabular">
                  <bar :msgobj="progressObj.YXWG_L"/>
                  <div class="arrow-right large-related-arrow" />
                </div>
                <!-- bottom的一点箭头 -->
                <div class="left-down-arrow" />
                <!-- 移行相关小表的那条直线 -->
                <div class="shift-related-line" />
              </div>
              <!-- 下面的箭头 -->
              <div class="shift-arrow">
                <div class="double-brackets-arrow">
                  <div class="double-brackets-top" />
                  <div class="double-brackets-bottom">
                    <div class="arrow-right double-bottom-arrow" />
                  </div>
                </div>
              </div>
            </div>
            <!-- 右边补账程序安装, 应用统一移行, 移行程序安装, 联机程序安装 -->
            <div class="right-down-line">
              <div class="top-supplement-account">
                <!-- 补账程序安装 -->
                <div class="payment-procedure">
                  <bar :msgobj="progressObj.HBCX"/>
                </div>
                <!-- 应用统一移行 -->
                <div class="app-unified-migration">
                  <bar :msgobj="progressObj.TYYX"/>
                </div>
                <!-- 移行程序安装 -->
                <div class="transition-installation">
                  <bar :msgobj="progressObj.YXCX"/>
                  <div class="arrow-right transition-arrow" />
                </div>
                <!-- 系统补账 -->
                <div class="system-payment">
                  <bar :msgobj="progressObj.XTHB"/>
                </div>
                <!-- 应用统一移行上面的箭头 -->
                <div class="payment-bottom-arrow">
                  <div class="arrow-top payment-arrow" />
                </div>
                <!-- 移行程序安装上面的箭头 -->
                <div class="app-unified-arrow">
                  <div class="arrow-top app-arrow" />
                </div>
              </div>
              <div class="bottom-supplement-account">
                <!-- 联机程序安装 -->
                <div class="program-installation">
                  <bar :msgobj="progressObj.ONCX"/>
                  <div class="program-line">
                    <div class="arrow-bottom program-line-arrow" />
                  </div>
                </div>
                <!-- 批量程序安装 -->
                <div class="batch-program-installation">
                  <bar :msgobj="progressObj.BTCX"/>
                  <div class="arrow-right batch-program-arrow" />
                </div>
                <!-- 箭头 -->
                <div class="supplement-account-arrow">
                  <div class="arrow-bottom supplement-account-btarrow" />
                </div>
              </div>
              <!-- 右上角边框 -->
              <div class="right-down-arrow" />
            </div>
          </div>
        </div>
        <!-- CICS安装无 -->
        <div class="cics">
          <bar :msgobj="progressObj.CICS" />
          <div class="arrow-right cics-arrow" />
        </div>
        <!-- 下联机 -->
        <div class="next-online">下联机</div>
        <!-- 启联机-->
        <div
          ref="open_cson"
          class="open-online">
          <span>启联机
            <i
              ref="cson_open_online" />
          </span>
          <div class="arrow-bottom online-bottom" />
          <div class="arrow-top online-top" />
        </div>
        <!-- 应用系统交互 -->
        <div class="network-management">
          <bar :msgobj="progressObj.JHXG"/>
          <div class="arrow-right network-arrow" />
        </div>

        <!-- 启联机与对外服务连接的线 -->
        <div class="content-docking">
          <div class="arrow-right" />
        </div>
      </div>

      <!-- 最下面的盒子 -->
      <!-- MDSP应用投产 -->
      <div class="MDSP">
        <div
          ref="commission"
          class="MDSP-appliction-commission">
          <bar :msgobj="progressObj.MDSP"/>
        </div>
        <div class="arrow-right MDSP-appliction-arrow" />
        <!-- 对外服务 -->
        <div
          ref="online_external"
          class="external-services">
          <span>
            对外服务
            <i ref="external_online" />
          </span>
        </div>
        <!-- 网关升级进度 -->
        <div class="gateway_upgrade">
          <div
            ref="gateway"
            class="network_bar">
            <bar :msgobj="progressObj.GATE"/>
          </div>

          <div class="arrow-right gateway-arrow" />
        </div>
      </div>
      <!-- date 最下面的日期 -->
    </div>
    <div class="updateTime">
      <div> {{ version }}</div>
      数据更新时间: <span>{{ update }}</span>
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
        CICS: { //CICS安装
          cndesc: 'CICS安装'
        },
        TQYX: { //投产日提前移行
          cndesc: '投产日提前移行'
        },
        YXXG_L: { //移行相关大表
          cndesc: '移行相关大表'
        },
        YXXG_S: { //移行相关小表
          cndesc: '移行相关小表'
        },
        YXWG_L: { //移行无关大表
          cndesc: '移行无关大表'
        },
        JHXG: { //应用系统交互
          cndesc: '应用系统交互'
        },
        HBCX: { //补账程序安装
          cndesc: '补账程序安装'
        },
        TYYX: { //应用统一移行
          cndesc: '应用统一移行'
        },
        YXCX: { //移行程序安装
          cndesc: '移行程序安装'
        },
        ONCX: { //联机程序安装
          cndesc: '联机程序安装'
        },
        BTCX: { //批量程序安装
          cndesc: '批量程序安装'
        },
        XHHB: { //应用补账
          cndesc: '应用补账'
        },
        XTHB: { //系统补账
          cndesc: '系统补账'
        },
        GATE: { //网关升级进度
          color:'#9f67d5',
          cndesc: '网关升级进度',
          isFlag: true
        },
        MDSP: { //应用投产
          color:'#9f67d5',
          cndesc: '应用投产',
          isFlag: true
        }
      },
      update:'',
      version:'',
      timeId:''
    };
  },
  mounted() {

    // 判断是否是长机型
    if(this.isIphoneX()) {
      this.$refs.gateway.style.bottom='-100%';
      this.$refs.commission.style.bottom='-9%';
    }else {
      this.$refs.commission.style.bottom='-12%';
    }

    this.getProducts();

    this.timeId = setInterval(() => {
      this.getProducts();
    }, 60000);
  },
  beforeDestroy() {

    clearInterval(this.timeId);

    this.timeId = null;
  },
  methods: {
    getProducts() {
      this.$http.get(`${this.$path.node}/nobile/yps/integration`)
        .then(data => {

          let menus = data.data;
          let cson = menus.CSON;
          let dwfw = menus.DWFW	;

          this.progressObj.CICS = {...this.progressObj.CICS,value:menus.CICS};
          this.progressObj.TQYX = {...this.progressObj.TQYX,value:menus.TQYX};
          this.progressObj.YXXG_L = {...this.progressObj.YXXG_L,value:menus.YXXG_L};
          this.progressObj.YXXG_S = {...this.progressObj.YXXG_S,value:menus.YXXG_S};
          this.progressObj.YXWG_L = {...this.progressObj.YXWG_L,value:menus.YXWG_L};
          this.progressObj.JHXG = {...this.progressObj.JHXG,value:menus.JHXG};
          this.progressObj.HBCX = {...this.progressObj.HBCX,value:menus.HBCX};
          this.progressObj.TYYX = {...this.progressObj.TYYX,value:menus.TYYX};
          this.progressObj.YXCX = {...this.progressObj.YXCX,value:menus.YXCX};
          this.progressObj.ONCX = {...this.progressObj.ONCX,value:menus.ONCX};
          this.progressObj.BTCX = {...this.progressObj.BTCX,value:menus.BTCX};
          this.progressObj.XHHB = {...this.progressObj.XHHB,value:menus.XHHB};
          this.progressObj.XTHB = {...this.progressObj.XTHB,value:menus.XTHB};
          this.progressObj.GATE = {...this.progressObj.GATE,value:menus.GATE};
          this.progressObj.MDSP = {...this.progressObj.MDSP,value:menus.MDSP};
          this.update = menus.date;
          this.version = menus.versionno;

          // 判断启联机的状态是多少
          if ( cson > 0 && cson < 100 ) {
            this.$refs.cson_open_online.style.backgroundColor= 'transparent';
            this.$refs.cson_open_online.classList.add('twinkle');
            this.$refs.open_cson.style.backgroundColor= '#586AD8';
          }else if( cson === 100 ) {
            this.$refs.cson_open_online.style.backgroundColor= '#4eff4e';
            this.$refs.cson_open_online.classList.remove('twinkle');
            this.$refs.open_cson.style.backgroundColor= '#586AD8';
          }else if( cson === 0 ) {
            this.$refs.cson_open_online.style.backgroundColor= '#ff5c5b';
            this.$refs.cson_open_online.classList.remove('twinkle');
            this.$refs.open_cson.style.backgroundColor= '#586AD8';
          }else if(cson === 999) {
            this.$refs.open_cson.style.backgroundColor= '#808080';
          }else {
            throw new Error('参数没有或不是0-100的数字');
          }

          // 判断对外服务的状态是多少
          if ( dwfw > 0 && dwfw < 100 ) {
            this.$refs.external_online.style.backgroundColor= 'transparent';
            this.$refs.external_online.classList.add('twinkle');
            this.$refs.online_external.style.backgroundColor= '#586AD8';
          }else if( dwfw === 100 ){
            this.$refs.external_online.style.backgroundColor= '#4eff4e';
            this.$refs.external_online.classList.remove('twinkle');
            this.$refs.online_external.style.backgroundColor= '#586AD8';
          }else if( dwfw === 0 ) {
            this.$refs.external_online.style.backgroundColor= '#ff5c5b';
            this.$refs.external_online.classList.remove('twinkle');
            this.$refs.online_external.style.backgroundColor= '#586AD8';
          }else if(dwfw === 999) {
            this.$refs.online_external.style.backgroundColor= '#808080';
          }else {
            throw new Error('参数没有或不是0-100的数字');
          }
        })
        .catch(err => {
          throw err;
        });
    },

    isIphoneX() {
      var isIPhoneX = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 375 && window.screen.height === 812;
      // iPhone XS Max
      var isIPhoneXSMax = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 414 && window.screen.height === 896;
      // iPhone XR
      var isIPhoneXR = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 2 && window.screen.width === 414 && window.screen.height === 896;

      // 判断, 如果是这三款手机的任意一款, 修改样式
      if(isIPhoneX ||isIPhoneXSMax || isIPhoneXR) {
        return true;
      }else {
        return false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
// 上箭头
.arrow-top {
  width: 0;
  height: 0;
  border-right-width: 8px;
  border-left-width: 8px;
  border-bottom-width: 20px;
  border-style: solid;
  border-color: transparent transparent #586AD8  transparent;
  border-radius:4px;
}

// 下
.arrow-bottom {
  width: 0;
  height: 0;
  border-top-width: 20px;
  border-right-width: 8px;
  border-left-width: 8px;
  border-style: solid;
  border-color:#586AD8 transparent transparent transparent;
  border-radius:4px;
}

// 左
.arrow-left {
  width: 0;
  height: 0;
  border-right-width: 20px;
  border-top-width: 8px;
  border-bottom-width: 8px;
  border-style: solid;
  border-color:transparent #586AD8 transparent transparent;
  border-radius:4px;
}

// 右
.arrow-right {
  width: 0;
  height: 0;
  border-left-width: 20px;
  border-top-width: 8px;
  border-bottom-width: 8px;
  border-style: solid;
  border-color: transparent transparent transparent #586AD8;
  border-radius:4px;
}
.mode-box {
  width: 100%;
  height: 100%;
}
.far {
  width: 100%;
  height: 100%;
  padding: 100px 130px 200px 40px;
  position: relative;
  // background: url('../../assets/images/itdemo.png') 0 0 no-repeat;
  // background-size: contain;
  // 中间的内容
  .content-far {
    width: 100%;
    height: 80%;
    border: 4px dashed #586AD8;
    border-radius: 30px;
    position: relative;
    // 内部的content
    .content-intranet {
      width: 100%;
      height: 90%;
      position: absolute;
      top: 56%;
      transform: translateY(-50%);
      border-top: 4px dashed #586AD8;
      border-radius: 30px;
      // 投产日提前移行无
      .productionBefore {
        position: absolute;
        left: 40px;
        top: -20px;
        .production-arrow {
          position: absolute;
          top: 11px;
          left: -18px;
        }
      }
      // 应用系统交互
      .system_visible {
        position: absolute;
        left: 40px;
        bottom: -76px;
      }
      // 上面的大盒子
      .top-box {
        position:relative;
        width: 100%;
        height:30%;
        .app-payment {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 46%;
          height: 50%;
          border-top: 4px dashed #586AD8;
          border-left: 4px dashed #586AD8;
          border-radius: 16px;
          .payment {
            position:absolute;
            left: 36%;
            top: -18%;
            .payment-arrow {
              position:absolute;
              left: -16px;
              top: 11px;
            }
          }
        }
      }
      // 下面的大盒子
      .down-line-box {
        width: 100%;
        height: 70%;
        .left-down-line {
          width: 38%;
          height: 100%;
          float: left;
          position: relative;
          .shift-related-tables {
            height:54%;
            position: relative;
            border-top: 4px dashed #586AD8;
            // border-bottom: 4px dashed #586AD8;
            position:relative;
            border-radius: 20px 0  0 20px;
            .transfer-related-tables {
              position:absolute;
              top: -8%;
              left: 14%;
              .transfer-related-arrow {
                position: absolute;
                left: -16px;
                top: 12px;
              }
            }
            .shift-related-tabular {
              position: absolute;
              top: 54%;
              left: 14%;
              transform: translateY(-36%);
              .shift-related-arrow {
                position:absolute;
                left: -10px;
                top: 12px;
              }
            }
            .large-related-tabular {
              position: absolute;
              bottom: -70px;
              left: 14%;
              .large-related-arrow {
                position: absolute;
                left: -16px;
                top: 12px;
              }
            }
            .shift-related-line {
              position: absolute;
              bottom:30%;
              width: 100%;
              height: 20%;
              z-index:-1;
              border-top: 4px dashed #586AD8;
              border-radius: 0 20px 0 0;
            }
          }
          .shift-arrow {
            width:100%;
            height: 46%;
            position:relative;

            .double-brackets-arrow {
              position: absolute;
              bottom: 10px;
              width: 100%;
              height: 74%;
            }
            .double-brackets-top {
              position: absolute;
              top: 0;
              right: 0;
              width: 50%;
              height: 30%;
              border-left: 4px dashed #586AD8;
              border-radius: 0 0 0 20px ;
            }
            .double-brackets-bottom {
              position: absolute;
              bottom: 0;
              right: 0;
              width: 50%;
              height: 70%;
              border-left: 4px dashed #586AD8;
              border-top: 4px dashed #586AD8;
              border-radius: 20px 0 0 0;
              .double-bottom-arrow {
                position:absolute;
                right:-4px;
                top:-10px;
              }
            }

          }

          .left-down-arrow {
            position:absolute;
            bottom: -6px;
            left: 0;
            width: 40%;
            height: 20%;
            z-index: -1;
            border-bottom: 4px dashed #586AD8;
          }

        }
        .right-down-line {
          height: 100%;
          width: 60%;
          float: right;
          position: relative;
          // 上面
          .top-supplement-account {
            position: relative;
            left: -2%;
            height: 54%;
            z-index: 999;
            border-left: 4px dashed #586AD8;
            border-radius: 0 0 0 20px;
            // 补账应用
            .payment-procedure {
              position: absolute;
              left: 4%;
              top:-6%;
            }
            // 应用统一移行
            .app-unified-migration {
              position:absolute;
              left: 4%;
              top: 55%;
              transform: translateY(-36%)
            }
            // 移行程序安装
            .transition-installation {
              position: absolute;
              left: 4%;
              bottom: -70px;
              .transition-arrow {
                position: absolute;
                left: -14px;
                top: 10px;
              }
            }
            // 系统补账
            .system-payment {
              position:absolute;
              top: -6%;
              right: -11px;
            }
            // 补账程序箭头
            .payment-bottom-arrow {
              position: absolute;
              left: 10px;
              top: 60px;
              width: 23%;
              height: 25%;
              border-right: 4px dashed #586AD8;
              .payment-arrow {
                position: absolute;
                right: -10px;
                top: -10px;
              }
            }
            // 移行程序
            .app-unified-arrow {
              position: absolute;
              left: 10px;
              bottom: 8px;
              width: 23%;
              height: 25%;
              border-right: 4px dashed #586AD8;
              .app-arrow {
                position: absolute;
                right: -10px;
                top: -10px;
              }
            }
          }
          // 下面
          .bottom-supplement-account {
            height: 46%;
            position:relative;
            // 联机程序安装
            .program-installation {
              position: absolute;
              top: 36%;
              left: 0;

              .program-line {
                position:absolute;
                top: -20px;
                width: 50%;
                height: 40%;
                border-right: 4px dashed #586AD8;
                .program-line-arrow {
                  position: absolute;
                  bottom: 6px;
                  right: -10px;
                  z-index: -1;
                }
              }
            }
            // 批量程序安装
            .batch-program-installation {
              position: absolute;
              top:36%;
              left:50%;
              .batch-program-arrow {
                position: absolute;
                top: 10px;
                left: -6px;
              }
            }
            // 箭头
            .supplement-account-arrow {
              width: 25%;
              height: 36%;
              position:absolute;
              top: 0;
              left: 50%;
              border-top: 4px dashed #586AD8;
              border-right: 4px dashed #586AD8;
              border-radius: 0 20px 0 0;
              .supplement-account-btarrow {
                position:absolute;
                right: -10px;
                bottom: -8px;
              }
            }

          }
          .right-down-arrow {
            position: absolute;
            top: 0;
            right: 0;
            width: 50%;
            height: 20%;
            border-top: 4px dashed #586AD8;
            border-radius: 0 20px 0 0;
          }
        }
      }
    }
    // cics安装
    .cics {
      position: absolute;
      left: 40px;
      top: -22px;
      .cics-arrow {
        position: absolute;
        top: 11px;
        left: -18px;
      }
    }
     // 网管升级进度
    .network-management {
      position: absolute;
      left: 40px;
      bottom: -65px;
      .network-arrow {
        position: absolute;
        left: -18px;
        top: 16px;
      }
    }
    // 下联机
    .next-online {
      position: absolute;
      left: -46px;
      top: 56%;
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
      top: 56%;
      right: 1px;
      transform: translateY(-50%);
      writing-mode: tb-rl;
      -webkit-writing-mode: tb-rl;
      padding: 10px 8px;
      font-size: 24px;
      border: 4px solid #F5F5F5;
      border-radius: 10px;
      color: #fff;
      background-color: #586AD8;
      span {
        i {
          display: inline-block;
          margin-top:16px;
          width: 16px;
          height: 16px;
          border-radius: 10px;
          // background-color: #ff5c5b;
        }
      }
      .online-bottom {
        position: absolute;
        top:-24px;
        right: 10px;
        z-index: 1000;

      }
      .online-top {
        position: absolute;
        bottom: -24px;
        right: 10px;
        z-index: 10;
      }
    }
    .content-docking {
      position:absolute;
      right: -50px;
      bottom: 34%;
      width: 5%;
      height: 10%;
      border-top: 4px dashed #586AD8;
      .arrow-right {
        position:absolute;
        right:-8px;
        top: -10px;
        z-index:-1;
      }
    }
  }
  .MDSP {
    position: absolute;
    height: 46%;
    width: 88%;
    bottom: 12%;
    border-bottom: 4px dashed #9f67d5;
    border-right: 4px dashed #9f67d5;
    border-left: 4px dashed #586AD8;
    border-radius: 20px;
    z-index: -1;
    .MDSP-appliction-commission {
      position:absolute;
      bottom: -6%;
      left: 6%;
    }

   .MDSP-appliction-arrow {
      position: absolute;
      bottom: -10px;
      left: 18px;
    }
    // 对外服务
    .external-services {
      position: absolute;
      top: .5%;
      right: 1px;
      transform: translateY(-50%);
      writing-mode: tb-rl;
      -webkit-writing-mode: tb-rl;
      padding: 10px 8px;
      font-size: 24px;
      border: 4px solid #F5F5F5;
      border-radius: 10px;
      color: #fff;
      background-color: #5dadf6;
      // &::before,
      &::after {
        content: '';
        position: absolute;
        right: 10px;
        bottom: -24px;
        width: 0;
        height: 0;
        border-right-width: 8px;
        border-left-width: 8px;
        border-bottom-width: 20px;
        border-style: solid;
        border-color: transparent transparent #586AD8  transparent;
        border-radius:4px;
      }
      span {
        i {
          display: inline-block;
          margin-top:16px;
          width: 16px;
          height: 16px;
          border-radius: 10px;
          // background-color: #ff5c5b;
        }
      }
    }
    // 网关升级进度
    .gateway_upgrade {
      position: absolute;
      width: 100%;
      height: 10%;
      border-bottom: 4px dashed #9f67d5;
      border-radius: 20px;
      bottom: 18%;
      .network_bar {
        position: absolute;
        left: 6%;
        bottom: -120%;
      }
      .gateway-arrow {
        position:absolute;
        bottom: -10px;
        left: 20px;
      }
    }
  }
}

.updateTime {
  position:fixed;
  bottom: 50px;
  width: 100%;
  text-align: center;
  font-size: 26px;
  color:#596cd1;
  div {
    margin-bottom: 16px;
  }
}

.twinkle {
  width: 10px;
  height: 10px;
  border-radius:10px;
  -webkit-animation: circleTwinkle 1s infinite ease-in-out;
  animation: circleTwinkle 1s infinite ease-in-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes circleTwinkle {
  0% {
    opacity: 0.5;
    filter: alpha(opacity=20);
    /*-webkit-transform: scale(0.8);*/
  }

  50% {
    opacity: 1;
    filter: alpha(opacity=50);
    /*-webkit-transform: scale(1.12);*/
    background-color: #fd1c1b;
    color: #fff;
  }

  100% {
    opacity: 0.5;
    filter: alpha(opacity=20);
    /*-webkit-transform: scale(0.8);*/
  }
}

@keyframes circleTwinkle {
  0% {
    opacity: 0.5;
    filter: alpha(opacity=20);
    /*-webkit-transform: scale(0.8);*/
  }

  50% {
    opacity: 1;
    filter: alpha(opacity=50);
    /*-webkit-transform: scale(1.12);*/
    background-color: #fd1c1b;
    color: #fff;
  }

  100% {
    opacity: 0.5;
    filter: alpha(opacity=20);
    /*-webkit-transform: scale(0.8);*/
  }
}

@media screen and (min-width:640px){

}
</style>
