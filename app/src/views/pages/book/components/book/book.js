
import * as SERVICE from 'services/actions/book.action'

export default {
    data() {
        return {
            list: null,
            current_page: 1,
            pages: 0,
        }
    },
    methods: {
        // 获取书籍列表
        getBooklist(page) {
            var vm = this
            SERVICE.getBossBooklist({page}, (res) => {
                vm.list = res.data.list
                vm.current_page = res.data.current_page
                vm.pages = res.data.pages
            })
        },
        // 翻页
        pageChange() {
            var vm = this
            vm.getBooklist(vm.current_page)
        },
        //
        add() {
            const that = this
            that.$router.push({
                path: "/book_edit",
            })
        },
        //
        goEdit(book_id) {
            const that = this
            that.$router.push({
                path: "/book_edit",
                query: {
                    book_id
                }
            })
        }
    },
    mounted() {
        this.getBooklist(1)
    }
}