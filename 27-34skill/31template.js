//--------------------卡片拼图——简单模板模式--------------------------------------------------------------------------------------------
console.log(
  "---------简单模板模式--------------------------------------------------------------------------------------------"
);
var A = {};
A.root = document.getElementById("app");
A.strategy = {
  //创建文字列表

  listPart: function(data) {
    var s = document.createElement("div"),
      h = document.createElement("h2"),
      p = document.createElement("p"),
      ht = document.createTextNode(data.data.h2),
      pt = document.createTextNode(data.data.p),
      ul = document.createElement("ul"),
      lData = data.data.li,
      li,
      strong,
      span,
      t,
      c;
    data.id && (s.id = data.id);
    s.className = "part";
    h.appendChild(ht);
    p.appendChild(pt);
    s.appendChild(h);
    s.appendChild(p);
    //遍历li
    for (let i = 0, len = lData.length; i < len; i++) {
      li = document.createElement("li");
      strong = document.createElement("strong");
      span = document.createElement("span");
      t = document.createTextNode(ldata[i].strong);
      c = document.createTextNode(ldata[i].span);

      strong.appendChild(t);
      span.appendChild(c);

      li.appendChild(strong);
      li.appendChild(span);
      ul.appendChild(li);
    }

    s.appendChild(ul);
    A.root.appendChild(s);
  },
  codePart: function() {},
  onlyPart: function() {},
  guide: function() {}
};
A.init = function(data) {
  this.strategy[data.type](data);
};

//-----------------模板渲染方法-----------------
A.formatString = function(str, data) {
  return str.replace(/\{#(\w+)#\}/g, function(match, key) {
    return typeof data[key] === "undefined" ? "" : data[key];
  });
};

A.strategy.listPart = function(data) {
  var s = document.createElement("div"),
    ul = "",
    lData = data.data.li,
    //模块模板
    tpl = ["<h2>{#h2#}<h2>", "<p>{#p#}<p>", "<ul>{#ul#}<ul>"].join(""),
    liTpl = [
      "<li>",
      "<strong>{#strong#}<strong>",
      "<span>{#span#}<span>",
      "</li>"
    ].join("");
  data.id && (s.id = data.id);
  s.className = "part";
  //遍历li
  for (let i = 0, len = lData.length; i < len; i++) {
    if (lData[i].em || lData[i].span) {
      ul += A.formatString(liTpl, lData[i]);
    }
  }
  data.data.ul=ul
  s.innerHTML = A.formatString(tpl,data.data)
  A.root.appendChild(s);
};
