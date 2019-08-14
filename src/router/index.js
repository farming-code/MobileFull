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
      component: () => import(/* webpackChunkName: "Face" */ '@/components/Face')
    },
    { //face 脸面
      path: '/Search',
      name: 'Search',
      component: () => import(/* webpackChunkName: "Search" */ '@/components/Search')
    },
    { // 主机巡检
      path: '/MainframeInspection',
      name: 'MainframeInspection',
      component: () => import(/* webpackChunkName: "MainframeInspectionIndex" */ '@/components/MainframeInspection/Index'),
      children:[
        {
          path: 'HealthDegree',
          name: 'HealthDegree',
          component: () => import(/* webpackChunkName: "MainframeInspectionHealthDegree" */ '@/components/MainframeInspection/HealthDegree')
        },
        {
          path: 'Broadcast',
          name: 'Broadcast',
          component: () => import(/* webpackChunkName: "MainframeInspectionBroadcast" */ '@/components/MainframeInspection/Broadcast')
        },
        {
          path: 'Indicators',
          name: 'Indicators',
          component: () => import(/* webpackChunkName: "MainframeInspectionIndicators" */ '@/components/MainframeInspection/Indicators')
        },
        {
          path: 'Emergency',
          name: 'Emergency',
          component: () => import(/* webpackChunkName: "MainframeInspectionEmergency" */ '@/components/MainframeInspection/Emergency')
        },
        {
          path: 'EmerTables',
          name: 'EmerTables',
          component: () => import(/* webpackChunkName: "MainframeInspectionEmerTables" */ '@/components/MainframeInspection/Emergency/EmerTables')
        },
        {
          path: 'SiteSwitching',
          name: 'SiteSwitching',
          component: () => import(/* webpackChunkName: "MainframeInspectionSiteSwitching" */ '@/components/MainframeInspection/Emergency/SiteSwitching')
        },
        {
          path: 'TradingBlockage',
          name: 'TradingBlockage',
          component: () => import(/* webpackChunkName: "MainframeInspectionTradingBlockage" */ '@/components/MainframeInspection/Emergency/TradingBlockage')
        }
      ]
    },
    { //主机变更
      path: '/HostChange',
      name: 'HostChange',
      component: () => import(/* webpackChunkName: "HostChangeIndex" */ '@/components/HostChange/Index'),
      children:[
        {
          path: 'Details/:id',
          name: 'Details',
          component: () => import(/* webpackChunkName: "HostChangeDetails" */ '@/components/HostChange/Details')
        },
        {
          path: 'TheHostChanges',
          name: 'TheHostChanges',
          component: () => import(/* webpackChunkName: "HostChangeTheHostChanges" */ '@/components/HostChange/TheHostChanges')
        },
        {
          path: 'TheHostPortrait',
          name: 'TheHostPortrait',
          component: () => import(/* webpackChunkName: "HostChangeTheHostPortrait" */ '@/components/HostChange/TheHostPortrait')
        },
        {
          path: 'TheHostTemplate',
          name: 'TheHostTemplate',
          component: () => import(/* webpackChunkName: "HostChangeTheHostTemplate" */ '@/components/HostChange/TheHostTemplate')
        },
      ]
    },
    // 一体化流程图
    {
      path: '/TreeDiagram',
      name: 'TreeDiagram',
      component: () => import( /* webpackChunkName: "MainframeInspectionTreeDiagram" */ '@/components/TreeDiagram/TreeDiagram')
    }

  ]
});
