var pers_f = top.frames["d_pers"].document;
var forest_f = top.frames["d_act"].document;
var menu_f = top.frames["d_menu"].document;
var vor = top.frames["d_act"].document.getElementById('vorota');
var worktimer;
var allworktime;
var statussoket;
var count_try = 0;
var count_try2 = 0;
var last_work_started = 0;
var count_restart =0;
var count_restart2 =0;
var timeArrows;
var Target = {};
var styleline = "position: absolute; width: 15px; height: 15px; z-index:100; background-color:red; border-radius:50%; -o-border-radius:50%; -moz-border-radius:50%; -webkit-border-radius:50%;";
var timeframe;
var treeslength = 0;
var last_msg_id = 0;
var TCords = [];
var st;
var storedcords = {x:0,y:0};

if (localStorage.volLevel==undefined || localStorage.volLevel==NaN) {localStorage.volLevel = 1;}
if (localStorage.ws==undefined || localStorage.ws==NaN) {localStorage.ws = 0;}
if (localStorage.fs==undefined || localStorage.fs==NaN) {localStorage.fs = 0;}
if (localStorage.as==undefined || localStorage.as==NaN) {localStorage.as = 1;}

var audio_forest_list = ["http://tt-smart.ru/forest/1.mp3", "http://tt-smart.ru/forest/2.mp3","http://tt-smart.ru/forest/3.mp3","http://tt-smart.ru/forest/4.mp3","http://tt-smart.ru/forest/5.mp3","http://tt-smart.ru/forest/6.mp3","http://tt-smart.ru/forest/7.mp3","http://tt-smart.ru/forest/8.mp3"];

var NavObjects = [
	{name :"Не выбрано", latname : "тщту", cordx : "", cordy : "", ofsetx: 0, ofsety: 0, obglocation : ""},
	{name :"Форт", latname : "Fort", cordx : 1593, cordy : 2936, ofsetx: 6, ofsety: 6, obglocation : "Владения изгоев"},
	{name :"Среднеморье", latname : "Smorye", cordx : 3755, cordy : 2965, ofsetx: 6, ofsety: 6,	obglocation : "Окрестности Сморья"},
	{name :"Утес дракона", latname : "Utes", cordx : 749, cordy : 1129,	ofsetx: 6, ofsety: 6, obglocation : "Окрестности Утеса"},
	{name :"Ковчег", latname : "Kovcheg", cordx : 3755,	cordy : 1128, ofsetx: 6, ofsety: 6,	obglocation : "Окрестности Ковчега"}
];

var Locations = [
	{id:1,name:""},
	{id:2,name:""},
	{id:3,name:""},
	{id:4,name:""},
	{id:5,name:""},
	{id:6,name:""},
	{id:7,name:""},
	{id:8,name:""},
	{id:9,name:""},
	{id:10,name:""},
	{id:11,name:""},
	{id:12,name:""},
	{id:13,name:"Новый Лес: Альпийские луга"},
	{id:14,name:"Новый Лес: Владения Изгоев"},
	{id:15,name:""},
	{id:16,name:""},
	{id:17,name:""},
	{id:18,name:"Новый Лес: Заводь Среднеморская"},
	{id:19,name:"Новый Лес: Море Ветров"},
	{id:20,name:""}
];

function getRandomInt(min, max) {return Math.floor(Math.random()*(max-min+1))+min;}

function getUserLocationId(){
	var loctext = top.frames["d_act"].document.getElementById("rollingscroll").getAttribute("title");
	for(var i=0; i<Locations.length; i++){
		if (Locations[i].name == loctext) {
			return Locations[i].id;
		}
	}
}

function getCords(){
	if (top.frames["d_act"].document.getElementById("rollingscroll")!=undefined && top.frames["d_act"].document.getElementById("rollingscroll")!= null) {
		var cc = top.frames["d_menu"].document.getElementById('cc');
		if (cc===null) {
			var scr=top.frames["d_menu"].document.createElement('script');
			scr.setAttribute('src','http://tt-smart.ru/cords.php?l='+getUserLocationId());
			scr.setAttribute('id','cc');
			top.frames["d_menu"].document.getElementsByTagName('head')[0].appendChild(scr);
			
		}
	} else {
		setTimeout(getCords, 200);
	}
	
}

getCords();

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
	byIdFr(f, "mystyle").innerHTML = ".button {margin:1px; display:inline-block;background-image: url(img/buttb.gif); height: 19px;}.button div {display:inline-block; background: url(img/buttr.gif) repeat-y right; height: 19px;}.button-a {margin:1px; display:inline-block;background-image: url(img/buttb-a.gif); height: 19px;}.button-a div {display:inline-block;background: url(img/buttr-a.gif) repeat-y right; height: 19px;}.tree:active{outline:2px solid #0471d6;outline-offset:0px;}.tree:hover{outline:1px solid #9abee0;outline-offset:0px;}#click table img {top:auto!important;max-height: 95px;}";
}

function createRadiusFrame(){
	byIdFr("d_act", "canvas").parentNode.style.overflow = "hidden";
	var size = byIdFr("d_act", "viewmode").value;
	var rrr = createMyElement(forest_f, "div", "ramkaradius", "", "display:none;position: absolute; border:1px solid red; z-index:2; width:390px; height:390px; top:50%; left:50%; margin-top:-195px; margin-left:-195px;", "", "");
	byIdFr("d_act", "canvas").parentNode.appendChild(rrr);
}

function createArrow(){
	if (count_try2>30){return 1;}
	if (byIdFr("d_act", "canvas")!=null) {
		var pr = byIdFr("d_act", "canvas").parentNode;
		var arrows = createMyElement(forest_f, "div", "arrows", "", "width: 20px; height: 20px; position: absolute;", "", "");
		pr.appendChild(arrows);
	} else {
		count_try2++;
		setTimeout(createArrow, 2000);
	}
}

