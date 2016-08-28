
var Set = function(text){
  Data.Set(text);
  return {
    canvas: Draw.Canvas,
    ctx: Draw.Ctx
  };
}

var Get = function(){
  return Data.Get();
}

var Data = {
  Memo: null,
  Base: null,
  Set: function(text){
    Data.Memo = text;
    Draw.Initialize();
    for(var i=0; i<MathLib.RoundUP(Data.Memo.length, 3); i++){
      var j = i *3;
      var C = new Objets.Color(Data.Memo[j], Data.Memo[j+1], Data.Memo[j+2]);
      C = MathLib.Process(MathLib.ToCode, C);
      //C = MathLib.Process(MathLib.Encode, C); //esta gerando ruido!
      Draw.NextPixel(C, i);
    }
    return Draw.Canvas;
  },
  Get: function(){
    Data.Memo = ''
    for(var y=0; y<Data.Base; y++){
      for(var x=0; x<Data.Base; x++){
        var Pixel = Draw.getPixel(x,y);
        var C = new Objets.Color(Pixel[0], Pixel[1], Pixel[2]);
        //C = MathLib.Process(MathLib.Decode, C); //esta gerando ruido! nos espacos nulos
        C = MathLib.Process(MathLib.ToChar, C);
        Data.Memo += C.r + C.g + C.b;
      }
    }
    return Data.Memo;
  }
}

var Draw = {
  Canvas: null,
  Ctx: null,
  Initialize: function(){
    var sqrt = Math.sqrt( MathLib.RoundUP(Data.Memo.length, 3) );
    Data.Base = MathLib.RoundUP(sqrt, 1);
    if(Data.Base %1)
      Data.Base += 1;
    Draw.Canvas = new Canvas(Data.Base, Data.Base);
    Draw.Ctx = Draw.Canvas.getContext('2d');
  },
  NextPixel: function(C, j){
    var P = new Objets.Pos(j %Data.Base, null);
    P.y = (j -P.x)/Data.Base;
    Draw.setPixel(P, C);
  },
  setPixel: function(P, C){
    Draw.Ctx.fillStyle = 'rgb('+C.r+','+C.g+','+C.b+')';
    Draw.Ctx.fillRect(P.x, P.y, 1, 1);
  },
  getPixel: function(x, y){
    return Draw.Ctx.getImageData(x,y, 1,1).data;
  }
}

var Objets = {
  Pos: function(x,y){
    this.x = x,
    this.y = y
  },
  Color: function(r,g,b){
    this.r = r,
    this.g = g,
    this.b = b,
    this.set = function(key, val){
      switch(key){
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
  RoundUP: function(Num, Div){
    return MathLib.Round(Num, Div, true);
  },
  RoundDOWN: function(Num, Div){
    return MathLib.Round(Num, Div, false);
  },
  Round: function(Num, Div, Up){
    var R = Num %Div;
    var Res = Math.round((Num -R) /Div);
    if (Res && R)
      Res += 1;
    return Res;
  },
  Process: function(Work, Data){
    Object.keys(Data).forEach( function(key){
      var val = Data[key];
      if(typeof(val) != "function")
        Data.set(key, Work(val) );
    });
    return Data;
  },
  ToCode: function(Data){
    if(Data == undefined)
      Data = String.fromCharCode(0);
    return Data.charCodeAt();
  },
  ToChar: function(Data){
    return String.fromCharCode(Data);
  },
  Encode: function(D){
    D = MathLib.Roll(D, MathLib.move);
    var R = D %2;
    if(R)
      D = ((D -R) /2) +128;
    else
      D = D /2;
    return D;
  },
  Decode: function(D){
    if(D < 128)
      D = D *2;
    else
      D = ((D -128) +0.5) *2
    D = MathLib.Roll(D, 256 -MathLib.move);
    return D;
  },
  Roll: function(D, Move){
    D += Move;
    if(D < 0)
      D = 256 -D;
    else
      if(D > 255)
        D -= 256;
    return D;
  }
}

var Canvas = require('canvas')

module.exports = {
  convert: Set,
  revert: Get
}
