//--------------------中介者模式--------------------------------------------------------------------------------------------
console.log('---------中介者模式-----------------')
//Page备忘录
var Page = function(){
    //信息缓存对象
    var cache = {}
    // 主函数，参数page页码，参数fn成功回调函数
    return function(page,fn){
        if(cache[page]){
            showPage(page,cache[page])
            fn && fn()
        }else{
            $.post('./data/getNewsData',{
                page
            },function(res){
                if(res.errNo===0){
                    showPage(page,res.data)
                    cache[page] = res.data
                    fn && fn()
                }else{
                    //异常处理
                }
            })
        }
    }
    
}
