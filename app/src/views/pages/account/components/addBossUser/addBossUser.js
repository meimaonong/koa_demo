import * as SERVICE from 'services/actions/account.action'

export default {
    data() {
        return {
            form: {
                boss_user_name: '',
                tel: '',
            },
            isSubmit: false,
            isDisabled: false
        }
    },
    methods: {
        // 添加boss用户
        addBossUser() {
            const that = this
            that.isSubmit = true
            that.isDisabled = true
            SERVICE.addBossUser(that.form, (res) => {
                if (res.code == 0) {
                    ElementUI.Message({
                        message: '保存成功',
                        type: 'success'
                    })
                } else {
                    ElementUI.Message({
                        message: res.msg,
                        type: 'error'
                    })
                }
                that.isSubmit = false
                that.isDisabled = false
            })

        }
    }
}
