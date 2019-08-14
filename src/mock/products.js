export default {
  products: () => {
    // const search = config.url.split('?')[1].split('=')[1];
    return {
      'CICS': Math.floor(Math.random() * (0 - 101) + 101), //CICS安装
      'TQYX': Math.floor(Math.random() * (0 - 101) + 101), //投产日提前移行
      'YXXG_L': Math.floor(Math.random() * (0 - 101) + 101), //移行相关大表
      'YXXG_S': Math.floor(Math.random() * (0 - 101) + 101), //移行相关小表
      'YXWG_L': Math.floor(Math.random() * (0 - 101) + 101), //移行无关大表
      'JHXG': Math.floor(Math.random() * (0 - 101) + 101), //应用系统交互
      'HBCX': Math.floor(Math.random() * (0 - 101) + 101), //补账程序安装
      'TYYX': Math.floor(Math.random() * (0 - 101) + 101), //应用统一移行
      'YXCX': Math.floor(Math.random() * (0 - 101) + 101), //移行程序安装
      'ONCX': Math.floor(Math.random() * (0 - 101) + 101), //联机程序安装
      'BTCX': Math.floor(Math.random() * (0 - 101) + 101), //批量程序安装
      'XHHB': 100, //应用补账
      'XTHB': 100, //系统补账
      'CSON': 999, //启联机
      'GATE': Math.floor(Math.random() * (0 - 101) + 101), //网关升级进度
      'MDSP': 999, //应用投产
      'DWFW': Math.floor(Math.random() * (0 - 101) + 101), //对外服务
      'versionno':'NOVA+V1.11.4', //版本号
      'date':'2019/08/01 09:00:00' //日期
    };
  }
};
