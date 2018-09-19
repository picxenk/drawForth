function addPredefinedWords(addToDictionary, readLines, next) {
  function controlCode(code) {
    return {
      isControlCode: true,
      code: code
    };
  }

  [
    ":", ";", "if", "else", "then", "do", "loop", "될때까지", "반복",
    "+loop", "begin", "until", "variable", "constant", "key"
  ].forEach(function (code) {
    addToDictionary(code, controlCode(code));
  });

  addToDictionary(".",  function (context) {
    return context.stack.pop() + " ";
  });

  addToDictionary(".s", function (context) {
    return "\n" + context.stack.print();
  });

  addToDictionary("+", function (context) {
    context.stack.push(context.stack.pop() + context.stack.pop());
  });

  addToDictionary("-", function (context) {
    var a = context.stack.pop(), b = context.stack.pop();
    context.stack.push(b - a);
  });

  addToDictionary("*", function (context) {
    context.stack.push(context.stack.pop() * context.stack.pop());
  });

  addToDictionary("/", function (context) {
    var a = context.stack.pop(), b = context.stack.pop();
    context.stack.push(Math.floor(b / a));
  });

  addToDictionary("/mod", function (context) {
    var a = context.stack.pop(), b = context.stack.pop();
    context.stack.push(Math.floor(b % a));
    context.stack.push(Math.floor(b / a));
  });

  addToDictionary("mod", function (context) {
    var a = context.stack.pop(), b = context.stack.pop();
    context.stack.push(Math.floor(b % a));
  });

  addToDictionary("=", function (context) {
    context.stack.push(context.stack.pop() === context.stack.pop() ? TRUE : FALSE);
  });

  addToDictionary("<", function (context) {
    var a = context.stack.pop(), b = context.stack.pop();
    context.stack.push(b < a ? TRUE : FALSE);
  });

  addToDictionary(">", function (context) {
    var a = context.stack.pop(), b = context.stack.pop();
    context.stack.push(b > a ? TRUE : FALSE);
  });

  addToDictionary("and", function (context) {
    var a = context.stack.pop(), b = context.stack.pop();
    context.stack.push(b & a);
  });

  addToDictionary("or", function (context) {
    var a = context.stack.pop(), b = context.stack.pop();
    context.stack.push(b | a);
  });

  addToDictionary("invert", function (context) {
    // invert is bitwise not
    context.stack.push(~context.stack.pop());
  });

  addToDictionary("i", function (context) {
    context.stack.push(context.returnStack.peek(1));
  });

  addToDictionary("j", function (context) {
    context.stack.push(context.returnStack.peek(2));
  });

  // I don't understand the difference between i and r@
  // http://www.forth.com/starting-forth/sf5/sf5.html
  addToDictionary("r@", function (context) {
    context.stack.push(context.returnStack.peek(1));
  });

  addToDictionary(">r", function (context) {
    context.returnStack.push(context.stack.pop());
  });

  addToDictionary("r>", function (context) {
    context.stack.push(context.returnStack.pop());
  });

  addToDictionary("emit", function (context) {
    return String.fromCharCode(context.stack.pop());
  });

  addToDictionary("swap", function (context) {
    var a = context.stack.pop(), b = context.stack.pop();
    context.stack.push(a);
    context.stack.push(b);
  });

  addToDictionary("dup", function (context) {
    var a = context.stack.pop();
    context.stack.push(a);
    context.stack.push(a);
  });

  addToDictionary("over", function (context) {
    var a = context.stack.pop(), b = context.stack.pop();
    context.stack.push(b);
    context.stack.push(a);
    context.stack.push(b);
  });

  addToDictionary("rot", function (context) {
    var a = context.stack.pop(), b = context.stack.pop(), c = context.stack.pop();
    context.stack.push(b);
    context.stack.push(a);
    context.stack.push(c);
  });

  addToDictionary("drop", function (context) {
    context.stack.pop();
  });

  addToDictionary("!", function (context) {
    var address = context.stack.pop();
    var value = context.stack.pop();
    context.memory.setValue(address, value);
    context.onMemoryChange && context.onMemoryChange(address, value);
  });

  addToDictionary("@", function (context) {
    var address = context.stack.pop();
    context.stack.push(context.memory.getValue(address));
  });

  addToDictionary("allot", function (context) {
    context.memory.allot(context.stack.pop());
  });

  addToDictionary("key", function (context) {
    context.pause = true;

    // set callback for when key is pressed
    context.keydown = function (keyCode) {
      context.pause = false;
      context.keydown = null;
      context.stack.push(keyCode);
      context.onContinue();
    };
  });

  addToDictionary("sleep", function (context) {
    var timeout = context.stack.pop();
    context.pause = true;

    setTimeout(function () {
      context.pause = false;
      context.onContinue();
    }, timeout);
  });

  addToDictionary("random", function (context) {
    var range = context.stack.pop();
    context.stack.push(Math.floor(Math.random() * range));
  });

  addToDictionary("clear", function (context) {
    context.canvas.clear();
    var n = context.stack.size();
    for (var i=0; i<n; i++) {
      context.stack.pop();
    }
  });

  addToDictionary("background", function (context) {
    context.canvas.background();
  });

  addToDictionary("color", function (context) {
    var b = context.stack.pop();
    var g = context.stack.pop();
    var r = context.stack.pop();
    context.canvas.setColor(r, g, b);
  });

  addToDictionary("line", function (context) {
    var ey = context.stack.pop(), ex = context.stack.pop();
    var sy = context.stack.pop(), sx = context.stack.pop();
    context.canvas.line(sx, sy, ex, ey);
    // context.stack.push(ex);
    // context.stack.push(ey);
  });

  addToDictionary("lineWidth", function (context) {
    var w = context.stack.pop();
    context.canvas.lineWidth(w);
  });

  addToDictionary("rectangle", function (context) {
    var h = context.stack.pop(), w = context.stack.pop();
    var y = context.stack.pop(), x = context.stack.pop();
    context.canvas.rectangle(x, y, w, h);
    // context.stack.push(x);
    // context.stack.push(y);
  });

  addToDictionary("triangle", function (context) {
    var y3 = context.stack.pop(), x3 = context.stack.pop();
    var y2 = context.stack.pop(), x2 = context.stack.pop();
    var y1 = context.stack.pop(), x1 = context.stack.pop();
    context.canvas.triangle(x1, y1, x2, y2, x3, y3);
  });

  addToDictionary("circle", function (context) {
    var r = context.stack.pop()
    var y = context.stack.pop(), x = context.stack.pop();
    context.canvas.circle(x, y, r);
    // context.stack.push(x);
    // context.stack.push(y);
  });



  readLines([
    ": cells   1 * ;",
    ": cr      10 emit ;",
    ": space   32 emit ;",
    ": spaces  0 do space loop ;",
    ": 0=      0 = ;",
    ": 0<      0 < ;",
    ": 0>      0 > ;",
    ": ?dup    dup if dup then ;",
    ": 2dup    over over ;",
    ": 1+      1 + ;",
    ": 1-      1 - ;",
    ": 2+      2 + ;",
    ": 2-      2 - ;",
    ": 2*      2 * ;",
    ": 2/      2 / ;",
    ": negate  -1 * ;",
    ": abs     dup 0< if negate then ;",
    ": min     2dup < if drop else swap drop then ;",
    ": max     2dup < if swap drop else drop then ;",
    ": ?       @ . ;",
    ": +!      dup @ rot + swap ! ;",

    "variable  graphics", // start of graphics memory
    "575 cells allot", // graphics memory takes 24 * 24 = 576 cells altogether
    "variable  last-key", // create last-key variable for keyboard input

    "500 constant width",
    "500 constant height",
    ": 폭 width ;",
    ": 높이 height ;",
    ": 쉬기 sleep ;",
    ": 색 color ;",
    ": 난수 over - random + ;",
    ": dice random 1 + ;",
    ": 주사위 dice ;",
    ": 지우기 clear ;",
    ": 배경색 238 238 238 색 ;",
    ": 배경채우기 background ;",
    ": 원 circle ;",
    ": 선 line ;",
    ": 선두께 lineWidth ;",
    ": 사각형 rectangle ;",
    ": 삼각형 triangle ;",

    ": 안녕 .\" 안녕! 만나서 반가워용 ;)\" ;",
    ": hello .\" Hello~~ good to see you\" ;",
    ": hi .\" hi! how are you?\" ;",

    ": 김승범 .\" 제 사부님입니다\" ;",
    ": 언메이크랩 .\" 제가 태어날 계기를 만들어줬어요\" ;",
    ": unmakelab 언메이크랩 ;",
    ": PROTOROOM .\" 후니다킴, 김승범으로 이뤄진 메타미디어 콜렉티브\" 200 0 0 color 150 50 3 circle 350 50 3 circle ;",
    ": 프로토룸 PROTOROOM ;",
  ], next);
}
