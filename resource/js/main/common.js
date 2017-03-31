/**
 * Created by ukerxi
 * 通用插件函数
 */

/**
 * @name 兼容事件绑定
 * @param element DOM对象
 * @param type 事件类型
 * @param handler 事件处理函数
 */
var CommonUtils = {
    addEventHandle: function (element, type, handler) {
        if(element.addEventListener){
            element.addEventListener(type, handler, false);
        }else if(element.attachEvent){
            element.attachEvent("on"+type, handler);
        }else{
            element["on"+type] = handler;
        }
    },
    getEvent: function(event){
        return event ? event : window.event;
    },
    // 检测canvas支持情况
    checkCanvas: function(){
        return !!document.createElement("canvas").getContext;
    },
    // 检测加载图片事件
    loadImg: function(items, callback){
        var _count = 0;
        if(items instanceof Object){
            for(var key in items){
                _count ++;
                items[key] = load(items[key]);
            }
            return items;
        }else if(items && typeof items === "string"){
            _count = 1;
            return load(items);
        }
        function load(src){
            var F = new Image();
            F.onload = function(){
                _count --;
                if(_count <= 0){
                    if(typeof callback === "function"){
                        callback();
                    }
                }
            };
            F.src = src;
            return F;
        }
    }
};

// 兼容requestAnimationFrame
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    // 兼容setTimeout
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());