function createNewButton(targetframe, id, style, onclick, inner, parstyle){
	var navbutton = createMyElement(pers_f, "b", "parent-"+id, "button", parstyle, "", "");
	var innernavbutton = createMyElement(pers_f, "b", "", "", "width: 100%;", "", "");
	navbutton.appendChild(innernavbutton);
	var end_button = createMyElement(targetframe, "button", id, "", style+"outline: none;", onclick, inner);
	innernavbutton.appendChild(end_button);
	return navbutton;
}

function createNavSelector(){
	if (top.frames["d_pers"].document.getElementsByTagName('body')[0]!=null && top.frames["d_pers"].document.getElementById('navdiv')==null) {
		pers_f = top.frames["d_pers"].document;
		var bod = pers_f.getElementsByTagName('body')[0];
		var selectdiv = createMyElement(pers_f, "div", "navdiv", "", "padding:0px 5px 0px 5px;", "", "");
		var titlediv = createMyElement(pers_f, "div", "navtitle", "", "", "", "<b>Навигация:</b> ");
		selectdiv.appendChild(titlediv);
		var perscords = createMyElement(pers_f, "span", "perscords", "", "", "", "");
		titlediv.appendChild(perscords);
		var standartobjects = createMyElement(pers_f, "div", "standartobjects", "", "", "", "Объекты ");
		selectdiv.appendChild(standartobjects);
		var navkords = createMyElement(pers_f, "div", "navkords", "", "", "", "");
		selectdiv.appendChild(navkords);
		var nbutt = createNewButton(pers_f, "navcontrol", "width:100%!important;", "top.frames[\"d_act\"].startNavigation()", "Запустить навигатор", "width:100%;");
		navkords.innerHTML = "<label id='navxcord' style='line-height: 25px;float: left;display: block;max-width: 50%;' for='xnavcord'>X - <input type='text' name='xnavcord' id='xnavcord' value='' style='width: 75%;' placeholder='координата'/></label><label id='navycord' style='line-height: 25px;float: left;display: block;max-width: 50%;' for='ynavcord'>Y - <input type='text' name='ynavcord' id='ynavcord' value='' style='width: 75%;' placeholder='координата'/></label><br />";
		navkords.appendChild(nbutt);
		var selecttag = createMyElement(pers_f, "select", "NavSelect", "", "width:72%;", "", "");
		selecttag.setAttribute("name", "NavSelect");
		selecttag.setAttribute("onchange", "top.frames['d_act'].ChangeNavTarget(this.value)");
		for (var i = 0; i<NavObjects.length; i++)  {
			var navoption = pers_f.createElement("option");
			navoption.setAttribute("value", i);
			navoption.innerHTML = NavObjects[i].name;
			selecttag.appendChild(navoption);
		}
		standartobjects.appendChild(selecttag);
		bod.appendChild(selectdiv); 
	} 
}

function createControls(){
	if (top.frames["d_pers"].document.getElementsByTagName('body')[0]!=null) {
		pers_f = top.frames["d_pers"].document;
		var bod = pers_f.getElementsByTagName('body')[0];
		var controlsdiv = createMyElement(pers_f, "div", "controlsdiv", "", "padding:0px 5px 0px 5px;", "", "<p style='text-align:center; font-weight:bold; margin: 5px 0px 0px 0px;'>Рамка радиуса в 5 шагах</p>");
		var nbutt2 = createNewButton(pers_f, "framecontrolviz", "width:100%!important;", "top.frames[\"d_act\"].showFrame()", "Показказать", "width:49%;");
		controlsdiv.appendChild(nbutt2);
		var nbutt = createNewButton(pers_f, "framecontrolfix", "width:100%!important;", "top.frames[\"d_act\"].fixFrame()", "Зафиксировать", "width:49%;");
		controlsdiv.appendChild(nbutt);
		if (top.frames["d_act"].global_data.my_group.sostav.leader.id == "200318838" || top.frames["d_act"].global_data.my_group.sostav.leader.id =="200364872") {
			//|| top.frames["d_act"].global_data.my_group.sostav.leader.id =="200364872"
			var nbutt3 = createNewButton(pers_f, "storeCords", "width:100%!important;", "top.frames[\"d_act\"].storeCords()", "Запомнить координаты", "width:100%;");
			controlsdiv.appendChild(nbutt3);
		}
		var mh = "max-height:60px;";
		if (byIdFr("d_act", "viewmode").value == 2) {mh = "max-height:470px;";}
		var list_trees = createMyElement(pers_f, "div", "listoftrees", "", "padding:1px;font-size:9px;"+mh+" overflow-y:scroll;", "", "");
		controlsdiv.appendChild(list_trees); 
		bod.appendChild(controlsdiv); 
		byIdFr("d_pers", "parent-framecontrolfix").style.display = "none";
		byIdFr("d_pers", "parent-framecontrolfix").style.maxWidth = "50%";
		byIdFr("d_pers", "parent-framecontrolviz").style.maxWidth = "50%";
	}
}

function getLastEvent(){return forest_f.getElementById('modal_form').innerHTML;}

function getNearCords(x,y) {
	var Xx = top.frames["d_act"].global_data.my_group.posx;
	var Yy = top.frames["d_act"].global_data.my_group.posy;
	var napr = parseInt(top.frames["d_act"].global_data.my_group.napr);
	switch (napr) {
		case 0:	Xx = Xx-1;Yy = Yy-1;break;
		case 1:	Yy = Yy-1;break;
		case 2:	Xx = Xx+1;Yy = Yy-1;break;
		case 3: Xx = Xx+1;break;
		case 4:	Xx = Xx+1;Yy = Yy+1;break;
		case 5:	Yy = Yy+1;break;
		case 6:	Xx = Xx-1;Yy = Yy+1;break;
		case 7: Xx = Xx-1;break;
	}
	return {"x":Xx,"y":Yy};
}

