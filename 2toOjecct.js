//-----------------------------封装--------------------------------------------------------------------------------
var Book = function (id, name, price) {
    //私有属性
    var num = 1
    //私有方法
    function checkId() {

    }
    //特权方法
    this.getName = function () {}
    this.getPrice = function () {}
    this.setName = function () {}
    this.setPrice = function () {}
    //对象公有属性
    this.id = id
    //对象公有方法
    this.copy = function () {}
    //构造器
    this.setName(name)
    this.setPrice(price)
}
//类静态共有属性（对象不能访问）
Book.isChinese = true
//类静态共有方法（对象不能访问）
Book.resetTime = function () {
    console.log('new Time')
}
Book.prototype = {
    //公有属性
    isJSBook: false,
    //公有方法
    display: function () {}
}

//---------通过闭包实现-----------------------------------------------------------------
//利用闭包实现
var Book1 = (function () {
    //静态私有变量
    var bookNum = 0
    //静态私有方法
    function checkBook() {}
    //创建类
    function _book(newId, newName, newPrice) {
        //私有变量
        var name, price
        //私有方法
        function checkId(id) {}
        //特权方法
        this.getName = function () {}
        this.getPrice = function () {}
        this.setName = function () {}
        this.setPrice = function () {}
        //公有属性
        this.id = newId
        //公有方法
        this.copy = function () {}
        bookNum++
        if (bookNum > 100) {
            throw new Error('我们仅出版100本书')
        }
        //构造器
        this.setName(newName)
        this.setPrice(newPrice)
    }
    //构建原型
    _book.prototype = {
        //静态公有属性
        isJSBook: false,
        //静态公有方法
        display: function () {

        }
    }
    //返回类
    return _book()
})()

//-----------------------------继承-----------------------------------------------------------------------------------------------
//1---子类的原型对象------类式继承-----------需要将第一个类的实例赋值给第二个类的原型----------------------------------------------
//声明父类
function SuperClass(){
    this.superValue=true
    this.books = ['javascript','html','css']
}
//为父类添加共有方法
SuperClass.prototype.getSuperValue=function(){
    return this.superValue
}
//声明子类
function SubClass(){
    this.subValue=false
}
//继承父类
SubClass.prototype = new SuperClass()
//为子类添加共有方法
SubClass.prototype.getSubValue=function(){
    return this.subValue
}

var instance = new SubClass()
console.log(instance.getSuperValue())  //true
console.log(instance.getSubValue())  //false

console.log('-----------instanceof----实例判断--------instanceof 是判断前面的对象是否是后面的实例-----------------')
console.log(instance instanceof SuperClass)  //true
console.log(instance instanceof SubClass)  //true
console.log(SubClass instanceof SuperClass)  //false
console.log(SubClass.prototype instanceof SuperClass)  //true

//任何对象都是 Object的实例
console.log('---------任何对象都是Object的实例-----------------------------------')
console.log(instance instanceof Object)  //true

//---------类式继承-----------缺点----------------------------------------------
console.log('-----------类式继承的缺点---------子类通过其原型prototype对父类实例化，继承了父类，所以说父类中的共有属性要是引用类型，就会在子类中被所有实例公用-----------------------------------------')
var instance1 = new SubClass()
var instance2 = new SubClass()
console.log(instance2.books) //["javascript", "html", "css"]
instance1.books.push('设计模式')
console.log(instance2.books) //["javascript", "html", "css", "设计模式"]


//2---------创建即继承-----------构造函数继承----------------------------------------------
console.log('----创建即继承-----------构造函数继承-------------')
//声明父类
function SuperClass1(id){
    //值类型共有属性
    this.id=id
    //引用类型共有属性
    this.books = ['javascript','html','css']
}
//父类声明原型方法
SuperClass1.prototype.showBooks=function(){
    console.log(this.books)
}
//声明子类
function SubClass1(id){
    //继承父类
    SuperClass1.call(this,id)
}
//创建第一个子类实例
var instance11 = new SubClass1(10)
//创建第二个子类实例
var instance21 = new SubClass1(11)

