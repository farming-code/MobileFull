<template>
  <div>
    <!-- 头部区域 -->
    <child class="health_top" />
    <!-- 导航 -->
    <div class="nav clearfix">
      <div class="left">
        <p>{{ month }}</p>
        <p>{{ week }}</p>
      </div>
      <div class="right">{{ timesAll }}</div>
    </div>
    <!-- 中间的内容区域 -->
    <div class="mui-scroll-wrapper">
      <div class="mui-scroll">
        <!--这里放置真实显示的DOM内容-->
        <div
          v-dom
          class="content clearfix">
          <div class="pos">
            <ul/>
          </div>
          <div class="info">
            <ul>
              <li
                v-for="(item,i) in list"
                :key="i">
                <p>
                  {{ item.timestamp }}
                  <span/>
                </p>
                <div>{{ item.content }}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import GoHome from '@/components/Common/GoHome';
export default {
  components: {
    child: GoHome
  },
  directives: {
    dom:{
      componentUpdated(el) {
        let height =  window.getComputedStyle(el).height;
        el.children[0].children[0].style.height = height;

        for(let i = 0 ; i < 100; i++) {
          let li = document.createElement('li');
          li.style.width = '4px';
          li.style.height = '4px';
          li.style.marginBottom = '10px';
          li.style.borderRadius = '10px';
          li.style.backgroundColor = '#AAAAAA';
          el.children[0].children[0].appendChild(li);
        }
      }
    }
  },
  data(){
    return {
      list:[],
      time: '',
      week: '',
      month:'',
      timesAll:'',
      timeId :'' // timeId
    };
  },
  mounted(){
    this.getBroadcasts();
    this.mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    this.timeId = setInterval(()=> {
      this.getBroadcasts();
    },60000);
  },
  methods:{
    getBroadcasts(){
      this.$http.get(`${this.$path.node}/mobile/yps/load_broadcasts`)
        .then(data => {
          this.list =  data.data.broadcasts; //回来的数据

          this.time = new Date();
          this.week = this.getWeek(this.time.getDay()); //周几
          let month = this.time.getMonth() + 1; // 月份
          let hour = this.time.getHours(); // 小时
          let minute = this.time.getMinutes(); //分钟
          let seconds = this.time.getSeconds(); //秒
          hour = hour < 10 ? '0' + hour : hour;
          minute = minute < 10 ? '0' + minute : minute;
          seconds = seconds < 10 ? '0' + seconds : seconds;
          this.month = month < 10 ? '0' + month : month;
          this.timesAll = hour  + ':' + minute + ':' + seconds;
        });
    },
    getWeek(week) {
      if (week === 0) {
        week = 7;
      } else {
        week = week || '';
      }
      switch (week) {
      case 1:
        return 'MON';
      case 2:
        return 'TUE';
      case 3:
        return 'WED';
      case 4:
        return 'THU';
      case 5:
        return 'FRI';
      case 6:
        return 'SAT';
      case 7:
        return 'SUN';
      default:
        return '传入参数有误';
      }
    }
  },

};
</script>

<style lang="less"  scoped>
  .header {
    height: 110px;
  }
  .health_top {
    margin-bottom: 10px;
  }

  .nav {
    box-sizing: border-box;
    height: 114px;
    padding: 0 32px;

    .left {
      float: left;
      width: 114px;
      height: 114px;
      padding-top: 18px;
      border-radius: 14px;
      background-image: linear-gradient(#8198f0, #7486ea);
      box-shadow: 0 5px 40px 0 #8e90f2;

      p {
        height: 38px;
        margin-bottom: 0;
        font-size: 36px;
        line-height: 38px;
        text-align: center;
        color: #fff;
      }
    }

    .right {
      float: left;
      margin-top: 44px;
      margin-left: 36px;
      font-size: 40px;
      color: #434343;
    }
  }

  .mui-scroll-wrapper {
    top: 226px;
    padding-bottom: 110px;
    touch-action: none;
  }

  .content {
    position: relative;
    padding: 0 86px;

    .pos {
      position: absolute;
      top: 0;
      left: 86px;
      overflow: hidden;

      li {
        width: 5px;
        height: 5px;
        margin-bottom: 10px;
        border-radius: 10px;
        background-color: #aaa;
      }
    }

    .info {
      width: 100%;
      padding-top: 60px;
      padding-left: 50px;

      li {
        margin-bottom: 70px;
      }

      p {
        position: relative;
        z-index: 100;
        margin-bottom: 20px;
        font-size: 26px;
        color: #434343;

        span {
          position: absolute;
          top: 0;
          left: -58px;
          width: 20px;
          height: 20px;
          border-radius: 20px;
          background: #e96800;
        }
      }

      div {
        padding: 20px;
        border-radius: 14px;
        font-size: 26px;
        line-height: 34px;
        color: #434343;
        background-color: #fff;
        box-shadow: 0 0  24px 5px #e3e3e4;
      }
    }
  }

</style>
