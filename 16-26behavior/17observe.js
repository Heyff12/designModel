//--------------------观察者模式--------------------------------------------------------------------------------------------
console.log('---------观察者模式-----------------')
//将观察者放在闭包中，当页面加载就立即执行
var Observer = (function(){
    //防止消息队列暴漏二被篡改故将消息容器作为静态私有变量保存
    var _messages = {}
    return {
        //注册信息接口--将订阅者的消息推入到消息队列
        regist:function(type,fn){
            //如果此消息不存在则应该创建一个改消息类型
            if(typeof _messages[type] === 'undefined'){
                //将动作推入到消息对应的动作队列中
                _messages[type] = [fn]
            } else {
                //如果消息存在
                // 将动作方法推入该消息对应的动作执行序列中
                _messages[type].push(fn)
            }
        },
        //发布信息接口--当观察者发布一个消息时，将所有订阅者订阅的消息依次执行
        fire:function(type,args){
            //如果消息没被注册，则返回
            if(!_messages[type]){
                return
            }
            //定义消息消息
            var events = {
                type,
                args:args || {}
            }
            var i =0
            var len = _messages[type].length
            //遍历消息动作
            for(;i<len;i++){
                //依次执行注册的消息对应的动作序列
                _messages[type][i].call(this,events)
            }
        },
        //移除信息接口--将订阅者注销的消息从消息队列中清除
        remove:function(type,fn){
            //如果消息动作队列存在
            if(_messages[type] instanceof Array){
                //从最后一个消息动作遍历
                var i = _messages[type].length -1
                for(;i>=0;i--){
                    //如果存在该动作则在消息动作序列中移除相应动作
                    _messages[type][i] === fn && _messages[type].splice(i,1)
                }
            }
        },
    }
})()

//----------测试------------
// 订阅一条消息
Observer.regist('test',function(e){
    console.log(e.type,e.args.msg)
})
//发布这则消息
Observer.fire('test',{msg:'传递参数'}) // test 传递参数


console.log('---------对象间解耦-----------------')

//学生类
var Student = function(result){
    var that = this
    //学生回答结果
    that.result = result
    //学生回答问题的动作
    that.say = function(){
        console.log(that.result)
    }
}
//学生回答问题方法
Student.prototype.answer = function(question){
    //注册参数问题
    Observer.regist(question,this.say)
}
//学生呼呼睡觉，此时不能回答问题
Student.prototype.sleep = function(question){
    console.log(this.result + ' ' + question + ' 已被注销')
    //取消对老师问题的监听
    Observer.remove(question,this.say)
}


//教师类
var Teacher = function(){}
//教师提问题
Teacher.prototype.ask = function(question){
    console.log('问题是：' + question)
    //发布提问消息
    Observer.fire(question)
}

//----课堂演练 ---
var student1 = new Student('学生1回答了问题')
var student2 = new Student('学生2回答了问题')
var student3 = new Student('学生3回答了问题')

student1.answer('什么是设计模式')
student1.answer('简述观察者模式')
student2.answer('什么是设计模式')
student3.answer('什么是设计模式')
student3.answer('简述观察者模式')

student3.sleep('简述观察者模式')

var teacher = new Teacher()
teacher.ask('什么是设计模式')
teacher.ask('简述观察者模式')

// 学生3回答了问题 简述观察者模式 已被注销
// 问题是：什么是设计模式
// 学生1回答了问题
// 学生2回答了问题
// 学生3回答了问题
// 问题是：简述观察者模式
// 学生1回答了问题


















