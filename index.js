$(function(){
	$('.before').val("function hello(name = 'Mario') {\n    alert('Hello '+name+'!');\n}");
	var Data = $('.before').val();

	JSInImgEncode.Initialize();
	Canvas = document.getElementsByTagName('canvas')[0];
});

function doConvert(){
	var Data = $('.before').val();
	JSInImgEncode.Set(Data, $('canvas'));
}

function doRevert(){
	$('.after').val( JSInImgEncode.Get() );
}