function getTypeOfEvent() {
	var lastEvent = getLastEvent();
	var type = 0, dir = 0;
	if ((lastEvent.indexOf('сосна') + 1)) {type = 1;};
	if ((lastEvent.indexOf('дуб') + 1)) {type = 2;};
	if ((lastEvent.indexOf('красное дерево') + 1)) {type = 3;};
	if ((lastEvent.indexOf('прямо') + 1)) {dir = 1;}
	if ((lastEvent.indexOf('слева') + 1)) {dir = 2;}
	if ((lastEvent.indexOf('справа') + 1)) {dir = 3;}
	return {"type":type,"dir":dir};
}

function removeCords(id, i) {
	pers_f = top.frames["d_pers"].document;
	var bod = pers_f.getElementsByTagName('body')[0];
	var storecords = pers_f.createElement("img");
	storecords.setAttribute("id", "delcords");
	storecords.setAttribute("src", "http://tt-smart.ru/rm.php?id="+id+"");
	storecords.setAttribute("height", "1");
	storecords.setAttribute("width", "1");
	bod.appendChild(storecords);
	top.frames["d_menu"].cords.splice(i,1);
	getAndSortTrees();
	top.frames["d_act"].document.getElementById("dot"+i+"").remove();
	setTimeout(function(){
		top.frames["d_pers"].document.getElementById("delcords").remove();
	}, 1000);
}

function storeCords() {
	var Xx = top.frames["d_act"].global_data.my_group.posx;
	var Yy = top.frames["d_act"].global_data.my_group.posy;
	var Xxx = 0, Yyy = 0;
	var cordsss = getNearCords(Xx,Yy);
	var lastevent = getTypeOfEvent();
	if (lastevent.dir != 0) {
		if (lastevent.dir == 1) {Xxx = cordsss.x; Yyy = cordsss.y;}
		pers_f = top.frames["d_pers"].document;
		var bod = pers_f.getElementsByTagName('body')[0];
		var loc = getUserLocationId();
		var storecords = pers_f.createElement("img");
		storecords.setAttribute("id", "storecords");
		storecords.setAttribute("src", "http://tt-smart.ru/store.php?x="+Xxx+"&y="+Yyy+"&t="+lastevent.type+"&l="+loc);
		storecords.setAttribute("height", "1");
		storecords.setAttribute("width", "1");
		bod.appendChild(storecords);
		byIdFr("d_pers", "parent-storeCords").setAttribute("class", "button-a");
		byIdFr("d_pers", "storeCords").innerHTML = "Сохранено.";
		setTimeout(function(){
			byIdFr("d_pers", "parent-storeCords").setAttribute("class", "button");
			byIdFr("d_pers", "storeCords").innerHTML = "Запомнить координаты";
			top.frames["d_pers"].document.getElementById("storecords").remove();
		}, 2000);
	} else {
		byIdFr("d_pers", "storeCords").innerHTML = "Ничего не найдено";
		setTimeout(function(){
			byIdFr("d_pers", "storeCords").innerHTML = "Запомнить координаты";
		}, 2000);
	}
}

function getGipot(cords){
	var X = top.frames["d_act"].global_data.my_group.posx;
	var Y = top.frames["d_act"].global_data.my_group.posy;
	var Xx = cords.x, Yy = cords.y;
	var kat_a = Math.abs(X-Xx), kat_b = Math.abs(Y-Yy);
	return Math.sqrt(Math.pow(kat_a,2) + Math.pow(kat_b,2));
}

function correctCordsOfStoredTrees(cords){
	var count_s = 0, count_d = 0, count_k = 0;
	var vm = byIdFr("d_act", "viewmode").value;
	var xm=0, ym=0, xd=0, yd=0;
	if (vm==2){xm=12; ym=12; xd=25; yd = 25;}
	if (vm==1){xm=12; ym=6; xd=25; yd = 13;}
	if (vm==0){xm=6; ym=6; xd=13; yd = 13;}
	var Xx = top.frames["d_act"].global_data.my_group.posx - xm;
	var Yy = top.frames["d_act"].global_data.my_group.posy - ym;
	var Xxx = Xx +xd;
	var Yyy = Yy +yd;
	for (var i=0; i<cords.length; i++) {
		if (Xx <= cords[i].x && cords[i].x<= Xxx && Yy <= cords[i].y && cords[i].y<= Yyy) {
			var ll = ((cords[i].x-Xx)*35)+"px";
			var tt = ((cords[i].y-Yy)*35)+"px";
			if (byIdFr("d_act", "dot"+i)!= null) {
				byIdFr("d_act", "dot"+i).style.left = ll;
				byIdFr("d_act", "dot"+i).style.top = tt;
				byIdFr("d_act", "dot"+i).style.display = "block";
			} else {
				var pr = byIdFr("d_act", "canvas").parentNode;
				var dot = createMyElement(forest_f, "div", "dot"+i, "", "position:absolute;width:9px;height:9px;z-index:100;background-color:red;border-radius:50%;-o-border-radius:50%;-moz-border-radius:50%;-webkit-border-radius:50%;left:"+ll+";top:"+tt+";margin-left:13px;margin-top:13px;", "", "");
				var type = "";
				switch (cords[i].type) {case 1:	type="Сосна";break;	case 2:	type="Дуб";break; case 3: type="Красное дерево";break;}
				dot.setAttribute("title",type);
				dot.setAttribute("ondblclick","top.frames[\"d_act\"].removeCords("+cords[i].id+", "+i+")"); 
				pr.appendChild(dot);
			}
		} else {
			if (byIdFr("d_act", "dot"+i)!= null) {
				byIdFr("d_act", "dot"+i).remove();
			}
		}
	}
	if (cords.length==undefined || cords.length==0) {console.log("--- Всего деревьев - "+cords.length+" но данные не верны");}
	if (cords.length != treeslength) {
		console.log("--- Всего деревьев - "+cords.length);
		treeslength=cords.length;
		var list2 = "", br = "<br />";
		for (var i=0; i<cords.length; i++) {
			var type = "";
			switch (cords[i].type) {case 1: type="С";count_s++;break;case 2: type="Д";count_d++;break; case 3: type="К";count_k++;break;}
			list2 += "<span style='cursor:help;' tabIndex='0' class='tree' title='Двойной клик - добавит координаты в навигатор.' ondblclick='top.frames[\"d_act\"].setTreeCords("+cords[i].x+","+cords[i].y+");'><b>"+type+":</b> x-"+cords[i].x+" y-"+cords[i].y+"</span> ";
			if (i%2==1 && i!=0) {list2 +=br;}
		}
		var list1 = "<div><b>С</b>осен: <b>"+count_s+"</b> <b>Д</b>убов: <b>"+count_d+"</b> <b>К</b>расного: <b>"+count_k+"</b></div>";
		byIdFr("d_pers", "listoftrees").innerHTML = list1+list2;
	}
}

