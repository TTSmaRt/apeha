var pers = top.frames["d_pers"].document;
var menu = top.frames["d_menu"].document;

if (localStorage.krik===undefined || localStorage.krik==NaN) {localStorage.krik = ":new73: Зло всегда возвращается! :new47: Сколько стоит выход из клана? crazyorcs оживляют новостную:):new63: Зайди и ты)";}
if (localStorage.lastkriklocs===undefined || localStorage.lastkriklocs==NaN) {localStorage.lastkriklocs = "0,0,0";}

function createMyElement(targetframe, elname, elid, elclass, elstyle, elonclick, innertext) {
	var NewElem = targetframe.createElement(elname);
	NewElem.setAttribute("id", elid);
	NewElem.setAttribute("style", elstyle);
	NewElem.setAttribute("class", elclass);
	NewElem.setAttribute("onclick", elonclick);
	NewElem.innerHTML = innertext;
	return NewElem;
}

function createElementStyle(fframe, f){
	var bod = fframe.getElementsByTagName('body')[0];
	var style = createMyElement(fframe, "style", "mystyle", "", "", "", "");
	bod.appendChild(style); 
	byIdFr(f, "mystyle").innerHTML = ".rmenu_button {height:30px; padding:3px 10px 3px 19px; border:0px solid #d1c08f; box-sizing:border-box; font: bold 12px Arial, Verdana; color: #333366; background: transparent url(img/buttrd1.gif) repeat-y left;}#infodiv {min-width:120px;}#infodiv div,  #infodiv div span{font-size:9px; line-height:9px; text-align:right;}";
}

function create_rblock() {

	if (menu.getElementById("reclama") == null) {
	var td0 = menu.createElement("td");
		td0.setAttribute("id", "reclama");
		td0.setAttribute("valign", "top");
		
		var infodiv = menu.createElement("div");
		infodiv.setAttribute("id", "infodiv");
		infodiv.setAttribute("style", "display:none;");
		td0.appendChild(infodiv);
		
		var infod = menu.createElement("div");
		infod.setAttribute("id", "rdom");
		infodiv.appendChild(infod);

		var infom = menu.createElement("div");
		infom.setAttribute("id", "rmun");
		infodiv.appendChild(infom);
		var infot = menu.createElement("div");
		infot.setAttribute("id", "rtorg");
		infodiv.appendChild(infot);
		
		var rbutton = menu.createElement("button");
		rbutton.setAttribute("id", "rclan");
		rbutton.innerHTML = "Рекламить";
		rbutton.setAttribute("onclick", "say()");
		rbutton.setAttribute("class", "rmenu_button");
		rbutton.setAttribute("style", "");
		td0.appendChild(rbutton);
		menu.getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].insertBefore(td0,menu.getElementsByTagName('td')[1]);
	}
}

function deny(txt) {alert(txt);}

function say() {
	var loctext = top.frames["d_act"].document.getElementById("rollingscroll").getAttribute("title");
	if (loctext == "Ковчег: Дом бойцов" || loctext == "Ковчег: Регистратура" || loctext == "Ковчег: Торговая Комната") {
		var msgfld = top.frames["d_chatact"].document.getElementById("msgfld");
        msgfld.setAttribute("value", "");
		msgfld.setAttribute("value", localStorage.krik);
		var arr = localStorage.lastkriklocs.split(",");
		var now = new Date().getTime().toString();
		var storage = "";
		if (loctext == "Ковчег: Дом бойцов") {storage = ""+now+","+arr[1]+","+arr[2]+"";}
		if (loctext == "Ковчег: Регистратура") {storage = ""+arr[0]+","+now+","+arr[2]+"";}
		if (loctext == "Ковчег: Торговая Комната") {storage = ""+arr[0]+","+arr[1]+","+now+"";}
		localStorage.lastkriklocs = storage;
		//top.frames["d_chatact"].document.getElementById("msgsnd").click();
	} else {
		alert("Тут нельзя рекламить");
	}
}

function byIdFr(dframe, did){return top.frames[dframe].document.getElementById(did);}

function correctTimers(text, sec, id){
	var ttxt = "";
	var h = parseInt(sec/60/60), m = parseInt(sec/60 - 60*h), s = parseInt(sec%60);
	ttxt += (h!=0)?h+":":""; ttxt += (m<10)?"0"+m+":":m+":"; ttxt += (s<10)?"0"+s:s;
	byIdFr("d_menu", id).innerHTML = text + "<span style='color:red; font-weight:bold;'>"+ ttxt+"</span>";
}

function swichButton(time) {
	var rbutton = menu.getElementById("rclan");
	var infodiv = menu.getElementById("infodiv");
	if (time < 0 ) {
		infodiv.setAttribute("style", "display:none;");
		rbutton.innerHTML = "Рекламить";
		rbutton.setAttribute("style", "color:green; display:inline-block;");
		rbutton.setAttribute("onclick", "say()");
	} else {
		infodiv.setAttribute("style", "display:none;");
		rbutton.innerHTML = "Нельзя";
		rbutton.setAttribute("style", "color:red; display:inline-block;");
		rbutton.setAttribute("onclick", "deny('10 минут еще не прошло!')");
	}
}

function correct_rbutton(){
	var rscrl = top.frames["d_act"].document.getElementById("rollingscroll");
	if (menu.getElementById("reclama") == null) {
		create_rblock();
	} else {
		if(rscrl!==null) {
			var now = new Date().getTime();
			var title = rscrl.getAttribute("title");
			var rbutton = menu.getElementById("rclan");
			var infodiv = menu.getElementById("infodiv");
			
			var arr = localStorage.lastkriklocs.split(",");
			
			var rdom = menu.getElementById("rdom");
			var rmun = menu.getElementById("rmun");
			var rtorg = menu.getElementById("rtorg");

			var dbtime = parseInt(arr[0]) + 660000 - now;
			var mutime = parseInt(arr[1]) + 660000 - now;
			var tgtime = parseInt(arr[2]) + 660000 - now;
			
			if (dbtime < 0 ) {rdom.innerHTML = "ДБ - <span style='color:green;'>00:00</span>";
			} else {correctTimers("ДБ - ", parseInt(dbtime/1000), "rdom");}
			
			if (mutime < 0 ) {rmun.innerHTML = "РГ - <span style='color:green;'>00:00</span>";
			} else {correctTimers("РГ - ", parseInt(mutime/1000), "rmun");}
			
			if (tgtime < 0 ) {rtorg.innerHTML = "ТГ - <span style='color:green;'>00:00</span>";
			} else {correctTimers("ТК - ", parseInt(tgtime/1000), "rtorg");}
		
			switch (title) {
				case "Ковчег: Дом бойцов":swichButton(dbtime);break;
				case "Ковчег: Регистратура":swichButton(mutime);break;
				case "Ковчег: Торговая Комната":swichButton(tgtime);break;
				default: {
					infodiv.setAttribute("style", "display:inline-block;");
					rbutton.innerHTML = "Нельзя";
					rbutton.setAttribute("style", "color:red; display:none;");
					rbutton.setAttribute("onclick", "deny('Тут нельзя рекламить!')");
				}
			}
		}
	}
}

function initRMod(){
	if (top.frames["d_pers"].document != null && top.frames["d_menu"].document != null) {
		createElementStyle(menu,"d_menu");
		setInterval("correct_rbutton()",200);
	} else {
		setTimeout(initRMod, 200);
	}
}

initRMod();
