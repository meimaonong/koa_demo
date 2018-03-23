
import * as SERVICE from 'services/actions/account.action'

export default {
    data() {
        return {
            form: {
                password: '',
                new_password: '',
                repeat_password: '',
            },
            isSubmit: false,
            isDisabled: false
        }
    },
    methods: {
        reset() {
            var that = this
            that.isSubmit = true
            SERVICE.changePassword(that.form, (res) => {
                if (res.code == 0) {
                    that.isDisabled = true
                    ElementUI.Message({
                        message: '保存成功，请重新登录',
                        type: 'success'
                    })
                    setTimeout(function(){
                        localStorage.setItem('mhjboss_token', '')
                        window.location = '/login'
                    }, 3000)
                } else {
                    ElementUI.Message({
                        message: res.msg,
                        type: 'error'
                    })
                }
                that.isSubmit = false
            })
            
        }
    }
}
