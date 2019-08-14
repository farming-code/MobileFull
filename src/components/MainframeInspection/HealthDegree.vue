<template>
  <div class="all">
    <!-- 这是头部区域 -->
    <child class="health_top"/>
    <!-- 中间的横幅区域 -->
    <div class="nav_bar">
      <h2>主机健康状态</h2>
      <!-- 嘉定或外高桥 -->
      <ul>
        <li
          :class="isActive === true ? 'current' : ''"
          @click="checkActive('jd')"
        >
          <a href="javascript:;">嘉定</a>
        </li>
        <li
          :class="isActive === false ? 'current' : '' "
          @click="checkActive('wgq')"
        >
          <a href="javascript:;">外高桥</a>
        </li>
      </ul>
    </div>
    <!-- echarts的父容器 -->
    <div class="echarts_far">
      <div
        id="main"
        class="main"
        style="width:100%;
          height:100%;"/>
      <ul>
        <li>健康</li>
        <li>关注</li>
        <li>严重</li>
      </ul>
    </div>
    <!-- 中间的色块 -->
    <div class="purple "/>
    <!-- 总体情况 -->
    <div class="situation">
      <div class="clearfix sit_far">
        <h1 class="fl">总体情况</h1>
        <div class="fr sit_time">{{ sitTime }}</div>
      </div>
      <div class="mui-scroll-wrapper">
        <div class="mui-scroll">
          <!--这里放置真实显示的DOM内容-->
          <ul>
            <li
              v-for="(item,i) in items"
              :key="i">
              <p>{{ item.name }}</p>
              <div class="text">{{ item.status_information }}</div>
              <span :class=" item.status === 0 ? 'bg_green' : item.status === 1 ? 'bg_yellow' : 'bg_red' "/>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入公共的样式
