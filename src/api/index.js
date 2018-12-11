import Vue from 'vue';
/**
 * 可传入的值为
 *  host(本地开发环境) 本地需要请求后台接口
 *  test(测试环境) 反向代理 放在手机上看
 *  production(生产环境) 给钱老板dist版本
 */

export function EnvironmentalScience(value) {
  if (!value) {
    throw new Error('此函数需要传参:\r\nhost(本地开发环境)\r\ntest(测试环境)\r\nproduction(生产环境)');
  }
  if (typeof value !== 'string') {
    throw new Error('此函数需要传入的是一个字符串类型的参数');
  }
  if (value === 'host') { //如果是本地环境
    Vue.prototype.$path = {
      node: 'http://localhost:3000',
      php: 'http://www.icbc.com'
    };
  } else if (value === 'test') { //测试环境
    Vue.prototype.$path = {
      node: '/api/a',
      php: '/api/b'
    };
  } else if (value === 'production') { //生产环境
    Vue.prototype.$path = {
      node: '',
      php: ''
    };
  } else {
    throw new Error('传入参数不正确');
  }
}
