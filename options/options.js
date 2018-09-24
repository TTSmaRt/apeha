$('document').ready(function(){
 translate();
 
  $('.collapsed').each(function(){var title=$(this).prop('title');$(this).before('<div class="collapser">'+title+'</span>');});
  $('.collapser').click(function(){   
    if($(this).is('.opened')){   
      $('.collapsed').slideUp();
      $('.collapser').removeClass('opened');  
    }else{    
      $('.collapsed').slideUp();
      $('.collapser').removeClass('opened');
      $(this).addClass('opened').next().slideToggle();
    } 

  });

  $('#store_login,#store_password,#store_url').change( function() {
    set_prop($(this).prop('name'), $(this).prop('value')); 
  } ); 
  
  setvalue('global_scripts',get_item('*'));
  js=highlite('global_scripts');
  setvalue('store_url',get_prop('store_url'));
  setvalue('store_login',get_prop('store_login'));
  setvalue('store_password',get_prop('store_password'));
  
  $('#save_global').click(save_global);
  $('#save').click(start_import);
  $('#reset').click(start_export);
  $('#update_from_store').click(update_from_store);
  $('#update_to_store').click(update_to_store);
  

});

function value(name){
return $('#'+name).prop('value');
}  
function setvalue(name,data){
$('#'+name).prop('value',data)
} 
function check_login_password(){
  if(value('store_url')==''){alert(translate('store_check_url'));return false;} 
  if(value('store_login')==''){alert(translate('store_check_login'));return false;} 
  if(value('store_password')==''){alert(translate('store_check_password'));return false;}
  return true;
}

function update_from_store(){
  if (check_login_password()){
    login=get_prop('store_login');
    password=get_prop('store_password');
    store_url=get_prop('store_url');
    ajax(store_url,function(data){
      if(data.trim()!=''){
        seccess=importstorage(data,false,true);
        if(seccess){
          load_global();
          alert(translate('name')+' ['+translate('store_message')+"]: \r\n"+translate('store_imported'));
        }
      }else{
        alert(translate('name')+' ['+translate('store_message')+"]: \r\n"+translate('store_empty'));
      }
    },'POST',{action:'load',login:login,password:password});                   
  }
}

function update_to_store(){
  if (check_login_password()){
    login=get_prop('store_login');
    password=get_prop('store_password');  
    store_url=get_prop('store_url');
    data=exportstorage();
    ajax(store_url,function(data){alert(data);},'POST',{action:'save',login:login,password:password,data:data});                   
  }
}

function save_global(){
   js.save();
   set_item('*',value('global_scripts'));
}  
function load_global(){
   setvalue('global_scripts',get_item('*'));
   js.setValue(value('global_scripts'));
}
function start_import(){
   uploadFile('import_file',function(data){importstorage(data);load_global();});
}
function start_export(){
   downloadFile(exportstorage());
}