!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("react-leaflet")):"function"==typeof define&&define.amd?define(["react","react-leaflet"],t):"object"==typeof exports?exports.ReactLeaflet=t(require("react"),require("react-leaflet")):e.ReactLeaflet=t(e.React,e[void 0])}(window,(function(e,t){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=3)}([function(e,t){e.exports=function(e){return e&&e.__esModule?e:{default:e}}},function(t,r){t.exports=e},function(e,r){e.exports=t},function(e,t,r){r(4),e.exports=r(12)},function(e,t,r){"use strict";var n=r(0);t.__esModule=!0;var o=n(r(5));t.BingLayer=o.default},function(e,t,r){"use strict";var n=r(0);t.__esModule=!0,t.default=void 0;var o=n(r(6)),i=n(r(7)),a=(n(r(1)),n(r(8))),u=r(2),s=(r(11),function(e){function t(){return e.apply(this,arguments)||this}return(0,o.default)(t,e),t.prototype.createLeafletElement=function(e){return L.bingLayer(e.bingkey,this.getOptions(e))},t}(u.GridLayer));(0,i.default)(s,"propTypes",{bingkey:a.default.string.isRequired});var c=(0,u.withLeaflet)(s);t.default=c},function(e,t){e.exports=function(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}},function(e,t){e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}},function(e,t,r){e.exports=r(9)()},function(e,t,r){"use strict";var n=r(10);function o(){}function i(){}i.resetWarningCache=o,e.exports=function(){function e(e,t,r,o,i,a){if(a!==n){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}function t(){return e}e.isRequired=e;var r={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:i,resetWarningCache:o};return r.PropTypes=r,r}},function(e,t,r){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,r){"use strict";L.BingLayer=L.TileLayer.extend({options:{subdomains:[0,1,2,3],type:"Aerial",attribution:"Bing",culture:"",style:""},initialize:function(e,t){L.Util.setOptions(this,t),this._bing_key=e,this._url=null,this._providers=[],this.metaRequested=!1},tile2quad:function(e,t,r){for(var n="",o=r;o>0;o--){var i=0,a=1<<o-1;0!=(e&a)&&(i+=1),0!=(t&a)&&(i+=2),n+=i}return n},getTileUrl:function(e){var t=this._getZoomForUrl(),r=this.options.subdomains,n=this.options.subdomains[Math.abs((e.x+e.y)%r.length)];return this._url.replace("{subdomain}",n).replace("{quadkey}",this.tile2quad(e.x,e.y,t)).replace("{culture}",this.options.culture)},loadMetadata:function(){if(!this.metaRequested){this.metaRequested=!0;var e=this,t="_bing_metadata_"+L.Util.stamp(this);window[t]=function(r){window[t]=void 0;var n=document.getElementById(t);n.parentNode.removeChild(n),r.errorDetails?console.log(r.errorDetails):e.initMetadata(r)};var r="file:"===document.location.protocol?"http":document.location.protocol.slice(0,-1),n=r+"://dev.virtualearth.net/REST/v1/Imagery/Metadata/"+this.options.type+"?include=ImageryProviders&jsonp="+t+"&key="+this._bing_key+"&UriScheme="+r+"&culture="+this.options.culture+"&style="+this.options.style,o=document.createElement("script");o.type="text/javascript",o.src=n,o.id=t,document.getElementsByTagName("head")[0].appendChild(o)}},initMetadata:function(e){var t=e.resourceSets[0].resources[0];if(this.options.subdomains=t.imageUrlSubdomains,this._url=t.imageUrl,t.imageryProviders)for(var r=0;r<t.imageryProviders.length;r++)for(var n=t.imageryProviders[r],o=0;o<n.coverageAreas.length;o++){var i=n.coverageAreas[o],a={zoomMin:i.zoomMin,zoomMax:i.zoomMax,active:!1},u=new L.LatLngBounds(new L.LatLng(i.bbox[0]+.01,i.bbox[1]+.01),new L.LatLng(i.bbox[2]-.01,i.bbox[3]-.01));a.bounds=u,a.attrib=n.attribution,this._providers.push(a)}this._update()},_update:function(){null!==this._url&&this._map&&(this._update_attribution(),L.TileLayer.prototype._update.apply(this,[]))},_update_attribution:function(){for(var e=this._map.getBounds(),t=this._map.getZoom(),r=0;r<this._providers.length;r++){var n=this._providers[r];t<=n.zoomMax&&t>=n.zoomMin&&e.intersects(n.bounds)?(!n.active&&this._map.attributionControl&&this._map.attributionControl.addAttribution(n.attrib),n.active=!0):(n.active&&this._map.attributionControl&&this._map.attributionControl.removeAttribution(n.attrib),n.active=!1)}},onAdd:function(e){this.loadMetadata(),L.TileLayer.prototype.onAdd.apply(this,[e])},onRemove:function(e){for(var t=0;t<this._providers.length;t++){var r=this._providers[t];r.active&&this._map.attributionControl&&(this._map.attributionControl.removeAttribution(r.attrib),r.active=!1)}L.TileLayer.prototype.onRemove.apply(this,[e])}}),L.bingLayer=function(e,t){return new L.BingLayer(e,t)}},function(e,t,r){"use strict";var n,o,i=r(0)(r(13));e.exports=(n=r(1),o=r(2),function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.BingLayer=void 0;var n=function(e){return e&&e.__esModule?e:{default:e}}(r(3));t.BingLayer=n.default},function(e,t){function r(){throw new Error("setTimeout has not been defined")}function n(){throw new Error("clearTimeout has not been defined")}function o(e){if(c===setTimeout)return setTimeout(e,0);if((c===r||!c)&&setTimeout)return c=setTimeout,setTimeout(e,0);try{return c(e,0)}catch(t){try{return c.call(null,e,0)}catch(t){return c.call(this,e,0)}}}function i(){y&&f&&(y=!1,f.length?d=f.concat(d):v=-1,d.length&&a())}function a(){if(!y){var e=o(i);y=!0;for(var t=d.length;t;){for(f=d,d=[];++v<t;)f&&f[v].run();v=-1,t=d.length}f=null,y=!1,function(e){if(l===clearTimeout)return clearTimeout(e);if((l===n||!l)&&clearTimeout)return l=clearTimeout,clearTimeout(e);try{l(e)}catch(t){try{return l.call(null,e)}catch(t){return l.call(this,e)}}}(e)}}function u(e,t){this.fun=e,this.array=t}function s(){}var c,l,p=e.exports={};!function(){try{c="function"==typeof setTimeout?setTimeout:r}catch(e){c=r}try{l="function"==typeof clearTimeout?clearTimeout:n}catch(e){l=n}}();var f,d=[],y=!1,v=-1;p.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];d.push(new u(e,t)),1!==d.length||y||o(a)},u.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=s,p.addListener=s,p.once=s,p.off=s,p.removeListener=s,p.removeAllListeners=s,p.emit=s,p.prependListener=s,p.prependOnceListener=s,p.listeners=function(e){return[]},p.binding=function(e){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(e){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}},function(e,t){e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,r){function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),a=(n(r(10)),r(9)),u=n(a),s=r(11),c=(r(4),function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):(0,i.default)(e,t))}(t,e),o(t,[{key:"createLeafletElement",value:function(e){return L.bingLayer(e.bingkey,this.getOptions(e))}}]),t}(s.GridLayer));c.propTypes={bingkey:u.default.string.isRequired},t.default=(0,s.withLeaflet)(c)},function(e,t){L.BingLayer=L.TileLayer.extend({options:{subdomains:[0,1,2,3],type:"Aerial",attribution:"Bing",culture:""},initialize:function(e,t){L.Util.setOptions(this,t),this._bing_key=e,this._url=null,this._providers=[],this.metaRequested=!1},tile2quad:function(e,t,r){for(var n="",o=r;o>0;o--){var i=0,a=1<<o-1;0!=(e&a)&&(i+=1),0!=(t&a)&&(i+=2),n+=i}return n},getTileUrl:function(e){var t=this._getZoomForUrl(),r=this.options.subdomains,n=this.options.subdomains[Math.abs((e.x+e.y)%r.length)];return this._url.replace("{subdomain}",n).replace("{quadkey}",this.tile2quad(e.x,e.y,t)).replace("{culture}",this.options.culture)},loadMetadata:function(){if(!this.metaRequested){this.metaRequested=!0;var e=this,t="_bing_metadata_"+L.Util.stamp(this);window[t]=function(r){window[t]=void 0;var n=document.getElementById(t);return n.parentNode.removeChild(n),r.errorDetails?void console.log(r.errorDetails):void e.initMetadata(r)};var r="file:"===document.location.protocol?"http":document.location.protocol.slice(0,-1),n=r+"://dev.virtualearth.net/REST/v1/Imagery/Metadata/"+this.options.type+"?include=ImageryProviders&jsonp="+t+"&key="+this._bing_key+"&UriScheme="+r,o=document.createElement("script");o.type="text/javascript",o.src=n,o.id=t,document.getElementsByTagName("head")[0].appendChild(o)}},initMetadata:function(e){var t=e.resourceSets[0].resources[0];if(this.options.subdomains=t.imageUrlSubdomains,this._url=t.imageUrl,t.imageryProviders)for(var r=0;r<t.imageryProviders.length;r++)for(var n=t.imageryProviders[r],o=0;o<n.coverageAreas.length;o++){var i=n.coverageAreas[o],a={zoomMin:i.zoomMin,zoomMax:i.zoomMax,active:!1},u=new L.LatLngBounds(new L.LatLng(i.bbox[0]+.01,i.bbox[1]+.01),new L.LatLng(i.bbox[2]-.01,i.bbox[3]-.01));a.bounds=u,a.attrib=n.attribution,this._providers.push(a)}this._update()},_update:function(){null!==this._url&&this._map&&(this._update_attribution(),L.TileLayer.prototype._update.apply(this,[]))},_update_attribution:function(){for(var e=this._map.getBounds(),t=this._map.getZoom(),r=0;r<this._providers.length;r++){var n=this._providers[r];t<=n.zoomMax&&t>=n.zoomMin&&e.intersects(n.bounds)?(!n.active&&this._map.attributionControl&&this._map.attributionControl.addAttribution(n.attrib),n.active=!0):(n.active&&this._map.attributionControl&&this._map.attributionControl.removeAttribution(n.attrib),n.active=!1)}},onAdd:function(e){this.loadMetadata(),L.TileLayer.prototype.onAdd.apply(this,[e])},onRemove:function(e){for(var t=0;t<this._providers.length;t++){var r=this._providers[t];r.active&&this._map.attributionControl&&(this._map.attributionControl.removeAttribution(r.attrib),r.active=!1)}L.TileLayer.prototype.onRemove.apply(this,[e])}}),L.bingLayer=function(e,t){return new L.BingLayer(e,t)}},function(e,t){function r(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}var n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var a,u,s=r(e),c=1;c<arguments.length;c++){for(var l in a=Object(arguments[c]))o.call(a,l)&&(s[l]=a[l]);if(n){u=n(a);for(var p=0;p<u.length;p++)i.call(a,u[p])&&(s[u[p]]=a[u[p]])}}return s}},function(e,t,r){(function(t){var n=function(){};if("production"!==t.env.NODE_ENV){var o=r(2),i={};n=function(e){var t="Warning: "+e;"undefined"!=typeof console&&console.error(t);try{throw new Error(t)}catch(e){}}}e.exports=function(e,r,a,u,s){if("production"!==t.env.NODE_ENV)for(var c in e)if(e.hasOwnProperty(c)){var l;try{if("function"!=typeof e[c]){var p=Error((u||"React class")+": "+a+" type `"+c+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof e[c]+"`.");throw p.name="Invariant Violation",p}l=e[c](r,c,u,a,null,o)}catch(e){l=e}if(!l||l instanceof Error||n((u||"React class")+": type specification of "+a+" `"+c+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof l+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),l instanceof Error&&!(l.message in i)){i[l.message]=!0;var f=s?s():"";n("Failed "+a+" type: "+l.message+(null!=f?f:""))}}}}).call(t,r(1))},function(e,t,r){function n(){}var o=r(2);e.exports=function(){function e(e,t,r,n,i,a){if(a!==o){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}function t(){return e}e.isRequired=e;var r={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return r.checkPropTypes=n,r.PropTypes=r,r}},function(e,t,r){(function(t){function n(){return null}var o=r(5),i=r(2),a=r(6),u=function(){};"production"!==t.env.NODE_ENV&&(u=function(e){var t="Warning: "+e;"undefined"!=typeof console&&console.error(t);try{throw new Error(t)}catch(e){}}),e.exports=function(e,r){function s(e,t){return e===t?0!==e||1/e==1/t:e!=e&&t!=t}function c(e){this.message=e,this.stack=""}function l(e){function n(n,s,l,p,f,d,y){if(p=p||m,d=d||l,y!==i){if(r){var v=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw v.name="Invariant Violation",v}if("production"!==t.env.NODE_ENV&&"undefined"!=typeof console){var h=p+":"+l;!o[h]&&a<3&&(u("You are manually calling a React.PropTypes validation function for the `"+d+"` prop on `"+p+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),o[h]=!0,a++)}}return null==s[l]?n?new c(null===s[l]?"The "+f+" `"+d+"` is marked as required in `"+p+"`, but its value is `null`.":"The "+f+" `"+d+"` is marked as required in `"+p+"`, but its value is `undefined`."):null:e(s,l,p,f,d)}if("production"!==t.env.NODE_ENV)var o={},a=0;var s=n.bind(null,!1);return s.isRequired=n.bind(null,!0),s}function p(e){return l((function(t,r,n,o,i,a){var u=t[r];return d(u)!==e?new c("Invalid "+o+" `"+i+"` of type `"+y(u)+"` supplied to `"+n+"`, expected `"+e+"`."):null}))}function f(t){switch(typeof t){case"number":case"string":case"undefined":return!0;case"boolean":return!t;case"object":if(Array.isArray(t))return t.every(f);if(null===t||e(t))return!0;var r=function(e){var t=e&&(h&&e[h]||e[b]);if("function"==typeof t)return t}(t);if(!r)return!1;var n,o=r.call(t);if(r!==t.entries){for(;!(n=o.next()).done;)if(!f(n.value))return!1}else for(;!(n=o.next()).done;){var i=n.value;if(i&&!f(i[1]))return!1}return!0;default:return!1}}function d(e){var t=typeof e;return Array.isArray(e)?"array":e instanceof RegExp?"object":function(e,t){return"symbol"===e||"Symbol"===t["@@toStringTag"]||"function"==typeof Symbol&&t instanceof Symbol}(t,e)?"symbol":t}function y(e){if(null==e)return""+e;var t=d(e);if("object"===t){if(e instanceof Date)return"date";if(e instanceof RegExp)return"regexp"}return t}function v(e){var t=y(e);switch(t){case"array":case"object":return"an "+t;case"boolean":case"date":case"regexp":return"a "+t;default:return t}}var h="function"==typeof Symbol&&Symbol.iterator,b="@@iterator",m="<<anonymous>>",g={array:p("array"),bool:p("boolean"),func:p("function"),number:p("number"),object:p("object"),string:p("string"),symbol:p("symbol"),any:l(n),arrayOf:function(e){return l((function(t,r,n,o,a){if("function"!=typeof e)return new c("Property `"+a+"` of component `"+n+"` has invalid PropType notation inside arrayOf.");var u=t[r];if(!Array.isArray(u))return new c("Invalid "+o+" `"+a+"` of type `"+d(u)+"` supplied to `"+n+"`, expected an array.");for(var s=0;s<u.length;s++){var l=e(u,s,n,o,a+"["+s+"]",i);if(l instanceof Error)return l}return null}))},element:l((function(t,r,n,o,i){var a=t[r];return e(a)?null:new c("Invalid "+o+" `"+i+"` of type `"+d(a)+"` supplied to `"+n+"`, expected a single ReactElement.")})),instanceOf:function(e){return l((function(t,r,n,o,i){if(!(t[r]instanceof e)){var a=e.name||m;return new c("Invalid "+o+" `"+i+"` of type `"+function(e){return e.constructor&&e.constructor.name?e.constructor.name:m}(t[r])+"` supplied to `"+n+"`, expected instance of `"+a+"`.")}return null}))},node:l((function(e,t,r,n,o){return f(e[t])?null:new c("Invalid "+n+" `"+o+"` supplied to `"+r+"`, expected a ReactNode.")})),objectOf:function(e){return l((function(t,r,n,o,a){if("function"!=typeof e)return new c("Property `"+a+"` of component `"+n+"` has invalid PropType notation inside objectOf.");var u=t[r],s=d(u);if("object"!==s)return new c("Invalid "+o+" `"+a+"` of type `"+s+"` supplied to `"+n+"`, expected an object.");for(var l in u)if(u.hasOwnProperty(l)){var p=e(u,l,n,o,a+"."+l,i);if(p instanceof Error)return p}return null}))},oneOf:function(e){return Array.isArray(e)?l((function(t,r,n,o,i){for(var a=t[r],u=0;u<e.length;u++)if(s(a,e[u]))return null;return new c("Invalid "+o+" `"+i+"` of value `"+a+"` supplied to `"+n+"`, expected one of "+JSON.stringify(e)+".")})):("production"!==t.env.NODE_ENV&&u("Invalid argument supplied to oneOf, expected an instance of array."),n)},oneOfType:function(e){if(!Array.isArray(e))return"production"!==t.env.NODE_ENV&&u("Invalid argument supplied to oneOfType, expected an instance of array."),n;for(var r=0;r<e.length;r++){var o=e[r];if("function"!=typeof o)return u("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+v(o)+" at index "+r+"."),n}return l((function(t,r,n,o,a){for(var u=0;u<e.length;u++)if(null==(0,e[u])(t,r,n,o,a,i))return null;return new c("Invalid "+o+" `"+a+"` supplied to `"+n+"`.")}))},shape:function(e){return l((function(t,r,n,o,a){var u=t[r],s=d(u);if("object"!==s)return new c("Invalid "+o+" `"+a+"` of type `"+s+"` supplied to `"+n+"`, expected `object`.");for(var l in e){var p=e[l];if(p){var f=p(u,l,n,o,a+"."+l,i);if(f)return f}}return null}))},exact:function(e){return l((function(t,r,n,a,u){var s=t[r],l=d(s);if("object"!==l)return new c("Invalid "+a+" `"+u+"` of type `"+l+"` supplied to `"+n+"`, expected `object`.");var p=o({},t[r],e);for(var f in p){var y=e[f];if(!y)return new c("Invalid "+a+" `"+u+"` key `"+f+"` supplied to `"+n+"`.\nBad object: "+JSON.stringify(t[r],null,"  ")+"\nValid keys: "+JSON.stringify(Object.keys(e),null,"  "));var v=y(s,f,n,a,u+"."+f,i);if(v)return v}return null}))}};return c.prototype=Error.prototype,g.checkPropTypes=a,g.PropTypes=g,g}}).call(t,r(1))},function(e,t,r){(function(t){if("production"!==t.env.NODE_ENV){var n="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;e.exports=r(8)((function(e){return"object"==typeof e&&null!==e&&e.$$typeof===n}),!0)}else e.exports=r(7)()}).call(t,r(1))},function(e,t){e.exports=n},function(e,t){e.exports=o}]))},function(e,t){e.exports=function(e,t){for(var r=Object.getOwnPropertyNames(t),n=0;n<r.length;n++){var o=r[n],i=Object.getOwnPropertyDescriptor(t,o);i&&i.configurable&&void 0===e[o]&&Object.defineProperty(e,o,i)}return e}}])}));