
export default {
    data() {
      return {
        boss_user: {
        	boss_user_name: '',
        	tel: '',
        }
      }
    },
    methods: {
        // 获取用户信息
        getUserInfo() {
        	var vm = this
		    Vue.http.post("/ajax/route?func=/v2/boss-user/get-boss-user-info", vm.form).then((response) => {
		    	vm.boss_user = response.body.data
		    })
        },
        //退出登录
        logout() {
        	localStorage.setItem('mhjboss_token', '')
          	window.location = '/login'
        }
    },
    mounted() {
    	this.getUserInfo()
    }
}
