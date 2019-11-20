//--------------------访问数据对象（DAO）模式--------------------------------------------------------------------------------------------
console.log(
  "---------访问数据对象（DAO）模式----------------------------------------------------------------------------------------------------------------"
);
//本地存储类
var BaseLocalStorage = function(preId, timeSign) {
  //定义本地存储前缀
  this.preId = preId;
  //定义时间戳与存储数据之间的拼接符
  this.timeSign = timeSign || "|-|";
};
BaseLocalStorage.prototype = {
  //操作状态
  status: {
    SUCCESS: 0,
    FAILURE: 1,
    OVERFLOW: 2,
    TIMEOUT: 3
  },
  //保存本地存储链接
  storage: localStorage || window.localStorage,
  //获取本地存储数据的真实字段
  getKey: function(key) {
    return this.preId + key;
  },
  set: function(key, value, callback, time) {
    //设置操作状态 成功
    var status = this.status.SUCCESS;
    //获取真实key
    var key = this.getKey(key);
    try {
      //获取参数时间的时间戳
      time = new Date(time).getTime() || time.getTime();
    } catch (e) {
      //设置默认时间,1个月
      time = new Date().getTime() + 1000 * 60 * 60 * 24 * 31;
    }
    try {
      //添加数据
      this.storage.setItem(key, time + this.timeSign + value);
    } catch (e) {
      //溢出失败
      status = this.status.OVERFLOW;
    }
    callback && callback.call(this, status, key, value);
  },
  get: function(key, callback) {
    //设置操作状态 成功
    var status = this.status.SUCCESS,
      //获取真实key
      key = this.getKey(key),
      //默认值为空
      value = null,
      //时间戳与存储数据之间的拼接符长度
      timeSignLen = this.timeSign.length,
      //缓存当前对象
      that = this,
      //时间戳与存储数据之间的拼接符起始位置
      index,
      //时间戳
      time,
      //最终获取的数据
      result;
    try {
      //获取字段对应的数据字符串
      value = that.storage.getItem(key);
    } catch (e) {
      result = {
        status: that.status.FAILURE,
        value: null
      };
      callback && callback.call(this, result.status, result.value);
      return result;
    }
    if (value) {
      //时间戳与存储数据之间的拼接符起始位置
      index = value.indexOf(that.timeSign);
      //获取时间戳
      time = +value.slice(0, index);
      //时间是否过期
      if (new Date(time).getTime() > new Date().getTime() || time == 0) {
        value = value.slice(index + timeSignLen);
      } else {
        value = null;
        status = that.status.TIMEOUT;
        that.remove(key);
      }
    } else {
      status = that.status.FAILURE;
    }
    result = {
      status,
      value
    };
    callback && callback.call(this, result.status, result.value);
    return result;
  },
  remove: function(key, callback) {
    //设置操作状态 失败
    var status = this.status.FAILURE,
      //获取真实key
      key = this.getKey(key),
      //默认值为空
      value = null;
    try {
      //获取字段对应的数据字符串
      value = this.storage.getItem(key);
    } catch (e) {}
    if (value) {
      try {
        this.storage.removeItem(key);
        status = this.status.SUCCESS;
      } catch (e) {}
    }
    callback &&
      callback.call(
        this,
        status,
        status > 0
          ? null
          : value.slice(value.indexOf(this.timeSign) + this.timeSign.length)
      );
  }
};

//-----------检验------
var LS = new BaseLocalStorage("LS__");

var callback = function() {
  console.log(arguments);
};
LS.set("a", "xiao ming", callback); //Arguments(3) [0, "LS__a", "xiao ming", callee: ƒ, Symbol(Symbol.iterator): ƒ]
LS.get("a", callback); //Arguments(2) [0, "xiao ming", callee: ƒ, Symbol(Symbol.iterator): ƒ]
LS.remove("a", callback); //Arguments(2) [0, "xiao ming", callee: ƒ, Symbol(Symbol.iterator): ƒ]
LS.remove("a", callback); //Arguments(2) [1, null, callee: ƒ, Symbol(Symbol.iterator): ƒ]
LS.get("a", callback); //Arguments(2) [1, null, callee: ƒ, Symbol(Symbol.iterator): ƒ]
