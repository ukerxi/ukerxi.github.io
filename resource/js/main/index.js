/**
 * Created by ukerxi.
 */
// 监听文档加载完成
CommonUtils.addEventHandle(window, "load", function(){
    // 实例化列表vue实例
    var Vlist = new Vue({
        el: "#list_article",
        data: {
            items:[
                {title: "测试", text:"fjsfsfsafsfs", link: "/page/main/technology/170325_js_01.html"},
                {title: "测试", text:"fjsfsfsafsfs",link: "/page/main/technology/170325_js_02.html"}
            ]
        },
        methods: {
            linkPage: function (event) {
                // 跳转导航
                window.location = event.target.parentNode.getAttribute("data-src");
            }
        }
    });
});