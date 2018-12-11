<template>
  <div class="outermost">
    <child />
    <div class="search">
      <input
        type="text"
        placeholder="请搜索相关服务"
        @click="goSearch">
      <i class="iconfont icon-sousuo" />
    </div>
    <div class=" info_content">
      <ul class="main-content">
        <li
          v-for="father in OperationData"
          :key="father.id"
          class="first_li">
          <p>{{ father.name }}</p>
          <ul class="clearfix">
            <li
              v-for="item in father.list"
              :key="item.id"
              class="second_li">
              <router-link :to="item.path">
                <i :class="['iconfont', item.iconName]" />
                <div>{{ item.name }}</div>
              </router-link>
            </li>
          </ul>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
import '@/assets/css/index.css';
import GoBackFace from '@/components/Common/GoBackFace';
export default {
  components: {
    child: GoBackFace
  },
  data() {
    return {
      // 数据
      OperationData:[
        {
          id:101,
          name:'主机操作',
          list: [
            {
              id:'1001',
              path:'/MainframeInspection/HealthDegree',
              iconName:'icon-zhujixunjian',
              name:'主机巡检'
            },
            {
              id:'1002',
              path:'/HostChange/TheHostChanges',
              iconName:'icon-zhujibiangeng1',
              name:'主机变更'
            }
          ]
        }
      ]
    };
  },
  created() {
    localStorage.setItem('OperationsData',JSON.stringify(this.OperationData));
  },
  mounted() {

  },
  methods: {
    goSearch() {
      this.$router.push('/Search');
    }
  }
};
</script>

<style lang="less" scoped>
.outermost {
  height:100%;
}

.top {
  height: 100px;
}

.search {
  height:100px;
  line-height: 100px;
  background-image: linear-gradient(to right,#839FF9, #6E7EEF );
  text-align: center;
  position:relative;
  input {
    height:54px;
    width: 90%;
    font-size: 28px;
    border-radius: 54px;
    text-align: center;
  }
  input::-webkit-input-placeholder {
    line-height: 36px;
    margin: 0;
    padding: 0;
    color: #ccc;
  }
  i {
    position: absolute;
    left: 32%;
    font-size: 28px;
    color: #839FF9;
  }
}
.info_content {
  width: 100%;
  height: 84%;
  overflow: scroll;
}
.main-content {
  .first_li {
    padding: 20px;
    p {
      height: 40px;
      line-height: 40px;
      font-size: 32px;
      font-weight: 700;
      border-left: 5px solid #8286FD;
      margin-bottom: 40px;
      text-indent: 10px;
      color: #333333;
    }
    .second_li:nth-child(odd) {
      i{
        color: #00BEF7;
      }
    }
    .second_li:nth-child(even) {
      i {
        color: #8AB36B;
      }
    }
    .second_li {
      width: 25%;
      height: 100px;
      float: left;
      margin-bottom:36px;
      text-align: center;
      i {
        font-size: 70px;
      }
      div {
        margin-top: 28px;
        font-size: 28px;
        color: #666666;
      }
    }
  }
}

.xj,
.bg {
  font-weight: 700;
  font-size: 36px;
  color: #333;
}
</style>