instance11.books.push('设计模式')
console.log(instance11.books) //["javascript", "html", "css", "设计模式"]
console.log(instance11.id) // 10
console.log(instance21.books) //["javascript", "html", "css"]
console.log(instance21.id) // 11
console.log('----------缺点--无法继承父类的原型prototype的方法------------')
// instance11.showBooks() //TypeError: instance11.showBooks is not a function

//3---------组合继承---------------------------------------------------------
console.log('-----------组合继承---------------')
//声明父类
function SuperClass2(name){
    //值类型共有属性
    this.name=name
    //引用类型共有属性
    this.books = ['javascript','html','css']
}
//父类原型共有方法
SuperClass2.prototype.showBooks=function(){
    console.log(this.books)
}
SuperClass2.prototype.getName=function(){
    console.log(this.name)
}
//声明子类
function SubClass2(name,time){
    //构造函数是继承父类name属性继
    SuperClass2.call(this,name)
    //在子类中新增共有属性
    this.time=time
}
//类式继承，子类原型继承父类
SubClass2.prototype = new SuperClass2()
//子类原型方法
SubClass2.prototype.getTime = function(){
    console.log(this.time)
}
//创建第一个子类实例
var instance12 = new SubClass2('js book',2018)
instance12.books.push('设计模式')
console.log(instance12.books) //["javascript", "html", "css", "设计模式"]
instance12.getName() //js book
instance12.getTime() //2018
//创建第二个子类实例
var instance22 = new SubClass2('css book',2019)
console.log(instance22.books) //["javascript", "html", "css"]
instance22.getName() //css book
instance22.getTime() //2019

//4---------原型式继承---------------------------------------------------------
//
function inheritObject(o){
    //声明一个过渡函数对象
    function F(){}
    //过渡对象的原型继承父类对象
    F.prototype = o
    //返回过渡对象的一个实例，该实例的原型继承了父类对象
    return new F()
}

//5---------寄生式继承---------------------------------------------------------
console.log('对原型继承的第二次封装，并且在这第二次封装的过程中对继承的对象进行了拓展，这样新创建的对象不仅仅有父类中的属性和方法，而且还添加新的属性和方法')
//声明基对象
var book = {
    name:'js book',
    alikeBook:['css book','html book']
}
function createBook(obj){
    //通过原型继承方式创建新对象
    var o = new inheritObject(obj)
    //拓展新对象
    o.getName = function(){
        console.log(name)
    }
    //返回拓展后的新对象
    return o
}

//6---------寄生组合式继承---------------------------------------------------------
// 寄生式继承，继承原型
// 传递参数 subClass 子类
// 传递参数  superClass 父类
function inheritPrototype(subClass,superClass){
    //复制一份父类的原型副本保存在变量中
    var p = inheritObject(superClass.prototype)
    //修正因为重写子类原型导致子类的constructor属性被修改
    p.constructor = subClass
    //设置子类的原型
    subClass.prototype = p
}

console.log('-----------寄生组合式继承---------------')
//声明父类
function SuperClass3(name){
    //值类型共有属性
    this.name=name
    //引用类型共有属性
    this.books = ['javascript','html','css']
}
//父类原型共有方法
SuperClass2.prototype.showBooks=function(){
    console.log(this.books)
}
SuperClass2.prototype.getName=function(){
    console.log(this.name)
}
//声明子类
function SubClass3(name,time){
    //构造函数是继承父类name属性继
    SuperClass2.call(this,name)
    //在子类中新增共有属性
    this.time=time
}
//寄生式继承父类原型
inheritPrototype(SubClass3,SuperClass3)
//子类原型方法
SubClass3.prototype.getTime = function(){
    console.log(this.time)
}
//创建第一个子类实例
var instance13 = new SubClass2('js book',2018)
var instance23 = new SubClass2('css book',2019)
instance13.books.push('设计模式')
console.log(instance13.books) //["javascript", "html", "css", "设计模式"]
console.log(instance23.books) //["javascript", "html", "css"]
instance23.getName() //css book
instance23.getTime() //2019

