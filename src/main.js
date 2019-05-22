// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

// 引入axios
import axios from 'axios';

// 按需加载mint-ui
import 'mint-ui/lib/style.css';
// 加载iconfont
import '@/assets/fonts/iconfont.css';
import {
  Tabbar,
  TabItem,
  Navbar,
  DatetimePicker
} from 'mint-ui';
Vue.component(Tabbar.name, Tabbar);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(DatetimePicker.name, DatetimePicker);

// 按需加载echarts
import echarts from 'echarts/lib/echarts'; // 按需引入echarts
import 'echarts/lib/chart/line'; //引入折线charts
import 'echarts/lib/chart/bar'; //引入折线charts
import 'echarts/lib/component/title'; //控制标题
import 'echarts/lib/component/tooltip'; //提示框组件
import 'echarts/lib/component/axis'; //控制横纵坐标的
import 'echarts/lib/component/dataZoom'; //控制缩放

import '@/libs/mui/css/mui.css'; // 引入mui样式
import mui from '@/libs/mui/js/mui.min.js';

import 'lib-flexible/flexible.js'; // 引入flexible插件

// 移动端图片预览功能
import preview from 'vue-photo-preview';
import 'vue-photo-preview/dist/skin.css';

// 引入mock数据
import './mock';
// 手机端插件
let options = {
  escKey: true,
  timeToIdle: 4000
};
Vue.use(preview, options);

import {EnvironmentalScience} from '@/api';
// import vConsole from '@/assets/js/vconsole.js' //移动端抓包工具
import App from './App';
import router from './router';

Vue.prototype.mui = mui;
Vue.prototype.echarts = echarts;
Vue.prototype.$http = axios;
Vue.prototype.$preview = preview;

// Vue.prototype.vConsole = vConsole

Vue.config.productionTip = false;

/**
 * 通过传入不同的参数来配置不同的环境
 * 可传入的值为:
 *  host(本地开发环境) 本地需要请求后台接口
 *  test(测试环境)  反向代理 放在手机上看
 *  production(生产环境) 给钱老板dist版本
 */
EnvironmentalScience('production');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
});
