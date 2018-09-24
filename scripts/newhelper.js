// Some simple javascript xpath examples
var canCElC = document.evaluate( '//a[@class="canc"]' ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for (var m = 0; m < canCElC.snapshotLength; m++){
    var im = canCElC.snapshotItem(m);
}
var mems = document.evaluate( '//a[contains(@href, "profile")][ not( @class = "skyblue" )]' ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for (var l = 0; l < mems.snapshotLength; l++){
    var cThis = mems.snapshotItem(l);
}
//var canHazPics = document.evaluate( '//a[@title= "Click for large image"]' ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
//document.evaluate( 'html/body/div/div[7]/table/tbody/tr[2]/td[ not( contains(@id, "main") )]' ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
//for(...
//bravo's xpath function shortcut
// if you don't have $x already
function $x(p, c) {
    var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    while(i=x.iterateNext()) r.push(i);
    return r;
}
//
// a function to change history days in links
//
// Usage: ChangeDays(n); where n is 1, 3, 7, 14, 30 or 60 - not sure what other values may do to poor Simones Site
//
function ChangeDays(d) {
    $x('//a[contains(@href, "/forum-user.cfm?id=")][not(contains(@href, "days="))]').forEach(function(e) {
        e.setAttribute('href', e.getAttribute('href').replace(/cfm\?id=/, 'cfm?days='+d+'&id='));
    });
}
// more bravo stuff
// getById
function $i(id) {
    return document.getElementById(id);
}
// xpath unordered nodes
function $xu(p, c) {
    var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    while(i=x.iterateNext()) r.push(i);
    return r;
}
// xpath ordered nodes
function $xo(p, c) {
    var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    while(i=x.iterateNext()) r.push(i);
    return r;
}
// xpath single first node
function $xf(p, c) {
    return document.evaluate(p, c || document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
// xpath single any node
function $xa(p, c) {
    return document.evaluate(p, c || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}
// getByCLASS(className, orderedFlag);
// untested!!
function $c(cls, o) {
    var fn=$xu;
    if(o) fn=$xo;
    return fn('//*[@class = "'+cls+'"' +
        ' or contains(@class, " '+cls+' ")' +
        ' or starts-with(@class, "' +cls+' ")' +
        ' or substring(@class,string-length(@class)-'+cls.length+')=" '+cls+'"]');
}
// create Element
function $ec(type, attributes){
    var node = document.createElement(type);
    for (var attr in attributes) if (attributes.hasOwnProperty(attr)){
        node.setAttribute(attr, attributes[attr]);
    }
    return node;
}
// delete Element
function $ed(element) {
    element.parentNode.removeChild(element);
}
// insert element after
function $ea(newNode, node) {
    return node.parentNode.insertBefore(newNode, node.nextSibling);
}
// insert element before
function $eb(newNode, node) {
    return node.parentNode.insertBefore(newNode, node);
}
// make element first child of par
function $ef(newNode, par) {
    return par.insertBefore(newNode, par.firstChild);
}
// make element last child of par
function $el(newNode, par) {
    return par.appendChild(newNode);
}
