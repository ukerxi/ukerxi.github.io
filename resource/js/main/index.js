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
                    title: "js注意事项——作用域&执行环境",
                    text:"javaScript以其灵活性而著称，但是事物都具有两面性，灵活的同时，会带来一些难于理解的行为，所以列举了一些注意事项",
                    src: "http://note.youdao.com/noteshare?id=02d974c831cb8daa622265f5e38ef7f5&sub=8EDA10DE5FBA40279A0AC38A2BA7F118"
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
    var contextId = document.getElementById("view_canvas");
    // 配置信息
    var gameConfig = {
        imgItems: null, // 缓存图片
        items: [] // 绘制元素
    };
    // canvas 动画操作
    if(CommonUtils.checkCanvas()){
        // 先加载图片
        gameConfig.imgItems = CommonUtils.loadImg({
            windmillRed: "/resource/images/main/index/windmill-red.png",
            windmillBlue: "/resource/images/main/index/windmill-blue.png"
        }, gameLoop);
    }
    // 动画循环
    function gameLoop() {
        // 绘制画布
        drawScreen();
        requestAnimationFrame(gameLoop);
    }
    // 绘制动画
    function drawScreen() {
        var context = contextId.getContext("2d");
        var len = gameConfig.items.length;
        if(len === 0){
            gameConfig.items.push(new GameItem("windmillRed", gameConfig.imgItems.windmillRed, 4, 650,125, 50, 50));
            gameConfig.items.push(new GameItem("windmillBlue", gameConfig.imgItems.windmillBlue, 2, 714, 80, 60, 60));

            // 添加鼠标滑过事件
            CommonUtils.addEventHandle(document.getElementById("wrap_canvas"), "mousemove", function(event){
                handleWind (event);
            });
            // 添加鼠标停留事件
            CommonUtils.addEventHandle(document.getElementById("wrap_canvas"), "onmouseover", function(event){
                handleWind (event);
            });

            // 模拟风额效果
            function handleWind (event){
                var _event = CommonUtils.getEvent(event);
                var offsetWidth = document.getElementById("wrap_canvas").offsetWidth;
                if(_event && _event.clientX){
                    if((offsetWidth - _event.clientX <= 360) && (offsetWidth -_event.clientX >= 290)){
                        if(_event.clientY >= 105 && _event.clientY <= 190 && gameConfig.items[0].speed <40){
                            gameConfig.items[0].speed += 2;
                        }
                    }
                    if((offsetWidth - _event.clientX <= 290) && (offsetWidth -_event.clientX >= 220)){
                        if(_event.clientY >= 60  && _event.clientY <= 150 && gameConfig.items[1].speed <40){
                            gameConfig.items[1].speed  += 2;
                        }
                    }
                }
            }

        }
        // 开始绘制
        context.clearRect(0, 0, 800, 200);
        context.fillStyle ="#999";
        context.fillRect(673,150, 4, 100);
        context.fillRect(740,120, 4, 100);
        for(var i=0, len = gameConfig.items.length; i<len; i++){
            if( gameConfig.items[i].speed > gameConfig.items[i].originSpeed){
                gameConfig.items[i].speed --;
            }else if(gameConfig.items[i].speed < gameConfig.items[i].originSpeed){
                gameConfig.items[i].speed = gameConfig.items[i].originSpeed
            }
            gameConfig.items[i].range  += gameConfig.items[i].speed;
            context.save();
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.translate(gameConfig.items[i].px +0.5*gameConfig.items[i].width, gameConfig.items[i].py +0.5*gameConfig.items[i].height); // 移动原点到中心位置
            context.rotate(gameConfig.items[i].range* Math.PI/180); // 设置旋转
            context.drawImage(gameConfig.items[i].img, -0.5*gameConfig.items[i].width, -0.5*gameConfig.items[i].height,gameConfig.items[i].width, gameConfig.items[i].height);
            context.restore();
        }
    }
    // 构造绘制类
    function GameItem(id, img, speed, px, py, width, height){
        this.id = id;
        this.speed = speed;
        this.originSpeed = speed;
        this.range = 0;
        this.img = img;
        this.px = px;
        this.py = py;
        this.width = width;
        this.height = height;
    }
});