import '../../assets/css/index.css';
import GoHome from '@/components/Common/GoHome';
export default {
  components: {
    child: GoHome
  },
  data() {
    return {
      // 是否选中
      isActive: true,
      alarms: [], //异常状态
      categories: [], //时间
      items: [], //总体情况
      site: '',
      values: [], //值
      flag: false,
      timeTable: [], //存放时间和值的对应关系
      sitTime: '',
      timeId: '', //timeID
      isClick: false, // 判断是否click过
      mainSite: '',
      // 警告的图片
      warning:
        'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAADt0lEQVRIia2Xz2sTWxTHP3cyk5lpmrQhisG2UpouXlEES8GFguBKF1Jw4UJo375CH0qf+GunuHChuBBcv7d+a7e+v+LhQkSriCiapMS0SWbuW8y96Z3JJJk83oXD/Do/vud7zz33jlhdecQEQ2TUk1kd2hMGF4l7/SwNmQhEVgBmQMsQE0BoSGYQkzKQU2L/sfL2woJ38CfA7r67sflP7W+gBwRKMjFgZQysM7eB/MlCuzTvHrwQMCtgdt49eHGy0C4BeaVjEZ+i/wwgGdwBvAeLH7cswYm+E8GJB4sftwBP6WQGkZWBnHLqXjnyY+6Y091OKh1zutvrR37MA67SzY0LPg6AmX2OiF7v1+rX3y3BNEJgr61hnzkTORJMb1S/7hCxkFc2Y1nIMgUWEa35rbkvpypO7xqAKBbxb97E39kBxwGg4vSubc19OaUAOMRXykQAUuf+UqV+Vygb2WpFmp0OdLvayLpUqd9lgloYxYCm3gHcx0u7F0u54Hz/axAg9/YI6/WYUSkXnH+8tHuRqBYcDqdiaJBx2edn7KCwWmzdSSrKZhPZbA44WC227szYQYEMy3IYslj2T2ofrntWuDwAoF5HJhgA8Kxw+Untw3UysJB8abZaG8ivFVuVmr8/sOxAMdBopGZQ8/e314qtCnEWBorSBGD2e1147q2FzzdsIctpQcJGYygAW8jyrYXPNzhkwU7EGACgQfSbzkb121LV7WymRgBko0E4BABA1e1sblS/LTGiOWkAA4UHuFePfr9tRfepo/PqFd3Xr4cCsCB/9ej32wpAakEmp0Bnn7+/+Ols2e5dHuodIAxBjt70ynbv8v3FT2cNADEWTDT9lusI6Z+b2bs3yrHwPKafP2f62TOE644EcW5m754jpE9KizanQGfvPF1+vz5lhadHevU8xOwsolwG3x+pOmWFp58uv1/nsBj7LOgDicmA80uh/dtIj0Q94OfDhxCGqb0gOZTPv4gzEAPQ7wG2kMfHegSCN2+yqAGgfJq9oF+EAwfNd233pYyOVf/LkBC8a7svGewDQqyuPDL3ex8oACUlBWCK+BLKMkKi82EH+Am0gKaSFtBW3wKbw8OjJMq6CxwoQ6medfFAopGkJwwKgPbVVtcu8QOrtA2jIIE6VEbmvj7J0Cx0lc99ddUnZ4mRlTQM9HOP+E6W6ZRr2GufmlUNpKfeDwWgjXtEDOjK1SPrFED8Z0UzHCQBJA00GL0szVUyyTBrK0xc+2KnKGsgZsBJgydB6PuBf8d/AaFsJSYlo3ksAAAAAElFTkSuQmCC'
    };
  },
  created() {},
  mounted() {
    this.getAllList();
    this.timeId = setInterval(() => {
      this.getAllList();
    }, 60000);
  },
  beforeDestroy(){
    clearInterval(this.timeId);
    this.timeId = null;
  },
  methods: {
    /**
      当传入的str 是jd 并且this.isActive为 false
      当传入的str 是wgq 并且this.isActive为 true
     */
    checkActive(str) {
      if (str === 'jd' && this.isActive === false) {
        this.isClick = true;
        this.getAllList(str);
        this.isActive = !this.isActive;
      }
      if (str === 'wgq' && this.isActive === true) {
        this.isClick = true;
        this.getAllList(str);
        this.isActive = !this.isActive;
      }
    },
    /**
     * 参数一 : echars的DOM
     * 参数二 : echarts父元素DOM
     */
    resizeWorldMapContainer(self, farther) {
      self.style.width = farther.innerWidth + 'px';
      self.style.height = farther.innerHeight + 'px';
    },
    // 获取数据
    getAllList(name) {
      // 判断是否点击过, 点击过的话走已经有的数据
      if (this.isClick) {
        if (!name) {
          if (this.isActive) {
            name = 'jd';
          } else {
            name = 'wgq';
          }
        }
      } else {
        if (!name) {
          name = 'jd';
        }
      }

      this.$http
        .get(`${this.$path.node}/mobile/yps/load_health_values?site=${name}`)
        .then(data => {
          this.alarms = data.data.trends.alarms;
          this.categories = data.data.trends.categories;
          this.items = data.data.trends.items;
          this.site = data.data.trends.site;
          this.timeTable = this.timeValue(
            data.data.trends.categories,
            data.data.trends.values
          );
          this.values = this.information(data.data.trends.values); //重新整理值
          this.values = this.errorMessage(this.values);
          this.sitTime = data.data.trends.timePinch || '2018-11-05 09:47:00'; // 总体情况旁边的时间撮
          this.mainSite = data.data.trends.site || 'jd'; //主站点
          if (this.site === 'jd') {
            this.isActive = true;
          } else {
            this.isActive = false;
          }
          localStorage.setItem('mainSite', this.mainSite);
          this.operation(); //dom操作
        })
        .catch(err => {
          throw err;
        });
    },
    operation() {
      // 初始化区域滚动插件
      this.mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });
      // 初始化echarts
      const chart_img = document.getElementById('main');
      // 基于准备好的dom，初始化echarts实例
      if (chart_img) {
        this.resizeWorldMapContainer(chart_img, chart_img);
        const myChart = this.echarts.init(chart_img);
        // 绘制图表
        myChart.setOption({
          // 提示框组件
          tooltip: {
            // 触发类型
            trigger: 'axis',
            // 提示框浮层的移动动画过渡时间 (单位 s)
            transitionDuration: 0.4,
            axisPointer: {
              type: 'line'
            },
            // 提示框的背景颜色
            backgroundColor: 'rgba(255,255,255,1)',
            // 提示框背景圆角
            borderRadius: 6,
            margin: 20,
            // 背景内的padding值
            padding: 8,
            // 提示框内容格式化
            // formatter: '{a}的主机健康值为: {c}</br>PLEXPP2:TWS中有系统相关作业异常中断',
            formatter: function(params) {
              let res = '健康度为' + params[0].value + '<br /><br />';
              if (params[0].name) {
                params[0].name.forEach(item => {
                  if (item.msg.length >= 90) {
                    res += item.msg.substr(0, 30) + '<br />';
                    res += item.msg.substr(30, 30) + '<br />';
                    res += item.msg.substr(60, 30) + '<br />';
                    res += item.msg.substr(90, 30) + '<br />' + '<br />';
                  } else if (item.msg.length >= 60) {
                    res += item.msg.substr(0, 30) + '<br />';
                    res += item.msg.substr(30, 30) + '<br />';
                    res += item.msg.substr(60, 30) + '<br />' + '<br />';
                  } else if (item.msg.length >= 30) {
                    res += item.msg.substr(0, 30) + '<br />';
                    res += item.msg.substr(30, 30) + '<br />' + '<br />';
                  } else {
                    res += item.msg + '<br />' + '<br />';
                  }
                });
              } else {
                res = '无';
              }
              return res;
            },
            // 提示框内容样式
            textStyle: {
              fontSize: 8,
              color: '#5C5C5C'
            },
            // 提示框的位置
            position: function(pos, params, dom, rect, size) {
              // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
              var obj = { top: 60 };
              obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
              return obj;
            }
          },
          // 横轴配置
          xAxis: {
            show: true,
            // 类型
            type: 'category',
            // 坐标轴两边留白策略
            boundaryGap: false,
            // 坐标轴刻度相关设置
            axisTick: {
              // 是否显示坐标轴刻度
              show: true,
              // 坐标轴刻度显示间隔(0表示强制显示所有标签,1表示隔一个标签显示一个标签)
              interval: 0
            },
            // 坐标轴轴线相关设置
            axisLine: {
              show: false,
              // 坐标轴线样式设置
              lineStyle: {
                // 样式类型
                type: 'solid',
                // 坐标轴轴线的颜色
                color: 'rgba(255,255,255,.8)',
                // 线宽
                width: 1
              }
            },
            // 坐标轴刻度标签的相关设置
            axisLabel: {
              // 显示左边内容
              show: true,
              // 文字样式设置
              textStyle: {
                fontSize: 10,
                // 坐标轴刻度颜色
                color: '#fff'
              }
            },
            //类目数据
            data: this.categories
          },
          // 直角坐标系内的绘图网格
          grid: {
            top: '10%',
            bottom: '5%',
            left: '3%',
            right: '5%',
            // grid区域是否包含坐标轴的刻度标签
            containLabel: true
          },
          // y轴配置
          yAxis: {
            // 类型
            type: 'value',
            // 最小值
            min: 0,
            // 最大值
            max: 100,
            // 坐标轴线相关设置
            axisLine: {
              show: false,
              // 线的样式
              lineStyle: {
                type: 'solid',
                color: 'rgba(255,255,255,.5)',
                // 坐标轴轴线宽
                width: 2
              }
            },
            // 坐标轴刻度标签的相关设置
            axisLabel: {
              show: true,
              margin: 16,
              textStyle: {
                fontSize: 10,
                color: '#fff'
              }
            },
            // 坐标轴的分割线
            splitLine: {
              show: true,
              interval: 1,
              lineStyle: {
                type: 'solid',
                color: 'rgba(255,255,255,.5)'
              }
            }
          },
          // 区域缩放
          dataZoom: [
            {
              type: 'inside',
              start: 0,
              end: 100
            }
          ],
          // 存放数据的列表
          series: [
            {
              data: this.values,
              type: 'line',
              showAllSymbol: 'auto',
              // 标记的图形 {string}(可以为内置类型或图片)
              symbol:
                'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiYWJhNmRiMC1kY2Y1LWE3NDItODhmNy0yMDVmYjQyZjQ0NTEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjExNDNGRDhBMUNBMTFFODg4RkZGMEM4QUNCRkNEQ0MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjExNDNGRDdBMUNBMTFFODg4RkZGMEM4QUNCRkNEQ0MiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YTAwYWY4ZmYtN2NiZS1iYjRkLTg2YzYtNjI1NDIzM2QyMjY0IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ZGE3ZjQ3YWItZjRmYS1mZDRhLWJhMTItMzkwN2I3YjM4MDMyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Hl+v4AAAAmtJREFUeNqslk1rE1EUhic3aaQfQmO0hdY0WOPWVlqkCt27aH9BN924E/p/dO8v0LWIooJWyU7UhTT2E2JbmgRt0sT3wDtwudxzZ6bmhYcMmTPnzNxz7rkn92jwMEqhMpgGJTAORvh/F7TBMTgEzSRHhcC9HKiAGoP4dIVcA7cZ/AdogEGWgGNgCUxG2SQvtgCqYBt0XAOjLN/qJYLZmqSPclLAKbACitH/q0hfU1rACS6jCTiRvJyyQIRWQlBDnxNuDqVA7gVy+gd8B7usTDffc2Ae5JU6Ed9v5YXjr6kEcnYAXoGfnmARC+MreA3OAjmt2EtaUwzliz6BHnOyBT5yKVu83uI92RLv+OtTLf7csrLPZBnrzNsseAEWHZtlsgnW+ILbrNCcZ8uUDTuIT9/ABTf2S08wW4u0KbKo9hS7acN25apvPfSYmzlJC7SN2Gl8KhllOU+sAtnIsPdi299Kaxs3ViN282e/eVrFthcsNFcj2ibPD6HT5LVO0FWad6x6hiB16xTxfUzXKPvmKhjl9fMMAWPb68r9tuHh6VOVv0/B5xTBxOaZ86yrY8Mm7NM8K/gvWAdfEoKt03bWdyxRh4ZjQVtJ+n1u5j0eNU/Ae/bMM17Lfw9oUwpUtcRo5jjTzAUMO+ynpwlLehPcDVS4FNROweoMVeXEGGNv3JcHmPOedcjeALeUjmU3koZ9Hg6Yo1XlTJRGPEMiK2AhRTH16Hvgnvgtdvp+CieFlMH69NnSZpoj8AGcD6HTnNPXUdLUJlX7hut+WZ3QRzPtXNrhDCKVdycwCPtKX2afX1kH4biQGmRoo/4/AQYA6ImS7RTSgHkAAAAASUVORK5CYII=',
              // 图标的大小
              symbolSize: 14,
              // 标记相对于原本位置的偏移
              symbolOffset: [0, 0],
              // 是否显示symbol,如果false,只有在tooltip.hover的时候显示
              showSymbol: false,
              // 是否启用图例hover时的联动高亮
              legendHoverLink: true,
              // 是否启用hover在拐点标志上提示的动画效果
              hoverAnimation: true,
              // 折线图样式
              lineStyle: {
                color: '#fff',
                width: 2.5,
                shadowBlur: 10,
                shadowColor: 'rgba(0,0,0,.35)',
                shadowOffsetX: 4,
                shadowOffsetY: 4
              }
            }
          ]
        });
        window.onresize = () => {
          this.resizeWorldMapContainer(chart_img, chart_img);
          if (myChart) {
            myChart.resize();
          }
        };
      }
    },
    // 获取时间和值的一一对应关系
    timeValue(categories, items) {
      let arr = [];
      categories.forEach((item, m) => {
        items.forEach((data, n) => {
          if (m === n) {
            arr.push({ time: item, value: data });
          }
        });
      });
      return arr;
    },
    // 整理返回的数据 values
    information(data) {
      let result = data.map(item => {
        if (item < 80) {
          return {
            value: item - 0,
            symbolOffset: ['0', '100%'],
            symbol: this.warning
          };
        } else {
          return {
            value: item - 0
          };
        }
      });
      //把数据表中的时间push进去
      result.map((item, m) => {
        this.timeTable.forEach((data, n) => {
          if (m === n && item.value == data.value) {
            item.time = data.time;
          }
        });
      });
      return result;
    },
    // 整理错误信息
    errorMessage(values) {
      values.map(data => {
        let result = this.alarms.filter(item => {
          return item.time === data.time;
        });
        if (result[0]) {
          data.name = result[0].body;
        } else {
          data.name = [];
        }
      });
      return values;
    }
  }
};
</script>

