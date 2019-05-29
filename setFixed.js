$.fn.extend({
	// fixSpace 距离顶部多少距离开始fixed定位 可选
	// fixClass 在fixed status 添加的 class:string 可选
    setFixed: function(obj) {
        var menu = this,
        menuTop = menu.offset().top,
        menuLeft = menu.offset().left,
        menuFix = false,
        fixSpace = obj ? obj.fixSpace || 0  : 0,
        fixClass = obj ? obj.fixClass || '' : '',
        defaultLayer = {
            'width': menu.width(),
            'height': menu.height(),
            'padding': menu.css('padding'),
            'margin': menu.css('margin'),
            'float': menu.css('float'),
            'position': menu.css('position'),
            'top': menu.css('top'),
            'left': menu.css('left'),
            'zIndex': menu.css('zIndex')
        },
        fixedLayer = Object.assign({},
        defaultLayer, {
            position: "fixed",
            top: fixSpace,
            left: menuLeft,
            zIndex: 1000,
        }),
        fixFun = function() {
            var curTop = $(document).scrollTop() - menuTop + fixSpace;
            if (curTop >= 0 && !menuFix) {
                menu.wrap('<div></div>').parent().css(defaultLayer).children().css(fixedLayer).addClass(fixClass);
                menuFix = true;
            } else if (curTop <= 0 && menuFix) {
                menu.css(defaultLayer).removeClass(fixClass).unwrap();
                menuFix = false;
            }

        };
        if (window.addEventListener) {
            document.addEventListener('scroll', fixFun);
        } else {
            document.attachEvent('onscroll', fixFun);
        }

    }
});