var cio = (function (exports) {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    var CastPixel = function (Array) {
        var _a = __read(Array, 4), R = _a[0], G = _a[1], B = _a[2], A = _a[3];
        var P = {
            R: R,
            G: G,
            B: B,
            A: A,
            Array: Array
        };
        return P;
    };

    var load = function (canvasId) {
        var originalCanvas = document.getElementById(canvasId);
        var newCanvas = document.createElement('canvas');
        return [originalCanvas, newCanvas];
    };
    var save = function (canvasId, canvas) {
        var newCanvas = document.getElementById(canvasId);
        var ctx = newCanvas.getContext('2d');
        ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
    };

    var Canvas = /** @class */ (function () {
        function Canvas(imagePath) {
            this.path = null;
            this.canvas = null;
            this.context = null;
            this.width = 0;
            this.height = 0;
            var _a = __read(load(imagePath), 2), originalCanvas = _a[0], canvas = _a[1];
            this.canvas = canvas;
            this.width = canvas.width;
            this.height = canvas.height;
            this.context = this.canvas.getContext('2d');
            this.context.drawImage(originalCanvas, 0, 0, this.width, this.height);
        }
        Canvas.prototype.setPixel = function (positon, pixel) {
            this.context.fillStyle = "rgba(".concat(pixel.R, ",").concat(pixel.G, ",").concat(pixel.B, ",").concat(pixel.A, ")");
            this.context.fillRect(positon.X, positon.Y, 1, 1);
        };
        Canvas.prototype.getPixel = function (Pixel) {
            var pixel = this.context.getImageData(Pixel.X, Pixel.Y, 1, 1).data;
            return CastPixel(pixel);
        };
        Canvas.prototype.save = function (imagePath) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, save(imagePath, this.canvas)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return Canvas;
    }());

    var wordLength = 8;
    var pixelSize = 3;
    var pixelChunkSize = 4;
    var messageChunkSize = 32;

    var PositionToXY = function (Position, Width, Height) {
        var X = Position % Width;
        var Y = (Position - X) / Width;
        if (Y >= Height) {
            return null;
        }
        return {
            X: X,
            Y: Y
        };
    };
    var IsODD = function (value) {
        return value % 2;
    };
    var createFilledZeros = function (length) { return new Array(length).fill(0).join(''); };
    var filledZeros = createFilledZeros(wordLength);
    var convertCharToBinary = function (char) {
        if (char === void 0) { char = '\u0000'; }
        return (filledZeros + char
            .charCodeAt(0)
            .toString(2)).substr(-wordLength);
    };
    var convertCharToBinaryArray = function (char) {
        return convertCharToBinary(char)
            .split('')
            .map(function (bit) { return bit === '1'; });
    };
    var convertBinaryToChar = function (char) { return String.fromCharCode(parseInt(char.join(''), 2)); };

    var name = "code-image-obfuscator";
    var version = "3.0.0";

    var project = "".concat(name, "@").concat(version);
    var head = "{".concat(project, "}>>>");
    var tail = "<<<{".concat(project, "}");
    var headPattern = new RegExp("^(".concat(head, ")"));
    var tailPattern = new RegExp("(".concat(tail, ")"));
    if (project.length > messageChunkSize * 2) {
        throw new Error('invalid word buffer size');
    }
    var MountMessage = function (messageChunk) {
        return head + messageChunk + tail;
    };
    var findMessageHead = function (messageChunk) {
        var match = headPattern.exec(messageChunk);
        if (!match) {
            return null;
        }
        var group = match[0];
        var length = match.index;
        var position = length + group.length;
        return {
            chunk: 0,
            position: position
        };
    };
    var findMessageTail = function (messageChunk, messageNextChunk) {
        var match = tailPattern.exec(messageChunk + messageNextChunk);
        if (!match) {
            return null;
        }
        var position = match.index;
        if (position == 0) {
            return {
                chunk: -1,
                position: messageChunkSize
            };
        }
        if (position < messageChunkSize) {
            return {
                chunk: 0,
                position: position
            };
        }
        else {
            return {
                chunk: 1,
                position: position - messageChunkSize
            };
        }
    };

    var _a;
    var Iterator = /** @class */ (function () {
        function Iterator(iterator) {
            var _this = this;
            if (iterator === void 0) { iterator = null; }
            this._done = false;
            this._size = 0;
            this._index = 0;
            this._buffer = [];
            this._iterator = null;
            this[_a] = function () {
                return {
                    next: function () {
                        return {
                            done: _this._done,
                            value: _this.findNextChunk()
                        };
                    }
                };
            };
            this.getIterator = function () { return _this[Symbol.iterator](); };
            if (iterator) {
                this._iterator = iterator.getIterator();
            }
        }
        Iterator.prototype._flush = function () {
            var chunk = null;
            if (this._buffer.length < this._size) {
                chunk = this._buffer;
                this._buffer = [];
            }
            else {
                chunk = this._buffer.slice(0, this._size);
                this._buffer = this._buffer.slice(this._size);
            }
            return this.process(chunk);
        };
        Iterator.prototype._pushAndFlush = function () {
            if (this._buffer.length >= this._size) {
                return this._flush();
            }
            var item = this.getItem();
            if (item.done) {
                return this._flush();
            }
            if (!item.value) {
                return null;
            }
            if (Array.isArray(item.value)) {
                this._buffer = this._buffer.concat(item.value);
            }
            else {
                this._buffer.push(item.value);
            }
        };
        Iterator.prototype.getItem = function () {
            return this._iterator.next();
        };
        Iterator.prototype.process = function (chunk) {
            return chunk;
        };
        Iterator.prototype.findNextChunk = function () {
            var value = null;
            while (value == null) {
                value = this._pushAndFlush();
                if (this._done) {
                    break;
                }
            }
            return value;
        };
        return Iterator;
    }());
    _a = Symbol.iterator;

    var MessageReaderMiddleIterator = /** @class */ (function (_super) {
        __extends(MessageReaderMiddleIterator, _super);
        function MessageReaderMiddleIterator(iterator) {
            var _this = _super.call(this, iterator) || this;
            _this._size = messageChunkSize * wordLength;
            return _this;
        }
        MessageReaderMiddleIterator.prototype.process = function (data) {
            var chunk = '';
            var char;
            while (data.length > 0) {
                char = data.slice(0, wordLength);
                data = data.slice(wordLength);
                chunk += convertBinaryToChar(char);
            }
            return chunk;
        };
        return MessageReaderMiddleIterator;
    }(Iterator));
    var MessageReaderIterator = /** @class */ (function (_super) {
        __extends(MessageReaderIterator, _super);
        function MessageReaderIterator(iterator) {
            var _this = _super.call(this, new MessageReaderMiddleIterator(iterator)) || this;
            _this._size = 1;
            _this._findingHead = true;
            _this._lastChunk = '';
            _this.message = '';
            return _this;
        }
        MessageReaderIterator.prototype.process = function (chunk) {
            chunk = chunk.pop();
            if (this._findingHead) {
                var start = findMessageHead(chunk);
                if (!start) {
                    throw new Error('message not found');
                }
                this._lastChunk = chunk.slice(start.position);
                this.message = this._lastChunk;
                this._findingHead = false;
                return;
            }
            var end = findMessageTail(this._lastChunk, chunk);
            if (end) {
                this._lastChunk += chunk;
                var length_1 = (end.chunk * messageChunkSize) + end.position;
                this.message += this._lastChunk.slice(0, length_1);
                this._done = true;
                return;
            }
            this.message += this._lastChunk;
            this._lastChunk = chunk;
        };
        return MessageReaderIterator;
    }(Iterator));
    var MessageWriterIterator = /** @class */ (function (_super) {
        __extends(MessageWriterIterator, _super);
        function MessageWriterIterator(message) {
            var _this = _super.call(this) || this;
            _this._size = messageChunkSize;
            _this.message = '';
            _this.message = MountMessage(message);
            _this.getItem = function () {
                if (_this.message.length <= _this._index) {
                    _this._done = true;
                    return {
                        done: true
                    };
                }
                var value = _this.message.slice(_this._index, ++_this._index);
                return {
                    value: value
                };
            };
            return _this;
        }
        MessageWriterIterator.prototype.process = function (chunk) {
            var _a;
            return (_a = Array()).concat.apply(_a, __spreadArray([], __read(chunk.map(convertCharToBinaryArray)), false));
        };
        return MessageWriterIterator;
    }(Iterator));

    var ConvertDataToPixel = function (P, data) {
        var pixel = P.Array;
        data.map(function (bit, color) {
            var value = pixel[color];
            var odd = IsODD(value);
            if (odd && !bit) {
                value -= 1;
            }
            else if (!odd && bit) {
                value += 1;
            }
            pixel[color] = value;
        });
        return CastPixel(pixel);
    };
    var ConvertPixelToData = function (P) {
        var pixel = new Array(pixelSize);
        P.Array
            .slice(0, pixelSize)
            .map(function (color, pos) { return pixel[pos] = IsODD(color); });
        return pixel;
    };

    var CanvasReaderIterator = /** @class */ (function (_super) {
        __extends(CanvasReaderIterator, _super);
        function CanvasReaderIterator(canvasWrapper) {
            var _this = _super.call(this) || this;
            _this._size = pixelChunkSize;
            _this._canvasWrapper = null;
            _this._canvasWrapper = canvasWrapper;
            return _this;
        }
        CanvasReaderIterator.prototype.getItem = function () {
            var position = PositionToXY(this._index++, this._canvasWrapper.width, this._canvasWrapper.height);
            if (position == null) {
                this._done = true;
                return {
                    done: true
                };
            }
            var value = this._canvasWrapper.getPixel(position);
            return {
                value: value
            };
        };
        CanvasReaderIterator.prototype.process = function (data) {
            var _a;
            return (_a = Array()).concat.apply(_a, __spreadArray([], __read(data.map(ConvertPixelToData)), false));
        };
        return CanvasReaderIterator;
    }(Iterator));
    var CanvasWriterIterator = /** @class */ (function (_super) {
        __extends(CanvasWriterIterator, _super);
        function CanvasWriterIterator(dataIterator, canvasWrapper) {
            var _this = _super.call(this, dataIterator) || this;
            _this._size = pixelSize;
            _this._canvasWrapper = null;
            _this._canvasWrapper = canvasWrapper;
            return _this;
        }
        CanvasWriterIterator.prototype.process = function (data) {
            var position = PositionToXY(this._index++, this._canvasWrapper.width, this._canvasWrapper.height);
            if (position == null || data.length == 0) {
                if (data.length > 0) {
                    throw new Error('data will be lost');
                }
                this._done = true;
                return null;
            }
            var pixel = this._canvasWrapper.getPixel(position);
            var newPixel = ConvertDataToPixel(pixel, data);
            this._canvasWrapper.setPixel(position, newPixel);
        };
        return CanvasWriterIterator;
    }(Iterator));

    var SaveMessage = function (canvas, message) {
        var e_1, _a;
        var MessageIterator = new MessageWriterIterator(message);
        var CanvasIterator = new CanvasWriterIterator(MessageIterator, canvas);
        try {
            for (var CanvasIterator_1 = __values(CanvasIterator), CanvasIterator_1_1 = CanvasIterator_1.next(); !CanvasIterator_1_1.done; CanvasIterator_1_1 = CanvasIterator_1.next()) {
                var item = CanvasIterator_1_1.value;
                // console.log('.')
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (CanvasIterator_1_1 && !CanvasIterator_1_1.done && (_a = CanvasIterator_1["return"])) _a.call(CanvasIterator_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    var LoadMessage = function (canvas) {
        var e_2, _a;
        var CanvasIterator = new CanvasReaderIterator(canvas);
        var MessageIterator = new MessageReaderIterator(CanvasIterator);
        try {
            for (var MessageIterator_1 = __values(MessageIterator), MessageIterator_1_1 = MessageIterator_1.next(); !MessageIterator_1_1.done; MessageIterator_1_1 = MessageIterator_1.next()) {
                var item = MessageIterator_1_1.value;
                // console.log('.')
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (MessageIterator_1_1 && !MessageIterator_1_1.done && (_a = MessageIterator_1["return"])) _a.call(MessageIterator_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return MessageIterator.message;
    };

    var canvasMessageLimit = function (width, height) {
        return width * height * pixelSize;
    };
    var messageSize = function (length) {
        return length * wordLength;
    };
    var canvasSuportLimit = function (canvasWidth, canvasHeight, messageLength) {
        return messageSize(messageLength) / canvasMessageLimit(canvasWidth, canvasHeight);
    };
    var canvasSuportSugest = function (value) {
        value = value - 1;
        value = Math.round(value * 100);
        value = "%".concat(value);
        throw new Error("insuficiente image size, suggest image ".concat(value, " bigger"));
    };
    var checkCanvasSuportMessage = function (canvasWidth, canvasHeight, messageLength) {
        var value = canvasSuportLimit(canvasWidth, canvasHeight, messageLength);
        if (value > 1) {
            canvasSuportSugest(value);
        }
    };

    var Save = function (imagePath, message, newImagePath) {
        if (newImagePath === void 0) { newImagePath = null; }
        return __awaiter(void 0, void 0, void 0, function () {
            var canvasWrapper;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        canvasWrapper = new Canvas(imagePath);
                        checkCanvasSuportMessage(canvasWrapper.width, canvasWrapper.height, message.length);
                        return [4 /*yield*/, SaveMessage(canvasWrapper, message)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, canvasWrapper.save(newImagePath)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    var Load = function (imagePath) { return __awaiter(void 0, void 0, void 0, function () {
        var canvas;
        return __generator(this, function (_a) {
            canvas = new Canvas(imagePath);
            return [2 /*return*/, LoadMessage(canvas)];
        });
    }); };

    exports.Load = Load;
    exports.Save = Save;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
