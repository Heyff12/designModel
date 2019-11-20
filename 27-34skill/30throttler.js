//--------------------节流(Throttler)模式--------------------------------------------------------------------------------------------
console.log('---------节流(Throttler)模式------------------------------------------------------------------------------------------------------------------------------------')
//节流器
var throttle = function(){
    //获取第一个参数
    var isClear = arguments[0],fn;
    //如果第一个参数是boolean类型，那么第一个参数表示是否清除计时器
    if(typeof isClear === 'boolean'){
        //第二个参数是函数
        fn = arguments[1]
        //函数的计时器句柄存在，则清除计时器
        fn.__throttleID && clearTimeout(fn.__throttleID)
    }else{
        //通过计时器延迟函数的执行
        //第一个参数是函数
        fn = isClear
        //第二个参数是函数执行时的参数
        var param = arguments[1]
        //对执行时的参数适配默认值，
        var p  = extend({
            context:null,//执行函数执行时的作用域
            args:[],//执行函数执行时的相关参数（IE下要为数组）
            time: 300,//函数延迟执行的时间
        },param)
        //清除执行函数计时器句柄
        arguments.callee(true,fn)
        //为函数绑定计时器句柄，延迟执行函数
        fn.__throttleID = setTimeout(function(){
            fn.apply(p.context,p.args)
        },p.time)
    }
    
}
//----使用--onscroll-
function moveScroll(){
    var top = $(document).scrollTop();
    $('#vack').animate({top:top+300},400,'easeOutCubic')
}

$(window).on('scroll',function(){
    throttle(moveScroll)
})









