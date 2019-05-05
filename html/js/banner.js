;(function($){
	var Slide=function(poster){
		//设置参数
		this.setting={
			"slideCell":"#slide",
			"titOnClassName":"on",
			"autoPlay":true,
			"speed":1000,
			"delay":3000,
			"circle":true,
			"LeftRight":true
		}
		$.extend(this.setting,poster);
		this.slideCell=this.setting.slideCell;
		this.titOnClassName=this.setting.titOnClassName;
		this.autoPlay=this.setting.autoPlay;
		this.speed=this.setting.speed;
		this.autoPlay=this.setting.autoPlay;
		//获取元素
		this.moveBox=$(this.slideCell);
		this.box=$(this.slideCell).find(".hd");
		this.box1=$(this.slideCell).find(".hd>li");
		
		this.box1.last().clone().prependTo(this.box);//复制最后一个元素放到最前面
		this.box=$(this.slideCell).find(".hd");//重新获取元素
		this.box1=$(this.slideCell).find(".hd>li");
		this.length=this.box1.length;
		this.width=parseInt($(this.slideCell).width());
		this.maxLeft=-(this.length-1)*this.width;
		this.flag=true;
		var self=this;
		this.count=0;
		//设置样式
		this.moveBox.css({"width":"100%","height":"100%","position":"relative"});
		$(this.box).css({"width":this.width*this.length,"left":"-"+this.width+"px"});
		$(this.box1).css({"width":this.width});
		window.onresize = function(){
			self.moveBox.css({"width":"100%","height":"100%","position":"relative"});
			$(self.box).css({"width":this.width*this.length,"left":"-"+this.width+"px"});
			$(self.box1).css({"width":this.width});
		}
		//手机端触屏左右滑动
		this.starx=0;
		this.endx=0;
		MobileSlide();
	    function MobileSlide(){
	    	$(self.slideCell).on("touchstart",function(e){
	    		clearInterval(self.timer);
	    		starx = e.originalEvent.changedTouches[0].clientX;
	    	});
	    	$(self.slideCell).on("touchend",function(e){
	    		endx = e.originalEvent.changedTouches[0].clientX;
	    		if(starx>endx+10){
	    			if(self.flag){
						self.flag=false;
						self.move("right");
					}
			    }
	    		if(endx>starx+10){
	    			if(self.flag){
						self.flag=false;
					    self.move("left");
					} 
	    		}
	    		self.autoMove();
	    	});
	    }
		//左右点击滑动
		if(this.setting.LeftRight){
			/*var html_="<div id='pre'><img src='../img/btn_l.png' /></div>";
			html_+="<div id='next'><img src='../img/btn_r.png' /></div>";
			$(this.slideCell).append(html_);*/
			this.PreBut=$(this.slideCell).children("#pre");
			this.NextBut=$(this.slideCell).children("#next");
			this.PreBut.click(function(){
				if(self.flag){
					self.flag=false;
					self.move("left");
				}
			});
			this.NextBut.click(function(){
				if(self.flag){
					self.flag=false;
				    self.move("right");
				} 
			});
		}
		//是否自动播放
		if(this.autoPlay){
			this.autoMove();
			$(this.slideCell).hover(function(){
				clearInterval(self.timer);
			},function(){
				self.autoMove();
			});
		}
		//圆点样式及点击事件
		if(this.setting.circle){
			//页面自己添加，可以填写内容
			/*var html="<ul class='bd'>";
			for(var i=0;i<this.length;i++){
				 html+="<li></li>";
			}
			html+="</ul>";
			$(this.slideCell).append(html);*/
			this.small=$(this.slideCell).find(".bd li");
			this.small.first().addClass(this.titOnClassName);
			this.small.click(function(){
					if(self.flag){
						self.flag=false;
						var index=self.small.index(this);
						self.count=index;
					    self.smallBut(index);
					}
				});
		}
	}
	Slide.prototype={
		move:function(dir){
			var _this_=this;
			if(dir==="right"){
				_this_.count++;
				var Left=_this_.box[0].offsetLeft;
				if(_this_.maxLeft==Left){
					_this_.box.css({"left":"0"});
				}
				_this_.box.animate({"left":"-="+_this_.width+"px"},_this_.speed,function(){
					_this_.flag=true;
				});
				_this_.count=_this_.count>=_this_.length-1?0:_this_.count;
				if(_this_.setting.circle){
					_this_.small.eq(_this_.count).addClass(_this_.titOnClassName).siblings().removeClass(_this_.titOnClassName);
				}
			}else if(dir==="left"){
				_this_.count--;
				var Left=_this_.box[0].offsetLeft;
				if(Left==0){
					_this_.box.css({"left":_this_.maxLeft+"px"});
				}
				_this_.box.animate({"left":"+="+_this_.width+"px"},_this_.speed,function(){
					_this_.flag=true;
				});
				_this_.count=_this_.count<0?_this_.length-2:_this_.count;
				if(_this_.setting.circle){
					_this_.small.eq(_this_.count).addClass(_this_.titOnClassName).siblings().removeClass(_this_.titOnClassName);
				}
			}
		},
		autoMove:function(){
			var _this_=this;
			this.timer=window.setInterval(function(){
				_this_.count++;
				var Left=_this_.box[0].offsetLeft;
				if(_this_.maxLeft==Left){
					_this_.box.css({"left":"0"});
				}
				_this_.box.animate({"left":"-="+_this_.width+"px"},_this_.speed,function(){
					_this_.flag=true;
				});
				_this_.count=_this_.count>=_this_.length-1?0:_this_.count;
				if(_this_.setting.circle){
					_this_.small.eq(_this_.count).addClass(_this_.titOnClassName).siblings().removeClass(_this_.titOnClassName);
				}
			},_this_.setting.delay);
		},
		smallBut:function(index){
			var self=this;
			var smallLeft=(index+1)*this.width;
			this.small.eq(index).addClass(this.titOnClassName).siblings().removeClass(this.titOnClassName);
			this.box.animate({"left":"-"+smallLeft+"px"},self.speed,function(){
					self.flag=true;
				});
		}
	}
	window["Slide"]=Slide;
})(jQuery)
