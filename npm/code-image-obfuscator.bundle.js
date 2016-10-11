/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/*!
	 * code-image-obfuscator
	 * Copyright (c) 2016 heyderpd <heyderpd@gmail.com>
	 * MIT Licensed
	 */

	var setData = function setData(config) {
	  if (config.imgId === undefined) {
	    throw 'img-obfuscator: param "imgId" is undefined';
	  }
	  if (config.text === undefined) {
	    throw 'img-obfuscator: param "text" is undefined';
	  }
	  if (typeof config.imgId === 'string') {
	    var img = document.getElementById(config.imgId);

	    var canvas = document.createElement('canvas');
	    var ctx = canvas.getContext('2d');
	    ctx.drawImage(img, 0, 0, img.width, img.height);

	    Dw.Initialize(canvas, ctx);
	    Dt.Set(config.text);

	    if (config.canvasId) {
	      writeCanvas(config.canvasId);
	    }
	  } else {
	    Dt.Set(config.text, false);
	  }
	};

	var getData = function getData() {
	  return Dt.Get();
	};

	var setCanvas = function setCanvas() {// TODO funcao incompleta
	};

	var getCanvas = function getCanvas() {
	  Dw.Canvas;
	};

	var writeCanvas = function writeCanvas(CanvasID) {
	  var Canvas = document.getElementById(CanvasID);
	  Canvas.parentNode.replaceChild(Dw.Canvas, Canvas);
	};

	// required's

	var _require = __webpack_require__(1);

	var Co = _require.Co;
	var Dt = _require.Dt;
	var Dw = _require.Dw;
	var MLib = _require.MLib;


	var cio = {
	  setData: setData,
	  getData: getData,
	  setCanvas: getCanvas,
	  getCanvas: getCanvas,
	  renderCanvas: writeCanvas
	};

	window.module = { cio: cio };

	module.exports = cio;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	/*!
	 * code-image-obfuscator
	 * Copyright (c) 2016 heyderpd <heyderpd@gmail.com>
	 * MIT Licensed
	 */

	//config
	var Co = {
	  R: 3, //RGBA
	  C: 3, //CHAR
	  L: 8, //CHAR LEN
	  P: 8 //PIXEL
	};

	//Data
	var Dt = {
	  Head: '!NPM',
	  Tail: 'code-image-obfuscator!',
	  Merge: false,
	  Memo: '',
	  Base: null,
	  Set: function Set(text) {
	    Dt.Memo = Dt.Head + text + Dt.Tail;
	    Dw.offset = 0;
	    if (Dt.Merge) {
	      var limit = MLib.Round(Dt.Memo.length, Co.C);
	      for (var i = 0; i < limit; i++) {
	        var r = i * Co.C;
	        var STREAM = '';
	        for (var b = 0; b < Co.C; b++) {
	          var BIN = MLib.ToCode(Dt.Memo[b + r]).toString(2);
	          while (BIN.length < Co.L) {
	            BIN = '0' + BIN;
	          }
	          STREAM += BIN;
	        }
	        for (var j = 0; j < Co.P; j++) {
	          var _r = j * Co.R;
	          var Pixel = Dw.getOffset();
	          for (var p = 0; p < Co.R; p++) {
	            var odd = Pixel[p] % 2;
	            var BIT = STREAM[p + _r];
	            if (!odd && BIT === '1') {
	              Pixel[p] += 1;
	            } else if (odd && BIT === '0') {
	              Pixel[p] -= 1;
	            }
	          }
	          var Color = [Pixel[0], Pixel[1], Pixel[2], 255];
	          Dw.setNext(Color);
	        }
	      }
	    } else {
	      var _limit = MLib.Round(Dt.Memo.length, 4);
	      for (var _i = 0; _i < _limit; _i++) {
	        var _j = _i * 3;
	        var C = [Dt.Memo[_j], Dt.Memo[_j + 1], Dt.Memo[_j + 2], Dt.Memo[_j + 3]];
	        C = MLib.Process(MLib.ToCode, C);
	        Dw.getOffset();
	        Dw.setNext(C);
	      }
	    }
	    return Dw.Canvas;
	  },
	  Get: function Get() {
	    Dw.offset = 0;
	    Dt.Memo = '';
	    if (Dt.Merge) {
	      var limit = MLib.Round(Dw.Canvas.width * Dw.Canvas.height, Co.P);
	      for (var i = 0; i < limit; i++) {
	        var STREAM = '';
	        for (var j = 0; j < Co.P; j++) {
	          var Pixel = Dw.getNext();
	          for (var p = 0; p < Co.R; p++) {
	            var Color = Pixel[p];
	            var BIT = String(Pixel[p] % 2);
	            STREAM += BIT;
	          }
	        }
	        for (var _j2 = 0; _j2 < Co.C; _j2++) {
	          var r = _j2 * Co.L;
	          var BIN = '';
	          for (var k = 0; k < Co.L; k++) {
	            BIN += STREAM[k + r];
	          }
	          var DEC = parseInt(BIN, 2);
	          Dt.Memo += MLib.ToChar(DEC);
	        }
	      }
	    } else {
	      var _limit2 = Dw.Canvas.width * Dw.Canvas.height;
	      for (var _i2 = 0; _i2 < _limit2; _i2++) {
	        var _Pixel = Dw.getNext();
	        var C = [_Pixel[0], _Pixel[1], _Pixel[2], _Pixel[3]];
	        C = MLib.Process(MLib.ToChar, C);
	        Dt.Memo += C[0] + C[1] + C[2] + C[3];
	      }
	    }
	    var Pattern = new RegExp('^(' + Dt.Head + ')([\\w\\W]*)(' + Dt.Tail + ')[\\w\\W]*$');
	    var result = null;
	    if ((result = Pattern.exec(Dt.Memo)) !== null) {
	      if (Dt.Head === result[1] && result[3] === Dt.Tail) {
	        Dt.Memo = result[2];
	        return Dt.Memo;
	      }
	    }
	    throw new Error("image don't have hide data");
	  }
	};

	//Draw
	var Dw = {
	  Canvas: null,
	  Ctx: null,
	  offset: null,
	  Initialize: function Initialize(canvas, ctx) {
	    if (canvas) {
	      if (Dt.Memo.length / Co.C > canvas.width * canvas.height / Co.P) throw new Error("text is too long, this img can't suport this");
	      Dt.Base = canvas.width;
	      Dw.Canvas = canvas;
	      Dw.Ctx = ctx;
	      Dt.Merge = true;
	    } else {
	      var sqrt = Math.sqrt(MLib.Round(Dt.Memo.length, 3));
	      Dt.Base = MLib.Round(sqrt, 1);
	      if (Dt.Base % 1) Dt.Base += 1;

	      Dw.Canvas = new npmCanvas(Dt.Base, Dt.Base);
	      Dw.Ctx = Dw.Canvas.getContext('2d');
	    }
	  },
	  setOffset: function setOffset(C) {
	    Dw.xNext(Dw.setPixel, Dw.offset, C);
	  },
	  setNext: function setNext(C) {
	    Dw.setOffset(C);
	    Dw.offset += 1;
	  },
	  setPixel: function setPixel(P, C) {
	    Dw.Ctx.fillStyle = 'rgba(' + C[0] + ',' + C[1] + ',' + C[2] + ',' + C[3] + ')';
	    Dw.Ctx.fillRect(P.x, P.y, 1, 1);
	  },
	  xNext: function xNext(F, P, C) {
	    P = new MLib.PtoXY(P, Dt.Base);
	    return F(P, C);
	  },
	  getOffset: function getOffset() {
	    return Dw.xNext(Dw.getPixel, Dw.offset);
	  },
	  getNext: function getNext() {
	    var Px = Dw.getOffset();
	    Dw.offset += 1;
	    return Px;
	  },
	  getPixel: function getPixel(P) {
	    return Dw.Ctx.getImageData(P.x, P.y, 1, 1).data;
	  }
	};

	//Math Lib
	var MLib = {
	  PtoXY: function PtoXY(P, B) {
	    this.x = P % B, this.y = (P - this.x) / B;
	  },
	  Round: function Round(Num, Div) {
	    var R = Num % Div;
	    var Res = Math.round((Num - R) / Div);
	    if (Res && R) Res += 1;
	    return Res;
	  },
	  Process: function Process(Work, List) {
	    Object.keys(List).forEach(function (key) {
	      List[key] = Work(List[key]);
	    });
	    return List;
	  },
	  ToCode: function ToCode(Item) {
	    if (Item == undefined) Item = String.fromCharCode(0);
	    return Item.charCodeAt();
	  },
	  ToChar: function ToChar(Item) {
	    return String.fromCharCode(Item);
	  }
	};

	module.exports = {
	  Co: Co,
	  Dt: Dt,
	  Dw: Dw,
	  MLib: MLib
	};

/***/ }
/******/ ]);