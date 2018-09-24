var props_key='*PROPS*';

function parcerurl(url){
  var pattern = "^(([^:/\\?#]+):)?(//(([^:/\\?#]*)(?::([^/\\?#]*))?))?([^\\?#]*)(\\?([^#]*))?(#(.*))?$";
  var rx = new RegExp(pattern);
  var parts = rx.exec(url);
  return ({
    href : parts[0] || "", 
    protocol : parts[1] || "", 
    host : parts[4] || "", 
    hostname : parts[5] || "", 
    domain : (parts[5] || "").match('[^.]*.[^.]+$') || "", 
    port : parts[6] || "", 
    pathname : parts[7] || "", 
    search : parts[8] || "", 
    hash : parts[10] || "" 
  });
}

function ArrayToQuery(arr){
  var pairs = new Array();
  var aElem;
  for( var aElem in arr ) {
    if(aElem!='length')pairs.push(aElem + "=" + encodeURIComponent(arr[aElem]));
  }
  return pairs.join("&");
}

function parce_item(id){
  try{
    var parced_item=JSON.parse(get_item(id));
      if(parced_item.inject==undefined) parced_item.inject='on';
  }catch(e){  
    var parced_item={event:'disabled',inject:'on',script:'',css:'',comment:get_item(id)}; 
  }
  return parced_item;   
}

function ajax(url,func){
    var method = (arguments.length < 3) ? 'GET' : arguments[2];
    var params = (arguments.length < 4) ? '' : arguments[3];
  var xhr;
  xhr=new XMLHttpRequest();
  if (xhr!=null){  
    if (typeof (params)!='string') params=ArrayToQuery(params);
    if(method=='GET' && params.trim()!='')url+='?'+params;
    url+=((url.indexOf("?")!=-1)? "&" : "?")+new Date().getTime();
    xhr.open(method,url,true);
    xhr.onreadystatechange = function(){
      if (xhr.readyState==4){
        if (xhr.status==200||xhr.status==304){
          func(xhr.responseText);
        }else{
          alert('connect error');
        }
      }
    };
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.send(params);
    return true;
  }
  return false;
}

function ajax_sync(url){
    var method = (arguments.length < 2) ? 'GET' : arguments[1];
    var params = (arguments.length < 3) ? '' : arguments[2];
  var xhr;
  xhr=new XMLHttpRequest();
  if (xhr!=null){  
    if (typeof (params)!='string') params=ArrayToQuery(params);
    if(method=='GET' && params.trim()!='')url+='?'+params;
    url+=((url.indexOf("?")!=-1)? "&" : "?")+new Date().getTime();
    xhr.open(method,url,false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.send(params);
    if (xhr.status==200||xhr.status==304){
      return xhr.responseText;
    }else{
      return false;
    }
  }
  return false;
}

function exportstorage(){
  tmp=localStorage[props_key];    
  delete localStorage[props_key];
  result = JSON.stringify(localStorage).replace(/"length"[^,}]+[,}]/g, "").replace(/^{$/g, "");
  localStorage[props_key]=tmp;
  return result;
}
 
function merge_data(olddata,new_data){
  result=olddata;
  for (var i in new_data){
      if (i != 'length'){
        if(typeof new_data[i]=='string') new_data[i]=new_data[i].trim();
        if(new_data[i]!='') result[i]=new_data[i];
      }
  }
  return result;
}
     
function importstorage(data){
  var need_store = (arguments.length < 2) ? true : arguments[1];
  var showmessage = (arguments.length < 3) ? false : arguments[2];
  can_import=true;
  try {
    var import_storage = JSON.parse(data);
  }catch(e) {
    can_import=(data==='');
    if(can_import)localStorage.clear();
  }
  if(can_import){
    for (var i in import_storage){
      if (i != 'length'){
        importdata=import_storage[i];
        newdata=fromJSON(import_storage[i]);
        olddata=fromJSON(get_item(i));
        if (olddata && newdata)importdata=toJSON(merge_data(olddata,newdata));
        set_item(i,importdata,need_store);
      }
    }
    return true;
  }else{
    if(showmessage) alert(translate('name')+' ['+translate('store_message')+"]:\r\n"+data);
    return false;
  }
}

function fromJSON(str){
  if (typeof str === "undefined") str='';
  if(str.trim()!='') try {
    return JSON.parse(str);
  }catch(e) {
    return false;
  } else return '';
}

function toJSON(obj){
  return JSON.stringify(obj).replace(/"length"[^,}]+[,}]/g, "").replace(/^{$/g, "");
}

function get_prop(prop_name){
  props=fromJSON(localStorage[props_key]);
  if (props=='') props={};
  if (typeof props[prop_name] !== "undefined") {
    return props[prop_name];
  }else{
    if(prop_name=='store_url') return 'http://info.amazant.ru/store/';
    return '';
  }
} 
function set_prop(prop_name,prop_val){
  props=fromJSON(localStorage[props_key]);
  if (props=='') props={};
  props[prop_name]=prop_val;
  localStorage[props_key]=toJSON(props);
}

function get_item(item_name){
  if (typeof localStorage[item_name] !== "undefined") {
    return localStorage[item_name];
  }else return '';
} 
function set_item(item_name,item_val){
  var need_store = (arguments.length < 3) ? true : arguments[2];
  localStorage[item_name]=item_val;
  if(need_store) store_item(item_name,item_val);
}

