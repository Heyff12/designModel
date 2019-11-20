//-----------------------同步模块模式SMD(Synchronous Module Definition)--------------------------------------------------------------
console.log('---------------------同步模块模式SMD(Synchronous Module Definition)----------------------------------------------------------')
//定义模块管理器单体对象
var F = F || {}
//(定义模块方法),理论上，模块方法应该放在闭包中实现，可以隐蔽内部信息，这里暂时忽略此步骤
F.define = function(str,fn){
    //解析模块路由
    var parts = str.split('.')
    //old当前模块的祖父模块，parent当前模块的父模块（如果在闭包中，为了屏蔽对模块的直接访问，建议将模块添加给闭包内部私有变量）
    var old = parent = this
    //i模块层级，len 模块层级长度
    var i = len = 0
    //如果第一个模块是模块管理器单体对象，则移除
    if(parts[0] === 'F'){
        parts = parts.slice(1)
    }
    //屏蔽对define与module模块方法的重写
    if(parts[0] === 'define' || parts[0] === 'module'){
        return
    }
    //遍历路由模块并定义每层模块
    for(len=parts.length;i<len;i++){
        //如果父模块中不存在当前模块
        if(typeof parent[parts[i]] === 'undefined'){
            //声明当前模块
            parent[parts[i]] = {}
        }
        //缓存下一层级的祖父模块
        old = parent
        //缓存下一级的父模块
        parent = parent[parts[i]]
    }

    //如果给定模块方法则定义改模块方法
    if(fn){
        old[parts[--i]] = fn()
    }

    return this
}
//F.string 模块-----------------------------
F.define('string', function(){
    return {
        trim: function(str){
            return str.replace(/^\s+|\s+$/g,'')
        }
    }
})

//测试
console.log(F.string.trim(' 测试用例 。  '))
console.log(F.string.trim(' 测试用例 。  ').length)

//F.dom 模块-----------------------------
F.define('dom',function(){
    var $ = function(id){
        $.dom = document.getElementById(id)
        return $
    }
    $.html = function(html){
        if(html){
            this.dom.innerHTML = html
            return this
        }else{
            return this.dom.innerHTML
        }
    }
    return $
})

console.log(F.dom('test').html()) // test

F.define('dom.addClass')
F.dom.addClass = function(type,fn){
    return function(className){
        if(!~this.dom.className.indexOf(className)){
            this.dom.className += ' ' + className
        }
    }
}()

F.dom('test').addClass('test')

//----模块调用方法-----------------------------------------------------------------------------
F.module= function(){
    var args = [].slice.call(arguments)
    //获取回调执行函数
    var fn = args.pop(),
    //获取依赖模块，如果是args[0]数组，则依赖模块为args[0], 否则 args
    parts = args[0] && args[0] instanceof Array ? args[0] : args,
    //依赖模块列表
    modules = [],
    //模块路由
    modIds = '',
    //依赖模块索引
    i = 0,
    //依赖模块长度
    ilen = parts.length,
    //父模块，模块路由层级索引，模块路由层级长度
    parent,j,jlen;

    while(i<ilen){
        //如果是模块路由
        if(typeof parts[i] === 'string'){
            //设置当前模块父对象
            parent = this
            //解析模块路由，并屏蔽掉模块福对象
            modIds = parts[i].replace(/^F\./,'').split('.')
            //遍历模块路由层级
            for(j=0,jlen=modIds.length;j<jlen;j++){
                parent = parent[modIds[j]] || false
            }
            modules.push(parent)
        }else{
            modules.push(parts[i])
        }
        i++
    }
    fn.apply(null,modules)
}

F.module(['dom',document],function(dom,doc){
    dom('test').html('new add!')
    doc.body.style.background = 'pink'
})

F.module('dom','string.trim',function(dom,trim){
    var html = dom('test').html()
    var str = trim(html)
    console.log('*' + html + '*','*' + str + '*')
})
















