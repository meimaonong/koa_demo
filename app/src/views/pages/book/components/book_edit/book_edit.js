
import * as SERVICE from 'services/actions/book.action'

export default {
    data() {
        return {
            book: {
                
            },
            book_imgs: [],
            book_intro_imgs: [],
            dialogImageUrl1: '',
            dialogVisible1: false,

            dialogImageUrl2: '',
            dialogVisible2: false,
        }
    },
    methods: {
        // 获取书籍详情
        getBook(book_id) {
            const that = this
            SERVICE.getBook({
                book_id
            }, (res) => {
                that.book = res.data
                that.book_imgs = that.book.book_imgs_list.map((item) => {
                    return Object.assign(item, {name: item.img_name, url: '/' + item.img_url + item.img_name})
                })
                that.book_intro_imgs = that.book.book_intro_imgs_list.map((item) => {
                    return Object.assign(item, { name: item.img_name, url: '/' + item.img_url + item.img_name })
                })
            })
        },

        onSubmit() {
            const that = this
            that.book.book_imgs = that.book_imgs
            that.book.book_intro_imgs = that.book_intro_imgs
            SERVICE.saveBook(that.book, (res) => {
                that.$router.push({
                    path: "/",
                })
            })
        },

        handleRemove1(file, fileList) {
            this.book_imgs = fileList;
        },
        handlePictureCardPreview1(file) {
            this.dialogImageUrl1 = file.url;
            this.dialogVisible1 = true;
        },

        handleRemove2(file, fileList) {
            this.book_intro_imgs = fileList;
        },
        handlePictureCardPreview2(file) {
            this.dialogImageUrl2 = file.url;
            this.dialogVisible2 = true;
        },


        handleHeadSuccess1(res, file) {
            const that = this
            that.book_imgs.push({
                name: res.data.img_name,
                url: '/' + res.data.img_url + res.data.img_name,
                img_name: res.data.img_name,
                img_url: res.data.img_url,
                img_width: res.data.img_width,
                img_height: res.data.img_height,
                img_ratio: res.data.img_ratio,
            })
            //this.imageUrl = URL.createObjectURL(file.raw);
        },
        handleHeadSuccess2(res, file) {
            const that = this
            that.book_intro_imgs.push({
                name: res.data.img_name,
                url: '/' + res.data.img_url + res.data.img_name,
                img_name: res.data.img_name,
                img_url: res.data.img_url,
                img_width: res.data.img_width,
                img_height: res.data.img_height,
                img_ratio: res.data.img_ratio,
            })
            //this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeHeadUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 0.5;

            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 500KB!');
            }
            return isLt2M;
        }
    },
    mounted() {
        const that = this
        if (that.$route.query.book_id) {
            this.getBook(that.$route.query.book_id)
        }
        
    }
}