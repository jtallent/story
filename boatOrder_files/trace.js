var ya_cust;
var ya_cid;
var ya_mvt;
var ya_svc;
var ya_hag;
var ya_uid;
var ya_fid;
var ya_dv;
var ya_tid;
var ya_pid;
var ya_ccy="USD";
var ya_ctype="BUY";
var ya_itm_dtl=[];
var ya_xtra;
var ya_life=90;
var ya_cookie_domain;
var ya_gate=0;
var ya_httpscript="http://trace.youramigo.com/x";
var ya_httpsscript="https://support.youramigo.com/x";
var ya_prefix="/sl";
var ya_ddt=50;
var ya_lim=0;
var ya_ref;
var ya_entry;
var ya_slt;
var ya_vid;
var ya_ret=0;
var ya_xtc=0;
var ya_xlt="";
var ya_clkObject;
var ya_cnvObject;
function yaTrace(){
if(!ya_cust){
return;
}
if(!ya_ref){
ya_ref=document.referrer;
}
if(!ya_entry){
ya_entry=window.location.href;
}
var _1=yaDomain();
if(ya_ref&&_1&&ya_ref.match("^https?://?(?:[^/]*.)?"+_1+"/")){
return;
}
if(_1!=document.domain){
_1="."+_1;
}
var _2=(new Date()).getTime();
var _3=(new Date(_2+ya_life*24*3600*1000)).toGMTString();
if(!ya_slt){
ya_slt=_2/1000;
}
var _4="SL_VIS_"+ya_cust;
var _5=yaBitOf(document.cookie,_4,";");
if(_5){
_5=Base64.decode(_5);
ya_vid=yaBitOf(_5,"vid");
ya_ret=yaBitOf(_5,"ret");
ya_xlt=yaBitOf(_5,"xlt");
ya_xtc=yaBitOf(_5,"xtc");
ya_mvt=yaBitOf(_5,"yamvt");
if((ya_slt-yaBitOf(_5,"slt")>ya_ddt)||(ya_ref!=yaBitOf(_5,"ref"))||(ya_entry!=yaBitOf(_5,"entry"))){
ya_ret++;
}
if(!ya_ref||ya_ref.substring(0,4)!="http"){
ya_ref=yaBitOf(_5,"ref");
}
}
if(!ya_vid){
ya_vid=new UUID();
}
_5="cid="+yaEncode(ya_cid)+"&slt="+ya_slt+"&uid="+ya_uid+"&hag="+ya_hag+"&svc="+ya_svc+"&vid="+ya_vid+"&ret="+ya_ret+"&xtc="+ya_xtc+"&xlt="+ya_xlt+"&exp="+yaEncode(_3)+"&dom="+_1;
if(ya_fid){
_5+="&fid="+yaEncode(ya_fid);
}
if(ya_mvt){
_5+="&yamvt="+yaEncode(ya_mvt);
}
var _6="&ref="+yaEncode(ya_ref)+"&entry="+yaEncode(ya_entry);
var _7=_5+_6;
var _8=yaEncode(Base64.encode(_7));
if(ya_lim||navigator.appName=="Microsoft Internet Explorer"){
_5=yaEncode(Base64.encode(_5));
}else{
_5=_8;
}
var _9=ya_httpscript;
if(window.location.protocol.substring(0,5)=="https"){
_9=ya_httpsscript;
}
_9+=ya_prefix+"/"+ya_cust+"/R?ct=gif&cl="+ya_life+"&cook="+_8+"&p="+Math.random();
if(ya_xtra!==undefined){
_9+="&xtra="+yaEncode(JSON.stringify(ya_xtra));
}
document.cookie=_4+"="+_5+"; path=/"+"; expires="+_3+"; domain="+_1;
ya_clkObject=new Image();
ya_clkObject.src=_9;
ya_clkObject.onload=function(){
yaImgLoaded();
};
};
function yaConvert(){
var _a="SL_VIS_"+ya_cust;
var _b=yaBitOf(document.cookie,_a,";");
var _c=ya_httpscript;
if(window.location.protocol.substring(0,5)=="https"){
_c=ya_httpsscript;
}
_c+="/sl/"+ya_cust+"/R?ct=gif"+"&tid="+ya_tid+"&dv="+ya_dv+"&pid="+ya_pid+"&itm_dtl="+yaEncode(JSON.stringify(ya_itm_dtl))+"&ctype="+ya_ctype+"&ccy="+ya_ccy+"&gate="+ya_gate+"&p="+Math.random();
if(_b){
_c+="&cook="+yaEncode(_b);
_b=Base64.decode(_b);
if(ya_tid!=yaBitOf(_b,"xlt")){
_b=yaReplaceIn(_b,"xlt",ya_tid);
ya_xtc=yaBitOf(_b,"xtc");
_b=yaReplaceIn(_b,"xtc",++ya_xtc);
var _d=yaBitOf(_b,"exp");
var _e=yaBitOf(_b,"dom");
_b=Base64.encode(_b);
document.cookie=_a+"="+yaEncode(_b)+"; path=/"+"; expires="+_d+"; domain="+_e;
}
}
if(ya_xtra!==undefined){
_c+="&xtra="+yaEncode(JSON.stringify(ya_xtra));
}
if(_b||!ya_gate||(ya_gate<1&&ya_gate<Math.random())){
ya_cnvObject=new Image();
ya_cnvObject.src=_c;
ya_cnvObject.onload=function(){
yaImgLoaded();
};
}
};
function yaDomain(){
if(ya_cookie_domain){
return ya_cookie_domain;
}
ya_cookie_domain=document.domain;
ya_cookie_domain=ya_cookie_domain.replace(/^[^.]+\./,"");
if(ya_cookie_domain.length<=2||ya_cookie_domain.match(/^(?:com|info|biz|gov|org|mil|co|asia|edu|net)(?:\.|$)/)){
ya_cookie_domain=document.domain;
}
return ya_cookie_domain;
};
function yaBitOf(_f,_10,sep){
var _11,end;
if(!sep){
sep="&";
}
_11=_f.indexOf(_10+"=");
if(_11==-1){
return "";
}
_11+=_10.length+1;
end=_f.indexOf(sep,_11);
if(end==-1){
end=_f.length;
}
return yaDecode(_f.substring(_11,end));
};
function yaReplaceIn(_12,_13,_14,sep){
var _15,end;
if(!sep){
sep="&";
}
_15=_12.indexOf(_13+"=");
if(_15==-1){
if(_12.length>0){
_12+=sep;
}
_12+=_13+"="+yaEncode(_14);
}else{
_15+=_13.length+1;
end=_12.indexOf(sep,_15);
if(end==-1){
end=_12.length;
}
_12=_12.substring(0,_15)+yaEncode(_14)+_12.substring(end,_12.length);
}
return _12;
};
function yaEncode(s,u){
if(typeof (encodeURIComponent)=="function"){
if(u){
return encodeURI(s);
}else{
return encodeURIComponent(s);
}
}else{
return escape(s);
}
};
function yaDecode(s){
if(typeof (decodeURIComponent)=="function"){
return decodeURIComponent(s);
}else{
return unescape(s);
}
};
function yaImgLoaded(){
return;
};
function yaAddItemDetail(id,qty,_16){
if(id&&qty){
ya_itm_dtl.push([id,qty,_16]);
}
};
function UUID(){
this.id=this.createUUID();
};
UUID.prototype.valueOf=function(){
return this.id;
};
UUID.prototype.toString=function(){
return this.id;
};
UUID.prototype.createUUID=function(){
var dg=UUID.timeInMs(new Date(1582,10,15,0,0,0,0));
var dc=UUID.timeInMs(new Date());
var t=dc-dg;
var h="-";
var tl=UUID.getIntegerBits(t,0,31);
var tm=UUID.getIntegerBits(t,32,47);
var thv=UUID.getIntegerBits(t,48,59)+"1";
var _17=UUID.getIntegerBits(UUID.randrange(0,4095),0,7);
var csl=UUID.getIntegerBits(UUID.randrange(0,4095),0,7);
var n=UUID.getIntegerBits(UUID.randrange(0,8191),0,7)+UUID.getIntegerBits(UUID.randrange(0,8191),8,15)+UUID.getIntegerBits(UUID.randrange(0,8191),0,7)+UUID.getIntegerBits(UUID.randrange(0,8191),8,15)+UUID.getIntegerBits(UUID.randrange(0,8191),0,15);
return tl+h+tm+h+thv+h+_17+csl+h+n;
};
UUID.getIntegerBits=function(val,_18,end){
var _19=UUID.returnBase(val,16);
var _1a=new Array();
var _1b="";
var i=0;
for(i=0;i<_19.length;i++){
_1a.push(_19.substring(i,i+1));
}
for(i=Math.floor(_18/4);i<=Math.floor(end/4);i++){
if(!_1a[i]||_1a[i]==""){
_1b+="0";
}else{
_1b+=_1a[i];
}
}
return _1b;
};
UUID.returnBase=function(_1c,_1d){
var _1e=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var _1f;
if(_1c<_1d){
_1f=_1e[_1c];
}else{
var MSD=""+Math.floor(_1c/_1d);
var LSD=_1c-MSD*_1d;
if(MSD>=_1d){
_1f=this.returnBase(MSD,_1d)+_1e[LSD];
}else{
_1f=_1e[MSD]+_1e[LSD];
}
}
return _1f;
};
UUID.timeInMs=function(d){
var _20=100;
var _21=6000;
var _22=360000;
var _23=8640000;
var _24=207360000;
var _25=75686400000;
return Math.abs((d.getUTCFullYear()*_25)+(d.getUTCMonth()*_24)+(d.getUTCDate()*_23)+(d.getUTCHours()*_22)+(d.getUTCMinutes()*_21)+(d.getUTCSeconds()*_20)+d.getUTCMilliseconds());
};
UUID.randrange=function(min,max){
var num=Math.round(Math.random()*max);
if(num<min){
num=min;
}else{
if(num>max){
num=max;
}
}
return num;
};
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(_26){
var _27="";
var _28,_29,_2a,_2b,_2c,_2d,_2e;
var i=0;
_26=Base64._utf8_encode(_26);
while(i<_26.length){
_28=_26.charCodeAt(i++);
_29=_26.charCodeAt(i++);
_2a=_26.charCodeAt(i++);
_2b=_28>>2;
_2c=((_28&3)<<4)|(_29>>4);
_2d=((_29&15)<<2)|(_2a>>6);
_2e=_2a&63;
if(isNaN(_29)){
_2d=_2e=64;
}else{
if(isNaN(_2a)){
_2e=64;
}
}
_27=_27+this._keyStr.charAt(_2b)+this._keyStr.charAt(_2c)+this._keyStr.charAt(_2d)+this._keyStr.charAt(_2e);
}
return _27;
},decode:function(_2f){
var _30="";
var _31,_32,_33;
var _34,_35,_36,_37;
var i=0;
_2f=_2f.replace(/[^A-Za-z0-9\+\/\=]/g,"");
while(i<_2f.length){
_34=this._keyStr.indexOf(_2f.charAt(i++));
_35=this._keyStr.indexOf(_2f.charAt(i++));
_36=this._keyStr.indexOf(_2f.charAt(i++));
_37=this._keyStr.indexOf(_2f.charAt(i++));
_31=(_34<<2)|(_35>>4);
_32=((_35&15)<<4)|(_36>>2);
_33=((_36&3)<<6)|_37;
_30=_30+String.fromCharCode(_31);
if(_36!=64){
_30=_30+String.fromCharCode(_32);
}
if(_37!=64){
_30=_30+String.fromCharCode(_33);
}
}
_30=Base64._utf8_decode(_30);
return _30;
},_utf8_encode:function(_38){
_38=_38.replace(/\r\n/g,"\n");
var _39="";
for(var n=0;n<_38.length;n++){
var c=_38.charCodeAt(n);
if(c<128){
_39+=String.fromCharCode(c);
}else{
if((c>127)&&(c<2048)){
_39+=String.fromCharCode((c>>6)|192);
_39+=String.fromCharCode((c&63)|128);
}else{
_39+=String.fromCharCode((c>>12)|224);
_39+=String.fromCharCode(((c>>6)&63)|128);
_39+=String.fromCharCode((c&63)|128);
}
}
}
return _39;
},_utf8_decode:function(_3a){
var _3b="";
var i=0;
var c=0;
var c1=0;
var c2=0;
while(i<_3a.length){
c=_3a.charCodeAt(i);
if(c<128){
_3b+=String.fromCharCode(c);
i++;
}else{
if((c>191)&&(c<224)){
c2=_3a.charCodeAt(i+1);
_3b+=String.fromCharCode(((c&31)<<6)|(c2&63));
i+=2;
}else{
c2=_3a.charCodeAt(i+1);
c3=_3a.charCodeAt(i+2);
_3b+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));
i+=3;
}
}
}
return _3b;
}};
if(!this.JSON){
this.JSON={};
}
(function(){
function f(n){
return n<10?"0"+n:n;
};
if(typeof Date.prototype.toJSON!=="function"){
Date.prototype.toJSON=function(key){
return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null;
};
String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){
return this.valueOf();
};
}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,_3c=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,_3d,_3e={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"},rep;
function _3f(_40){
_3c.lastIndex=0;
return _3c.test(_40)?"\""+_40.replace(_3c,function(a){
var c=_3e[a];
return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);
})+"\"":"\""+_40+"\"";
};
function str(key,_41){
var i,k,v,_42,_43=gap,_44,_45=_41[key];
if(_45&&typeof _45==="object"&&typeof _45.toJSON==="function"){
_45=_45.toJSON(key);
}
if(typeof rep==="function"){
_45=rep.call(_41,key,_45);
}
switch(typeof _45){
case "string":
return _3f(_45);
case "number":
return isFinite(_45)?String(_45):"null";
case "boolean":
case "null":
return String(_45);
case "object":
if(!_45){
return "null";
}
gap+=_3d;
_44=[];
if(Object.prototype.toString.apply(_45)==="[object Array]"){
_42=_45.length;
for(i=0;i<_42;i+=1){
_44[i]=str(i,_45)||"null";
}
v=_44.length===0?"[]":gap?"[\n"+gap+_44.join(",\n"+gap)+"\n"+_43+"]":"["+_44.join(",")+"]";
gap=_43;
return v;
}
if(rep&&typeof rep==="object"){
_42=rep.length;
for(i=0;i<_42;i+=1){
k=rep[i];
if(typeof k==="string"){
v=str(k,_45);
if(v){
_44.push(_3f(k)+(gap?": ":":")+v);
}
}
}
}else{
for(k in _45){
if(Object.hasOwnProperty.call(_45,k)){
v=str(k,_45);
if(v){
_44.push(_3f(k)+(gap?": ":":")+v);
}
}
}
}
v=_44.length===0?"{}":gap?"{\n"+gap+_44.join(",\n"+gap)+"\n"+_43+"}":"{"+_44.join(",")+"}";
gap=_43;
return v;
}
};
if(typeof JSON.stringify!=="function"){
JSON.stringify=function(_46,_47,_48){
var i;
gap="";
_3d="";
if(typeof _48==="number"){
for(i=0;i<_48;i+=1){
_3d+=" ";
}
}else{
if(typeof _48==="string"){
_3d=_48;
}
}
rep=_47;
if(_47&&typeof _47!=="function"&&(typeof _47!=="object"||typeof _47.length!=="number")){
throw new Error("JSON.stringify");
}
return str("",{"":_46});
};
}
if(typeof JSON.parse!=="function"){
JSON.parse=function(_49,_4a){
var j;
function _4b(_4c,key){
var k,v,_4d=_4c[key];
if(_4d&&typeof _4d==="object"){
for(k in _4d){
if(Object.hasOwnProperty.call(_4d,k)){
v=_4b(_4d,k);
if(v!==undefined){
_4d[k]=v;
}else{
delete _4d[k];
}
}
}
}
return _4a.call(_4c,key,_4d);
};
cx.lastIndex=0;
if(cx.test(_49)){
_49=_49.replace(cx,function(a){
return "\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);
});
}
if(/^[\],:{}\s]*$/.test(_49.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){
j=eval("("+_49+")");
return typeof _4a==="function"?_4b({"":j},""):j;
}
throw new SyntaxError("JSON.parse");
};
}
}());