function createNewButtons(){
	if (count_try>30){return 1;}
	if (byIdFr("d_act", "moyagruppa")!=null) {
		var mgr = byIdFr("d_act", "moyagruppa");
		var allwork = createMyElement(forest_f, "div", "allwork", "", "width: 50px;height: 50px; position: relative; float: left; cursor: pointer;left: 0px;top: 310px;", "startAllWork()", "");
		var alworkimg = forest_f.createElement("img");
		alworkimg.setAttribute("id", "allrubit");
		alworkimg.setAttribute("src", "http://tt-smart.ru/rubitall.png");
		alworkimg.setAttribute("height", "50");
		alworkimg.setAttribute("width", "50");
		alworkimg.setAttribute("title", "Срубить дерево полностью!");
		allwork.appendChild(alworkimg);
		mgr.appendChild(allwork);
		var allworkstats = createMyElement(forest_f, "div", "allworkstats", "", "font-size: 12px; font-family: Verdana,Arial,Helvetica,Tahoma,sans-serif;width: 60%; height: 50px; position: relative;  float: right;right: 0px;top: 310px; background-color: #e0dace;", "", "");
		var summ = createMyElement(forest_f, "div", "awsumm", "", "", "", "Бревен: ");
		var summ2 = createMyElement(forest_f, "div", "awtime", "", "", "", "Время: ");
		allworkstats.appendChild(summ2);
		allworkstats.appendChild(summ);
		summ2.appendChild(createMyElement(forest_f, "span", "allworktime", "", "", "", ""));
		summ.appendChild(createMyElement(forest_f, "span", "allworksumm", "", "", "", ""));
		mgr.appendChild(allworkstats);
		var allworkstatus = createMyElement(forest_f, "div", "allworkstatus", "", "position:relative; background-color:#e0dace; float:left; width:100%; top:315px; left:0px; line-height:12px; padding:1px; text-align:center; font-size:12px;", "showEvents()", "Скрипт не запущен");
		allworkstatus.setAttribute("title", "Клик в поле покажет список эвентов за период работы");
		mgr.appendChild(allworkstatus);
		//var audio = createMyElement(forest_f, "audio", "audioalert", "", "visibility: hidden;", "", ""); 
		//audio.volume=localStorage.volLevel;
		//mgr.appendChild(audio);
		var otladka = createMyElement(forest_f, "div", "otladka", "", "position:relative; background-color:#e0dace; float:left; width:100%; top:315px; left:0px; line-height:12px; padding:1px; text-align:center; font-size:12px;", "", "Отладочная инфа появится тут после запуска"); 
		mgr.appendChild(otladka);
	} else {
		count_try++;
		setTimeout(createNewButtons, 2000);
	}
}

function createAudioControls(){
	if (byIdFr("d_act", "canvas")!=null) {
		var cont = byIdFr("d_act", "moyagruppa");
		
		var g = parseInt(localStorage.volLevel*100/25);
		
		var vollev = forest_f.createElement("img");
		vollev.setAttribute("id", "vollev");
		vollev.setAttribute("src", "http://tt-smart.ru/sl"+g+".png");
		vollev.setAttribute("style", "position: absolute; top: -35px; left: 55px;");
		vollev.setAttribute("onclick", "changeVolumeLevel();");
		vollev.setAttribute("title", "Общая громкость фоновых звуков - "+localStorage.volLevel);
		
		cont.appendChild(vollev);
		
		var fs = forest_f.createElement("img");
		fs.setAttribute("id", "fs");
		fs.setAttribute("src", "http://tt-smart.ru/fs"+localStorage.fs+".png");
		fs.setAttribute("style", "position: absolute; top: -35px; left: 78px;");
		fs.setAttribute("onclick", "switchFS('forest')");
		fs.setAttribute("title", "Звуки леса");
		cont.appendChild(fs);
		
		var ws = forest_f.createElement("img");
		ws.setAttribute("id", "ws");
		ws.setAttribute("src", "http://tt-smart.ru/ws"+localStorage.ws+".png");
		ws.setAttribute("style", "position: absolute; top: -35px; left: 101px;");
		ws.setAttribute("onclick", "switchFS('work')");
		ws.setAttribute("title", "Звуки работы");
		cont.appendChild(ws);
		
		var as = forest_f.createElement("img");
		as.setAttribute("id", "as");
		as.setAttribute("src", "http://tt-smart.ru/as"+localStorage.as+".png");
		as.setAttribute("style", "position: absolute; top: -35px; left: 125px;");
		as.setAttribute("onclick", "switchFS('alert')");
		as.setAttribute("title", "Оповещения о работе");
		cont.appendChild(as);
	} else {
		setTimeout(createAudioControls, 2000);
	}
}

