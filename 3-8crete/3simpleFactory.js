//---------简单工厂模式-------------------------------------------------------------------------------------------------------
//--------------------------------------通过实例化对象创建--------------------------------------
var LoginAlert = function() {};
var LoginConfirm = function() {};
var LoginPrompt = function() {};

var PopFactory = function(name) {
  switch (name) {
    case "alert":
      return new LoginAlert();
    case "confirm":
      return new LoginConfirm();
    case "prompt":
      return new LoginPrompt();
  }
};
//-------------------------------通过创建一个新对象，然后包装增强其属性和功能来实现-----------------------------------
function createPop(type, text) {
  //创建一个对象，并对对象拓展属性和方法
  var o = new Object();
  o.content = text;
  o.show = function() {
    //显示方法
  };

  if (type === "alert") {
    //警告框差异部分
  }

  if (type === "propmpt") {
    //提升框差异部分
  }

  if (type === "confirm") {
    //确认框差异部分
  }
  //将返回对象
  return o;
}
//创建警示框
var userNameAlert = new createPop("alert", "用户名只能是***");

//---------给我一张名片——工厂方法模式-------------------------------------------------------------------------------------------------------
//安全模式创建工厂类
var Factory = function(type, content) {
  if (this instanceof Factory) {
    var s = new this[type](content);
    return s;
  }
  return new Factory(type, content);
};
//工厂原型中设置创建所有类型数据对象的基类
Factory.prototype = {
  Java: function() {},
  JavaScript: function() {},
  UI: function() {},
  PHP: function() {}
};

//---------出现的都是幻觉——抽象工厂模式-------------------------------------------------------------------------------------------------------
//抽象工厂方法
var VehicleFactory = function(subType, superType) {
  //判断抽象工厂中是否有该抽象类
  if (typeof VehicleFactory[superType] === "function") {
    //缓存类
    function F() {}
    F.prototype = new VehicleFactory[superType]();
    subType.constructor = subType;
    subType.prototype = new F();
  } else {
    throw new Error("未创建该抽象类");
  }
};
//小汽车抽象类
VehicleFactory.Car = function() {
  this.type = "car";
};
VehicleFactory.Car.prototype = {
  getPrice: function() {
    return new Error("抽象方法不能调用");
  },
  getSpeed: function() {
    return new Error("抽象方法不能调用");
  }
};
//公交车车抽象类
VehicleFactory.Bus = function() {
  this.type = "bus";
};
VehicleFactory.Bus.prototype = {
  getPrice: function() {
    return new Error("抽象方法不能调用");
  },
  getPassengerNum: function() {
    return new Error("抽象方法不能调用");
  }
};
//货车抽象类
VehicleFactory.Truck = function() {
  this.type = "truck";
};
VehicleFactory.Truck.prototype = {
  getPrice: function() {
    return new Error("抽象方法不能调用");
  },
  getTrainload: function() {
    return new Error("抽象方法不能调用");
  }
};

//实现-------------
//宝马汽车类
var BMW = function(price, speed) {
  this.price = price;
  this.speed = speed;
};
//抽象工厂实现对Car抽象类的继承
VehicleFactory(BMW, "Car");
BMW.prototype.getPrice = function() {
  return this.price;
};
BMW.prototype.getSpeed = function() {
  return this.speed;
};

//---------分即是合——创建者模式-------------------------------------------------------------------------------------------------------
console.log('-----分即是合——创建者模式-----')
//创建一个人类
var Human = function(param) {
  this.skill = (param && param.skill) || "保密";
  this.hobby = (param && param.hobby) || "保密";
};
Human.prototype = {
  getSkill: function() {
    return this.skill;
  },
  getHobby: function() {
    return this.hobby;
  }
};
//实例化姓名类
var Named = function(name) {
  var that = this;
  //构造器
  //构造函数解析姓名的姓与名
  (function(name, that) {
      that.wholeName = name;
      if (name.indexOf(" ") > -1) {
        that.firstName = name.slice(0, name.indexOf(" "));
        that.secondName = name.slice(name.indexOf(" "));
      }
    }
  )(name, that);
};
Named.prototype.changeFirstName = function(firstName) {
  this.firstName = firstName;
  this.wholeName = firstName + ' ' + this.secondName;
};

//应聘者构造
var Person = function(name) {
  //创建应聘者缓存对象
  var _person = new Human();
  //创建应聘者姓名解析对象
  _person.name = new Named(name);
  //将创建的应聘者返回
  return _person;
};

var person = new Person("xiao ming");
console.log(person.skill); //保密
console.log(person.name.wholeName); //xiao ming
console.log(person.name.firstName); //xiao
person.name.changeFirstName("tan");
console.log(person.name.firstName); //tan
console.log(person.name.wholeName); //tan ming


//---------语言之魂——原型模式-------------------------------------------------------------------------------------------------------
console.log('-----语言之魂——原型模式-----')

//轮播图
var LoopImages = function(imgArr,container){
    this.imagesArray = imgArr
    this.container = container
}
LoopImages.prototype = {
    creteImage: function(){
        console.log('LoopImages createImage function')
    },
    changeImage: function(){
        console.log('LoopImages changeImage function')
    }
}

//上下滑动切换类
var SlideLoopImg = function(imgArr,container){
    //构造函数式继承
    LoopImages.call(this,imgArr,container)
}
SlideLoopImg.prototype = new LoopImages()
//重写继承的切换下一张图片
SlideLoopImg.prototype.changeImage = function(){
    console.log('SlideLoopImg changeImage function')
}




