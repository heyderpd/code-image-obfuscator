
/*!
 * code-image-obfuscator
 * Copyright (c) 2016 heyderpd <heyderpd@gmail.com>
 * ISC Licensed
 */

var CodeImageObfuscator, _CIO_;
CodeImageObfuscator = _CIO_ = {
  SetData: function(config){
    //config.image
    if (config.text  === undefined) { throw 'img-obfuscator: param "text" is undefined' };
    if (typeof(config.image) === 'string') {
      var img = document.getElementById(config.image);

      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);

      _CIO_.Dt.Set(config.text, canvas, ctx);
    } else {
      _CIO_.Dt.Set(config.text, false);
    }
  },
  GetData: function(){
    return _CIO_.Dt.Get();
  },
  GetCanvas: function(){
    _CIO_.Dw.Canvas;
  },
  WriteCanvas: function(CanvasID){
    var Canvas = document.getElementById("myCanvas");
    Canvas.parentNode.replaceChild(_CIO_.Dw.Canvas, Canvas);
  },
  Co: { //config
    R: 3, //RGBA
    C: 3, //CHAR
    L: 8, //CHAR LEN
    P: 8  //PIXEL
  },
  Dt: { //Data
    Head: '!NPM;',
    Tail: ';code-image-obfuscator!',
    Merge: false,
    Memo: null,
    Base: null,
    Set: function(text, canvas, ctx) {
      if (canvas) {
        _CIO_.Dt.Merge = true;
        var config = {canvas: canvas, ctx: ctx};
      } else {
        var config = false;
      }
      _CIO_.Dt.Memo = _CIO_.Dt.Head +text +_CIO_.Dt.Tail;
      _CIO_.Dw.Initialize(config);
      _CIO_.Dw.offset = 0;
      if (_CIO_.Dt.Merge) {
        var limit = _CIO_.MLib.Round(_CIO_.Dt.Memo.length, _CIO_.Co.C);
        for (var i=0; i<limit; i++) {
          var r = i *_CIO_.Co.C;
          var STREAM = '';
          for (var b=0; b<_CIO_.Co.C; b++) {
            var BIN = _CIO_.MLib.ToCode(_CIO_.Dt.Memo[b +r]).toString(2);
            while (BIN.length < _CIO_.Co.L){
              BIN = '0'+BIN;
            }
            STREAM += BIN;
          }
          for (var j=0; j<_CIO_.Co.P; j++) {
            var r = j *_CIO_.Co.R;
            var Pixel = _CIO_.Dw.getOffset();
            for (var p=0; p<_CIO_.Co.R; p++) {
              var odd = Pixel[p] %2;
              var BIT = STREAM[p +r];
              if (!odd && BIT === '1') {
                Pixel[p] += 1;
              } else if (odd && BIT === '0') {
                Pixel[p] -= 1;
              }
            }
            var Color = [ Pixel[0], Pixel[1], Pixel[2], Pixel[3] ];
            _CIO_.Dw.setNext(Color);
          }
        }
      } else {
        var limit = _CIO_.MLib.Round(_CIO_.Dt.Memo.length, 4);
        for (var i=0; i<limit; i++) {
          var j = i *3;
          var C = [ _CIO_.Dt.Memo[j], _CIO_.Dt.Memo[j+1], _CIO_.Dt.Memo[j+2], _CIO_.Dt.Memo[j+3] ];
          C = _CIO_.MLib.Process(_CIO_.MLib.ToCode, C);
          _CIO_.Dw.setArray(C, i);
        };
      }
      return _CIO_.Dw.Canvas;
    },
    Get: function() {
      _CIO_.Dw.offset = 0;
      _CIO_.Dt.Memo = '';
      if (_CIO_.Dt.Merge) {
        var limit = _CIO_.MLib.Round(_CIO_.Dw.Canvas.width *_CIO_.Dw.Canvas.height, _CIO_.Co.P);
        for (var i=0; i<limit; i++) {
          var STREAM = '';
          for (var j=0; j<_CIO_.Co.P; j++) {
            var Pixel = _CIO_.Dw.getNext();
            for (var p=0; p<_CIO_.Co.R; p++) {
              var Color = Pixel[p];
              var BIT = String(Pixel[p] %2);
              STREAM += BIT;
            }
          }
          for (var j=0; j<_CIO_.Co.C; j++) {
            var r = j *_CIO_.Co.L;
            BIN = '';
            for (var k=0; k<_CIO_.Co.L; k++) {
              BIN += STREAM[k +r];
            }
            var DEC = parseInt(BIN, 2);
            _CIO_.Dt.Memo += _CIO_.MLib.ToChar(DEC);
          }
        }
      } else {
        var limit = _CIO_.Dw.Canvas.width *_CIO_.Dw.Canvas.height;
        for (var i=0; i<limit; i++) {
          var Pixel = _CIO_.Dw.getNext();
          var C = [ Pixel[0], Pixel[1], Pixel[2], Pixel[3] ];
          C = _CIO_.MLib.Process(_CIO_.MLib.ToChar, C);
          _CIO_.Dt.Memo += C[0] +C[1] +C[2] +C[3];
        }
      }
      var Pattern = new RegExp(`^(${_CIO_.Dt.Head})([\\w\\W]*)(${_CIO_.Dt.Tail})[\\w\\W]*$`);
      var result = null;
      if ((result = Pattern.exec(_CIO_.Dt.Memo)) !== null) {
        if (_CIO_.Dt.Head === result[1] && result[3] === _CIO_.Dt.Tail) {
          _CIO_.Dt.Memo = result[2];
          return _CIO_.Dt.Memo;
        }
      }
      throw new Error("image don't have hide data");
    }
  },
  Dw: { //Draw
    Canvas: null,
    Ctx: null,
    offset: null,
    Initialize: function(config) {
      if (config) {
        if (_CIO_.Dt.Memo.length /_CIO_.Co.C > config.canvas.width *config.canvas.height /_CIO_.Co.P)
          throw new Error("text is too long, this img can't suport this");
        _CIO_.Dt.Base = config.canvas.width;
        _CIO_.Dw.Canvas = config.canvas;
        _CIO_.Dw.Ctx = config.ctx;
      } else {
        var sqrt = Math.sqrt( _CIO_.MLib.Round(_CIO_.Dt.Memo.length, 3) );
        _CIO_.Dt.Base = _CIO_.MLib.Round(sqrt, 1);
        if(_CIO_.Dt.Base %1)
          _CIO_.Dt.Base += 1;

        _CIO_.Dw.Canvas = document.createElement('canvas');
        _CIO_.Dw.Ctx = _CIO_.Dw.Canvas.getContext('2d');
        _CIO_.Dw.Ctx.drawImage(undefined, 0, 0, _CIO_.Dt.Base, _CIO_.Dt.Base)
      }
    },
    setOffset: function(C) {
      _CIO_.Dw.xNext(_CIO_.Dw.setPixel, _CIO_.Dw.offset, C);
    },
    setNext: function(C) {
      _CIO_.Dw.setOffset(C);
      _CIO_.Dw.offset += 1;
    },
    setPixel: function(P, C) {
      _CIO_.Dw.Ctx.fillStyle = 'rgba('+C[0]+','+C[1]+','+C[2]+','+C[3]+')';
      _CIO_.Dw.Ctx.fillRect(P.x, P.y, 1, 1);
    },
    xNext: function(F, P, C) {
      var P = new _CIO_.MLib.PtoXY(P, _CIO_.Dt.Base);
      return F(P, C);
    },
    getOffset: function() {
      return _CIO_.Dw.xNext(_CIO_.Dw.getPixel, _CIO_.Dw.offset);
    },
    getNext: function() {
      var Px = _CIO_.Dw.getOffset();
      _CIO_.Dw.offset += 1;
      return Px;
    },
    getPixel: function(P) {
      return _CIO_.Dw.Ctx.getImageData(P.x,P.y, 1,1).data;
    }
  },
  MLib: { //Math Lib
    PtoXY: function(P, B) {
      this.x = P %B,
      this.y = (P -this.x) /B
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
};
