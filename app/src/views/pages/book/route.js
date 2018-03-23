
import Book from './components/book/book.vue'
import BookEdit from './components/book_edit/book_edit.vue'

export default [
    {
        path: '/',
        component: Book
    },
    {
        path: '/book_edit',
        component: BookEdit
    }
    // { 
    //     path: '/', 
    //     redirect: to => {
    //         window.location.href = '/user'
    //         return false
    //     }
    // }
]


