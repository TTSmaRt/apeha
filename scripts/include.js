let style = "body {background: url(img/tmenubg.gif);background-size: contain;}table td:nth-of-type(1){width:70%!important;}#exp_info div {position: relative;box-sizing: border-box;}.exp_line {min-height: 15px; max-height: 15px; min-width:200px; position: relative; overflow: hidden; box-sizing: border-box;}#exp_info .to_app_text, #exp_info .to_lvl_text {position: absolute; left:1px; top:-1px; z-index: 1000; color: #333366;font-size: 12px;font-weight: bold;}#exp_info #to_app_exp, #exp_info #to_lvl_exp {position: absolute; right:1px; top:0px; z-index: 1000;color: #333366;font-size: 10px;font-weight: bold;}#to_lvl_percent, #to_app_percent {min-height: 15px; background-color: #EACA81;-webkit-box-shadow: inset 0px 0px 10px 1px #9d8049; box-shadow: inset 0px 0px 10px 1px #9d8049;}#exp_info table {width:100%;}.exp_line {border:1px solid #800}.exp_line:nth-of-type(1) { border-bottom: 0px solid #800;}";

let template = '<td id="exp_info" width="200px" valign="top"><div class="exp_line"><div class="to_app_text">до аппа</div><div id="to_app_exp"></div><div id="to_app_percent" style="width: 0%;"></div></div><div class="exp_line"><div class="to_lvl_text">до уровня</div><div id="to_lvl_exp"></div><div id="to_lvl_percent" style="width: 0%;"></div></div></td>';

let ready = {
    to:"BG",
    from: window.name,
    location: document.location.href,
    status:"ready",
    data:{}
}

let helper = {

    address: "http://specjs.ru/apeha/scripts/mods/",

    byIdFr: function(frame, did){return frame.getElementById(did);},

    htmlToElements: function(html) {
        let template = document.createElement('template');
        template.innerHTML = html;
        return template.content.childNodes[0];
    },

    crMyEl: function (elname, attrs={}, inner="") {
        let NE = document.createElement(elname, attrs);
        this.setAttributesAndInner(NE, attrs);
        if (inner!=="") NE.innerHTML = inner;
        return NE;
    },

    createElementStyle:function(id, style){
        let bod = document.getElementsByTagName('body')[0];
        let styleTag = this.crMyEl("style", {"id":""+id+"_style"}, style);
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

//chrome.tabs.getCurrent(function(tab){console.log(tab)})

chrome.runtime.onMessage.addListener(
    function(request, sender, response) {
        if (window.name === request.to) {
            if(request.action.name === "collect") {
                collect(request.action.what).then(function (collected) {
                    console.log(collected)
                    response(collected)
                })
                return true;
            }
            if(request.action.name === "prepare") {
                modPrepare().then(function () {
                    response("modReady")
                })
                return true;
            }
            if(request.action.name === "update") {
                response("updated")
                return true;
            }
        }

    });

let action = function(action){
    switch (action.name) {
        case "collect": return collect(action.what); break;
        case "prepareMod": modPrepare(); break;
        default: break;
    }

}


let getExp = function(){
    let doc = top.frames["d_pers"].document.getElementById("dtxtcell");
    let currentExp = parseInt(doc.getElementsByTagName('tr')[4].getElementsByTagName('td')[1].getElementsByTagName('b')[0].innerHTML);
    return currentExp;
}

let modPrepare = function () {
        console.log("modPrepare is called from - "+window.name)
    return new Promise(function(resolve, reject) {
        let nodes = helper.htmlToElements(template);
        $eb(nodes,$xf(".//td[2]"))
        helper.createElementStyle("mod_exp", style);
        resolve(true)
    });
};

let waitForElement = function(element, timeout){
    let time = new Date().getTime() + timeout;
    let el = document.getElementById(element)
    if (el !== null) {
        return el
    } else {
        setTimeout(function () {

            waitForElement(element,timeout-100)
        }, 100)
    }
}

let addJqueryScript = function(){
    let mod = this;
    let modScript = mod.applyTo.document.createElement("script");
    modScript.setAttribute("id", mod.name+"_jquery");
    modScript.setAttribute("src", mod.jqscriptF);
    top.frames["d_act"].document.getElementsByTagName("head")[0].appendChild(modScript);
};

let init = function () {
    say(ready);
}

let say = function(message, returnResponse=false){
    chrome.runtime.sendMessage(message, function (response) {
        if(response && returnResponse) {
            console.log(response)
        }
    });
}

let collect = function(what) {
    let timeout = 10000
    let start = new Date().getTime()
    let iter = 0;
    let loop = function (w, resolve, reject) {
        let collected = document.evaluate(w,document,null,XPathResult.STRING_TYPE,null)
        if (collected.stringValue !== "") {
            console.log(iter)
            resolve(parseInt(collected.stringValue));
        } else {
            let currentTime = new Date().getTime()
            if (start+timeout<currentTime) {
                reject(new Error("no element on 10 seconds"));
            } else {
                setTimeout(function () {
                    iter++
                    loop(w, resolve, reject)
                }, 100)
            }
        }
    }

    return new Promise(function(resolve, reject) {
        loop(what, resolve, reject);
    });
}

init();

//console.log(window.name)
//console.log(document.location.href)
//console.log("---")


function $eb(newNode, node) {
    return node.parentNode.insertBefore(newNode, node);
}

function $xf(p, c) {
    return document.evaluate(p, c || document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}