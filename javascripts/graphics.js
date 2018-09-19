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
    var x = offset % widthInBlocks;
    var y = Math.floor(offset / widthInBlocks);

    var color = value ? 'white' : 'black';
    ctx.fillStyle = color;

    ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
  }

  function setColor(r, g, b) {
    ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
    ctx.strokeStyle = ctx.fillStyle;
  }

  function clear() {
    ctx.fillStyle = "#eee";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#999";
    ctx.strokeStyle = "#999";
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
    circle: circle
  };
}
