//--------------------等待者模式--------------------------------------------------------------------------------------------
console.log(
    "---------等待者模式--------------------------------------------------------------------------------------------"
  );
//等待对象
var Waiter = function(){
    var dfd=[],//注册了的等待对象容器
        doneArr=[],//成功回调方法
        failArr=[],//失败回调
        slice=Array.prototype.slice,
        that=this;
    
    //监控对象类
    var Primise = function(){
        //监控对象是否解决成功状态
        this.resolved = false
        //监控对象是否解决失败状态
        this.rejected = false
    }
    Primise.prototype = {
        resolve:function(){
            this.resolved = true

            if(!dfd.length){
                return
            }

            console.log('----------resole--------')
            console.log(dfd)

            for(let i=dfd.length-1;i>=0;i--){
                //如果有任意一个监控对象没有被解决或者解决失败 则返回
                if(dfd[i] && !dfd[i].resolved || dfd[i].rejected){
                    return
                }
                //清除监控对象
                dfd.splice(i,1)
            }
            //执行解决成功回调方法
            _exec(doneArr)
        },
        reject:function(){
            this.rejected = true

            if(!dfd.length){
                return
            }
            //清除所有监控对象
            dfd.splice(0)
            //执行解决失败回调方法
            _exec(failArr)
        },
    }

    //创建监控对象
    that.Deferred = function(){
        return new Primise()
    }

    //回调执行方法
    function _exec(arr){
        console.log('-------_exec-------')
        console.log(dfd)
        var i=0,len=arr.length;
        for(;i<len;i++){
            try{
                arr[i] && arr[i]()
            }catch(e){

            }
        }
    }

    //监控异步方法  参数：监控对象
    that.when = function(){
        //设置监控对象
        dfd = slice.call(arguments)
        var i = dfd.length
        for(--i;i>=0;i--){
            var item = dfd[i]
            //如果不存在监控对象，或者监控对象已经解决，或者不是监控对象
            if(!item || item.resolved || item.rejected || !item instanceof Primise){
                //清除内存 清除当前监控对象
                dfd.splice(i,1)
            }
        }
        console.log('-----when-----')
        console.log(dfd)
        return that
    }

    //解决成功回调函数添加方法
    that.done = function(){
        doneArr = doneArr.concat(slice.call(arguments))
        console.log('-----done-----')
        return that
    }

    //解决失败回调函数添加方法
    that.fail = function(){
        failArr = failArr.concat(slice.call(arguments))
        console.log('-----fail-----')
        return that
    }

}

//---------测试--------
var waiter = new Waiter()
var first = function(){
    //创建监听对象
    var dtd = waiter.Deferred()
    setTimeout(function(){
        console.log('first finish')
        //发布解决成功消息
        dtd.resolve()
    },5000)
    //返回监听对象
    return dtd
}()

var second = function(){
    //创建监听对象
    var dtd = waiter.Deferred()
    setTimeout(function(){
        console.log('second finish')
        //发布解决成功消息
        dtd.resolve()
    },10000)
    //返回监听对象
    return dtd
}()

waiter
 .when(first,second)  //监听两个事件
 .done(function(){
     console.log('success')
 },function(){
    console.log('success again')
 })
 .fail(function(){
     console.log('fail')
 })

//  first finish
//  second finish
//  success
// success again







