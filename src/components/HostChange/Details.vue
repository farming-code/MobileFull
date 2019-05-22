<template>
  <div class="body">
    <div class="header clearfix">
      <router-link
        tag="p"
        to="/HostChange/TheHostChanges"
        class="title back fl"
      > <span>&lt;</span>变更详情 </router-link>
      <!-- <p class="title fl"></p> -->
    </div>
    <div class="content_z">
      <div
        id="wapper"
        class="main">
        <div>
          <div class="c_box">
            <div>
              <span class="width">变更主题</span>
              <span class="color">{{ title }}</span>
            </div>
            <div>
              <span class="width">变更单号</span>
              <span class="color">{{ mid }}</span>
            </div>
            <div>
              <span class="width">申请人</span>
              <span class="color">{{ applyer }}</span>
            </div>
            <div>
              <span class="width">实施开始时间</span>
              <span class="color">{{ real_start_time }}</span>
            </div>
            <div>
              <span class="width">实施结束时间</span>
              <span class="color">{{ real_end_time }}</span>
            </div>
            <div>
              <span class="width">实施人</span>
              <span class="color">{{ carrier }}</span>
            </div>
            <div>
              <span class="width">复核人</span>
              <span class="color">{{ checker }}</span>
            </div>
            <div>
              <span class="width">变更类型</span>
              <span class="color">{{ mod_type }}</span>
            </div>
            <div>
              <span class="width">变更准备</span>
              <span class="color">{{ prepare_type }}</span>
            </div>
            <div>
              <span class="width">专业组</span>
              <span class="color">{{ specialty }}</span>
            </div>
          </div>
          <div class="c_box">
            <div>
              <span>具体步骤</span><br><br>
              <span v-html="process"/>
            </div>
            <div>
              <span>附件</span>
              <p>
                <a
                  v-if="enclosure(attachment_url)"
                  :href="attachment_url"
                  download>附件</a>
                <span v-else>没有附件</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import '@/libs/iscroll/iscroll.js'
export default {
  name: 'TheHostChanges',
  data () {
    return {
      title:'',
      mid:'',
      applyer:'',
      real_start_time:'',
      real_end_time:'',
      carrier:'',
      checker:'',
      mod_type:'',
      prepare_type:'',
      specialty:'',
      process:'',
      attachment_url:'',
      id:'',
      myScroll: ''
    };
  },
  created (){
    this.init();
  },
  mounted () {
  },
  methods: {
    init(){
      this.id=this.$route.params.id;
      this.$http.get(`${this.$path.php}/mobile/modification/load-detail`,{
        params:{id:this.id}
      })
        .then(res => {
          this.title=res.data.data.title;
          this.mid=res.data.data.mid;
          this.applyer=res.data.data.applyer;
          this.real_start_time=res.data.data.real_start_time;
          this.real_end_time=res.data.data.real_end_time;
          this.carrier=res.data.data.carrier;
          this.checker=res.data.data.checker;
          this.mod_type=res.data.data.mod_type;
          this.prepare_type=res.data.data.prepare_type;
          this.specialty=res.data.data.specialty;
          this.process=res.data.data.process;
          this.attachment_url=res.data.data.attachment_url;
          // setTimeout(()=> {
          //   this.myScroll.refresh()
          // },10)
        })
        .catch(error => {
          throw error;
        });
    },
    enclosure(data){
      data = data.replace(/\s+/g,'');
      if(data==''){
        return false;
      }else{
        return true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.body {
  height: 100%;
  padding: 40px 40px 0;
}

.title {
  display: block;
  width: 100%;
  height: 100px;
  font-size: 50px;
  line-height: 80px;
  color: #464646;

  span {
    position: relative;
    top: 6px;
    font-size: 70px;
  }
}

.content_z {
  height: 90%;

  .main {
    height: 100%;
    overflow: scroll;
  }
}

.c_box {
  width: 98%;
  padding: 40px 30px;
  margin: 2px auto 50px;
  border-radius: 20px;
  font-size: 26px;
  color: #818181;
  background-color: #fff;
  box-shadow: 0 0 20px #dbdbdb;

  & > div {
    padding: 20px 0;
    word-break: break-all;

    p {
      margin-top: 30px;

      a {
        font-size: 26px;
        color: #6056f5;
      }
    }
  }

  span {
    line-height: 30px;
  }
}

.width {
  display: inline-block;
  width: 200px;
}

.color {
  display: inline-block;
  color: #464646;
}
</style>
