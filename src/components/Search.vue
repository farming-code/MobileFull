<template>
  <div class="body_child">
    <div class="top  clearfix">
      <div class="top_left">
        <input
          v-focus
          v-model="inputValue"
          type="text"
          placeholder="请搜索相关服务"
        >
        <i class="iconfont icon-sousuo" />
      </div>
      <router-link
        to="/face"
        class="top_right"
      >取消</router-link>
    </div>
    <div
      v-if="isToolbar"
      class="main-content"
    >
      <h3>热门搜索</h3>
      <ul class="clearfix">
        <li
          v-for="hot in hotSearch"
          :key="hot.id"
          @click="getJumpByHash(hot.path,hot)"
        >
          {{ hot.name }}
        </li>
      </ul>
      <div v-if="isHistory">
        <h3>历史搜索</h3>
        <ul>
          <li
            v-for="item in historySearch"
            :key="item.id"
            @click="getJumpByHash(item.path,item)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
    <div
      v-else
      class="search_content"
    >
      <ul v-if="isContent">
        <li
          v-for="item in resultList"
          :key="item.id"
          @click="getJumpByHash(item.path,item)"
        >
          <i :class="['iconfont', item.iconName]" />
          <span>{{ item.name }}</span>
        </li>
      </ul>
      <p v-else>未找到与"{{ inputValue }}"相关的内容</p>
    </div>
  </div>
</template>

<script>
import '@/assets/css/index.css';
export default {
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  data() {
    return {
      FaceList: [], //face里面所有的数据
      inputValue: '', //input框里面的值
      isContent: true, //返回是否有内容
      isToolbar: true, //是否显示 search_content
      hotSearch: [], //热门搜索
      resultList: [], //搜索里面的内容
      historySearch: [], //历史搜索
      isHistory: true //是否有历史搜索
    };
  },
  watch: {
    inputValue(val) {
      if (val.trim()) {
        // 在数组里面寻找是否有内容
        this.searchContent(val.trim());
        this.isToolbar = false; //显示search_content里面的内容
      } else {
        this.isToolbar = true;
      }
    }
  },
  created() {
    this.FaceList = JSON.parse(localStorage.getItem('OperationsData'));
    this.searchHots(); //热门搜索
    this.renderHistory(); //历史搜索
  },
  mounted() {},
  methods: {
    // 找寻搜索内容
    searchContent(value) {
      let searchList = [];
      this.FaceList.forEach(item => {
        searchList.push(
          ...item.list.filter(data => data.name.indexOf(value) !== -1)
        );
      });
      this.resultList = searchList;
      // 如果这个数组为空
      if (this.resultList.length === 0) {
        this.isContent = false;
      } else {
        this.isContent = true;
      }
    },
    // 热门搜索
    searchHots() {
      let allList = [];
      this.FaceList.forEach(item => {
        allList.push(...item.list);
      });
      if (allList.length <= 6) {
        //全部显示
        this.hotSearch = allList;
      } else {
        this.hotSearch = this.getRandomArrayElements(allList, 6);
      }
    },
    // 点击路由跳转
    getJumpByHash(hash, jumpData) {
      this.searchHistory(jumpData);
      this.$router.push(hash);
    },

    // 获取随机热门
    getRandomArrayElements(arr, count) {
      var shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp,
        index;
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(min);
    },
    // 历史搜索
    searchHistory(data) {
      if (localStorage.getItem('history')) {
        let LocalList = JSON.parse(localStorage.getItem('history'));
        // 判断原来的数组里面是否有
        let resList = LocalList.filter(item => item.name === data.name);
        if (resList.length !== 0) {
          let indexLength = LocalList.indexOf(...resList);
          LocalList.unshift(...LocalList.splice(indexLength, 1));
        } else {
          LocalList.unshift(data);
        }
        // 判断localList里面的数据是否大于6
        if (LocalList.length > 6) {
          LocalList.pop();
        }
        localStorage.setItem('history', JSON.stringify(LocalList));
      } else {
        localStorage.setItem('history', JSON.stringify([data]));
      }
    },
    // 渲染历史搜索
    renderHistory() {
      if (localStorage.getItem('history')) {
        this.historySearch = JSON.parse(localStorage.getItem('history'));
      } else {
        this.isHistory = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
// html,
// body {
//   width:100%;
//   height:100%;
//   background-color: #fff;
// }

.body_child {
  width: 100%;
  height: 100%;
}
.top {
  height: 120px;
  line-height: 120px;
  padding: 0 20px;
  border-bottom: 1px solid #ccc;
  background-color: #fff;

  .top_left {
    width: 86%;
    height: 100%;
    float: left;
    position: relative;
    input {
      height: 54px;
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 28px;
      border-radius: 54px;
      box-shadow: 1px 1px 20px 5px #ccc;
      text-indent: 60px;
      color: #333;
    }
    input::-webkit-input-placeholder {
      line-height: 36px;
      margin: 0;
      padding: 0;
      color: #ccc;
    }
    i {
      position: absolute;
      top: 1px;
      left: 10px;
      font-size: 30px;
      color: #8286fd;
    }
  }
  .top_right {
    width: 14%;
    height: 120px;
    line-height: 120px;
    float: right;
    text-align: center;
    font-size: 28px;
    color: #8286fd;
  }
}

.main-content {
  height: 91%;
  padding: 20px 20px 0 20px;
  background-color: #fff;
  h3 {
    font-size: 30px;
    margin: 0;
    height: 80px;
    line-height: 80px;
    color: #666666;
  }

  li {
    float: left;
    height: 50px;
    line-height: 50px;
    padding: 0 30px;
    font-size: 26px;
    color: #818181;
    background-color: #f2f2f2;
    margin-right: 30px;
    margin-bottom: 30px;
    border-radius: 60px;
  }
}
.search_content {
  height: 91%;
  padding: 20px 20px 0 20px;
  background-color: #fff;
  overflow: scroll;
  li {
    height: 100px;
    line-height: 100px;
    i {
      float: left;
      text-align: center;
      font-size: 46px;
      width: 20%;
      color: #6589c6;
    }
    span {
      float: left;
      width: 80%;
      font-size: 32px;
      border-bottom: 1px solid #ccc;
    }
  }
  p {
    margin: 0;
    margin-top: 200px;
    text-align: center;
    font-size: 30px;
  }
}
</style>
