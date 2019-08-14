<template>
  <div class="b-far">
    <header>
      <div class="blue-content">
        <div
          :style="{backgroundColor: processing.bgColor}">{{ msgobj.cndesc }}</div>
      </div>
      <section class="bar">
        <div
          :style="{ width: processing.value + '%', backgroundColor: processing.color }"
          class="internal" />
      </section>
      <div
        v-show="isShow"
        class="percentage">{{ processing.show }}</div>
    </header>
    <aside
      class="desc">{{ processing.description }}</aside>
  </div>
</template>

<script>
export default {

  props: {
    msgobj: {
      type: Object,
      default: () => {
        return {
          value: 100,
          cndesc: '错误'
        };
      }
    }
  },

  data() {
    return {

      // 判断是否显示
      isShow: true
    };
  },

  computed: {
    processing() {
      return this.switchMsg(this.msgobj);
    }
  },
  created() {
    // console.info(this.msgobj);
  },
  methods: {

    // 根据传来的值判断并组成新数组
    switchMsg(msg) {

      let msgColor;

      // 判断当前的值是否有
      if(msg.value === undefined) {
        msg.value = 999;
      }

      // 判断当前传来的是否是 网关升级进度 或 应用投产
      if (msg.isFlag && msg.value === 999) { //如果是上面的两个切值不存在,给灰色
        msgColor = '#808080';
      }else if(msg.isFlag && msg.value !== 999 ) { //是上面的那两个且 值存在

        //当传来的是以上值时,给紫色
        msgColor = '#995bd3';
      }else if(!msg.isFlag && msg.value !== 999){

        //否则的话给蓝色
        msgColor = '#6879d6';
      } else {

        msgColor = '#808080';
      }

      // 判断当前的值
      if(msg.value > 0  && msg.value < 100) { // 区间为0-100之间

        this.isShow = true;

        return {
          value: msg.value,
          show: msg.value + '%',
          color: '#586AD8',
          bgColor: msgColor,
          description:'进行中'
        };
      }else if(msg.value === 100) { //100 满状态

        this.isShow = true;

        return {
          value: 100,
          show: 100 +'%',
          color: '#00F289',
          bgColor: msgColor,
          description: '已完成'
        };

      }else if(msg.value === 0 ) { // 处于0的状态

        this.isShow = true;

        return {
          value:0,
          show:0 + '%',
          color: 'transparent',
          bgColor: msgColor,
          description: '未开始'
        };
      }else if(msg.value === 999) { //如果是999 说明不存在

        this.isShow = false;

        return {
          value:100,
          show:'',
          color: '#808080',
          bgColor: msgColor,
          description: '不存在'
        };
      }else {
        throw new Error('参数错误');
      }
    }
  }
};
</script>

<style scoped lang="less">

.blue-content {
  div {
    padding: 7px 10px;
    display: inline-block;
    text-align: center;
    border-radius: 8px;
    margin-bottom: 4px;
    overflow: hidden;
    font-size: 24px;
    color: #fff;
    border: 1px solid #fff;
    background-color: #586AD8;
  }
}

.bar {
  width: 100px;
  height: 12px;
  display:inline-block;
  border: 2px solid #586AD8;
  border-radius: 4px;
  overflow: hidden;
  .internal {
    height: 100%;
    border: 2px solid transparent;
  }
}

.percentage {
  color: #586AD8;
  display: inline-block;
}

.desc {
  min-height: 6px;
  margin-top: 6px;
  font-size: 20px;
  color: #666;
}
</style>
