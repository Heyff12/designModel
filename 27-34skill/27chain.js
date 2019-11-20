//--------------------链模式--------------------------------------------------------------------------------------------
console.log('---------链模式-------------------------------------------------------------------------------------------------------------------')
//寻找中间变量代替prototype 方法
var A = function(){
    return A.fn
}
A.fn = A.prototype = {
    length: 2,
    size: function(){
        return this.length
    }
}
//获取元素
var A = function(selector){
    return A.fn.init(selector)
}
A.fn = A.prototype = {
    init: function(selector){
        this[0] = document.getElementById(selector)
        this.length = 1
        return this
    },
    length: 2,
    size: function(){
        return this.length
    }
}
var demo = A('demo')
console.log(demo)   //{0: div#demo, length: 1, init: ƒ, size: ƒ}
console.log(demo.size())   //1

console.log(`---A('test')----改变了--A('demo')-`)
var test = A('test')
console.log(demo)  //{0: div#test, length: 1, init: ƒ, size: ƒ}

console.log(`---return new--防止对象覆盖--------------------------------------`)
var A1 = function(selector){
    return new A1.fn.init(selector)
}
A1.fn = A1.prototype = {
    //强化构造器函数
    constructor: A1,
    init: function(selector){
        this[0] = document.getElementById(selector)
        this.length = 1
        console.log(this===A1.fn, this===A1.prototype, this)
        return this
    },
    length: 2,
    size: function(){
        return this.length
    }
}
A1.fn.init.prototype = A1.fn
console.log(A1('demo'))