function switchFS(wat) {
	if (wat == "forest") {
		if (localStorage.fs == 0){
			localStorage.fs = 1;  
			byIdFr("d_act", "fs").setAttribute("src", "http://tt-smart.ru/fs1.png");
			byIdFr("d_menu", "backSoundForest").play();
		} else {
			localStorage.fs = 0;
			clearTimeout(st);
			byIdFr("d_act", "fs").setAttribute("src", "http://tt-smart.ru/fs0.png");
			byIdFr("d_menu", "backSoundForest").pause();
		}
	}
	if (wat == "work") {
		if (localStorage.ws == 0){
			localStorage.ws = 1;
			byIdFr("d_act", "ws").setAttribute("src", "http://tt-smart.ru/ws1.png");
			byIdFr("d_menu", "backSoundWork").setAttribute("src", "http://tt-smart.ru/rub.mp3");
			if (localStorage.workCount==1) {byIdFr("d_menu", "backSoundWork").playbackRate = 0.80; byIdFr("d_menu", "backSoundWork").play();}
		} else {
			localStorage.ws = 0;
			byIdFr("d_act", "ws").setAttribute("src", "http://tt-smart.ru/ws0.png");
			byIdFr("d_menu", "backSoundWork").pause();
		}
	}
	if (wat == "alert") {
		if (localStorage.as == 0){localStorage.as = 1;byIdFr("d_act", "as").setAttribute("src", "http://tt-smart.ru/as1.png");
		} else {localStorage.as = 0;byIdFr("d_act", "as").setAttribute("src", "http://tt-smart.ru/as0.png");}
	}
}

function createAudioElems(){
	var mgr = top.frames["d_menu"].document.getElementsByTagName("body")[0];
	var audio = createMyElement(menu_f, "audio", "backSoundForest", "", "visibility: hidden;", "", ""); 
		audio.volume = localStorage.volLevel;
		var h = getRandomInt(0, 7);
		audio.setAttribute("src", audio_forest_list[h]);
		mgr.appendChild(audio);
		if (localStorage.fs==1) {audio.play();}
		audio.addEventListener('ended',function(e){
			st = setTimeout(function(){
				var h = getRandomInt(0, parseInt(audio_forest_list.length-1));
				byIdFr("d_menu", "backSoundForest").setAttribute("src", audio_forest_list[h]);
				byIdFr("d_menu", "backSoundForest").play();
			}, getRandomInt(3000, 7000));
		});
	var audio2 = createMyElement(menu_f, "audio", "backSoundWork", "", "visibility: hidden;", "", ""); 
		mgr.appendChild(audio2);
		audio2.volume=localStorage.volLevel;
		audio2.setAttribute("src", "http://tt-smart.ru/rub.mp3");
		audio2.playbackRate = 0.80;
		audio2.loop = true;
		if (localStorage.ws==1) {audio2.play();}
	var audio3 = createMyElement(menu_f, "audio", "backSoundAlert", "", "visibility: hidden;", "", ""); 
		audio3.volume=localStorage.volLevel;
		mgr.appendChild(audio3);
}

function changeVolumeLevel(){
	if (localStorage.volLevel!=NaN && localStorage.volLevel!= undefined) {
		var pp = 0;
		if (localStorage.volLevel==0) {localStorage.volLevel= 0.1;pp=1;} 
		else if (localStorage.volLevel==0.1) {localStorage.volLevel= 0.2;pp=2;} 
		else if (localStorage.volLevel==0.2) {localStorage.volLevel= 0.5;pp=3;} 
		else if (localStorage.volLevel==0.5) {localStorage.volLevel= 1;pp=4;} else {localStorage.volLevel=0;pp=0;}
		byIdFr("d_menu", "backSoundForest").volume = localStorage.volLevel;
		byIdFr("d_menu", "backSoundWork").volume = localStorage.volLevel;
		byIdFr("d_menu", "backSoundAlert").volume = localStorage.volLevel;
		byIdFr("d_act", "vollev").setAttribute("src", "http://tt-smart.ru/sl"+pp+".png");
		if (localStorage.workCount==1 && localStorage.ws==1) {byIdFr("d_menu", "backSoundWork").playbackRate = 0.80;byIdFr("d_menu", "backSoundWork").play();}
	} else {
		localStorage.volLevel=0;
	}
	//console.log(localStorage.volLevel);
}

function muteBackSounds(){localStorage.volLevel = 0;}

function fixFrame(){
	storedcords.x = top.frames["d_act"].global_data.my_group.posx;
	storedcords.y = top.frames["d_act"].global_data.my_group.posy;
	byIdFr("d_pers", "framecontrolfix").innerHTML = "Выкл. фиксацию";
	byIdFr("d_pers", "framecontrolfix").setAttribute("onclick", "top.frames[\"d_act\"].clearFrame()");
	byIdFr("d_pers", "parent-framecontrolfix").setAttribute("class","button-a");
	timeframe = setInterval(correctFrame, 500);
}

