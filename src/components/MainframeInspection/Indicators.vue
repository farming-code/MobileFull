<template>
  <div class="all">
    <!-- 头部区域 -->
    <child class="health_top"/>
    <div class="head">
      <img src="../../assets/images/background.png">
      <ul class="clearfix">
        <li
          :class="{ 'current': addressLpar === true }"
          @click.stop="addressSpace(1)">
          <a href="javascript:;">地址空间</a>
        </li>
        <li
          :class="{ 'current': addressLpar === false }"
          @click.stop="addressSpace(2)">
          <a href="javascript:;">各LPAR</a>
        </li>
      </ul>
    </div>
    <!-- 这边的echarts表格 -->
    <div class="echarts_far">
      <div
        class="echarts"
        style="width: 100%;
          height: 100%;"/>
    </div>
    <!-- 下面的具体内容 -->
    <div class="content">
      <!-- 上面的taber -->
      <div
        id="wrapper"
        class="taber">
        <ul class="clearfix">
          <!-- 遍历上面的tab栏 -->
          <li
            v-for=" (item,i) in tabList"
            :key="i"
            :class="{ 'current' : active === item.name }"
            @click.stop="tabSelected(item.name,true)"
          >
            <a href="javascript:;" >{{ item.display }}</a>
          </li>
        </ul>
      </div>
      <!-- 下面的区域滚动 -->
      <div class="mui-scroll-wrapper scroll_wrapper2">
        <div class="mui-scroll scroll2">
          <!--这里放置真实显示的DOM内容-->
          <div
            id="1"
            class="mt_one mt_cell">
            <!-- 操作下面的所有li -->
            <ul class="clearfix">
              <li
                v-for="(item,i) in thirdTitle"
                :key="i"
                :class="item.status === 0 ? 'bg_green' : item.status === 1 ? 'bg_yellow' : 'bg_red'"
                @click.stop="getDetail(item.name,item.lpar,false)"
              >
                <div class="mt_content">
                  <div class="mt_content_left">{{ item.name }}</div>
                  <div class="mt_content_right">
                    <div class="front">
                      <p>{{ item.value }}</p>
                      <div>当前</div>
                    </div>
                    <div class="normal">
                      <p>{{ item.reference }}</p>
                      <div>参考值</div>
                    </div>
                  </div>
                </div>
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
  data (){
    return {
      height:'', //三级列表的高度
      tabWidth:'', //tab栏的宽度

      addressLpar:true,  // 一级标题选中状态
      active:'', //二级标题选中状态
      currentData:'' ,//三级数据的选中的状态
      lpar:'', //lpar唯一值

      tabList:[], // 二级标题的数据
      thirdTitle:[], //三级单独详情数据
      categories:[], //ecahrts时间数组
      values:[], //echarts 值的数组

      ifInit: true, // 避免重复点击
      scroll:true,//判断是否需要重新 new scroll
      timeId:'', // timeId
      isRender:true, // 判断是否初始化渲染
      addressClick:false, //判断是否从一级菜单直接点击进去的

      isReflash: false,
      isToggle: false,
      isMany:false
    };
  },
  watch: {
    // 监视height的变化
    height(curVal){
      document.querySelector('.mui-scroll').style.height = curVal;
      // 在每次点击的时候,让ul的位置放在0.0的位置
      this.mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,1);
    },
    // tab栏的宽度
    tabWidth(curVal){
      document.querySelector('#wrapper>ul').style.width = curVal;
    }
  },
  created(){
    this.isToggle = this.$route.params.isToggle;
    let address = localStorage.getItem('addressLpar');
    if(address === 'false'){
      this.addressLpar = false;
    }else{
      this.addressLpar = true;
    }

  },
  mounted(){
    if(this.isRender) {
      this.getSecondMenu();
    }

    this.timeId = setInterval(()=>{
      this.getSecondMenu();
      this.isReflash = true;
    },60000);
  },
  beforeDestroy(){
    clearInterval(this.timeId);
    this.timeId = null;
  },
  methods:{
    /**
     * 参数一 : echars的DOM
     * 参数二 : echarts父元素DOM
     */
    resizeWorldMapContainer(self){
      if(self) {
        self.style.width = self.innerWidth+'px';
        self.style.height = self.innerHeight+'px';
      }
    },
    // 获取元素计算后的样式
    getStyle(element){
      let num = document.defaultView.getComputedStyle(element,null)['marginBottom'];
      return num.substring(0,num.length - 2) - 0;
    },
    /**
      动态计算父元素中的所有子元素的高度
      far { string } 父元素的类名或id名
     */
    getChildrenHeight(far){
      // 获取DOM出错
      const childs = document.querySelectorAll(far);
      let height = 240;
      // 遍历数组,获得每一个a标签的高度
      childs.forEach((item) => {
        height += item.offsetHeight + this.getStyle(item);
      });
      return height;
    },
    getChildrenWidth(far){
      const childs = document.querySelectorAll(far);
      let width = 50;
      // 遍历数组,获得每个a标签的高度
      childs.forEach(item => {
        width += item.offsetWidth + this.getStyle(item);
      });
      return width;
    },
    // 判断地址空间和各LPAR之间的切换
    addressSpace(num){
      this.ifInit = false;
      if(num === 1 ){
        this.addressLpar = true;
      }else if(num === 2){
        this.addressLpar = false;
      }
      this.isRender = false; //判断是否初始化数据
      this.scroll = true; //判断是否重新 new scroll
      this.addressClick = true;
      this.getSecondMenu();
      localStorage.setItem('addressLpar',this.addressLpar);
    },
    // 获取二级数据
    getSecondMenu(){
      let state = this.addressLpar === true ? 'address' : 'lpar'; // 判断是地址空间还是lpar
      this.$http.get(`${this.$path.node}/mobile/yps/load_tab_list?index_type=${state}`)
        .then(data => {
          this.tabList = data.data.tabs; //二级标题的数据
          // 判断localStorage里面是否存入值, 如果有,就用之前的, 如果没有, 选中第一个
          if(localStorage.getItem('tabSecond') === null){ //如果点击,localStorage里面没有值
            this.tabSelected(data.data.tabs[0].name); //选中第一个数据
          }
          else if(localStorage.getItem('tabSecond') && this.addressClick === true){ //如果点击,localStorage里面有值,但是是从一级菜单点击进来的
            this.tabSelected(data.data.tabs[0].name); //选中第一个数据
          }else if (localStorage.getItem('tabSecond') && (this.isReflash || this.isToggle) ) {
            this.tabSelected(localStorage.getItem('tabSecond'));
          }
          else if(!this.ifInit){
            this.tabSelected(data.data.tabs[0].name);
          }
          else {
            this.tabSelected(localStorage.getItem('tabSecond'));
          }

          this.isToggle = false;
          this.isReflash = false;
          this.$nextTick(() => {
            this.tabWidth = this.getChildrenWidth('#wrapper>ul li') + 'px';
            if(document.querySelector('#wrapper>ul')) {
              document.querySelector('#wrapper>ul').style.width = this.tabWidth;
            }
          });
        });
    },
    /**
      点击切换tab栏
      name : 选中的数据
      istrue : 点击进来的是true ,非点击进来的是false
    */
    tabSelected(name,istrue) {
      // 判断用户是否重复点击
      if(this.active === name  && this.ifInit && !this.isReflash) {
        return;
      }else {
        this.ifInit = true;
        this.active = name;// 二级标题的选中状态
        // 避免getThirdMenu重复加载
        if(istrue === true) {
          this.getThirdMenu(istrue); //获取三级标题
        } else {
          this.getThirdMenu();
        }

      }
      localStorage.setItem('tabSecond',this.active);
    },
    getThirdMenu(istrue){
      this.$http.get(`${this.$path.node}/mobile/yps/load_index_list?index_type=${this.addressLpar === true ? 'address' : 'lpar'}&index_sub_type=${this.active}`)
        .then(data => {
          this.thirdTitle = data.data.indexes; //三级列表数组
          // 通过nextTick获取更新后的DOM
          this.$nextTick(function(){
            if(document.querySelector('#wrapper>ul')){
              this.height = this.getChildrenHeight('.mt_one>ul li') + 'px';
              this.tabWidth = this.getChildrenWidth('#wrapper>ul li') + 'px';
              document.querySelector('#wrapper>ul').style.width = this.tabWidth;
            }
          });
          if (istrue === undefined) { //如果不是通过tab栏点击进来的, 直接走入详情
            this.currentData = this.thirdTitle[0].name;
            this.lpar = this.thirdTitle[0].lpar;
            this.getDetail(this.currentData,this.lpar,undefined);
          }else if(istrue === true){  //如果是通过tab栏点击进来的, 把点击的标志位传入
            this.currentData =  this.thirdTitle[0].name;
            this.lpar =  this.thirdTitle[0].lpar;
            this.getDetail(this.currentData,this.lpar,istrue);
          }else if(localStorage.getItem('thirdCurrent') && localStorage.getItem('lpar')){ //如果是通过其他方式点击进来的
            this.currentData = localStorage.getItem('thirdCurrent');
            this.lpar = localStorage.getItem('lpar');
            this.getDetail(this.currentData,this.lpar,undefined);
          }else {
            this.currentData = this.thirdTitle[0].name;
            this.lpar = this.thirdTitle[0].lpar;
            this.getDetail(this.currentData,this.lpar,undefined);
          }
        });
    },
    getDetail(name,lpar,istrue){
      if(istrue === false) { //如果是通过自己点进来的
        this.currentData = name;
        this.lpar = lpar;
      }else if(istrue === undefined ) {//不是通过自己点击进来的, 有可能通过二级菜单点击进来的
        if(this.addressClick === true) {
          this.currentData = this.thirdTitle[0].name;
          this.lpar = this.thirdTitle[0].lpar;
        }
        else if(localStorage.getItem('thirdCurrent') && localStorage.getItem('lpar')){ //但是localStorage里面有数据
          this.currentData = localStorage.getItem('thirdCurrent');
          this.lpar =  localStorage.getItem('lpar');
        }else {
          this.currentData = this.thirdTitle[0].name;
          this.lpar = this.thirdTitle[0].lpar;
        }
      }
      else{ //如果不是通过自己点击进来
        if (this.addressClick === true) { //判断是否是从一级菜单点击进来的
          this.currentData = this.thirdTitle[0].name;
          this.lpar = this.thirdTitle[0].lpar;
        }else { //如果不是通过自己点击进来,又不是通过一级菜单点击进来的
          this.currentData = this.thirdTitle[0].name;
          this.lpar = this.thirdTitle[0].lpar;
        }
      }
      localStorage.setItem('thirdCurrent', this.currentData);
      localStorage.setItem('lpar',this.lpar);
      this.addressClick = false;
      this.$http.get(`${this.$path.node}/mobile/yps/load_index_detail?index_type=${this.addressLpar === true ? 'address' : 'lpar'}&index_sub_type=${this.active}&index_name=${this.currentData}&lpar=${this.lpar}`)
        .then(data => {
          this.categories = data.data.categories;
          this.values = data.data.values;
          this.DOMOperation(); // 每次DOM修改都会使mui 和 iscroll 重新 new

        });
    },
    // DOM操作
    DOMOperation(){
      // 初始化echarts
      const chart_img = document.querySelector('.echarts');
      if (chart_img) {
        // 用于使chart自适应高度和宽度,通过窗体宽高计算容器宽高
        this.resizeWorldMapContainer(chart_img);
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.echarts.init(chart_img);
        myChart.setOption({
          // 标题
          title:{
            show:true,
            text: this.currentData,
            // 文字颜色
            textStyle: {
              color:'#7ECEF4',
              fontSize:14,
              // fontWeight:400
            },
            x:'center',
            y: 10
          },
          // 提示框组件
          tooltip: {
            // 触发方式
            trigger: 'axis',
            // 坐标轴指示器配置项
            axisPointer:{
              // 指示器的坐标轴方向
              axis:'x',
              lineStyle:{
                color:'transparent'
              }
            },
            // 提示框浮层的位置
            position: function (pos, params, dom, rect, size) {
              // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
              var obj = {top: 60};
              obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
              return obj;
            }
          },
          // X轴配置项
          xAxis: {
            // x轴坐标是否显示
            show:true,
            position: 'bottom',
            offset:4,
            // 类型:
            type: 'category',
            // 强制设置坐标轴分割间隔
            interval: 6,
            // 数据
            data: this.categories,
            // 坐标轴两边留白策略{ false 不留白; true 留白}
            boundaryGap:false,
            // 坐标轴名称的文字样式
            nameTextStyle:{
              // padding:[0,10,0,0],
              fontFamily:'Microsoft YaHei',
            },
            // 坐标轴 '刻度 '相关设置
            axisTick:{
              // 是否显示刻度
              show:false,
            },
            // 标签刻度标签相关设置
            axisLabel:{
              show:true,
              // 坐标轴刻度标签显示间隔
              interval:'auto',
              // interval:2,
              fontSize:11,
              color:'#727272',
              align:'center'
            },
            // 坐标轴轴线相关设置
            axisLine:{
              show:false
            }
          },
          // y轴配置
          yAxis: {
            // y轴坐标类型(不同的类型坐标轴会发生不同的变化)
            type: 'value',
            // y轴相对于默认位置的偏移
            offset: 1,
            // 坐标轴 '刻度 '相关设置
            axisTick:{
              // 是否显示刻度
              show:false,
              // 坐标轴的朝向(true是朝内, false朝外)
              inside:true,
              lineStyle: {
                opacity:0
              },
              textStyle:{
                color:'#fff'
              }
            },
            axisLine:{
              show:false
            },
            // 坐标轴名称显示位置
            nameLocation:'center',
            // 坐标轴两边留白策略
            boundaryGap: false,
            // 坐标轴名称的文字样式
            nameTextStyle:{
              color:'#000',
              fontFamily:'Microsoft YaHei',
            },
            // 标签刻度标签相关设置
            axisLabel:{
              // 显示左侧内容
              show:true,
              // 距离坐标轴的距离
              margin: 0,
              // 刻度标签是否朝内,默认朝外
              inside:true,
              textStyle: {
                color:'#727272',
                fontSize:'11',
                align:'left'
              }
            },
            // 坐标轴在grid区域中的分割线
            splitLine: {
              show:true,
              interval: 1,
              lineStyle: {
                type: 'dashed',
                color:['#ECEDFF']
              }
            },
          },
          // 距离上下左右的间距
          // 绘图网格
          grid: {
            top: '20%',
            bottom: '15%',
            left: '4%',
            right:'4%',
          },
          // 区域缩放
          dataZoom: [{
            type: 'inside',
            start: 0,
            end: 100
          }],
          // 数据显示
          series: [
            {
              name:'地址空间',
              // 类型
              type:'line',
              // 是否平滑曲线显示
              smooth:true,
              // 标记的图形 {string}(可以为内置类型或图片)
              symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiYWJhNmRiMC1kY2Y1LWE3NDItODhmNy0yMDVmYjQyZjQ0NTEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTU4MUY2MkJBMDM3MTFFODk3MERGMUY1NEVDQzY4RTIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTU4MUY2MkFBMDM3MTFFODk3MERGMUY1NEVDQzY4RTIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MWRhMzMwNGYtY2RlMC1hNjRkLTk2MmYtZDIyZjdlODIwZTg2IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ZGE3ZjQ3YWItZjRmYS1mZDRhLWJhMTItMzkwN2I3YjM4MDMyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+q8ADCQAAAfBJREFUeNqklcsrRHEUx2cuSUMhRBoWZDY2YqEoEQtJXjvP/Acekd3MsBN5/AfkuaNhYcNCsUIWVl4Lj2wQhWEhvqe+t45fd+Ympz6dzu887u/3u/ec6w0ev3piSCnoAVUgH2SBB3AD9sEiOHFKTHRYKwRToBV4DV8eqQCDYAOMgEsdZBlJDeAYtIE3MAPqgB/4qOvBHP0SdwQaYxVtBlsgDayCABgCu+AORKl3wAD9a4yPMP9XUQlYBglgDHSCe098EX8HGGfeCijWReU4qbz8sOdvEuKGUsCEXbScd/nMY2lJ5s4vwCf1GNe19IMX3nGZFO2iYx48qUAf7y8IikASdZDrPhX7yFOKdEvRShqbxtOHlc+USvq1RKirpWgBjVMjqMvlLk2/nV8kRTNpPBhBBS5F/Yb9SJ1uKSPLCLp2KXpr2Pbmni2VXGIELbsUXTJsO/9Sih6ojtIyycHhJPucD1paqPcsdoJIH8hQQVH2uTTDOXinDnM9ahy92z6BFD0E23LB7CwtH/zYA+yYAO0PI26W+esykCzVEa+cn8E/tmmYu5SpNap7/4zf3Rd3sgByXIrl8mWFmNfJ6/k1+qQjmtjDvezzaVCjPrdsUMv1c27khS/Z7iiP1+F3Em/ya/mONfmdfidXoP0//6gfAQYAaO51QC2soBoAAAAASUVORK5CYII=',
              // 是否显示symbol,如果是false,只有在tooltip.hover的时候显示
              showSymbol: false,
              // 标记的尺寸大小
              symbolSize:10,
              // 折线拐点标志的样式
              itemStyle: {
                // 默认边框颜色
                normal: {
                  color: 'rgb(126, 206, 244)'
                }
              },
              // 线条样式
              lineStyle:{
                color:'#7ECEF4',
                width:2,
              },
              // 区域填充样式
              areaStyle: {
                normal: {
                  color: new this.echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(197, 232, 250)'
                  }, {
                    offset: 1,
                    color: 'rgb(255, 255, 255)'
                  }])
                }
              },
              // 坐标轴显示数据
              data: this.values
            }
          ]
        });
        window.onresize = ()=>{
          this.resizeWorldMapContainer(chart_img);
          myChart.resize();
        };
      }
    },

  },
};
</script>

