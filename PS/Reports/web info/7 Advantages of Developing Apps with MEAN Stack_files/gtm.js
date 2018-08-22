
// Copyright 2012 Google Inc. All rights reserved.
(function(){

var data = {
"resource": {
  "version":"17",
  "macros":[{
      "function":"__u",
      "vtp_component":"PATH"
    },{
      "function":"__e"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"currencyCode"
    },{
      "function":"__u"
    },{
      "function":"__v",
      "vtp_name":"gtm.triggers",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":true,
      "vtp_defaultValue":""
    },{
      "function":"__v",
      "vtp_name":"gtm.scrollThreshold",
      "vtp_dataLayerVersion":1
    },{
      "function":"__u",
      "vtp_component":"URL"
    },{
      "function":"__u",
      "vtp_component":"HOST"
    },{
      "function":"__f",
      "vtp_component":"URL"
    },{
      "function":"__e"
    },{
      "function":"__v",
      "vtp_name":"gtm.scrollUnits",
      "vtp_dataLayerVersion":1
    },{
      "function":"__v",
      "vtp_name":"gtm.scrollDirection",
      "vtp_dataLayerVersion":1
    }],
  "tags":[{
      "function":"__ua",
      "once_per_event":true,
      "vtp_overrideGaSettings":true,
      "vtp_setTrackerName":false,
      "vtp_doubleClick":true,
      "vtp_useDebugVersion":false,
      "vtp_useHashAutoLink":false,
      "vtp_trackType":"TRACK_PAGEVIEW",
      "vtp_decorateFormsAutoLink":false,
      "vtp_enableLinkId":false,
      "vtp_enableEcommerce":false,
      "vtp_trackingId":"UA-65643117-1",
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "tag_id":1
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_setTrackerName":false,
      "vtp_doubleClick":false,
      "vtp_useDebugVersion":false,
      "vtp_fieldsToSet":["list",["map","fieldName","currencyCode","value",["macro",2]],["map","fieldName","cookieDomain","value","auto"]],
      "vtp_trackType":"TRACK_TRANSACTION",
      "vtp_enableLinkId":false,
      "vtp_trackingId":"UA-65643117-1",
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsTransaction":true,
      "tag_id":3
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_overrideGaSettings":true,
      "vtp_doubleClick":true,
      "vtp_setTrackerName":false,
      "vtp_useDebugVersion":false,
      "vtp_useHashAutoLink":false,
      "vtp_trackType":"TRACK_PAGEVIEW",
      "vtp_decorateFormsAutoLink":false,
      "vtp_enableLinkId":false,
      "vtp_enableEcommerce":false,
      "vtp_trackingId":"UA-65643117-2",
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "tag_id":5
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":7
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":8
    },{
      "function":"__sp",
      "once_per_event":true,
      "vtp_conversionId":"934953318",
      "vtp_customParamsFormat":"NONE",
      "vtp_url":["macro",3],
      "tag_id":11
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":true,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Engagement",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_eventAction":["macro",5],
      "vtp_eventLabel":["macro",6],
      "vtp_trackingId":"UA-65643117-2",
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":12
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Visit",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_eventAction":"2 Minute",
      "vtp_eventLabel":["macro",6],
      "vtp_trackingId":"UA-65643117-2",
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":13
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Engagement",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_eventAction":["macro",5],
      "vtp_eventLabel":["macro",0],
      "vtp_trackingId":"UA-65643117-2",
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":14
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Engagement",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_eventAction":["macro",5],
      "vtp_eventLabel":["macro",0],
      "vtp_trackingId":"UA-65643117-2",
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":15
    },{
      "function":"__cl",
      "tag_id":16
    },{
      "function":"__sdl",
      "vtp_verticalThresholdUnits":"PERCENT",
      "vtp_verticalThresholdsPercent":"70",
      "vtp_verticalThresholdOn":true,
      "vtp_horizontalThresholdOn":false,
      "vtp_uniqueTriggerId":"1421027_15",
      "tag_id":17
    },{
      "function":"__tl",
      "vtp_eventName":"gtm.timer",
      "vtp_interval":"120000",
      "vtp_limit":"1",
      "vtp_uniqueTriggerId":"1421027_16",
      "tag_id":18
    },{
      "function":"__sdl",
      "vtp_verticalThresholdUnits":"PERCENT",
      "vtp_verticalThresholdsPercent":"40",
      "vtp_verticalThresholdOn":true,
      "vtp_horizontalThresholdOn":false,
      "vtp_uniqueTriggerId":"1421027_20",
      "tag_id":19
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\u003Cmeta name=\"google-site-verification\" content=\"8VRCSE13l1gLBLsOPTdZgMY7CxbQz36twYzDEMBtbko\"\u003E",
      "vtp_supportDocumentWrite":true,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "vtp_usePostscribe":true,
      "tag_id":4
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\u003Cmeta name=\"google-site-verification\" content=\"WpLyJL_bj8WTT1hx8Z7x_uzzLXLAx8L_B67eUykwjJY\"\u003E",
      "vtp_supportDocumentWrite":true,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "vtp_usePostscribe":true,
      "tag_id":6
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\n\u003Cscript type=\"text\/gtmscript\"\u003E!function(b,e,f,g,a,c,d){b.fbq||(a=b.fbq=function(){a.callMethod?a.callMethod.apply(a,arguments):a.queue.push(arguments)},b._fbq||(b._fbq=a),a.push=a,a.loaded=!0,a.version=\"2.0\",a.queue=[],c=e.createElement(f),c.async=!0,c.src=g,d=e.getElementsByTagName(f)[0],d.parentNode.insertBefore(c,d))}(window,document,\"script\",\"https:\/\/connect.facebook.net\/en_US\/fbevents.js\");fbq(\"init\",\"992703767527158\");fbq(\"set\",\"agent\",\"tmgoogletagmanager\",\"992703767527158\");fbq(\"track\",\"Purchase\",{value:",["escape",["macro",2],8,16],"});\u003C\/script\u003E\n"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":9
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\n\u003Cscript type=\"text\/gtmscript\"\u003E!function(b,e,f,g,a,c,d){b.fbq||(a=b.fbq=function(){a.callMethod?a.callMethod.apply(a,arguments):a.queue.push(arguments)},b._fbq||(b._fbq=a),a.push=a,a.loaded=!0,a.version=\"2.0\",a.queue=[],c=e.createElement(f),c.async=!0,c.src=g,d=e.getElementsByTagName(f)[0],d.parentNode.insertBefore(c,d))}(window,document,\"script\",\"https:\/\/connect.facebook.net\/en_US\/fbevents.js\");fbq(\"init\",\"992703767527158\");fbq(\"set\",\"agent\",\"tmgoogletagmanager\",\"992703767527158\");fbq(\"track\",\"CompleteRegistration\",{origin:",["escape",["macro",2],8,16],"});\u003C\/script\u003E\n"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":10
    }],
  "predicates":[{
      "function":"_cn",
      "arg0":["macro",0],
      "arg1":"\/magazine"
    },{
      "function":"_eq",
      "arg0":["macro",1],
      "arg1":"gtm.js"
    },{
      "function":"_cn",
      "arg0":["macro",0],
      "arg1":"payment\/success"
    },{
      "function":"_eq",
      "arg0":["macro",1],
      "arg1":"gtm.dom"
    },{
      "function":"_eq",
      "arg0":["macro",1],
      "arg1":"gtm.scrollDepth"
    },{
      "function":"_re",
      "arg0":["macro",4],
      "arg1":"(^$|((^|,)1421027_15($|,)))"
    },{
      "function":"_eq",
      "arg0":["macro",1],
      "arg1":"gtm.timer"
    },{
      "function":"_re",
      "arg0":["macro",4],
      "arg1":"(^$|((^|,)1421027_16($|,)))"
    },{
      "function":"_re",
      "arg0":["macro",4],
      "arg1":"(^$|((^|,)1421027_20($|,)))"
    },{
      "function":"_ew",
      "arg0":["macro",6],
      "arg1":"\/payment\/failure"
    }],
  "rules":[
    [["if",1],["unless",0],["add",0,15]],
    [["if",2,3],["add",1,16]],
    [["if",0,1],["add",2,14,12]],
    [["if",1],["add",3,4,5,10,11,13]],
    [["if",0,4,5],["add",6,8]],
    [["if",6,7],["add",7,8]],
    [["if",0,4,8],["add",9]],
    [["if",1,9],["add",16,17]]]
},
"runtime":[
[],[]
]};

var aa=this,ea=function(){if(null===ba){var a;a:{var b=aa.document,c=b.querySelector&&b.querySelector("script[nonce]");if(c){var d=c.nonce||c.getAttribute("nonce");if(d&&da.test(d)){a=d;break a}}a=null}ba=a||""}return ba},da=/^[\w+/_-]+[=]{0,2}$/,ba=null,fa=function(a,b){function c(){}c.prototype=b.prototype;a.Ye=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.He=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,
d)}};var ha=function(a,b){this.w=a;this.md=b};ha.prototype.zd=function(){return this.w};ha.prototype.getType=ha.prototype.zd;ha.prototype.getData=function(){return this.md};ha.prototype.getData=ha.prototype.getData;var ka=function(a){return"number"===typeof a&&0<=a&&isFinite(a)&&0===a%1||"string"===typeof a&&"-"!==a[0]&&a===""+parseInt(a,10)},la=function(){this.ja={};this.Ba=!1};la.prototype.get=function(a){return this.ja["dust."+a]};la.prototype.set=function(a,b){!this.Ba&&(this.ja["dust."+a]=b)};la.prototype.has=function(a){return this.ja.hasOwnProperty("dust."+a)};var ma=function(a){var b=[],c;for(c in a.ja)a.ja.hasOwnProperty(c)&&b.push(c.substr(5));return b};
la.prototype.remove=function(a){!this.Ba&&delete this.ja["dust."+a]};la.prototype.J=function(){this.Ba=!0};var g=function(a){this.ma=new la;this.h=[];a=a||[];for(var b in a)a.hasOwnProperty(b)&&(ka(b)?this.h[Number(b)]=a[Number(b)]:this.ma.set(b,a[b]))};g.prototype.toString=function(){for(var a=[],b=0;b<this.h.length;b++){var c=this.h[b];null===c||void 0===c?a.push(""):a.push(c.toString())}return a.join(",")};g.prototype.set=function(a,b){if("length"==a){if(!ka(b))throw"RangeError: Length property must be a valid integer.";this.h.length=Number(b)}else ka(a)?this.h[Number(a)]=b:this.ma.set(a,b)};
g.prototype.set=g.prototype.set;g.prototype.get=function(a){return"length"==a?this.length():ka(a)?this.h[Number(a)]:this.ma.get(a)};g.prototype.get=g.prototype.get;g.prototype.length=function(){return this.h.length};g.prototype.R=function(){for(var a=ma(this.ma),b=0;b<this.h.length;b++)a.push(b+"");return new g(a)};g.prototype.getKeys=g.prototype.R;g.prototype.remove=function(a){ka(a)?delete this.h[Number(a)]:this.ma.remove(a)};g.prototype.remove=g.prototype.remove;g.prototype.pop=function(){return this.h.pop()};
g.prototype.pop=g.prototype.pop;g.prototype.push=function(a){return this.h.push.apply(this.h,Array.prototype.slice.call(arguments))};g.prototype.push=g.prototype.push;g.prototype.shift=function(){return this.h.shift()};g.prototype.shift=g.prototype.shift;g.prototype.splice=function(a,b,c){return new g(this.h.splice.apply(this.h,arguments))};g.prototype.splice=g.prototype.splice;g.prototype.unshift=function(a){return this.h.unshift.apply(this.h,Array.prototype.slice.call(arguments))};
g.prototype.unshift=g.prototype.unshift;g.prototype.has=function(a){return ka(a)&&this.h.hasOwnProperty(a)||this.ma.has(a)};var na=function(){function a(a,b){c[a]=b}function b(){c={}}var c={},d={add:a,reset:b,create:function(d){var e={add:a,request:function(a,b){return c[a]?c[a].apply(d,Array.prototype.slice.call(arguments,1)):!1},reset:b};e.add=e.add;e.request=e.request;e.reset=e.reset;return e}};d.add=d.add;d.reset=d.reset;return d};var oa=function(){function a(a,c){if(b[a]){if(b[a].Oa+c>b[a].max)throw Error("Quota exceeded");b[a].Oa+=c}}var b={},c=void 0,d=void 0,e={Wd:function(a){c=a},Ub:function(){c&&a(c,1)},Xd:function(a){d=a},V:function(b){d&&a(d,b)},qe:function(a,c){b[a]=b[a]||{Oa:0};b[a].max=c},yd:function(a){return b[a]&&b[a].Oa||0},reset:function(){b={}},fd:a};e.onFnConsume=e.Wd;e.consumeFn=e.Ub;e.onStorageConsume=e.Xd;e.consumeStorage=e.V;e.setMax=e.qe;e.getConsumed=e.yd;e.reset=e.reset;e.consume=e.fd;return e};var pa=function(a,b,c){this.K=a;this.aa=b;this.Z=c;this.h=new la};pa.prototype.add=function(a,b){this.h.Ba||(this.K.V(("string"===typeof a?a.length:1)+("string"===typeof b?b.length:1)),this.h.set(a,b))};pa.prototype.add=pa.prototype.add;pa.prototype.set=function(a,b){this.h.Ba||(this.Z&&this.Z.has(a)?this.Z.set(a,b):(this.K.V(("string"===typeof a?a.length:1)+("string"===typeof b?b.length:1)),this.h.set(a,b)))};pa.prototype.set=pa.prototype.set;
pa.prototype.get=function(a){return this.h.has(a)?this.h.get(a):this.Z?this.Z.get(a):void 0};pa.prototype.get=pa.prototype.get;pa.prototype.has=function(a){return!!this.h.has(a)||!(!this.Z||!this.Z.has(a))};pa.prototype.has=pa.prototype.has;pa.prototype.I=function(){return this.K};pa.prototype.J=function(){this.h.J()};var qa=function(a){return"[object Array]"==Object.prototype.toString.call(Object(a))},ra=function(a,b){if(Array.prototype.indexOf){var c=a.indexOf(b);return"number"==typeof c?c:-1}for(var d=0;d<a.length;d++)if(a[d]===b)return d;return-1};var v=function(a,b){la.call(this);this.kc=a;this.wd=b};fa(v,la);var ta=function(a,b){for(var c,d=0;d<b.length&&!(c=sa(a,b[d]),c instanceof ha);d++);return c},sa=function(a,b){var c=a.get(String(b[0]));if(!(c&&c instanceof v))throw"Attempting to execute non-function "+b[0]+".";return c.m.apply(c,[a].concat(b.slice(1)))};v.prototype.toString=function(){return this.kc};v.prototype.getName=function(){return this.kc};v.prototype.getName=v.prototype.getName;v.prototype.R=function(){return new g(ma(this))};
v.prototype.getKeys=v.prototype.R;v.prototype.m=function(a,b){var c,d={B:function(){return a},evaluate:function(b){var c=a;return qa(b)?sa(c,b):b},xa:function(b){return ta(a,b)},I:function(){return a.I()},Ne:function(){c||(c=a.aa.create(d));return c}};a.I().Ub();return this.wd.apply(d,Array.prototype.slice.call(arguments,1))};v.prototype.invoke=v.prototype.m;var ua=function(){la.call(this)};fa(ua,la);ua.prototype.R=function(){return new g(ma(this))};ua.prototype.getKeys=ua.prototype.R;/*
 jQuery v1.9.1 (c) 2005, 2012 jQuery Foundation, Inc. jquery.org/license. */
