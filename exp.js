var pers = top.frames["d_pers"].document;
var menu = top.frames["d_menu"].document;
var ap = [[100,200],[400,600,800],[1100,1500,1900,2200],[3000,3500,4500,5000,5500],[7000,8000,9500,11000,12000,13500],[16000,18500,21000,23500,26000,28500,31000],[35500,40000,45000,49500,54500,59000,63500,68500],[77500,86500,95000,104000,113000,122000,131000,140000,149000],[166000,183000,200000,217000,234000,251000,268000,284500,301500,318500],[351000,383500,415500,448000,480000,512500,544500,577000,609000,641500,673500],[735000,796500,857500,919000,980000,1041500,1103000,1164000,1225500,1287000,1348000,1409500],[1526000,1642500,1759000,1875500,1992000,2108500,2225000,2341500,2458000,2574500,2691000,2807500,2924000],[3154000,3382000,3614000,3814000,4074000,4299000,4539000,4769000,4998500,5228500,5458500,5688500,5914000,6140400],[6578400,7008400,7458400,7902900,8328200,8780200,9218400,9648400,10080500,10518500,10955000,11395000,11833000,12271000,12710000],[13545000,14380000,15212700,16057900,16897400,17729400,18586100,19406100,20240100,21086100,21896500,22731000,23565000,24399000,25234000,26056000],[26822300,27588700,28355000,29121400,29887700,30654100,31420400,32186800,32953100,33719500,34858800,35252200,36018500,36784900,37551200,38317600,39084000],[42341000,45598000,48855000,52112000,55369000,58626000,61883000,65140000,68397000,71654000,74911000,78168000,81425000,84682000,87939000,91196000,94453000,97710000],[99025000,100340000,101655000,102970000,104285000,105600000,106915000,108230000,109545000,110860000,112175000,113490000,114805000,116120000,117435000,118750000,120065000,121380000,122710000],[123960000,125210000,126460000,127710000,128960000,130210000,131460000,132710000,133960000,135210000,136460000,137710000,138960000,140210000,141460000,142710000,143960000,145210000,146460000,147710000],[148900000,150090000,151280000,152470000,153660000,154850000,156040000,157230000,158420000,159610000,160800000,161990000,163180000,164370000,165560000,166750000,167940000,169130000,170320000,171510000,172710000],[176119000,179528000,182937000,186346000,189755000,193164000,196573000,199982000,203391000,206800000,210209000,213618000,217027000,220436000,223845000,227254000,230663000,234072000,237481000,240890000,244299000,247710000],[249884000,252058000,254232000,256406000,258580000,260754000,262928000,265102000,267276000,269450000,271624000,273798000,275972000,278146000,280320000,282494000,284668000,286842000,289016000,291190000,293364000,295538000,297710000],[300835000,303960000,307085000,310210000,313335000,316460000,319585000,322710000,325835000,328960000,332085000,335210000,338335000,341460000,344585000,347710000,350835000,353960000,357085000,360210000,363335000,366460000,369585000],[372710000]];

function getapp(exp) {
	for (var i=0; i<ap.length; i++) {
		for (var b=0; b<ap[i].length; b++) {
			if (ap[i][b]>=exp) {
				if(b-1<0) {
					return [ap[i-1][ap[i-1].length-1], i];
				} else {
					return [ap[i][b-1], i];
				}
			}
		}
	}
}

