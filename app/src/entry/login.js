// 引导程序
function bootstrap(App) {

    // ElementUI
    Vue.use(ElementUI)

    // VueResource
    Vue.use(VueResource) 

    // Vue.http.options.emulateJSON = false

    new Vue({
        el: '#app',
        render: h => h(App)
    })

}


export default function(App) {
    bootstrap(App)
}
    