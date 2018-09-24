let senderTabId = 0;
let currentExpPath = ".//*[@id='dtxtcell']/descendant::b[4]/text()"

'use strict';

window.flossGlobalStorageV1_0 = {
    binds: []
};

/* function of create FLOSS */
window.FLOSS = function({name, value, action, defer, bind}){

    let context = {
        name: bind ? `bind-${window.flossGlobalStorageV1_0.binds.length}` : 'window',
        obj: bind ? bind : window
    };

    window.flossGlobalStorageV1_0[context.name] = {};
    window.flossGlobalStorageV1_0[context.name][name] = value;

    /* если контекст не указан, то глобальная переменная */
    Object.defineProperty(context.obj, name, {
        get: () => {
            return window.flossGlobalStorageV1_0[context.name][name];
        },
        set: (value) => {
            /* только при фактическом изменении, но не при каждом вызове сеттера */
            if (value !== window.flossGlobalStorageV1_0[context.name][name]){
                window.flossGlobalStorageV1_0[context.name][name] = value;
                action(window.flossGlobalStorageV1_0[context.name][name]);
            }
        }
    });

    if (!defer) action(window.flossGlobalStorageV1_0[context.name][name]);

}

let state = {};

let updateState = (state) => {
    // refresh exp state in frame
    document.querySelector('#state').innerHTML = state;
}

FLOSS({
    name: 'exp',
    action: (newState) => {
        updateState(newState);
    },
    defer: true,
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        let frame = request.from;
        let action = request.action;

        senderTabId = sender.tab.id;
        //console.log(sender)
        if (request.from === "d_menu") {
            console.log(sender);
            if (request.status == "ready") {
                send(sender.tab.id, {to:request.from, from:"BG", action: {name:"prepare"}});
            }
        }
        if (request.from === "d_pers"){
            getCurrentExp().then(function (r) {
                console.log(r);
            })
        }

        if (request.from === "d_act"){
            if (request.location.indexOf("market_filt_1") > -1) {
                console.log(request.location)
            }
        }

    });


let send = function (to, action, response) {
    chrome.tabs.sendMessage(to, action, response);
}

let getCurrentExp = function () {
    return new Promise(function(resolve, reject) {
        send(senderTabId, {to:"d_pers", from:"BG", action: {name:"collect", what:currentExpPath}}, function (resp) {
            resolve(resp);
        });
    });
}

function updatePageAction(tabID, changeInfo, tab){
    if (changeInfo.status === "complete") {
        console.log(tabID)
        console.log(changeInfo)
        console.log(tab)
    }
}

chrome.tabs.onUpdated.addListener(updatePageAction);




