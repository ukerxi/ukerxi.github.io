/**
 * 分页类
 * @constructor
 * @param {string} selector - 需要进行包裹分页的选择器
 * @param {function} callback - 分页执行会回调函数
 * @param {object} option - 设置分页的配置参数
 * @returns {number} page - 回调函数中默认进行传入一个page参数，表示当前进行加载的页码（注意使用时需要进行(page-1)*limit 才是之前使用的start值）
 * @author 前人栽树，后人砍树而已，搬砖不留名。。。
 * @version 1.0
 *
 */

(function ($, factory) {
    // 环境依赖，如果没有则提示需要引入
    if (typeof $ === "function") {
        factory($);
    } else {
        throw new Error("this plug requires a jQuery environment");
    }

}(window.jQuery || window.Zepto, function ($) {
    // 处理逻辑
    var _bindItems = []; // 保存已经绑定的分页的选择器，防止重新绑定事件（已经提供兼容方案，只进行提示重复绑定，实际回调时会根据最新绑定的callback）
    function _pager(selector, callback, option) {
        // 兼容判断（防止流氓的调用方式）
        if (!(this instanceof _pager)) {
            return new _pager(selector, callback, option);
        }
        // 默认参数
        var _option = {
            limit: 8, // 每页显示的条数
            current_page: 1, // 当前显示活动的页码
            total_page: 0, // 当前显示活动的页数
            total_count: 0, // 总的页数
            num_page_middle: 6, // 当有多页数量时，控制当前页面中间显示的条数（多余页数使用ellipse_text 的内容替代）
            num_page_side: 2, // 当有多页数量时，前后显示的条数（多余页数使用ellipse_text 的内容替代）
            prev_text: "&lt;", // 上页按钮的显示的内容
            next_text: "&gt;", // 下一页按钮显示的内容
            link_text: "go", // 跳转按钮显示的内容
            ellipse_text: "...", // 中间页面多时显示的内容
            pager_align: "right", // 分页显示的对其方式，center 居中，right 右对齐， left 左对齐
            prev_next_show: true, // 是否显示上一页及下一页
            link_show: false, // 是否显示跳转按钮
            total_page_show: true, // 是否显示总共条数
            is_need_init: false, // 是否需要进行自动初始化
            callback: function (page, pagination) { // 定义回调
                return false;
            }
        };

        // 初始化配置项
        this.selector = selector || "body"; // 分页包裹的选择器(必须传递,否则使用body)
        // 提供参数重载（类似java的重载方法，根据传递不同的参数进行变更配置）
        if (arguments.length == 3) {
            this.option = $.extend(_option, option || {});
            this.option.callback = callback;
        } else if (arguments.length == 2) {
            if (typeof arguments[1] == "function") {
                this.option = _option;
                this.option.callback = callback;
            } else if (typeof arguments[1] == "object") {
                this.option = $.extend(_option, arguments[1]);
            }
        } else {
            this.option = $.extend(_option, option || {});
        }

        // 初始化绑定数据
        this.init();

        // 判断是否要进行手动设置初始化
        if(this.option.is_need_init){
            if(typeof this.option.callback == "function"){
                this.option.callback(this.option.current_page, this);
            }
        }
    }

    // 定义继承的方法
    _pager.prototype = {
        // 初始化函数
        init: function () {
            for (var i = 0; i < _bindItems.length; i++) {
                // 判断是否已经进行绑定过的选择器，防止重复绑定（本插件只支持当个分页拥有唯一的选择器）
                if (this.selector == _bindItems[i]) {
                    this.showTips("重复绑定分页id");
                }
            }
            _bindItems.push(this.selector); // 将已经绑定的选择器压入栈中
            this.bindEvent(); // 绑定事件
        },
        // 事件处理
        bindEvent: function () {
            var that = this;
            // 点击页码
            $(that.selector).off("click", ".j-page-link");
            $(that.selector).on("click", ".j-page-link", function () {
                var page = Number($(this).text());
                $(that.selector).find(".j-page-link").removeClass("active"); // 移除当前的活动页码样式
                $(this).addClass("active");
                that.option.current_page = page; // 设置当前页码
                // 调用一次重新渲染分页（只是以当前的总数，如果总数有变更的必须重新在回调中进行调用）
                that.renderPage(that.option.total_count, that.option.current_page);
                if (typeof that.option.callback == "function") {
                    if(that.option.is_need_init){
                        that.option.callback(that.option.current_page, that);
                    }else{
                        that.option.callback(that.option.current_page);
                    }
                }
            });
            // 点击上页
            $(that.selector).off("click", ".j-page-pre");
            $(that.selector).on("click", ".j-page-pre", function () {
                var page = that.option.current_page - 1;
                that.option.current_page = page < 0 ? 0 : page;
                // 调用一次重新渲染分页（只是以当前的总数，如果总数有变更的必须重新在回调中进行调用）
                that.renderPage(that.option.total_count, that.option.current_page);
                if (typeof that.option.callback == "function") {
                    if(that.option.is_need_init){
                        that.option.callback(that.option.current_page, that);
                    }else{
                        that.option.callback(that.option.current_page);
                    }
                }
            });
            // 点击下一页
            $(that.selector).off("click", ".j-page-next");
            $(that.selector).on("click", ".j-page-next", function () {
                var page = that.option.current_page + 1;
                that.option.current_page = page > that.option.total_page ? that.option.total_page : page;
                // 调用一次重新渲染分页（只是以当前的总数，如果总数有变更的必须重新在回调中进行调用）
                that.renderPage(that.option.total_count, that.option.current_page);
                if (typeof that.option.callback == "function") {
                    if(that.option.is_need_init){
                        that.option.callback(that.option.current_page, that);
                    }else{
                        that.option.callback(that.option.current_page);
                    }
                }
            });

            // 点击跳转
            $(that.selector).off("click", ".j-page-go");
            $(that.selector).on("click", ".j-page-go", function () {
                var page = Number($(this).siblings(".j-page-go-val").val());
                that.option.current_page = page > that.option.total_page ? that.option.total_page : page;
                // 调用一次重新渲染分页（只是以当前的总数，如果总数有变更的必须重新在回调中进行调用）
                that.renderPage(that.option.total_count, that.option.current_page);
                if (typeof that.option.callback == "function") {
                    if(that.option.is_need_init){
                        that.option.callback(that.option.current_page, that);
                    }else{
                        that.option.callback(that.option.current_page);
                    }
                }
            });
        },
        // 插件提示信息控制（可根据当前使用的场景进行手工设置，默认使用console.log）
        showTips: function (text) {
            window.console && window.console.log(text);
        },
        // 渲染分页
        renderPage: function (totalCount, page) {
            // 可以使用进行设置显示的页码，如果不设置则默认是显示当前的对象的页码
            var _page_total = 0;
            if (typeof totalCount != "undefined") {
                _page_total = Math.ceil(totalCount / this.option.limit); // 总的页码数
                this.option.total_page = _page_total;
                this.option.total_count = totalCount;
            } else {
                _page_total = this.option.total_page;
            }
            
            // 检测页码数，如果为零则不显示
            if(_page_total <= 1){
            	 // 插入页面显示
                $(this.selector).html("");
                return false;
            }

            if (typeof page != "undefined" && page <= _page_total) {
                this.option.current_page = parseInt(page);
            }
            var _page_current_page = this.option.current_page;
            var _page_num_side = this.option.num_page_side;
            var _page_num_middle = this.option.num_page_middle;
            var _page_middle_half = Math.ceil(_page_num_middle / 2);
            var _page_upper_limit = _page_total - _page_num_middle;
            var _page_middle_start = _page_current_page > _page_middle_half ? Math.max(Math.min(_page_current_page - _page_middle_half, _page_upper_limit), 0) : 0;
            var _page_middle_end = _page_current_page > _page_middle_half ? Math.min(_page_current_page + _page_middle_half, _page_total) : Math.min(_page_num_middle, _page_total);
            var _pageItems = []; // 包含页码html的数组

            _pageItems.push('<div class="pagination-warp" style="text-align:'+ this.option.pager_align + ';">');

            // 显示总数
            if (this.option.total_page_show) {
                _pageItems.push('<div class="total-page">显示<span class="total-page-num">'+ this.option.limit+'</span>条/页&nbsp;&nbsp;共<span class="total-page-record">' + totalCount + '</span>条记录</div>');
            }
            // 显示上一页
            if (this.option.prev_next_show) {
                if (_page_current_page == 1) {
                    _pageItems.push('<span class="pre">' + this.option.prev_text + '</span>');
                } else {
                    _pageItems.push('<span class="pre j-page-pre">' + this.option.prev_text + '</span>');
                }
            }
            // 定义调用构造内部分页的函数
            function formatPage(page, currentPage) {
                var _currentPage = page + 1;
                if (_currentPage == currentPage) {
                    _pageItems.push('<span class="link j-page-link active">' + _currentPage + '</span>');
                } else {
                    _pageItems.push('<span class="link j-page-link">' + _currentPage + '</span>');
                }

            }

            // 产生起始点
            if (_page_middle_start > 0 && _page_num_side > 0) {
                var _page_end = Math.min(_page_num_side, _page_middle_start);
                for (var i = 0; i < _page_end; i++) {
                    formatPage(i, _page_current_page);
                }
                if (_page_num_side < _page_middle_start && this.option.ellipse_text) {
                    _pageItems.push('<span class="ellipse">' + this.option.ellipse_text + '</span>');
                }
            }

            // 产生内部的分页的页码
            for (var i = _page_middle_start; i < _page_middle_end; i++) {
                formatPage(i, _page_current_page);
            }

            // 产生结束点
            if (_page_middle_end < _page_total && _page_num_side > 0) {
                if (_page_total - _page_num_side > _page_middle_end && this.option.ellipse_text) {
                    _pageItems.push('<span class="ellipse">' + this.option.ellipse_text + '</span>');
                }
                var _page_begin = Math.max(_page_total - _page_num_side, _page_middle_end);
                for (var i = _page_begin; i < _page_total; i++) {
                    formatPage(i, _page_current_page);
                }
            }
            //  显示下一页
            if (this.option.prev_next_show) {
                if (_page_current_page == _page_total) {
                    _pageItems.push('<span class="next">' + this.option.next_text + '</span>');
                } else {
                    _pageItems.push('<span class="next j-page-next">' + this.option.next_text + '</span>');
                }
            }
            // 显示跳转
            if (this.option.link_show) {
                _pageItems.push('<span class="go j-page-go">' + this.option.link_text + '</span><input  type="text" class="j-page-go-val" value="' + this.option.current_page + '">');
            }
            _pageItems.push('</div>');

            // 插入页面显示
            $(this.selector).html(_pageItems.join(""));
        },
        // 提供外部进行调用获取当前的页面
        getPage: function(){
            return this.option.current_page;
        },
        // 提供外部进行调用获取当前的页面
        getTotalCount: function(){
        	return this.option.total_count;
        },
        // 提供外部进行调用重新初始化
        setPage: function(page){
        	if(typeof this.option.callback == "function"){
                this.option.callback(this.option.current_page, this);
            }
        }
    };

    // 使用全局对象返回构造函数，并形成闭包
    window.Pagination = _pager;
}));

