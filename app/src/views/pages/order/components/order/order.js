import * as SERVICE from 'services/actions/order.action'

export default {
    data() {
        return {

            options: [{
                value: '',
                label: '全部'
            },{
                value: 2,
                label: '待发货'
            }, {
                value: 3,
                label: '待收货'
            }, {
                value: 1,
                label: '待付款'
            }, {
                value: 0,
                label: '已完成'
            }],
            value: '',

            sel_id: '',
            sel_receive_id: '',
            express: '',

            list: null,
            current_page: 1,
            pages: 0,
        
        }
    },
    methods: {
        // 获取作品列表
        getOrderlist(param) {
            var that = this
            SERVICE.getBossOrderlist({...param}, (res) => {
                that.list = res.data.list
                that.current_page = res.data.current_page
                that.pages = res.data.pages
            })
        },
        // 翻页
        pageChange() {
            var vm = this
            console.log(vm.current_page)
            vm.getOrderlist({
                page: vm.current_page,
                order_status: vm.value,
            })
        },
        selectChange() {
            const vm = this
            // console.log('selectChange')
            // vm.pageChange()
            if (vm.current_page == 1) {
                vm.pageChange()
            } else {
                vm.current_page = 1
            }
        },
        getTotal(items) {
            let total = 0;
            items.map(item => {
                total = (Number(total) + Number(item.book.book_price) * Number(item.book_num)).toFixed(2)
            })
            return total
        },

        // 打回
        back(index, obj) {
            var that = this
            that.sel_id = obj.order_id
            that.express = ''
        },

        // 取消
        cancel(index, obj) {
            var that = this
            that.sel_id = ''
        },
        // 确定
        confirm(index, obj) {
            var that = this
            if (!that.express) {
                that.$message({
                    type: 'error',
                    message: '请输入原因'
                })
                return
            }
            that.sel_id = ''
            SERVICE.send({
                express: that.express,
                order_id: obj.order_id
            }, (res) => {
                that.getOrderlist()
                that.$message({
                    type: 'success',
                    message: '已发货'
                })
            })
            
        },

        // 通过
        receive(index, obj) {
            var vm = this
            vm.sel_receive_id = obj.order_id
        },

        // 取消
        receive_cancel(index, obj) {
            var vm = this
            vm.sel_receive_id = ''
        },
        // 确定
        receive_confirm(index, obj) {
            var that = this
            that.sel_receive_id = ''
            SERVICE.receive({
                order_id: obj.order_id
            }, (res) => {
                that.getOrderlist()
                that.$message({
                    type: 'success',
                    message: '完成收货'
                })
            })
        },
    },
    mounted() {
        const that = this
        that.getOrderlist()
    }
}