var va=/\[object (Boolean|Number|String|Function|Array|Date|RegExp)\]/,wa=function(a){if(null==a)return String(a);var b=va.exec(Object.prototype.toString.call(Object(a)));return b?b[1].toLowerCase():"object"},xa=function(a,b){return Object.prototype.hasOwnProperty.call(Object(a),b)},ya=function(a){if(!a||"object"!=wa(a)||a.nodeType||a==a.window)return!1;try{if(a.constructor&&!xa(a,"constructor")&&!xa(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}for(var b in a);return void 0===
b||xa(a,b)},za=function(a,b){var c=b||("array"==wa(a)?[]:{}),d;for(d in a)if(xa(a,d)){var e=a[d];"array"==wa(e)?("array"!=wa(c[d])&&(c[d]=[]),c[d]=za(e,c[d])):ya(e)?(ya(c[d])||(c[d]={}),c[d]=za(e,c[d])):c[d]=e}return c};var Aa=function(a){if(a instanceof g){for(var b=[],c=a.length(),d=0;d<c;d++)a.has(d)&&(b[d]=Aa(a.get(d)));return b}if(a instanceof ua){for(var e={},f=a.R(),h=f.length(),k=0;k<h;k++)e[f.get(k)]=Aa(a.get(f.get(k)));return e}return a instanceof v?function(){for(var b=Array.prototype.slice.call(arguments,0),c=0;c<b.length;c++)b[c]=Ba(b[c]);var d=new pa(oa(),na());return Aa(a.m.apply(a,[d].concat(b)))}:a},Ba=function(a){if(qa(a)){for(var b=[],c=0;c<a.length;c++)a.hasOwnProperty(c)&&(b[c]=Ba(a[c]));return new g(b)}if(ya(a)){var d=
new ua,e;for(e in a)a.hasOwnProperty(e)&&d.set(e,Ba(a[e]));return d}if("function"===typeof a)return new v("",function(b){for(var c=Array.prototype.slice.call(arguments,0),d=0;d<c.length;d++)c[d]=Aa(this.evaluate(c[d]));return Ba(a.apply(a,c))});var f=typeof a;if(null===a||"string"===f||"number"===f||"boolean"===f)return a};var Da={control:function(a,b){return new ha(a,this.evaluate(b))},fn:function(a,b,c){var d=this.B(),e=this.evaluate(b);if(!(e instanceof g))throw"Error: non-List value given for Fn argument names.";var f=Array.prototype.slice.call(arguments,2);this.I().V(a.length+f.length);return new v(a,function(){return function(a){for(var b=new pa(d.K,d.aa,d),c=Array.prototype.slice.call(arguments,0),h=0;h<c.length;h++)if(c[h]=this.evaluate(c[h]),c[h]instanceof ha)return c[h];for(var n=e.get("length"),p=0;p<n;p++)p<
c.length?b.set(e.get(p),c[p]):b.set(e.get(p),void 0);b.set("arguments",new g(c));var q=ta(b,f);if(q instanceof ha)return"return"===q.w?q.getData():q}}())},list:function(a){var b=this.I();b.V(arguments.length);for(var c=new g,d=0;d<arguments.length;d++){var e=this.evaluate(arguments[d]);"string"===typeof e&&b.V(e.length?e.length-1:0);c.push(e)}return c},map:function(a){for(var b=this.I(),c=new ua,d=0;d<arguments.length-1;d+=2){var e=this.evaluate(arguments[d])+"",f=this.evaluate(arguments[d+1]),h=
e.length;h+="string"===typeof f?f.length:1;b.V(h);c.set(e,f)}return c},undefined:function(){}};var w=function(){this.K=oa();this.aa=na();this.za=new pa(this.K,this.aa)};w.prototype.T=function(a,b){var c=new v(a,b);c.J();this.za.set(a,c)};w.prototype.addInstruction=w.prototype.T;w.prototype.Tb=function(a,b){Da.hasOwnProperty(a)&&this.T(b||a,Da[a])};w.prototype.addNativeInstruction=w.prototype.Tb;w.prototype.I=function(){return this.K};w.prototype.getQuota=w.prototype.I;w.prototype.Va=function(){this.K=oa();this.za.K=this.K};w.prototype.resetQuota=w.prototype.Va;
w.prototype.ne=function(){this.aa=na();this.za.aa=this.aa};w.prototype.resetPermissions=w.prototype.ne;w.prototype.O=function(a,b){var c=Array.prototype.slice.call(arguments,0);return this.wb(c)};w.prototype.execute=w.prototype.O;w.prototype.wb=function(a){for(var b,c=0;c<arguments.length;c++){var d=sa(this.za,arguments[c]);b=d instanceof ha||d instanceof v||d instanceof g||d instanceof ua||null===d||void 0===d||"string"===typeof d||"number"===typeof d||"boolean"===typeof d?d:void 0}return b};
w.prototype.run=w.prototype.wb;w.prototype.J=function(){this.za.J()};w.prototype.makeImmutable=w.prototype.J;var Ea=function(a){for(var b=[],c=0;c<a.length();c++)a.has(c)&&(b[c]=a.get(c));return b};var Fa={ve:"concat every filter forEach hasOwnProperty indexOf join lastIndexOf map pop push reduce reduceRight reverse shift slice some sort splice unshift toString".split(" "),concat:function(a,b){for(var c=[],d=0;d<this.length();d++)c.push(this.get(d));for(d=1;d<arguments.length;d++)if(arguments[d]instanceof g)for(var e=arguments[d],f=0;f<e.length();f++)c.push(e.get(f));else c.push(arguments[d]);return new g(c)},every:function(a,b){for(var c=this.length(),d=0;d<this.length()&&d<c;d++)if(this.has(d)&&
!b.m(a,this.get(d),d,this))return!1;return!0},filter:function(a,b){for(var c=this.length(),d=[],e=0;e<this.length()&&e<c;e++)this.has(e)&&b.m(a,this.get(e),e,this)&&d.push(this.get(e));return new g(d)},forEach:function(a,b){for(var c=this.length(),d=0;d<this.length()&&d<c;d++)this.has(d)&&b.m(a,this.get(d),d,this)},hasOwnProperty:function(a,b){return this.has(b)},indexOf:function(a,b,c){var d=this.length(),e=void 0===c?0:Number(c);0>e&&(e=Math.max(d+e,0));for(var f=e;f<d;f++)if(this.has(f)&&this.get(f)===
b)return f;return-1},join:function(a,b){for(var c=[],d=0;d<this.length();d++)c.push(this.get(d));return c.join(b)},lastIndexOf:function(a,b,c){var d=this.length(),e=d-1;void 0!==c&&(e=0>c?d+c:Math.min(c,e));for(var f=e;0<=f;f--)if(this.has(f)&&this.get(f)===b)return f;return-1},map:function(a,b){for(var c=this.length(),d=[],e=0;e<this.length()&&e<c;e++)this.has(e)&&(d[e]=b.m(a,this.get(e),e,this));return new g(d)},pop:function(){return this.pop()},push:function(a,b){return this.push.apply(this,Array.prototype.slice.call(arguments,
1))},reduce:function(a,b,c){var d=this.length(),e,f;if(void 0!==c)e=c,f=0;else{if(0==d)throw"TypeError: Reduce on List with no elements.";for(var h=0;h<d;h++)if(this.has(h)){e=this.get(h);f=h+1;break}if(h==d)throw"TypeError: Reduce on List with no elements.";}for(h=f;h<d;h++)this.has(h)&&(e=b.m(a,e,this.get(h),h,this));return e},reduceRight:function(a,b,c){var d=this.length(),e,f;if(void 0!==c)e=c,f=d-1;else{if(0==d)throw"TypeError: ReduceRight on List with no elements.";for(var h=1;h<=d;h++)if(this.has(d-
h)){e=this.get(d-h);f=d-(h+1);break}if(h>d)throw"TypeError: ReduceRight on List with no elements.";}for(h=f;0<=h;h--)this.has(h)&&(e=b.m(a,e,this.get(h),h,this));return e},reverse:function(){for(var a=Ea(this),b=a.length-1,c=0;0<=b;b--,c++)a.hasOwnProperty(b)?this.set(c,a[b]):this.remove(c);return this},shift:function(){return this.shift()},slice:function(a,b,c){var d=this.length();void 0===b&&(b=0);b=0>b?Math.max(d+b,0):Math.min(b,d);c=void 0===c?d:0>c?Math.max(d+c,0):Math.min(c,d);c=Math.max(b,
c);for(var e=[],f=b;f<c;f++)e.push(this.get(f));return new g(e)},some:function(a,b){for(var c=this.length(),d=0;d<this.length()&&d<c;d++)if(this.has(d)&&b.m(a,this.get(d),d,this))return!0;return!1},sort:function(a,b){var c=Ea(this);void 0===b?c.sort():c.sort(function(c,d){return Number(b.m(a,c,d))});for(var d=0;d<c.length;d++)c.hasOwnProperty(d)?this.set(d,c[d]):this.remove(d)},splice:function(a,b,c,d){return this.splice.apply(this,Array.prototype.splice.call(arguments,1,arguments.length-1))},toString:function(){return this.toString()},
unshift:function(a,b){return this.unshift.apply(this,Array.prototype.slice.call(arguments,1))}};var x={fc:{ADD:0,AND:1,APPLY:2,ASSIGN:3,BREAK:4,CASE:5,CONTINUE:6,CONTROL:49,CREATE_ARRAY:7,CREATE_OBJECT:8,DEFAULT:9,DEFN:50,DIVIDE:10,DO:11,EQUALS:12,EXPRESSION_LIST:13,FN:51,FOR:14,FOR_IN:47,GET:15,GET_CONTAINER_VARIABLE:48,GET_INDEX:16,GET_PROPERTY:17,GREATER_THAN:18,GREATER_THAN_EQUALS:19,IDENTITY_EQUALS:20,IDENTITY_NOT_EQUALS:21,IF:22,LESS_THAN:23,LESS_THAN_EQUALS:24,MODULUS:25,MULTIPLY:26,NEGATE:27,NOT:28,NOT_EQUALS:29,NULL:45,OR:30,PLUS_EQUALS:31,POST_DECREMENT:32,POST_INCREMENT:33,PRE_DECREMENT:34,
PRE_INCREMENT:35,QUOTE:46,RETURN:36,SET_PROPERTY:43,SUBTRACT:37,SWITCH:38,TERNARY:39,TYPEOF:40,UNDEFINED:44,VAR:41,WHILE:42}},Ga="charAt concat indexOf lastIndexOf match replace search slice split substring toLowerCase toLocaleLowerCase toString toUpperCase toLocaleUpperCase trim".split(" "),Ha=new ha("break"),Ia=new ha("continue");x.add=function(a,b){return this.evaluate(a)+this.evaluate(b)};x.and=function(a,b){return this.evaluate(a)&&this.evaluate(b)};
x.apply=function(a,b,c){a=this.evaluate(a);b=this.evaluate(b);c=this.evaluate(c);if(!(c instanceof g))throw"Error: Non-List argument given to Apply instruction.";if(null===a||void 0===a)throw"TypeError: Can't read property "+b+" of "+a+".";if("boolean"==typeof a||"number"==typeof a){if("toString"==b)return a.toString();throw"TypeError: "+a+"."+b+" is not a function.";}if("string"==typeof a){if(0<=ra(Ga,b))return Ba(a[b].apply(a,Ea(c)));throw"TypeError: "+b+" is not a function";}if(a instanceof g){if(a.has(b)){var d=
a.get(b);if(d instanceof v){var e=Ea(c);e.unshift(this.B());return d.m.apply(d,e)}throw"TypeError: "+b+" is not a function";}if(0<=ra(Fa.ve,b))return e=Ea(c),e.unshift(this.B()),Fa[b].apply(a,e)}if(a instanceof v||a instanceof ua){if(a.has(b)){d=a.get(b);if(d instanceof v)return e=Ea(c),e.unshift(this.B()),d.m.apply(d,e);throw"TypeError: "+b+" is not a function";}if("toString"==b)return a instanceof v?a.getName():a.toString();if("hasOwnProperty"==b)return a.has.apply(a,Ea(c))}throw"TypeError: Object has no '"+
b+"' property.";};x.assign=function(a,b){a=this.evaluate(a);if("string"!=typeof a)throw"Invalid key name given for assignment.";var c=this.B();if(!c.has(a))throw"Attempting to assign to undefined value "+b;var d=this.evaluate(b);c.set(a,d);return d};x["break"]=function(){return Ha};x["case"]=function(a){for(var b=this.evaluate(a),c=0;c<b.length;c++){var d=this.evaluate(b[c]);if(d instanceof ha)return d}};x["continue"]=function(){return Ia};
x.nd=function(a,b,c){var d=new g;b=this.evaluate(b);for(var e=0;e<b.length;e++)d.push(b[e]);var f=[x.fc.FN,a,d].concat(Array.prototype.splice.call(arguments,2,arguments.length-2));this.B().set(a,this.evaluate(f))};x.qd=function(a,b){return this.evaluate(a)/this.evaluate(b)};x.td=function(a,b){return this.evaluate(a)==this.evaluate(b)};x.ud=function(a){for(var b,c=0;c<arguments.length;c++)b=this.evaluate(arguments[c]);return b};
x.xd=function(a,b,c){a=this.evaluate(a);b=this.evaluate(b);c=this.evaluate(c);var d=this.B();if("string"==typeof b)for(var e=0;e<b.length;e++){d.set(a,e);var f=this.xa(c);if(f instanceof ha){if("break"==f.w)break;if("return"==f.w)return f}}else if(b instanceof ua||b instanceof g||b instanceof v){var h=b.R(),k=h.length();for(e=0;e<k;e++)if(d.set(a,h.get(e)),f=this.xa(c),f instanceof ha){if("break"==f.w)break;if("return"==f.w)return f}}};x.get=function(a){return this.B().get(this.evaluate(a))};
x.cc=function(a,b){var c;a=this.evaluate(a);b=this.evaluate(b);if(void 0===a||null===a)throw"TypeError: cannot access property of "+a+".";a instanceof ua||a instanceof g||a instanceof v?c=a.get(b):"string"==typeof a&&("length"==b?c=a.length:ka(b)&&(c=a[b]));return c};x.Ad=function(a,b){return this.evaluate(a)>this.evaluate(b)};x.Bd=function(a,b){return this.evaluate(a)>=this.evaluate(b)};x.Fd=function(a,b){return this.evaluate(a)===this.evaluate(b)};x.Gd=function(a,b){return this.evaluate(a)!==this.evaluate(b)};
x["if"]=function(a,b,c){var d=[];this.evaluate(a)?d=this.evaluate(b):c&&(d=this.evaluate(c));var e=this.xa(d);if(e instanceof ha)return e};x.Od=function(a,b){return this.evaluate(a)<this.evaluate(b)};x.Pd=function(a,b){return this.evaluate(a)<=this.evaluate(b)};x.Rd=function(a,b){return this.evaluate(a)%this.evaluate(b)};x.multiply=function(a,b){return this.evaluate(a)*this.evaluate(b)};x.Sd=function(a){return-this.evaluate(a)};x.Td=function(a){return!this.evaluate(a)};
x.Ud=function(a,b){return this.evaluate(a)!=this.evaluate(b)};x["null"]=function(){return null};x.or=function(a,b){return this.evaluate(a)||this.evaluate(b)};x.uc=function(a,b){var c=this.evaluate(a);this.evaluate(b);return c};x.vc=function(a){return this.evaluate(a)};x.quote=function(a){return Array.prototype.slice.apply(arguments)};x["return"]=function(a){return new ha("return",this.evaluate(a))};
x.setProperty=function(a,b,c){a=this.evaluate(a);b=this.evaluate(b);c=this.evaluate(c);if(null===a||void 0===a)throw"TypeError: Can't set property "+b+" of "+a+".";(a instanceof v||a instanceof g||a instanceof ua)&&a.set(b,c);return c};x.ue=function(a,b){return this.evaluate(a)-this.evaluate(b)};
x["switch"]=function(a,b,c){a=this.evaluate(a);b=this.evaluate(b);c=this.evaluate(c);if(!qa(b)||!qa(c))throw"Error: Malformed switch instruction.";for(var d,e=!1,f=0;f<b.length;f++)if(e||a===this.evaluate(b[f]))if(d=this.evaluate(c[f]),d instanceof ha){var h=d.w;if("break"==h)return;if("return"==h||"continue"==h)return d}else e=!0;if(c.length==b.length+1&&(d=this.evaluate(c[c.length-1]),d instanceof ha&&("return"==d.w||"continue"==d.w)))return d};
x.we=function(a,b,c){return this.evaluate(a)?this.evaluate(b):this.evaluate(c)};x["typeof"]=function(a){a=this.evaluate(a);return a instanceof v?"function":typeof a};x.undefined=function(){};x["var"]=function(a){for(var b=this.B(),c=0;c<arguments.length;c++){var d=arguments[c];"string"!=typeof d||b.add(d,void 0)}};
x["while"]=function(a,b,c,d){var e,f=this.evaluate(d);if(this.evaluate(c)&&(e=this.xa(f),e instanceof ha)){if("break"==e.w)return;if("return"==e.w)return e}for(;this.evaluate(a);){e=this.xa(f);if(e instanceof ha){if("break"==e.w)break;if("return"==e.w)return e}this.evaluate(b)}};var Ka=function(){this.ec=!1;this.W=new w;Ja(this);this.ec=!0};Ka.prototype.Ld=function(){return this.ec};Ka.prototype.isInitialized=Ka.prototype.Ld;Ka.prototype.O=function(a){return this.W.wb(a)};Ka.prototype.execute=Ka.prototype.O;Ka.prototype.J=function(){this.W.J()};Ka.prototype.makeImmutable=Ka.prototype.J;
var Ja=function(a){function b(a,b){e.W.Tb(a,String(b))}function c(a,b){e.W.T(String(d[a]),b)}var d=x.fc,e=a;b("control",d.CONTROL);b("fn",d.FN);b("list",d.CREATE_ARRAY);b("map",d.CREATE_OBJECT);b("undefined",d.UNDEFINED);c("ADD",x.add);c("AND",x.and);c("APPLY",x.apply);c("ASSIGN",x.assign);c("BREAK",x["break"]);c("CASE",x["case"]);c("CONTINUE",x["continue"]);c("DEFAULT",x["case"]);c("DEFN",x.nd);c("DIVIDE",x.qd);c("EQUALS",x.td);c("EXPRESSION_LIST",x.ud);c("FOR_IN",x.xd);c("GET",x.get);c("GET_INDEX",
x.cc);c("GET_PROPERTY",x.cc);c("GREATER_THAN",x.Ad);c("GREATER_THAN_EQUALS",x.Bd);c("IDENTITY_EQUALS",x.Fd);c("IDENTITY_NOT_EQUALS",x.Gd);c("IF",x["if"]);c("LESS_THAN",x.Od);c("LESS_THAN_EQUALS",x.Pd);c("MODULUS",x.Rd);c("MULTIPLY",x.multiply);c("NEGATE",x.Sd);c("NOT",x.Td);c("NOT_EQUALS",x.Ud);c("NULL",x["null"]);c("OR",x.or);c("POST_DECREMENT",x.uc);c("POST_INCREMENT",x.uc);c("PRE_DECREMENT",x.vc);c("PRE_INCREMENT",x.vc);c("QUOTE",x.quote);c("RETURN",x["return"]);c("SET_PROPERTY",x.setProperty);
c("SUBTRACT",x.ue);c("SWITCH",x["switch"]);c("TERNARY",x.we);c("TYPEOF",x["typeof"]);c("VAR",x["var"]);c("WHILE",x["while"])};Ka.prototype.T=function(a,b){this.W.T(a,b)};Ka.prototype.addInstruction=Ka.prototype.T;Ka.prototype.I=function(){return this.W.I()};Ka.prototype.getQuota=Ka.prototype.I;Ka.prototype.Va=function(){this.W.Va()};Ka.prototype.resetQuota=Ka.prototype.Va;var La=function(){this.Ra={}};La.prototype.get=function(a){return this.Ra.hasOwnProperty(a)?this.Ra[a]:void 0};La.prototype.add=function(a,b){if(this.Ra.hasOwnProperty(a))throw"Attempting to add a function which already exists: "+a+".";var c=new v(a,function(){for(var a=Array.prototype.slice.call(arguments,0),c=0;c<a.length;c++)a[c]=this.evaluate(a[c]);return b.apply(this,a)});c.J();this.Ra[a]=c};La.prototype.addAll=function(a){for(var b in a)a.hasOwnProperty(b)&&this.add(b,a[b])};var y=window,A=document,Ma=navigator,Na=function(a,b){var c=y[a];y[a]=void 0===c?b:c;return y[a]},Oa=function(a,b){b&&(a.addEventListener?a.onload=b:a.onreadystatechange=function(){a.readyState in{loaded:1,complete:1}&&(a.onreadystatechange=null,b())})},B=function(a,b,c){var d=A.createElement("script");d.type="text/javascript";d.async=!0;d.src=a;Oa(d,b);c&&(d.onerror=c);ea()&&d.setAttribute("nonce",ea());var e=A.getElementsByTagName("script")[0]||A.body||A.head;e.parentNode.insertBefore(d,e);return d},
Pa=function(a,b){var c=A.createElement("iframe");c.height="0";c.width="0";c.style.display="none";c.style.visibility="hidden";var d=A.body&&A.body.lastChild||A.body||A.head;d.parentNode.insertBefore(c,d);Oa(c,b);void 0!==a&&(c.src=a);return c},Qa=function(a,b,c){var d=new Image(1,1);d.onload=function(){d.onload=null;b&&b()};d.onerror=function(){d.onerror=null;c&&c()};d.src=a},Ra=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,!!d):a.attachEvent&&a.attachEvent("on"+b,c)},Sa=function(a,b,
c){a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent&&a.detachEvent("on"+b,c)},D=function(a){y.setTimeout(a,0)},Ua=function(a){var b=A.getElementById(a);if(b&&Ta(b,"id")!=a)for(var c=1;c<document.all[a].length;c++)if(Ta(document.all[a][c],"id")==a)return document.all[a][c];return b},Ta=function(a,b){return a&&b&&a.attributes&&a.attributes[b]?a.attributes[b].value:null},Wa=function(a){var b=a.innerText||a.textContent||"";b&&" "!=b&&(b=b.replace(/^[\s\xa0]+|[\s\xa0]+$/g,""));b&&(b=b.replace(/(\xa0+|\s{2,}|\n|\r\t)/g,
" "));return b},Xa=function(a){var b=A.createElement("div");b.innerHTML="A<div>"+a+"</div>";b=b.lastChild;for(var c=[];b.firstChild;)c.push(b.removeChild(b.firstChild));return c},Ya=function(a){Ma.sendBeacon&&Ma.sendBeacon(a)||Qa(a)};var Za=function(a,b){for(var c=a.split("&"),d=0;d<c.length;d++){var e=c[d].split("=");if(decodeURIComponent(e[0]).replace(/\+/g," ")==b)return decodeURIComponent(e.slice(1).join("=")).replace(/\+/g," ")}},G=function(a,b,c,d,e){var f,h=function(a){return a?a.replace(":","").toLowerCase():""},k=h(a.protocol)||h(y.location.protocol);b&&(b=String(b).toLowerCase());switch(b){case "protocol":f=k;break;case "host":f=(a.hostname||y.location.hostname).split(":")[0].toLowerCase();if(c){var l=/^www\d*\./.exec(f);
l&&l[0]&&(f=f.substr(l[0].length))}break;case "port":f=String(1*(a.hostname?a.port:y.location.port)||("http"==k?80:"https"==k?443:""));break;case "path":f="/"==a.pathname.substr(0,1)?a.pathname:"/"+a.pathname;var m=f.split("/");0<=ra(d||[],m[m.length-1])&&(m[m.length-1]="");f=m.join("/");break;case "query":f=a.search.replace("?","");e&&(f=Za(f,e));break;case "extension":var n=a.pathname.split(".");f=1<n.length?n[n.length-1]:"";f=f.split("/")[0];break;case "fragment":f=a.hash.replace("#","");break;
default:f=a&&a.href}return f},$a=function(a){var b="";a&&a.href&&(b=a.hash?a.href.replace(a.hash,""):a.href);return b},N=function(a){var b=A.createElement("a");a&&(b.href=a);return b};var cb=function(){this.sc=new Ka;var a=new La;a.addAll(ab());bb(this,function(b){return a.get(b)})},ab=function(){return{callInWindow:db,encodeURI:encodeURI,encodeURIComponent:encodeURIComponent,getCurrentUrl:eb,getInWindow:fb,getReferrer:gb,getUrlComponent:hb,getUrlFragment:ib,isPlainObject:jb,loadIframe:kb,loadJavaScript:lb,removeUrlFragment:nb,replaceAll:ob,sendTrackingBeacon:pb,setInWindow:qb}};cb.prototype.O=function(a){return this.sc.O(a)};cb.prototype.execute=cb.prototype.O;
var bb=function(a,b){a.sc.T("require",b)};function db(a,b){for(var c=a.split("."),d=y,e=d[c[0]],f=1;e&&f<c.length;f++)d=e,e=e[c[f]];if("function"==wa(e)){var h=[];for(f=1;f<arguments.length;f++)h.push(Aa(arguments[f]));e.apply(d,h)}}function eb(){return y.location.href}function fb(a,b,c){for(var d=a.split("."),e=y,f=0;f<d.length-1;f++)if(e=e[d[f]],void 0===e||null===e)return;b&&(void 0===e[d[f]]||c&&!e[d[f]])&&(e[d[f]]=Aa(b));return Ba(e[d[f]])}function gb(){return A.referrer}
function hb(a,b,c,d,e){var f;if(d&&d instanceof g){f=[];for(var h=0;h<d.length();h++){var k=d.get(h);"string"==typeof k&&f.push(k)}}return G(N(a),b,c,f,e)}function ib(a){return G(N(a),"fragment")}function jb(a){return a instanceof ua}function kb(a,b){var c=this.B();Pa(a,function(){b instanceof v&&b.m(c)})}var rb={};
function lb(a,b,c,d){var e=this.B(),f=function(){b instanceof v&&b.m(e)},h=function(){c instanceof v&&c.m(e)};d?rb[d]?(rb[d].onSuccess.push(f),rb[d].onFailure.push(h)):(rb[d]={onSuccess:[f],onFailure:[h]},f=function(){for(var a=rb[d].onSuccess,b=0;b<a.length;b++)D(a[b]);a.push=function(a){D(a);return 0}},h=function(){for(var a=rb[d].onFailure,b=0;b<a.length;b++)D(a[b]);rb[d]=null},B(a,f,h)):B(a,f,h)}function nb(a){return $a(N(a))}function ob(a,b,c){return a.replace(new RegExp(b,"g"),c)}
function pb(a,b,c){var d=this.B();Qa(a,function(){b instanceof v&&b.m(d)},function(){c instanceof v&&c.m(d)})}function qb(a,b,c){for(var d=a.split("."),e=y,f=0;f<d.length-1;f++)if(e=e[d[f]],void 0===e)return!1;return void 0===e[d[f]]||c?(e[d[f]]=Aa(b),!0):!1};
var sb=[],tb={"\x00":"&#0;",'"':"&quot;","&":"&amp;","'":"&#39;","<":"&lt;",">":"&gt;","\t":"&#9;","\n":"&#10;","\x0B":"&#11;","\f":"&#12;","\r":"&#13;"," ":"&#32;","-":"&#45;","/":"&#47;","=":"&#61;","`":"&#96;","\u0085":"&#133;","\u00a0":"&#160;","\u2028":"&#8232;","\u2029":"&#8233;"},ub=function(a){return tb[a]},vb=/[\x00\x22\x26\x27\x3c\x3e]/g;var zb=/[\x00\x08-\x0d\x22\x26\x27\/\x3c-\x3e\\\x85\u2028\u2029]/g,Ab={"\x00":"\\x00","\b":"\\x08","\t":"\\t","\n":"\\n","\x0B":"\\x0b",
"\f":"\\f","\r":"\\r",'"':"\\x22","&":"\\x26","'":"\\x27","/":"\\/","<":"\\x3c","=":"\\x3d",">":"\\x3e","\\":"\\\\","\u0085":"\\x85","\u2028":"\\u2028","\u2029":"\\u2029",$:"\\x24","(":"\\x28",")":"\\x29","*":"\\x2a","+":"\\x2b",",":"\\x2c","-":"\\x2d",".":"\\x2e",":":"\\x3a","?":"\\x3f","[":"\\x5b","]":"\\x5d","^":"\\x5e","{":"\\x7b","|":"\\x7c","}":"\\x7d"},Bb=function(a){return Ab[a]};
sb[8]=function(a){if(null==a)return" null ";switch(typeof a){case "boolean":case "number":return" "+a+" ";default:return"'"+String(String(a)).replace(zb,Bb)+"'"}};var Kb=/[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g,Lb={"\x00":"%00","\u0001":"%01","\u0002":"%02","\u0003":"%03","\u0004":"%04","\u0005":"%05","\u0006":"%06","\u0007":"%07","\b":"%08","\t":"%09","\n":"%0A","\x0B":"%0B","\f":"%0C","\r":"%0D","\u000e":"%0E","\u000f":"%0F","\u0010":"%10",
"\u0011":"%11","\u0012":"%12","\u0013":"%13","\u0014":"%14","\u0015":"%15","\u0016":"%16","\u0017":"%17","\u0018":"%18","\u0019":"%19","\u001a":"%1A","\u001b":"%1B","\u001c":"%1C","\u001d":"%1D","\u001e":"%1E","\u001f":"%1F"," ":"%20",'"':"%22","'":"%27","(":"%28",")":"%29","<":"%3C",">":"%3E","\\":"%5C","{":"%7B","}":"%7D","\u007f":"%7F","\u0085":"%C2%85","\u00a0":"%C2%A0","\u2028":"%E2%80%A8","\u2029":"%E2%80%A9","\uff01":"%EF%BC%81","\uff03":"%EF%BC%83","\uff04":"%EF%BC%84","\uff06":"%EF%BC%86",
"\uff07":"%EF%BC%87","\uff08":"%EF%BC%88","\uff09":"%EF%BC%89","\uff0a":"%EF%BC%8A","\uff0b":"%EF%BC%8B","\uff0c":"%EF%BC%8C","\uff0f":"%EF%BC%8F","\uff1a":"%EF%BC%9A","\uff1b":"%EF%BC%9B","\uff1d":"%EF%BC%9D","\uff1f":"%EF%BC%9F","\uff20":"%EF%BC%A0","\uff3b":"%EF%BC%BB","\uff3d":"%EF%BC%BD"},Mb=function(a){return Lb[a]};sb[16]=function(a){return a};var Ob,Pb=[],Qb=[],Rb=[],Sb=[],Tb=[],Ub={},Vb,Wb,Xb,Yb=function(a){var b=a["function"];if(!b)throw"Error: No function name given for function call.";var c=!!Ub[b],d={},e;for(e in a)a.hasOwnProperty(e)&&0===e.indexOf("vtp_")&&(d[c?e:e.substr(4)]=a[e]);return c?Ub[b](d):Ob(b,d)},cc=function(a,b,c){c=c||[];var d={},e;for(e in a)a.hasOwnProperty(e)&&(d[e]=bc(a[e],b,c));return d},bc=function(a,b,c){if(qa(a)){var d;switch(a[0]){case "function_id":return a[1];case "list":d=[];for(var e=1;e<a.length;e++)d.push(bc(a[e],
b,c));return d;case "macro":var f=a[1];if(c[f])return;var h=Pb[f];if(!h||b(h))return;c[f]=!0;try{var k=cc(h,b,c);d=Yb(k);Xb&&(d=Xb.hd(d,k))}catch(t){d=!1}c[f]=!1;return d;case "map":d={};for(var l=1;l<a.length;l+=2)d[bc(a[l],b,c)]=bc(a[l+1],b,c);return d;case "template":d=[];for(var m=!1,n=1;n<a.length;n++){var p=bc(a[n],b,c);Wb&&(m=m||p===Wb.Ia);d.push(p)}return Wb&&m?Wb.jd(d):d.join("");case "escape":d=bc(a[1],b,c);if(Wb&&qa(a[1])&&"macro"===a[1][0]&&Wb.Md(a))return Wb.ae(d);d=String(d);for(var q=
2;q<a.length;q++)sb[a[q]]&&(d=sb[a[q]](d));return d;case "tag":var r=a[1];if(!Sb[r])throw Error("Unable to resolve tag reference "+r+".");return d={Zb:a[2],index:r};case "zb":var u=dc({"function":a[1],arg0:a[2],arg1:a[3],ignore_case:a[5]},b,c);a[4]&&(u=!u);return u;default:throw Error("Attempting to expand unknown Value type: "+a[0]+".");}}return a},dc=function(a,b,c){try{return Vb(cc(a,b,c))}catch(d){JSON.stringify(a)}return null};var ec=null,hc=function(a){function b(a){for(var b=0;b<a.length;b++)d[a[b]]=!0}var c=[],d=[];ec=fc(a);for(var e=0;e<Qb.length;e++){var f=Qb[e],h=gc(f);if(h){for(var k=f.add||[],l=0;l<k.length;l++)c[k[l]]=!0;b(f.block||[])}else null===h&&b(f.block||[])}var m=[];for(e=0;e<Sb.length;e++)c[e]&&!d[e]&&(m[e]=!0);return m},gc=function(a){for(var b=a["if"]||[],c=0;c<b.length;c++){var d=ec(b[c]);if(!d)return null===d?null:!1}var e=a.unless||[];for(c=0;c<e.length;c++){d=ec(e[c]);if(null===d)return null;if(d)return!1}return!0};
var fc=function(a){var b=[];return function(c){void 0===b[c]&&(b[c]=dc(Rb[c],a));return b[c]}};/*
 Copyright (c) 2014 Derek Brans, MIT license https://github.com/krux/postscribe/blob/master/LICENSE. Portions derived from simplehtmlparser, which is licensed under the Apache License, Version 2.0 */

var ic,jc=function(){};(function(){function a(a,h){a=a||"";h=h||{};for(var k in b)b.hasOwnProperty(k)&&(h.Rc&&(h["fix_"+k]=!0),h.$b=h.$b||h["fix_"+k]);var l={comment:/^\x3c!--/,endTag:/^<\//,atomicTag:/^<\s*(script|style|noscript|iframe|textarea)[\s\/>]/i,startTag:/^</,chars:/^[^<]/},p={comment:function(){var b=a.indexOf("--\x3e");if(0<=b)return{content:a.substr(4,b),length:b+3}},endTag:function(){var b=a.match(d);if(b)return{tagName:b[1],length:b[0].length}},atomicTag:function(){var b=p.startTag();
if(b){var c=a.slice(b.length);if(c.match(new RegExp("</\\s*"+b.tagName+"\\s*>","i"))){var d=c.match(new RegExp("([\\s\\S]*?)</\\s*"+b.tagName+"\\s*>","i"));if(d)return{tagName:b.tagName,A:b.A,content:d[1],length:d[0].length+b.length}}}},startTag:function(){var b=a.match(c);if(b){var d={};b[2].replace(e,function(a,b,c,e,h){var k=c||e||h||f.test(b)&&b||null,l=document.createElement("div");l.innerHTML=k;d[b]=l.textContent||l.innerText||k});return{tagName:b[1],A:d,Ga:!!b[3],length:b[0].length}}},chars:function(){var b=
a.indexOf("<");return{length:0<=b?b:a.length}}},q=function(){for(var b in l)if(l[b].test(a)){var c=p[b]();return c?(c.type=c.type||b,c.text=a.substr(0,c.length),a=a.slice(c.length),c):null}};h.$b&&function(){var b=/^(AREA|BASE|BASEFONT|BR|COL|FRAME|HR|IMG|INPUT|ISINDEX|LINK|META|PARAM|EMBED)$/i,c=/^(COLGROUP|DD|DT|LI|OPTIONS|P|TD|TFOOT|TH|THEAD|TR)$/i,d=[];d.jc=function(){return this[this.length-1]};d.ob=function(a){var b=this.jc();return b&&b.tagName&&b.tagName.toUpperCase()===a.toUpperCase()};d.gd=
function(a){for(var b=0,c;c=this[b];b++)if(c.tagName===a)return!0;return!1};var e=function(a){a&&"startTag"===a.type&&(a.Ga=b.test(a.tagName)||a.Ga);return a},f=q,k=function(){a="</"+d.pop().tagName+">"+a},l={startTag:function(b){var e=b.tagName;"TR"===e.toUpperCase()&&d.ob("TABLE")?(a="<TBODY>"+a,m()):h.Me&&c.test(e)&&d.gd(e)?d.ob(e)?k():(a="</"+b.tagName+">"+a,m()):b.Ga||d.push(b)},endTag:function(a){d.jc()?h.vd&&!d.ob(a.tagName)?k():d.pop():h.vd&&(f(),m())}},m=function(){var b=a,c=e(f());a=b;if(c&&
l[c.type])l[c.type](c)};q=function(){m();return e(f())}}();return{append:function(b){a+=b},fe:q,Te:function(a){for(var b;(b=q())&&(!a[b.type]||!1!==a[b.type](b)););},clear:function(){var b=a;a="";return b},Ue:function(){return a},stack:[]}}var b=function(){var a={},b=this.document.createElement("div");b.innerHTML="<P><I></P></I>";a.Ze="<P><I></P></I>"!==b.innerHTML;b.innerHTML="<P><i><P></P></i></P>";a.We=2===b.childNodes.length;return a}(),c=/^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=?\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
d=/^<\/([\-A-Za-z0-9_]+)[^>]*>/,e=/([\-A-Za-z0-9_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,f=/^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noresize|noshade|nowrap|readonly|selected)$/i;a.supports=b;a.$e=function(a){var b={comment:function(a){return"<--"+a.content+"--\x3e"},endTag:function(a){return"</"+a.tagName+">"},atomicTag:function(a){return b.startTag(a)+a.content+b.endTag(a)},startTag:function(a){var b="<"+a.tagName,c;for(c in a.A){var d=a.A[c];
b+=" "+c+'="'+(d?d.replace(/(^|[^\\])"/g,'$1\\"'):"")+'"'}return b+(a.Ga?"/>":">")},chars:function(a){return a.text}};return b[a.type](a)};a.Le=function(a){var b={},c;for(c in a){var d=a[c];b[c]=d&&d.replace(/(^|[^\\])"/g,'$1\\"')}return b};for(var h in b)a.Wc=a.Wc||!b[h]&&h;ic=a})();(function(){function a(){}function b(a){return void 0!==a&&null!==a}function c(a,b,c){var d,e=a&&a.length||0;for(d=0;d<e;d++)b.call(c,a[d],d)}function d(a,b,c){for(var d in a)a.hasOwnProperty(d)&&b.call(c,d,a[d])}function e(a,
b){d(b,function(b,c){a[b]=c});return a}function f(a,c){a=a||{};d(c,function(c,d){b(a[c])||(a[c]=d)});return a}function h(a){try{return m.call(a)}catch(r){var b=[];c(a,function(a){b.push(a)});return b}}var k={Jc:a,Kc:a,Lc:a,Mc:a,Sc:a,Tc:function(a){return a},done:a,error:function(a){throw a;},ke:!1},l=this;if(!l.postscribe){var m=Array.prototype.slice,n=function(){function a(a,c,d){var e="data-ps-"+c;if(2===arguments.length){var f=a.getAttribute(e);return b(f)?String(f):f}b(d)&&""!==d?a.setAttribute(e,
d):a.removeAttribute(e)}function f(b,c){var d=b.ownerDocument;e(this,{root:b,options:c,Ha:d.defaultView||d.parentWindow,ha:d,Ua:ic("",{Rc:!0}),eb:[b],ub:"",vb:d.createElement(b.nodeName),Ea:[],da:[]});a(this.vb,"proxyof",0)}f.prototype.write=function(){[].push.apply(this.da,arguments);for(var a;!this.Pa&&this.da.length;)a=this.da.shift(),"function"===typeof a?this.$c(a):this.Fb(a)};f.prototype.$c=function(a){var b={type:"function",value:a.name||a.toString()};this.rb(b);a.call(this.Ha,this.ha);this.nc(b)};
f.prototype.Fb=function(a){this.Ua.append(a);for(var b,c=[],d,e;(b=this.Ua.fe())&&!(d=b&&"tagName"in b?!!~b.tagName.toLowerCase().indexOf("script"):!1)&&!(e=b&&"tagName"in b?!!~b.tagName.toLowerCase().indexOf("style"):!1);)c.push(b);this.Be(c);d&&this.Cd(b);e&&this.Dd(b)};f.prototype.Be=function(a){var b=this.Xc(a);b.Sb&&(b.kb=this.ub+b.Sb,this.ub+=b.ee,this.vb.innerHTML=b.kb,this.ze())};f.prototype.Xc=function(a){var b=this.eb.length,d=[],e=[],f=[];c(a,function(a){d.push(a.text);if(a.A){if(!/^noscript$/i.test(a.tagName)){var c=
b++;e.push(a.text.replace(/(\/?>)/," data-ps-id="+c+" $1"));"ps-script"!==a.A.id&&"ps-style"!==a.A.id&&f.push("atomicTag"===a.type?"":"<"+a.tagName+" data-ps-proxyof="+c+(a.Ga?" />":">"))}}else e.push(a.text),f.push("endTag"===a.type?a.text:"")});return{af:a,raw:d.join(""),Sb:e.join(""),ee:f.join("")}};f.prototype.ze=function(){for(var c,d=[this.vb];b(c=d.shift());){var e=1===c.nodeType;if(!e||!a(c,"proxyof")){e&&(this.eb[a(c,"id")]=c,a(c,"id",null));var f=c.parentNode&&a(c.parentNode,"proxyof");
f&&this.eb[f].appendChild(c)}d.unshift.apply(d,h(c.childNodes))}};f.prototype.Cd=function(a){var b=this.Ua.clear();b&&this.da.unshift(b);a.src=a.A.src||a.A.Ee;a.src&&this.Ea.length?this.Pa=a:this.rb(a);var c=this;this.Ae(a,function(){c.nc(a)})};f.prototype.Dd=function(a){var b=this.Ua.clear();b&&this.da.unshift(b);a.type=a.A.type||a.A.Fe||"text/css";this.Ce(a);b&&this.write()};f.prototype.Ce=function(a){var b=this.Zc(a);this.Kd(b);a.content&&(b.styleSheet&&!b.sheet?b.styleSheet.cssText=a.content:
b.appendChild(this.ha.createTextNode(a.content)))};f.prototype.Zc=function(a){var b=this.ha.createElement(a.tagName);b.setAttribute("type",a.type);d(a.A,function(a,c){b.setAttribute(a,c)});return b};f.prototype.Kd=function(a){this.Fb('<span id="ps-style"/>');var b=this.ha.getElementById("ps-style");b.parentNode.replaceChild(a,b)};f.prototype.rb=function(a){a.Yd=this.da;this.da=[];this.Ea.unshift(a)};f.prototype.nc=function(a){a!==this.Ea[0]?this.options.error({message:"Bad script nesting or script finished twice"}):
(this.Ea.shift(),this.write.apply(this,a.Yd),!this.Ea.length&&this.Pa&&(this.rb(this.Pa),this.Pa=null))};f.prototype.Ae=function(a,b){var c=this.Yc(a),d=this.se(c),e=this.options.Jc;a.src&&(c.src=a.src,this.pe(c,d?e:function(){b();e()}));try{this.Jd(c),a.src&&!d||b()}catch(H){this.options.error(H),b()}};f.prototype.Yc=function(a){var b=this.ha.createElement(a.tagName);d(a.A,function(a,c){b.setAttribute(a,c)});a.content&&(b.text=a.content);return b};f.prototype.Jd=function(a){this.Fb('<span id="ps-script"/>');
var b=this.ha.getElementById("ps-script");b.parentNode.replaceChild(a,b)};f.prototype.pe=function(a,b){function c(){a=a.onload=a.onreadystatechange=a.onerror=null}var d=this.options.error;e(a,{onload:function(){c();b()},onreadystatechange:function(){/^(loaded|complete)$/.test(a.readyState)&&(c(),b())},onerror:function(){var e={message:"remote script failed "+a.src};c();d(e);b()}})};f.prototype.se=function(a){return!/^script$/i.test(a.nodeName)||!!(this.options.ke&&a.src&&a.hasAttribute("async"))};
return f}();l.postscribe=function(){function b(){var a=m.shift(),b;a&&(b=a[a.length-1],b.Kc(),a.stream=c.apply(null,a),b.Lc())}function c(c,f,k){function l(a){a=k.Tc(a);t.write(a);k.Mc(a)}t=new n(c,k);t.id=d++;t.name=k.name||t.id;var m=c.ownerDocument,p={close:m.close,open:m.open,write:m.write,writeln:m.writeln};e(m,{close:a,open:a,write:function(){return l(h(arguments).join(""))},writeln:function(){return l(h(arguments).join("")+"\n")}});var q=t.Ha.onerror||a;t.Ha.onerror=function(a,b,c){k.error({Qe:a+
" - "+b+":"+c});q.apply(t.Ha,arguments)};t.write(f,function(){e(m,p);t.Ha.onerror=q;k.done();t=null;b()});return t}var d=0,m=[],t=null;return e(function(c,d,e){"function"===typeof e&&(e={done:e});e=f(e,k);c=/^#/.test(c)?l.document.getElementById(c.substr(1)):c.Oe?c[0]:c;var h=[c,d,e];c.$d={cancel:function(){h.stream?h.stream.abort():h[1]=a}};e.Sc(h);m.push(h);t||b();return c.$d},{streams:{},Se:m,Ge:n})}();jc=l.postscribe}})();var kc={},lc=null;kc.o="GTM-WZBKCP";var mc=null,nc="//www.googletagmanager.com/a?id="+kc.o+"&cv=17",oc={},pc={},qc=A.currentScript?A.currentScript.src:void 0;var rc=function(){},sc=function(a){return"function"==typeof a},tc=function(a){return"string"==wa(a)},uc=function(a){return"number"==wa(a)&&!isNaN(a)},vc=function(a){return Math.round(Number(a))||0},wc=function(a){return"false"==String(a).toLowerCase()?!1:!!a},xc=function(a){var b=[];if(qa(a))for(var c=0;c<a.length;c++)b.push(String(a[c]));return b},yc=function(a){return a?a.replace(/^\s+|\s+$/g,""):""},zc=function(a,b){if(!uc(a)||!uc(b)||a>b)a=0,b=2147483647;return Math.floor(Math.random()*(b-a+1)+
a)},Ac=function(){this.prefix="gtm.";this.values={}};Ac.prototype.set=function(a,b){this.values[this.prefix+a]=b};Ac.prototype.get=function(a){return this.values[this.prefix+a]};Ac.prototype.contains=function(a){return void 0!==this.get(a)};var Bc=function(){var a=lc.sequence||0;lc.sequence=a+1;return a},Cc=function(a,b,c){return a&&a.hasOwnProperty(b)?a[b]:c},Dc=function(a){var b=!1;return function(){if(!b)try{a()}catch(c){}b=!0}};var O=function(){var a=function(a){return{toString:function(){return a}}};return{Ib:a("convert_case_to"),Jb:a("convert_false_to"),Kb:a("convert_null_to"),Lb:a("convert_true_to"),Mb:a("convert_undefined_to"),L:a("function"),Ac:a("instance_name"),Bc:a("live_only"),Cc:a("malware_disabled"),Dc:a("once_per_event"),Ob:a("once_per_load"),Pb:a("setup_tags"),Ec:a("tag_id"),Qb:a("teardown_tags")}}();var Ec=new Ac,Fc={},Ic={set:function(a,b){za(Gc(a,b),Fc)},get:function(a){return Hc(a,2)},reset:function(){Ec=new Ac;Fc={}}},Hc=function(a,b){return 2!=b?Ec.get(a):Jc(a)},Jc=function(a,b,c){var d=a.split(".");return Lc(d)},Lc=function(a){for(var b=Fc,c=0;c<a.length;c++){if(null===
b)return!1;if(void 0===b)break;b=b[a[c]]}return b};
var Nc=function(a,b){Ec.set(a,b);za(Gc(a,b),Fc)},Gc=function(a,b){for(var c={},d=c,e=a.split("."),f=0;f<e.length-1;f++)d=d[e[f]]={};d[e[e.length-1]]=b;return c};var Oc=new RegExp(/^(.*\.)?(google|youtube|blogger|withgoogle)(\.com?)?(\.[a-z]{2})?\.?$/),Pc={customPixels:["nonGooglePixels"],html:["customScripts","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],customScripts:["html","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],nonGooglePixels:[],nonGoogleScripts:["nonGooglePixels"],nonGoogleIframes:["nonGooglePixels"]},Qc={customPixels:["customScripts","html"],html:["customScripts"],customScripts:["html"],nonGooglePixels:["customPixels",
"customScripts","html","nonGoogleScripts","nonGoogleIframes"],nonGoogleScripts:["customScripts","html"],nonGoogleIframes:["customScripts","html","nonGoogleScripts"]},Rc=function(a,b){for(var c=[],d=0;d<a.length;d++)c.push(a[d]),c.push.apply(c,b[a[d]]||[]);return c};
var Sc=function(a){var b=Hc("gtm.whitelist");var c=b&&Rc(xc(b),Pc),d=Hc("gtm.blacklist")||Hc("tagTypeBlacklist")||[];
Oc.test(y.location&&y.location.hostname)&&(d=xc(d),d.push("nonGooglePixels","nonGoogleScripts"));var e=d&&Rc(xc(d),Qc),f={};return function(h){var k=h&&h[O.L];if(!k||"string"!=typeof k)return!0;k=k.replace(/^_*/,"");if(void 0!==f[k])return f[k];var l=pc[k]||[],m=a(k);if(b){var n;if(n=m)a:{if(0>ra(c,k))if(l&&0<l.length)for(var p=0;p<l.length;p++){if(0>ra(c,l[p])){n=!1;break a}}else{n=!1;break a}n=!0}m=n}var q=!1;if(d){var r;if(!(r=0<=
ra(e,k)))a:{for(var u=l||[],t=new Ac,z=0;z<e.length;z++)t.set(e[z],!0);for(z=0;z<u.length;z++)if(t.get(u[z])){r=!0;break a}r=!1}q=r}return f[k]=!m||q}};var Vc={hd:function(a,b){b[O.Ib]&&"string"===typeof a&&(a=1==b[O.Ib]?a.toLowerCase():a.toUpperCase());b.hasOwnProperty(O.Kb)&&null===a&&(a=b[O.Kb]);b.hasOwnProperty(O.Mb)&&void 0===a&&(a=b[O.Mb]);b.hasOwnProperty(O.Lb)&&!0===a&&(a=b[O.Lb]);b.hasOwnProperty(O.Jb)&&!1===a&&(a=b[O.Jb]);return a}};var Wc=function(a){var b=lc.zones;!b&&a&&(b=lc.zones=a());return b},Xc={active:!0,isWhitelisted:function(){return!0}};var Yc=!1,Zc=0,$c=[];function ad(a){if(!Yc){var b=A.createEventObject,c="complete"==A.readyState,d="interactive"==A.readyState;if(!a||"readystatechange"!=a.type||c||!b&&d){Yc=!0;for(var e=0;e<$c.length;e++)D($c[e])}$c.push=function(){for(var a=0;a<arguments.length;a++)D(arguments[a]);return 0}}}function bd(){if(!Yc&&140>Zc){Zc++;try{A.documentElement.doScroll("left"),ad()}catch(a){y.setTimeout(bd,50)}}}var cd=function(a){Yc?a():$c.push(a)};var dd=!1,ed=function(){return y.GoogleAnalyticsObject&&y[y.GoogleAnalyticsObject]};var fd=function(a){y.GoogleAnalyticsObject||(y.GoogleAnalyticsObject=a||"ga");var b=y.GoogleAnalyticsObject;if(!y[b]){var c=function(){c.q=c.q||[];c.q.push(arguments)};c.l=Number(new Date);y[b]=c}return y[b]},gd=function(a,b,c,d){b=String(b).replace(/\s+/g,"").split(",");var e=ed();e(a+"require","linker");e(a+"linker:autoLink",b,c,d)};
var kd=function(){return"&tc="+Sb.filter(function(a){return a}).length},ld="0.005000">Math.random(),md=function(){var a=0,b=0;return{Nd:function(){if(2>a)return!1;1E3<=(new Date).getTime()-b&&(a=0);return 2<=a},ie:function(){1E3<=(new Date).getTime()-b&&(a=0);a++;b=(new Date).getTime()}}},nd="",od=function(){nd=[nc,"&v=3&t=t","&pid="+zc(),"&rv=86"].join("")},pd={},qd="",rd=void 0,sd={},td={},ud=void 0,vd=null,wd=1E3,xd=function(){var a=rd;return void 0===a?"":[nd,
pd[a]?"":"&es=1",sd[a],kd(),qd,"&z=0"].join("")},yd=function(){ud&&(y.clearTimeout(ud),ud=void 0);void 0===rd||pd[rd]&&!qd||(td[rd]||vd.Nd()||0>=wd--?td[rd]=!0:(vd.ie(),Qa(xd()),pd[rd]=!0,qd=""))},zd=function(a,b,c){if(ld&&!td[a]&&b){a!==rd&&(yd(),rd=a);var d=c+String(b[O.L]||"").replace(/_/g,"");qd=qd?qd+"."+d:"&tr="+d;ud||(ud=y.setTimeout(yd,500));2022<=xd().length&&yd()}};function Ad(a,b,c,d,e,f){var h=Sb[a],k=Bd(a,b,c,d,e,f);if(!k)return null;var l=bc(h[O.Pb],f.Y,[]);if(l&&l.length){var m=l[0];k=Ad(m.index,b,k,1===m.Zb?e:k,e,f)}return k}
function Bd(a,b,c,d,e,f){function h(){var b=cc(k,f.Y);b.vtp_gtmOnSuccess=function(){zd(f.id,Sb[a],"5");c()};b.vtp_gtmOnFailure=function(){zd(f.id,Sb[a],"6");d()};b.vtp_gtmTagId=k.tag_id;if(k[O.Cc])d();else{zd(f.id,k,"1");try{Yb(b)}catch(z){zd(f.id,
k,"7");e()}}}var k=Sb[a];if(f.Y(k))return null;var l=bc(k[O.Qb],f.Y,[]);if(l&&l.length){var m=l[0],n=Ad(m.index,b,c,d,e,f);if(!n)return null;c=n;d=2===m.Zb?e:n}if(k[O.Ob]||k[O.Dc]){var p=k[O.Ob]?Tb:b,q=c,r=d;if(!p[a]){h=Dc(h);var u=Cd(a,p,h);c=u.S;d=u.ka}return function(){p[a](q,r)}}return h}function Cd(a,b,c){var d=[],e=[];b[a]=Dd(d,e,c);return{S:function(){b[a]=Ed;for(var c=0;c<d.length;c++)d[c]()},ka:function(){b[a]=Fd;for(var c=0;c<e.length;c++)e[c]()}}}
function Dd(a,b,c){return function(d,e){a.push(d);b.push(e);c()}}function Ed(a){a()}function Fd(a,b){b()};function Gd(a){var b=0,c=0,d=!1;return{add:function(){c++;return Dc(function(){b++;d&&b>=c&&a()})},Pc:function(){d=!0;b>=c&&a()}}}function Hd(a,b){if(!ld)return;var c=function(a){var d=b.Y(Sb[a])?"3":"4",f=bc(Sb[a][O.Pb],b.Y,[]);f&&f.length&&c(f[0].index);zd(b.id,Sb[a],d);var h=bc(Sb[a][O.Qb],b.Y,[]);h&&h.length&&c(h[0].index)};c(a);}var Id=!1;var Jd=function(a,b){var c={};c[O.L]="__"+a;for(var d in b)b.hasOwnProperty(d)&&(c["vtp_"+d]=b[d]);for(d in void 0)(void 0).hasOwnProperty(d)&&(c[d]=(void 0)[d]);Sb.push(c);return Sb.length-1};var Kd="allow_ad_personalization_signals cookie_domain cookie_expires cookie_name cookie_path custom_params event_callback event_timeout groups send_to send_page_view session_duration user_properties".split(" ");var Ld=/[A-Z]+/,Md=/\s/,Nd=function(a){if(tc(a)&&(a=a.trim(),!Md.test(a))){var b=a.indexOf("-");if(!(0>b)){var c=a.substring(0,b);if(Ld.test(c)){for(var d=a.substring(b+1).split("/"),e=0;e<d.length;e++)if(!d[e])return;return{id:a,prefix:c,containerId:c+"-"+d[0],ia:d}}}}};var Od=null,Pd={},Qd={},Rd;function Sd(){Od=Od||!lc.gtagRegistered;lc.gtagRegistered=!0;return Od}var Td=function(a,b){var c={event:a};b&&(c.eventModel=za(b,void 0),b.event_callback&&(c.eventCallback=b.event_callback),b.event_timeout&&(c.eventTimeout=b.event_timeout));return c};
function Ud(a){if(void 0===Qd[a.id]){var b;if("UA"==a.prefix)b=Jd("gtagua",{trackingId:a.id});else if("AW"==a.prefix)b=Jd("gtagaw",{conversionId:a});else if("DC"==a.prefix)b=Jd("gtagfl",{targetId:a.id});else if("GF"==a.prefix)b=Jd("gtaggf",{conversionId:a});else if("G"==a.prefix)b=Jd("get",{trackingId:a.id,isAutoTag:!0});else return;if(!Rd){var c={name:"send_to",dataLayerVersion:2},d={};d[O.L]="__v";for(var e in c)c.hasOwnProperty(e)&&(d["vtp_"+e]=c[e]);Pb.push(d);Rd=["macro",Pb.length-1]}var f={arg0:Rd,
arg1:a.id,ignore_case:!1};f[O.L]="_lc";Rb.push(f);var h={"if":[Rb.length-1],add:[b]};h["if"]&&(h.add||h.block)&&Qb.push(h);Qd[a.id]=b}}
var Wd={event:function(a){var b=a[1];if(tc(b)&&!(3<a.length)){var c;if(2<a.length){if(!ya(a[2]))return;c=a[2]}var d=Td(b,c);return d}},set:function(a){var b;2==a.length&&ya(a[1])?
b=za(a[1],void 0):3==a.length&&tc(a[1])&&(b={},b[a[1]]=a[2]);if(b)return b.eventModel=za(b,void 0),b.event="gtag.set",b._clear=!0,b},js:function(a){if(2==a.length&&a[1].getTime)return{event:"gtm.js","gtm.start":a[1].getTime()}},config:function(a){}},Vd=Dc(function(){});var Xd=!1,Yd=[];function Zd(){if(!Xd){Xd=!0;for(var a=0;a<Yd.length;a++)D(Yd[a])}};var $d=[],ae=!1,ge=function(a){var b=a.eventCallback,c=Dc(function(){sc(b)&&D(function(){b(kc.o)})}),d=a.eventTimeout;d&&y.setTimeout(c,Number(d));return c},he=function(){for(var a=!1;!ae&&0<$d.length;){ae=!0;delete Fc.eventModel;var b=$d.shift();if(sc(b))try{b.call(Ic)}catch(be){}else if(qa(b)){var c=b;if(tc(c[0])){var d=c[0].split("."),e=d.pop(),f=c.slice(1),h=Hc(d.join("."),2);if(void 0!==h&&null!==h)try{h[e].apply(h,f)}catch(be){}}}else{var k=b;if(k&&("[object Arguments]"==Object.prototype.toString.call(k)||
Object.prototype.hasOwnProperty.call(k,"callee"))){a:{var l=b;if(l.length&&tc(l[0])){var m=Wd[l[0]];if(m){b=m(l);break a}}b=void 0}if(!b){ae=!1;continue}}var n;var p=void 0,q=b,r=q._clear;for(p in q)q.hasOwnProperty(p)&&"_clear"!==p&&(r&&Nc(p,void 0),Nc(p,q[p]));var u=q.event;if(u){var t=q["gtm.uniqueEventId"];t||(t=Bc(),q["gtm.uniqueEventId"]=t,Nc("gtm.uniqueEventId",t));mc=u;var z;var I,H,C=q,P=C.event,E=C["gtm.uniqueEventId"],L=lc.zones;H=L?L.checkState(kc.o,E):Xc;if(H.active){var F=ge(C);c:{var K=
H.isWhitelisted;if("gtm.js"==P){if(Id){I=!1;break c}Id=!0}var M=E,ia=P;if(ld&&!td[M]&&rd!==M){yd();rd=M;qd="";var J=sd,R=M,S,Q=ia;S=0===Q.indexOf("gtm.")?encodeURIComponent(Q):"*";J[R]="&e="+S+"&eid="+M;ud||(ud=y.setTimeout(yd,500))}var T=Sc(K),X={id:E,name:P,ad:F||rc,Y:T,Wa:hc(T)};for(var Tc,Zb=X,ce=Gd(Zb.ad),Qf=[],$b=[],mb=0;mb<Sb.length;mb++)if(Zb.Wa[mb]){var Rf=Sb[mb];var Db=ce.add();try{var de=Ad(mb,Qf,Db,Db,Db,Zb);de?$b.push(de):(Hd(mb,Zb),Db())}catch(be){Db()}}ce.Pc();for(var Uc=0;Uc<$b.length;Uc++)$b[Uc]();Tc=0<$b.length;if("gtm.js"===P||"gtm.sync"===P)d:{}if(Tc){for(var Sf={__cl:!0,__evl:!0,__fsl:!0,__hl:!0,__jel:!0,__lcl:!0,__sdl:!0,__tl:!0,__ytl:!0},ac=0;ac<X.Wa.length;ac++)if(X.Wa[ac]){var fe=Sb[ac];if(fe&&!Sf[fe[O.L]]){I=!0;break c}}I=!1}else I=Tc}z=I?!0:!1}else z=!1;mc=null;n=z}else n=!1;a=n||a}ae=!1}return!a},ie=function(){var a=he();try{var b=y["dataLayer"].hide;if(b&&void 0!==b[kc.o]&&b.end){b[kc.o]=!1;var c=!0,d;for(d in b)if(b.hasOwnProperty(d)&&!0===
b[d]){c=!1;break}c&&(b.end(),b.end=null)}}catch(e){}return a},je=function(){var a=Na("dataLayer",[]),b=Na("google_tag_manager",{});b=b["dataLayer"]=b["dataLayer"]||{};$c.push(function(){b.gtmDom||(b.gtmDom=!0,a.push({event:"gtm.dom"}))});Yd.push(function(){b.gtmLoad||(b.gtmLoad=!0,a.push({event:"gtm.load"}))});var c=a.push;a.push=function(){var b=[].slice.call(arguments,0);c.apply(a,b);for($d.push.apply($d,b);300<this.length;)this.shift();return he()};$d.push.apply($d,a.slice(0));D(ie)};var ke={};ke.Ia=new String("undefined");ke.ab={};var le=function(a){this.resolve=function(b){for(var c=[],d=0;d<a.length;d++)c.push(a[d]===ke.Ia?b:a[d]);return c.join("")}};le.prototype.toString=function(){return this.resolve("undefined")};le.prototype.valueOf=le.prototype.toString;ke.jd=function(a){return new le(a)};var me={};ke.je=function(a,b){var c=Bc();me[c]=[a,b];return c};ke.Vb=function(a){var b=a?0:1;return function(a){var c=me[a];if(c&&"function"===typeof c[b])c[b]();me[a]=void 0}};
ke.Md=function(a){for(var b=!1,c=!1,d=2;d<a.length;d++)b=b||8===a[d],c=c||16===a[d];return b&&c};ke.ae=function(a){if(a===ke.Ia)return a;var b=Bc();ke.ab[b]=a;return'google_tag_manager["'+kc.o+'"].macro('+b+")"};ke.Fc=le;var ne=new Ac,oe=function(a,b){function c(a){var b=N(a),c=G(b,"protocol"),d=G(b,"host",!0),e=G(b,"port"),f=G(b,"path").toLowerCase().replace(/\/$/,"");if(void 0===c||"http"==c&&"80"==e||"https"==c&&"443"==e)c="web",e="default";return[c,d,e,f]}for(var d=c(String(a)),e=c(String(b)),f=0;f<d.length;f++)if(d[f]!==e[f])return!1;return!0};
function pe(a){var b=a.arg0,c=a.arg1;switch(a["function"]){case "_cn":return 0<=String(b).indexOf(String(c));case "_css":var d;a:{if(b){var e=["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"];try{for(var f=0;f<e.length;f++)if(b[e[f]]){d=b[e[f]](c);break a}}catch(u){}}d=!1}return d;case "_ew":var h,k;h=String(b);k=String(c);var l=h.length-k.length;return 0<=l&&h.indexOf(k,l)==l;case "_eq":return String(b)==String(c);case "_ge":return Number(b)>=Number(c);
case "_gt":return Number(b)>Number(c);case "_lc":var m;m=String(b).split(",");return 0<=ra(m,String(c));case "_le":return Number(b)<=Number(c);case "_lt":return Number(b)<Number(c);case "_re":var n;var p=a.ignore_case?"i":void 0;try{var q=String(c)+p,r=ne.get(q);r||(r=new RegExp(c,p),ne.set(q,r));n=r.test(b)}catch(u){n=!1}return n;case "_sw":return 0==String(b).indexOf(String(c));case "_um":return oe(b,c)}return!1};function qe(a,b,c,d){return(d||"https:"==y.location.protocol?a:b)+c}function re(a,b){for(var c=b||(a instanceof g?new g:new ua),d=a.R(),e=0;e<d.length();e++){var f=d.get(e);if(a.has(f)){var h=a.get(f);h instanceof g?(c.get(f)instanceof g||c.set(f,new g),re(h,c.get(f))):h instanceof ua?(c.get(f)instanceof ua||c.set(f,new ua),re(h,c.get(f))):c.set(f,h)}}return c}function se(){return kc.o}function te(){return(new Date).getTime()}function ue(a,b){return Ba(Hc(a,b||2))}function ve(){return mc}
function we(a){return Xa('<a href="'+a+'"></a>')[0].href}function xe(a){return vc(Aa(a))}function ye(a){return null===a?"null":void 0===a?"undefined":a.toString()}function ze(a,b){return zc(a,b)}function Ae(a,b,c){if(!(a instanceof g))return null;for(var d=new ua,e=!1,f=0;f<a.length();f++){var h=a.get(f);h instanceof ua&&h.has(b)&&h.has(c)&&(d.set(h.get(b),h.get(c)),e=!0)}return e?d:null}
var Be=function(){var a=new La;a.addAll(ab());a.addAll({buildSafeUrl:qe,decodeHtmlUrl:we,copy:re,generateUniqueNumber:Bc,getContainerId:se,getCurrentTime:te,getDataLayerValue:ue,getEventName:ve,makeInteger:xe,makeString:ye,randomInteger:ze,tableToMap:Ae});return function(b){return a.get(b)}};var Ce=new cb,De=function(){var a=data.runtime||[];Ob=function(a,b){var c=new ua,d;for(d in b)b.hasOwnProperty(d)&&c.set(d,Ba(b[d]));var e=Ce.O([a,c]);e instanceof ha&&"return"===e.w&&(e=e.getData());return Aa(e)};Vb=pe;bb(Ce,Be());for(var b=0;b<a.length;b++){var c=a[b];if(!qa(c)||3>c.length){if(0==c.length)continue;break}Ce.O(c)}};var Ee=function(a,b){var c=function(){};c.prototype=a.prototype;var d=new c;a.apply(d,Array.prototype.slice.call(arguments,1));return d};var Fe=function(a){return encodeURIComponent(a)},Ge=function(a){var b=["veinteractive.com","ve-interactive.cn"];if(!a)return!1;var c=G(N(a),"host");if(!c)return!1;for(var d=0;b&&d<b.length;d++){var e=b[d]&&b[d].toLowerCase();if(e){var f=c.length-e.length;0<f&&"."!=e.charAt(0)&&(f--,e="."+e);if(0<=f&&c.indexOf(e,f)==f)return!0}}return!1};
var U=function(a,b,c){for(var d={},e=!1,f=0;a&&f<a.length;f++)a[f]&&a[f].hasOwnProperty(b)&&a[f].hasOwnProperty(c)&&(d[a[f][b]]=a[f][c],e=!0);return e?d:null},He=function(a,b){za(a,b)},Ie=function(a){return vc(a)},Je=function(a,b){return ra(a,b)};var Ke=function(a){var b={"gtm.element":a,"gtm.elementClasses":a.className,"gtm.elementId":a["for"]||Ta(a,"id")||"","gtm.elementTarget":a.formTarget||a.target||""};b["gtm.elementUrl"]=(a.attributes&&a.attributes.formaction?a.formAction:"")||a.action||a.href||a.src||a.code||a.codebase||"";return b},Le=function(a){lc.hasOwnProperty("autoEventsSettings")||(lc.autoEventsSettings={});var b=lc.autoEventsSettings;b.hasOwnProperty(a)||(b[a]={});return b[a]},Me=function(a,b,c,d){var e=Le(a),f=Cc(e,b,d);e[b]=
c(f)},Ne=function(a,b,c){var d=Le(a);return Cc(d,b,c)};var Oe=/(^|\.)doubleclick\.net$/i,Pe=/^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,Qe=function(a,b,c){for(var d=String(b||A.cookie).split(";"),e=[],f=0;f<d.length;f++){var h=d[f].split("="),k=yc(h[0]);if(k&&k==a){var l=yc(h.slice(1).join("="));l&&!1!==c&&(l=decodeURIComponent(l));e.push(l)}}return e},Re=function(a,b,c,d,e,f){f&&(b=encodeURIComponent(b));var h=a+"="+b+"; ";c&&(h+="path="+c+"; ");e&&(h+="expires="+e.toGMTString()+"; ");var k,l;if("auto"==d){var m=G(y.location,"host",!0).split(".");if(4==
m.length&&/^[0-9]*$/.exec(m[3]))l=["none"];else{for(var n=[],p=m.length-2;0<=p;p--)n.push(m.slice(p).join("."));n.push("none");l=n}}else l=[d||"none"];k=l;for(var q=A.cookie,r=0;r<k.length;r++){var u=h,t=k[r],z=c;if(Oe.test(y.location.hostname)||"/"==z&&Pe.test(t))break;"none"!=k[r]&&(u+="domain="+k[r]+";");A.cookie=u;if(q!=A.cookie||0<=ra(Qe(a),b))break}};var Se=!1;if(A.querySelectorAll)try{var Te=A.querySelectorAll(":root");Te&&1==Te.length&&Te[0]==A.documentElement&&(Se=!0)}catch(a){}var Ue=Se;var Ve=function(a){for(var b=[],c=document.cookie.split(";"),d=new RegExp("^\\s*"+a+"=\\s*(.*?)\\s*$"),e=0;e<c.length;e++){var f=c[e].match(d);f&&b.push(f[1])}return b},Ye=function(a,b,c,d){var e=We(a,d);if(1===e.length)return e[0].id;if(0!==e.length){e=Xe(e,function(a){return a.rd},b);if(1===e.length)return e[0].id;e=Xe(e,function(a){return a.Zd},c);return e[0]?e[0].id:void 0}},af=function(a,b,c,d,e){c=void 0===c?"/":c;var f=d=void 0===d?"auto":d,h=c;if(Ze.test(document.location.hostname)||"/"===
h&&$e.test(f))return!1;var k=b;k&&1200<k.length&&(k=k.substring(0,1200));b=k;var l=a+"="+b+"; path="+c+"; ";void 0!==e&&(l+="expires="+(new Date((new Date).getTime()+e)).toGMTString()+"; ");if("auto"===d){var m=!1,n;a:{var p=[],q=document.location.hostname.split(".");if(4===q.length){var r=q[q.length-1];if(parseInt(r,10).toString()===r){n=["none"];break a}}for(var u=q.length-2;0<=u;u--)p.push(q.slice(u).join("."));p.push("none");n=p}for(var t=n,z=0;z<t.length&&!m;z++)m=af(a,b,c,t[z],e);return m}d&&
"none"!==d&&(l+="domain="+d+";");var I=document.cookie;document.cookie=l;return I!=document.cookie||0<=Ve(a).indexOf(b)};function Xe(a,b,c){for(var d=[],e=[],f,h=0;h<a.length;h++){var k=a[h],l=b(k);l===c?d.push(k):void 0===f||l<f?(e=[k],f=l):l===f&&e.push(k)}return 0<d.length?d:e}function We(a,b){for(var c=[],d=Ve(a),e=0;e<d.length;e++){var f=d[e].split("."),h=f.shift();if(!b||-1!==b.indexOf(h)){var k=f.shift();k&&(k=k.split("-"),c.push({id:f.join("."),rd:1*k[0]||1,Zd:1*k[1]||1}))}}return c}
var $e=/^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,Ze=/(^|\.)doubleclick\.net$/i;var bf=window,cf=document;var ff=function(a){for(var b=bf.navigator.userAgent+(cf.cookie||"")+(cf.referrer||""),c=b.length,d=bf.history.length;0<d;)b+=d--^c++;var e=1,f,h,k;if(b)for(e=0,h=b.length-1;0<=h;h--)k=b.charCodeAt(h),e=(e<<6&268435455)+k+(k<<14),f=e&266338304,e=0!=f?e^f>>21:e;var l=[Math.round(2147483647*Math.random())^e&2147483647,Math.round(Date.now()/1E3)].join("."),m=""+df(void 0),n=ef(void 0);1<n&&(m+="-"+n);return[a,m,l].join(".")},gf=function(a,b,c,d){var e=df(b);return Ye(a,e,ef(c),d)};
function df(a){if(!a)return 1;a=0===a.indexOf(".")?a.substr(1):a;return a.split(".").length}function ef(a){if(!a||"/"===a)return 1;"/"!==a[0]&&(a="/"+a);"/"!==a[a.length-1]&&(a+="/");return a.split("/").length-1};var hf=["1"],jf={},mf=function(a,b,c){b=void 0===b?"auto":b;c=void 0===c?"/":c;var d=kf(void 0===a?"_gcl":a);if(!jf[d]&&!lf(d,b,c)){var e=ff("1");af(d,e,c,b,7776E6);lf(d,b,c)}};function lf(a,b,c){var d=gf(a,b,c,hf);d&&(jf[a]=d);return d}function kf(a){return(void 0===a?"_gcl":a)+"_au"};var nf=function(a){for(var b=[],c=A.cookie.split(";"),d=new RegExp("^\\s*"+a+"=\\s*(.*?)\\s*$"),e=0;e<c.length;e++){var f=c[e].match(d);f&&b.push(f[1])}var h=[];if(!b||0==b.length)return h;for(var k=0;k<b.length;k++){var l=b[k].split(".");3==l.length&&"GCL"==l[0]&&l[1]&&h.push(l[2])}return h};var of=/^\w+$/,pf=/^[\w-]+$/,qf=/^\d+\.fls\.doubleclick\.net$/;function rf(a){return a&&"string"==typeof a&&a.match(of)?a:"_gcl"}function sf(a){if(a){if("string"==typeof a){var b=rf(a);return{va:b,sa:b,ya:b}}if(a&&"object"==typeof a)return{va:rf(a.dc),sa:rf(a.aw),ya:rf(a.gf)}}return{va:"_gcl",sa:"_gcl",ya:"_gcl"}}function tf(a){var b=N(y.location.href),c=G(b,"host",!1);if(c&&c.match(qf)){var d=G(b,"path").split(a+"=");if(1<d.length)return d[1].split(";")[0].split("?")[0]}}
function uf(a){return a.filter(function(a){return pf.test(a)})}var wf=function(a){var b=tf("gclaw");if(b)return b.split(".");var c=sf(a);if("_gcl"==c.sa){var d=vf();if(d&&(null==d.F||"aw.ds"==d.F))return[d.X]}return uf(nf(c.sa+"_aw"))},xf=function(a){var b=tf("gcldc");if(b)return b.split(".");var c=sf(a);if("_gcl"==c.va){var d=vf();if(d&&("ds"==d.F||"aw.ds"==d.F))return[d.X]}return uf(nf(c.va+"_dc"))};
function vf(){var a=N(y.location.href),b=G(a,"query",!1,void 0,"gclid"),c=G(a,"query",!1,void 0,"gclsrc");if(!b||!c){var d=G(a,"fragment");b=b||Za(d,"gclid");c=c||Za(d,"gclsrc")}return void 0!==b&&b.match(pf)?{X:b,F:c}:null}
var yf=function(){var a=tf("gac");if(a)return decodeURIComponent(a);for(var b=[],c=A.cookie.split(";"),d=/^\s*_gac_(UA-\d+-\d+)=\s*(.+?)\s*$/,e=0;e<c.length;e++){var f=c[e].match(d);f&&b.push({Ab:f[1],value:f[2]})}var h={};if(b&&b.length)for(var k=0;k<b.length;k++){var l=b[k].value.split(".");"1"==l[0]&&3==l.length&&l[1]&&(h[b[k].Ab]||(h[b[k].Ab]=[]),h[b[k].Ab].push({timestamp:l[1],X:l[2]}))}var m=[],n;for(n in h)if(h.hasOwnProperty(n)){for(var p=[],q=h[n],r=0;r<q.length;r++)p.push(q[r].X);p=uf(p);
p.length&&m.push(n+":"+p.join(","))}return m.join(";")},zf=function(a,b,c){};var Af;a:{Af="G"}var Bf={"":"n",UA:"u",AW:"a",DC:"d",G:"e",GTM:Af},Cf=function(a){var b=kc.o.split("-"),c=b[0].toUpperCase();return(Bf[c]||"i")+"86"+(a&&"GTM"===c?b[1]:"")};var Jf=!!y.MutationObserver,Kf=void 0,Lf=function(a){if(!Kf){var b=function(){var a=A.body;if(a)if(Jf)(new MutationObserver(function(){for(var a=0;a<Kf.length;a++)D(Kf[a])})).observe(a,{childList:!0,subtree:!0});else{var b=!1;Ra(a,"DOMNodeInserted",function(){b||(b=!0,D(function(){b=!1;for(var a=0;a<Kf.length;a++)D(Kf[a])}))})}};Kf=[];A.body?b():D(b)}Kf.push(a)};
var Mf=function(){var a=A.body,b=A.documentElement||a&&a.parentElement,c,d;if(A.compatMode&&"BackCompat"!==A.compatMode)c=b?b.clientHeight:0,d=b?b.clientWidth:0;else{var e=function(a,b){return a&&b?Math.min(a,b):Math.max(a,b)};c=e(b?b.clientHeight:0,a?a.clientHeight:0);d=e(b?b.clientWidth:0,a?a.clientWidth:0)}return{width:d,height:c}},Nf=function(a){var b=Mf(),c=b.height,d=b.width,e=a.getBoundingClientRect(),f=e.bottom-e.top,h=e.right-e.left;return f&&h?(1-Math.min((Math.max(0-e.left,0)+Math.max(e.right-
d,0))/h,1))*(1-Math.min((Math.max(0-e.top,0)+Math.max(e.bottom-c,0))/f,1)):0},Of=function(a){if(A.hidden)return!0;var b=a.getBoundingClientRect();if(b.top==b.bottom||b.left==b.right||!y.getComputedStyle)return!0;var c=y.getComputedStyle(a,null);if("hidden"===c.visibility)return!0;for(var d=a,e=c;d;){if("none"===e.display)return!0;var f=e.opacity,h=e.filter;if(h){var k=h.indexOf("opacity(");0<=k&&(h=h.substring(k+8,h.indexOf(")",k)),"%"==h.charAt(h.length-1)&&(h=h.substring(0,h.length-1)),f=Math.min(h,
f))}if(void 0!==f&&0>=f)return!0;(d=d.parentElement)&&(e=y.getComputedStyle(d,null))}return!1};var Yf="www.googletagmanager.com/gtm.js";
var Zf=Yf,$f=function(a,b,c,d){Ra(a,b,c,d)},ag=function(a,b){return y.setTimeout(a,b)},bg=function(a,b,c){B(a,b,c)},cg=function(){return y.location.href},dg=function(a){return G(N(a),"fragment")},V=function(a,b){return Hc(a,b||2)},eg=function(a,b,c){b&&(a.eventCallback=b,c&&(a.eventTimeout=c));return y["dataLayer"].push(a)},fg=function(a,b){y[a]=b},W=function(a,b,c){b&&(void 0===y[a]||c&&!y[a])&&(y[a]=b);return y[a]},gg=function(a,b,c){var d=b,e=c,f=sf(a);e=e||"auto";d=d||"/";var h=vf();if(null!=
h){var k=(new Date).getTime(),l=new Date(k+7776E6),m=["GCL",Math.round(k/1E3),h.X].join(".");h.F&&"aw.ds"!=h.F||Re(f.sa+"_aw",m,d,e,l,!0);"aw.ds"!=h.F&&"ds"!=h.F||Re(f.va+"_dc",m,d,e,l,!0);"gf"==h.F&&Re(f.ya+"_gf",m,d,e,l,!0)}},hg=function(a,b){var c;a:{var d;d=100;for(var e={},f=0;f<b.length;f++)e[b[f]]=!0;for(var h=a,k=0;h&&k<=d;k++){if(e[String(h.tagName).toLowerCase()]){c=h;break a}h=h.parentElement}c=null}return c},Y=function(a,b,c,d){var e=!d&&"http:"==y.location.protocol;e&&(e=2!==ig());return(e?
b:a)+c};
var jg=function(a){var b=0;b=Nf(a);return b},kg=function(a){},lg=function(a){var b=!1;b=Of(a);return b},mg=function(a,b){var c;a:{if(a&&
qa(a))for(var d=0;d<a.length;d++)if(a[d]&&b(a[d])){c=a[d];break a}c=void 0}return c},ng=function(a,b,c,d){Me(a,b,c,d)},og=function(a,b,c){return Ne(a,b,c)},pg=function(a){return!!Ne(a,"init",!1)},qg=function(a){Le(a).init=!0};
var ig=function(){var a=Zf;if(qc){if(0===qc.toLowerCase().indexOf("https://"))return 2;if(0===qc.toLowerCase().indexOf("http://"))return 3}a=a.toLowerCase();for(var b="https://"+a,c="http://"+a,d=1,e=A.getElementsByTagName("script"),f=0;f<e.length&&100>f;f++){var h=e[f].src;if(h){h=h.toLowerCase();if(0===h.indexOf(c))return 3;1===d&&0===h.indexOf(b)&&(d=2)}}return d};var tg=function(a,b,c){var d=(void 0===c?0:c)?"www.googletagmanager.com/gtag/js":Zf;d+="?id="+encodeURIComponent(a)+"&l=dataLayer";if(b)for(var e in b)b[e]&&b.hasOwnProperty(e)&&(d+="&"+e+"="+encodeURIComponent(b[e]));var f=Y("https://","http://",d);B(f,void 0,void 0)};var vg=function(a,b,c){a instanceof ke.Fc&&(a=a.resolve(ke.je(b,c)),b=rc);return{kb:a,S:b}};var wg=function(a,b,c){this.n=a;this.t=b;this.p=c},xg=function(){this.c=1;this.e=[];this.p=null};function yg(a){var b=lc,c=b.gss=b.gss||{};return c[a]=c[a]||new xg}var zg=function(a,b){yg(a).p=b},Ag=function(a,b,c){var d=Math.floor((new Date).getTime()/1E3);yg(a).e.push(new wg(b,d,c))},Bg=function(a){};var Kg=window,Lg=document,Mg=function(a){var b=Kg._gaUserPrefs;if(b&&b.ioo&&b.ioo()||a&&!0===Kg["ga-disable-"+a])return!0;try{var c=Kg.external;if(c&&c._gaUserPrefs&&"oo"==c._gaUserPrefs)return!0}catch(m){}for(var d=[],e=Lg.cookie.split(";"),f=/^\s*AMP_TOKEN=\s*(.*?)\s*$/,h=0;h<e.length;h++){var k=e[h].match(f);k&&d.push(k[1])}for(var l=0;l<d.length;l++)if("$OPT_OUT"==decodeURIComponent(d[l]))return!0;return!1};var Pg=function(a){if(1===yg(a).c){yg(a).c=2;var b=encodeURIComponent(a);B(("http:"!=y.location.protocol?"https:":"http:")+("//www.googletagmanager.com/gtag/js?id="+b+"&l=dataLayer&cx=c"))}},Qg=function(a,b){};var Z={a:{}};
Z.a.sdl=["google"],function(){function a(){return!!(Object.keys(l("horiz.pix")).length||Object.keys(l("horiz.pct")).length||Object.keys(l("vert.pix")).length||Object.keys(l("vert.pct")).length)}function b(a){for(var b=[],c=a.split(","),d=0;d<c.length;d++){var e=Number(c[d]);if(isNaN(e))return[];m.test(c[d])||b.push(e)}return b}function c(){var a=0,b=0;return function(){var c,d={height:0,width:0};d=Mf();c=d;var e=
c.height;a=Math.max(u.scrollLeft+c.width,a);b=Math.max(u.scrollTop+e,b);return{od:a,pd:b}}}function d(){q=W("self");r=q.document;u=r.scrollingElement||r.body&&r.body.parentNode;z=c()}function e(a,b,c,d){var e=l(b),f={},h;for(h in e){f.threshold=h;if(e.hasOwnProperty(f.threshold)){var k=Number(f.threshold);a<k||(eg({event:"gtm.scrollDepth","gtm.scrollThreshold":k,"gtm.scrollUnits":c.toLowerCase(),"gtm.scrollDirection":d,"gtm.triggers":e[f.threshold].join(",")}),ng("sdl",b,function(a){return function(b){delete b[a.threshold];
return b}}(f),{}))}f={threshold:f.threshold}}}function f(){var a=z(),b=a.od,c=a.pd,d=b/u.scrollWidth*100,f=c/u.scrollHeight*100;e(b,"horiz.pix",n.Ka,p.Nb);e(d,"horiz.pct",n.Ja,p.Nb);e(c,"vert.pix",n.Ka,p.Rb);e(f,"vert.pct",n.Ja,p.Rb);Le("sdl").pending=!1}function h(){var b=250,c=!1;r.scrollingElement&&r.documentElement&&q.addEventListener&&(b=50,c=!0);var d=0,e=!1,h=function(){e?d=ag(h,b):(d=0,f(),pg("sdl")&&!a()&&(Sa(q,"scroll",k),Sa(q,"resize",k),Le("sdl").init=!1));e=!1},k=function(){c&&z();d?
e=!0:(d=ag(h,b),Le("sdl").pending=!0)};return k}function k(a,c,d){if(c){var e=b(String(a));ng("sdl",d,function(a){for(var b=0;b<e.length;b++){var d=String(e[b]);a.hasOwnProperty(d)||(a[d]=[]);a[d].push(c)}return a},{})}}function l(a){return og("sdl",a,{})}var m=/^\s*$/,n={Ja:"PERCENT",Ka:"PIXELS"},p={Rb:"vertical",Nb:"horizontal"},q,r,u,t=!1,z;(function(a){Z.__sdl=a;Z.__sdl.b="sdl";Z.__sdl.g=!0})(function(b){D(b.vtp_gtmOnSuccess);var c=b.vtp_uniqueTriggerId,e=b.vtp_horizontalThresholdsPixels,l=b.vtp_horizontalThresholdsPercent,
m=b.vtp_verticalThresholdUnits,p=b.vtp_verticalThresholdsPixels,z=b.vtp_verticalThresholdsPercent;switch(b.vtp_horizontalThresholdUnits){case n.Ka:k(e,c,"horiz.pix");break;case n.Ja:k(l,c,"horiz.pct")}switch(m){case n.Ka:k(p,c,"vert.pix");break;case n.Ja:k(z,c,"vert.pct")}pg("sdl")?Ne("sdl","pending",void 0)||(t||(d(),t=!0),D(function(){return f()})):(d(),t=!0,u&&(qg("sdl"),Le("sdl").pending=!0,D(function(){f();if(a()){var b=h();Ra(q,"scroll",b,void 0);Ra(q,"resize",b,void 0)}else Le("sdl").init=
!1})))})}();
Z.a.sp=["google"],function(){(function(a){Z.__sp=a;Z.__sp.b="sp";Z.__sp.g=!0})(function(a){var b=a.vtp_gtmOnFailure;bg("//www.googleadservices.com/pagead/conversion_async.js",function(){var c=W("google_trackConversion");if(sc(c)){var d={};"DATA_LAYER"==a.vtp_customParamsFormat?d=a.vtp_dataLayerVariable:"USER_SPECIFIED"==a.vtp_customParamsFormat&&(d=U(a.vtp_customParams,"key","value"));c({google_conversion_id:a.vtp_conversionId,google_conversion_label:a.vtp_conversionLabel,google_custom_params:d,google_remarketing_only:!0,
onload_callback:a.vtp_gtmOnSuccess,google_gtm:Cf(void 0)})||b()}else b()},b)})}();
Z.a.e=["google"],function(){(function(a){Z.__e=a;Z.__e.b="e";Z.__e.g=!0})(function(){return mc})}();Z.a.f=["google"],function(){(function(a){Z.__f=a;Z.__f.b="f";Z.__f.g=!0})(function(a){var b=V("gtm.referrer",1)||A.referrer,c;if(b){var d;if(a.vtp_component&&"URL"!=a.vtp_component){var e=N(String(b));d=G(e,a.vtp_component,a.vtp_stripWww,a.vtp_defaultPages,a.vtp_queryKey)}else d=$a(N(String(b)));c=d}else c=String(b);return c})}();
Z.a.cl=["google"],function(){function a(a){var b=a.target;if(b){var d=Ke(b);d.event="gtm.click";eg(d)}}(function(a){Z.__cl=a;Z.__cl.b="cl";Z.__cl.g=!0})(function(b){if(!pg("cl")){var c=W("document");Ra(c,"click",a,!0);qg("cl");var d=Ne("cl","legacyTeardown",void 0);d&&d()}D(b.vtp_gtmOnSuccess)})}();

Z.a.u=["google"],function(){var a=function(a){return{toString:function(){return a}}};(function(a){Z.__u=a;Z.__u.b="u";Z.__u.g=!0})(function(b){var c;c=(c=b.vtp_customUrlSource?b.vtp_customUrlSource:V("gtm.url",1))||cg();var d=b[a("vtp_component")],e;if(d&&"URL"!=d){var f=N(String(c));e=G(f,d,"HOST"==d?b[a("vtp_stripWww")]:void 0,"PATH"==d?b[a("vtp_defaultPages")]:void 0,"QUERY"==d?b[a("vtp_queryKey")]:void 0)}else e=$a(N(String(c)));return e})}();
Z.a.v=["google"],function(){(function(a){Z.__v=a;Z.__v.b="v";Z.__v.g=!0})(function(a){var b=a.vtp_name;if(!b||!b.replace)return!1;var c=V(b.replace(/\\\./g,"."),a.vtp_dataLayerVersion||1);return void 0!==c?c:a.vtp_defaultValue})}();
Z.a.tl=["google"],function(){function a(a){return function(){if(a.pb&&a.qb>=a.pb)a.lb&&W("self").clearInterval(a.lb);else{a.qb++;var b=(new Date).getTime();eg({event:a.N,"gtm.timerId":a.lb,"gtm.timerEventNumber":a.qb,"gtm.timerInterval":a.interval,"gtm.timerLimit":a.pb,"gtm.timerStartTime":a.yc,"gtm.timerCurrentTime":b,"gtm.timerElapsedTime":b-a.yc,"gtm.triggers":a.xe})}}}(function(a){Z.__tl=a;Z.__tl.b="tl";Z.__tl.g=!0})(function(b){D(b.vtp_gtmOnSuccess);if(!isNaN(b.vtp_interval)){var c={N:b.vtp_eventName,
qb:0,interval:Number(b.vtp_interval),pb:isNaN(b.vtp_limit)?0:Number(b.vtp_limit),xe:String(b.vtp_uniqueTriggerId||"0"),yc:(new Date).getTime()};c.lb=W("self").setInterval(a(c),0>Number(b.vtp_interval)?0:Number(b.vtp_interval))}})}();
Z.a.ua=["google"],function(){var a,b=function(b){var c={},e={},f={},h={},k={};if(b.vtp_gaSettings){var l=b.vtp_gaSettings;He(U(l.vtp_fieldsToSet,"fieldName","value"),e);He(U(l.vtp_contentGroup,"index","group"),f);He(U(l.vtp_dimension,"index","dimension"),h);He(U(l.vtp_metric,"index","metric"),k);b.vtp_gaSettings=null;l.vtp_fieldsToSet=void 0;l.vtp_contentGroup=void 0;l.vtp_dimension=void 0;l.vtp_metric=void 0;var m=za(l,void 0);b=za(b,m)}He(U(b.vtp_fieldsToSet,"fieldName","value"),e);He(U(b.vtp_contentGroup,
"index","group"),f);He(U(b.vtp_dimension,"index","dimension"),h);He(U(b.vtp_metric,"index","metric"),k);var n=fd(b.vtp_functionName),p="",q="";b.vtp_setTrackerName&&"string"==typeof b.vtp_trackerName?""!==b.vtp_trackerName&&(q=b.vtp_trackerName,p=q+"."):(q="gtm"+Bc(),p=q+".");var r={name:!0,clientId:!0,sampleRate:!0,siteSpeedSampleRate:!0,alwaysSendReferrer:!0,allowAnchor:!0,allowLinker:!0,cookieName:!0,cookieDomain:!0,cookieExpires:!0,cookiePath:!0,cookieUpdate:!0,legacyCookieDomain:!0,legacyHistoryImport:!0,
storage:!0,useAmpClientId:!0,storeGac:!0},u={allowAnchor:!0,allowLinker:!0,alwaysSendReferrer:!0,anonymizeIp:!0,cookieUpdate:!0,exFatal:!0,forceSSL:!0,javaEnabled:!0,legacyHistoryImport:!0,nonInteraction:!0,useAmpClientId:!0,useBeacon:!0,storeGac:!0,allowAdFeatures:!0},t=function(a){var b=[].slice.call(arguments,0);b[0]=p+b[0];n.apply(window,b)},z=function(a,b){return void 0===b?b:a(b)},I=function(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&t("set",a+c,b[c])},H=function(){},C=function(a,b,c){var d=0;if(a)for(var e in a)if(a.hasOwnProperty(e)&&(c&&r[e]||!c&&void 0===r[e])){var f=u[e]?wc(a[e]):a[e];"anonymizeIp"!=e||f||(f=void 0);b[e]=f;d++}return d},P={name:q};C(e,P,
!0);n("create",b.vtp_trackingId||c.trackingId,P);t("set","&gtm",Cf(!0));(function(a,c){void 0!==b[c]&&t("set",a,b[c])})("nonInteraction","vtp_nonInteraction");I("contentGroup",f);I("dimension",h);I("metric",k);var E={};C(e,E,!1)&&t("set",E);var L;b.vtp_enableLinkId&&t("require","linkid","linkid.js");t("set","hitCallback",function(){var a=
e&&e.hitCallback;sc(a)&&a();b.vtp_gtmOnSuccess()});if("TRACK_EVENT"==b.vtp_trackType){b.vtp_enableEcommerce&&(t("require","ec","ec.js"),H());var F={hitType:"event",eventCategory:String(b.vtp_eventCategory||c.category),eventAction:String(b.vtp_eventAction||c.action),eventLabel:z(String,b.vtp_eventLabel||c.label),eventValue:z(Ie,b.vtp_eventValue||c.value)};C(L,F,!1);t("send",F);}else if("TRACK_SOCIAL"==
b.vtp_trackType){}else if("TRACK_TRANSACTION"==b.vtp_trackType){t("require","ecommerce","//www.google-analytics.com/plugins/ua/ecommerce.js");
var K=function(a){return V("transaction"+a,1)},M=K("Id");t("ecommerce:addTransaction",{id:M,affiliation:K("Affiliation"),revenue:K("Total"),shipping:K("Shipping"),tax:K("Tax")});for(var ia=K("Products")||[],J=0;J<ia.length;J++){var R=ia[J];t("ecommerce:addItem",{id:M,sku:R.sku,name:R.name,category:R.category,price:R.price,quantity:R.quantity})}t("ecommerce:send");}else if("TRACK_TIMING"==b.vtp_trackType){}else if("DECORATE_LINK"==b.vtp_trackType){}else if("DECORATE_FORM"==b.vtp_trackType){}else if("TRACK_DATA"==
b.vtp_trackType){}else{b.vtp_enableEcommerce&&(t("require","ec","ec.js"),H());if(b.vtp_doubleClick||"DISPLAY_FEATURES"==b.vtp_advertisingFeaturesType){var Q="_dc_gtm_"+String(b.vtp_trackingId).replace(/[^A-Za-z0-9-]/g,"");t("require","displayfeatures",void 0,{cookieName:Q})}"DISPLAY_FEATURES_WITH_REMARKETING_LISTS"==b.vtp_advertisingFeaturesType&&
(Q="_dc_gtm_"+String(b.vtp_trackingId).replace(/[^A-Za-z0-9-]/g,""),t("require","adfeatures",{cookieName:Q}));L?t("send","pageview",L):t("send","pageview");}if(!a){var T=b.vtp_useDebugVersion?"u/analytics_debug.js":"analytics.js";b.vtp_useInternalVersion&&!b.vtp_useDebugVersion&&
(T="internal/"+T);a=!0;bg(Y("https:","http:","//www.google-analytics.com/"+T,e&&e.forceSSL),function(){var a=ed();a&&a.loaded||b.vtp_gtmOnFailure();},b.vtp_gtmOnFailure)}};Z.__ua=b;Z.__ua.b="ua";Z.__ua.g=!0}();





Z.a.paused=[],function(){(function(a){Z.__paused=a;Z.__paused.b="paused";Z.__paused.g=!0})(function(a){D(a.vtp_gtmOnFailure)})}();
Z.a.html=["customScripts"],function(){var a=function(b,c,f,h){return function(){try{if(0<c.length){var d=c.shift(),e=a(b,c,f,h);if("SCRIPT"==String(d.nodeName).toUpperCase()&&"text/gtmscript"==d.type){var m=A.createElement("script");m.async=!1;m.type="text/javascript";m.id=d.id;m.text=d.text||d.textContent||d.innerHTML||"";d.charset&&(m.charset=d.charset);var n=d.getAttribute("data-gtmsrc");n&&(m.src=n,Oa(m,e));b.insertBefore(m,null);n||e()}else if(d.innerHTML&&0<=d.innerHTML.toLowerCase().indexOf("<script")){for(var p=
[];d.firstChild;)p.push(d.removeChild(d.firstChild));b.insertBefore(d,null);a(d,p,e,h)()}else b.insertBefore(d,null),e()}else f()}catch(q){D(h)}}};var b=function(a,b,c){cd(function(){var d,e=lc;e.postscribe||(e.postscribe=jc);d=e.postscribe;var f={done:b},m=A.createElement("div");m.style.display="none";m.style.visibility="hidden";A.body.appendChild(m);try{d(m,a,f)}catch(n){D(c)}})};var c=function(d){if(A.body){var e=
d.vtp_gtmOnFailure,f=vg(d.vtp_html,d.vtp_gtmOnSuccess,e),h=f.kb,k=f.S;if(d.vtp_useIframe){}else d.vtp_supportDocumentWrite?b(h,k,e):a(A.body,Xa(h),k,e)()}else ag(function(){c(d)},200)};Z.__html=c;Z.__html.b="html";Z.__html.g=!0}();




var Rg={macro:function(a){if(ke.ab.hasOwnProperty(a))return ke.ab[a]}};Rg.dataLayer=Ic;Rg.onHtmlSuccess=ke.Vb(!0);Rg.onHtmlFailure=ke.Vb(!1);Rg.callback=function(a){oc.hasOwnProperty(a)&&sc(oc[a])&&oc[a]();delete oc[a]};Rg.Uc=function(){lc[kc.o]=Rg;pc=Z.a;Wb=Wb||ke;Xb=Vc};
Rg.Id=function(){lc=y.google_tag_manager=y.google_tag_manager||{};if(lc[kc.o]){var a=lc.zones;a&&a.unregisterChild(kc.o)}else{for(var b=data.resource||{},c=b.macros||[],d=0;d<c.length;d++)Pb.push(c[d]);for(var e=b.tags||[],f=0;f<e.length;f++)Sb.push(e[f]);for(var h=b.predicates||[],k=0;k<h.length;k++)Rb.push(h[k]);for(var l=b.rules||[],m=0;m<l.length;m++){for(var n=l[m],p={},q=0;q<n.length;q++)p[n[q][0]]=Array.prototype.slice.call(n[q],1);Qb.push(p)}Ub=Z;De();Rg.Uc();je();Yc=!1;Zc=0;if("interactive"==
A.readyState&&!A.createEventObject||"complete"==A.readyState)ad();else{Ra(A,"DOMContentLoaded",ad);Ra(A,"readystatechange",ad);if(A.createEventObject&&A.documentElement.doScroll){var r=!0;try{r=!y.frameElement}catch(t){}r&&bd()}Ra(y,"load",ad)}Xd=!1;"complete"===A.readyState?Zd():Ra(y,"load",Zd);a:{
if(!ld)break a;od();rd=void 0;sd={};pd={};ud=void 0;td={};qd="";vd=md();y.setInterval(od,864E5);}}};Rg.Id();

})()
