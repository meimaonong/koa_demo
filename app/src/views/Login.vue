<template>
  <div id="app">
    <div class="login_w">
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input v-model="form.tel" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="isLoging" style="width:100%;" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import * as SERVICE from 'services/actions/login.action'

export default {
  name: 'app',
  data () {
    return {
      // 正在登录
      isLoging: false, 
      form: {
        tel: '',
        password: '',
      }
    }
  },
  methods: {
    login() {
      var vm = this
      vm.isLoging = true

      SERVICE.login(vm.form, (res) => {
        if (res.code == 0) {
          localStorage.setItem('x_token', res.data)
          window.location = '/'
        } else {
          ElementUI.Message({
            message: res.msg,
            type: 'error'
          })
          vm.isLoging = false
        }
      })

    }
  },
  mounted() {

    

  },
  components: {
    
  }
}
</script>

<style lang="less">
html,body {
    font-size: 14px;
    margin: 0;
    height: 100%;
}

a {
    color: #4078c0;
    text-decoration: none;
}

#app {
  font-family: 'Microsoft Yahei', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  position: relative;
  width: 100%;
  height: 100%;
  background: #eee;
}

.login_w{
    width: 300px;
    height: 220px;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -200px;
    margin-top: -170px;
    background: #fff;
    padding: 60px 50px;
}

</style>
