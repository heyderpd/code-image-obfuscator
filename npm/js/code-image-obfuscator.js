
var setData = function(config) {
  // config.pathFile
  // config.text
  // is png?
  if (typeof(config.pathFile) === 'string') {
    // fs.readFileSync(config.pathFile, function(err, photo) {
    var photo = fs.readFileSync(config.pathFile);
   
    var img = new image;
    img.src = photo;

    canvas = new canvas(img.width, img.height)
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);

    Data.Set(config.text, canvas, ctx);
  } else {
    Data.Set(config.text, false);
  }
}

var getData = function() {
  return Data.Get();
}

var getCanvas = function() {
  return Draw.Canvas
}

var savePng = function(pathFile) {
  if (typeof(pathFile) === 'string') {
    var out = fs.createWriteStream(pathFile)
    var stream = canvas.pngStream();

    stream.on('data', function(chunk){
      out.write(chunk);
    });

    stream.on('end', function(){
      console.log('new png created');
    });
  }
}

var Data = {
  Head: '!NPM;',
  Tail: ';code-image-obfuscator!',
  Merge: false,
  Memo: null,
  Base: null,
  Set: function(text, canvas, ctx) {
    if (canvas) {
      Data.Merge = true;
      var config = {canvas: canvas, ctx: ctx};
    } else {
      var config = false;
    }
    Data.Memo = Data.Head +text +Data.Tail;
    Draw.Initialize(config);
    if (Data.Merge) { // [P, P] => [RGB, RGB] => [{999, 99}9] => [FF, FF]
      var word = 2;
      var process = function(i) {
        var j = i *word;
        var A = MathLib.ToCode(Data.Memo[j]  ).toString(16);
        var B = MathLib.ToCode(Data.Memo[j+1]).toString(16);
        var DEC = String(parseInt(A+B, 16));
        var decPair = [ DEC.substring(0, 3).split(''), DEC.substring(3, 5).split('') ];
        var pixelPair = [ Draw.NextPixel(null, j), Draw.NextPixel(null, j+1) ];
        for (var p=0; p<pixelPair.length; p++) {
          var Pixel = pixelPair[p];
          var RGB = [ Pixel[0], Pixel[1], Pixel[2] ];
          var newRGB = [];
          for (var c=0; c<RGB.length; c++) {
            var Color = String(RGB[c]);
            var N = (decPair[p][c]) ? decPair[p][c] : 0;
            newRGB[c] = Color.substring(0, Color.length -1) +N;
          }
          var C = new Objets.Color(newRGB[0], newRGB[1], newRGB[2]);
          Draw.NextPixel(C, j +p);
        }
      };
    } else {
      var word = 3;
      var process = function(i) {
        var j = i *word;
        var C = new Objets.Color(Data.Memo[j], Data.Memo[j+1], Data.Memo[j+2]);
        C = MathLib.Process(MathLib.ToCode, C);
        Draw.NextPixel(C, i);       
      };
    }
    var limit = MathLib.RoundUP(Data.Memo.length, word);    
    for (var i=0; i<limit; i++) {
      process(i);
    }
    return Draw.Canvas;
  },
  Get: function() {
    Data.Memo = ''
    if (Data.Merge) {
      var word = 2;
      var process = function(j) {
        var pixelPair = [ Draw.NextPixel(null, j), Draw.NextPixel(null, j+1) ];
        var DEC = '';
        for (var p=0; p<pixelPair.length; p++) {
          var Pixel = pixelPair[p];
          var RGB = [ Pixel[0], Pixel[1], Pixel[2] ];
          for (var c=0; c<RGB.length; c++) {
            var Color = String(RGB[c]);
            DEC += Color.substring(Color.length -1, Color.length);
          }
        }
        DEC = Number(DEC.substring(0, DEC.length -1));
        var HEX = DEC.toString(16);
        var A = MathLib.ToChar(HEX.substring(0, 2));
        var B = MathLib.ToChar(HEX.substring(2, 4));
        Data.Memo += A + B;
      };
    } else {
      var word = 1;
      var process = function(j) {
        var Pixel = Draw.NextPixel(null, j);
        var C = new Objets.Color(Pixel[0], Pixel[1], Pixel[2]);
        C = MathLib.Process(MathLib.ToChar, C);
        Data.Memo += C.r + C.g + C.b;        
      };
    }
    var limit = MathLib.RoundUP(Draw.Canvas.width *Draw.Canvas.height, word); 
    for (var i=0; i<limit; i++) {
      process(i);
    }
    var Pattern = new RegExp('^([^;]*;)([\\w\\W]*)(;[^;!]*!)([\\w\\W]*)$');
    var result = null;return Data.Memo;
    if ((result = Pattern.exec(Data.Memo)) !== null) {
      if (Data.Head === result[1] && result[3] === Data.Tail) {
        Data.Memo = result[2];
        return Data.Memo;
      }
    }
    throw new Error("image don't have hide data");
  }
}

