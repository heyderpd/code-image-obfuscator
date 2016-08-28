# CODE IMAGE OBFUSCATOR

# Plugin that converts text to image and reverte.

## Motivation
Attempt to hide a javascript file during transmission .

## Future
* Hide the original data by means of a secret key.
* Use a source image and merge changing the least original.

## Example of use:
```javascript
function Initialize(){
  JSInImgEncode.Initialize();
  Canvas = document.getElementsByTagName('canvas')[0];
}

function doConvert(){
  var Data = $('.before').val();
  JSInImgEncode.Set(Data, $('canvas'));
}

function doRevert(){
  $('.after').val( JSInImgEncode.Get() );
}

```