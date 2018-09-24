var url_data='';
var backgroundPage = chrome.extension.getBackgroundPage();

function init(){
  translate();
  chrome.windows.getCurrent(function(w){
    chrome.tabs.getSelected(w.id, function(t){
      tab = t;
      if (!tab || !tab.url) return;
      url_data=parcerurl(tab.url);
      parced_item=parce_item(url_data.host);
      
      $('#script_event').prop('value',parced_item.event);
      $('#script_inject').prop('checked',parced_item.inject=='on');
      $('#script_script').prop('value',parced_item.script);
      $('#script_css').prop('value',parced_item.css);
      $('#script_comment').prop('value',parced_item.comment);
      js=highlite('script_script');
      
      });
    });
  
}

function updatePA(){
  chrome.windows.getCurrent(function(w){
    chrome.tabs.getSelected(w.id, function(tab){
      backgroundPage.updatePageAction(tab.id,{},tab);
    }); 
  });
}

function save(){
  js.save();
  if(url_data.host && url_data.host!=''){
    parced_item=parce_item(url_data.host);
    parced_item['event']=$('#script_event').prop('value');
    parced_item['inject']=$('#script_inject').prop('checked')?'on':'off';
    parced_item['script']=$('#script_script').prop('value');
    parced_item['css']=$('#script_css').prop('value');
    parced_item['comment']=$('#script_comment').prop('value');
                                                                                                         
    item=toJSON(parced_item);
    backgroundPage.set_item(url_data.host,item);
    updatePA();  
    window.close(); 
  }
}

function clear(){  
  $('#script_event').prop('value','disabled');
  $('#script_inject').prop('checked',true);
  $('#script_script').prop('value','');
  $('#script_css').prop('value','');
  $('#script_comment').prop('value','');
  js.setValue('');
  save();
}
function clear_values(){ 
  if(url_data.host && url_data.host!=''){
    parced_item=parce_item(url_data.host);
    parced_item['values']=$('#script_values').prop('value');                                                                                                     
    item=toJSON(parced_item);
    backgroundPage.set_item(url_data.host,item); 
  }
}
$('document').ready(function(){
$('#savebutton').click(save);
$('#clearbutton').click(clear);
$('#clearvaluesbutton').click(clear_values);
init();
});

