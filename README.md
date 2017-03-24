# apeha Mods

Hi All.

That is set of mods for APEHA.ru browser game.

Discriptions of installing, usage and features will come soon.


SETUP:
Add browser extension
    chrome - cjs
    opera - scripter

Open info page
add following code to the plugin interface

var fr = top.frames["d_act"];
if (fr!=undefined) {
    var ap = top.frames["d_menu"].document.getElementById('apehaPlugin');
    if (ap===null) {
        var scr=top.frames["d_menu"].document.createElement('script');
        scr.setAttribute('src','https://rawgit.com/smart-apeha/apeha/master/<FILE NAME>.js');
        scr.setAttribute('id','apehaPlugin');
        top.frames["d_menu"].document.getElementsByTagName('head')[0].appendChild(scr);
    }
}


FOREST.JS
This is mod for browser game apeha.ru
It works in game forest.

Features:
1. Auto work til end of a tree/ore.
2. Navigation to towns.
3. Additional sounds of forest.
4. Some interface changes.
5. Frame for 5 sections radius with able to fix.
6. Ability to store tree cords after finding.
