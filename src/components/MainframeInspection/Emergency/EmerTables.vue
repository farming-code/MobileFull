<template>
  <div class="content">
    <ul>
      <li>
        <h2><span/> 园区切换</h2>
        <table>
          <thead>
            <tr>
              <th>应急场景</th>
              <th>应急名称</th>
              <th>主机操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>园区故障,本地应急失败</td>
              <td>园区切换</td>
              <td>ET-5</td>
            </tr>
          </tbody>
        </table>
      </li>
      <li>
        <h2><span/> 交易类</h2>
        <table>
          <thead>
            <tr>
              <th>应急场景</th>
              <th>应急名称</th>
              <th>主机操作</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bt">
              <td>局部交易超时</td>
              <td>1.封闭交易</td>
              <td>ET-2-1</td>
            </tr>
            <tr class="bt">
              <td/>
              <td>2.杀超时交易</td>
              <td>ET-2-2</td>
            </tr>
            <tr>
              <td/>
              <td>3.杀Thead</td>
              <td>ET-2-3</td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr class="bt">
              <td>多交易超时</td>
              <td>1.隔离批量</td>
              <td>ET-1-1</td>
            </tr>
            <tr>
              <td/>
              <td>2.停止XRC</td>
              <td>ET-4-1</td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <td>单个甲乙达到TCLASS上限</td>
              <td>3.关于JOB提交</td>
              <td>ET-1-2</td>
            </tr>
          </tbody>
        </table>
      </li>
      <li>
        <h2><span/> 联机类</h2>
        <table>
          <thead>
            <tr>
              <th>应急场景</th>
              <th>应急名称</th>
              <th>主机操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>LPAR CPU/公共内存高</td>
              <td>限制TCLASS</td>
              <td>ET-2-4</td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <td>CISC SOS(DFHSM0133)</td>
              <td>隔离LPAR联机</td>
              <td>ET-3-1</td>
            </tr>
          </tbody>
        </table>
      </li>
      <li>
        <h2><span/> 数据库类</h2>
        <table>
          <thead>
            <tr>
              <th>应急场景</th>
              <th>应急名称</th>
              <th>主机操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>个别DB2异常/CPU高</td>
              <td>隔离单个联机</td>
              <td>ET-3-2</td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <td>DB2异常下宕(DSNV086E)</td>
              <td>隔离DB2连接联机</td>
              <td>ET-3-3</td>
            </tr>
          </tbody>
        </table>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="less" scoped>
  ::-webkit-scrollbar {
    display: none;
  }

  .bt {
    border-bottom: 1px solid #d2d2d2;
  }

  .content {
    height: 92%;
    overflow: auto;

    ul {
      padding: 50px 50px 0;
    }

    li {
      h2 {
        position: relative;
        margin-top: 30px;
        margin-bottom: 20px;
        font-weight: 400;
        font-size: 28px;
        text-indent: 20px;
        color: #434343;

        span {
          position: absolute;
          top: 8px;
          left: 0;
          width: 10px;
          height: 10px;
          border-radius: 10px;
          background-color: #f89e67;
        }
      }

      table {
        width: 100%;
        margin-bottom: 10px;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 26px 3px #e0e0e0;
      }

      thead {
        background-color: #f5f7f9;

        tr {
          height: 70px;
        }

        th {
          font-weight: 400;
          font-size: 24px;
          text-align: center;
          color: #676767;
        }

        th:first-child {
          width: 40%;
          text-indent: 16px;
        }

        th:nth-child(2) {
          width: 25%;
        }

        th:nth-child(3) {
          width: 25%;
        }
      }

      tbody {
        border-left: 6px solid #8a9ef4;
        background-color: #fff;

        tr {
          height: 70px;
          text-align: center;

          td {
            font-size: 14px;
          }

          td:first-child {
            width: 40%;
          }

          td:nth-child(2) {
            width: 25%;
          }

          td:nth-child(3) {
            width: 25%;
          }
        }
      }
    }
  }

</style>
