
export default (app) => {
    // 注册一个全局自定义指令 `v-focus`
    app.directive('focus', {
        mounted(el) {
            // 聚焦元素
            el.focus()
        },
    })
}
