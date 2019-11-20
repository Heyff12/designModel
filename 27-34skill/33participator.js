//--------------------参与者（participator）模式--------------------------------------------------------------------------------------------
console.log(
    "---------参与者（participator）模式--------------------------------------------------------------------------------------------"
  );
//绑定函数
function bind0(fn,context){
    //闭包返回新函数
    return function(){
        return fn.apply(context,arguments)
    }
}
//测试对象
var demoObj = {
    title:'这是一个例子'
}

function demoFn(){
    console.log(arguments)
    console.log(this.title)
}

var bindFn0 = bind0(demoFn,demoObj)
demoFn()  
//Arguments [callee: ƒ, Symbol(Symbol.iterator): ƒ]
//undefined
bindFn0(33)   
//Arguments [33, callee: ƒ, Symbol(Symbol.iterator): ƒ]
//这是一个例子

//柯里化函数----------------------------
function bind(fn,context){
    console.log('---bind--',arguments)
    var Slice = Array.prototype.slice
    var args = Slice.call(arguments,2)
    //闭包返回新函数
    return function(){
    console.log('---bind-function-',arguments)

        var addArgs = Slice.call(arguments)
        var allAgrs = addArgs.concat(args)
        return fn.apply(context,allAgrs)
    }
}

//测试对象
var demoData1 = {
    title:'这是第一组数据'
}
var demoData2 = {
    title:'这是第二组数据'
}

var bindFn = bind(demoFn,demoData1)
bindFn()  
