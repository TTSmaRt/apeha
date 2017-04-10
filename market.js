
let pers_f = top.frames["d_pers"].document;
let menu = top.frames["d_menu"].document;
let classes_added = false;

let config = {
    trees: {
        on_off: true,
        images: {
            pine: {
                log:{ bad:"1_923.gif", normal:"1_924.gif", good:"1_925.gif" },
                plank:{ bad:"1_944.gif", normal:"1_945.gif", good:"1_946.gif" }
            },
            oak: {
                log:{ bad:"1_926.gif", normal:"1_927.gif", good:"1_928.gif" },
                plank:{ bad:"1_947.gif", normal:"1_948.gif", good:"1_949.gif" }
            },
            red: {
                log:{bad:"1_929.gif", normal:"1_930.gif", good:"1_931.gif" },
                plank:{ bad:"1_950.gif", normal:"1_951.gif", good:"1_952.gif" }
            }
        },
        query_string_start: "img[src*='",
        query_string_end: "']"
    },
    ore:{
        on_off:true,
        images: {
            copper: {
                ore:{ bad:"1_935.gif", normal:"1_936.gif", good:"1_937.gif" },
                ingot:{ bad:"1_953.gif", normal:"1_954.gif", good:"1_955.gif" }
            },
            iron: {
                ore:{ bad:"1_938.gif", normal:"1_939.gif", good:"1_940.gif" },
                ingot:{ bad:"1_956.gif", normal:"1_957.gif", good:"1_958.gif" }
            },
            gold: {
                ore:{bad:"1_941.gif", normal:"1_942.gif", good:"1_943.gif" },
                ingot:{ bad:"1_959.gif", normal:"1_960.gif", good:"1_961.gif" }
            }
        },
        query_string: ".item img[src~='1_953.gif']"
    }
};


function getLine(search_str) {
    for (let i in config) {
        for (let j in config[i].images) {
            for (let m in config[i].images[j]) {
                for (let k in config[i].images[j][m]) {
                    if (config[i].images[j][m][k] == search_str) {
                        return "_" + i + " _" + j + " _" + m + " _" + k;
                    }
                }
            }
        }
    }
    return "";
}

console.log(getLine("1_944.gif"));




function setAttributesAndInner(el, attributes={}, inner="") {
    //console.log(inner);
    for (let key in attributes) {if(attributes.hasOwnProperty(key)) {el.setAttribute(key, attributes[key]);}}
    if (inner) {el.innerHTML = inner;}
}

function _crEl(tf, el_name, attributes={}, inner="") {
    //console.log(inner);
    let NE = tf.createElement(el_name);
    setAttributesAndInner(NE, attributes, inner);
    return NE;
}

function getKey() {
    //let new_class = "";
    return iterator(config, "1_946.gif");
}



function markMarketLines() {
    if (!classes_added) {
        let lines = top.frames["d_act"].document.querySelectorAll("tr.item");
        console.log(lines.length);
        for (let i=0; i<lines.length; i++) {
            let src = lines[i].getElementsByTagName("img")[0].src;
            let arr = src.split("/");
            let new_class = getLine(arr[4]);
            lines[i].className += " "+new_class;
        }
        classes_added = true;
    }
}

function _crBtn(tf, attributes={}, inner=""){
    console.log(inner);
    let navigation_button = _crEl(tf, "b", {class:"button"});
    let inner_navigation_button = _crEl(tf, "b", {style:"width: 100%;"});
    navigation_button.appendChild(inner_navigation_button);
    let end_button = _crEl(tf, "input", attributes, inner);
    inner_navigation_button.appendChild(end_button);
    return navigation_button;
}



function createButtons(){
    if (!top.frames["d_act"].document.getElementById("filters")) {
        classes_added = false;
        let act = top.frames["d_act"].document;
        let act_place = act.getElementsByTagName("hr")[1];
        let filters = _crEl(act, "div", {id:"filters"});
        let filters_line_1 = _crEl(act, "div", {id:"filters_line_1"});
        let filters_line_2 = _crEl(act, "div", {id:"filters_line_2"});
        filters.appendChild(filters_line_1);
        filters.appendChild(filters_line_2);
        act_place.parentNode.insertBefore(filters, act_place.nextSibling);

        let trees = _crBtn(act, {type:"button", id:"filter_trees", onclick:"top.frames.d_menu.on_off('_trees', '', '')", value:"ƒеревь¤"});
        filters_line_1.appendChild(trees);

        let ore = _crBtn(act, {type:"button", id:"filter_ore", onclick:"top.frames.d_menu.on_off('_ore', '', '')", value:"–уда"});
        filters_line_2.appendChild(ore);
        markMarketLines();
    }
}

function on_off(type, sort, quality) {
    if (sort!="") {}
    if (quality!="") {}
    if (type!="") {}
    let type2 ="";
    if (type == "_ore") {type2 = "_trees"} else {type2 = "_ore";}
    let ore = top.frames["d_act"].document.querySelectorAll("."+type2);
    let style = ore[0].getAttribute("style");
    if (style != undefined && style != "") {
        //console.log(ore[0]);
        for (let i=0; i<ore.length; i++) {
            ore[i].setAttribute("style","");
            let next = ore[i].nextSibling.nextSibling;
            next.setAttribute("style","");
            top.frames["d_act"].document.getElementById("filter"+type).parentNode.parentNode.setAttribute("class", "button");
        }
    } else {
        for (let i=0; i<ore.length; i++) {
            ore[i].setAttribute("style","display:none;");
            let next = ore[i].nextSibling.nextSibling;
            next.setAttribute("style","display:none;");
            top.frames["d_act"].document.getElementById("filter"+type).parentNode.parentNode.setAttribute("class", "button-a");
        }
    }
}

function checkPage(page) {
    let room = top.frames["d_act"].document.location.pathname;
    return room.indexOf(page)>0;
}

function renderFilterButtons() {
    //console.log("renderFilterButtons");
    if(checkPage("market_filt_1")) {
        createButtons();
    } else {
        classes_added = false;
    }
}

setInterval(renderFilterButtons, 2000);


//http://kovcheg.apeha.ru/market_filt_1.html?xdac=0.8711367519758741

//рынок общие за¤вки
