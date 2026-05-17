function t(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const r=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:a,defineProperty:h,getOwnPropertyDescriptor:c,getOwnPropertyNames:l,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,_=globalThis,u=_.trustedTypes,g=u?u.emptyScript:"",f=_.reactiveElementPolyfillSupport,$=(t,e)=>t,m={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!a(t,e),v={attribute:!0,type:String,converter:m,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&h(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...l(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:m).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:m;this._$Em=s;const o=n.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const o=this.constructor;if(!1===s&&(n=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??y)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[$("elementProperties")]=new Map,b[$("finalized")]=new Map,f?.({ReactiveElement:b}),(_.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,x=t=>t,A=w.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,z="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+E,k=`<${C}>`,P=document,U=()=>P.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,T="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,N=/>/g,I=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,D=/"/g,L=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),F=Symbol.for("lit-noChange"),Z=Symbol.for("lit-nothing"),V=new WeakMap,q=P.createTreeWalker(P,129);function W(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=H;for(let e=0;e<i;e++){const i=t[e];let a,h,c=-1,l=0;for(;l<i.length&&(r.lastIndex=l,h=r.exec(i),null!==h);)l=r.lastIndex,r===H?"!--"===h[1]?r=R:void 0!==h[1]?r=N:void 0!==h[2]?(L.test(h[2])&&(n=RegExp("</"+h[2],"g")),r=I):void 0!==h[3]&&(r=I):r===I?">"===h[0]?(r=n??H,c=-1):void 0===h[1]?c=-2:(c=r.lastIndex-h[2].length,a=h[1],r=void 0===h[3]?I:'"'===h[3]?D:j):r===D||r===j?r=I:r===R||r===N?r=H:(r=I,n=void 0);const d=r===I&&t[e+1].startsWith("/>")?" ":"";o+=r===H?i+k:c>=0?(s.push(a),i.slice(0,c)+z+i.slice(c)+E+d):i+E+(-2===c?e:d)}return[W(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[h,c]=J(t,e);if(this.el=K.createElement(h,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=q.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(z)){const e=c[o++],i=s.getAttribute(t).split(E),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?tt:"?"===r[1]?et:"@"===r[1]?it:Y}),s.removeAttribute(t)}else t.startsWith(E)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(L.test(s.tagName)){const t=s.textContent.split(E),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],U()),q.nextNode(),a.push({type:2,index:++n});s.append(t[e],U())}}}else if(8===s.nodeType)if(s.data===C)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)a.push({type:7,index:n}),t+=E.length-1}n++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,s){if(e===F)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=O(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=G(t,n._$AS(t,e.values),n,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??P).importNode(e,!0);q.currentNode=s;let n=q.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new X(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new st(n,this,t)),this._$AV.push(e),a=i[++r]}o!==a?.index&&(n=q.nextNode(),o++)}return q.currentNode=P,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=Z,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),O(t)?t===Z||null==t||""===t?(this._$AH!==Z&&this._$AR(),this._$AH=Z):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Z&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(W(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new K(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new X(this.O(U()),this.O(U()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=Z,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Z}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=G(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==F,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=G(this,s[i+r],e,r),a===F&&(a=this._$AH[r]),o||=!O(a)||a!==this._$AH[r],a===Z?t=Z:t!==Z&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===Z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Z?void 0:t}}class et extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Z)}}class it extends Y{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??Z)===F)return;const i=this._$AH,s=t===Z&&i!==Z||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==Z&&(i===Z||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const nt=w.litHtmlPolyfillSupport;nt?.(K,X),(w.litHtmlVersions??=[]).push("3.3.3");const ot=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class rt extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new X(e.insertBefore(U(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}rt._$litElement$=!0,rt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:rt});const at=ot.litElementPolyfillSupport;at?.({LitElement:rt}),(ot.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:y},ct=(t=ht,e,i)=>{const{kind:s,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function lt(t){return function(t){return(e,i)=>"object"==typeof i?ct(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}({...t,state:!0,attribute:!1})}const dt=["#4CAF50","#2196F3","#FF9800","#9C27B0","#00BCD4","#F44336"];let pt=class extends rt{constructor(){super(...arguments),this._loading=new Set}static getConfigElement(){return document.createElement("ha-inkbird-irrigation-card-editor")}static getStubConfig(){return{type:"custom:ha-inkbird-irrigation-card",entity_prefix:"inkbird_iic_600"}}setConfig(t){this._config=t}set hass(t){this._hass=t,this.requestUpdate()}getCardSize(){return 4}get _prefix(){return this._config.entity_prefix||"inkbird_iic_600"}get _zones(){return this._config.zones||[1,2,3,4,5,6]}_zoneName(t){return this._config.zone_names?.[t]||`Zone ${t}`}_zoneColor(t){const e=this._zones.indexOf(t);return dt[e%dt.length]}_zoneSwitch(t){return this._hass?.states[`switch.${this._prefix}_zone_${t}`]}_zoneRemaining(t){const e=this._hass?.states[`sensor.${this._prefix}_zone_${t}_time_remaining`];return e&&parseInt(e.state)||0}_zoneElapsed(t){const e=this._hass?.states[`sensor.${this._prefix}_zone_${t}_time_elapsed`];return e&&parseInt(e.state)||0}_zoneDuration(t){const e=this._hass?.states[`number.${this._prefix}_zone_${t}_duration`];return e&&parseInt(e.state)||30}_zoneIsActive(t){return"on"===this._zoneSwitch(t)?.state}get _mode(){return this._hass?.states[`sensor.${this._prefix}_mode`]?.state||"auto"}get _skipSchedule(){return"on"===this._hass?.states[`switch.${this._prefix}_skip_schedule`]?.state}get _mainValve(){return"on"===this._hass?.states[`switch.${this._prefix}_main_valve`]?.state}get _rainSensor(){return"on"===this._hass?.states[`switch.${this._prefix}_rain_sensor`]?.state}get _activeZones(){return this._zones.filter(t=>this._zoneIsActive(t))}async _refreshEntity(){await new Promise(t=>setTimeout(t,500));for(const t of this._zones)await(this._hass?.callService("homeassistant","update_entity",{entity_id:`switch.${this._prefix}_zone_${t}`}))}async _toggleZone(t){const e=`zone_${t}`;this._loading=new Set([...this._loading,e]);try{const e=this._zoneIsActive(t),i=`switch.${this._prefix}_zone_${t}`;await(this._hass?.callService("switch",e?"turn_off":"turn_on",{entity_id:i})),await this._refreshEntity()}finally{this._loading=new Set([...this._loading].filter(t=>t!==e))}}async _startZone(t,e){const i=`zone_${t}`;this._loading=new Set([...this._loading,i]);try{await(this._hass?.callService("number","set_value",{entity_id:`number.${this._prefix}_zone_${t}_duration`,value:e})),await(this._hass?.callService("switch","turn_on",{entity_id:`switch.${this._prefix}_zone_${t}`})),await this._refreshEntity()}finally{this._loading=new Set([...this._loading].filter(t=>t!==i))}}async _stopAll(){this._loading=new Set([...this._loading,"stop_all"]);try{for(const t of this._zones)this._zoneIsActive(t)&&await(this._hass?.callService("switch","turn_off",{entity_id:`switch.${this._prefix}_zone_${t}`}));await this._refreshEntity()}finally{this._loading=new Set([...this._loading].filter(t=>"stop_all"!==t))}}async _toggleSwitch(t){const e=`sw_${t}`;this._loading=new Set([...this._loading,e]);try{const e="on"===this._hass?.states[t]?.state;await(this._hass?.callService("switch",e?"turn_off":"turn_on",{entity_id:t})),await new Promise(t=>setTimeout(t,500)),await(this._hass?.callService("homeassistant","update_entity",{entity_id:t}))}finally{this._loading=new Set([...this._loading].filter(t=>t!==e))}}async _setDuration(t,e){await(this._hass?.callService("number","set_value",{entity_id:`number.${this._prefix}_zone_${t}_duration`,value:e}))}render(){if(!this._config||!this._hass)return Z;const t=this._activeZones;return B`
      <ha-card>
        <div class="card-header">
          <div class="header-left">
            <ha-icon icon="mdi:sprinkler-variant" class="${t.length>0?"watering":""}"></ha-icon>
            <span class="title">${this._config.title||"Irrigation"}</span>
          </div>
          <div class="header-right">
            ${this._skipSchedule?B`<span class="badge badge--skip">Skipped</span>`:Z}
            <span class="badge badge--mode">${this._mode}</span>
            ${t.length>0?B`
              <button class="stop-all-btn" @click=${this._stopAll}>
                <ha-icon icon="mdi:stop-circle"></ha-icon>
              </button>
            `:Z}
          </div>
        </div>
        <div class="card-content">
          ${this._renderSwitches()}
          ${this._zones.map(t=>this._renderZone(t))}
        </div>
      </ha-card>
    `}_renderSwitches(){const t=this._mainValve,e=this._rainSensor,i=this._skipSchedule;return B`
      <div class="switches-row">
        <button class="sw-btn ${t?"sw-btn--on":""} ${this._loading.has(`sw_switch.${this._prefix}_main_valve`)?"sw-btn--loading":""}" @click=${()=>this._toggleSwitch(`switch.${this._prefix}_main_valve`)}>
          ${this._loading.has(`sw_switch.${this._prefix}_main_valve`)?B`<ha-icon icon="mdi:loading" class="spin"></ha-icon>`:B`<ha-icon icon="mdi:valve"></ha-icon>`}
          <span>Valve</span>
        </button>
        <button class="sw-btn ${e?"sw-btn--on":""} ${this._loading.has(`sw_switch.${this._prefix}_rain_sensor`)?"sw-btn--loading":""}" @click=${()=>this._toggleSwitch(`switch.${this._prefix}_rain_sensor`)}>
          ${this._loading.has(`sw_switch.${this._prefix}_rain_sensor`)?B`<ha-icon icon="mdi:loading" class="spin"></ha-icon>`:B`<ha-icon icon="mdi:weather-rainy"></ha-icon>`}
          <span>Rain</span>
        </button>
        <button class="sw-btn ${i?"sw-btn--warn":""} ${this._loading.has(`sw_switch.${this._prefix}_skip_schedule`)?"sw-btn--loading":""}" @click=${()=>this._toggleSwitch(`switch.${this._prefix}_skip_schedule`)}>
          ${this._loading.has(`sw_switch.${this._prefix}_skip_schedule`)?B`<ha-icon icon="mdi:loading" class="spin"></ha-icon>`:B`<ha-icon icon="mdi:calendar-remove"></ha-icon>`}
          <span>Skip</span>
        </button>
      </div>
    `}_renderZone(t){const e=this._zoneIsActive(t),i=this._zoneRemaining(t),s=this._zoneElapsed(t),n=this._zoneDuration(t),o=e&&s+i>0?s/(s+i)*100:0,r=this._zoneColor(t);return B`
      <div class="zone ${e?"zone--active":""}" style="--zone-color: ${r}">
        <div class="zone-main">
          <div class="zone-indicator ${e?"pulse":""}"></div>
          <div class="zone-info">
            <span class="zone-name">${this._zoneName(t)}</span>
            ${e?B`
              <span class="zone-status">${i} min remaining</span>
            `:Z}
          </div>
          ${e?B`
            <button class="zone-btn zone-btn--active" @click=${()=>this._toggleZone(t)}>
              ${this._loading.has(`zone_${t}`)?B`<ha-icon icon="mdi:loading" class="spin"></ha-icon>`:B`<ha-icon icon="mdi:stop"></ha-icon>`}
            </button>
          `:B`
            <div class="zone-controls">
              <select class="dur-select" @change=${e=>this._setDuration(t,parseInt(e.target.value))}>
                ${[5,10,15,20,30,45,60,90,120].map(t=>B`
                  <option value="${t}" ?selected=${n===t}>${t} min</option>
                `)}
              </select>
              <button class="zone-start-btn" @click=${()=>this._startZone(t,n)} ?disabled=${this._loading.has(`zone_${t}`)}>
                ${this._loading.has(`zone_${t}`)?B`<ha-icon icon="mdi:loading" class="spin"></ha-icon>`:B`<ha-icon icon="mdi:water"></ha-icon>`}
              </button>
            </div>
          `}
        </div>
        ${e?B`
          <div class="zone-progress">
            <div class="zone-progress-fill" style="width: ${o}%"></div>
          </div>
        `:Z}
      </div>
    `}};pt.styles=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)})`
    :host { display: block; }

    /* Header */
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 16px 8px;
    }
    .header-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .header-left ha-icon {
      --mdc-icon-size: 24px;
      color: var(--primary-color);
    }
    .header-left ha-icon.watering {
      animation: pulse-icon 1.5s ease-in-out infinite;
    }
    @keyframes pulse-icon {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .title { font-size: 18px; font-weight: 600; }
    .header-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .badge {
      font-size: 11px;
      font-weight: 500;
      padding: 2px 8px;
      border-radius: 4px;
      text-transform: uppercase;
    }
    .badge--mode {
      background: var(--secondary-background-color, #e0e0e0);
      color: var(--secondary-text-color);
    }
    .badge--skip {
      background: rgba(255, 152, 0, 0.15);
      color: var(--warning-color, #FF9800);
    }
    .stop-all-btn {
      border: none;
      background: var(--error-color, #f44336);
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      --mdc-icon-size: 18px;
    }

    /* Content */
    .card-content { padding: 8px 16px 16px; display: flex; flex-direction: column; gap: 6px; }

    /* System switches */
    .switches-row {
      display: flex;
      gap: 6px;
      margin-bottom: 8px;
    }
    .sw-btn {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 10px 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 10px;
      background: transparent;
      cursor: pointer;
      color: var(--secondary-text-color);
      font-size: 11px;
      font-weight: 500;
      --mdc-icon-size: 20px;
      transition: all 200ms;
    }
    .sw-btn--on {
      background: rgba(76, 175, 80, 0.1);
      border-color: var(--primary-color, #4CAF50);
      color: var(--primary-color, #4CAF50);
    }
    .sw-btn--warn {
      background: rgba(255, 152, 0, 0.1);
      border-color: var(--warning-color, #FF9800);
      color: var(--warning-color, #FF9800);
    }
    .sw-btn--loading { opacity: 0.6; pointer-events: none; }
    .spin { animation: spin 1s linear infinite; }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    /* Zone */
    .zone {
      border-radius: 12px;
      background: var(--primary-background-color, #f5f5f5);
      overflow: hidden;
      transition: all 200ms;
    }
    .zone--active {
      background: color-mix(in srgb, var(--zone-color) 8%, var(--card-background-color, white));
      box-shadow: inset 3px 0 0 var(--zone-color);
    }
    .zone-main {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
    }
    .zone-indicator {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--zone-color);
      opacity: 0.4;
      flex-shrink: 0;
    }
    .zone-indicator.pulse {
      opacity: 1;
      animation: pulse-dot 1.5s ease-in-out infinite;
    }
    @keyframes pulse-dot {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.3); opacity: 0.7; }
    }
    .zone-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
    .zone-name { font-size: 14px; font-weight: 500; }
    .zone-status { font-size: 12px; color: var(--zone-color); font-weight: 500; }
    .zone-status.idle { color: var(--secondary-text-color); font-weight: 400; }
    .zone-controls {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .dur-select {
      padding: 6px 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      font-size: 13px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      cursor: pointer;
    }
    .zone-start-btn {
      width: 36px;
      height: 36px;
      border: none;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: var(--zone-color);
      color: white;
      --mdc-icon-size: 18px;
      transition: opacity 200ms;
    }
    .zone-start-btn:active { opacity: 0.7; }
    .zone-btn {
      width: 36px;
      height: 36px;
      border: none;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: var(--secondary-background-color, #e0e0e0);
      color: var(--primary-text-color);
      --mdc-icon-size: 18px;
      transition: all 200ms;
    }
    .zone-btn--active {
      background: var(--zone-color);
      color: white;
    }

    /* Progress */
    .zone-progress {
      height: 3px;
      background: rgba(0, 0, 0, 0.06);
    }
    .zone-progress-fill {
      height: 100%;
      background: var(--zone-color);
      transition: width 2s linear;
    }

  `,t([lt()],pt.prototype,"_config",void 0),t([lt()],pt.prototype,"_loading",void 0),pt=t([(t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("ha-inkbird-irrigation-card")],pt),window.customCards=window.customCards||[],window.customCards.push({type:"ha-inkbird-irrigation-card",name:"Inkbird Irrigation",description:"Manage your Inkbird IIC-600 irrigation controller: zone controls, progress, and status.",preview:!0});export{pt as HaInkbirdIrrigationCard};
