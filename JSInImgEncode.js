JSInImgEncode = {
	Initialize: function(Data){
		this.Data.Initialize(this, Data);
	},
	Set: function(Data, Canvas){
		var image = this.Data.Set(Data);
		if(typeof(Canvas) == 'object')
			Canvas.replaceWith(image);
		else
			return image;
	},
	Get: function(){
		return this.Data.Get();
	},
	Data: {
		parent: null,
		Memo: null,
		Base: null,
		Initialize: function(Father){
			this.parent = Father;
		},
		Set: function(Data){
			this.Memo = Data;
			this.parent.Draw.Initialize(this.parent);
			for(var i=0; i<this.parent.Math.RoundUP(this.Memo.length, 3); i++){
				var j = i *3;
				var C = new this.parent.Objets.Color(this.Memo[j], this.Memo[j+1], this.Memo[j+2]);
				C = this.parent.Math.Process(this.parent.Math.ToCode, C);
				C = this.parent.Math.Process(this.parent.Math.Encode, C);
				this.parent.Draw.NextPixel(C, i);
			}
			return this.parent.Draw.Canvas;
		},
		Get: function(){
			this.Memo = ''
			for(var y=0; y<this.Base; y++){
				for(var x=0; x<this.Base; x++){
					var Pixel = this.parent.Draw.getPixel(x,y);
					var C = new this.parent.Objets.Color(Pixel[0], Pixel[1], Pixel[2]);
					C = this.parent.Math.Process(this.parent.Math.Decode, C);
					C = this.parent.Math.Process(this.parent.Math.ToChar, C);
					this.Memo += C.r + C.g + C.b;
				}
			}
			return this.Memo;
		}
	},
	Draw: {
		parent: null,
		Canvas: null,
		Ctx: null,
		Initialize: function(Father){
			this.parent = Father;
			this.Canvas = document.createElement('canvas');
			var sqrt = Math.sqrt( this.parent.Math.RoundUP(this.parent.Data.Memo.length, 3) );
			this.parent.Data.Base = this.parent.Math.RoundUP(sqrt, 1);
			if(this.parent.Data.Base %1)
				this.parent.Data.Base += 1;
			this.Canvas.width  = this.parent.Data.Base;
			this.Canvas.height = this.parent.Data.Base;
			this.Ctx = this.Canvas.getContext('2d');
		},
		NextPixel: function(C, j){
			var P = new this.parent.Objets.Pos(j %this.parent.Data.Base, null);
			P.y = (j -P.x)/this.parent.Data.Base;
			this.setPixel(P, C);
		},
		setPixel: function(P, C){
			this.Ctx.fillStyle = 'rgb('+C.r+','+C.g+','+C.b+')';
			this.Ctx.fillRect(P.x, P.y, 1, 1);
		},
		getPixel: function(x, y){
			return this.Ctx.getImageData(x,y, 1,1).data;
		}
	},
	Objets: {
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
	},
	Math: {
		move: 123,
		RoundUP: function(Num, Div){
			return this.Round(Num, Div, true);
		},
		RoundDOWN: function(Num, Div){
			return this.Round(Num, Div, false);
		},
		Round: function(Num, Div, Up){
			var R = Num %Div;
			var Res = Math.round((Num -R) /Div);
			if (Res && R)
				Res += 1;
			return Res;
		},
		Process: function(Work, Data){
			var This = this;
			$.each(Data, function(key, val){
				if(typeof(val) != "function")
					Data.set(key, Work(This, val) );
			});
			return Data;
		},
		ToCode: function(This, Data){
			if(Data == undefined)
				Data = String.fromCharCode(0);
			return Data.charCodeAt();
		},
		ToChar: function(This, Data){
			return String.fromCharCode(Data);
		},
		Encode: function(This, D){
			D = This.Roll(D, This.move);
			var R = D %2;
			if(R)
				D = ((D -R) /2) +128;
			else
				D = D /2;
			return D;
		},
		Decode: function(This, D){
			if(D < 128)
				D = D *2;
			else
				D = ((D -128) +0.5) *2
			D = This.Roll(D, 256 -This.move);
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
}