<style lang="less" scoped>
.bg_green {
  background-color: #4cf33a;
}

.bg_yellow {
  background: rgb(248, 218, 46);
}

.bg_red {
  background-color: #f33a3a;
}

.all {
  height: 100%;
  overflow: hidden;
}

.health_top {
  background-image: linear-gradient(to right ,#8CB9F7 ,#8CB9F7);
}

.nav_bar {
  position: relative;
  height: 70px;
  padding: 10px;
  background-color: #8cb9f7;

  h2 {
    height: 100%;
    padding-left: 20px;
    font-size: 40px;
    line-height: 24px;
    color: #fff;
  }

  ul {
    position: absolute;
    top: 6px;
    right: 0;
    margin-right: 50px;

    li {
      float: left;
      padding: 18px 22px;
      border-radius: 100px;
      transition: all .5s;

      a {
        font-size: 28px;
        color: #fff;
      }
    }

    li.current {
      background-color: #fff;

      a {
        color: #5c76e3;
      }
    }
  }
}

.main {
  width: 100%;
  height: 300px;
  background-image: linear-gradient(180deg, #8cb9f7 0%, #7396e3 26%, #7171e5 26%, #6b69e0 41%, #6a67b8 41%, #473a95 100%);
}

// 总体情况
.situation {
  position: relative;
  width: 100%;
  height: 60%;
  padding: 0 50px;
  margin-top: -40px;
  border-radius: 40px;
  background-color: #fff;
  touch-action: none;

  .sit_far {
    position: relative;
    z-index: 10;
    border-bottom: 1px solid #e8e8e8;
    background-color: #fff;
  }

  .sit_time {
    padding-top: 54px;
    margin-right: 10px;
    font-weight: 700;
    font-size: 26px;
    color: #434343;
  }

  h1 {
    height: 100px;
    padding-top: 40px;
    font-size: 36px;
    color: #434343;
  }

  .mui-scroll-wrapper {
    padding-bottom: 110px;
  }

  ul {
    position: relative;
    top: 80px;
    padding: 20px 50px 0;
    margin-bottom: 110px;
    overflow: hidden;

    li {
      position: relative;
      height: 80px;
      border-bottom: 1px solid #e8e8e8;
      line-height: 80px;
      color: #434343;

      p {
        font-size: 24px;
        color: #434343;
      }

      .text {
        position: absolute;
        top: 0;
        right: 0;
        float: right;
        padding-right: 40px;
        font-size: 24px;
      }

      span {
        position: absolute;
        top: 32px;
        right: 10px;
        width: 20px;
        height: 20px;
        border-radius: 20px;
      }
    }
  }
}

// ecahrts的父盒子
.echarts_far {
  position: relative;
  width: 100%;
  height: 360px;

  ul {
    position: absolute;
    top: 50px;
    right: 60px;

    li {
      padding: 6px 14px;
      margin-bottom: 22px;
      border-radius: 100px;
      font-size: 12px;
      color: #fff;
      background-color: #2c6df4;
    }

    li:nth-child(2) {
      background-color: #6b4be1;
    }

    li:last-child {
      margin-top: 76px;
      background-color: #5337a5;
    }
  }
}
// 色块
.purple {
  height: 50px;
  background-color: #473a95;
}

</style>
