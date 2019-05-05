;(function (doc, win) {
	//js页面自适应
    var docEle = doc.documentElement;

    var resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
 
    var recalCulate = function(){
        var width = docEle.clientWidth;
        var height = docEle.clientHeight;
        if (width > 1024) {//最大宽度640px
            width =1024;
        }
        docEle.style.fontSize = 75 * (width / 750) + 'px';//以宽为640px为基准，rem为20px
    };
    recalCulate();
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvent, recalCulate, false);
    //加载自体图标
    var icon_css ='<link rel="stylesheet" type="text/css" href="https://at.alicdn.com/t/font_1166350_x4c1gw7k6f.css"/>';
    var head = $("head");
    head.append(icon_css);
    /*搜索*/
	/*$(".search").click(function(){
		$(".search_icon").css("display","none");
		$(".search_input").css("display","block");
		$(".search_input").focus();
	});
	$(".search_input").blur(function(){
		$(this).css("display","none");
		$(".search_icon").css("display","flex");
	});*/
    /*$("#menu").click(function(){
	    $("#menu").removeClass("menu_animation");
	});
	$(".menu_con").click(function(event){
	    event.stopPropagation();
	});*/
	//购物车
	$("body,html").click(function(){
		$(".shopping_con").css("display","none");
	});
	$("#shopping").click(function(event){
		event.stopPropagation();
		var block = $(this).children(".shopping_con").css("display");
		if(block=='none'){
			$(this).children(".shopping_con").css("display","block");
		}else{
			$(this).children(".shopping_con").css("display","none");
		}
	});
	$(".shopping_con").click(function(event){
		event.stopPropagation();
	});
	//底部导航颜色切换
	$(".center_footer_nav li").click(function(){
		$(this).children('a').addClass('color_blue').siblings().removeClass('color_blue');
	});
})(document, window);