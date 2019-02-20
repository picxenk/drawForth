function Graphics($canvas) {
  if (!$canvas.length) {
    return null;
  }

  var canvas = $canvas[0];
  var ctx = canvas.getContext('2d');
  var width = canvas.width;
  var height = canvas.height;
  var widthInBlocks = 24;
  var heightInBlocks = 24;
  var blockSize = width / widthInBlocks;

  clear();
  // ctx.fillStyle = "#eee";
  // ctx.fillRect(0, 0, width, height);
  // ctx.fillStyle = "#999";

  function drawPixel(offset, value) {
    // var x = offset % widthInBlocks;
    // var y = Math.floor(offset / widthInBlocks);
    //
    // var color = value ? 'white' : 'black';
    // ctx.fillStyle = color;
    //
    // ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
  }

  function setColor(r, g, b) {
    ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
    ctx.strokeStyle = ctx.fillStyle;
  }

  function clear() {
    ctx.fillStyle = "#f7f3e8";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#EDC6AA";
    ctx.strokeStyle = "#EDC6AA";
  }

  function background() {
    ctx.fillRect(0, 0, width, height);
  }

  function line(sx, sy, ex, ey) {
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.stroke();
  }

  function lineWidth(w) {
    ctx.lineWidth = w;
  }

  function rectangle(x, y, w, h) {
    // ctx.fillStyle = "#fbb";
    ctx.fillRect(x, y, w, h);
  }

  function triangle(x1, y1, x2, y2, x3, y3) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.fill();
  }

  function circle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.fill();
  }

  return {
    drawPixel: drawPixel,
    clear: clear,
    background: background,
    setColor: setColor,
    line: line,
    lineWidth: lineWidth,
    rectangle: rectangle,
    triangle: triangle,
    circle: circle
  };
}
