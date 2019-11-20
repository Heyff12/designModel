//--------------------状态模式--------------------------------------------------------------------------------------------
console.log('---------状态模式-----------------')
//创建超级玛丽状态类
var MarryState = function(){
    //内部状态私有变量
    var _currentState = {};
    var states = {
        jump: function(){
            console.log('jump')
        },
        move: function(){
            console.log('move')
        },
        shoot: function(){
            console.log('shoot')
        },
        squat: function(){
            console.log('squat')
        },
    }
    //动作控制类
    var Action = {
        //改变状态方法
        changeState :function(){
            var arg = arguments
            _currentState = {}
            if(arg.length){
                for(var i=0;i<arg.length;i++){
                    _currentState[arg[i]] = true
                }
            }
            return this
        },
        //执行动作
        goes:function(){
            console.log('触发一次动作')
            for(var i in _currentState){
                states[i] && states[i]()
            }
            return this
        }
    }

    return {
        change: Action.changeState,
        goes: Action.goes
    }
}
//----使用---
MarryState()
    .change('jump','shoot')
    .goes()
    .goes()
    .change('shoot')
    .goes()

// 触发一次动作
// jump
// shoot
// 触发一次动作
// jump
// shoot
// 触发一次动作
// shoot