var Draw = {
  Canvas: null,
  Ctx: null,
  Initialize: function(config) {
    if (config) {
      if (Data.Memo.length > config.canvas.width *config.canvas.height)
        throw new Error("text is too long, this img can't suport this");
      
      Data.Base = config.canvas.width;
      Draw.Canvas = config.canvas;
      Draw.Ctx = config.ctx;
    } else {
      var sqrt = Math.sqrt( MathLib.RoundUP(Data.Memo.length, 3) );
      Data.Base = MathLib.RoundUP(sqrt, 1);
      if(Data.Base %1)
        Data.Base += 1;
      
      Draw.Canvas = new canvas(Data.Base, Data.Base);
      Draw.Ctx = Draw.Canvas.getContext('2d');
    }
  },
  NextPixel: function(C = null, k) {
    var P = new Objets.Pos(k %Data.Base, null);
    P.y = (k -P.x) /Data.Base;
    if (C !== null)
      Draw.setPixel(P, C);
    else
      return Draw.getPixel(P.x, P.y);
  },
  setPixel: function(P, C) {
    Draw.Ctx.fillStyle = 'rgb('+C.r+','+C.g+','+C.b+')';
    Draw.Ctx.fillRect(P.x, P.y, 1, 1);
  },
  getPixel: function(x, y) {
    return Draw.Ctx.getImageData(x,y, 1,1).data;
  }
}

var Objets = {
  Pos: function(x,y) {
    this.x = x,
    this.y = y
  },
  Color: function(r,g,b) {
    this.r = r,
    this.g = g,
    this.b = b,
    this.set = function(key, val) {
      switch(key) {
        case 'r': this.r = val; break;
        case 'g': this.g = val; break;
        case 'b': this.b = val; break;
        default:					
      }
    }
  }
}

var MathLib = {
  move: 123,
  RoundUP: function(Num, Div) {
    return MathLib.Round(Num, Div, true);
  },
  RoundDOWN: function(Num, Div) {
    return MathLib.Round(Num, Div, false);
  },
  Round: function(Num, Div, Up) {
    var R = Num %Div;
    var Res = Math.round((Num -R) /Div);
    if (Res && R)
      Res += 1;
    return Res;
  },
  Process: function(Work, Data) {
    Object.keys(Data).forEach( function(key) {
      var val = Data[key];
      if(typeof(val) != "function")
        Data.set(key, Work(val) );
    });
    return Data;
  },
  ToCode: function(Data) {
    if(Data == undefined)
      Data = String.fromCharCode(0);
    return Data.charCodeAt();
  },
  ToChar: function(Data) {
    return String.fromCharCode(Data);
  },
  Encode: function(D) {
    D = MathLib.Roll(D, MathLib.move);
    var R = D %2;
    if(R)
      D = ((D -R) /2) +128;
    else
      D = D /2;
    return D;
  },
  Decode: function(D) {
    if(D < 128)
      D = D *2;
    else
      D = ((D -128) +0.5) *2
    D = MathLib.Roll(D, 256 -MathLib.move);
    return D;
  },
  Roll: function(D, Move) {
    D += Move;
    if(D < 0)
      D = 256 -D;
    else
      if(D > 255)
        D -= 256;
    return D;
  }
}

var fs = require('fs');
var canvas = require('canvas');
var image = canvas.Image;

module.exports = {
  convert: setData,
  revert: getData,
  save: savePng,
  canvas: getCanvas 
}