function clearFrame(){
	clearInterval(timeframe);
	byIdFr("d_pers", "framecontrolfix").innerHTML = "Зафиксировать";
	byIdFr("d_pers", "framecontrolfix").setAttribute("onclick", "top.frames[\"d_act\"].fixFrame()");
	byIdFr("d_pers", "parent-framecontrolfix").setAttribute("class","button");
	byIdFr("d_act", "ramkaradius").style.marginTop = "-195px";
	byIdFr("d_act", "ramkaradius").style.marginLeft = "-195px";
}

function correctFrame(){
	var Xx = top.frames["d_act"].global_data.my_group.posx;
	var Yy = top.frames["d_act"].global_data.my_group.posy;
	byIdFr("d_act", "ramkaradius").style.marginTop = (-195 - (Yy - storedcords.y)*35) +"px";
	byIdFr("d_act", "ramkaradius").style.marginLeft = (-195 - (Xx - storedcords.x)*35) +"px";
}

function getAndSortTrees(){
	TCords = top.frames["d_menu"].cords;
	for (var i=0; i<TCords.length; i++) {TCords[i].gipot = getGipot(TCords[i]);}
	TCords.sort(function(a,b){return a.gipot - b.gipot;});
}

function statusSoketCheck() {
	if (byIdFr("d_act", "canvas")!=null) {
	statussoket = setInterval(
		function(){
			correctCordsOfStoredTrees(TCords);
			byIdFr("d_pers", "perscords").innerHTML = "x-"+top.frames["d_act"].global_data.my_group.posx+" y-"+top.frames["d_act"].global_data.my_group.posy;
			byIdFr("d_act", "otladka").innerHTML = "wait_event = "+top.frames["d_act"].global_data.wait_event;
			//if (top.frames["d_act"].global_data.wait_event!=3) {byIdFr("d_menu", "backSoundWork").pause();}
			
			if (top.frames["d_chatact"].Client.socket.readyState==3) {top.frames["d_act"].jQuery(vor).css("background-color", "red");} 
			if (top.frames["d_chatact"].Client.socket.readyState==0 || top.frames["d_chatact"].Client.socket.readyState==2){top.frames["d_act"].jQuery(vor).css("background-color", "orange");}
			if (top.frames["d_chatact"].Client.socket.readyState==1){top.frames["d_act"].jQuery(vor).css("background-color", "green");}
		},500);
	} else {
		setTimeout(statusSoketCheck, 200);
	}
}

function showFrame(){
	byIdFr("d_pers", "framecontrolviz").setAttribute("onclick","top.frames[\"d_act\"].hideFrame()");
	byIdFr("d_pers", "parent-framecontrolviz").setAttribute("class","button-a");
	byIdFr("d_pers", "framecontrolviz").innerHTML = "Спрятать";
	byIdFr("d_act", "ramkaradius").style.display = "block";
	byIdFr("d_pers", "parent-framecontrolfix").style.display = "inline-block";
}

function hideFrame(){
	byIdFr("d_pers", "framecontrolviz").setAttribute("onclick","top.frames[\"d_act\"].showFrame()");
	byIdFr("d_pers", "parent-framecontrolviz").setAttribute("class","button");
	byIdFr("d_pers", "framecontrolviz").innerHTML = "Показать";
	byIdFr("d_act", "ramkaradius").style.display = "none";
	byIdFr("d_pers", "parent-framecontrolfix").style.display = "none";
	clearFrame();
}

function setTreeCords(x,y){
	byIdFr("d_pers", "xnavcord").value = x;
	byIdFr("d_pers", "ynavcord").value = y;
}

function ChangeNavTarget(val) {
	byIdFr("d_pers", "xnavcord").value = NavObjects[val].cordx;
	byIdFr("d_pers", "ynavcord").value = NavObjects[val].cordy;
}

function byIdFr(dframe, did){return top.frames[dframe].document.getElementById(did);}

function stopNav(){
	clearInterval(timeArrows); 
	byIdFr("d_act", "arrows").setAttribute("style", "width: 0px; height: 0px; position: absolute;");
	byIdFr("d_pers", "xnavcord").value = "";
	byIdFr("d_pers", "ynavcord").value = "";
	byIdFr("d_pers", "navcontrol").setAttribute("onclick", "top.frames[\"d_act\"].startNavigation()");
	byIdFr("d_pers", "navcontrol").innerHTML = "Запустить навигатор";
	byIdFr("d_pers", "parent-navcontrol").setAttribute("class","button");
	byIdFr("d_pers", "NavSelect").selectedIndex = 0;
}

function startNavigation() {
	var x = byIdFr("d_pers", "xnavcord").value;
	var y = byIdFr("d_pers", "ynavcord").value;
	if (x!="" && y!="") {
		Target = {name :"Точка", latname : "Dot", cordx : x, cordy : y, ofsetx: 1, ofsety: 1, obglocation : "none"};
		timeArrows = setInterval(correctArrows, 500);
		byIdFr("d_pers", "navcontrol").setAttribute("onclick", "top.frames[\"d_act\"].stopNav()");
		byIdFr("d_pers", "navcontrol").innerHTML = "Остановить навигатор";
		byIdFr("d_pers", "parent-navcontrol").setAttribute("class","button-a");
	}
}

function correctRightBlock(){
		byIdFr("d_act", "moyagruppa").parentNode.setAttribute("style", "position:absolute;width:159px;top:35px;right:20px;height:330px;background: url(forest/tablo2.png);");
	    byIdFr("d_act", "viewmode").parentNode.parentNode.setAttribute("style", "position:relative;float:left;top:-265px;left:0px;");
}

