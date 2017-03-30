/**
 * Created by ukerxi.
 */
// 监听文档加载完成
CommonUtils.addEventHandle(window, "load", function(){
    // 实例化列表vue实例
    var vList = new Vue({
        el: "#list_article",
        data: {
            items:[
                {
                    title: "设计模式（一）：继承模式",
                    text:"介绍javaScript中，面向对象编程特性，及基本的继承模式，类式继承、构造函数继承、组合继承等模式",
                    src: "http://note.youdao.com/noteshare?id=0add5cfc623fc0f06c6f59c359dc231c&sub=D45C1938E52E404DA6F7E05540DC42F5"
                },
                {
                    title: "命名空间使用",
                    text:"多人设计一个系统时，通常会造成，命名重复，覆盖等问题，这时可以采用一些命名空间解决问题",
                    src: "http://note.youdao.com/noteshare?id=2b2ab249799080b716000354db0a7da9&sub=040B50D1400C4B93AD5544839D067B99"
                },
                {
                    title: "简单的沙箱模式实现",
                    text:"只是粗略的实现，后续要改进",
                    src: "http://note.youdao.com/noteshare?id=28bfba7f0d34400206f66c0edafcae07&sub=1D23B9BBD23A437691450486153962FA"
                },
                {
                    title: "git结合webstorm使用",
                    text:"介绍基本的git操作指令，同时介绍配合webstorm使用，创建github项目",
                    src: "http://note.youdao.com/noteshare?id=2ea9de535f27a6983e4b8487a1f955eb&sub=A18FFCC724574905B0594A844571410D"
                },
                {
                    title: "读jQuery源码的收获",
                    text:"每过一段时间，读一次，根据自己的对于js的理解的加深，又会有不同的收获",
                    src: "http://note.youdao.com/noteshare?id=82819da71a1372b1eae89beceaaaba7a&sub=13A76EB75673454D9BE41B7677F235E6"
                },
                {
                    title: "哪一天？开始接触node.js",
                    text:"只是简单的记录一下自己接触node.js的历程",
                    src: "http://note.youdao.com/noteshare?id=a5c25298ece5981adf05f3b4bd09e647&sub=6810F77B20324EE38CAF557F044735F1"
                },
                {
                    title: "css3动画样式集合",
                    text:"稍微整理了一下css3动画，包含兼容写法",
                    src: "http://note.youdao.com/noteshare?id=616c884538e35c7cb48eae632eca707d&sub=09000D064AFC442A9D33BAAC2449FB27"
                },
                {
                    title: "移动端开发bug积累",
                    text:"包含一些开发过程中涉及的移动端bug集合，逐步累积",
                    src: "http://note.youdao.com/noteshare?id=dda3a11d29e6723397ec5027fd062524&sub=25BD6616843D4D85B8AB8B49547396EE"
                },
                {
                    title: "简单部署tomcat",
                    text:"非常简单的部署",
                    src: "http://note.youdao.com/noteshare?id=d0763b4ea99d99da8644228f986c48c9&sub=0335B5D8CF62455A98827194E375F66E"
                }
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

var test = {};
var test1 = [];

console.log(test instanceof Object);
console.log(test1 instanceof Object);





