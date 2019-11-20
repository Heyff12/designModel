//--------------函数也是  对象-------------------------------------------------------
var checkObject = function () {
    console.log(this) //当没有new checkObject时，不执行；当new时，返回对象本身，其3个方法包含在__proto__中的constructor中
};

checkObject.checkName = function () {
    console.log("checkName");
};

checkObject.checkEmail = function () {
    console.log("checkEmail");
};

checkObject.checkPassword = function () {
    console.log("checkPassword");
};
var a = new checkObject()
// a.checkName(); //报错，Uncaught TypeError: a.checkName is not a function
// a.checkEmail();
// a.checkPassword();
checkObject.checkName();
checkObject.checkEmail();
checkObject.checkPassword();

//---------------------等同于--------返回对象----------------------------------------
var checkObject1 = function () {
    console.log(this) //等同于window，每次调用方法前都会执行，故执行3次

    return {
        checkName: function () {
            console.log("---通过-return-----");
            console.log("checkName");
        },

        checkEmail: function () {
            console.log("checkEmail");
        },

        checkPassword: function () {
            console.log("checkPassword");
        }
    };
};
checkObject1().checkName();
checkObject1().checkEmail();
checkObject1().checkPassword();

//---------------------等同于-----类------------每个新的类都会拥有自己独立的3个this方法------造成代码浪费-------------------------
var checkObject2Class = function () {
    console.log(this) //返回checkObject2Class{} 和 它的3个方法，只执行一次

    this.checkName = function () {
        console.log("---通过-this--类---");
        console.log("checkName");
    };

    this.checkEmail = function () {
        console.log("checkEmail");
    };

    this.checkPassword = function () {
        console.log("checkPassword");
    };
};
var checkObject2 = new checkObject2Class();
checkObject2.checkName();
checkObject2.checkEmail();
checkObject2.checkPassword();

//--------------在类的-------等同于-------prototype-----------------------------------------
var checkObject3Class = function () {
    console.log(this) //checkObject3Class{} 和 __proto__中它的4个方法,只执行一次
};

checkObject3Class.prototype = {
    checkName: function () {
        console.log("-----通过prototype-集合多个方法----会被下面的checkName覆盖----");
        console.log("prototype集合checkName");
    },
    checkName1: function () {
        console.log("-----通过prototype-集合多个方法----有效----");
        console.log("prototype集合checkName1");
    }
};

checkObject3Class.prototype.checkName = function () {
    console.log("-----通过prototype---------");
    console.log("checkName");
};

checkObject3Class.prototype.checkName2 = function () {
    console.log("-----通过prototype---------");
    console.log("checkName2");
};

checkObject3Class.prototype.checkEmail = function () {
    console.log("checkEmail");
};

checkObject3Class.prototype.checkPassword = function () {
    console.log("checkPassword");
};

checkObject3Class.checkName2 = function(){
    console.log("-----通过对象直接复制给---checkObject3Class------");
    console.log("checkName2");
}

// checkObject3Class.prototype = {
//     checkName:function(){
//     console.log("-----通过prototype-集合多个方法----导致上面的3个方法失效----");

//     console.log("prototype集合checkName");

//     }
// }

var checkObject3 = new checkObject3Class();
checkObject3.checkName();
checkObject3.checkEmail();
checkObject3.checkPassword();
checkObject3.checkName1();
checkObject3.checkName2();