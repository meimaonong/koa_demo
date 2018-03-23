
// 引导程序
function bootstrap(App, routes) {

    // 配置路由
    Vue.use(VueRouter)

    // ElementUI
    Vue.use(ElementUI)

    // VueResource
    Vue.use(VueResource)

    // 合并路由配置
    const router = new VueRouter({
        routes
    })

    Vue.http.interceptors.push((request, next) => {

        // 判断是否登录
        const token = localStorage.getItem('x_token')

        if (token) {
            request.headers.set('access-token', token)
        } else {
            window.location.href = "/login"
        }

        next((response) => {
            if (response.body.status == 401) {
                window.location.href = "/login"
                return false
            } else {
                return response
            }

        })
    })

    // 判断是否有token
    const token = localStorage.getItem('x_token')
    if (token) {

        Vue.http.post('/ajax/route?func=/v2/boss-user/check-boss-login').then((response) => {

            if(response.body.code === 0) {
                new Vue({
                    el: '#app',
                    router,
                    render: h => h(App)
                })
            } else {
                window.location.href = "/login"
            }

        })


    } else {
        window.location.href = "/login"
    }

}


export default function(App, routes) {
    bootstrap(App, routes)
}
    