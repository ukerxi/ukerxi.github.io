/**
 * Created by ukerxi
 */
// 全局数据
var pageData ={
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
            title: "常用css样式集合",
            text:"简单收集一些常用的样式，包含特殊用法，水平垂直居中布局，浏览器兼容",
            src: "http://note.youdao.com/noteshare?id=8b426b675f67301b2f86f3856229a952&sub=53A5F5C1B85C4C838FDA1C1F36E7FA35"
        },
        {
            title: "收集一些比较有用的网站合集",
            text:"包含不同领域的学习资料",
            src: "http://note.youdao.com/noteshare?id=49da3042663052a452f8232c494c647f&sub=A6C6451E466C4648A8E2C64021054EFB"
        },
        {
            title: "一篇点击事件穿透的解析文章",
            text:"此篇文章是引用的，由于收藏过久已找不到原作者了-_-",
            src: "http://note.youdao.com/noteshare?id=c7e48656be0ce6c907305558f4854976&sub=ECF28DC9B663439BBA168695C1A91914"
        },
        {
            title: "http缓存机制",
            text:"对于理解好http缓存，可以解决一大部分为什么我的手机明明可以，但是到用户手中就不行的坑",
            src: "http://note.youdao.com/noteshare?id=a85a13c3c6aca11dbe0d4140057cd4aa&sub=D2AB8C8665EC4FE7A55C9C188B5146BF"
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
            title: "css-flex布局",
            text:"各种flex兼容写法",
            src: "http://note.youdao.com/noteshare?id=f8f0d74a00b442ffc0b5878032f15ab1&sub=41097E78310C43C5B93E4CADBEBE4441"
        },
        {
            title: "chrome调试基础",
            text:"这时前端的起步阶段，看看你的控制台输出。。。",
            src: "http://note.youdao.com/noteshare?id=af6bb470c578084e660ad8f05e250567&sub=44E9C81429FA408C9BEC41A3617EC81D"
        },
        {
            title: "Fiddler抓包",
            text:"包含fiddler的基本使用，手机抓包步骤",
            src: "http://note.youdao.com/noteshare?id=3be0935020c00fd9d0e16b04af906d38&sub=02491A1A97E1457682DE893C8221ADD0"
        },
        {
            title: "nginx本地开配置",
            text:"设置本地资源转向，本地开发时很有用",
            src: "http://note.youdao.com/noteshare?id=b35b5163f2c668eca211eb5fb9416996&sub=BBFDD79440EF48B8B357099A3F319A5C"
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
        },
        {
            title: "通用页面模板",
            text:"包含移动端及pc端，主要用于兼容及设置一些模式",
            src: "http://note.youdao.com/noteshare?id=ff0e19a66786dad476eb85a2f2ad6a88&sub=E974574FBCAD4F098910E26E36CC6AC8"
        }
    ]
};

// 全局处理方法
var pageFn = {
    // 获取列表信息
    getList: function(page){
        var _page = page ? (page-1)*6 : 0,
            data = pageData.items.slice(_page, _page + 6),
            list_html = $.template(document.getElementById("tpl_list").text).render({records: data});
        // 插入渲染数据
        $("#render_list").html(list_html);
    }
};

// 具体逻辑处理
$(function(){
    // 实例分页渲染数据
    var pager = new Pagination("#pagination_list", function (page, that) {
        pageFn.getList(page);
        that.renderPage(pageData.items.length, page);
    }, {limit: 6,is_need_init: true});

    // 绑定跳转事件
    $("#render_list").on("click", ".j-item", function(){
        window.location = $(this).data("src");
    });
});