<style lang="less" scoped>
  ::-webkit-scrollbar { //去掉overflow:auto 下的滚动条
    display: none;
  }
  .health_top {
    position: relative;
    z-index: 2;
    width:100%;
    background:#fff url("../../assets/images/backgroundcolor.png") 0 0 no-repeat;
    background-size: contain;
  }
  // 背景选中的状态
  .content .mui-scroll .mt_cell {
    .bg_current {
      .mt_content {
        background-color: #eee;
      }
    }
  }

  .all {
    height: 100%;
    padding-bottom: 120px;
  }

  .head {
    width: 100%;
    height: 180px;
    background: #778aec url("../../assets/images/contentBackground.png") 0 0 no-repeat;
    background-size: 100% 100%;
    box-shadow: 0 0 30px 10px #8697ec;
    position: relative;
    img {
      opacity: .3;
      width: 300px;
      position: absolute;
      right: 20px;
      top: 30px;
    }
    ul {
      height: 180px;
      padding-left: 40px;
    }

    li {
      float: left;
      height: 50%;
      padding: 0 20px;
      padding-top: 40px;

      a {
        display: block;
        height: 50%;
        font-weight: 700;
        font-size: 40px;
        color: rgba(255, 255, 255, .5);
      }
    }

    li.current a {
      color: #fff;
    }
  }

  .echarts_far {
    position: relative;
    z-index: 99;
    width: 90%;
    height: 380px;
    margin: 0 auto;
    margin-top: -70px;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 0 10px 20px 0 #e1e1e1;
  }

  .content {
    position: relative;
    height: 100%;

    .mint-navbar {
      position: relative;
      z-index: 2000;
      padding: 30px 100px 0;
      background-color: #efeff4;

      a {
        width: 25%;
        height: 70px;
      }
    }

    .mint-navbar .mint-tab-item.is-selected {
      border-bottom: 4px solid #6d6df6;
      color: #6d6df6;
    }

    .mint-tab-container-item {
      margin-top: 20px;
    }

    .mint-tab-item {
      margin: 0 30px;
      font-size: 26px;
      color: #5c5c5c;
    }
    // 下面的wrapper区域
    // 每个wrapper盒子

    .mui-scroll-wrapper {
      position: relative;
      height: 860px;
      overflow: hidden;
      touch-action: none;
    }
    // 控制mui-scroll的高度,可以使之滚动
    .mui-scroll {
      position: relative;
      margin-bottom: 110px;
      overflow: hidden;

      .mt_cell {
        li {
          height: 120px;
          margin-right: 50px;
          margin-bottom: 20px;
          margin-left: 50px;
          border-radius: 16px;
          box-shadow: 0 5px 30px 0 rgb(218, 215, 215);

          .mt_content {
            width: 88%;
            height: 100%;
            border-radius: 16px;
            background-color: #fff;

            .mt_content_left {
              float: left;
              width: 40%;
              height: 100%;
              padding-left: 40px;
              font-size: 26px;
              line-height: 120px;
            }

            .mt_content_right {
              float: left;
              width: 60%;
              height: 100%;
              padding-top: 32px;
              text-align: center;

              .front,
              .normal {
                float: left;
                width: 50%;
              }

              .front {
                border-right: 1px dashed #eee;

                p {
                  margin-bottom: 16px;
                  font-weight: 700;
                  font-size: 28px;
                  color: #6667ff;
                }

                div {
                  font-size: 20px;
                  color: #6667ff;
                }
              }

              .normal {
                p {
                  margin-bottom: 16px;
                  font-weight: 700;
                  font-size: 28px;
                  color: #818181;
                }

                div {
                  font-size: 20px;
                  color: #818181;
                }
              }
            }
          }
        }

        .bg_red {
          background-image: linear-gradient(#f27877, #ea7777);
        }

        .bg_yellow {
          background-image: linear-gradient(#f7b564, #fdb761);
        }

        .bg_green {
          background-image: linear-gradient(#89fc7d, #6fe35c);
        }

        span {
          position: absolute;
          top: 54px;
          left: 160px;
          font-size: 22px;
        }

        .present {
          position: absolute;
          top: 40px;
          right: 160px;
          padding-right: 30px;
          border-right: 1px dashed #ccc;

          p {
            font-weight: 700;
            font-size: 20px;
            color: #5f7ae5;
          }
        }

        .everyDay {
          position: absolute;
          top: 40px;
          right: 90px;

          p {
            font-weight: 700;
            font-size: 20px;
            color: #e9ad38;
          }
        }
      }
    }

    .taber {
      width: 100%;
      overflow: auto;

      ul {
        padding: 20px 0;
        margin-top: 10px;
      }

      li {
        float: left;
        width: 240px;
        height: 50px;
        padding: 0 30px;
        font-size: 26px;
        text-align: center;
        cursor: pointer;

        a {
          display: block;
          height: 100%;
          color: #5c5c5c;
        }
      }

      li.current a {
        border-bottom: 5px solid #416cfa;
        color: #416cfa;
      }
    }
  }
</style>
