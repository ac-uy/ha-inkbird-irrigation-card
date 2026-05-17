function t(t,e,s,i){var n,r=arguments.length,o=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,s,o):n(e,s))||o);return r>3&&o&&Object.defineProperty(e,s,o),o}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let r=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&n.set(e,t))}return t}toString(){return this.cssText}};const o=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:l,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,_=u.trustedTypes,f=_?_.emptyScript:"",$=u.reactiveElementPolyfillSupport,g=(t,e)=>t,m={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},v=(t,e)=>!a(t,e),y={attribute:!0,type:String,converter:m,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const r=i?.call(this);n?.call(this,e),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...l(t),...d(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),n=e.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const n=(void 0!==s.converter?.toAttribute?s.converter:m).toAttribute(e,s.type);this._$Em=t,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:m;this._$Em=i;const r=n.fromAttribute(e,t.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(void 0!==t){const r=this.constructor;if(!1===i&&(n=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??v)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==n||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[g("elementProperties")]=new Map,b[g("finalized")]=new Map,$?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,A=t=>t,x=w.trustedTypes,S=x?x.createPolicy("lit-html",{createHTML:t=>t}):void 0,z="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+E,k=`<${C}>`,P=document,U=()=>P.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,H="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,N=/>/g,I=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,D=/"/g,L=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),F=Symbol.for("lit-noChange"),Z=Symbol.for("lit-nothing"),q=new WeakMap,V=P.createTreeWalker(P,129);function W(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const J=(t,e)=>{const s=t.length-1,i=[];let n,r=2===e?"<svg>":3===e?"<math>":"",o=R;for(let e=0;e<s;e++){const s=t[e];let a,c,h=-1,l=0;for(;l<s.length&&(o.lastIndex=l,c=o.exec(s),null!==c);)l=o.lastIndex,o===R?"!--"===c[1]?o=T:void 0!==c[1]?o=N:void 0!==c[2]?(L.test(c[2])&&(n=RegExp("</"+c[2],"g")),o=I):void 0!==c[3]&&(o=I):o===I?">"===c[0]?(o=n??R,h=-1):void 0===c[1]?h=-2:(h=o.lastIndex-c[2].length,a=c[1],o=void 0===c[3]?I:'"'===c[3]?D:j):o===D||o===j?o=I:o===T||o===N?o=R:(o=I,n=void 0);const d=o===I&&t[e+1].startsWith("/>")?" ":"";r+=o===R?s+k:h>=0?(i.push(a),s.slice(0,h)+z+s.slice(h)+E+d):s+E+(-2===h?e:d)}return[W(t,r+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class K{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[c,h]=J(t,e);if(this.el=K.createElement(c,s),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=V.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(z)){const e=h[r++],s=i.getAttribute(t).split(E),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:o[2],strings:s,ctor:"."===o[1]?tt:"?"===o[1]?et:"@"===o[1]?st:Y}),i.removeAttribute(t)}else t.startsWith(E)&&(a.push({type:6,index:n}),i.removeAttribute(t));if(L.test(i.tagName)){const t=i.textContent.split(E),e=t.length-1;if(e>0){i.textContent=x?x.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],U()),V.nextNode(),a.push({type:2,index:++n});i.append(t[e],U())}}}else if(8===i.nodeType)if(i.data===C)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(E,t+1));)a.push({type:7,index:n}),t+=E.length-1}n++}}static createElement(t,e){const s=P.createElement("template");return s.innerHTML=t,s}}function G(t,e,s=t,i){if(e===F)return e;let n=void 0!==i?s._$Co?.[i]:s._$Cl;const r=O(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=n:s._$Cl=n),void 0!==n&&(e=G(t,n._$AS(t,e.values),n,i)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??P).importNode(e,!0);V.currentNode=i;let n=V.nextNode(),r=0,o=0,a=s[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new X(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new it(n,this,t)),this._$AV.push(e),a=s[++o]}r!==a?.index&&(n=V.nextNode(),r++)}return V.currentNode=P,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=Z,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),O(t)?t===Z||null==t||""===t?(this._$AH!==Z&&this._$AR(),this._$AH=Z):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Z&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=K.createElement(W(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Q(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new K(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new X(this.O(U()),this.O(U()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=Z,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=Z}_$AI(t,e=this,s,i){const n=this.strings;let r=!1;if(void 0===n)t=G(this,t,e,0),r=!O(t)||t!==this._$AH&&t!==F,r&&(this._$AH=t);else{const i=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=G(this,i[s+o],e,o),a===F&&(a=this._$AH[o]),r||=!O(a)||a!==this._$AH[o],a===Z?t=Z:t!==Z&&(t+=(a??"")+n[o+1]),this._$AH[o]=a}r&&!i&&this.j(t)}j(t){t===Z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Z?void 0:t}}class et extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Z)}}class st extends Y{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??Z)===F)return;const s=this._$AH,i=t===Z&&s!==Z||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==Z&&(s===Z||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const nt=w.litHtmlPolyfillSupport;nt?.(K,X),(w.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ot extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let n=i._$litPart$;if(void 0===n){const t=s?.renderBefore??null;i._$litPart$=n=new X(e.insertBefore(U(),t),t,void 0,s??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}ot._$litElement$=!0,ot.finalized=!0,rt.litElementHydrateSupport?.({LitElement:ot});const at=rt.litElementPolyfillSupport;at?.({LitElement:ot}),(rt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:v},ht=(t=ct,e,s)=>{const{kind:i,metadata:n}=s;let r=globalThis.litPropertyMetadata.get(n);if(void 0===r&&globalThis.litPropertyMetadata.set(n,r=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),r.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const n=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,n,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const n=this[i];e.call(this,s),this.requestUpdate(i,n,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const lt=["#4CAF50","#2196F3","#FF9800","#9C27B0","#00BCD4","#F44336"];let dt=class extends ot{static getConfigElement(){return document.createElement("ha-inkbird-irrigation-card-editor")}static getStubConfig(){return{type:"custom:ha-inkbird-irrigation-card",entity_prefix:"inkbird_iic_600"}}setConfig(t){this._config=t}set hass(t){this._hass=t,this.requestUpdate()}getCardSize(){return 4}get _prefix(){return this._config.entity_prefix||"inkbird_iic_600"}get _zones(){return this._config.zones||[1,2,3,4,5,6]}_zoneName(t){return this._config.zone_names?.[t]||`Zone ${t}`}_zoneColor(t){const e=this._zones.indexOf(t);return lt[e%lt.length]}_zoneSwitch(t){return this._hass?.states[`switch.${this._prefix}_zone_${t}`]}_zoneRemaining(t){const e=this._hass?.states[`sensor.${this._prefix}_zone_${t}_time_remaining`];return e&&parseInt(e.state)||0}_zoneElapsed(t){const e=this._hass?.states[`sensor.${this._prefix}_zone_${t}_time_elapsed`];return e&&parseInt(e.state)||0}_zoneDuration(t){const e=this._hass?.states[`number.${this._prefix}_zone_${t}_duration`];return e&&parseInt(e.state)||30}_zoneIsActive(t){return"on"===this._zoneSwitch(t)?.state}get _mode(){return this._hass?.states[`sensor.${this._prefix}_mode`]?.state||"auto"}get _skipSchedule(){return"on"===this._hass?.states[`switch.${this._prefix}_skip_schedule`]?.state}get _activeZones(){return this._zones.filter(t=>this._zoneIsActive(t))}async _refreshEntity(){await new Promise(t=>setTimeout(t,500));for(const t of this._zones)await(this._hass?.callService("homeassistant","update_entity",{entity_id:`switch.${this._prefix}_zone_${t}`}))}async _toggleZone(t){const e=this._zoneIsActive(t),s=`switch.${this._prefix}_zone_${t}`;await(this._hass?.callService("switch",e?"turn_off":"turn_on",{entity_id:s})),await this._refreshEntity()}async _startZone(t,e){await(this._hass?.callService("number","set_value",{entity_id:`number.${this._prefix}_zone_${t}_duration`,value:e})),await(this._hass?.callService("switch","turn_on",{entity_id:`switch.${this._prefix}_zone_${t}`})),await this._refreshEntity()}async _stopAll(){for(const t of this._zones)this._zoneIsActive(t)&&await(this._hass?.callService("switch","turn_off",{entity_id:`switch.${this._prefix}_zone_${t}`}));await this._refreshEntity()}async _toggleSwitch(t){const e="on"===this._hass?.states[t]?.state;await(this._hass?.callService("switch",e?"turn_off":"turn_on",{entity_id:t}))}async _setDuration(t,e){await(this._hass?.callService("number","set_value",{entity_id:`number.${this._prefix}_zone_${t}_duration`,value:e}))}render(){if(!this._config||!this._hass)return Z;const t=this._activeZones;return B`
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
    `}_renderSwitches(){const t=this._mainValve,e=this._rainSensor,s=this._skipSchedule;return B`
      <div class="switches-row">
        <button class="sw-btn ${t?"sw-btn--on":""}" @click=${()=>this._toggleSwitch(`switch.${this._prefix}_main_valve`)}>
          <ha-icon icon="mdi:valve"></ha-icon>
          <span>Valve</span>
        </button>
        <button class="sw-btn ${e?"sw-btn--on":""}" @click=${()=>this._toggleSwitch(`switch.${this._prefix}_rain_sensor`)}>
          <ha-icon icon="mdi:weather-rainy"></ha-icon>
          <span>Rain</span>
        </button>
        <button class="sw-btn ${s?"sw-btn--warn":""}" @click=${()=>this._toggleSwitch(`switch.${this._prefix}_skip_schedule`)}>
          <ha-icon icon="mdi:calendar-remove"></ha-icon>
          <span>Skip</span>
        </button>
      </div>
    `}_renderZone(t){const e=this._zoneIsActive(t),s=this._zoneRemaining(t),i=this._zoneElapsed(t),n=this._zoneDuration(t),r=e&&i+s>0?i/(i+s)*100:0,o=this._zoneColor(t);return B`
      <div class="zone ${e?"zone--active":""}" style="--zone-color: ${o}">
        <div class="zone-main">
          <div class="zone-indicator ${e?"pulse":""}"></div>
          <div class="zone-info">
            <span class="zone-name">${this._zoneName(t)}</span>
            ${e?B`
              <span class="zone-status">${s} min remaining</span>
            `:Z}
          </div>
          ${e?B`
            <button class="zone-btn zone-btn--active" @click=${()=>this._toggleZone(t)}>
              <ha-icon icon="mdi:stop"></ha-icon>
            </button>
          `:B`
            <div class="zone-controls">
              <select class="dur-select" @change=${e=>this._setDuration(t,parseInt(e.target.value))}>
                ${[5,10,15,20,30,45,60,90,120].map(t=>B`
                  <option value="${t}" ?selected=${n===t}>${t} min</option>
                `)}
              </select>
              <button class="zone-start-btn" @click=${()=>this._startZone(t,n)}>
                <ha-icon icon="mdi:water"></ha-icon>
              </button>
            </div>
          `}
        </div>
        ${e?B`
          <div class="zone-progress">
            <div class="zone-progress-fill" style="width: ${r}%"></div>
          </div>
        `:Z}
      </div>
    `}};dt.styles=((t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new r(s,t,i)})`
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

  `,t([
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function(t){return function(t){return(e,s)=>"object"==typeof s?ht(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}({...t,state:!0,attribute:!1})}()],dt.prototype,"_config",void 0),dt=t([(t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("ha-inkbird-irrigation-card")],dt),window.customCards=window.customCards||[],window.customCards.push({type:"ha-inkbird-irrigation-card",name:"Inkbird Irrigation",description:"Manage your Inkbird IIC-600 irrigation controller: zone controls, progress, and status.",preview:!0});export{dt as HaInkbirdIrrigationCard};
