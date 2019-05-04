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
    var icon_css ='<link rel="stylesheet" type="text/css" href="https://at.alicdn.com/t/font_1166350_bj01j5cgrzu.css"/>';
    var head = $("head");
    head.append(icon_css);
})(document, window);