'use strict';

/*!
 * code-image-obfuscator
 * Copyright (c) 2016 heyderpd <heyderpd@gmail.com>
 * MIT Licensed
 */

var setImg = function setImg(pathFile) {
  if (pathFile.split('.').pop() !== 'png') {
    throw 'img-obfuscator: image need to be png';
  }
  if (typeof pathFile === 'string') {
    var photo = fs.readFileSync(pathFile);

    var img = new image();
    img.src = photo;

    var canvas = new npmCanvas(img.width, img.height);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);

    Dw.Initialize(canvas, ctx);
  }
};

var setData = function setData(config) {
  if (config.text === undefined) {
    throw 'img-obfuscator: param "text" is undefined';
  }
  if (typeof config.pathFile === 'string') {
    setImg(config.pathFile);
    Dt.Set(config.text);
  } else {
    Dt.Set(config.text, false);
  }
};

var getData = function getData() {
  return Dt.Get();
};

var getCanvas = function getCanvas() {
  return Dw.Canvas;
};

var savePng = function savePng(pathFile) {
  if (typeof pathFile === 'string') {
    (function () {
      var out = fs.createWriteStream(pathFile);
      var stream = Dw.Canvas.pngStream();

      stream.on('data', function (chunk) {
        out.write(chunk);
      });

      stream.on('end', function () {
        console.log('new png created');
      });
    })();
  }
};

// required's

var _require = require('./lib');

var Co = _require.Co;
var Dt = _require.Dt;
var Dw = _require.Dw;
var MLib = _require.MLib;

var fs = require('fs');
var npmCanvas = require('canvas');
var image = npmCanvas.Image;

module.exports = {
  load: setImg,
  save: savePng,
  convert: setData,
  revert: getData,
  canvas: getCanvas
};