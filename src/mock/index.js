import Mock from 'mockjs';
import Search from './search';
import HotSearch from './HotSearch';


Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send;
Mock.XHR.prototype.send = function() {
  if(this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false;
  }
  this.proxy_send(...arguments);
};

// 关于搜索内容
Mock.mock(/\/search\/search/, 'get',Search.search);
Mock.mock(/\/HotSearch\/HotSearch/, 'get', HotSearch.hotSearch);

export default Mock;
