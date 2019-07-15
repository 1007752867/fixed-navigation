/*
 * anthor: huanwang
 * top:Number？ 距离顶部多少距离开始fixed定位
 * add:String？ 绝对定位状态下添加的class 
 * 警告: 对于 表格类标签元素及一些额外标签元素不起作用   不会返回$实例
*/
$.fn.extend({
    setFixed: function(op) {
    	var t = this,
    		e = document,
    		y = t[0].nodeName.toLowerCase(),
    		n = ['table','thead','tbody','tr','td','caption'],
    		h = false;
    	for( var i = n.length-1; i>-1 ;i-- ){
    		if( n[i] == y ){
    			h = true;break;
    		}
    	}
    	if( !h ){
    		var fo = t.offset(),
    			et = fo.top,
    			el = fo.left;
    		var mu = false,
    			pt = 0,
    			pc = '';
    		if( op && 'object' == typeof op ){
    			pt = op.top || 0,
    			pc = op.add || 0;
    		}
    		var tl = t.css.bind( t ),
				dl = {
		            width: t.width(),
		            height: t.height(),
		            padding: tl('padding'),
		            margin: tl('margin'),
		            float: tl('float'),
		            position: tl('position'),
		            top: tl('top'),
		            left: tl('left'),
		            zIndex: tl('zIndex')
    			},
				fl = Object.assign(
					{},
					dl,
					{
			            position: "fixed",
			            top: pt,
			            left: el,
			            zIndex: 9999,	
					}
				);
			var cb = function(){
				var ct = ( e.documentElement.scrollTop || e.body.scrollTop ) - et + pt;
	            if ( ct >= 0 && !mu ) {
	                t.wrap( e.createElement( y ) )
	                	.parent()
	                	.css(dl)
	                	.children()
	                	.css(fl);
	                mu = true;	
	                pc && e.addClass(pc);
	            } else if ( ct <= 0 && mu ) {
	                t.css( dl )
	                	.unwrap();
	                mu = false;
	                pc && e.removeClass( pc );
	            }
			},
			ev = addEventListener;
			if ( ev && 'function' == typeof ev ) {
				ev.call( e , 'scroll', cb );
	        } else {
	            e.attachEvent( 'onscroll', cb );
	        }
	        return t;
    	}else{
    		console.warn(' the element nodeName is not support! ');	
    	}
    }
});