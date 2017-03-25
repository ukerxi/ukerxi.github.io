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
    }
};