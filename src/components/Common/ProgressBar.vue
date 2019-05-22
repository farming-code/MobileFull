<template>
  <div>
    <header>
      <div class="blue-content">
        <div>{{ msgobj.cndesc }}</div>
      </div>
      <section class="bar">
        <div
          :style="{ width: processing.value + '%', backgroundColor: processing.color }"
          class="internal" />
      </section>
      <div class="percentage">{{ processing.value }}%</div>
    </header>
    <aside class="desc">{{ processing.description }}</aside>
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
          state: 1,
          cndesc: '一段默认文字'
        };
      }
    }
  },
  data() {
    return {
      processing: {}
    };
  },
  created() {
    this.processing = this.switchMsg(this.msgobj);
  },
  methods: {
    // 根据传来的值判断并组成新数组
    switchMsg(msg) {
      switch (msg.state) {
      case 0:
        return {
          value: 100,
          color: '#FF9100',
          description: '预警'
        };
      case 1:
        if(msg.value === 100) {
          return {
            value: 100,
            color: '#00F289',
            description: '已完成'
          };
        } else if(msg.value === 0) {
          return {
            value: 0,
            color: 'transparent',
            description: '未开始'
          };
        }else {
          return {
            value: msg.value,
            color: '#586AD8',
            description:'进行中'
          };
        }
      default:
        throw new Error('传入参数有误');
      }
    }
  }
};
</script>

<style scoped lang="less">
.blue-content {
  div {
    padding: 6px 10px;
    display: inline-block;
    text-align: center;
    border-radius: 12px;
    margin-bottom: 4px;
    overflow: hidden;
    font-size: 24px;
    color: #fff;
    border: 4px solid #f5f5f5;
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
  margin-top: 2px;
  font-size: 20px;
  color: #666;
}
</style>