function create_exp(){
	if (menu.getElementById("exp_line1") == null) {
	var doc = pers.getElementById("dtxtcell");
	var menuu = menu.getElementsByTagName('td')[2];
	var r = parseInt(doc.getElementsByTagName('tr')[4].getElementsByTagName('td')[1].getElementsByTagName('b')[0].innerHTML);
	var td0 = menu.createElement("td");
		td0.setAttribute("id", "exp_info");
		td0.setAttribute("width", "200px");
		td0.setAttribute("valign", "top");
		
		var tbl = menu.createElement("table");
		tbl.setAttribute("cellspacing", "0");
		tbl.setAttribute("cellpadding", "0");
		
		td0.appendChild(tbl);
	
		var d = parseInt(doc.getElementsByTagName('tr')[5].getElementsByTagName('td')[1].getElementsByTagName('b')[0].innerHTML);
		var tr = menu.createElement("tr");
		tr.setAttribute("id", "exp_line1");
		var td = menu.createElement("td");
		td.setAttribute("colspan", "2");
		tr.appendChild(td);
		tbl.appendChild(tr);
		var lin = menu.createElement("div");
		lin.setAttribute("class","l2");
		td.appendChild(lin);
		var txt1 = menu.createElement("div");
		txt1.setAttribute("class","to_app");
		txt1.innerHTML="до аппа";
		lin.appendChild(txt1);
		var txt2 = menu.createElement("div");
		txt2.setAttribute("id", "exp0");
		lin.appendChild(txt2);
		var exp_m1 = menu.createElement("div");
		exp_m1.setAttribute("id", "pers1");
		lin.appendChild(exp_m1);
		var last_app = getapp(r);
		exp_m1.style.width = parseInt(100 - parseInt(((d-r)*100)/(d-last_app[0])))+"%";
		var tr2 = menu.createElement("tr");
		tr2.setAttribute("id", "exp_line2");
		var td2 = menu.createElement("td");
		td2.setAttribute("colspan", "2");
		tr2.appendChild(td2);
		tbl.appendChild(tr2);
		var lin2 = menu.createElement("div");
		lin2.setAttribute("class","l");
		td2.appendChild(lin2);
		var txt2 = menu.createElement("div");
		txt2.setAttribute("class","to_lvl");
		txt2.innerHTML="до уровня";
		lin2.appendChild(txt2);
		var txt2 = menu.createElement("div");
		txt2.setAttribute("id", "exp1");
		lin2.appendChild(txt2);
		var exp_m2 = menu.createElement("div");
		exp_m2.setAttribute("id", "pers2");
		lin2.appendChild(exp_m2);
		var la = getapp(r);
		exp_m2.style.width = parseInt(100-(((ap[la[1]][ap[la[1]].length-1]-r)*100)/(ap[la[1]][ap[la[1]].length-1] - ap[la[1]-1][ap[la[1]-1].length-1])))+"%";
	
	menu.getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].insertBefore(td0,menu.getElementsByTagName('td')[1]);
	}
}

function correct_exp(){
	if (menu.getElementById("exp_line2") == null) {
		create_exp();
	} else {
		var doc = pers.getElementById("dtxtcell");
		var r = parseInt(doc.getElementsByTagName('tr')[4].getElementsByTagName('td')[1].getElementsByTagName('b')[0].innerHTML);
		var d = parseInt(doc.getElementsByTagName('tr')[5].getElementsByTagName('td')[1].getElementsByTagName('b')[0].innerHTML);
		var exp_m1 = menu.getElementById("pers1");
		var exp_o1 = menu.getElementById("exp0");
		var exp_m2 = menu.getElementById("pers2");
		var exp_o2 = menu.getElementById("exp1");
		var la = getapp(r);
		if (exp_m1!=null && exp_o1!=null) {
			var s1 = ""+parseInt(d-r)+"";
			exp_m1.style.width = parseInt(100 - parseInt(((d-r)*100)/(d-la[0])))+"%";
			exp_o1.innerHTML= s1.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1<span>.</span>');
		}
		if (exp_m2!=null && exp_o2!=null) {
			var s2 = ""+ap[la[1]][ap[la[1]].length-1]-r+"";
			exp_m2.style.width = parseInt(100-(((ap[la[1]][ap[la[1]].length-1]-r)*100)/(ap[la[1]][ap[la[1]].length-1] - ap[la[1]-1][ap[la[1]-1].length-1])))+"%";
			exp_o2.innerHTML= s2.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1<span>.</span>');
		}
	}
}



function initKovMod(){
	if (top.frames["d_pers"].document != null && top.frames["d_menu"].document != null) {
		setInterval("correct_exp()",2000);
	} else {
		setTimeout(initKovMod, 200);
	}
}

initKovMod();