function correctArrows(){
	if (byIdFr("d_act", "canvas")!=null) {
		var Xx = top.frames["d_act"].global_data.my_group.posx;
		var Yy = top.frames["d_act"].global_data.my_group.posy;
		var smn = getSmeshen();
		var sst = "";
		if (Target.cordx > Xx && Target.cordy >Yy) {
			if (smn<0) {sst = "bottom:0px; right:"+(50+smn)+"%;";} else {sst = "bottom:"+(50-smn)+"%; right:0px;";}
			if (smn==-50 || smn==50) {sst = "bottom:0px; right:0px;";}
		}
		if (Target.cordx > Xx && Target.cordy <Yy) {
			if (smn<0) {sst = "top:0px; right:"+(50+smn)+"%;";} else {sst = "top:"+(50-smn)+"%;right:0px;";}
			if (smn==-50 || smn==50) {sst = "top:0px; right:0px;";}
		}
		if (Target.cordx < Xx && Target.cordy <Yy) {
			if (smn<0) {sst = "top:0px; left:"+(50+smn)+"%;";} else {sst = "top:"+(50-smn)+"%; left:0px;";}
			if (smn==-50 || smn==50) {sst = "top:0px; left:0px;";}
		}
		if (Target.cordx < Xx && Target.cordy >Yy) {
			if (smn<0) {sst = "bottom:0px; left:"+(50+smn)+"%;";} else {sst = "bottom:"+(50-smn)+"%;left:0px;";}
			if (smn==-50 || smn==50) {sst = "bottom:0px; left:0px;";}
		}
		if (Target.cordx == Xx && Target.cordy >Yy) {sst = "bottom:0px; right:50%;";}
		if (Target.cordx == Xx && Target.cordy <Yy) {sst = "top:0px;right:50%;";}
		if (Target.cordx < Xx && Target.cordy ==Yy) {sst = "top:50%; left:0px;";}
		if (Target.cordx > Xx && Target.cordy ==Yy) {sst = "top:50%;right:0px;";}
		byIdFr("d_act", "arrows").setAttribute("style", styleline+sst);
	}
}

function getSmeshen(){
	var smeshen = Math.abs(Target.cordy - top.frames["d_act"].global_data.my_group.posy)/Math.abs(Target.cordx - top.frames["d_act"].global_data.my_group.posx)*50;
	var smeshen2 = Math.abs(Target.cordx - top.frames["d_act"].global_data.my_group.posx)/Math.abs(Target.cordy - top.frames["d_act"].global_data.my_group.posy)*50;
	if (smeshen>= 50) {return (-1*smeshen2);} else {return smeshen;}
}

function gWE(){var w = top.frames["d_act"].global_data.wait_event;if (w==undefined) {return 0;} else {return w;}}		
		
function startAllWork() {
	localStorage.workLastCount = parseInt(forest_f.getElementById('items').innerHTML);
	if (gWE()==0) {wStart();}
	localStorage.summBrioven = 0;
	forest_f.getElementById('allworksumm').innerHTML = localStorage.summBrioven;
	setWorkStatus("Работа начата");
	worktimer = setInterval(workfunction, getRandomInt(7000, 13000));
	byIdFr("d_act", "allrubit").setAttribute("src", "http://tt-smart.ru/rubitallstop.png");
	byIdFr("d_act", "allrubit").setAttribute("title", "Отменить рубку до конца");
	byIdFr("d_act", "allwork").setAttribute("onclick", "stopAllWork()");
	allworktime = setInterval(correctWorkTime, 1000);
	if (localStorage.ws == 1 && localStorage.workCount != 1) {
		byIdFr("d_menu", "backSoundWork").setAttribute("src", "http://tt-smart.ru/rub.mp3");
		byIdFr("d_menu", "backSoundWork").volume = localStorage.volLevel;
		byIdFr("d_menu", "backSoundWork").playbackRate = 0.80;
		byIdFr("d_menu", "backSoundWork").loop = true;
		byIdFr("d_menu", "backSoundWork").play();
	} else {
		byIdFr("d_menu", "backSoundWork").pause();
	}
	localStorage.workStarted = new Date().getTime();
	localStorage.workCount = 1;
	localStorage.workEvents = "";
}

function restartAllWork() {
	if (count_restart<4) {
		setWorkStatus("Скрипт перезапущен");
		worktimer = setInterval(workfunction, getRandomInt(7000, 13000));
		byIdFr("d_act", "allrubit").setAttribute("src", "http://tt-smart.ru/rubitallstop.png");
		byIdFr("d_act", "allrubit").setAttribute("title", "Отменить рубку до конца");
		byIdFr("d_act", "allwork").setAttribute("onclick", "stopAllWork()");
		if (localStorage.ws == 1 && localStorage.workCount == 1) {
			byIdFr("d_menu", "backSoundWork").play();
		} else {
			byIdFr("d_menu", "backSoundWork").pause();
		}
		count_restart++;
	} else {
		count_restart = 0;
		clearInterval(worktimer);
		playAudio("http://tt-smart.ru/error.mp3");
		setWorkStatus("Попытка перезапуска скрипта раз в 30 сек. провалилась после 6 попыток. Скрипт остановлен.");
	}
}

function stopAllWork(){
	clearInterval(worktimer);
	clearInterval(allworktime);
	setWorkStatus("Скрипт не запущен");
	byIdFr("d_act", "allrubit").setAttribute("src", "http://tt-smart.ru/rubitall.png");
	byIdFr("d_act", "allrubit").setAttribute("title", "Срубить дерево полностью!");
	byIdFr("d_act", "allwork").setAttribute("onclick", "startAllWork()");
	localStorage.workCount = -1;
	byIdFr("d_menu", "backSoundWork").pause();
}

function showEvents() {OpenModal("<span style='font-weight:bold; font-size:16px;'>События за время рубки</span> <br />"+localStorage.workEvents,0);}