function store_item(item_name,item_val){
  var login=get_prop('store_login'),password=get_prop('store_password'),store_url=get_prop('store_url');
  if(store_url.trim()!='' && login.trim()!='' && password.trim()!=''){
   ajax(store_url,function(data){},'POST',{action:'save',login:login,password:password,key:item_name,data:item_val});
  }
}

function store_import(){
  var login=get_prop('store_login'),password=get_prop('store_password'),store_url=get_prop('store_url');   
  if(store_url.trim()!='' && login.trim()!='' && password.trim()!=''){
   ajax(store_url,function(data){
    if(data.trim()!=''){
      importstorage(data,false);
    }
   },'POST',{action:'load',login:login,password:password});
  }
}

function store_export(){
  var login=get_prop('store_login'),password=get_prop('store_password'),store_url=get_prop('store_url'),data=exportstorage();   
  if(store_url.trim()!='' && login.trim()!='' && password.trim()!=''){
   ajax(store_url,function(data){alert(data);},'POST',{action:'save',login:login,password:password,data:data});
  }  
}

function downloadFile(data){
  return window.open('data:text/plain;base64;charset=utf-8,' + encodeBase64(data));
}

function uploadFile(input_id,data_func){
  sel = document.getElementById(input_id);
  var file = sel.files[0];		
  if (!file) return;
			
  var reader = new FileReader();
  reader.onload=function(){data_func(this.result);}
  reader.readAsText(file);
}

// Base64 conversion code found at
// http://my.opera.com/Lex1/blog/fast-base64-encoding-and-test-results
function encodeBase64(str){
	var chr1, chr2, chr3, rez = '', arr = [], i = 0, j = 0, code = 0;
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.split('');

	while(code = str.charCodeAt(j++)){
		if(code < 128){
			arr[arr.length] = code;
		}
		else if(code < 2048){
			arr[arr.length] = 192 | (code >> 6);
			arr[arr.length] = 128 | (code & 63);
		}
		else if(code < 65536){
			arr[arr.length] = 224 | (code >> 12);
			arr[arr.length] = 128 | ((code >> 6) & 63);
			arr[arr.length] = 128 | (code & 63);
		}
		else{
			arr[arr.length] = 240 | (code >> 18);
			arr[arr.length] = 128 | ((code >> 12) & 63);
			arr[arr.length] = 128 | ((code >> 6) & 63);
			arr[arr.length] = 128 | (code & 63);
		}
	};

	while(i < arr.length){
		chr1 = arr[i++];
		chr2 = arr[i++];
		chr3 = arr[i++];

		rez += chars[chr1 >> 2];
		rez += chars[((chr1 & 3) << 4) | (chr2 >> 4)];
		rez += chars[chr2 === undefined ? 64 : ((chr2 & 15) << 2) | (chr3 >> 6)];
		rez += chars[chr3 === undefined ? 64 : chr3 & 63];
	};
	return rez;
};

function translate(){
  var translate_str = (arguments.length < 1) ? false : arguments[0];
  if(translate_str!==false){
    return chrome.i18n.getMessage(translate_str);
  }else{
    $("*[translate]").each(function(){
      elem=$(this);
      str=chrome.i18n.getMessage(elem.attr('translate'));
      if (typeof str!='undefined' && str.trim()!='')
      switch(elem.prop('type')) {
        case 'button': {
          elem.prop('value',str);
          break;
        }
        default: {
          if(elem.prop('title')!='') elem.prop('title',str);
          else elem.html(str);
        }
      }
    });   
  }
}

let helper = {

    address: "http://specjs.ru/apeha/scripts/mods/",

    byIdFr: function(frame, did){return frame.getElementById(did);},

    htmlToElements: function(frame, html) {
        let template = frame.document.createElement('template');
        template.innerHTML = html;
        return template.content.childNodes[0];
    },

    crMyEl: function (tframe, elname, attrs={}, inner="") {
        let NE = tframe.createElement(elname, attrs);
        this.setAttributesAndInner(NE, attrs);
        if (inner!=="") NE.innerHTML = inner;
        return NE;
    },

    createElementStyle:function(fframe, id, style){
        let bod = fframe.document.getElementsByTagName('body')[0];
        let styleTag = this.crMyEl(fframe.document, "style", {"id":""+id+"_style"}, style);
        bod.appendChild(styleTag);
    },

    createElementStyleFromFile:function(fframe, id, styleFile){
        let head = fframe.document.getElementsByTagName('head')[0];
        let styleTag = this.crMyEl(fframe.document, "link", {"id":""+id+"_style","type":"text/css","rel":"stylesheet"});
        styleTag.setAttribute("href", styleFile);
        head.appendChild(styleTag);
    },

    setAttributesAndInner:function (el, attributes={}, inner="") {
        for (let key in attributes) {if(attributes.hasOwnProperty(key)) {el.setAttribute(key, attributes[key]);}}
        if (inner) {el.innerHTML = inner;}
    },

    byXpathFrame:function (path,frame="top.frames[\"d_act\"]") {
        return frame.document.evaluate(path,document,null,XPathResult.ANY_TYPE,null);
    }

};