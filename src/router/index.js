import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'is-selected',
  routes: [
    {
      path: '/',
      redirect: '/Face'
    },
    { //face 脸面
      path: '/Face',
      name: 'Face',
      component: () => import('@/components/Face')
    },
    { //face 脸面
      path: '/Search',
      name: 'Search',
      component: () => import('@/components/Search')
    },
    { // 主机巡检
      path: '/MainframeInspection',
      name: 'MainframeInspection',
      component: () => import('@/components/MainframeInspection/Index'),
      children:[
        {
          path: 'HealthDegree',
          name: 'HealthDegree',
          component: () => import('@/components/MainframeInspection/HealthDegree')
        },
        {
          path: 'Broadcast',
          name: 'Broadcast',
          component: () => import('@/components/MainframeInspection/Broadcast')
        },
        {
          path: 'Indicators',
          name: 'Indicators',
          component: () => import('@/components/MainframeInspection/Indicators')
        },
        {
          path: 'Emergency',
          name: 'Emergency',
          component: () => import('@/components/MainframeInspection/Emergency')
        },
        {
          path: 'EmerTables',
          name: 'EmerTables',
          component: () => import('@/components/MainframeInspection/Emergency/EmerTables')
        },
        {
          path: 'SiteSwitching',
          name: 'SiteSwitching',
          component: () => import('@/components/MainframeInspection/Emergency/SiteSwitching')
        },
        {
          path: 'TradingBlockage',
          name: 'TradingBlockage',
          component: () => import('@/components/MainframeInspection/Emergency/TradingBlockage')
        }
      ]
    },
    { //主机变更
      path: '/HostChange',
      name: 'HostChange',
      component: () => import('@/components/HostChange/Index'),
      children:[
        {
          path: 'Details/:id',
          name: 'Details',
          component: () => import('@/components/HostChange/Details')
        },
        {
          path: 'TheHostChanges',
          name: 'TheHostChanges',
          component: () => import('@/components/HostChange/TheHostChanges')
        },
        {
          path: 'TheHostPortrait',
          name: 'TheHostPortrait',
          component: () => import('@/components/HostChange/TheHostPortrait')
        },
        {
          path: 'TheHostTemplate',
          name: 'TheHostTemplate',
          component: () => import('@/components/HostChange/TheHostTemplate')
        },
      ]
    }
  ]
});
