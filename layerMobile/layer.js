/*
	layer�ƶ���
 */

// IIFE(����ִ�к���)
// ;��ֹ�ļ��ϲ�ѹ������������
// !����ʶ������Ǳ��ʽ����ʵ������û�У���û���κ����⣬��Ҳ����+function(){}();�ȣ�
;!function(win){
  
"use strict";

/*
	doc: ����document����
	query������querySelectorAll
	claname������getElementsByClassName
	S�����������ػ�ȡָ��ѡ��������䣬����doument.getElementsByClassName(s)
 */
var doc = document, query = 'querySelectorAll', claname = 'getElementsByClassName', S = function(s){
  return doc[query](s);
};

// Ĭ�ϵ�����
/*
	type������������
	shadow���Ƿ���ʾ����
	shadowClose����������Ƿ�رյ�����
	fixed���Ƿ�̶�
	anim������Ч��
*/
var config = {
  type: 0
  ,shade: true
  ,shadeClose: true
  ,fixed: true
  ,anim: 'scale' 
};

// ���ںϲ����ò���
var ready = {
  extend: function(obj){
    var newobj = JSON.parse(JSON.stringify(config));
    for(var i in obj){
      newobj[i] = obj[i];
    }
    return newobj;
  }, 
  // timer����ʱ�����ϣ������Զ��رյĵ�����
  // end: ������رպ�Ļص�����
  timer: {}, end: {}
};


// ����touch�¼���ʹ���¼�����click�¼���ʵ�֣��¼���ð�ݽ׶β���
ready.touch = function(elem, fn){
  elem.addEventListener('click', function(e){
    fn.call(this, e);
  }, false);
};

// class�����ڶ��嵯�����class����
// Layer���������ںϲ����ò�����������ͼ
var index = 0, classs = ['layui-m-layer'], Layer = function(options){
  var that = this;
  // �ϲ����ò���
  that.config = ready.extend(options);
  that.view();
};

// Layerԭ�������view�������÷����ǰ������ò������ɵ�����
Layer.prototype.view = function(){
	
  // ���config���ö��󣬴���div�ڵ�
  var that = this, config = that.config, layerbox = doc.createElement('div');
  
  // ��div�ڵ����idΨһ��ʶ��layui-m-layer0
  that.id = layerbox.id = classs[0] + index;
  
  // ��div���class���ԣ�����ֵ��layui-m-layer layer-m-layer0
  layerbox.setAttribute('class', classs[0] + ' ' + classs[0]+(config.type || 0));
  // ��div�ڵ���������index������ֵ��0
  layerbox.setAttribute('index', index);
  
  // IIFE���������ñ���
  var title = (function(){
	
	// ��֤���ò���title�����Ƿ���object
    var titype = typeof config.title === 'object';
	
	/*
		config.title��Ϊ��,��title�Ƕ���,��ô<h3 style="" + `$config.title[1]`></h3>, ����<h3 style=""></h3>
		��config.titleΪ��, �򷵻�''
	*/
    return config.title
    ? '<h3 style="'+ (titype ? config.title[1] : '') +'">'+ (titype ? config.title[0] : config.title)  +'</h3>'
    : '';
  }());
  
  // IIFE, ��ť����
  var button = (function(){
	
	// ���config.btn����ʱ���ַ������ͣ��������ó�����
    typeof config.btn === 'string' && (config.btn = [config.btn]);
	
	// ����config.btn���ַ������ͣ����������óɶ���, ��ôbtns = config.btn.length
	// ����config.btnΪBoolean(config.btn) === false, ��ôbtns = [].length
    var btns = (config.btn || []).length, btndom;
	
	// �жϰ�ť��ϢΪ�ջ���û��������ò�����Ϣʱ
    if(btns === 0 || !config.btn){
      return '';
    }
	
	// ȷ�ϰ�ť��HTML
    btndom = '<span yes type="1">'+ config.btn[0] +'</span>'
    if(btns === 2){
	  // ȡ����ť��html
      btndom = '<span no type="0">'+ config.btn[1] +'</span>' + btndom;
    }
	
	// ��ť�����HTML����
    return '<div class="layui-m-layerbtn">'+ btndom + '</div>';
  }());
  
  // ������ò�����Ҫ��̶�
  if(!config.fixed){
   
    // ��̬���top���ԣ���������top���ԣ�������topΪ100
    config.top = config.hasOwnProperty('top') ?  config.top : 100;
	
	// ��������ʽ��document.body.scrollTop(ҳ����������붥���ľ���) + top
    config.style = config.style || '';
    config.style += ' top:'+ ( doc.body.scrollTop + config.top) + 'px';
  }
  
  // �������������2���ı䵱ǰ���ò���������
  if(config.type === 2){
    config.content = '<i></i><i class="layui-m-layerload"></i><i></i><p>'+ (config.content||'') +'</p>';
  }
  
  // ����Զ�����ʽ�࣬ ��ı����õĶ���Ч��
  if(config.skin) config.anim = 'up';
  
  // ���������msg����ر����ֲ�
  if(config.skin === 'msg') config.shade = false;
  
  /*
	���õ����������
		��Ҫ�ṹ���£�
			<div class="layui-m-layershade"></div>
			<div class="layui-m-layermain">
				<div class="layer-m-layersection">
					<div class="layer-m-layerchild ">
						����html
						<div class="layui-m-layercont">����</div>
						��ťhtml
						</div>
					</div>
				</div>
			</div>
				
  */
  layerbox.innerHTML = (config.shade ? '<div '+ (typeof config.shade === 'string' ? 'style="'+ config.shade +'"' : '') +' class="layui-m-layershade"></div>' : '')
  +'<div class="layui-m-layermain" '+ (!config.fixed ? 'style="position:static;"' : '') +'>'
    +'<div class="layui-m-layersection">'
      +'<div class="layui-m-layerchild '+ (config.skin ? 'layui-m-layer-' + config.skin + ' ' : '') + (config.className ? config.className : '') + ' ' + (config.anim ? 'layui-m-anim-' + config.anim : '') +'" ' + ( config.style ? 'style="'+config.style+'"' : '' ) +'>'
        + title
        +'<div class="layui-m-layercont">'+ config.content +'</div>'
        + button
      +'</div>'
    +'</div>'
  +'</div>';
  
  // ���config.typeΪ0 ����Ϊ2
  if(!config.type || config.type === 2){
    
    // document.getElementsByClassName('layui-m-layer0') ��getElementsByClassName('layui-m-layer2')
    var dialogs = doc[claname](classs[0] + config.type), dialen = dialogs.length;
	
	// ����ж��������ر�����򿪵�
    if(dialen >= 1){
      layer.close(dialogs[0].getAttribute('index'))
    }
  }
  
  // ����������ӵ�body��ǩ��
  document.body.appendChild(layerbox);
  
  // ��ȡdocument.querySelectedAll('#layui-m-layer����')
  var elem = that.elem = S('#'+that.id)[0];
  config.success && config.success(elem);
  
  that.index = index++;
  that.action(config, elem);
};

// ���е��������ض���
Layer.prototype.action = function(config, elem){
  var that = this;
  
  // config.time��Ϊ�ջ�0, ���ǵ������������Զ��رչ��ܵĴ���
  if(config.time){
	// ��̬���timer�����ԣ�����ֵ�Ƕ�ʱ�����Զ��رյ�����
    ready.timer[that.index] = setTimeout(function(){
      layer.close(that.index);
    }, config.time*1000);
  }
  
  // btn����������ȷ����ť��رհ�ť�Ĺ���
  var btn = function(){
	
	// ��ȡtype����
    var type = this.getAttribute('type');
	
	// ����ֵΪ0, ��ʾ����Ϣ��
    if(type == 0){
      config.no && config.no();
      layer.close(that.index);
    } else {
	  // �Ƿ����ȷ����ť���������Զ����ùرճ���
      config.yes ? config.yes(that.index) : layer.close(that.index);
    }
  };
  
  // config.btn���ò�������
  if(config.btn){
	// btns = document.getElementsByClassName('layui-m-layerbtn')[0].children
    var btns = elem[claname]('layui-m-layerbtn')[0].children, btnlen = btns.length;
	
	// ����ǰ���������а�ť�����ϵ���¼�, ����btn��Ϊ�ص���������ȥ
    for(var ii = 0; ii < btnlen; ii++){
      ready.touch(btns[ii], btn);
    }
  }
  
  // ���������֣�������ر�
  if(config.shade && config.shadeClose){
    var shade = elem[claname]('layui-m-layershade')[0];
    ready.touch(shade, function(){
      layer.close(that.index, config.end);
    });
  }
  
  // ���config.end���ò�������
  config.end && (ready.end[that.index] = config.end);
};

// ����layer���󣬽�����ΪAPi��¶��ȥ
win.layer = {
  // �汾
  v: '2.0',
  // ���
  index: index,

  // ����������
  open: function(options){
    var o = new Layer(options || {});
    return o.index;
  },
  
  // ������ر�
  close: function(index){
	// iBox = document.querySelectorAll('#layui-m-layer`${index}`')
    var ibox = S('#'+classs[0]+index)[0];
    if(!ibox) return;
    ibox.innerHTML = '';
	// �Ƴ��ýڵ�
    doc.body.removeChild(ibox);
	// ���ָ����ʱ��
    clearTimeout(ready.timer[index]);
	// ɾ��timer�洢�Ķ�ʱ������
    delete ready.timer[index];
	// �����������Ļص�����
    typeof ready.end[index] === 'function' && ready.end[index]();
	// ɾ����Ӧ������Ļص�����
    delete ready.end[index];
  },

  // �ر����е�����
  closeAll: function(){
    var boxs = doc[claname](classs[0]);
    for(var i = 0, len = boxs.length; i < len; i++){
      layer.close((boxs[0].getAttribute('index')|0));
    }
  }
};

// ����ģ����ؿ�ܺͲ����ڵ����
'function' == typeof define ? define(function() {
  return layer;
}) : function(){
  
  // ����css�ļ�������src="./layer.js", ��ô
  var js = document.scripts, script = js[js.length - 1], jsPath = script.src;
  var path = jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
  
  if(script.getAttribute('merge')) return; 
  
  document.head.appendChild(function(){
    var link = doc.createElement('link');
    link.href = path + 'need/layer.css?2.0';
    link.type = 'text/css';
    link.rel = 'styleSheet'
    link.id = 'layermcss';
    return link;
  }());
  
}();

}(window);
