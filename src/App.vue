<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
}
::-webkit-scrollbar { //去掉overflow:auto 下的滚动条
    display: none;
}

// HostChange/TheHostChanges 时间选择器样式
.mint-datetime-action,
.picker-item{
  font-size: 36px;
  height:90px;
  line-height: 90px;
}
.picker-toolbar{
    height:90px;
}
</style>
