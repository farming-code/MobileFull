<template>
  <div class="body">
    <child />
    <div class="header">
      <p class="title">主机变更</p>
      <div class="dateButton">
        <img
          src="../../assets/images/left.png"
          class="left"
          @click="day('pre')">
        <button
          id="start"
          type="text"
          class="form-control input-sm"
          @click="openPicker(&quot;start&quot;)" >{{ startTime | format }}</button>
        <img
          src="../../assets/images/right.png"
          class="right"
          @click="day('next')">
      </div>

      <mt-datetime-picker
        ref="picker"
        v-model="startTime"
        type="date"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="handleConfirm"/>
    </div>
    <div class="content_z">
      <div
        id="wapper_one"
        class="main">
        <div>
          <router-link
            v-for="(item,index) in data"
            :to="{ name:'Details',params:{id:item.id}}"
            :key="index"
            tag="div"
            class="content">
            <div class="content_top clearfix">
              <div class="number">{{ index+1 }}</div>
              <div
                v-if="flag(item.real_start_time)"
                class="time fl error">{{ item.real_start_time }}-至{{ item.real_end_time }}</div>
              <div
                v-else
                class="time fl">{{ item.real_start_time }}-至{{ item.real_end_time }}</div>
              <div
                v-if="item.status=='审批中'"
                class="state ing">{{ item.status }}</div>
              <div
                v-else
                class="state pass">{{ item.status }}</div>
            </div>
            <div class="content_bottom">{{ item.title }}</div>
          </router-link >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoHome from '@/components/Common/GoHome';
export default {
  name: 'TheHostChanges',
  components: {
    child: GoHome
  },
  filters: {
    //时间转换过滤器
    format(date) {
      var seperator1 = '-';
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = '0' + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    }
  },
  data() {
    return {
      startTime: new Date(),
      data: {},
      myScroll: ''
    };
  },
  created() {
    // 创建前发送axios请求 获取信息
    if (sessionStorage.getItem('time')) {
      var currentdate = sessionStorage.getItem('time');
      this.startTime = new Date(currentdate);
      this.$http
        .get(`${this.$path.php}/mobile/modification/load-all`, {
          params: { date: currentdate }
        })
        .then(res => {
          this.data = res.data.data;
        })
        .catch(error => {
          throw error;
        });
    } else {
      this.init();
    }
  },
  mounted() {},
  methods: {
    flag(time) {
      var hour = time.slice(6, 8);
      var minute = time.slice(6, 11);
      if (hour == 22 || minute == '23:00') {
        return false;
      } else {
        return true;
      }
    },
    openPicker() {
      // 点击日期打开日历
      this.$refs.picker.open();
    },
    handleConfirm() {
      // 选择日历的时间
      var seperator1 = '-';
      var date = this.$refs.picker.value;
      this.startTime = date;
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = '0' + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      sessionStorage.setItem('time', currentdate);
      // 发送axios请求
      this.$http
        .get(`${this.$path.php}/mobile/modification/load-all`, {
          params: { date: currentdate }
        })
        .then(res => {
          this.data = res.data.data;
          setTimeout(() => {
            this.myScroll.refresh();
          }, 10);
        })
        .catch(error => {
          throw error;
        });
    },
    init() {
      var seperator1 = '-';
      var date = new Date();
      this.startTime = date;
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = '0' + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      this.$http
        .get(`${this.$path.php}/mobile/modification/load-all`, {
          params: { date: currentdate }
        })
        .then(res => {
          this.data = res.data.data;
        })
        .catch(error => {
          throw error;
        });
    },
    day(flag) {
      let date;
      if (flag == 'pre') {
        date = new Date(this.startTime - 24 * 60 * 60 * 1000);
      } else {
        date = new Date((this.startTime / 1000 + 86400) * 1000);
      }
      this.startTime = date;
      var seperator1 = '-';
      this.startTime = date;
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = '0' + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      sessionStorage.setItem('time', currentdate);
      this.$http
        .get(`${this.$path.php}/mobile/modification/load-all`, {
          params: { date: currentdate }
        })
        .then(res => {
          this.data = res.data.data;
          setTimeout(() => {
            this.myScroll.refresh();
          }, 10);
        })
        .catch(error => {
          throw error;
        });
    }
  }
};
</script>

<style lang="less" scoped>
button {
  outline: none;
}

.body {
  height: 100%;
}

.content {
  position: relative;
  width: 98%;
  height: auto;
  padding: 40px 30px;
  margin: 2px auto 50px;
  border-radius: 20px;
  font-size: 24px;
  background-color: #fff;
  box-shadow: 0 0 20px #dbdbdb;
}

.header {
  position: relative;
  width: 100%;
  height: 100px;
  margin: 0 40px;
  line-height: 100px;

  .title {
    display: block;
    width: 500px;
    margin: 0;
    font-size: 50px;
    color: #464646;
  }

  .form-control {
    position: relative;
    bottom: 4px;
    height: 24px;
    border: none;
    font-size: 30px;
    line-height: 18px;
    color: #7b7b7b;
    background-color: #fff;
  }

  .dateButton {
    position: absolute;
    top: 30px;
    right: 90px;
    width: 340px;
    height: 50px;
    padding: 15px 5px;
    border: 2px solid #d8d8d8;
    border-radius: 20px;
    font-size: 32px;
    line-height: 18px;
    text-align: center;
    background-color: #fff;
  }
}

.mint-datetime-confirm,
.mint-datetime-cancel {
  height: 50px;
}

.mint-datetime-action,
.picker-item {
  height: 90px;
  font-size: 36px;
  line-height: 90px;
}

.picker {
  .picker-toolbar {
    height: 90px;
  }
}

.content_z {
  height: 82%;
  padding: 40px 40px 0;
  overflow: auto;
}

.main {
  position: relative;
  height: 100%;
  overflow: scroll;
}

.number {
  position: absolute;
  top: 40px;
  left: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 26px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  background-color: #79acff;
  box-shadow: 0 5px 10px #d3d3d3;
}

.time {
  width: auto;
  height: 45px;
  padding: 10px 15px;
  margin-left: 65px;
  border: 1px solid rgb(235, 235, 235);
  border-radius: 30px;
  font-size: 24px;
  line-height: 25px;
  text-align: center;
  color: #8fb3fc;
  background-color: #f6f6f6;
}

.error {
  color: #fb9999;
}

.state {
  position: absolute;
  top: 40px;
  right: 30px;
  width: auto;
  height: 45px;
  padding: 5px 20px;
  border-radius: 30px;
  font-size: 26px;
  line-height: 40px;
  text-align: center;
  color: #fff;
}

.content_bottom {
  margin: 25px 65px 0;
  font-size: 32px;
  line-height: 40px;
}

.pass {
  background: #87a0f4;
  box-shadow: 0 10px 10px #dcddfd;
}

.ing {
  background-color: #fd9581;
  box-shadow: 0 10px 10px #fdd9d2;
}

img {
  width: 20px;
  height: 28px;
}

.left {
  position: absolute;
  top: 9px;
  left: 20px;
}

.right {
  position: absolute;
  top: 9px;
  right: 20px;
}
</style>
