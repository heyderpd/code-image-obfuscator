console.log('start');

var Canvas = require('canvas')
  , Image = Canvas.Image
  // , canvas = new Canvas(200, 200)
  // , ctx = canvas.getContext('2d');

var fs = require('fs')
  , out = fs.createWriteStream('./img/abc.png')
  // , stream = canvas.pngStream();

fs.readFile('./img/ori.png', function(err, squid){
  if (err)
    throw err;

  img = new Image;
  img.src = squid;

  console.log('img', img.width ,img.height)
  canvas = new Canvas(img.width, img.height)
  console.log('canvas WH', canvas.width, canvas.height);

  ctx = canvas.getContext('2d');

  ctx.drawImage(img, 0, 0, img.width, img.height);
  // pip = canvas.pngStream();
  // console.log('pip', pip);
  var stream = canvas.pngStream();

  stream.on('data', function(chunk){
    console.log('chu', chunk);
    out.write(chunk);
  });

  stream.on('end', function(){
    console.log('saved png');
  });
});

console.log('end');