/*$(function () {

    *//**
     *  使用参数说明；插件的默认参数
     *
     * *//*
    var defaultOption = {
        limit: 10, // 每页显示的条数
        current_page: 1, // 当前显示活动的页码
        total_page: 0, // 当前显示活动的页数
        num_page_middle: 10, // 当有多页数量时，控制当前页面中间显示的条数（多余页数使用ellipse_text 的内容替代）
        num_page_side: 2, // 当有多页数量时，前后显示的条数（多余页数使用ellipse_text 的内容替代）
        prev_text: "&lt;", // 上页按钮的显示的内容
        next_text: "&gt;", // 下一页按钮显示的内容
        link_text: "go", // 跳转按钮显示的内容
        ellipse_text: "...", // 中间页面多时显示的内容
        pager_align: "right", // 分页显示的对其方式，center 居中，right 右对齐， left 左对齐
        prev_next_show: true, // 是否显示上一页及下一页
        link_show: true, // 是否显示跳转按钮
        total_page_show: true, // 是否显示总共条数
        is_need_init: false, // 是否需要进行自动初始化
        callback: function (page, pagination) { // 定义回调
            return false;
        }
    };

    *//**
     * 第一种使用方法，最简单的例子直接已经知道总数然后使用时直接进行调用即可
     *
     * *//*
    var pager = new Pagination("#test", function (page) {
        console.log("第一种测试用例--当前页码：" + page);
        pager.renderPage(100, page);
    }, defaultOption);
    pager.renderPage(100); // 已经知道总数的情况下直接进行渲染分页，不想进行调用一次回调


    *//**
     * 第二种使用方法，直接进行传递回调的形式进行初始化，但是必须进行设置参数进行自动初始化执行第一次调用；
     * 此时回调中会进行传递一个实例化的对象，你可以根据这个对象进行调用设置更新页码
     *
     * *//*

    var _option = {
        current_page: 3,// 可以进行设置当前的页码
        is_need_init: true // 是否需要进行自动初始化（必须的参数）
    };
    var pager1 = new Pagination("#test1", function (page, pagination) {
        console.log("第二种测试用例--当前页码：" + page);
        pagination.renderPage(100, page);
    }, _option);


    *//**
     * 第三种使用方法，使用变量进行保存实例化的值，当再次进入回调时，使用或判断需不需要进行实例化，需进行手动调用第一次；
     * 然后在回调中利用实例化对象进行设置更新页码
     *
     * *//*
    var test = ""; // 可以利用全局变量进行实例化分页，以便不用再次进行绑定事件（当然这个插件可以理解所有的不可理喻，你可以直接进行多次实例化都没关系）
    var pager2 = function (page) {
        test = test || new Pagination("#test2", pager2);
        console.log("第三种测试用例--当前页码：" + page);
        test.renderPage(500, page);
    };
    pager2(1); // 手动第一次调用

    *//**
     * 第四种使用方法，使用变量进行保存实例化的值，当再次进入回调时，重新实例化；
     * 然后在回调中利用实例化对象进行设置更新页码（和第三种方法差不多，但是建议使用第三种方法进行调用，这将会带来不必要的消耗）
     *
     * *//*
    var pager3 = function (page) {
        var test = new Pagination("#test3", pager3);
        console.log("第四种测试用例--当前页码：" + page);
        test.renderPage(100, page);
    };
    pager3(2); // 手动第一次调用
});
*/
