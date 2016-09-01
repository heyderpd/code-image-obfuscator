
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
    if (Data.Merge) { // [P, P] <=> [RGB, RGB] <=> [fF fF fF, fF fF fF] <=> [FF, FF, FF]
      var process = function(j) {
        var charHEXlist = '';
        for (var i=0; i<3; i++) {
          var p = j[i];
          var HEX = MathLib.ToCode(Data.Memo[p]).toString(16);
          charHEXlist += (HEX.length > 1) ? HEX : '0'+HEX ;
        }
        var c = j[0] /3 *2;
        var c = [c, c+1];
        for (var i=0; i<2; i++) {
          var p = c[i];
          var Pixel = Draw.NextPixel(null, p);
          var RGB = [];
          for (var l=0; l<3; l++) {
            var Color = Pixel[l].toString(16)[0];
            var Char = charHEXlist[l+(i*3)];
            RGB[l] = parseInt(Color +Char, 16);
          }
          var Color = new Objets.Color(RGB[0], RGB[1], RGB[2]);
          Draw.NextPixel(Color, p);
        }
      };
    } else {
      var process = function(j) {
        var C = new Objets.Color(Data.Memo[ j[0] ], Data.Memo[ j[1] ], Data.Memo[ j[2] ]);
        C = MathLib.Process(MathLib.ToCode, C);
        Draw.NextPixel(C, i);
      };
    }
    var limit = MathLib.RoundUP(Data.Memo.length, 3);    
    for (var i=0; i<limit; i++) {
      var j = i *3;
      process([j, j+1, j+2]);
    }
    return Draw.Canvas;
  },
  Get: function() {
    Data.Memo = ''
    if (Data.Merge) {
      var process = function(j) {
        var charHexList = [];
        for (var i=0; i<2; i++) {
          var p = j[i];
          if (p > 405) return;
          var Pixel = Draw.NextPixel(null, p);
          charHexList.push([ Pixel[0], Pixel[1], Pixel[2] ]);
        }
        var charList = []
        for (var i=0; i<2; i++) {
          for (var l=0; l<3; l++) {
            charList.push(charHexList[i][l].toString(16)[1]);
          }
        }
        for (var i=0; i<3; i++) {
          var j = i *2;
          var char = charList[j] +charList[j+1];
          Data.Memo += MathLib.ToChar(parseInt(char, 16));
        }
      };
    } else {
      var process = function(j) {
        for (var i=0; i<2; i++) {
          var p = j[i];
          var Pixel = Draw.NextPixel(null, p);
          var C = new Objets.Color(Pixel[0], Pixel[1], Pixel[2]);
          C = MathLib.Process(MathLib.ToChar, C);
          Data.Memo += C.r + C.g + C.b;  
        }      
      };
    }
    var limit = MathLib.RoundUP(Draw.Canvas.width *Draw.Canvas.height, 2);    
    for (var i=0; i<limit; i++) {
      var j = i *2;
      process([j, j+1]);
    }
    var Pattern = new RegExp('^([^;]*;)([\\w\\W]*)(;[^;!]*!)([\\w\\W]*)$');
    var result = null;
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
      if (Data.Memo.length /3 > config.canvas.width *config.canvas.height /2)
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