function playAudio(file) {
	if (localStorage.as != 0) {
		byIdFr("d_menu", "backSoundAlert").setAttribute("src", file);
		byIdFr("d_menu", "backSoundAlert").volume=localStorage.volLevel;
		byIdFr("d_menu", "backSoundAlert").play();
	}
}

function setWorkStatus(txt){forest_f.getElementById('allworkstatus').innerHTML = txt;}

function checkEvent() {
	var modal_win = forest_f.getElementById('modal_form');
	var modal_win_display = modal_win.style.display;
	if (modal_win_display == "block") {
		if (modal_win.innerHTML == "Перед Вами нечего добывать."){stopAllWork(); setWorkStatus("Работа окончена"); playAudio("http://tt-smart.ru/end.mp3");}
		storeandcloseEvent(modal_win);
		//if(modal_win.innerHTML == "Лихо замахнувшись, Вы вывихнули руку.") {clearInterval(worktimer); setTimeout(function(){worktimer = setInterval(workfunction,8000);}, 300000); setWorkStatus("Ждем пока пройдет травма"); }
		return true;
	} else {return false;}
}

function storeandcloseEvent(ev){
	var ss = parseInt(localStorage.summBrioven);
	localStorage.workEvents += "сруб № "+ss+" - "+ev.innerHTML +"<br />";
	forest_f.getElementById('overlay').click();
}

function wStart(){top.frames["d_act"].Client.send('actNewMaps-StartDobycha=1');}

function checkPrivatMsg() {
	var mydatta = top.frames["d_chatact"].datta;
	var msgid = mydatta.last_id;
	var my_id_num = parseInt(top.frames["d_act"].global_data.my_group.sostav.leader.id);
	if(mydatta.mlist!==undefined && mydatta.mlist.length>0 && msgid>last_msg_id) {
		for(var i=0; i<mydatta.mlist.length; i++){
			for (var g=0; g<mydatta.mlist[i][5].length; g++){
				if(parseInt(mydatta.mlist[i][5][g]) == my_id_num){
					last_msg_id = msgid;
					playAudio("http://tt-smart.ru/end.mp3");
				}
			}
		}
	}
	return false;
}

//var msg = setInterval(checkPrivatMsg, 500);

function correctWorkTime(){
	var ttxt = "", nt = new Date().getTime(), sec = parseInt((nt - parseInt(localStorage.workStarted))/1000);
	var h = parseInt(sec/60/60), m = parseInt(sec/60 - 60*h), s = parseInt(sec%60);
	ttxt += (h!=0)?h+":":""; ttxt += (m<10)?"0"+m+":":m+":"; ttxt += (s<10)?"0"+s:s;
	byIdFr("d_act", "allworktime").innerHTML = ttxt;
}

function workfunction(){
	var gwe = gWE();
	var met = forest_f.getElementById('event_timer');
	var mettxt = "-1";
	localStorage.summBrioven = parseInt(forest_f.getElementById('items').innerHTML) - localStorage.workLastCount;
	forest_f.getElementById('allworksumm').innerHTML = localStorage.summBrioven;
	if (met!=null) {mettxt = met.innerHTML;}
	if (top.frames["d_chatact"].Client.socket.readyState==1) {
		//console.clear();
		if (gwe == 0) {
			count_restart = 0;
			if (!checkEvent()) {
				setWorkStatus("Новая рубка начата");
				var datesst = new Date().getTime();
				if (last_work_started+20000 > datesst) {
					if (count_restart2<=4) {
						setWorkStatus("Работу запустили попытка дождаться реакции арены");
						wStart();
						count_restart2++;
					} else {
						setWorkStatus("Что то пошло не так кнопки не перерисовались скрипт остановлен");
						playAudio("http://tt-smart.ru/error.mp3");
						clearInterval(worktimer);
						count_restart2=0;
					}
				} else {
					count_restart = 0; count_restart2=0;
					last_work_started = datesst;
					wStart();
				}
			}
		} else if (gwe == 3 && (met==null || mettxt == "00:00" || mettxt == "")) {
			setWorkStatus("таймер дошел до нуля но информации об окончании работ нет от сервера, начнем рубку и подождем минуту если не поможет остановим скрипт");
			wStart();
			clearInterval(worktimer);
			setTimeout(restartAllWork, 30000);
		}
	} 
}

function initMod(){
	if (top.frames["d_act"].global_data != undefined && top.frames["d_act"].global_data.my_group != undefined && top.frames["d_menu"].cords != undefined) {
		setTimeout(createElementStyle(pers_f,"d_pers"), 100);
		setTimeout(createElementStyle(forest_f,"d_act"), 100);
		setTimeout(correctRightBlock, 200);
		setTimeout(createAudioElems, 200);
		setTimeout(createAudioControls, 200);
		setTimeout(createNewButtons, 300);
		setTimeout(createArrow, 400);
		setTimeout(getAndSortTrees, 200);
		setTimeout(createNavSelector, 600);
		setTimeout(createRadiusFrame, 700);
		setTimeout(createControls,800);
		setTimeout(statusSoketCheck, 1000);
		setTimeout(function(){forest_f.getElementById('allworksumm').innerHTML = localStorage.summBrioven; if (localStorage.workCount > 0 && top.frames["d_act"].global_data.wait_event==3) {allworktime = setInterval(correctWorkTime, 1000);restartAllWork();}}, 1200);
		setTimeout(function(){var ulist = parseInt(top.frames["d_chatact"].document.querySelector('input[name="ulist"]').value);if (ulist==0) {top.frames["d_ulist"].document.querySelector('img[onclick*="ulist"]').click();}}, 1500);
		//localStorage.ModInited = true;
	} else {
		//localStorage.ModInited = false;
		setTimeout(initMod, 200);
	}
}

initMod();
