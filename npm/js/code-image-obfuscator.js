
var setData= function(config) {
  if (config.pathFile  === undefined) { throw 'img-obfuscator: param "pathFile" is undefined' };
  if (config.text.split('.').pop() === 'txy') { throw 'img-obfuscator: image need to be png' };
  if (config.text  === undefined) { throw 'img-obfuscator: param "text" is undefined' };
  if (typeof(config.pathFile) === 'string') {
    var photo = fs.readFileSync(config.pathFile);

    var img = new image;
    img.src = photo;

    var canvas = new npmCanvas(img.width, img.height)
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);

    Dt.Set(config.text, canvas, ctx);
  } else {
    Dt.Set(config.text, false);
  }
}

var getData= function() {
  return Dt.Get();
}

var getCanvas = function() {
  return Dw.Canvas;
}

var savePng = function(pathFile) {
  if (typeof(pathFile) === 'string') {
    var out = fs.createWriteStream(pathFile)
    var stream = Dw.Canvas.pngStream();

    stream.on('data', function(chunk){
      out.write(chunk);
    });

    stream.on('end', function(){
      console.log('new png created');
    });
  }
}

//config
var Co = {
  R: 3, //RGBA
  C: 3, //CHAR
  L: 8, //CHAR LEN
  P: 8  //PIXEL
}

//Data
var Dt = {
  Head: '!NPM;',
  Tail: ';code-image-obfuscator!',
  Merge: false,
  Memo: null,
  Base: null,
  Set: function(text, canvas, ctx) {
    if (canvas) {
      Dt.Merge = true;
      var config = {canvas: canvas, ctx: ctx};
    } else {
      var config = false;
    }
    Dt.Memo = Dt.Head +text +Dt.Tail;
    Dw.Initialize(config);
    Dw.offset = 0;
    if (Dt.Merge) {
      var limit = MLib.Round(Dt.Memo.length, Co.C);
      for (var i=0; i<limit; i++) {
        var r = i *Co.C;
        var STREAM = '';
        for (var b=0; b<Co.C; b++) {
          var BIN = MLib.ToCode(Dt.Memo[b +r]).toString(2);
          while (BIN.length < Co.L){
            BIN = '0'+BIN;
          }
          STREAM += BIN;
        }
        for (var j=0; j<Co.P; j++) {
          var r = j *Co.R;
          var Pixel = Dw.getOffset();
          for (var p=0; p<Co.R; p++) {
            var odd = Pixel[p] %2;
            var BIT = STREAM[p +r];
            if (!odd && BIT === '1') {
              Pixel[p] += 1;
            } else if (odd && BIT === '0') {
              Pixel[p] -= 1;
            }
          }
          var Color = [ Pixel[0], Pixel[1], Pixel[2], Pixel[3] ];
          Dw.setNext(Color);
        }
      }
    } else {
      var limit = MLib.Round(Dt.Memo.length, 4);
      for (var i=0; i<limit; i++) {
        var j = i *3;
        var C = [ Dt.Memo[j], Dt.Memo[j+1], Dt.Memo[j+2], Dt.Memo[j+3] ];
        C = MLib.Process(MLib.ToCode, C);
        Dw.setArray(C, i);
      };
    }
    return Dw.Canvas;
  },
  Get: function() {
    Dw.offset = 0;
    Dt.Memo = '';
    if (Dt.Merge) {
      var limit = MLib.Round(Dw.Canvas.width *Dw.Canvas.height, Co.P);
      for (var i=0; i<limit; i++) {
        var STREAM = '';
        for (var j=0; j<Co.P; j++) {
          var Pixel = Dw.getNext();
          for (var p=0; p<Co.R; p++) {
            var Color = Pixel[p];
            var BIT = String(Pixel[p] %2);
            STREAM += BIT;
          }
        }
        for (var j=0; j<Co.C; j++) {
          var r = j *Co.L;
          BIN = '';
          for (var k=0; k<Co.L; k++) {
            BIN += STREAM[k +r];
          }
          var DEC = parseInt(BIN, 2);
          Dt.Memo += MLib.ToChar(DEC);
        }
      }
    } else {
      var limit = Dw.Canvas.width *Dw.Canvas.height;
      for (var i=0; i<limit; i++) {
        var Pixel = Dw.getNext();
        var C = [ Pixel[0], Pixel[1], Pixel[2], Pixel[3] ];
        C = MLib.Process(MLib.ToChar, C);
        Dt.Memo += C[0] +C[1] +C[2] +C[3];
      }
    }
    var Pattern = new RegExp(`^(${Dt.Head})([\\w\\W]*)(${Dt.Tail})[\\w\\W]*$`);
    var result = null;
    if ((result = Pattern.exec(Dt.Memo)) !== null) {
      if (Dt.Head === result[1] && result[3] === Dt.Tail) {
        Dt.Memo = result[2];
        return Dt.Memo;
      }
    }
    throw new Error("image don't have hide data");
  }
}

//Draw
var Dw = {
  Canvas: null,
  Ctx: null,
  offset: null,
  Initialize: function(config) {
    if (config) {
      if (Dt.Memo.length /Co.C > config.canvas.width *config.canvas.height /Co.P)
        throw new Error("text is too long, this img can't suport this");
      Dt.Base = config.canvas.width;
      Dw.Canvas = config.canvas;
      Dw.Ctx = config.ctx;
    } else {
      var sqrt = Math.sqrt( MLib.Round(Dt.Memo.length, 3) );
      Dt.Base = MLib.Round(sqrt, 1);
      if(Dt.Base %1)
        Dt.Base += 1;

      Dw.Canvas = new npmCanvas(Dt.Base, Dt.Base);
      Dw.Ctx = Dw.Canvas.getContext('2d');
    }
  },
  setOffset: function(C) {
    Dw.xNext(Dw.setPixel, Dw.offset, C);
  },
  setNext: function(C) {
    Dw.setOffset(C);
    Dw.offset += 1;
  },
  setPixel: function(P, C) {
    Dw.Ctx.fillStyle = 'rgba('+C[0]+','+C[1]+','+C[2]+','+C[3]+')';
    Dw.Ctx.fillRect(P.x, P.y, 1, 1);
  },
  xNext: function(F, P, C) {
    var P = new MLib.PtoXY(P);
    return F(P, C);
  },
  getOffset: function() {
    return Dw.xNext(Dw.getPixel, Dw.offset);
  },
  getNext: function() {
    var Px = Dw.getOffset();
    Dw.offset += 1;
    return Px;
  },
  getPixel: function(P) {
    return Dw.Ctx.getImageData(P.x,P.y, 1,1).data;
  }
}

//Math Lib
var MLib = {
  PtoXY: function(P) {
    this.x = P %Dt.Base,
    this.y = (P -this.x) /Dt.Base
  },
  Round: function(Num, Div) {
    var R = Num %Div;
    var Res = Math.round((Num -R) /Div);
    if (Res && R)
      Res += 1;
    return Res;
  },
  Process: function(Work, List) {
    Object.keys(List).forEach( function(key) {
      List[key] = Work(List[key]);
    });
    return List;
  },
  ToCode: function(Item) {
    if(Item == undefined)
      Item = String.fromCharCode(0);
    return Item.charCodeAt();
  },
  ToChar: function(Item) {
    return String.fromCharCode(Item);
  }
}

// required's
var fs = require('fs');
var npmCanvas = require('canvas');
var image = npmCanvas.Image;

module.exports = {
  convert: setData,
  revert: getData,
  canvas: getCanvas,
  save:   savePng
}
