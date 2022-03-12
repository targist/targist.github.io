function noop$3(){}function assign(r,e){for(const n in e)r[n]=e[n];return r}function is_promise(r){return r&&typeof r=="object"&&typeof r.then=="function"}function run(r){return r()}function blank_object(){return Object.create(null)}function run_all(r){r.forEach(run)}function is_function(r){return typeof r=="function"}function safe_not_equal(r,e){return r!=r?e==e:r!==e||r&&typeof r=="object"||typeof r=="function"}let src_url_equal_anchor;function src_url_equal(r,e){return src_url_equal_anchor||(src_url_equal_anchor=document.createElement("a")),src_url_equal_anchor.href=e,r===src_url_equal_anchor.href}function is_empty(r){return Object.keys(r).length===0}function subscribe(r,...e){if(r==null)return noop$3;const n=r.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function component_subscribe(r,e,n){r.$$.on_destroy.push(subscribe(e,n))}function create_slot(r,e,n,s){if(r){const a=get_slot_context(r,e,n,s);return r[0](a)}}function get_slot_context(r,e,n,s){return r[1]&&s?assign(n.ctx.slice(),r[1](s(e))):n.ctx}function get_slot_changes(r,e,n,s){if(r[2]&&s){const a=r[2](s(n));if(e.dirty===void 0)return a;if(typeof a=="object"){const u=[],h=Math.max(e.dirty.length,a.length);for(let w=0;w<h;w+=1)u[w]=e.dirty[w]|a[w];return u}return e.dirty|a}return e.dirty}function update_slot_base(r,e,n,s,a,u){if(a){const h=get_slot_context(e,n,s,u);r.p(h,a)}}function get_all_dirty_from_scope(r){if(r.ctx.length>32){const e=[],n=r.ctx.length/32;for(let s=0;s<n;s++)e[s]=-1;return e}return-1}function exclude_internal_props(r){const e={};for(const n in r)n[0]!=="$"&&(e[n]=r[n]);return e}let is_hydrating=!1;function start_hydrating(){is_hydrating=!0}function end_hydrating(){is_hydrating=!1}function upper_bound(r,e,n,s){for(;r<e;){const a=r+(e-r>>1);n(a)<=s?r=a+1:e=a}return r}function init_hydrate(r){if(r.hydrate_init)return;r.hydrate_init=!0;let e=r.childNodes;if(r.nodeName==="HEAD"){const B=[];for(let k=0;k<e.length;k++){const te=e[k];te.claim_order!==void 0&&B.push(te)}e=B}const n=new Int32Array(e.length+1),s=new Int32Array(e.length);n[0]=-1;let a=0;for(let B=0;B<e.length;B++){const k=e[B].claim_order,te=(a>0&&e[n[a]].claim_order<=k?a+1:upper_bound(1,a,re=>e[n[re]].claim_order,k))-1;s[B]=n[te]+1;const se=te+1;n[se]=B,a=Math.max(se,a)}const u=[],h=[];let w=e.length-1;for(let B=n[a]+1;B!=0;B=s[B-1]){for(u.push(e[B-1]);w>=B;w--)h.push(e[w]);w--}for(;w>=0;w--)h.push(e[w]);u.reverse(),h.sort((B,k)=>B.claim_order-k.claim_order);for(let B=0,k=0;B<h.length;B++){for(;k<u.length&&h[B].claim_order>=u[k].claim_order;)k++;const te=k<u.length?u[k]:null;r.insertBefore(h[B],te)}}function append_hydration(r,e){if(is_hydrating){for(init_hydrate(r),(r.actual_end_child===void 0||r.actual_end_child!==null&&r.actual_end_child.parentElement!==r)&&(r.actual_end_child=r.firstChild);r.actual_end_child!==null&&r.actual_end_child.claim_order===void 0;)r.actual_end_child=r.actual_end_child.nextSibling;e!==r.actual_end_child?(e.claim_order!==void 0||e.parentNode!==r)&&r.insertBefore(e,r.actual_end_child):r.actual_end_child=e.nextSibling}else(e.parentNode!==r||e.nextSibling!==null)&&r.appendChild(e)}function insert_hydration(r,e,n){is_hydrating&&!n?append_hydration(r,e):(e.parentNode!==r||e.nextSibling!=n)&&r.insertBefore(e,n||null)}function detach(r){r.parentNode.removeChild(r)}function element(r){return document.createElement(r)}function svg_element(r){return document.createElementNS("http://www.w3.org/2000/svg",r)}function text(r){return document.createTextNode(r)}function space(){return text(" ")}function empty(){return text("")}function listen(r,e,n,s){return r.addEventListener(e,n,s),()=>r.removeEventListener(e,n,s)}function attr(r,e,n){n==null?r.removeAttribute(e):r.getAttribute(e)!==n&&r.setAttribute(e,n)}function children(r){return Array.from(r.childNodes)}function init_claim_info(r){r.claim_info===void 0&&(r.claim_info={last_index:0,total_claimed:0})}function claim_node(r,e,n,s,a=!1){init_claim_info(r);const u=(()=>{for(let h=r.claim_info.last_index;h<r.length;h++){const w=r[h];if(e(w)){const B=n(w);return B===void 0?r.splice(h,1):r[h]=B,a||(r.claim_info.last_index=h),w}}for(let h=r.claim_info.last_index-1;h>=0;h--){const w=r[h];if(e(w)){const B=n(w);return B===void 0?r.splice(h,1):r[h]=B,a?B===void 0&&r.claim_info.last_index--:r.claim_info.last_index=h,w}}return s()})();return u.claim_order=r.claim_info.total_claimed,r.claim_info.total_claimed+=1,u}function claim_element_base(r,e,n,s){return claim_node(r,a=>a.nodeName===e,a=>{const u=[];for(let h=0;h<a.attributes.length;h++){const w=a.attributes[h];n[w.name]||u.push(w.name)}u.forEach(h=>a.removeAttribute(h))},()=>s(e))}function claim_element(r,e,n){return claim_element_base(r,e,n,element)}function claim_svg_element(r,e,n){return claim_element_base(r,e,n,svg_element)}function claim_text(r,e){return claim_node(r,n=>n.nodeType===3,n=>{const s=""+e;if(n.data.startsWith(s)){if(n.data.length!==s.length)return n.splitText(s.length)}else n.data=s},()=>text(e),!0)}function claim_space(r){return claim_text(r," ")}function set_data(r,e){e=""+e,r.wholeText!==e&&(r.data=e)}function set_style(r,e,n,s){n===null?r.style.removeProperty(e):r.style.setProperty(e,n,s?"important":"")}function query_selector_all(r,e=document.body){return Array.from(e.querySelectorAll(r))}let current_component;function set_current_component(r){current_component=r}function get_current_component(){if(!current_component)throw new Error("Function called outside component initialization");return current_component}function onMount(r){get_current_component().$$.on_mount.push(r)}function afterUpdate(r){get_current_component().$$.after_update.push(r)}function setContext(r,e){get_current_component().$$.context.set(r,e)}const dirty_components=[],binding_callbacks=[],render_callbacks=[],flush_callbacks=[],resolved_promise=Promise.resolve();let update_scheduled=!1;function schedule_update(){update_scheduled||(update_scheduled=!0,resolved_promise.then(flush))}function tick(){return schedule_update(),resolved_promise}function add_render_callback(r){render_callbacks.push(r)}const seen_callbacks=new Set;let flushidx=0;function flush(){const r=current_component;do{for(;flushidx<dirty_components.length;){const e=dirty_components[flushidx];flushidx++,set_current_component(e),update(e.$$)}for(set_current_component(null),dirty_components.length=0,flushidx=0;binding_callbacks.length;)binding_callbacks.pop()();for(let e=0;e<render_callbacks.length;e+=1){const n=render_callbacks[e];seen_callbacks.has(n)||(seen_callbacks.add(n),n())}render_callbacks.length=0}while(dirty_components.length);for(;flush_callbacks.length;)flush_callbacks.pop()();update_scheduled=!1,seen_callbacks.clear(),set_current_component(r)}function update(r){if(r.fragment!==null){r.update(),run_all(r.before_update);const e=r.dirty;r.dirty=[-1],r.fragment&&r.fragment.p(r.ctx,e),r.after_update.forEach(add_render_callback)}}const outroing=new Set;let outros;function group_outros(){outros={r:0,c:[],p:outros}}function check_outros(){outros.r||run_all(outros.c),outros=outros.p}function transition_in(r,e){r&&r.i&&(outroing.delete(r),r.i(e))}function transition_out(r,e,n,s){if(r&&r.o){if(outroing.has(r))return;outroing.add(r),outros.c.push(()=>{outroing.delete(r),s&&(n&&r.d(1),s())}),r.o(e)}}function handle_promise(r,e){const n=e.token={};function s(a,u,h,w){if(e.token!==n)return;e.resolved=w;let B=e.ctx;h!==void 0&&(B=B.slice(),B[h]=w);const k=a&&(e.current=a)(B);let te=!1;e.block&&(e.blocks?e.blocks.forEach((se,re)=>{re!==u&&se&&(group_outros(),transition_out(se,1,1,()=>{e.blocks[re]===se&&(e.blocks[re]=null)}),check_outros())}):e.block.d(1),k.c(),transition_in(k,1),k.m(e.mount(),e.anchor),te=!0),e.block=k,e.blocks&&(e.blocks[u]=k),te&&flush()}if(is_promise(r)){const a=get_current_component();if(r.then(u=>{set_current_component(a),s(e.then,1,e.value,u),set_current_component(null)},u=>{if(set_current_component(a),s(e.catch,2,e.error,u),set_current_component(null),!e.hasCatch)throw u}),e.current!==e.pending)return s(e.pending,0),!0}else{if(e.current!==e.then)return s(e.then,1,e.value,r),!0;e.resolved=r}}function update_await_block_branch(r,e,n){const s=e.slice(),{resolved:a}=r;r.current===r.then&&(s[r.value]=a),r.current===r.catch&&(s[r.error]=a),r.block.p(s,n)}function outro_and_destroy_block(r,e){transition_out(r,1,1,()=>{e.delete(r.key)})}function update_keyed_each(r,e,n,s,a,u,h,w,B,k,te,se){let re=r.length,ue=u.length,he=re;const ve={};for(;he--;)ve[r[he].key]=he;const ae=[],fe=new Map,Be=new Map;for(he=ue;he--;){const st=se(a,u,he),xt=n(st);let Kt=h.get(xt);Kt?s&&Kt.p(st,e):(Kt=k(xt,st),Kt.c()),fe.set(xt,ae[he]=Kt),xt in ve&&Be.set(xt,Math.abs(he-ve[xt]))}const Ve=new Set,Ct=new Set;function Ge(st){transition_in(st,1),st.m(w,te),h.set(st.key,st),te=st.first,ue--}for(;re&&ue;){const st=ae[ue-1],xt=r[re-1],Kt=st.key,_n=xt.key;st===xt?(te=st.first,re--,ue--):fe.has(_n)?!h.has(Kt)||Ve.has(Kt)?Ge(st):Ct.has(_n)?re--:Be.get(Kt)>Be.get(_n)?(Ct.add(Kt),Ge(st)):(Ve.add(_n),re--):(B(xt,h),re--)}for(;re--;){const st=r[re];fe.has(st.key)||B(st,h)}for(;ue;)Ge(ae[ue-1]);return ae}function get_spread_update(r,e){const n={},s={},a={$$scope:1};let u=r.length;for(;u--;){const h=r[u],w=e[u];if(w){for(const B in h)B in w||(s[B]=1);for(const B in w)a[B]||(n[B]=w[B],a[B]=1);r[u]=w}else for(const B in h)a[B]=1}for(const h in s)h in n||(n[h]=void 0);return n}function get_spread_object(r){return typeof r=="object"&&r!==null?r:{}}function create_component(r){r&&r.c()}function claim_component(r,e){r&&r.l(e)}function mount_component(r,e,n,s){const{fragment:a,on_mount:u,on_destroy:h,after_update:w}=r.$$;a&&a.m(e,n),s||add_render_callback(()=>{const B=u.map(run).filter(is_function);h?h.push(...B):run_all(B),r.$$.on_mount=[]}),w.forEach(add_render_callback)}function destroy_component(r,e){const n=r.$$;n.fragment!==null&&(run_all(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function make_dirty(r,e){r.$$.dirty[0]===-1&&(dirty_components.push(r),schedule_update(),r.$$.dirty.fill(0)),r.$$.dirty[e/31|0]|=1<<e%31}function init(r,e,n,s,a,u,h,w=[-1]){const B=current_component;set_current_component(r);const k=r.$$={fragment:null,ctx:null,props:u,update:noop$3,not_equal:a,bound:blank_object(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(B?B.$$.context:[])),callbacks:blank_object(),dirty:w,skip_bound:!1,root:e.target||B.$$.root};h&&h(k.root);let te=!1;if(k.ctx=n?n(r,e.props||{},(se,re,...ue)=>{const he=ue.length?ue[0]:re;return k.ctx&&a(k.ctx[se],k.ctx[se]=he)&&(!k.skip_bound&&k.bound[se]&&k.bound[se](he),te&&make_dirty(r,se)),re}):[],k.update(),te=!0,run_all(k.before_update),k.fragment=s?s(k.ctx):!1,e.target){if(e.hydrate){start_hydrating();const se=children(e.target);k.fragment&&k.fragment.l(se),se.forEach(detach)}else k.fragment&&k.fragment.c();e.intro&&transition_in(r.$$.fragment),mount_component(r,e.target,e.anchor,e.customElement),end_hydrating(),flush()}set_current_component(B)}class SvelteComponent{$destroy(){destroy_component(this,1),this.$destroy=noop$3}$on(e,n){const s=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return s.push(n),()=>{const a=s.indexOf(n);a!==-1&&s.splice(a,1)}}$set(e){this.$$set&&!is_empty(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const subscriber_queue=[];function readable(r,e){return{subscribe:writable(r,e).subscribe}}function writable(r,e=noop$3){let n;const s=new Set;function a(w){if(safe_not_equal(r,w)&&(r=w,n)){const B=!subscriber_queue.length;for(const k of s)k[1](),subscriber_queue.push(k,r);if(B){for(let k=0;k<subscriber_queue.length;k+=2)subscriber_queue[k][0](subscriber_queue[k+1]);subscriber_queue.length=0}}}function u(w){a(w(r))}function h(w,B=noop$3){const k=[w,B];return s.add(k),s.size===1&&(n=e(a)||noop$3),w(r),()=>{s.delete(k),s.size===0&&(n(),n=null)}}return{set:a,update:u,subscribe:h}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const stringToByteArray$1=function(r){const e=[];let n=0;for(let s=0;s<r.length;s++){let a=r.charCodeAt(s);a<128?e[n++]=a:a<2048?(e[n++]=a>>6|192,e[n++]=a&63|128):(a&64512)===55296&&s+1<r.length&&(r.charCodeAt(s+1)&64512)===56320?(a=65536+((a&1023)<<10)+(r.charCodeAt(++s)&1023),e[n++]=a>>18|240,e[n++]=a>>12&63|128,e[n++]=a>>6&63|128,e[n++]=a&63|128):(e[n++]=a>>12|224,e[n++]=a>>6&63|128,e[n++]=a&63|128)}return e},byteArrayToString=function(r){const e=[];let n=0,s=0;for(;n<r.length;){const a=r[n++];if(a<128)e[s++]=String.fromCharCode(a);else if(a>191&&a<224){const u=r[n++];e[s++]=String.fromCharCode((a&31)<<6|u&63)}else if(a>239&&a<365){const u=r[n++],h=r[n++],w=r[n++],B=((a&7)<<18|(u&63)<<12|(h&63)<<6|w&63)-65536;e[s++]=String.fromCharCode(55296+(B>>10)),e[s++]=String.fromCharCode(56320+(B&1023))}else{const u=r[n++],h=r[n++];e[s++]=String.fromCharCode((a&15)<<12|(u&63)<<6|h&63)}}return e.join("")},base64$2={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let a=0;a<r.length;a+=3){const u=r[a],h=a+1<r.length,w=h?r[a+1]:0,B=a+2<r.length,k=B?r[a+2]:0,te=u>>2,se=(u&3)<<4|w>>4;let re=(w&15)<<2|k>>6,ue=k&63;B||(ue=64,h||(re=64)),s.push(n[te],n[se],n[re],n[ue])}return s.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(stringToByteArray$1(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):byteArrayToString(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let a=0;a<r.length;){const u=n[r.charAt(a++)],w=a<r.length?n[r.charAt(a)]:0;++a;const k=a<r.length?n[r.charAt(a)]:64;++a;const se=a<r.length?n[r.charAt(a)]:64;if(++a,u==null||w==null||k==null||se==null)throw Error();const re=u<<2|w>>4;if(s.push(re),k!==64){const ue=w<<4&240|k>>2;if(s.push(ue),se!==64){const he=k<<6&192|se;s.push(he)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}},base64Encode=function(r){const e=stringToByteArray$1(r);return base64$2.encodeByteArray(e,!0)},base64Decode=function(r){try{return base64$2.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Deferred{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function getUA(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function isMobileCordova(){return typeof window!="undefined"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA())}function isBrowserExtension(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function isReactNative(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function isIE(){const r=getUA();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function isIndexedDBAvailable(){return typeof indexedDB=="object"}function validateIndexedDBOpenable(){return new Promise((r,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",a=self.indexedDB.open(s);a.onsuccess=()=>{a.result.close(),n||self.indexedDB.deleteDatabase(s),r(!0)},a.onupgradeneeded=()=>{n=!1},a.onerror=()=>{var u;e(((u=a.error)===null||u===void 0?void 0:u.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ERROR_NAME="FirebaseError";class FirebaseError extends Error{constructor(e,n,s){super(n);this.code=e,this.customData=s,this.name=ERROR_NAME,Object.setPrototypeOf(this,FirebaseError.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ErrorFactory.prototype.create)}}class ErrorFactory{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},a=`${this.service}/${e}`,u=this.errors[e],h=u?replaceTemplate(u,s):"Error",w=`${this.serviceName}: ${h} (${a}).`;return new FirebaseError(a,w,s)}}function replaceTemplate(r,e){return r.replace(PATTERN,(n,s)=>{const a=e[s];return a!=null?String(a):`<${s}?>`})}const PATTERN=/\{\$([^}]+)}/g;function isEmpty(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function deepEqual(r,e){if(r===e)return!0;const n=Object.keys(r),s=Object.keys(e);for(const a of n){if(!s.includes(a))return!1;const u=r[a],h=e[a];if(isObject(u)&&isObject(h)){if(!deepEqual(u,h))return!1}else if(u!==h)return!1}for(const a of s)if(!n.includes(a))return!1;return!0}function isObject(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function querystring(r){const e=[];for(const[n,s]of Object.entries(r))Array.isArray(s)?s.forEach(a=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(a))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function createSubscribe(r,e){const n=new ObserverProxy(r,e);return n.subscribe.bind(n)}class ObserverProxy{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,s){let a;if(e===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");implementsAnyMethods(e,["next","error","complete"])?a=e:a={next:e,error:n,complete:s},a.next===void 0&&(a.next=noop$2),a.error===void 0&&(a.error=noop$2),a.complete===void 0&&(a.complete=noop$2);const u=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?a.error(this.finalError):a.complete()}catch{}}),this.observers.push(a),u}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(s){typeof console!="undefined"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function implementsAnyMethods(r,e){if(typeof r!="object"||r===null)return!1;for(const n of e)if(n in r&&typeof r[n]=="function")return!0;return!1}function noop$2(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function getModularInstance(r){return r&&r._delegate?r._delegate:r}class Component{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DEFAULT_ENTRY_NAME$1="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Provider{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new Deferred;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const a=this.getOrInitializeService({instanceIdentifier:n});a&&s.resolve(a)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const s=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),a=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(u){if(a)return null;throw u}else{if(a)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(isComponentEager(e))try{this.getOrInitializeService({instanceIdentifier:DEFAULT_ENTRY_NAME$1})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(n);try{const u=this.getOrInitializeService({instanceIdentifier:a});s.resolve(u)}catch{}}}}clearInstance(e=DEFAULT_ENTRY_NAME$1){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=DEFAULT_ENTRY_NAME$1){return this.instances.has(e)}getOptions(e=DEFAULT_ENTRY_NAME$1){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const a=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[u,h]of this.instancesDeferred.entries()){const w=this.normalizeInstanceIdentifier(u);s===w&&h.resolve(a)}return a}onInit(e,n){var s;const a=this.normalizeInstanceIdentifier(n),u=(s=this.onInitCallbacks.get(a))!==null&&s!==void 0?s:new Set;u.add(e),this.onInitCallbacks.set(a,u);const h=this.instances.get(a);return h&&e(h,a),()=>{u.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(!!s)for(const a of s)try{a(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:normalizeIdentifierForFactory(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=DEFAULT_ENTRY_NAME$1){return this.component?this.component.multipleInstances?e:DEFAULT_ENTRY_NAME$1:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function normalizeIdentifierForFactory(r){return r===DEFAULT_ENTRY_NAME$1?void 0:r}function isComponentEager(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ComponentContainer{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Provider(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var LogLevel;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(LogLevel||(LogLevel={}));const levelStringToEnum={debug:LogLevel.DEBUG,verbose:LogLevel.VERBOSE,info:LogLevel.INFO,warn:LogLevel.WARN,error:LogLevel.ERROR,silent:LogLevel.SILENT},defaultLogLevel=LogLevel.INFO,ConsoleMethod={[LogLevel.DEBUG]:"log",[LogLevel.VERBOSE]:"log",[LogLevel.INFO]:"info",[LogLevel.WARN]:"warn",[LogLevel.ERROR]:"error"},defaultLogHandler=(r,e,...n)=>{if(e<r.logLevel)return;const s=new Date().toISOString(),a=ConsoleMethod[e];if(a)console[a](`[${s}]  ${r.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Logger{constructor(e){this.name=e,this._logLevel=defaultLogLevel,this._logHandler=defaultLogHandler,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in LogLevel))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?levelStringToEnum[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,LogLevel.DEBUG,...e),this._logHandler(this,LogLevel.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,LogLevel.VERBOSE,...e),this._logHandler(this,LogLevel.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,LogLevel.INFO,...e),this._logHandler(this,LogLevel.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,LogLevel.WARN,...e),this._logHandler(this,LogLevel.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,LogLevel.ERROR,...e),this._logHandler(this,LogLevel.ERROR,...e)}}function toArray(r){return Array.prototype.slice.call(r)}function promisifyRequest(r){return new Promise(function(e,n){r.onsuccess=function(){e(r.result)},r.onerror=function(){n(r.error)}})}function promisifyRequestCall(r,e,n){var s,a=new Promise(function(u,h){s=r[e].apply(r,n),promisifyRequest(s).then(u,h)});return a.request=s,a}function promisifyCursorRequestCall(r,e,n){var s=promisifyRequestCall(r,e,n);return s.then(function(a){if(!!a)return new Cursor(a,s.request)})}function proxyProperties(r,e,n){n.forEach(function(s){Object.defineProperty(r.prototype,s,{get:function(){return this[e][s]},set:function(a){this[e][s]=a}})})}function proxyRequestMethods(r,e,n,s){s.forEach(function(a){a in n.prototype&&(r.prototype[a]=function(){return promisifyRequestCall(this[e],a,arguments)})})}function proxyMethods(r,e,n,s){s.forEach(function(a){a in n.prototype&&(r.prototype[a]=function(){return this[e][a].apply(this[e],arguments)})})}function proxyCursorRequestMethods(r,e,n,s){s.forEach(function(a){a in n.prototype&&(r.prototype[a]=function(){return promisifyCursorRequestCall(this[e],a,arguments)})})}function Index(r){this._index=r}proxyProperties(Index,"_index",["name","keyPath","multiEntry","unique"]);proxyRequestMethods(Index,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]);proxyCursorRequestMethods(Index,"_index",IDBIndex,["openCursor","openKeyCursor"]);function Cursor(r,e){this._cursor=r,this._request=e}proxyProperties(Cursor,"_cursor",["direction","key","primaryKey","value"]);proxyRequestMethods(Cursor,"_cursor",IDBCursor,["update","delete"]);["advance","continue","continuePrimaryKey"].forEach(function(r){r in IDBCursor.prototype&&(Cursor.prototype[r]=function(){var e=this,n=arguments;return Promise.resolve().then(function(){return e._cursor[r].apply(e._cursor,n),promisifyRequest(e._request).then(function(s){if(!!s)return new Cursor(s,e._request)})})})});function ObjectStore(r){this._store=r}ObjectStore.prototype.createIndex=function(){return new Index(this._store.createIndex.apply(this._store,arguments))};ObjectStore.prototype.index=function(){return new Index(this._store.index.apply(this._store,arguments))};proxyProperties(ObjectStore,"_store",["name","keyPath","indexNames","autoIncrement"]);proxyRequestMethods(ObjectStore,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]);proxyCursorRequestMethods(ObjectStore,"_store",IDBObjectStore,["openCursor","openKeyCursor"]);proxyMethods(ObjectStore,"_store",IDBObjectStore,["deleteIndex"]);function Transaction(r){this._tx=r,this.complete=new Promise(function(e,n){r.oncomplete=function(){e()},r.onerror=function(){n(r.error)},r.onabort=function(){n(r.error)}})}Transaction.prototype.objectStore=function(){return new ObjectStore(this._tx.objectStore.apply(this._tx,arguments))};proxyProperties(Transaction,"_tx",["objectStoreNames","mode"]);proxyMethods(Transaction,"_tx",IDBTransaction,["abort"]);function UpgradeDB(r,e,n){this._db=r,this.oldVersion=e,this.transaction=new Transaction(n)}UpgradeDB.prototype.createObjectStore=function(){return new ObjectStore(this._db.createObjectStore.apply(this._db,arguments))};proxyProperties(UpgradeDB,"_db",["name","version","objectStoreNames"]);proxyMethods(UpgradeDB,"_db",IDBDatabase,["deleteObjectStore","close"]);function DB(r){this._db=r}DB.prototype.transaction=function(){return new Transaction(this._db.transaction.apply(this._db,arguments))};proxyProperties(DB,"_db",["name","version","objectStoreNames"]);proxyMethods(DB,"_db",IDBDatabase,["close"]);["openCursor","openKeyCursor"].forEach(function(r){[ObjectStore,Index].forEach(function(e){r in e.prototype&&(e.prototype[r.replace("open","iterate")]=function(){var n=toArray(arguments),s=n[n.length-1],a=this._store||this._index,u=a[r].apply(a,n.slice(0,-1));u.onsuccess=function(){s(u.result)}})})});[Index,ObjectStore].forEach(function(r){r.prototype.getAll||(r.prototype.getAll=function(e,n){var s=this,a=[];return new Promise(function(u){s.iterateCursor(e,function(h){if(!h){u(a);return}if(a.push(h.value),n!==void 0&&a.length==n){u(a);return}h.continue()})})})});function openDb(r,e,n){var s=promisifyRequestCall(indexedDB,"open",[r,e]),a=s.request;return a&&(a.onupgradeneeded=function(u){n&&n(new UpgradeDB(a.result,u.oldVersion,a.transaction))}),s.then(function(u){return new DB(u)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PlatformLoggerServiceImpl{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(isVersionServiceProvider(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function isVersionServiceProvider(r){const e=r.getComponent();return(e==null?void 0:e.type)==="VERSION"}const name$o="@firebase/app",version$1$1="0.7.18";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const logger=new Logger("@firebase/app"),name$n="@firebase/app-compat",name$m="@firebase/analytics-compat",name$l="@firebase/analytics",name$k="@firebase/app-check-compat",name$j="@firebase/app-check",name$i="@firebase/auth",name$h="@firebase/auth-compat",name$g="@firebase/database",name$f="@firebase/database-compat",name$e="@firebase/functions",name$d="@firebase/functions-compat",name$c="@firebase/installations",name$b="@firebase/installations-compat",name$a="@firebase/messaging",name$9="@firebase/messaging-compat",name$8="@firebase/performance",name$7="@firebase/performance-compat",name$6="@firebase/remote-config",name$5="@firebase/remote-config-compat",name$4="@firebase/storage",name$3="@firebase/storage-compat",name$2="@firebase/firestore",name$1$1="@firebase/firestore-compat",name$p="firebase",version$2="9.6.8";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DEFAULT_ENTRY_NAME="[DEFAULT]",PLATFORM_LOG_STRING={[name$o]:"fire-core",[name$n]:"fire-core-compat",[name$l]:"fire-analytics",[name$m]:"fire-analytics-compat",[name$j]:"fire-app-check",[name$k]:"fire-app-check-compat",[name$i]:"fire-auth",[name$h]:"fire-auth-compat",[name$g]:"fire-rtdb",[name$f]:"fire-rtdb-compat",[name$e]:"fire-fn",[name$d]:"fire-fn-compat",[name$c]:"fire-iid",[name$b]:"fire-iid-compat",[name$a]:"fire-fcm",[name$9]:"fire-fcm-compat",[name$8]:"fire-perf",[name$7]:"fire-perf-compat",[name$6]:"fire-rc",[name$5]:"fire-rc-compat",[name$4]:"fire-gcs",[name$3]:"fire-gcs-compat",[name$2]:"fire-fst",[name$1$1]:"fire-fst-compat","fire-js":"fire-js",[name$p]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _apps=new Map,_components=new Map;function _addComponent(r,e){try{r.container.addComponent(e)}catch(n){logger.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,n)}}function _registerComponent(r){const e=r.name;if(_components.has(e))return logger.debug(`There were multiple attempts to register component ${e}.`),!1;_components.set(e,r);for(const n of _apps.values())_addComponent(n,r);return!0}function _getProvider(r,e){const n=r.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),r.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ERRORS={["no-app"]:"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",["bad-app-name"]:"Illegal App name: '{$appName}",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function.",["storage-open"]:"Error thrown when opening storage. Original error: {$originalErrorMessage}.",["storage-get"]:"Error thrown when reading from storage. Original error: {$originalErrorMessage}.",["storage-set"]:"Error thrown when writing to storage. Original error: {$originalErrorMessage}.",["storage-delete"]:"Error thrown when deleting from storage. Original error: {$originalErrorMessage}."},ERROR_FACTORY=new ErrorFactory("app","Firebase",ERRORS);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FirebaseAppImpl{constructor(e,n,s){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Component("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ERROR_FACTORY.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SDK_VERSION=version$2;function initializeApp(r,e={}){typeof e!="object"&&(e={name:e});const n=Object.assign({name:DEFAULT_ENTRY_NAME,automaticDataCollectionEnabled:!1},e),s=n.name;if(typeof s!="string"||!s)throw ERROR_FACTORY.create("bad-app-name",{appName:String(s)});const a=_apps.get(s);if(a){if(deepEqual(r,a.options)&&deepEqual(n,a.config))return a;throw ERROR_FACTORY.create("duplicate-app",{appName:s})}const u=new ComponentContainer(s);for(const w of _components.values())u.addComponent(w);const h=new FirebaseAppImpl(r,n,u);return _apps.set(s,h),h}function getApp(r=DEFAULT_ENTRY_NAME){const e=_apps.get(r);if(!e)throw ERROR_FACTORY.create("no-app",{appName:r});return e}function registerVersion(r,e,n){var s;let a=(s=PLATFORM_LOG_STRING[r])!==null&&s!==void 0?s:r;n&&(a+=`-${n}`);const u=a.match(/\s|\//),h=e.match(/\s|\//);if(u||h){const w=[`Unable to register library "${a}" with version "${e}":`];u&&w.push(`library name "${a}" contains illegal characters (whitespace or "/")`),u&&h&&w.push("and"),h&&w.push(`version name "${e}" contains illegal characters (whitespace or "/")`),logger.warn(w.join(" "));return}_registerComponent(new Component(`${a}-version`,()=>({library:a,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DB_NAME$1="firebase-heartbeat-database",DB_VERSION$1=1,STORE_NAME="firebase-heartbeat-store";let dbPromise=null;function getDbPromise(){return dbPromise||(dbPromise=openDb(DB_NAME$1,DB_VERSION$1,r=>{switch(r.oldVersion){case 0:r.createObjectStore(STORE_NAME)}}).catch(r=>{throw ERROR_FACTORY.create("storage-open",{originalErrorMessage:r.message})})),dbPromise}async function readHeartbeatsFromIndexedDB(r){try{return(await getDbPromise()).transaction(STORE_NAME).objectStore(STORE_NAME).get(computeKey(r))}catch(e){throw ERROR_FACTORY.create("storage-get",{originalErrorMessage:e.message})}}async function writeHeartbeatsToIndexedDB(r,e){try{const s=(await getDbPromise()).transaction(STORE_NAME,"readwrite");return await s.objectStore(STORE_NAME).put(e,computeKey(r)),s.complete}catch(n){throw ERROR_FACTORY.create("storage-set",{originalErrorMessage:n.message})}}async function deleteHeartbeatsFromIndexedDB(r){try{const n=(await getDbPromise()).transaction(STORE_NAME,"readwrite");return await n.objectStore(STORE_NAME).delete(computeKey(r)),n.complete}catch(e){throw ERROR_FACTORY.create("storage-delete",{originalErrorMessage:e.message})}}function computeKey(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MAX_HEADER_BYTES=1024,STORED_HEARTBEAT_RETENTION_MAX_MILLIS=30*24*60*60*1e3;class HeartbeatServiceImpl{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new HeartbeatStorageImpl(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=getUTCDateString();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!this._heartbeatsCache.some(a=>a.date===s))return this._heartbeatsCache.push({date:s,userAgent:n}),this._heartbeatsCache=this._heartbeatsCache.filter(a=>{const u=new Date(a.date).valueOf();return Date.now()-u<=STORED_HEARTBEAT_RETENTION_MAX_MILLIS}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null)return"";const{heartbeatsToSend:e,unsentEntries:n}=extractHeartbeatsForHeader(this._heartbeatsCache),s=base64Encode(JSON.stringify({version:2,heartbeats:e}));return n.length>0?(this._heartbeatsCache=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache=null,this._storage.deleteAll()),s}}function getUTCDateString(){return new Date().toISOString().substring(0,10)}function extractHeartbeatsForHeader(r,e=MAX_HEADER_BYTES){const n=[];let s=r.slice();for(const a of r){const u=n.find(h=>h.userAgent===a.userAgent);if(u){if(u.dates.push(a.date),countBytes(n)>e){u.dates.pop();break}}else if(n.push({userAgent:a.userAgent,dates:[a.date]}),countBytes(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class HeartbeatStorageImpl{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return isIndexedDBAvailable()?validateIndexedDBOpenable().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await readHeartbeatsFromIndexedDB(this.app);return(n==null?void 0:n.heartbeats)||[]}else return[]}async overwrite(e){if(await this._canUseIndexedDBPromise)return writeHeartbeatsToIndexedDB(this.app,{heartbeats:e})}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return writeHeartbeatsToIndexedDB(this.app,{heartbeats:[...s,...e]})}else return}async delete(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return writeHeartbeatsToIndexedDB(this.app,{heartbeats:s.filter(a=>!e.includes(a))})}else return}async deleteAll(){if(await this._canUseIndexedDBPromise)return deleteHeartbeatsFromIndexedDB(this.app)}}function countBytes(r){return base64Encode(JSON.stringify({version:2,heartbeats:r})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function registerCoreComponents(r){_registerComponent(new Component("platform-logger",e=>new PlatformLoggerServiceImpl(e),"PRIVATE")),_registerComponent(new Component("heartbeat",e=>new HeartbeatServiceImpl(e),"PRIVATE")),registerVersion(name$o,version$1$1,r),registerVersion(name$o,version$1$1,"esm2017"),registerVersion("fire-js","")}registerCoreComponents("");/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var extendStatics=function(r,e){return extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,s){n.__proto__=s}||function(n,s){for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(n[a]=s[a])},extendStatics(r,e)};function __extends(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");extendStatics(r,e);function n(){this.constructor=r}r.prototype=e===null?Object.create(e):(n.prototype=e.prototype,new n)}function __rest(r,e){var n={};for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&e.indexOf(s)<0&&(n[s]=r[s]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,s=Object.getOwnPropertySymbols(r);a<s.length;a++)e.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(r,s[a])&&(n[s[a]]=r[s[a]]);return n}function __values(r){var e=typeof Symbol=="function"&&Symbol.iterator,n=e&&r[e],s=0;if(n)return n.call(r);if(r&&typeof r.length=="number")return{next:function(){return r&&s>=r.length&&(r=void 0),{value:r&&r[s++],done:!r}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function __read(r,e){var n=typeof Symbol=="function"&&r[Symbol.iterator];if(!n)return r;var s=n.call(r),a,u=[],h;try{for(;(e===void 0||e-- >0)&&!(a=s.next()).done;)u.push(a.value)}catch(w){h={error:w}}finally{try{a&&!a.done&&(n=s.return)&&n.call(s)}finally{if(h)throw h.error}}return u}function __spreadArray(r,e,n){if(n||arguments.length===2)for(var s=0,a=e.length,u;s<a;s++)(u||!(s in e))&&(u||(u=Array.prototype.slice.call(e,0,s)),u[s]=e[s]);return r.concat(u||Array.prototype.slice.call(e))}function _prodErrorMap(){return{["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const prodErrorMap=_prodErrorMap,_DEFAULT_AUTH_ERROR_FACTORY=new ErrorFactory("auth","Firebase",_prodErrorMap());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const logClient=new Logger("@firebase/auth");function _logError(r,...e){logClient.logLevel<=LogLevel.ERROR&&logClient.error(`Auth (${SDK_VERSION}): ${r}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _fail(r,...e){throw createErrorInternal(r,...e)}function _createError(r,...e){return createErrorInternal(r,...e)}function _errorWithCustomMessage(r,e,n){const s=Object.assign(Object.assign({},prodErrorMap()),{[e]:n});return new ErrorFactory("auth","Firebase",s).create(e,{appName:r.name})}function _assertInstanceOf(r,e,n){const s=n;if(!(e instanceof s))throw s.name!==e.constructor.name&&_fail(r,"argument-error"),_errorWithCustomMessage(r,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function createErrorInternal(r,...e){if(typeof r!="string"){const n=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=r.name),r._errorFactory.create(n,...s)}return _DEFAULT_AUTH_ERROR_FACTORY.create(r,...e)}function _assert(r,e,...n){if(!r)throw createErrorInternal(e,...n)}function debugFail(r){const e="INTERNAL ASSERTION FAILED: "+r;throw _logError(e),new Error(e)}function debugAssert(r,e){r||debugFail(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const instanceCache=new Map;function _getInstance(r){debugAssert(r instanceof Function,"Expected a class definition");let e=instanceCache.get(r);return e?(debugAssert(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,instanceCache.set(r,e),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function initializeAuth(r,e){const n=_getProvider(r,"auth");if(n.isInitialized()){const a=n.getImmediate(),u=n.getOptions();if(deepEqual(u,e!=null?e:{}))return a;_fail(a,"already-initialized")}return n.initialize({options:e})}function _initializeAuthInstance(r,e){const n=(e==null?void 0:e.persistence)||[],s=(Array.isArray(n)?n:[n]).map(_getInstance);(e==null?void 0:e.errorMap)&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _getCurrentUrl(){var r;return typeof self!="undefined"&&((r=self.location)===null||r===void 0?void 0:r.href)||""}function _isHttpOrHttps(){return _getCurrentScheme()==="http:"||_getCurrentScheme()==="https:"}function _getCurrentScheme(){var r;return typeof self!="undefined"&&((r=self.location)===null||r===void 0?void 0:r.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _isOnline(){return typeof navigator!="undefined"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(_isHttpOrHttps()||isBrowserExtension()||"connection"in navigator)?navigator.onLine:!0}function _getUserLanguage(){if(typeof navigator=="undefined")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Delay{constructor(e,n){this.shortDelay=e,this.longDelay=n,debugAssert(n>e,"Short delay should be less than long delay!"),this.isMobile=isMobileCordova()||isReactNative()}get(){return _isOnline()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _emulatorUrl(r,e){debugAssert(r.emulator,"Emulator should always be set here");const{url:n}=r.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FetchProvider{static initialize(e,n,s){this.fetchImpl=e,n&&(this.headersImpl=n),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self!="undefined"&&"fetch"in self)return self.fetch;debugFail("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self!="undefined"&&"Headers"in self)return self.Headers;debugFail("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self!="undefined"&&"Response"in self)return self.Response;debugFail("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SERVER_ERROR_MAP={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DEFAULT_API_TIMEOUT_MS=new Delay(3e4,6e4);function _addTidIfNecessary(r,e){return r.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:r.tenantId}):e}async function _performApiRequest(r,e,n,s,a={}){return _performFetchWithErrorHandling(r,a,async()=>{let u={},h={};s&&(e==="GET"?h=s:u={body:JSON.stringify(s)});const w=querystring(Object.assign({key:r.config.apiKey},h)).slice(1),B=await r._getAdditionalHeaders();return B["Content-Type"]="application/json",r.languageCode&&(B["X-Firebase-Locale"]=r.languageCode),FetchProvider.fetch()(_getFinalTarget(r,r.config.apiHost,n,w),Object.assign({method:e,headers:B,referrerPolicy:"no-referrer"},u))})}async function _performFetchWithErrorHandling(r,e,n){r._canInitEmulator=!1;const s=Object.assign(Object.assign({},SERVER_ERROR_MAP),e);try{const a=new NetworkTimeout(r),u=await Promise.race([n(),a.promise]);a.clearNetworkTimeout();const h=await u.json();if("needConfirmation"in h)throw _makeTaggedError(r,"account-exists-with-different-credential",h);if(u.ok&&!("errorMessage"in h))return h;{const w=u.ok?h.errorMessage:h.error.message,[B,k]=w.split(" : ");if(B==="FEDERATED_USER_ID_ALREADY_LINKED")throw _makeTaggedError(r,"credential-already-in-use",h);if(B==="EMAIL_EXISTS")throw _makeTaggedError(r,"email-already-in-use",h);const te=s[B]||B.toLowerCase().replace(/[_\s]+/g,"-");if(k)throw _errorWithCustomMessage(r,te,k);_fail(r,te)}}catch(a){if(a instanceof FirebaseError)throw a;_fail(r,"network-request-failed")}}async function _performSignInRequest(r,e,n,s,a={}){const u=await _performApiRequest(r,e,n,s,a);return"mfaPendingCredential"in u&&_fail(r,"multi-factor-auth-required",{_serverResponse:u}),u}function _getFinalTarget(r,e,n,s){const a=`${e}${n}?${s}`;return r.config.emulator?_emulatorUrl(r.config,a):`${r.config.apiScheme}://${a}`}class NetworkTimeout{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,s)=>{this.timer=setTimeout(()=>s(_createError(this.auth,"network-request-failed")),DEFAULT_API_TIMEOUT_MS.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function _makeTaggedError(r,e,n){const s={appName:r.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const a=_createError(r,e,s);return a.customData._tokenResponse=n,a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function deleteAccount(r,e){return _performApiRequest(r,"POST","/v1/accounts:delete",e)}async function getAccountInfo(r,e){return _performApiRequest(r,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function utcTimestampToDateString(r){if(!!r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function getIdTokenResult(r,e=!1){const n=getModularInstance(r),s=await n.getIdToken(e),a=_parseToken(s);_assert(a&&a.exp&&a.auth_time&&a.iat,n.auth,"internal-error");const u=typeof a.firebase=="object"?a.firebase:void 0,h=u==null?void 0:u.sign_in_provider;return{claims:a,token:s,authTime:utcTimestampToDateString(secondsStringToMilliseconds(a.auth_time)),issuedAtTime:utcTimestampToDateString(secondsStringToMilliseconds(a.iat)),expirationTime:utcTimestampToDateString(secondsStringToMilliseconds(a.exp)),signInProvider:h||null,signInSecondFactor:(u==null?void 0:u.sign_in_second_factor)||null}}function secondsStringToMilliseconds(r){return Number(r)*1e3}function _parseToken(r){const[e,n,s]=r.split(".");if(e===void 0||n===void 0||s===void 0)return _logError("JWT malformed, contained fewer than 3 sections"),null;try{const a=base64Decode(n);return a?JSON.parse(a):(_logError("Failed to decode base64 JWT payload"),null)}catch(a){return _logError("Caught error parsing JWT payload as JSON",a),null}}function _tokenExpiresIn(r){const e=_parseToken(r);return _assert(e,"internal-error"),_assert(typeof e.exp!="undefined","internal-error"),_assert(typeof e.iat!="undefined","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _logoutIfInvalidated(r,e,n=!1){if(n)return e;try{return await e}catch(s){throw s instanceof FirebaseError&&isUserInvalidated(s)&&r.auth.currentUser===r&&await r.auth.signOut(),s}}function isUserInvalidated({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ProactiveRefresh{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){!this.isRunning||(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const s=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),s}else{this.errorBackoff=3e4;const a=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,a)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UserMetadata{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=utcTimestampToDateString(this.lastLoginAt),this.creationTime=utcTimestampToDateString(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _reloadWithoutSaving(r){var e;const n=r.auth,s=await r.getIdToken(),a=await _logoutIfInvalidated(r,getAccountInfo(n,{idToken:s}));_assert(a==null?void 0:a.users.length,n,"internal-error");const u=a.users[0];r._notifyReloadListener(u);const h=((e=u.providerUserInfo)===null||e===void 0?void 0:e.length)?extractProviderData(u.providerUserInfo):[],w=mergeProviderData(r.providerData,h),B=r.isAnonymous,k=!(r.email&&u.passwordHash)&&!(w==null?void 0:w.length),te=B?k:!1,se={uid:u.localId,displayName:u.displayName||null,photoURL:u.photoUrl||null,email:u.email||null,emailVerified:u.emailVerified||!1,phoneNumber:u.phoneNumber||null,tenantId:u.tenantId||null,providerData:w,metadata:new UserMetadata(u.createdAt,u.lastLoginAt),isAnonymous:te};Object.assign(r,se)}async function reload(r){const e=getModularInstance(r);await _reloadWithoutSaving(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function mergeProviderData(r,e){return[...r.filter(s=>!e.some(a=>a.providerId===s.providerId)),...e]}function extractProviderData(r){return r.map(e=>{var{providerId:n}=e,s=__rest(e,["providerId"]);return{providerId:n,uid:s.rawId||"",displayName:s.displayName||null,email:s.email||null,phoneNumber:s.phoneNumber||null,photoURL:s.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function requestStsToken(r,e){const n=await _performFetchWithErrorHandling(r,{},async()=>{const s=querystring({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:a,apiKey:u}=r.config,h=_getFinalTarget(r,a,"/v1/token",`key=${u}`),w=await r._getAdditionalHeaders();return w["Content-Type"]="application/x-www-form-urlencoded",FetchProvider.fetch()(h,{method:"POST",headers:w,body:s})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class StsTokenManager{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){_assert(e.idToken,"internal-error"),_assert(typeof e.idToken!="undefined","internal-error"),_assert(typeof e.refreshToken!="undefined","internal-error");const n="expiresIn"in e&&typeof e.expiresIn!="undefined"?Number(e.expiresIn):_tokenExpiresIn(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}async getToken(e,n=!1){return _assert(!this.accessToken||this.refreshToken,e,"user-token-expired"),!n&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:s,refreshToken:a,expiresIn:u}=await requestStsToken(e,n);this.updateTokensAndExpiration(s,a,Number(u))}updateTokensAndExpiration(e,n,s){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,n){const{refreshToken:s,accessToken:a,expirationTime:u}=n,h=new StsTokenManager;return s&&(_assert(typeof s=="string","internal-error",{appName:e}),h.refreshToken=s),a&&(_assert(typeof a=="string","internal-error",{appName:e}),h.accessToken=a),u&&(_assert(typeof u=="number","internal-error",{appName:e}),h.expirationTime=u),h}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new StsTokenManager,this.toJSON())}_performRefresh(){return debugFail("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function assertStringOrUndefined(r,e){_assert(typeof r=="string"||typeof r=="undefined","internal-error",{appName:e})}class UserImpl{constructor(e){var{uid:n,auth:s,stsTokenManager:a}=e,u=__rest(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new ProactiveRefresh(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=s,this.stsTokenManager=a,this.accessToken=a.accessToken,this.displayName=u.displayName||null,this.email=u.email||null,this.emailVerified=u.emailVerified||!1,this.phoneNumber=u.phoneNumber||null,this.photoURL=u.photoURL||null,this.isAnonymous=u.isAnonymous||!1,this.tenantId=u.tenantId||null,this.providerData=u.providerData?[...u.providerData]:[],this.metadata=new UserMetadata(u.createdAt||void 0,u.lastLoginAt||void 0)}async getIdToken(e){const n=await _logoutIfInvalidated(this,this.stsTokenManager.getToken(this.auth,e));return _assert(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return getIdTokenResult(this,e)}reload(){return reload(this)}_assign(e){this!==e&&(_assert(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){return new UserImpl(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}))}_onReload(e){_assert(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),n&&await _reloadWithoutSaving(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await _logoutIfInvalidated(this,deleteAccount(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var s,a,u,h,w,B,k,te;const se=(s=n.displayName)!==null&&s!==void 0?s:void 0,re=(a=n.email)!==null&&a!==void 0?a:void 0,ue=(u=n.phoneNumber)!==null&&u!==void 0?u:void 0,he=(h=n.photoURL)!==null&&h!==void 0?h:void 0,ve=(w=n.tenantId)!==null&&w!==void 0?w:void 0,ae=(B=n._redirectEventId)!==null&&B!==void 0?B:void 0,fe=(k=n.createdAt)!==null&&k!==void 0?k:void 0,Be=(te=n.lastLoginAt)!==null&&te!==void 0?te:void 0,{uid:Ve,emailVerified:Ct,isAnonymous:Ge,providerData:st,stsTokenManager:xt}=n;_assert(Ve&&xt,e,"internal-error");const Kt=StsTokenManager.fromJSON(this.name,xt);_assert(typeof Ve=="string",e,"internal-error"),assertStringOrUndefined(se,e.name),assertStringOrUndefined(re,e.name),_assert(typeof Ct=="boolean",e,"internal-error"),_assert(typeof Ge=="boolean",e,"internal-error"),assertStringOrUndefined(ue,e.name),assertStringOrUndefined(he,e.name),assertStringOrUndefined(ve,e.name),assertStringOrUndefined(ae,e.name),assertStringOrUndefined(fe,e.name),assertStringOrUndefined(Be,e.name);const _n=new UserImpl({uid:Ve,auth:e,email:re,emailVerified:Ct,displayName:se,isAnonymous:Ge,photoURL:he,phoneNumber:ue,tenantId:ve,stsTokenManager:Kt,createdAt:fe,lastLoginAt:Be});return st&&Array.isArray(st)&&(_n.providerData=st.map(Cr=>Object.assign({},Cr))),ae&&(_n._redirectEventId=ae),_n}static async _fromIdTokenResponse(e,n,s=!1){const a=new StsTokenManager;a.updateFromServerResponse(n);const u=new UserImpl({uid:n.localId,auth:e,stsTokenManager:a,isAnonymous:s});return await _reloadWithoutSaving(u),u}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class InMemoryPersistence{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}InMemoryPersistence.type="NONE";const inMemoryPersistence=InMemoryPersistence;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _persistenceKeyName(r,e,n){return`firebase:${r}:${e}:${n}`}class PersistenceUserManager{constructor(e,n,s){this.persistence=e,this.auth=n,this.userKey=s;const{config:a,name:u}=this.auth;this.fullUserKey=_persistenceKeyName(this.userKey,a.apiKey,u),this.fullPersistenceKey=_persistenceKeyName("persistence",a.apiKey,u),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?UserImpl._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,s="authUser"){if(!n.length)return new PersistenceUserManager(_getInstance(inMemoryPersistence),e,s);const a=(await Promise.all(n.map(async k=>{if(await k._isAvailable())return k}))).filter(k=>k);let u=a[0]||_getInstance(inMemoryPersistence);const h=_persistenceKeyName(s,e.config.apiKey,e.name);let w=null;for(const k of n)try{const te=await k._get(h);if(te){const se=UserImpl._fromJSON(e,te);k!==u&&(w=se),u=k;break}}catch{}const B=a.filter(k=>k._shouldAllowMigration);return!u._shouldAllowMigration||!B.length?new PersistenceUserManager(u,e,s):(u=B[0],w&&await u._set(h,w.toJSON()),await Promise.all(n.map(async k=>{if(k!==u)try{await k._remove(h)}catch{}})),new PersistenceUserManager(u,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _getBrowserName(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(_isIEMobile(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(_isFirefox(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(_isBlackBerry(e))return"Blackberry";if(_isWebOS(e))return"Webos";if(_isSafari(e))return"Safari";if((e.includes("chrome/")||_isChromeIOS(e))&&!e.includes("edge/"))return"Chrome";if(_isAndroid(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=r.match(n);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function _isFirefox(r=getUA()){return/firefox\//i.test(r)}function _isSafari(r=getUA()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function _isChromeIOS(r=getUA()){return/crios\//i.test(r)}function _isIEMobile(r=getUA()){return/iemobile/i.test(r)}function _isAndroid(r=getUA()){return/android/i.test(r)}function _isBlackBerry(r=getUA()){return/blackberry/i.test(r)}function _isWebOS(r=getUA()){return/webos/i.test(r)}function _isIOS(r=getUA()){return/iphone|ipad|ipod/i.test(r)}function _isIOSStandalone(r=getUA()){var e;return _isIOS(r)&&!!((e=window.navigator)===null||e===void 0?void 0:e.standalone)}function _isIE10(){return isIE()&&document.documentMode===10}function _isMobileBrowser(r=getUA()){return _isIOS(r)||_isAndroid(r)||_isWebOS(r)||_isBlackBerry(r)||/windows phone/i.test(r)||_isIEMobile(r)}function _isIframe(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _getClientVersion(r,e=[]){let n;switch(r){case"Browser":n=_getBrowserName(getUA());break;case"Worker":n=`${_getBrowserName(getUA())}-${r}`;break;default:n=r}const s=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${SDK_VERSION}/${s}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AuthImpl{constructor(e,n){this.app=e,this.config=n,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Subscription$1(this),this.idTokenSubscription=new Subscription$1(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=_DEFAULT_AUTH_ERROR_FACTORY,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=n.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=_getInstance(n)),this._initializationPromise=this.queue(async()=>{var s,a;if(!this._deleted&&(this.persistenceManager=await PersistenceUserManager.create(this,e),!this._deleted)){if((s=this._popupRedirectResolver)===null||s===void 0?void 0:s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((a=this.currentUser)===null||a===void 0?void 0:a.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e)}}async initializeCurrentUser(e){var n;let s=await this.assertedPersistence.getCurrentUser();if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,u=s==null?void 0:s._redirectEventId,h=await this.tryRedirectSignIn(e);(!a||a===u)&&(h==null?void 0:h.user)&&(s=h.user)}return s?s._redirectEventId?(_assert(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)):this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await _reloadWithoutSaving(e)}catch(n){if(n.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=_getUserLanguage()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const n=e?getModularInstance(e):null;return n&&_assert(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e){if(!this._deleted)return e&&_assert(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(_getInstance(e))})}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new ErrorFactory("auth","Firebase",e())}onAuthStateChanged(e,n,s){return this.registerStateListener(this.authStateSubscription,e,n,s)}onIdTokenChanged(e,n,s){return this.registerStateListener(this.idTokenSubscription,e,n,s)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const s=await this.getOrInitRedirectPersistenceManager(n);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&_getInstance(e)||this._popupRedirectResolver;_assert(n,this,"argument-error"),this.redirectPersistenceManager=await PersistenceUserManager.create(this,[_getInstance(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,s;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((s=this.redirectUser)===null||s===void 0?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const s=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==s&&(this.lastNotifiedUid=s,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,s,a){if(this._deleted)return()=>{};const u=typeof n=="function"?n:n.next.bind(n),h=this._isInitialized?Promise.resolve():this._initializationPromise;return _assert(h,this,"internal-error"),h.then(()=>u(this.currentUser)),typeof n=="function"?e.addObserver(n,s,a):e.addObserver(n)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&(this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh()),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return _assert(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=_getClientVersion(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={["X-Client-Version"]:this.clientVersion};return this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId),e}}function _castAuth(r){return getModularInstance(r)}class Subscription$1{constructor(e){this.auth=e,this.observer=null,this.addObserver=createSubscribe(n=>this.observer=n)}get next(){return _assert(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AuthCredential{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return debugFail("not implemented")}_getIdTokenResponse(e){return debugFail("not implemented")}_linkToIdToken(e,n){return debugFail("not implemented")}_getReauthenticationResolver(e){return debugFail("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function signInWithIdp(r,e){return _performSignInRequest(r,"POST","/v1/accounts:signInWithIdp",_addTidIfNecessary(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IDP_REQUEST_URI$1="http://localhost";class OAuthCredential extends AuthCredential{constructor(){super(...arguments);this.pendingToken=null}static _fromParams(e){const n=new OAuthCredential(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):_fail("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:a}=n,u=__rest(n,["providerId","signInMethod"]);if(!s||!a)return null;const h=new OAuthCredential(s,a);return h.idToken=u.idToken||void 0,h.accessToken=u.accessToken||void 0,h.secret=u.secret,h.nonce=u.nonce,h.pendingToken=u.pendingToken||null,h}_getIdTokenResponse(e){const n=this.buildRequest();return signInWithIdp(e,n)}_linkToIdToken(e,n){const s=this.buildRequest();return s.idToken=n,signInWithIdp(e,s)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,signInWithIdp(e,n)}buildRequest(){const e={requestUri:IDP_REQUEST_URI$1,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=querystring(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FederatedAuthProvider{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BaseOAuthProvider extends FederatedAuthProvider{constructor(){super(...arguments);this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FacebookAuthProvider extends BaseOAuthProvider{constructor(){super("facebook.com")}static credential(e){return OAuthCredential._fromParams({providerId:FacebookAuthProvider.PROVIDER_ID,signInMethod:FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return FacebookAuthProvider.credentialFromTaggedObject(e)}static credentialFromError(e){return FacebookAuthProvider.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return FacebookAuthProvider.credential(e.oauthAccessToken)}catch{return null}}}FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD="facebook.com";FacebookAuthProvider.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GoogleAuthProvider extends BaseOAuthProvider{constructor(){super("google.com");this.addScope("profile")}static credential(e,n){return OAuthCredential._fromParams({providerId:GoogleAuthProvider.PROVIDER_ID,signInMethod:GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return GoogleAuthProvider.credentialFromTaggedObject(e)}static credentialFromError(e){return GoogleAuthProvider.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:s}=e;if(!n&&!s)return null;try{return GoogleAuthProvider.credential(n,s)}catch{return null}}}GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD="google.com";GoogleAuthProvider.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GithubAuthProvider extends BaseOAuthProvider{constructor(){super("github.com")}static credential(e){return OAuthCredential._fromParams({providerId:GithubAuthProvider.PROVIDER_ID,signInMethod:GithubAuthProvider.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return GithubAuthProvider.credentialFromTaggedObject(e)}static credentialFromError(e){return GithubAuthProvider.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return GithubAuthProvider.credential(e.oauthAccessToken)}catch{return null}}}GithubAuthProvider.GITHUB_SIGN_IN_METHOD="github.com";GithubAuthProvider.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TwitterAuthProvider extends BaseOAuthProvider{constructor(){super("twitter.com")}static credential(e,n){return OAuthCredential._fromParams({providerId:TwitterAuthProvider.PROVIDER_ID,signInMethod:TwitterAuthProvider.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return TwitterAuthProvider.credentialFromTaggedObject(e)}static credentialFromError(e){return TwitterAuthProvider.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:s}=e;if(!n||!s)return null;try{return TwitterAuthProvider.credential(n,s)}catch{return null}}}TwitterAuthProvider.TWITTER_SIGN_IN_METHOD="twitter.com";TwitterAuthProvider.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UserCredentialImpl{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,s,a=!1){const u=await UserImpl._fromIdTokenResponse(e,s,a),h=providerIdForResponse(s);return new UserCredentialImpl({user:u,providerId:h,_tokenResponse:s,operationType:n})}static async _forOperation(e,n,s){await e._updateTokensIfNecessary(s,!0);const a=providerIdForResponse(s);return new UserCredentialImpl({user:e,providerId:a,_tokenResponse:s,operationType:n})}}function providerIdForResponse(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MultiFactorError extends FirebaseError{constructor(e,n,s,a){var u;super(n.code,n.message);this.operationType=s,this.user=a,Object.setPrototypeOf(this,MultiFactorError.prototype),this.customData={appName:e.name,tenantId:(u=e.tenantId)!==null&&u!==void 0?u:void 0,_serverResponse:n.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,n,s,a){return new MultiFactorError(e,n,s,a)}}function _processCredentialSavingMfaContextIfNecessary(r,e,n,s){return(e==="reauthenticate"?n._getReauthenticationResolver(r):n._getIdTokenResponse(r)).catch(u=>{throw u.code==="auth/multi-factor-auth-required"?MultiFactorError._fromErrorAndOperation(r,u,e,s):u})}async function _link$1(r,e,n=!1){const s=await _logoutIfInvalidated(r,e._linkToIdToken(r.auth,await r.getIdToken()),n);return UserCredentialImpl._forOperation(r,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _reauthenticate(r,e,n=!1){const{auth:s}=r,a="reauthenticate";try{const u=await _logoutIfInvalidated(r,_processCredentialSavingMfaContextIfNecessary(s,a,e,r),n);_assert(u.idToken,s,"internal-error");const h=_parseToken(u.idToken);_assert(h,s,"internal-error");const{sub:w}=h;return _assert(r.uid===w,s,"user-mismatch"),UserCredentialImpl._forOperation(r,a,u)}catch(u){throw(u==null?void 0:u.code)==="auth/user-not-found"&&_fail(s,"user-mismatch"),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _signInWithCredential(r,e,n=!1){const s="signIn",a=await _processCredentialSavingMfaContextIfNecessary(r,s,e),u=await UserCredentialImpl._fromIdTokenResponse(r,s,a);return n||await r._updateCurrentUser(u.user),u}function onAuthStateChanged(r,e,n,s){return getModularInstance(r).onAuthStateChanged(e,n,s)}const STORAGE_AVAILABLE_KEY="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BrowserPersistenceClass{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(STORAGE_AVAILABLE_KEY,"1"),this.storage.removeItem(STORAGE_AVAILABLE_KEY),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _iframeCannotSyncWebStorage(){const r=getUA();return _isSafari(r)||_isIOS(r)}const _POLLING_INTERVAL_MS$1=1e3,IE10_LOCAL_STORAGE_SYNC_DELAY=10;class BrowserLocalPersistence extends BrowserPersistenceClass{constructor(){super(()=>window.localStorage,"LOCAL");this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=_iframeCannotSyncWebStorage()&&_isIframe(),this.fallbackToPolling=_isMobileBrowser(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const s=this.storage.getItem(n),a=this.localCache[n];s!==a&&e(n,a,s)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((h,w,B)=>{this.notifyListeners(h,B)});return}const s=e.key;if(n?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const h=this.storage.getItem(s);if(e.newValue!==h)e.newValue!==null?this.storage.setItem(s,e.newValue):this.storage.removeItem(s);else if(this.localCache[s]===e.newValue&&!n)return}const a=()=>{const h=this.storage.getItem(s);!n&&this.localCache[s]===h||this.notifyListeners(s,h)},u=this.storage.getItem(s);_isIE10()&&u!==e.newValue&&e.newValue!==e.oldValue?setTimeout(a,IE10_LOCAL_STORAGE_SYNC_DELAY):a()}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const a of Array.from(s))a(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:s}),!0)})},_POLLING_INTERVAL_MS$1)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}BrowserLocalPersistence.type="LOCAL";const browserLocalPersistence=BrowserLocalPersistence;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BrowserSessionPersistence extends BrowserPersistenceClass{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}BrowserSessionPersistence.type="SESSION";const browserSessionPersistence=BrowserSessionPersistence;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _allSettled(r){return Promise.all(r.map(async e=>{try{const n=await e;return{fulfilled:!0,value:n}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Receiver{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(a=>a.isListeningto(e));if(n)return n;const s=new Receiver(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:s,eventType:a,data:u}=n.data,h=this.handlersMap[a];if(!(h==null?void 0:h.size))return;n.ports[0].postMessage({status:"ack",eventId:s,eventType:a});const w=Array.from(h).map(async k=>k(n.origin,u)),B=await _allSettled(w);n.ports[0].postMessage({status:"done",eventId:s,eventType:a,response:B})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Receiver.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _generateEventId(r="",e=10){let n="";for(let s=0;s<e;s++)n+=Math.floor(Math.random()*10);return r+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sender{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,s=50){const a=typeof MessageChannel!="undefined"?new MessageChannel:null;if(!a)throw new Error("connection_unavailable");let u,h;return new Promise((w,B)=>{const k=_generateEventId("",20);a.port1.start();const te=setTimeout(()=>{B(new Error("unsupported_event"))},s);h={messageChannel:a,onMessage(se){const re=se;if(re.data.eventId===k)switch(re.data.status){case"ack":clearTimeout(te),u=setTimeout(()=>{B(new Error("timeout"))},3e3);break;case"done":clearTimeout(u),w(re.data.response);break;default:clearTimeout(te),clearTimeout(u),B(new Error("invalid_response"));break}}},this.handlers.add(h),a.port1.addEventListener("message",h.onMessage),this.target.postMessage({eventType:e,eventId:k,data:n},[a.port2])}).finally(()=>{h&&this.removeMessageHandler(h)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _window(){return window}function _setWindowLocation(r){_window().location.href=r}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _isWorker(){return typeof _window().WorkerGlobalScope!="undefined"&&typeof _window().importScripts=="function"}async function _getActiveServiceWorker(){if(!(navigator==null?void 0:navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function _getServiceWorkerController(){var r;return((r=navigator==null?void 0:navigator.serviceWorker)===null||r===void 0?void 0:r.controller)||null}function _getWorkerGlobalScope(){return _isWorker()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DB_NAME="firebaseLocalStorageDb",DB_VERSION=1,DB_OBJECTSTORE_NAME="firebaseLocalStorage",DB_DATA_KEYPATH="fbase_key";class DBPromise{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function getObjectStore(r,e){return r.transaction([DB_OBJECTSTORE_NAME],e?"readwrite":"readonly").objectStore(DB_OBJECTSTORE_NAME)}function _deleteDatabase(){const r=indexedDB.deleteDatabase(DB_NAME);return new DBPromise(r).toPromise()}function _openDatabase(){const r=indexedDB.open(DB_NAME,DB_VERSION);return new Promise((e,n)=>{r.addEventListener("error",()=>{n(r.error)}),r.addEventListener("upgradeneeded",()=>{const s=r.result;try{s.createObjectStore(DB_OBJECTSTORE_NAME,{keyPath:DB_DATA_KEYPATH})}catch(a){n(a)}}),r.addEventListener("success",async()=>{const s=r.result;s.objectStoreNames.contains(DB_OBJECTSTORE_NAME)?e(s):(s.close(),await _deleteDatabase(),e(await _openDatabase()))})})}async function _putObject(r,e,n){const s=getObjectStore(r,!0).put({[DB_DATA_KEYPATH]:e,value:n});return new DBPromise(s).toPromise()}async function getObject(r,e){const n=getObjectStore(r,!1).get(e),s=await new DBPromise(n).toPromise();return s===void 0?null:s.value}function _deleteObject(r,e){const n=getObjectStore(r,!0).delete(e);return new DBPromise(n).toPromise()}const _POLLING_INTERVAL_MS=800,_TRANSACTION_RETRY_COUNT=3;class IndexedDBLocalPersistence{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await _openDatabase(),this.db)}async _withRetries(e){let n=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(n++>_TRANSACTION_RETRY_COUNT)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return _isWorker()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Receiver._getInstance(_getWorkerGlobalScope()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await _getActiveServiceWorker(),!this.activeServiceWorker)return;this.sender=new Sender(this.activeServiceWorker);const s=await this.sender._send("ping",{},800);!s||((e=s[0])===null||e===void 0?void 0:e.fulfilled)&&((n=s[0])===null||n===void 0?void 0:n.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||_getServiceWorkerController()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await _openDatabase();return await _putObject(e,STORAGE_AVAILABLE_KEY,"1"),await _deleteObject(e,STORAGE_AVAILABLE_KEY),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(s=>_putObject(s,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(s=>getObject(s,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>_deleteObject(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(a=>{const u=getObjectStore(a,!1).getAll();return new DBPromise(u).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],s=new Set;for(const{fbase_key:a,value:u}of e)s.add(a),JSON.stringify(this.localCache[a])!==JSON.stringify(u)&&(this.notifyListeners(a,u),n.push(a));for(const a of Object.keys(this.localCache))this.localCache[a]&&!s.has(a)&&(this.notifyListeners(a,null),n.push(a));return n}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const a of Array.from(s))a(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),_POLLING_INTERVAL_MS)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}IndexedDBLocalPersistence.type="LOCAL";const indexedDBLocalPersistence=IndexedDBLocalPersistence;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function getScriptParentElement(){var r,e;return(e=(r=document.getElementsByTagName("head"))===null||r===void 0?void 0:r[0])!==null&&e!==void 0?e:document}function _loadJS(r){return new Promise((e,n)=>{const s=document.createElement("script");s.setAttribute("src",r),s.onload=e,s.onerror=a=>{const u=_createError("internal-error");u.customData=a,n(u)},s.type="text/javascript",s.charset="UTF-8",getScriptParentElement().appendChild(s)})}function _generateCallbackName(r){return`__${r}${Math.floor(Math.random()*1e6)}`}new Delay(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _withDefaultResolver(r,e){return e?_getInstance(e):(_assert(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IdpCredential extends AuthCredential{constructor(e){super("custom","custom");this.params=e}_getIdTokenResponse(e){return signInWithIdp(e,this._buildIdpRequest())}_linkToIdToken(e,n){return signInWithIdp(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return signInWithIdp(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function _signIn(r){return _signInWithCredential(r.auth,new IdpCredential(r),r.bypassAuthState)}function _reauth(r){const{auth:e,user:n}=r;return _assert(n,e,"internal-error"),_reauthenticate(n,new IdpCredential(r),r.bypassAuthState)}async function _link(r){const{auth:e,user:n}=r;return _assert(n,e,"internal-error"),_link$1(n,new IdpCredential(r),r.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AbstractPopupRedirectOperation{constructor(e,n,s,a,u=!1){this.auth=e,this.resolver=s,this.user=a,this.bypassAuthState=u,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:s,postBody:a,tenantId:u,error:h,type:w}=e;if(h){this.reject(h);return}const B={auth:this.auth,requestUri:n,sessionId:s,tenantId:u||void 0,postBody:a||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(w)(B))}catch(k){this.reject(k)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return _signIn;case"linkViaPopup":case"linkViaRedirect":return _link;case"reauthViaPopup":case"reauthViaRedirect":return _reauth;default:_fail(this.auth,"internal-error")}}resolve(e){debugAssert(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){debugAssert(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _POLL_WINDOW_CLOSE_TIMEOUT=new Delay(2e3,1e4);async function signInWithPopup(r,e,n){const s=_castAuth(r);_assertInstanceOf(r,e,FederatedAuthProvider);const a=_withDefaultResolver(s,n);return new PopupOperation(s,"signInViaPopup",e,a).executeNotNull()}async function reauthenticateWithPopup(r,e,n){const s=getModularInstance(r);_assertInstanceOf(s.auth,e,FederatedAuthProvider);const a=_withDefaultResolver(s.auth,n);return new PopupOperation(s.auth,"reauthViaPopup",e,a,s).executeNotNull()}class PopupOperation extends AbstractPopupRedirectOperation{constructor(e,n,s,a,u){super(e,n,a,u);this.provider=s,this.authWindow=null,this.pollId=null,PopupOperation.currentPopupAction&&PopupOperation.currentPopupAction.cancel(),PopupOperation.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return _assert(e,this.auth,"internal-error"),e}async onExecution(){debugAssert(this.filter.length===1,"Popup operations only handle one event");const e=_generateEventId();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(_createError(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(_createError(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,PopupOperation.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,s;if((s=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||s===void 0?void 0:s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(_createError(this.auth,"popup-closed-by-user"))},2e3);return}this.pollId=window.setTimeout(e,_POLL_WINDOW_CLOSE_TIMEOUT.get())};e()}}PopupOperation.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PENDING_REDIRECT_KEY="pendingRedirect",redirectOutcomeMap=new Map;class RedirectAction extends AbstractPopupRedirectOperation{constructor(e,n,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,s);this.eventId=null}async execute(){let e=redirectOutcomeMap.get(this.auth._key());if(!e){try{const s=await _getAndClearPendingRedirectStatus(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(n){e=()=>Promise.reject(n)}redirectOutcomeMap.set(this.auth._key(),e)}return this.bypassAuthState||redirectOutcomeMap.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function _getAndClearPendingRedirectStatus(r,e){const n=pendingRedirectKey(e),s=resolverPersistence(r);if(!await s._isAvailable())return!1;const a=await s._get(n)==="true";return await s._remove(n),a}function resolverPersistence(r){return _getInstance(r._redirectPersistence)}function pendingRedirectKey(r){return _persistenceKeyName(PENDING_REDIRECT_KEY,r.config.apiKey,r.name)}async function _getRedirectResult(r,e,n=!1){const s=_castAuth(r),a=_withDefaultResolver(s,e),h=await new RedirectAction(s,a,n).execute();return h&&!n&&(delete h.user._redirectEventId,await s._persistUserIfCurrent(h.user),await s._setRedirectUser(null,e)),h}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const EVENT_DUPLICATION_CACHE_DURATION_MS=10*60*1e3;class AuthEventManager{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(n=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!isRedirectEvent(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var s;if(e.error&&!isNullRedirectEvent(e)){const a=((s=e.error.code)===null||s===void 0?void 0:s.split("auth/")[1])||"internal-error";n.onError(_createError(this.auth,a))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const s=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=EVENT_DUPLICATION_CACHE_DURATION_MS&&this.cachedEventUids.clear(),this.cachedEventUids.has(eventUid(e))}saveEventToCache(e){this.cachedEventUids.add(eventUid(e)),this.lastProcessedEventTime=Date.now()}}function eventUid(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function isNullRedirectEvent({type:r,error:e}){return r==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function isRedirectEvent(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return isNullRedirectEvent(r);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _getProjectConfig(r,e={}){return _performApiRequest(r,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IP_ADDRESS_REGEX=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,HTTP_REGEX=/^https?/;async function _validateOrigin(r){if(r.config.emulator)return;const{authorizedDomains:e}=await _getProjectConfig(r);for(const n of e)try{if(matchDomain(n))return}catch{}_fail(r,"unauthorized-domain")}function matchDomain(r){const e=_getCurrentUrl(),{protocol:n,hostname:s}=new URL(e);if(r.startsWith("chrome-extension://")){const h=new URL(r);return h.hostname===""&&s===""?n==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&h.hostname===s}if(!HTTP_REGEX.test(n))return!1;if(IP_ADDRESS_REGEX.test(r))return s===r;const a=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+a+"|"+a+")$","i").test(s)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NETWORK_TIMEOUT=new Delay(3e4,6e4);function resetUnloadedGapiModules(){const r=_window().___jsl;if(r==null?void 0:r.H){for(const e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let n=0;n<r.CP.length;n++)r.CP[n]=null}}function loadGapi(r){return new Promise((e,n)=>{var s,a,u;function h(){resetUnloadedGapiModules(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{resetUnloadedGapiModules(),n(_createError(r,"network-request-failed"))},timeout:NETWORK_TIMEOUT.get()})}if((a=(s=_window().gapi)===null||s===void 0?void 0:s.iframes)===null||a===void 0?void 0:a.Iframe)e(gapi.iframes.getContext());else if((u=_window().gapi)===null||u===void 0?void 0:u.load)h();else{const w=_generateCallbackName("iframefcb");return _window()[w]=()=>{gapi.load?h():n(_createError(r,"network-request-failed"))},_loadJS(`https://apis.google.com/js/api.js?onload=${w}`).catch(B=>n(B))}}).catch(e=>{throw cachedGApiLoader=null,e})}let cachedGApiLoader=null;function _loadGapi(r){return cachedGApiLoader=cachedGApiLoader||loadGapi(r),cachedGApiLoader}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PING_TIMEOUT=new Delay(5e3,15e3),IFRAME_PATH="__/auth/iframe",EMULATED_IFRAME_PATH="emulator/auth/iframe",IFRAME_ATTRIBUTES={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},EID_FROM_APIHOST=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function getIframeUrl(r){const e=r.config;_assert(e.authDomain,r,"auth-domain-config-required");const n=e.emulator?_emulatorUrl(e,EMULATED_IFRAME_PATH):`https://${r.config.authDomain}/${IFRAME_PATH}`,s={apiKey:e.apiKey,appName:r.name,v:SDK_VERSION},a=EID_FROM_APIHOST.get(r.config.apiHost);a&&(s.eid=a);const u=r._getFrameworks();return u.length&&(s.fw=u.join(",")),`${n}?${querystring(s).slice(1)}`}async function _openIframe(r){const e=await _loadGapi(r),n=_window().gapi;return _assert(n,r,"internal-error"),e.open({where:document.body,url:getIframeUrl(r),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:IFRAME_ATTRIBUTES,dontclear:!0},s=>new Promise(async(a,u)=>{await s.restyle({setHideOnLeave:!1});const h=_createError(r,"network-request-failed"),w=_window().setTimeout(()=>{u(h)},PING_TIMEOUT.get());function B(){_window().clearTimeout(w),a(s)}s.ping(B).then(B,()=>{u(h)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BASE_POPUP_OPTIONS={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},DEFAULT_WIDTH=500,DEFAULT_HEIGHT=600,TARGET_BLANK="_blank",FIREFOX_EMPTY_URL="http://localhost";class AuthPopup{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function _open(r,e,n,s=DEFAULT_WIDTH,a=DEFAULT_HEIGHT){const u=Math.max((window.screen.availHeight-a)/2,0).toString(),h=Math.max((window.screen.availWidth-s)/2,0).toString();let w="";const B=Object.assign(Object.assign({},BASE_POPUP_OPTIONS),{width:s.toString(),height:a.toString(),top:u,left:h}),k=getUA().toLowerCase();n&&(w=_isChromeIOS(k)?TARGET_BLANK:n),_isFirefox(k)&&(e=e||FIREFOX_EMPTY_URL,B.scrollbars="yes");const te=Object.entries(B).reduce((re,[ue,he])=>`${re}${ue}=${he},`,"");if(_isIOSStandalone(k)&&w!=="_self")return openAsNewWindowIOS(e||"",w),new AuthPopup(null);const se=window.open(e||"",w,te);_assert(se,r,"popup-blocked");try{se.focus()}catch{}return new AuthPopup(se)}function openAsNewWindowIOS(r,e){const n=document.createElement("a");n.href=r,n.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WIDGET_PATH="__/auth/handler",EMULATOR_WIDGET_PATH="emulator/auth/handler";function _getRedirectUrl(r,e,n,s,a,u){_assert(r.config.authDomain,r,"auth-domain-config-required"),_assert(r.config.apiKey,r,"invalid-api-key");const h={apiKey:r.config.apiKey,appName:r.name,authType:n,redirectUrl:s,v:SDK_VERSION,eventId:a};if(e instanceof FederatedAuthProvider){e.setDefaultLanguage(r.languageCode),h.providerId=e.providerId||"",isEmpty(e.getCustomParameters())||(h.customParameters=JSON.stringify(e.getCustomParameters()));for(const[B,k]of Object.entries(u||{}))h[B]=k}if(e instanceof BaseOAuthProvider){const B=e.getScopes().filter(k=>k!=="");B.length>0&&(h.scopes=B.join(","))}r.tenantId&&(h.tid=r.tenantId);const w=h;for(const B of Object.keys(w))w[B]===void 0&&delete w[B];return`${getHandlerBase(r)}?${querystring(w).slice(1)}`}function getHandlerBase({config:r}){return r.emulator?_emulatorUrl(r,EMULATOR_WIDGET_PATH):`https://${r.authDomain}/${WIDGET_PATH}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WEB_STORAGE_SUPPORT_KEY="webStorageSupport";class BrowserPopupRedirectResolver{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=browserSessionPersistence,this._completeRedirectFn=_getRedirectResult}async _openPopup(e,n,s,a){var u;debugAssert((u=this.eventManagers[e._key()])===null||u===void 0?void 0:u.manager,"_initialize() not called before _openPopup()");const h=_getRedirectUrl(e,n,s,_getCurrentUrl(),a);return _open(e,h,_generateEventId())}async _openRedirect(e,n,s,a){return await this._originValidation(e),_setWindowLocation(_getRedirectUrl(e,n,s,_getCurrentUrl(),a)),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:a,promise:u}=this.eventManagers[n];return a?Promise.resolve(a):(debugAssert(u,"If manager is not set, promise should be"),u)}const s=this.initAndGetManager(e);return this.eventManagers[n]={promise:s},s.catch(()=>{delete this.eventManagers[n]}),s}async initAndGetManager(e){const n=await _openIframe(e),s=new AuthEventManager(e);return n.register("authEvent",a=>(_assert(a==null?void 0:a.authEvent,e,"invalid-auth-event"),{status:s.onEvent(a.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=n,s}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(WEB_STORAGE_SUPPORT_KEY,{type:WEB_STORAGE_SUPPORT_KEY},a=>{var u;const h=(u=a==null?void 0:a[0])===null||u===void 0?void 0:u[WEB_STORAGE_SUPPORT_KEY];h!==void 0&&n(!!h),_fail(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=_validateOrigin(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return _isMobileBrowser()||_isSafari()||_isIOS()}}const browserPopupRedirectResolver=BrowserPopupRedirectResolver;var name$1="@firebase/auth",version$1="0.19.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AuthInterop{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(s=>{var a;e(((a=s)===null||a===void 0?void 0:a.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);!n||(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){_assert(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function getVersionForPlatform(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function registerAuth(r){_registerComponent(new Component("auth",(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),{apiKey:a,authDomain:u}=s.options;return(h=>{_assert(a&&!a.includes(":"),"invalid-api-key",{appName:h.name}),_assert(!(u==null?void 0:u.includes(":")),"argument-error",{appName:h.name});const w={apiKey:a,authDomain:u,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:_getClientVersion(r)},B=new AuthImpl(h,w);return _initializeAuthInstance(B,n),B})(s)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,s)=>{e.getProvider("auth-internal").initialize()})),_registerComponent(new Component("auth-internal",e=>{const n=_castAuth(e.getProvider("auth").getImmediate());return(s=>new AuthInterop(s))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),registerVersion(name$1,version$1,getVersionForPlatform(r)),registerVersion(name$1,version$1,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function getAuth(r=getApp()){const e=_getProvider(r,"auth");return e.isInitialized()?e.getImmediate():initializeAuth(r,{popupRedirectResolver:browserPopupRedirectResolver,persistence:[indexedDBLocalPersistence,browserLocalPersistence,browserSessionPersistence]})}registerAuth("Browser");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}l.UNAUTHENTICATED=new l(null),l.GOOGLE_CREDENTIALS=new l("google-credentials-uid"),l.FIRST_PARTY=new l("first-party-uid"),l.MOCK_USER=new l("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let f="9.6.7";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d=new Logger("@firebase/firestore");function m(r,...e){if(d.logLevel<=LogLevel.DEBUG){const n=e.map(_$1);d.debug(`Firestore (${f}): ${r}`,...n)}}function p(r,...e){if(d.logLevel<=LogLevel.ERROR){const n=e.map(_$1);d.error(`Firestore (${f}): ${r}`,...n)}}function y(r,...e){if(d.logLevel<=LogLevel.WARN){const n=e.map(_$1);d.warn(`Firestore (${f}): ${r}`,...n)}}function _$1(r){if(typeof r=="string")return r;try{return e=r,JSON.stringify(e)}catch{return r}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function g(r="Unexpected state"){const e=`FIRESTORE (${f}) INTERNAL ASSERTION FAILED: `+r;throw p(e),new Error(e)}function v(r,e){r||g()}function b(r,e){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E="ok",T="cancelled",I="unknown",A="invalid-argument",R="deadline-exceeded",P="not-found",D="permission-denied",N="unauthenticated",$="resource-exhausted",S="failed-precondition",F="aborted",x="out-of-range",q="unimplemented",O="internal",C="unavailable";class U extends FirebaseError{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class M{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(l.UNAUTHENTICATED))}shutdown(){}}class z{constructor(e){this.auth=null,e.onInit(n=>{this.auth=n})}getToken(){return this.auth?this.auth.getToken().then(e=>e?(v(typeof e.accessToken=="string"),new j(e.accessToken,new l(this.auth.getUid()))):null):Promise.resolve(null)}invalidateToken(){}start(e,n){}shutdown(){}}class G{constructor(e,n,s){this.type="FirstParty",this.user=l.FIRST_PARTY,this.headers=new Map,this.headers.set("X-Goog-AuthUser",n);const a=e.auth.getAuthHeaderValueForFirstParty([]);a&&this.headers.set("Authorization",a),s&&this.headers.set("X-Goog-Iam-Authorization-Token",s)}}class Q{constructor(e,n,s){this.t=e,this.i=n,this.o=s}getToken(){return Promise.resolve(new G(this.t,this.i,this.o))}start(e,n){e.enqueueRetryable(()=>n(l.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class W{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Y{constructor(e){this.u=e,this.appCheck=null,e.onInit(n=>{this.appCheck=n})}getToken(){return this.appCheck?this.appCheck.getToken().then(e=>e?(v(typeof e.token=="string"),new W(e.token)):null):Promise.resolve(null)}invalidateToken(){}start(e,n){}shutdown(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H{constructor(e,n,s,a,u,h,w,B){this.databaseId=e,this.appId=n,this.persistenceKey=s,this.host=a,this.ssl=u,this.forceLongPolling=h,this.autoDetectLongPolling=w,this.useFetchStreams=B}}class K{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new K("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof K&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J{constructor(e,n,s){n===void 0?n=0:n>e.length&&g(),s===void 0?s=e.length-n:s>e.length-n&&g(),this.segments=e,this.offset=n,this.len=s}get length(){return this.len}isEqual(e){return J.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof J?e.forEach(s=>{n.push(s)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,s=this.limit();n<s;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const s=Math.min(e.length,n.length);for(let a=0;a<s;a++){const u=e.get(a),h=n.get(a);if(u<h)return-1;if(u>h)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class X extends J{construct(e,n,s){return new X(e,n,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){const n=[];for(const s of e){if(s.indexOf("//")>=0)throw new U(A,`Invalid segment (${s}). Paths must not contain // in them.`);n.push(...s.split("/").filter(a=>a.length>0))}return new X(n)}static emptyPath(){return new X([])}}const Z=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class tt extends J{construct(e,n,s){return new tt(e,n,s)}static isValidIdentifier(e){return Z.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),tt.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new tt(["__name__"])}static fromServerFormat(e){const n=[];let s="",a=0;const u=()=>{if(s.length===0)throw new U(A,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(s),s=""};let h=!1;for(;a<e.length;){const w=e[a];if(w==="\\"){if(a+1===e.length)throw new U(A,"Path has trailing escape character: "+e);const B=e[a+1];if(B!=="\\"&&B!=="."&&B!=="`")throw new U(A,"Path has invalid escape sequence: "+e);s+=B,a+=2}else w==="`"?(h=!h,a++):w!=="."||h?(s+=w,a++):(u(),a++)}if(u(),h)throw new U(A,"Unterminated ` in path: "+e);return new tt(n)}static emptyPath(){return new tt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(e){this.path=e}static fromPath(e){return new et(X.fromString(e))}static fromName(e){return new et(X.fromString(e).popFirst(5))}static empty(){return new et(X.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&X.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return X.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new et(new X(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nt(r,e,n){if(!n)throw new U(A,`Function ${r}() cannot be called with an empty ${e}.`)}function rt(r){if(!et.isDocumentKey(r))throw new U(A,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function it(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const e=function(n){return n.constructor?n.constructor.name:null}(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":g()}function ot(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new U(A,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=it(r);throw new U(A,`Expected type '${e.name}', but it was: ${n}`)}}return r}function at(r){return r===0&&1/r==-1/0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ht={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var lt,ft;function dt(r){if(r===void 0)return p("RPC_ERROR","HTTP error has no status"),I;switch(r){case 200:return E;case 400:return S;case 401:return N;case 403:return D;case 404:return P;case 409:return F;case 416:return x;case 429:return $;case 499:return T;case 500:return I;case 501:return q;case 503:return C;case 504:return R;default:return r>=200&&r<300?E:r>=400&&r<500?S:r>=500&&r<600?O:I}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(ft=lt||(lt={}))[ft.OK=0]="OK",ft[ft.CANCELLED=1]="CANCELLED",ft[ft.UNKNOWN=2]="UNKNOWN",ft[ft.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ft[ft.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ft[ft.NOT_FOUND=5]="NOT_FOUND",ft[ft.ALREADY_EXISTS=6]="ALREADY_EXISTS",ft[ft.PERMISSION_DENIED=7]="PERMISSION_DENIED",ft[ft.UNAUTHENTICATED=16]="UNAUTHENTICATED",ft[ft.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ft[ft.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ft[ft.ABORTED=10]="ABORTED",ft[ft.OUT_OF_RANGE=11]="OUT_OF_RANGE",ft[ft.UNIMPLEMENTED=12]="UNIMPLEMENTED",ft[ft.INTERNAL=13]="INTERNAL",ft[ft.UNAVAILABLE=14]="UNAVAILABLE",ft[ft.DATA_LOSS=15]="DATA_LOSS";class wt extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http";this.h=n+"://"+e.host,this.l="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}m(e,n,s,a,u){const h=this.p(e,n);m("RestConnection","Sending: ",h,s);const w={};return this.g(w,a,u),this.v(e,h,w,s).then(B=>(m("RestConnection","Received: ",B),B),B=>{throw y("RestConnection",`${e} failed with error: `,B,"url: ",h,"request:",s),B})}T(e,n,s,a,u){return this.m(e,n,s,a,u)}g(e,n,s){e["X-Goog-Api-Client"]="gl-js/ fire/"+f,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((a,u)=>e[u]=a),s&&s.headers.forEach((a,u)=>e[u]=a)}p(e,n){const s=ht[e];return`${this.h}/v1/${n}:${s}`}}{constructor(e,n){super(e),this.I=n}A(e,n){throw new Error("Not supported by FetchConnection")}async v(e,n,s,a){const u=JSON.stringify(a);let h;try{h=await this.I(n,{method:"POST",headers:s,body:u})}catch(w){throw new U(dt(w.status),"Request failed with error: "+w.statusText)}if(!h.ok)throw new U(dt(h.status),"Request failed with error: "+h.statusText);return h.json()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mt(r){const e=typeof self!="undefined"&&(self.crypto||self.msCrypto),n=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let s=0;s<r;s++)n[s]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt{static R(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let s="";for(;s.length<20;){const a=mt(40);for(let u=0;u<a.length;++u)s.length<20&&a[u]<n&&(s+=e.charAt(a[u]%e.length))}return s}}function yt(r,e){return r<e?-1:r>e?1:0}function _t(r,e,n){return r.length===e.length&&r.every((s,a)=>n(s,e[a]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new U(A,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new U(A,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new U(A,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new U(A,"Timestamp seconds out of range: "+e)}static now(){return gt.fromMillis(Date.now())}static fromDate(e){return gt.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),s=Math.floor(1e6*(e-1e3*n));return new gt(n,s)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?yt(this.nanoseconds,e.nanoseconds):yt(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(e){this.timestamp=e}static fromTimestamp(e){return new vt(e)}static min(){return new vt(new gt(0,0))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bt(r){let e=0;for(const n in r)Object.prototype.hasOwnProperty.call(r,n)&&e++;return e}function Et(r,e){for(const n in r)Object.prototype.hasOwnProperty.call(r,n)&&e(n,r[n])}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(e){this.fields=e,e.sort(tt.comparator)}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return _t(this.fields,e.fields,(n,s)=>n.isEqual(s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{constructor(e){this.binaryString=e}static fromBase64String(e){const n=atob(e);return new It(n)}static fromUint8Array(e){const n=function(s){let a="";for(let u=0;u<s.length;++u)a+=String.fromCharCode(s[u]);return a}(e);return new It(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return yt(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}It.EMPTY_BYTE_STRING=new It("");const At=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Rt(r){if(v(!!r),typeof r=="string"){let e=0;const n=At.exec(r);if(v(!!n),n[1]){let a=n[1];a=(a+"000000000").substr(0,9),e=Number(a)}const s=new Date(r);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:Pt(r.seconds),nanos:Pt(r.nanos)}}function Pt(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function Vt(r){return typeof r=="string"?It.fromBase64String(r):It.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dt(r){var e,n;return((n=(((e=r==null?void 0:r.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function Nt(r){const e=r.mapValue.fields.__previous_value__;return Dt(e)?Nt(e):e}function $t(r){const e=Rt(r.mapValue.fields.__local_write_time__.timestampValue);return new gt(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function St(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?Dt(r)?4:10:g()}function Ft(r,e){if(r===e)return!0;const n=St(r);if(n!==St(e))return!1;switch(n){case 0:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return $t(r).isEqual($t(e));case 3:return function(s,a){if(typeof s.timestampValue=="string"&&typeof a.timestampValue=="string"&&s.timestampValue.length===a.timestampValue.length)return s.timestampValue===a.timestampValue;const u=Rt(s.timestampValue),h=Rt(a.timestampValue);return u.seconds===h.seconds&&u.nanos===h.nanos}(r,e);case 5:return r.stringValue===e.stringValue;case 6:return function(s,a){return Vt(s.bytesValue).isEqual(Vt(a.bytesValue))}(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return function(s,a){return Pt(s.geoPointValue.latitude)===Pt(a.geoPointValue.latitude)&&Pt(s.geoPointValue.longitude)===Pt(a.geoPointValue.longitude)}(r,e);case 2:return function(s,a){if("integerValue"in s&&"integerValue"in a)return Pt(s.integerValue)===Pt(a.integerValue);if("doubleValue"in s&&"doubleValue"in a){const u=Pt(s.doubleValue),h=Pt(a.doubleValue);return u===h?at(u)===at(h):isNaN(u)&&isNaN(h)}return!1}(r,e);case 9:return _t(r.arrayValue.values||[],e.arrayValue.values||[],Ft);case 10:return function(s,a){const u=s.mapValue.fields||{},h=a.mapValue.fields||{};if(bt(u)!==bt(h))return!1;for(const w in u)if(u.hasOwnProperty(w)&&(h[w]===void 0||!Ft(u[w],h[w])))return!1;return!0}(r,e);default:return g()}}function jt(r){return!!r&&"mapValue"in r}function Mt(r){if(r.geoPointValue)return{geoPointValue:Object.assign({},r.geoPointValue)};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:Object.assign({},r.timestampValue)};if(r.mapValue){const e={mapValue:{fields:{}}};return Et(r.mapValue.fields,(n,s)=>e.mapValue.fields[n]=Mt(s)),e}if(r.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(r.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Mt(r.arrayValue.values[n]);return e}return Object.assign({},r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e){this.value=e}static empty(){return new Bt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let s=0;s<e.length-1;++s)if(n=(n.mapValue.fields||{})[e.get(s)],!jt(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=Mt(n)}setAll(e){let n=tt.emptyPath(),s={},a=[];e.forEach((h,w)=>{if(!n.isImmediateParentOf(w)){const B=this.getFieldsMap(n);this.applyChanges(B,s,a),s={},a=[],n=w.popLast()}h?s[w.lastSegment()]=Mt(h):a.push(w.lastSegment())});const u=this.getFieldsMap(n);this.applyChanges(u,s,a)}delete(e){const n=this.field(e.popLast());jt(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return Ft(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let s=0;s<e.length;++s){let a=n.mapValue.fields[e.get(s)];jt(a)&&a.mapValue.fields||(a={mapValue:{fields:{}}},n.mapValue.fields[e.get(s)]=a),n=a}return n.mapValue.fields}applyChanges(e,n,s){Et(n,(a,u)=>e[a]=u);for(const a of s)delete e[a]}clone(){return new Bt(Mt(this.value))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(e,n,s,a,u,h){this.key=e,this.documentType=n,this.version=s,this.readTime=a,this.data=u,this.documentState=h}static newInvalidDocument(e){return new zt(e,0,vt.min(),vt.min(),Bt.empty(),0)}static newFoundDocument(e,n,s){return new zt(e,1,n,vt.min(),s,0)}static newNoDocument(e,n){return new zt(e,2,n,vt.min(),Bt.empty(),0)}static newUnknownDocument(e,n){return new zt(e,3,n,vt.min(),Bt.empty(),2)}convertToFoundDocument(e,n){return this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Bt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Bt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof zt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new zt(this.key,this.documentType,this.version,this.readTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oe{constructor(e,n=null,s=[],a=[],u=null,h="F",w=null,B=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=s,this.filters=a,this.limit=u,this.limitType=h,this.startAt=w,this.endAt=B,this.$=null,this.S=null,this.startAt,this.endAt}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function we(r,e){return function(n){return typeof n=="number"&&Number.isInteger(n)&&!at(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}(e)?function(n){return{integerValue:""+n}}(e):function(n,s){if(n.F){if(isNaN(s))return{doubleValue:"NaN"};if(s===1/0)return{doubleValue:"Infinity"};if(s===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:at(s)?"-0":s}}(r,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(){this._=void 0}}class pe extends me{}class ye extends me{constructor(e){super(),this.elements=e}}class _e extends me{constructor(e){super(),this.elements=e}}class ge extends me{constructor(e,n){super(),this.q=e,this.O=n}}class be{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new be}static exists(e){return new be(void 0,e)}static updateTime(e){return new be(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}class Ee{}class Te extends Ee{constructor(e,n,s,a=[]){super(),this.key=e,this.value=n,this.precondition=s,this.fieldTransforms=a,this.type=0}}class Ie extends Ee{constructor(e,n,s,a,u=[]){super(),this.key=e,this.data=n,this.fieldMask=s,this.precondition=a,this.fieldTransforms=u,this.type=1}}class Ae extends Ee{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}}class Re extends Ee{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}}class De{constructor(e,n){this.databaseId=e,this.F=n}}function Ne(r,e){return r.F?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function $e(r,e){return r.F?e.toBase64():e.toUint8Array()}function Se(r,e){return Ne(r,e.toTimestamp())}function Fe(r){return v(!!r),vt.fromTimestamp(function(e){const n=Rt(e);return new gt(n.seconds,n.nanos)}(r))}function xe(r,e){return function(n){return new X(["projects",n.projectId,"databases",n.database])}(r).child("documents").child(e).canonicalString()}function qe(r,e){return xe(r.databaseId,e.path)}function Oe(r,e){const n=function(a){const u=X.fromString(a);return v(We(u)),u}(e);if(n.get(1)!==r.databaseId.projectId)throw new U(A,"Tried to deserialize key from different project: "+n.get(1)+" vs "+r.databaseId.projectId);if(n.get(3)!==r.databaseId.database)throw new U(A,"Tried to deserialize key from different database: "+n.get(3)+" vs "+r.databaseId.database);return new et((v((s=n).length>4&&s.get(4)==="documents"),s.popFirst(5)));var s}function Le(r){return new X(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function Ue(r,e,n){return{name:qe(r,e),fields:n.value.mapValue.fields}}function ke(r,e){return"found"in e?function(n,s){v(!!s.found),s.found.name,s.found.updateTime;const a=Oe(n,s.found.name),u=Fe(s.found.updateTime),h=new Bt({mapValue:{fields:s.found.fields}});return zt.newFoundDocument(a,u,h)}(r,e):"missing"in e?function(n,s){v(!!s.missing),v(!!s.readTime);const a=Oe(n,s.missing),u=Fe(s.readTime);return zt.newNoDocument(a,u)}(r,e):g()}function je(r,e){let n;if(e instanceof Te)n={update:Ue(r,e.key,e.value)};else if(e instanceof Ae)n={delete:qe(r,e.key)};else if(e instanceof Ie)n={update:Ue(r,e.key,e.data),updateMask:Qe(e.fieldMask)};else{if(!(e instanceof Re))return g();n={verify:qe(r,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(s=>function(a,u){const h=u.transform;if(h instanceof pe)return{fieldPath:u.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(h instanceof ye)return{fieldPath:u.field.canonicalString(),appendMissingElements:{values:h.elements}};if(h instanceof _e)return{fieldPath:u.field.canonicalString(),removeAllFromArray:{values:h.elements}};if(h instanceof ge)return{fieldPath:u.field.canonicalString(),increment:h.O};throw g()}(0,s))),e.precondition.isNone||(n.currentDocument=function(s,a){return a.updateTime!==void 0?{updateTime:Se(s,a.updateTime)}:a.exists!==void 0?{exists:a.exists}:g()}(r,e.precondition)),n}function Qe(r){const e=[];return r.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function We(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ye(r){return new De(r,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke extends class{}{constructor(e,n,s,a){super(),this.authCredentials=e,this.appCheckCredentials=n,this.K=s,this.q=a,this.J=!1}X(){if(this.J)throw new U(S,"The client has already been terminated.")}m(e,n,s){return this.X(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,u])=>this.K.m(e,n,s,a,u)).catch(a=>{throw a.name==="FirebaseError"?(a.code===N&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new U(I,a.toString())})}T(e,n,s){return this.X(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,u])=>this.K.T(e,n,s,a,u)).catch(a=>{throw a.name==="FirebaseError"?(a.code===N&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new U(I,a.toString())})}terminate(){this.J=!0}}async function Je(r,e){const n=b(r),s=Le(n.q)+"/documents",a={writes:e.map(u=>je(n.q,u))};await n.m("Commit",s,a)}async function Xe(r,e){const n=b(r),s=Le(n.q)+"/documents",a={documents:e.map(B=>qe(n.q,B))},u=await n.T("BatchGetDocuments",s,a),h=new Map;u.forEach(B=>{const k=ke(n.q,B);h.set(k.key.toString(),k)});const w=[];return e.forEach(B=>{const k=h.get(B.toString());v(!!k),w.push(k)}),w}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tn=new Map;function en(r){if(r._terminated)throw new U(S,"The client has already been terminated.");if(!tn.has(r)){m("ComponentProvider","Initializing Datastore");const u=function(B){return new wt(B,fetch.bind(null))}((e=r._databaseId,n=r.app.options.appId||"",s=r._persistenceKey,a=r._freezeSettings(),new H(e,n,s,a.host,a.ssl,a.experimentalForceLongPolling,a.experimentalAutoDetectLongPolling,a.useFetchStreams))),h=Ye(r._databaseId),w=function(B,k,te,se){return new Ke(B,k,te,se)}(r._authCredentials,r._appCheckCredentials,u,h);tn.set(r,w)}var e,n,s,a;/**
* @license
* Copyright 2018 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return tn.get(r)}class nn{constructor(e){var n;if(e.host===void 0){if(e.ssl!==void 0)throw new U(A,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new U(A,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.useFetchStreams=!!e.useFetchStreams,function(s,a,u,h){if(a===!0&&h===!0)throw new U(A,`${s} and ${u} cannot be used together.`)}("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling)}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn{constructor(e,n,s){this._authCredentials=n,this._appCheckCredentials=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new nn({}),this._settingsFrozen=!1,e instanceof K?this._databaseId=e:(this._app=e,this._databaseId=function(a){if(!Object.prototype.hasOwnProperty.apply(a.options,["projectId"]))throw new U(A,'"projectId" not provided in firebase.initializeApp.');return new K(a.options.projectId)}(e))}get app(){if(!this._app)throw new U(S,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new U(S,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new nn(e),e.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new M;switch(n.type){case"gapi":const s=n.client;return v(!(typeof s!="object"||s===null||!s.auth||!s.auth.getAuthHeaderValueForFirstParty)),new Q(s,n.sessionIndex||"0",n.iamToken||null);case"provider":return n.client;default:throw new U(A,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const n=tn.get(e);n&&(m("ComponentProvider","Removing Datastore"),tn.delete(e),n.terminate())}(this),Promise.resolve()}}function on(r=getApp()){return _getProvider(r,"firestore/lite").getImmediate()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an{constructor(e,n,s){this.converter=n,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ln(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new an(this.firestore,e,this._key)}}class hn{constructor(e,n,s){this.converter=n,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new hn(this.firestore,e,this._query)}}class ln extends hn{constructor(e,n,s){super(e,n,new oe(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new an(this.firestore,null,new et(e))}withConverter(e){return new ln(this.firestore,e,this._path)}}function wn(r,e,...n){if(r=getModularInstance(r),arguments.length===1&&(e=pt.R()),nt("doc","path",e),r instanceof rn){const s=X.fromString(e,...n);return rt(s),new an(r,null,new et(s))}{if(!(r instanceof an||r instanceof ln))throw new U(A,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=r._path.child(X.fromString(e,...n));return rt(s),new an(r.firestore,r instanceof ln?r.converter:null,new et(s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new U(A,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new tt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new gn(It.fromBase64String(e))}catch(n){throw new U(A,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new gn(It.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vn{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new U(A,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new U(A,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return yt(this._lat,e._lat)||yt(this._long,e._long)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const En=/^__.*__$/;class Tn{constructor(e,n,s){this.data=e,this.fieldMask=n,this.fieldTransforms=s}toMutation(e,n){return this.fieldMask!==null?new Ie(e,this.data,this.fieldMask,n,this.fieldTransforms):new Te(e,this.data,n,this.fieldTransforms)}}function An(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw g()}}class Rn{constructor(e,n,s,a,u,h){this.settings=e,this.databaseId=n,this.q=s,this.ignoreUndefinedProperties=a,u===void 0&&this.Z(),this.fieldTransforms=u||[],this.fieldMask=h||[]}get path(){return this.settings.path}get tt(){return this.settings.tt}et(e){return new Rn(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.q,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}nt(e){var n;const s=(n=this.path)===null||n===void 0?void 0:n.child(e),a=this.et({path:s,rt:!1});return a.st(e),a}it(e){var n;const s=(n=this.path)===null||n===void 0?void 0:n.child(e),a=this.et({path:s,rt:!1});return a.Z(),a}ot(e){return this.et({path:void 0,rt:!0})}ut(e){return Qn(e,this.settings.methodName,this.settings.ct||!1,this.path,this.settings.at)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}Z(){if(this.path)for(let e=0;e<this.path.length;e++)this.st(this.path.get(e))}st(e){if(e.length===0)throw this.ut("Document fields must not be empty");if(An(this.tt)&&En.test(e))throw this.ut('Document fields cannot begin and end with "__"')}}class Pn{constructor(e,n,s){this.databaseId=e,this.ignoreUndefinedProperties=n,this.q=s||Ye(e)}ht(e,n,s,a=!1){return new Rn({tt:e,methodName:n,at:s,path:tt.emptyPath(),rt:!1,ct:a},this.databaseId,this.q,this.ignoreUndefinedProperties)}}function Vn(r){const e=r._freezeSettings(),n=Ye(r._databaseId);return new Pn(r._databaseId,!!e.ignoreUndefinedProperties,n)}function Dn(r,e,n,s,a,u={}){const h=r.ht(u.merge||u.mergeFields?2:0,e,n,a);Mn("Data must be an object, but it was:",h,s);const w=kn(s,h);let B,k;if(u.merge)B=new Tt(h.fieldMask),k=h.fieldTransforms;else if(u.mergeFields){const te=[];for(const se of u.mergeFields){const re=Bn(e,se,n);if(!h.contains(re))throw new U(A,`Field '${re}' is specified in your field mask but missing from your input data.`);Wn(te,re)||te.push(re)}B=new Tt(te),k=h.fieldTransforms.filter(se=>B.covers(se.field))}else B=null,k=h.fieldTransforms;return new Tn(new Bt(w),B,k)}function Un(r,e){if(jn(r=getModularInstance(r)))return Mn("Unsupported field value:",e,r),kn(r,e);if(r instanceof vn)return function(n,s){if(!An(s.tt))throw s.ut(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.ut(`${n._methodName}() is not currently supported inside arrays`);const a=n._toFieldTransform(s);a&&s.fieldTransforms.push(a)}(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.rt&&e.tt!==4)throw e.ut("Nested arrays are not supported");return function(n,s){const a=[];let u=0;for(const h of n){let w=Un(h,s.ot(u));w==null&&(w={nullValue:"NULL_VALUE"}),a.push(w),u++}return{arrayValue:{values:a}}}(r,e)}return function(n,s){if((n=getModularInstance(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return we(s.q,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const a=gt.fromDate(n);return{timestampValue:Ne(s.q,a)}}if(n instanceof gt){const a=new gt(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:Ne(s.q,a)}}if(n instanceof bn)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof gn)return{bytesValue:$e(s.q,n._byteString)};if(n instanceof an){const a=s.databaseId,u=n.firestore._databaseId;if(!u.isEqual(a))throw s.ut(`Document reference is for database ${u.projectId}/${u.database} but should be for database ${a.projectId}/${a.database}`);return{referenceValue:xe(n.firestore._databaseId||s.databaseId,n._key.path)}}throw s.ut(`Unsupported field value: ${it(n)}`)}(r,e)}function kn(r,e){const n={};return function(s){for(const a in s)if(Object.prototype.hasOwnProperty.call(s,a))return!1;return!0}(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Et(r,(s,a)=>{const u=Un(a,e.nt(s));u!=null&&(n[s]=u)}),{mapValue:{fields:n}}}function jn(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof gt||r instanceof bn||r instanceof gn||r instanceof an||r instanceof vn)}function Mn(r,e,n){if(!jn(n)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(n)){const s=it(n);throw s==="an object"?e.ut(r+" a custom object"):e.ut(r+" "+s)}}function Bn(r,e,n){if((e=getModularInstance(e))instanceof yn)return e._internalPath;if(typeof e=="string")return Gn(r,e);throw Qn("Field path arguments must be of type string or ",r,!1,void 0,n)}const zn=new RegExp("[~\\*/\\[\\]]");function Gn(r,e,n){if(e.search(zn)>=0)throw Qn(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,n);try{return new yn(...e.split("."))._internalPath}catch{throw Qn(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,n)}}function Qn(r,e,n,s,a){const u=s&&!s.isEmpty(),h=a!==void 0;let w=`Function ${e}() called with invalid data`;n&&(w+=" (via `toFirestore()`)"),w+=". ";let B="";return(u||h)&&(B+=" (found",u&&(B+=` in field ${s}`),h&&(B+=` in document ${a}`),B+=")"),new U(A,w+r+B)}function Wn(r,e){return r.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yn{constructor(e,n,s,a,u){this._firestore=e,this._userDataWriter=n,this._key=s,this._document=a,this._converter=u}get id(){return this._key.path.lastSegment()}get ref(){return new an(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Hn(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(Xn("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class Hn extends Yn{data(){return super.data()}}function Xn(r,e){return typeof e=="string"?Gn(r,e):e instanceof yn?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _r(r,e,n){let s;return s=r?n&&(n.merge||n.mergeFields)?r.toFirestore(e,n):r.toFirestore(e):e,s}class gr extends class{convertValue(e,n="none"){switch(St(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Pt(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(Vt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 10:return this.convertObject(e.mapValue,n);default:throw g()}}convertObject(e,n){const s={};return Et(e.fields,(a,u)=>{s[a]=this.convertValue(u,n)}),s}convertGeoPoint(e){return new bn(Pt(e.latitude),Pt(e.longitude))}convertArray(e,n){return(e.values||[]).map(s=>this.convertValue(s,n))}convertServerTimestamp(e,n){switch(n){case"previous":const s=Nt(e);return s==null?null:this.convertValue(s,n);case"estimate":return this.convertTimestamp($t(e));default:return null}}convertTimestamp(e){const n=Rt(e);return new gt(n.seconds,n.nanos)}convertDocumentKey(e,n){const s=X.fromString(e);v(We(s));const a=new K(s.get(1),s.get(3)),u=new et(s.popFirst(5));return a.isEqual(n)||p(`Document ${u} contains a document reference within a different database (${a.projectId}/${a.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),u}}{constructor(e){super(),this.firestore=e}convertBytes(e){return new gn(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new an(this.firestore,null,n)}}function vr(r){const e=en((r=ot(r,an)).firestore),n=new gr(r.firestore);return Xe(e,[r._key]).then(s=>{v(s.length===1);const a=s[0];return new Yn(r.firestore,n,r._key,a.isFoundDocument()?a:null,r.converter)})}function Er(r,e,n){const s=_r((r=ot(r,an)).converter,e,n),a=Dn(Vn(r.firestore),"setDoc",r._key,s,r.converter!==null,n);return Je(en(r.firestore),[a.toMutation(r._key,be.none())])}function Ir(r){return Je(en((r=ot(r,an)).firestore),[new Ae(r._key,be.none())])}(function(r){f=r})(`${SDK_VERSION}_lite`),_registerComponent(new Component("firestore/lite",(r,{options:e})=>{const n=r.getProvider("app").getImmediate(),s=new rn(n,new z(r.getProvider("auth-internal")),new Y(r.getProvider("app-check-internal")));return e&&s._setSettings(e),s},"PUBLIC")),registerVersion("firestore-lite","3.4.5",""),registerVersion("firestore-lite","3.4.5","esm2017");var name="firebase",version="9.6.8";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */registerVersion(name,version,"app");function isFunction(r){return typeof r=="function"}function createErrorClass(r){var e=function(s){Error.call(s),s.stack=new Error().stack},n=r(e);return n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,n}var UnsubscriptionError=createErrorClass(function(r){return function(n){r(this),this.message=n?n.length+` errors occurred during unsubscription:
`+n.map(function(s,a){return a+1+") "+s.toString()}).join(`
  `):"",this.name="UnsubscriptionError",this.errors=n}});function arrRemove(r,e){if(r){var n=r.indexOf(e);0<=n&&r.splice(n,1)}}var Subscription=function(){function r(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._teardowns=null}return r.prototype.unsubscribe=function(){var e,n,s,a,u;if(!this.closed){this.closed=!0;var h=this._parentage;if(h)if(this._parentage=null,Array.isArray(h))try{for(var w=__values(h),B=w.next();!B.done;B=w.next()){var k=B.value;k.remove(this)}}catch(ve){e={error:ve}}finally{try{B&&!B.done&&(n=w.return)&&n.call(w)}finally{if(e)throw e.error}}else h.remove(this);var te=this.initialTeardown;if(isFunction(te))try{te()}catch(ve){u=ve instanceof UnsubscriptionError?ve.errors:[ve]}var se=this._teardowns;if(se){this._teardowns=null;try{for(var re=__values(se),ue=re.next();!ue.done;ue=re.next()){var he=ue.value;try{execTeardown(he)}catch(ve){u=u!=null?u:[],ve instanceof UnsubscriptionError?u=__spreadArray(__spreadArray([],__read(u)),__read(ve.errors)):u.push(ve)}}}catch(ve){s={error:ve}}finally{try{ue&&!ue.done&&(a=re.return)&&a.call(re)}finally{if(s)throw s.error}}}if(u)throw new UnsubscriptionError(u)}},r.prototype.add=function(e){var n;if(e&&e!==this)if(this.closed)execTeardown(e);else{if(e instanceof r){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._teardowns=(n=this._teardowns)!==null&&n!==void 0?n:[]).push(e)}},r.prototype._hasParent=function(e){var n=this._parentage;return n===e||Array.isArray(n)&&n.includes(e)},r.prototype._addParent=function(e){var n=this._parentage;this._parentage=Array.isArray(n)?(n.push(e),n):n?[n,e]:e},r.prototype._removeParent=function(e){var n=this._parentage;n===e?this._parentage=null:Array.isArray(n)&&arrRemove(n,e)},r.prototype.remove=function(e){var n=this._teardowns;n&&arrRemove(n,e),e instanceof r&&e._removeParent(this)},r.EMPTY=function(){var e=new r;return e.closed=!0,e}(),r}(),EMPTY_SUBSCRIPTION=Subscription.EMPTY;function isSubscription(r){return r instanceof Subscription||r&&"closed"in r&&isFunction(r.remove)&&isFunction(r.add)&&isFunction(r.unsubscribe)}function execTeardown(r){isFunction(r)?r():r.unsubscribe()}var config={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1},timeoutProvider={setTimeout:function(){for(var r=[],e=0;e<arguments.length;e++)r[e]=arguments[e];var n=timeoutProvider.delegate;return((n==null?void 0:n.setTimeout)||setTimeout).apply(void 0,__spreadArray([],__read(r)))},clearTimeout:function(r){var e=timeoutProvider.delegate;return((e==null?void 0:e.clearTimeout)||clearTimeout)(r)},delegate:void 0};function reportUnhandledError(r){timeoutProvider.setTimeout(function(){throw r})}function noop$1(){}var COMPLETE_NOTIFICATION=function(){return createNotification("C",void 0,void 0)}();function errorNotification(r){return createNotification("E",void 0,r)}function nextNotification(r){return createNotification("N",r,void 0)}function createNotification(r,e,n){return{kind:r,value:e,error:n}}var context=null;function errorContext(r){if(config.useDeprecatedSynchronousErrorHandling){var e=!context;if(e&&(context={errorThrown:!1,error:null}),r(),e){var n=context,s=n.errorThrown,a=n.error;if(context=null,s)throw a}}else r()}var Subscriber=function(r){__extends(e,r);function e(n){var s=r.call(this)||this;return s.isStopped=!1,n?(s.destination=n,isSubscription(n)&&n.add(s)):s.destination=EMPTY_OBSERVER,s}return e.create=function(n,s,a){return new SafeSubscriber(n,s,a)},e.prototype.next=function(n){this.isStopped?handleStoppedNotification(nextNotification(n),this):this._next(n)},e.prototype.error=function(n){this.isStopped?handleStoppedNotification(errorNotification(n),this):(this.isStopped=!0,this._error(n))},e.prototype.complete=function(){this.isStopped?handleStoppedNotification(COMPLETE_NOTIFICATION,this):(this.isStopped=!0,this._complete())},e.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,r.prototype.unsubscribe.call(this),this.destination=null)},e.prototype._next=function(n){this.destination.next(n)},e.prototype._error=function(n){try{this.destination.error(n)}finally{this.unsubscribe()}},e.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},e}(Subscription),_bind=Function.prototype.bind;function bind(r,e){return _bind.call(r,e)}var ConsumerObserver=function(){function r(e){this.partialObserver=e}return r.prototype.next=function(e){var n=this.partialObserver;if(n.next)try{n.next(e)}catch(s){handleUnhandledError(s)}},r.prototype.error=function(e){var n=this.partialObserver;if(n.error)try{n.error(e)}catch(s){handleUnhandledError(s)}else handleUnhandledError(e)},r.prototype.complete=function(){var e=this.partialObserver;if(e.complete)try{e.complete()}catch(n){handleUnhandledError(n)}},r}(),SafeSubscriber=function(r){__extends(e,r);function e(n,s,a){var u=r.call(this)||this,h;if(isFunction(n)||!n)h={next:n!=null?n:void 0,error:s!=null?s:void 0,complete:a!=null?a:void 0};else{var w;u&&config.useDeprecatedNextContext?(w=Object.create(n),w.unsubscribe=function(){return u.unsubscribe()},h={next:n.next&&bind(n.next,w),error:n.error&&bind(n.error,w),complete:n.complete&&bind(n.complete,w)}):h=n}return u.destination=new ConsumerObserver(h),u}return e}(Subscriber);function handleUnhandledError(r){reportUnhandledError(r)}function defaultErrorHandler(r){throw r}function handleStoppedNotification(r,e){var n=config.onStoppedNotification;n&&timeoutProvider.setTimeout(function(){return n(r,e)})}var EMPTY_OBSERVER={closed:!0,next:noop$1,error:defaultErrorHandler,complete:noop$1},observable=function(){return typeof Symbol=="function"&&Symbol.observable||"@@observable"}();function identity(r){return r}function pipeFromArray(r){return r.length===0?identity:r.length===1?r[0]:function(n){return r.reduce(function(s,a){return a(s)},n)}}var Observable=function(){function r(e){e&&(this._subscribe=e)}return r.prototype.lift=function(e){var n=new r;return n.source=this,n.operator=e,n},r.prototype.subscribe=function(e,n,s){var a=this,u=isSubscriber(e)?e:new SafeSubscriber(e,n,s);return errorContext(function(){var h=a,w=h.operator,B=h.source;u.add(w?w.call(u,B):B?a._subscribe(u):a._trySubscribe(u))}),u},r.prototype._trySubscribe=function(e){try{return this._subscribe(e)}catch(n){e.error(n)}},r.prototype.forEach=function(e,n){var s=this;return n=getPromiseCtor(n),new n(function(a,u){var h=new SafeSubscriber({next:function(w){try{e(w)}catch(B){u(B),h.unsubscribe()}},error:u,complete:a});s.subscribe(h)})},r.prototype._subscribe=function(e){var n;return(n=this.source)===null||n===void 0?void 0:n.subscribe(e)},r.prototype[observable]=function(){return this},r.prototype.pipe=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return pipeFromArray(e)(this)},r.prototype.toPromise=function(e){var n=this;return e=getPromiseCtor(e),new e(function(s,a){var u;n.subscribe(function(h){return u=h},function(h){return a(h)},function(){return s(u)})})},r.create=function(e){return new r(e)},r}();function getPromiseCtor(r){var e;return(e=r!=null?r:config.Promise)!==null&&e!==void 0?e:Promise}function isObserver(r){return r&&isFunction(r.next)&&isFunction(r.error)&&isFunction(r.complete)}function isSubscriber(r){return r&&r instanceof Subscriber||isObserver(r)&&isSubscription(r)}function hasLift(r){return isFunction(r==null?void 0:r.lift)}function operate(r){return function(e){if(hasLift(e))return e.lift(function(n){try{return r(n,this)}catch(s){this.error(s)}});throw new TypeError("Unable to lift unknown Observable type")}}function createOperatorSubscriber(r,e,n,s,a){return new OperatorSubscriber(r,e,n,s,a)}var OperatorSubscriber=function(r){__extends(e,r);function e(n,s,a,u,h,w){var B=r.call(this,n)||this;return B.onFinalize=h,B.shouldUnsubscribe=w,B._next=s?function(k){try{s(k)}catch(te){n.error(te)}}:r.prototype._next,B._error=u?function(k){try{u(k)}catch(te){n.error(te)}finally{this.unsubscribe()}}:r.prototype._error,B._complete=a?function(){try{a()}catch(k){n.error(k)}finally{this.unsubscribe()}}:r.prototype._complete,B}return e.prototype.unsubscribe=function(){var n;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){var s=this.closed;r.prototype.unsubscribe.call(this),!s&&((n=this.onFinalize)===null||n===void 0||n.call(this))}},e}(Subscriber),ObjectUnsubscribedError=createErrorClass(function(r){return function(){r(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"}}),Subject=function(r){__extends(e,r);function e(){var n=r.call(this)||this;return n.closed=!1,n.observers=[],n.isStopped=!1,n.hasError=!1,n.thrownError=null,n}return e.prototype.lift=function(n){var s=new AnonymousSubject(this,this);return s.operator=n,s},e.prototype._throwIfClosed=function(){if(this.closed)throw new ObjectUnsubscribedError},e.prototype.next=function(n){var s=this;errorContext(function(){var a,u;if(s._throwIfClosed(),!s.isStopped){var h=s.observers.slice();try{for(var w=__values(h),B=w.next();!B.done;B=w.next()){var k=B.value;k.next(n)}}catch(te){a={error:te}}finally{try{B&&!B.done&&(u=w.return)&&u.call(w)}finally{if(a)throw a.error}}}})},e.prototype.error=function(n){var s=this;errorContext(function(){if(s._throwIfClosed(),!s.isStopped){s.hasError=s.isStopped=!0,s.thrownError=n;for(var a=s.observers;a.length;)a.shift().error(n)}})},e.prototype.complete=function(){var n=this;errorContext(function(){if(n._throwIfClosed(),!n.isStopped){n.isStopped=!0;for(var s=n.observers;s.length;)s.shift().complete()}})},e.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=null},Object.defineProperty(e.prototype,"observed",{get:function(){var n;return((n=this.observers)===null||n===void 0?void 0:n.length)>0},enumerable:!1,configurable:!0}),e.prototype._trySubscribe=function(n){return this._throwIfClosed(),r.prototype._trySubscribe.call(this,n)},e.prototype._subscribe=function(n){return this._throwIfClosed(),this._checkFinalizedStatuses(n),this._innerSubscribe(n)},e.prototype._innerSubscribe=function(n){var s=this,a=s.hasError,u=s.isStopped,h=s.observers;return a||u?EMPTY_SUBSCRIPTION:(h.push(n),new Subscription(function(){return arrRemove(h,n)}))},e.prototype._checkFinalizedStatuses=function(n){var s=this,a=s.hasError,u=s.thrownError,h=s.isStopped;a?n.error(u):h&&n.complete()},e.prototype.asObservable=function(){var n=new Observable;return n.source=this,n},e.create=function(n,s){return new AnonymousSubject(n,s)},e}(Observable),AnonymousSubject=function(r){__extends(e,r);function e(n,s){var a=r.call(this)||this;return a.destination=n,a.source=s,a}return e.prototype.next=function(n){var s,a;(a=(s=this.destination)===null||s===void 0?void 0:s.next)===null||a===void 0||a.call(s,n)},e.prototype.error=function(n){var s,a;(a=(s=this.destination)===null||s===void 0?void 0:s.error)===null||a===void 0||a.call(s,n)},e.prototype.complete=function(){var n,s;(s=(n=this.destination)===null||n===void 0?void 0:n.complete)===null||s===void 0||s.call(n)},e.prototype._subscribe=function(n){var s,a;return(a=(s=this.source)===null||s===void 0?void 0:s.subscribe(n))!==null&&a!==void 0?a:EMPTY_SUBSCRIPTION},e}(Subject),BehaviorSubject=function(r){__extends(e,r);function e(n){var s=r.call(this)||this;return s._value=n,s}return Object.defineProperty(e.prototype,"value",{get:function(){return this.getValue()},enumerable:!1,configurable:!0}),e.prototype._subscribe=function(n){var s=r.prototype._subscribe.call(this,n);return!s.closed&&n.next(this._value),s},e.prototype.getValue=function(){var n=this,s=n.hasError,a=n.thrownError,u=n._value;if(s)throw a;return this._throwIfClosed(),u},e.prototype.next=function(n){r.prototype.next.call(this,this._value=n)},e}(Subject),dateTimestampProvider={now:function(){return(dateTimestampProvider.delegate||Date).now()},delegate:void 0},Action=function(r){__extends(e,r);function e(n,s){return r.call(this)||this}return e.prototype.schedule=function(n,s){return this},e}(Subscription),intervalProvider={setInterval:function(){for(var r=[],e=0;e<arguments.length;e++)r[e]=arguments[e];var n=intervalProvider.delegate;return((n==null?void 0:n.setInterval)||setInterval).apply(void 0,__spreadArray([],__read(r)))},clearInterval:function(r){var e=intervalProvider.delegate;return((e==null?void 0:e.clearInterval)||clearInterval)(r)},delegate:void 0},AsyncAction=function(r){__extends(e,r);function e(n,s){var a=r.call(this,n,s)||this;return a.scheduler=n,a.work=s,a.pending=!1,a}return e.prototype.schedule=function(n,s){if(s===void 0&&(s=0),this.closed)return this;this.state=n;var a=this.id,u=this.scheduler;return a!=null&&(this.id=this.recycleAsyncId(u,a,s)),this.pending=!0,this.delay=s,this.id=this.id||this.requestAsyncId(u,this.id,s),this},e.prototype.requestAsyncId=function(n,s,a){return a===void 0&&(a=0),intervalProvider.setInterval(n.flush.bind(n,this),a)},e.prototype.recycleAsyncId=function(n,s,a){if(a===void 0&&(a=0),a!=null&&this.delay===a&&this.pending===!1)return s;intervalProvider.clearInterval(s)},e.prototype.execute=function(n,s){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;var a=this._execute(n,s);if(a)return a;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))},e.prototype._execute=function(n,s){var a=!1,u;try{this.work(n)}catch(h){a=!0,u=h||new Error("Scheduled action threw falsy error")}if(a)return this.unsubscribe(),u},e.prototype.unsubscribe=function(){if(!this.closed){var n=this,s=n.id,a=n.scheduler,u=a.actions;this.work=this.state=this.scheduler=null,this.pending=!1,arrRemove(u,this),s!=null&&(this.id=this.recycleAsyncId(a,s,null)),this.delay=null,r.prototype.unsubscribe.call(this)}},e}(Action),Scheduler=function(){function r(e,n){n===void 0&&(n=r.now),this.schedulerActionCtor=e,this.now=n}return r.prototype.schedule=function(e,n,s){return n===void 0&&(n=0),new this.schedulerActionCtor(this,e).schedule(s,n)},r.now=dateTimestampProvider.now,r}(),AsyncScheduler=function(r){__extends(e,r);function e(n,s){s===void 0&&(s=Scheduler.now);var a=r.call(this,n,s)||this;return a.actions=[],a._active=!1,a._scheduled=void 0,a}return e.prototype.flush=function(n){var s=this.actions;if(this._active){s.push(n);return}var a;this._active=!0;do if(a=n.execute(n.state,n.delay))break;while(n=s.shift());if(this._active=!1,a){for(;n=s.shift();)n.unsubscribe();throw a}},e}(Scheduler),asyncScheduler=new AsyncScheduler(AsyncAction);function scanInternals(r,e,n,s,a){return function(u,h){var w=n,B=e,k=0;u.subscribe(createOperatorSubscriber(h,function(te){var se=k++;B=w?r(B,te,se):(w=!0,te),s&&h.next(B)},a&&function(){w&&h.next(B),h.complete()}))}}function debounceTime(r,e){return e===void 0&&(e=asyncScheduler),operate(function(n,s){var a=null,u=null,h=null,w=function(){if(a){a.unsubscribe(),a=null;var k=u;u=null,s.next(k)}};function B(){var k=h+r,te=e.now();if(te<k){a=this.schedule(void 0,k-te),s.add(a);return}w()}n.subscribe(createOperatorSubscriber(s,function(k){u=k,h=e.now(),a||(a=e.schedule(B,r),s.add(a))},function(){w(),s.complete()},void 0,function(){u=a=null}))})}function scan(r,e){return operate(scanInternals(r,e,arguments.length>=2,!0))}var commonjsGlobal=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};function getDefaultExportFromCjs(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var lodash={exports:{}};/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */(function(r,e){(function(){var n,s="4.17.21",a=200,u="Unsupported core-js use. Try https://npms.io/search?q=ponyfill.",h="Expected a function",w="Invalid `variable` option passed into `_.template`",B="__lodash_hash_undefined__",k=500,te="__lodash_placeholder__",se=1,re=2,ue=4,he=1,ve=2,ae=1,fe=2,Be=4,Ve=8,Ct=16,Ge=32,st=64,xt=128,Kt=256,_n=512,Cr=30,Jr="...",ci=800,Hc=16,ca=1,Wc=2,Vc=3,Qr=1/0,Wr=9007199254740991,qc=17976931348623157e292,Ki=0/0,Or=4294967295,zc=Or-1,Gc=Or>>>1,jc=[["ary",xt],["bind",ae],["bindKey",fe],["curry",Ve],["curryRight",Ct],["flip",_n],["partial",Ge],["partialRight",st],["rearg",Kt]],li="[object Arguments]",Xi="[object Array]",Kc="[object AsyncFunction]",Ti="[object Boolean]",Oi="[object Date]",Xc="[object DOMException]",Yi="[object Error]",Zi="[object Function]",la="[object GeneratorFunction]",yr="[object Map]",Ri="[object Number]",Yc="[object Null]",xr="[object Object]",fa="[object Promise]",Zc="[object Proxy]",Pi="[object RegExp]",br="[object Set]",Li="[object String]",Ji="[object Symbol]",Jc="[object Undefined]",Ci="[object WeakMap]",Qc="[object WeakSet]",xi="[object ArrayBuffer]",fi="[object DataView]",Hs="[object Float32Array]",Ws="[object Float64Array]",Vs="[object Int8Array]",qs="[object Int16Array]",zs="[object Int32Array]",Gs="[object Uint8Array]",js="[object Uint8ClampedArray]",Ks="[object Uint16Array]",Xs="[object Uint32Array]",el=/\b__p \+= '';/g,tl=/\b(__p \+=) '' \+/g,nl=/(__e\(.*?\)|\b__t\)) \+\n'';/g,ha=/&(?:amp|lt|gt|quot|#39);/g,da=/[&<>"']/g,rl=RegExp(ha.source),il=RegExp(da.source),sl=/<%-([\s\S]+?)%>/g,ol=/<%([\s\S]+?)%>/g,pa=/<%=([\s\S]+?)%>/g,al=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,ul=/^\w*$/,cl=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Ys=/[\\^$.*+?()[\]{}|]/g,ll=RegExp(Ys.source),Zs=/^\s+/,fl=/\s/,hl=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,dl=/\{\n\/\* \[wrapped with (.+)\] \*/,pl=/,? & /,gl=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,_l=/[()=,{}\[\]\/\s]/,ml=/\\(\\)?/g,vl=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,ga=/\w*$/,yl=/^[-+]0x[0-9a-f]+$/i,bl=/^0b[01]+$/i,wl=/^\[object .+?Constructor\]$/,El=/^0o[0-7]+$/i,Il=/^(?:0|[1-9]\d*)$/,Al=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,Qi=/($^)/,Sl=/['\n\r\u2028\u2029\\]/g,es="\\ud800-\\udfff",Tl="\\u0300-\\u036f",Ol="\\ufe20-\\ufe2f",Rl="\\u20d0-\\u20ff",_a=Tl+Ol+Rl,ma="\\u2700-\\u27bf",va="a-z\\xdf-\\xf6\\xf8-\\xff",Pl="\\xac\\xb1\\xd7\\xf7",Ll="\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",Cl="\\u2000-\\u206f",xl=" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",ya="A-Z\\xc0-\\xd6\\xd8-\\xde",ba="\\ufe0e\\ufe0f",wa=Pl+Ll+Cl+xl,Js="['\u2019]",Ml="["+es+"]",Ea="["+wa+"]",ts="["+_a+"]",Ia="\\d+",Nl="["+ma+"]",Aa="["+va+"]",Sa="[^"+es+wa+Ia+ma+va+ya+"]",Qs="\\ud83c[\\udffb-\\udfff]",Dl="(?:"+ts+"|"+Qs+")",Ta="[^"+es+"]",eo="(?:\\ud83c[\\udde6-\\uddff]){2}",to="[\\ud800-\\udbff][\\udc00-\\udfff]",hi="["+ya+"]",Oa="\\u200d",Ra="(?:"+Aa+"|"+Sa+")",Ul="(?:"+hi+"|"+Sa+")",Pa="(?:"+Js+"(?:d|ll|m|re|s|t|ve))?",La="(?:"+Js+"(?:D|LL|M|RE|S|T|VE))?",Ca=Dl+"?",xa="["+ba+"]?",Fl="(?:"+Oa+"(?:"+[Ta,eo,to].join("|")+")"+xa+Ca+")*",kl="\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",Bl="\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",Ma=xa+Ca+Fl,$l="(?:"+[Nl,eo,to].join("|")+")"+Ma,Hl="(?:"+[Ta+ts+"?",ts,eo,to,Ml].join("|")+")",Wl=RegExp(Js,"g"),Vl=RegExp(ts,"g"),no=RegExp(Qs+"(?="+Qs+")|"+Hl+Ma,"g"),ql=RegExp([hi+"?"+Aa+"+"+Pa+"(?="+[Ea,hi,"$"].join("|")+")",Ul+"+"+La+"(?="+[Ea,hi+Ra,"$"].join("|")+")",hi+"?"+Ra+"+"+Pa,hi+"+"+La,Bl,kl,Ia,$l].join("|"),"g"),zl=RegExp("["+Oa+es+_a+ba+"]"),Gl=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,jl=["Array","Buffer","DataView","Date","Error","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Math","Object","Promise","RegExp","Set","String","Symbol","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","WeakMap","_","clearTimeout","isFinite","parseInt","setTimeout"],Kl=-1,cn={};cn[Hs]=cn[Ws]=cn[Vs]=cn[qs]=cn[zs]=cn[Gs]=cn[js]=cn[Ks]=cn[Xs]=!0,cn[li]=cn[Xi]=cn[xi]=cn[Ti]=cn[fi]=cn[Oi]=cn[Yi]=cn[Zi]=cn[yr]=cn[Ri]=cn[xr]=cn[Pi]=cn[br]=cn[Li]=cn[Ci]=!1;var un={};un[li]=un[Xi]=un[xi]=un[fi]=un[Ti]=un[Oi]=un[Hs]=un[Ws]=un[Vs]=un[qs]=un[zs]=un[yr]=un[Ri]=un[xr]=un[Pi]=un[br]=un[Li]=un[Ji]=un[Gs]=un[js]=un[Ks]=un[Xs]=!0,un[Yi]=un[Zi]=un[Ci]=!1;var Xl={\u00C0:"A",\u00C1:"A",\u00C2:"A",\u00C3:"A",\u00C4:"A",\u00C5:"A",\u00E0:"a",\u00E1:"a",\u00E2:"a",\u00E3:"a",\u00E4:"a",\u00E5:"a",\u00C7:"C",\u00E7:"c",\u00D0:"D",\u00F0:"d",\u00C8:"E",\u00C9:"E",\u00CA:"E",\u00CB:"E",\u00E8:"e",\u00E9:"e",\u00EA:"e",\u00EB:"e",\u00CC:"I",\u00CD:"I",\u00CE:"I",\u00CF:"I",\u00EC:"i",\u00ED:"i",\u00EE:"i",\u00EF:"i",\u00D1:"N",\u00F1:"n",\u00D2:"O",\u00D3:"O",\u00D4:"O",\u00D5:"O",\u00D6:"O",\u00D8:"O",\u00F2:"o",\u00F3:"o",\u00F4:"o",\u00F5:"o",\u00F6:"o",\u00F8:"o",\u00D9:"U",\u00DA:"U",\u00DB:"U",\u00DC:"U",\u00F9:"u",\u00FA:"u",\u00FB:"u",\u00FC:"u",\u00DD:"Y",\u00FD:"y",\u00FF:"y",\u00C6:"Ae",\u00E6:"ae",\u00DE:"Th",\u00FE:"th",\u00DF:"ss",\u0100:"A",\u0102:"A",\u0104:"A",\u0101:"a",\u0103:"a",\u0105:"a",\u0106:"C",\u0108:"C",\u010A:"C",\u010C:"C",\u0107:"c",\u0109:"c",\u010B:"c",\u010D:"c",\u010E:"D",\u0110:"D",\u010F:"d",\u0111:"d",\u0112:"E",\u0114:"E",\u0116:"E",\u0118:"E",\u011A:"E",\u0113:"e",\u0115:"e",\u0117:"e",\u0119:"e",\u011B:"e",\u011C:"G",\u011E:"G",\u0120:"G",\u0122:"G",\u011D:"g",\u011F:"g",\u0121:"g",\u0123:"g",\u0124:"H",\u0126:"H",\u0125:"h",\u0127:"h",\u0128:"I",\u012A:"I",\u012C:"I",\u012E:"I",\u0130:"I",\u0129:"i",\u012B:"i",\u012D:"i",\u012F:"i",\u0131:"i",\u0134:"J",\u0135:"j",\u0136:"K",\u0137:"k",\u0138:"k",\u0139:"L",\u013B:"L",\u013D:"L",\u013F:"L",\u0141:"L",\u013A:"l",\u013C:"l",\u013E:"l",\u0140:"l",\u0142:"l",\u0143:"N",\u0145:"N",\u0147:"N",\u014A:"N",\u0144:"n",\u0146:"n",\u0148:"n",\u014B:"n",\u014C:"O",\u014E:"O",\u0150:"O",\u014D:"o",\u014F:"o",\u0151:"o",\u0154:"R",\u0156:"R",\u0158:"R",\u0155:"r",\u0157:"r",\u0159:"r",\u015A:"S",\u015C:"S",\u015E:"S",\u0160:"S",\u015B:"s",\u015D:"s",\u015F:"s",\u0161:"s",\u0162:"T",\u0164:"T",\u0166:"T",\u0163:"t",\u0165:"t",\u0167:"t",\u0168:"U",\u016A:"U",\u016C:"U",\u016E:"U",\u0170:"U",\u0172:"U",\u0169:"u",\u016B:"u",\u016D:"u",\u016F:"u",\u0171:"u",\u0173:"u",\u0174:"W",\u0175:"w",\u0176:"Y",\u0177:"y",\u0178:"Y",\u0179:"Z",\u017B:"Z",\u017D:"Z",\u017A:"z",\u017C:"z",\u017E:"z",\u0132:"IJ",\u0133:"ij",\u0152:"Oe",\u0153:"oe",\u0149:"'n",\u017F:"s"},Yl={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Zl={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"},Jl={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},Ql=parseFloat,ef=parseInt,Na=typeof commonjsGlobal=="object"&&commonjsGlobal&&commonjsGlobal.Object===Object&&commonjsGlobal,tf=typeof self=="object"&&self&&self.Object===Object&&self,Cn=Na||tf||Function("return this")(),ro=e&&!e.nodeType&&e,ei=ro&&!0&&r&&!r.nodeType&&r,Da=ei&&ei.exports===ro,io=Da&&Na.process,ur=function(){try{var ce=ei&&ei.require&&ei.require("util").types;return ce||io&&io.binding&&io.binding("util")}catch{}}(),Ua=ur&&ur.isArrayBuffer,Fa=ur&&ur.isDate,ka=ur&&ur.isMap,Ba=ur&&ur.isRegExp,$a=ur&&ur.isSet,Ha=ur&&ur.isTypedArray;function nr(ce,Pe,de){switch(de.length){case 0:return ce.call(Pe);case 1:return ce.call(Pe,de[0]);case 2:return ce.call(Pe,de[0],de[1]);case 3:return ce.call(Pe,de[0],de[1],de[2])}return ce.apply(Pe,de)}function nf(ce,Pe,de,Ze){for(var Ut=-1,Zt=ce==null?0:ce.length;++Ut<Zt;){var Sn=ce[Ut];Pe(Ze,Sn,de(Sn),ce)}return Ze}function cr(ce,Pe){for(var de=-1,Ze=ce==null?0:ce.length;++de<Ze&&Pe(ce[de],de,ce)!==!1;);return ce}function rf(ce,Pe){for(var de=ce==null?0:ce.length;de--&&Pe(ce[de],de,ce)!==!1;);return ce}function Wa(ce,Pe){for(var de=-1,Ze=ce==null?0:ce.length;++de<Ze;)if(!Pe(ce[de],de,ce))return!1;return!0}function Vr(ce,Pe){for(var de=-1,Ze=ce==null?0:ce.length,Ut=0,Zt=[];++de<Ze;){var Sn=ce[de];Pe(Sn,de,ce)&&(Zt[Ut++]=Sn)}return Zt}function ns(ce,Pe){var de=ce==null?0:ce.length;return!!de&&di(ce,Pe,0)>-1}function so(ce,Pe,de){for(var Ze=-1,Ut=ce==null?0:ce.length;++Ze<Ut;)if(de(Pe,ce[Ze]))return!0;return!1}function fn(ce,Pe){for(var de=-1,Ze=ce==null?0:ce.length,Ut=Array(Ze);++de<Ze;)Ut[de]=Pe(ce[de],de,ce);return Ut}function qr(ce,Pe){for(var de=-1,Ze=Pe.length,Ut=ce.length;++de<Ze;)ce[Ut+de]=Pe[de];return ce}function oo(ce,Pe,de,Ze){var Ut=-1,Zt=ce==null?0:ce.length;for(Ze&&Zt&&(de=ce[++Ut]);++Ut<Zt;)de=Pe(de,ce[Ut],Ut,ce);return de}function sf(ce,Pe,de,Ze){var Ut=ce==null?0:ce.length;for(Ze&&Ut&&(de=ce[--Ut]);Ut--;)de=Pe(de,ce[Ut],Ut,ce);return de}function ao(ce,Pe){for(var de=-1,Ze=ce==null?0:ce.length;++de<Ze;)if(Pe(ce[de],de,ce))return!0;return!1}var of=uo("length");function af(ce){return ce.split("")}function uf(ce){return ce.match(gl)||[]}function Va(ce,Pe,de){var Ze;return de(ce,function(Ut,Zt,Sn){if(Pe(Ut,Zt,Sn))return Ze=Zt,!1}),Ze}function rs(ce,Pe,de,Ze){for(var Ut=ce.length,Zt=de+(Ze?1:-1);Ze?Zt--:++Zt<Ut;)if(Pe(ce[Zt],Zt,ce))return Zt;return-1}function di(ce,Pe,de){return Pe===Pe?bf(ce,Pe,de):rs(ce,qa,de)}function cf(ce,Pe,de,Ze){for(var Ut=de-1,Zt=ce.length;++Ut<Zt;)if(Ze(ce[Ut],Pe))return Ut;return-1}function qa(ce){return ce!==ce}function za(ce,Pe){var de=ce==null?0:ce.length;return de?lo(ce,Pe)/de:Ki}function uo(ce){return function(Pe){return Pe==null?n:Pe[ce]}}function co(ce){return function(Pe){return ce==null?n:ce[Pe]}}function Ga(ce,Pe,de,Ze,Ut){return Ut(ce,function(Zt,Sn,sn){de=Ze?(Ze=!1,Zt):Pe(de,Zt,Sn,sn)}),de}function lf(ce,Pe){var de=ce.length;for(ce.sort(Pe);de--;)ce[de]=ce[de].value;return ce}function lo(ce,Pe){for(var de,Ze=-1,Ut=ce.length;++Ze<Ut;){var Zt=Pe(ce[Ze]);Zt!==n&&(de=de===n?Zt:de+Zt)}return de}function fo(ce,Pe){for(var de=-1,Ze=Array(ce);++de<ce;)Ze[de]=Pe(de);return Ze}function ff(ce,Pe){return fn(Pe,function(de){return[de,ce[de]]})}function ja(ce){return ce&&ce.slice(0,Za(ce)+1).replace(Zs,"")}function rr(ce){return function(Pe){return ce(Pe)}}function ho(ce,Pe){return fn(Pe,function(de){return ce[de]})}function Mi(ce,Pe){return ce.has(Pe)}function Ka(ce,Pe){for(var de=-1,Ze=ce.length;++de<Ze&&di(Pe,ce[de],0)>-1;);return de}function Xa(ce,Pe){for(var de=ce.length;de--&&di(Pe,ce[de],0)>-1;);return de}function hf(ce,Pe){for(var de=ce.length,Ze=0;de--;)ce[de]===Pe&&++Ze;return Ze}var df=co(Xl),pf=co(Yl);function gf(ce){return"\\"+Jl[ce]}function _f(ce,Pe){return ce==null?n:ce[Pe]}function pi(ce){return zl.test(ce)}function mf(ce){return Gl.test(ce)}function vf(ce){for(var Pe,de=[];!(Pe=ce.next()).done;)de.push(Pe.value);return de}function po(ce){var Pe=-1,de=Array(ce.size);return ce.forEach(function(Ze,Ut){de[++Pe]=[Ut,Ze]}),de}function Ya(ce,Pe){return function(de){return ce(Pe(de))}}function zr(ce,Pe){for(var de=-1,Ze=ce.length,Ut=0,Zt=[];++de<Ze;){var Sn=ce[de];(Sn===Pe||Sn===te)&&(ce[de]=te,Zt[Ut++]=de)}return Zt}function is(ce){var Pe=-1,de=Array(ce.size);return ce.forEach(function(Ze){de[++Pe]=Ze}),de}function yf(ce){var Pe=-1,de=Array(ce.size);return ce.forEach(function(Ze){de[++Pe]=[Ze,Ze]}),de}function bf(ce,Pe,de){for(var Ze=de-1,Ut=ce.length;++Ze<Ut;)if(ce[Ze]===Pe)return Ze;return-1}function wf(ce,Pe,de){for(var Ze=de+1;Ze--;)if(ce[Ze]===Pe)return Ze;return Ze}function gi(ce){return pi(ce)?If(ce):of(ce)}function wr(ce){return pi(ce)?Af(ce):af(ce)}function Za(ce){for(var Pe=ce.length;Pe--&&fl.test(ce.charAt(Pe)););return Pe}var Ef=co(Zl);function If(ce){for(var Pe=no.lastIndex=0;no.test(ce);)++Pe;return Pe}function Af(ce){return ce.match(no)||[]}function Sf(ce){return ce.match(ql)||[]}var Tf=function ce(Pe){Pe=Pe==null?Cn:_i.defaults(Cn.Object(),Pe,_i.pick(Cn,jl));var de=Pe.Array,Ze=Pe.Date,Ut=Pe.Error,Zt=Pe.Function,Sn=Pe.Math,sn=Pe.Object,go=Pe.RegExp,Of=Pe.String,lr=Pe.TypeError,ss=de.prototype,Rf=Zt.prototype,mi=sn.prototype,os=Pe["__core-js_shared__"],as=Rf.toString,Qt=mi.hasOwnProperty,Pf=0,Ja=function(){var t=/[^.]+$/.exec(os&&os.keys&&os.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}(),us=mi.toString,Lf=as.call(sn),Cf=Cn._,xf=go("^"+as.call(Qt).replace(Ys,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),cs=Da?Pe.Buffer:n,Gr=Pe.Symbol,ls=Pe.Uint8Array,Qa=cs?cs.allocUnsafe:n,fs=Ya(sn.getPrototypeOf,sn),eu=sn.create,tu=mi.propertyIsEnumerable,hs=ss.splice,nu=Gr?Gr.isConcatSpreadable:n,Ni=Gr?Gr.iterator:n,ti=Gr?Gr.toStringTag:n,ds=function(){try{var t=oi(sn,"defineProperty");return t({},"",{}),t}catch{}}(),Mf=Pe.clearTimeout!==Cn.clearTimeout&&Pe.clearTimeout,Nf=Ze&&Ze.now!==Cn.Date.now&&Ze.now,Df=Pe.setTimeout!==Cn.setTimeout&&Pe.setTimeout,ps=Sn.ceil,gs=Sn.floor,_o=sn.getOwnPropertySymbols,Uf=cs?cs.isBuffer:n,ru=Pe.isFinite,Ff=ss.join,kf=Ya(sn.keys,sn),On=Sn.max,Nn=Sn.min,Bf=Ze.now,$f=Pe.parseInt,iu=Sn.random,Hf=ss.reverse,mo=oi(Pe,"DataView"),Di=oi(Pe,"Map"),vo=oi(Pe,"Promise"),vi=oi(Pe,"Set"),Ui=oi(Pe,"WeakMap"),Fi=oi(sn,"create"),_s=Ui&&new Ui,yi={},Wf=ai(mo),Vf=ai(Di),qf=ai(vo),zf=ai(vi),Gf=ai(Ui),ms=Gr?Gr.prototype:n,ki=ms?ms.valueOf:n,su=ms?ms.toString:n;function V(t){if(pn(t)&&!kt(t)&&!(t instanceof Xt)){if(t instanceof fr)return t;if(Qt.call(t,"__wrapped__"))return oc(t)}return new fr(t)}var bi=function(){function t(){}return function(i){if(!dn(i))return{};if(eu)return eu(i);t.prototype=i;var o=new t;return t.prototype=n,o}}();function vs(){}function fr(t,i){this.__wrapped__=t,this.__actions__=[],this.__chain__=!!i,this.__index__=0,this.__values__=n}V.templateSettings={escape:sl,evaluate:ol,interpolate:pa,variable:"",imports:{_:V}},V.prototype=vs.prototype,V.prototype.constructor=V,fr.prototype=bi(vs.prototype),fr.prototype.constructor=fr;function Xt(t){this.__wrapped__=t,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=Or,this.__views__=[]}function jf(){var t=new Xt(this.__wrapped__);return t.__actions__=Zn(this.__actions__),t.__dir__=this.__dir__,t.__filtered__=this.__filtered__,t.__iteratees__=Zn(this.__iteratees__),t.__takeCount__=this.__takeCount__,t.__views__=Zn(this.__views__),t}function Kf(){if(this.__filtered__){var t=new Xt(this);t.__dir__=-1,t.__filtered__=!0}else t=this.clone(),t.__dir__*=-1;return t}function Xf(){var t=this.__wrapped__.value(),i=this.__dir__,o=kt(t),c=i<0,L=o?t.length:0,ee=ad(0,L,this.__views__),ne=ee.start,ie=ee.end,le=ie-ne,Ce=c?ie:ne-1,Me=this.__iteratees__,He=Me.length,ze=0,ut=Nn(le,this.__takeCount__);if(!o||!c&&L==le&&ut==le)return Pu(t,this.__actions__);var Ot=[];e:for(;le--&&ze<ut;){Ce+=i;for(var Wt=-1,Lt=t[Ce];++Wt<He;){var Gt=Me[Wt],Yt=Gt.iteratee,or=Gt.type,Kn=Yt(Lt);if(or==Wc)Lt=Kn;else if(!Kn){if(or==ca)continue e;break e}}Ot[ze++]=Lt}return Ot}Xt.prototype=bi(vs.prototype),Xt.prototype.constructor=Xt;function ni(t){var i=-1,o=t==null?0:t.length;for(this.clear();++i<o;){var c=t[i];this.set(c[0],c[1])}}function Yf(){this.__data__=Fi?Fi(null):{},this.size=0}function Zf(t){var i=this.has(t)&&delete this.__data__[t];return this.size-=i?1:0,i}function Jf(t){var i=this.__data__;if(Fi){var o=i[t];return o===B?n:o}return Qt.call(i,t)?i[t]:n}function Qf(t){var i=this.__data__;return Fi?i[t]!==n:Qt.call(i,t)}function eh(t,i){var o=this.__data__;return this.size+=this.has(t)?0:1,o[t]=Fi&&i===n?B:i,this}ni.prototype.clear=Yf,ni.prototype.delete=Zf,ni.prototype.get=Jf,ni.prototype.has=Qf,ni.prototype.set=eh;function Mr(t){var i=-1,o=t==null?0:t.length;for(this.clear();++i<o;){var c=t[i];this.set(c[0],c[1])}}function th(){this.__data__=[],this.size=0}function nh(t){var i=this.__data__,o=ys(i,t);if(o<0)return!1;var c=i.length-1;return o==c?i.pop():hs.call(i,o,1),--this.size,!0}function rh(t){var i=this.__data__,o=ys(i,t);return o<0?n:i[o][1]}function ih(t){return ys(this.__data__,t)>-1}function sh(t,i){var o=this.__data__,c=ys(o,t);return c<0?(++this.size,o.push([t,i])):o[c][1]=i,this}Mr.prototype.clear=th,Mr.prototype.delete=nh,Mr.prototype.get=rh,Mr.prototype.has=ih,Mr.prototype.set=sh;function Nr(t){var i=-1,o=t==null?0:t.length;for(this.clear();++i<o;){var c=t[i];this.set(c[0],c[1])}}function oh(){this.size=0,this.__data__={hash:new ni,map:new(Di||Mr),string:new ni}}function ah(t){var i=Cs(this,t).delete(t);return this.size-=i?1:0,i}function uh(t){return Cs(this,t).get(t)}function ch(t){return Cs(this,t).has(t)}function lh(t,i){var o=Cs(this,t),c=o.size;return o.set(t,i),this.size+=o.size==c?0:1,this}Nr.prototype.clear=oh,Nr.prototype.delete=ah,Nr.prototype.get=uh,Nr.prototype.has=ch,Nr.prototype.set=lh;function ri(t){var i=-1,o=t==null?0:t.length;for(this.__data__=new Nr;++i<o;)this.add(t[i])}function fh(t){return this.__data__.set(t,B),this}function hh(t){return this.__data__.has(t)}ri.prototype.add=ri.prototype.push=fh,ri.prototype.has=hh;function Ar(t){var i=this.__data__=new Mr(t);this.size=i.size}function dh(){this.__data__=new Mr,this.size=0}function ph(t){var i=this.__data__,o=i.delete(t);return this.size=i.size,o}function gh(t){return this.__data__.get(t)}function _h(t){return this.__data__.has(t)}function mh(t,i){var o=this.__data__;if(o instanceof Mr){var c=o.__data__;if(!Di||c.length<a-1)return c.push([t,i]),this.size=++o.size,this;o=this.__data__=new Nr(c)}return o.set(t,i),this.size=o.size,this}Ar.prototype.clear=dh,Ar.prototype.delete=ph,Ar.prototype.get=gh,Ar.prototype.has=_h,Ar.prototype.set=mh;function ou(t,i){var o=kt(t),c=!o&&ui(t),L=!o&&!c&&Zr(t),ee=!o&&!c&&!L&&Ai(t),ne=o||c||L||ee,ie=ne?fo(t.length,Of):[],le=ie.length;for(var Ce in t)(i||Qt.call(t,Ce))&&!(ne&&(Ce=="length"||L&&(Ce=="offset"||Ce=="parent")||ee&&(Ce=="buffer"||Ce=="byteLength"||Ce=="byteOffset")||kr(Ce,le)))&&ie.push(Ce);return ie}function au(t){var i=t.length;return i?t[Po(0,i-1)]:n}function vh(t,i){return xs(Zn(t),ii(i,0,t.length))}function yh(t){return xs(Zn(t))}function yo(t,i,o){(o!==n&&!Sr(t[i],o)||o===n&&!(i in t))&&Dr(t,i,o)}function Bi(t,i,o){var c=t[i];(!(Qt.call(t,i)&&Sr(c,o))||o===n&&!(i in t))&&Dr(t,i,o)}function ys(t,i){for(var o=t.length;o--;)if(Sr(t[o][0],i))return o;return-1}function bh(t,i,o,c){return jr(t,function(L,ee,ne){i(c,L,o(L),ne)}),c}function uu(t,i){return t&&Pr(i,Ln(i),t)}function wh(t,i){return t&&Pr(i,er(i),t)}function Dr(t,i,o){i=="__proto__"&&ds?ds(t,i,{configurable:!0,enumerable:!0,value:o,writable:!0}):t[i]=o}function bo(t,i){for(var o=-1,c=i.length,L=de(c),ee=t==null;++o<c;)L[o]=ee?n:ea(t,i[o]);return L}function ii(t,i,o){return t===t&&(o!==n&&(t=t<=o?t:o),i!==n&&(t=t>=i?t:i)),t}function hr(t,i,o,c,L,ee){var ne,ie=i&se,le=i&re,Ce=i&ue;if(o&&(ne=L?o(t,c,L,ee):o(t)),ne!==n)return ne;if(!dn(t))return t;var Me=kt(t);if(Me){if(ne=cd(t),!ie)return Zn(t,ne)}else{var He=Fn(t),ze=He==Zi||He==la;if(Zr(t))return xu(t,ie);if(He==xr||He==li||ze&&!L){if(ne=le||ze?{}:Zu(t),!ie)return le?Jh(t,wh(ne,t)):Zh(t,uu(ne,t))}else{if(!un[He])return L?t:{};ne=ld(t,He,ie)}}ee||(ee=new Ar);var ut=ee.get(t);if(ut)return ut;ee.set(t,ne),Tc(t)?t.forEach(function(Lt){ne.add(hr(Lt,i,o,Lt,t,ee))}):Ac(t)&&t.forEach(function(Lt,Gt){ne.set(Gt,hr(Lt,i,o,Gt,t,ee))});var Ot=Ce?le?$o:Bo:le?er:Ln,Wt=Me?n:Ot(t);return cr(Wt||t,function(Lt,Gt){Wt&&(Gt=Lt,Lt=t[Gt]),Bi(ne,Gt,hr(Lt,i,o,Gt,t,ee))}),ne}function Eh(t){var i=Ln(t);return function(o){return cu(o,t,i)}}function cu(t,i,o){var c=o.length;if(t==null)return!c;for(t=sn(t);c--;){var L=o[c],ee=i[L],ne=t[L];if(ne===n&&!(L in t)||!ee(ne))return!1}return!0}function lu(t,i,o){if(typeof t!="function")throw new lr(h);return Gi(function(){t.apply(n,o)},i)}function $i(t,i,o,c){var L=-1,ee=ns,ne=!0,ie=t.length,le=[],Ce=i.length;if(!ie)return le;o&&(i=fn(i,rr(o))),c?(ee=so,ne=!1):i.length>=a&&(ee=Mi,ne=!1,i=new ri(i));e:for(;++L<ie;){var Me=t[L],He=o==null?Me:o(Me);if(Me=c||Me!==0?Me:0,ne&&He===He){for(var ze=Ce;ze--;)if(i[ze]===He)continue e;le.push(Me)}else ee(i,He,c)||le.push(Me)}return le}var jr=Fu(Rr),fu=Fu(Eo,!0);function Ih(t,i){var o=!0;return jr(t,function(c,L,ee){return o=!!i(c,L,ee),o}),o}function bs(t,i,o){for(var c=-1,L=t.length;++c<L;){var ee=t[c],ne=i(ee);if(ne!=null&&(ie===n?ne===ne&&!sr(ne):o(ne,ie)))var ie=ne,le=ee}return le}function Ah(t,i,o,c){var L=t.length;for(o=Ht(o),o<0&&(o=-o>L?0:L+o),c=c===n||c>L?L:Ht(c),c<0&&(c+=L),c=o>c?0:Rc(c);o<c;)t[o++]=i;return t}function hu(t,i){var o=[];return jr(t,function(c,L,ee){i(c,L,ee)&&o.push(c)}),o}function xn(t,i,o,c,L){var ee=-1,ne=t.length;for(o||(o=hd),L||(L=[]);++ee<ne;){var ie=t[ee];i>0&&o(ie)?i>1?xn(ie,i-1,o,c,L):qr(L,ie):c||(L[L.length]=ie)}return L}var wo=ku(),du=ku(!0);function Rr(t,i){return t&&wo(t,i,Ln)}function Eo(t,i){return t&&du(t,i,Ln)}function ws(t,i){return Vr(i,function(o){return Br(t[o])})}function si(t,i){i=Xr(i,t);for(var o=0,c=i.length;t!=null&&o<c;)t=t[Lr(i[o++])];return o&&o==c?t:n}function pu(t,i,o){var c=i(t);return kt(t)?c:qr(c,o(t))}function $n(t){return t==null?t===n?Jc:Yc:ti&&ti in sn(t)?od(t):yd(t)}function Io(t,i){return t>i}function Sh(t,i){return t!=null&&Qt.call(t,i)}function Th(t,i){return t!=null&&i in sn(t)}function Oh(t,i,o){return t>=Nn(i,o)&&t<On(i,o)}function Ao(t,i,o){for(var c=o?so:ns,L=t[0].length,ee=t.length,ne=ee,ie=de(ee),le=1/0,Ce=[];ne--;){var Me=t[ne];ne&&i&&(Me=fn(Me,rr(i))),le=Nn(Me.length,le),ie[ne]=!o&&(i||L>=120&&Me.length>=120)?new ri(ne&&Me):n}Me=t[0];var He=-1,ze=ie[0];e:for(;++He<L&&Ce.length<le;){var ut=Me[He],Ot=i?i(ut):ut;if(ut=o||ut!==0?ut:0,!(ze?Mi(ze,Ot):c(Ce,Ot,o))){for(ne=ee;--ne;){var Wt=ie[ne];if(!(Wt?Mi(Wt,Ot):c(t[ne],Ot,o)))continue e}ze&&ze.push(Ot),Ce.push(ut)}}return Ce}function Rh(t,i,o,c){return Rr(t,function(L,ee,ne){i(c,o(L),ee,ne)}),c}function Hi(t,i,o){i=Xr(i,t),t=tc(t,i);var c=t==null?t:t[Lr(pr(i))];return c==null?n:nr(c,t,o)}function gu(t){return pn(t)&&$n(t)==li}function Ph(t){return pn(t)&&$n(t)==xi}function Lh(t){return pn(t)&&$n(t)==Oi}function Wi(t,i,o,c,L){return t===i?!0:t==null||i==null||!pn(t)&&!pn(i)?t!==t&&i!==i:Ch(t,i,o,c,Wi,L)}function Ch(t,i,o,c,L,ee){var ne=kt(t),ie=kt(i),le=ne?Xi:Fn(t),Ce=ie?Xi:Fn(i);le=le==li?xr:le,Ce=Ce==li?xr:Ce;var Me=le==xr,He=Ce==xr,ze=le==Ce;if(ze&&Zr(t)){if(!Zr(i))return!1;ne=!0,Me=!1}if(ze&&!Me)return ee||(ee=new Ar),ne||Ai(t)?Ku(t,i,o,c,L,ee):id(t,i,le,o,c,L,ee);if(!(o&he)){var ut=Me&&Qt.call(t,"__wrapped__"),Ot=He&&Qt.call(i,"__wrapped__");if(ut||Ot){var Wt=ut?t.value():t,Lt=Ot?i.value():i;return ee||(ee=new Ar),L(Wt,Lt,o,c,ee)}}return ze?(ee||(ee=new Ar),sd(t,i,o,c,L,ee)):!1}function xh(t){return pn(t)&&Fn(t)==yr}function So(t,i,o,c){var L=o.length,ee=L,ne=!c;if(t==null)return!ee;for(t=sn(t);L--;){var ie=o[L];if(ne&&ie[2]?ie[1]!==t[ie[0]]:!(ie[0]in t))return!1}for(;++L<ee;){ie=o[L];var le=ie[0],Ce=t[le],Me=ie[1];if(ne&&ie[2]){if(Ce===n&&!(le in t))return!1}else{var He=new Ar;if(c)var ze=c(Ce,Me,le,t,i,He);if(!(ze===n?Wi(Me,Ce,he|ve,c,He):ze))return!1}}return!0}function _u(t){if(!dn(t)||pd(t))return!1;var i=Br(t)?xf:wl;return i.test(ai(t))}function Mh(t){return pn(t)&&$n(t)==Pi}function Nh(t){return pn(t)&&Fn(t)==br}function Dh(t){return pn(t)&&ks(t.length)&&!!cn[$n(t)]}function mu(t){return typeof t=="function"?t:t==null?tr:typeof t=="object"?kt(t)?bu(t[0],t[1]):yu(t):Bc(t)}function To(t){if(!zi(t))return kf(t);var i=[];for(var o in sn(t))Qt.call(t,o)&&o!="constructor"&&i.push(o);return i}function Uh(t){if(!dn(t))return vd(t);var i=zi(t),o=[];for(var c in t)c=="constructor"&&(i||!Qt.call(t,c))||o.push(c);return o}function Oo(t,i){return t<i}function vu(t,i){var o=-1,c=Jn(t)?de(t.length):[];return jr(t,function(L,ee,ne){c[++o]=i(L,ee,ne)}),c}function yu(t){var i=Wo(t);return i.length==1&&i[0][2]?Qu(i[0][0],i[0][1]):function(o){return o===t||So(o,t,i)}}function bu(t,i){return qo(t)&&Ju(i)?Qu(Lr(t),i):function(o){var c=ea(o,t);return c===n&&c===i?ta(o,t):Wi(i,c,he|ve)}}function Es(t,i,o,c,L){t!==i&&wo(i,function(ee,ne){if(L||(L=new Ar),dn(ee))Fh(t,i,ne,o,Es,c,L);else{var ie=c?c(Go(t,ne),ee,ne+"",t,i,L):n;ie===n&&(ie=ee),yo(t,ne,ie)}},er)}function Fh(t,i,o,c,L,ee,ne){var ie=Go(t,o),le=Go(i,o),Ce=ne.get(le);if(Ce){yo(t,o,Ce);return}var Me=ee?ee(ie,le,o+"",t,i,ne):n,He=Me===n;if(He){var ze=kt(le),ut=!ze&&Zr(le),Ot=!ze&&!ut&&Ai(le);Me=le,ze||ut||Ot?kt(ie)?Me=ie:mn(ie)?Me=Zn(ie):ut?(He=!1,Me=xu(le,!0)):Ot?(He=!1,Me=Mu(le,!0)):Me=[]:ji(le)||ui(le)?(Me=ie,ui(ie)?Me=Pc(ie):(!dn(ie)||Br(ie))&&(Me=Zu(le))):He=!1}He&&(ne.set(le,Me),L(Me,le,c,ee,ne),ne.delete(le)),yo(t,o,Me)}function wu(t,i){var o=t.length;if(!!o)return i+=i<0?o:0,kr(i,o)?t[i]:n}function Eu(t,i,o){i.length?i=fn(i,function(ee){return kt(ee)?function(ne){return si(ne,ee.length===1?ee[0]:ee)}:ee}):i=[tr];var c=-1;i=fn(i,rr(ct()));var L=vu(t,function(ee,ne,ie){var le=fn(i,function(Ce){return Ce(ee)});return{criteria:le,index:++c,value:ee}});return lf(L,function(ee,ne){return Yh(ee,ne,o)})}function kh(t,i){return Iu(t,i,function(o,c){return ta(t,c)})}function Iu(t,i,o){for(var c=-1,L=i.length,ee={};++c<L;){var ne=i[c],ie=si(t,ne);o(ie,ne)&&Vi(ee,Xr(ne,t),ie)}return ee}function Bh(t){return function(i){return si(i,t)}}function Ro(t,i,o,c){var L=c?cf:di,ee=-1,ne=i.length,ie=t;for(t===i&&(i=Zn(i)),o&&(ie=fn(t,rr(o)));++ee<ne;)for(var le=0,Ce=i[ee],Me=o?o(Ce):Ce;(le=L(ie,Me,le,c))>-1;)ie!==t&&hs.call(ie,le,1),hs.call(t,le,1);return t}function Au(t,i){for(var o=t?i.length:0,c=o-1;o--;){var L=i[o];if(o==c||L!==ee){var ee=L;kr(L)?hs.call(t,L,1):xo(t,L)}}return t}function Po(t,i){return t+gs(iu()*(i-t+1))}function $h(t,i,o,c){for(var L=-1,ee=On(ps((i-t)/(o||1)),0),ne=de(ee);ee--;)ne[c?ee:++L]=t,t+=o;return ne}function Lo(t,i){var o="";if(!t||i<1||i>Wr)return o;do i%2&&(o+=t),i=gs(i/2),i&&(t+=t);while(i);return o}function qt(t,i){return jo(ec(t,i,tr),t+"")}function Hh(t){return au(Si(t))}function Wh(t,i){var o=Si(t);return xs(o,ii(i,0,o.length))}function Vi(t,i,o,c){if(!dn(t))return t;i=Xr(i,t);for(var L=-1,ee=i.length,ne=ee-1,ie=t;ie!=null&&++L<ee;){var le=Lr(i[L]),Ce=o;if(le==="__proto__"||le==="constructor"||le==="prototype")return t;if(L!=ne){var Me=ie[le];Ce=c?c(Me,le,ie):n,Ce===n&&(Ce=dn(Me)?Me:kr(i[L+1])?[]:{})}Bi(ie,le,Ce),ie=ie[le]}return t}var Su=_s?function(t,i){return _s.set(t,i),t}:tr,Vh=ds?function(t,i){return ds(t,"toString",{configurable:!0,enumerable:!1,value:ra(i),writable:!0})}:tr;function qh(t){return xs(Si(t))}function dr(t,i,o){var c=-1,L=t.length;i<0&&(i=-i>L?0:L+i),o=o>L?L:o,o<0&&(o+=L),L=i>o?0:o-i>>>0,i>>>=0;for(var ee=de(L);++c<L;)ee[c]=t[c+i];return ee}function zh(t,i){var o;return jr(t,function(c,L,ee){return o=i(c,L,ee),!o}),!!o}function Is(t,i,o){var c=0,L=t==null?c:t.length;if(typeof i=="number"&&i===i&&L<=Gc){for(;c<L;){var ee=c+L>>>1,ne=t[ee];ne!==null&&!sr(ne)&&(o?ne<=i:ne<i)?c=ee+1:L=ee}return L}return Co(t,i,tr,o)}function Co(t,i,o,c){var L=0,ee=t==null?0:t.length;if(ee===0)return 0;i=o(i);for(var ne=i!==i,ie=i===null,le=sr(i),Ce=i===n;L<ee;){var Me=gs((L+ee)/2),He=o(t[Me]),ze=He!==n,ut=He===null,Ot=He===He,Wt=sr(He);if(ne)var Lt=c||Ot;else Ce?Lt=Ot&&(c||ze):ie?Lt=Ot&&ze&&(c||!ut):le?Lt=Ot&&ze&&!ut&&(c||!Wt):ut||Wt?Lt=!1:Lt=c?He<=i:He<i;Lt?L=Me+1:ee=Me}return Nn(ee,zc)}function Tu(t,i){for(var o=-1,c=t.length,L=0,ee=[];++o<c;){var ne=t[o],ie=i?i(ne):ne;if(!o||!Sr(ie,le)){var le=ie;ee[L++]=ne===0?0:ne}}return ee}function Ou(t){return typeof t=="number"?t:sr(t)?Ki:+t}function ir(t){if(typeof t=="string")return t;if(kt(t))return fn(t,ir)+"";if(sr(t))return su?su.call(t):"";var i=t+"";return i=="0"&&1/t==-Qr?"-0":i}function Kr(t,i,o){var c=-1,L=ns,ee=t.length,ne=!0,ie=[],le=ie;if(o)ne=!1,L=so;else if(ee>=a){var Ce=i?null:nd(t);if(Ce)return is(Ce);ne=!1,L=Mi,le=new ri}else le=i?[]:ie;e:for(;++c<ee;){var Me=t[c],He=i?i(Me):Me;if(Me=o||Me!==0?Me:0,ne&&He===He){for(var ze=le.length;ze--;)if(le[ze]===He)continue e;i&&le.push(He),ie.push(Me)}else L(le,He,o)||(le!==ie&&le.push(He),ie.push(Me))}return ie}function xo(t,i){return i=Xr(i,t),t=tc(t,i),t==null||delete t[Lr(pr(i))]}function Ru(t,i,o,c){return Vi(t,i,o(si(t,i)),c)}function As(t,i,o,c){for(var L=t.length,ee=c?L:-1;(c?ee--:++ee<L)&&i(t[ee],ee,t););return o?dr(t,c?0:ee,c?ee+1:L):dr(t,c?ee+1:0,c?L:ee)}function Pu(t,i){var o=t;return o instanceof Xt&&(o=o.value()),oo(i,function(c,L){return L.func.apply(L.thisArg,qr([c],L.args))},o)}function Mo(t,i,o){var c=t.length;if(c<2)return c?Kr(t[0]):[];for(var L=-1,ee=de(c);++L<c;)for(var ne=t[L],ie=-1;++ie<c;)ie!=L&&(ee[L]=$i(ee[L]||ne,t[ie],i,o));return Kr(xn(ee,1),i,o)}function Lu(t,i,o){for(var c=-1,L=t.length,ee=i.length,ne={};++c<L;){var ie=c<ee?i[c]:n;o(ne,t[c],ie)}return ne}function No(t){return mn(t)?t:[]}function Do(t){return typeof t=="function"?t:tr}function Xr(t,i){return kt(t)?t:qo(t,i)?[t]:sc(Jt(t))}var Gh=qt;function Yr(t,i,o){var c=t.length;return o=o===n?c:o,!i&&o>=c?t:dr(t,i,o)}var Cu=Mf||function(t){return Cn.clearTimeout(t)};function xu(t,i){if(i)return t.slice();var o=t.length,c=Qa?Qa(o):new t.constructor(o);return t.copy(c),c}function Uo(t){var i=new t.constructor(t.byteLength);return new ls(i).set(new ls(t)),i}function jh(t,i){var o=i?Uo(t.buffer):t.buffer;return new t.constructor(o,t.byteOffset,t.byteLength)}function Kh(t){var i=new t.constructor(t.source,ga.exec(t));return i.lastIndex=t.lastIndex,i}function Xh(t){return ki?sn(ki.call(t)):{}}function Mu(t,i){var o=i?Uo(t.buffer):t.buffer;return new t.constructor(o,t.byteOffset,t.length)}function Nu(t,i){if(t!==i){var o=t!==n,c=t===null,L=t===t,ee=sr(t),ne=i!==n,ie=i===null,le=i===i,Ce=sr(i);if(!ie&&!Ce&&!ee&&t>i||ee&&ne&&le&&!ie&&!Ce||c&&ne&&le||!o&&le||!L)return 1;if(!c&&!ee&&!Ce&&t<i||Ce&&o&&L&&!c&&!ee||ie&&o&&L||!ne&&L||!le)return-1}return 0}function Yh(t,i,o){for(var c=-1,L=t.criteria,ee=i.criteria,ne=L.length,ie=o.length;++c<ne;){var le=Nu(L[c],ee[c]);if(le){if(c>=ie)return le;var Ce=o[c];return le*(Ce=="desc"?-1:1)}}return t.index-i.index}function Du(t,i,o,c){for(var L=-1,ee=t.length,ne=o.length,ie=-1,le=i.length,Ce=On(ee-ne,0),Me=de(le+Ce),He=!c;++ie<le;)Me[ie]=i[ie];for(;++L<ne;)(He||L<ee)&&(Me[o[L]]=t[L]);for(;Ce--;)Me[ie++]=t[L++];return Me}function Uu(t,i,o,c){for(var L=-1,ee=t.length,ne=-1,ie=o.length,le=-1,Ce=i.length,Me=On(ee-ie,0),He=de(Me+Ce),ze=!c;++L<Me;)He[L]=t[L];for(var ut=L;++le<Ce;)He[ut+le]=i[le];for(;++ne<ie;)(ze||L<ee)&&(He[ut+o[ne]]=t[L++]);return He}function Zn(t,i){var o=-1,c=t.length;for(i||(i=de(c));++o<c;)i[o]=t[o];return i}function Pr(t,i,o,c){var L=!o;o||(o={});for(var ee=-1,ne=i.length;++ee<ne;){var ie=i[ee],le=c?c(o[ie],t[ie],ie,o,t):n;le===n&&(le=t[ie]),L?Dr(o,ie,le):Bi(o,ie,le)}return o}function Zh(t,i){return Pr(t,Vo(t),i)}function Jh(t,i){return Pr(t,Xu(t),i)}function Ss(t,i){return function(o,c){var L=kt(o)?nf:bh,ee=i?i():{};return L(o,t,ct(c,2),ee)}}function wi(t){return qt(function(i,o){var c=-1,L=o.length,ee=L>1?o[L-1]:n,ne=L>2?o[2]:n;for(ee=t.length>3&&typeof ee=="function"?(L--,ee):n,ne&&qn(o[0],o[1],ne)&&(ee=L<3?n:ee,L=1),i=sn(i);++c<L;){var ie=o[c];ie&&t(i,ie,c,ee)}return i})}function Fu(t,i){return function(o,c){if(o==null)return o;if(!Jn(o))return t(o,c);for(var L=o.length,ee=i?L:-1,ne=sn(o);(i?ee--:++ee<L)&&c(ne[ee],ee,ne)!==!1;);return o}}function ku(t){return function(i,o,c){for(var L=-1,ee=sn(i),ne=c(i),ie=ne.length;ie--;){var le=ne[t?ie:++L];if(o(ee[le],le,ee)===!1)break}return i}}function Qh(t,i,o){var c=i&ae,L=qi(t);function ee(){var ne=this&&this!==Cn&&this instanceof ee?L:t;return ne.apply(c?o:this,arguments)}return ee}function Bu(t){return function(i){i=Jt(i);var o=pi(i)?wr(i):n,c=o?o[0]:i.charAt(0),L=o?Yr(o,1).join(""):i.slice(1);return c[t]()+L}}function Ei(t){return function(i){return oo(Fc(Uc(i).replace(Wl,"")),t,"")}}function qi(t){return function(){var i=arguments;switch(i.length){case 0:return new t;case 1:return new t(i[0]);case 2:return new t(i[0],i[1]);case 3:return new t(i[0],i[1],i[2]);case 4:return new t(i[0],i[1],i[2],i[3]);case 5:return new t(i[0],i[1],i[2],i[3],i[4]);case 6:return new t(i[0],i[1],i[2],i[3],i[4],i[5]);case 7:return new t(i[0],i[1],i[2],i[3],i[4],i[5],i[6])}var o=bi(t.prototype),c=t.apply(o,i);return dn(c)?c:o}}function ed(t,i,o){var c=qi(t);function L(){for(var ee=arguments.length,ne=de(ee),ie=ee,le=Ii(L);ie--;)ne[ie]=arguments[ie];var Ce=ee<3&&ne[0]!==le&&ne[ee-1]!==le?[]:zr(ne,le);if(ee-=Ce.length,ee<o)return qu(t,i,Ts,L.placeholder,n,ne,Ce,n,n,o-ee);var Me=this&&this!==Cn&&this instanceof L?c:t;return nr(Me,this,ne)}return L}function $u(t){return function(i,o,c){var L=sn(i);if(!Jn(i)){var ee=ct(o,3);i=Ln(i),o=function(ie){return ee(L[ie],ie,L)}}var ne=t(i,o,c);return ne>-1?L[ee?i[ne]:ne]:n}}function Hu(t){return Fr(function(i){var o=i.length,c=o,L=fr.prototype.thru;for(t&&i.reverse();c--;){var ee=i[c];if(typeof ee!="function")throw new lr(h);if(L&&!ne&&Ls(ee)=="wrapper")var ne=new fr([],!0)}for(c=ne?c:o;++c<o;){ee=i[c];var ie=Ls(ee),le=ie=="wrapper"?Ho(ee):n;le&&zo(le[0])&&le[1]==(xt|Ve|Ge|Kt)&&!le[4].length&&le[9]==1?ne=ne[Ls(le[0])].apply(ne,le[3]):ne=ee.length==1&&zo(ee)?ne[ie]():ne.thru(ee)}return function(){var Ce=arguments,Me=Ce[0];if(ne&&Ce.length==1&&kt(Me))return ne.plant(Me).value();for(var He=0,ze=o?i[He].apply(this,Ce):Me;++He<o;)ze=i[He].call(this,ze);return ze}})}function Ts(t,i,o,c,L,ee,ne,ie,le,Ce){var Me=i&xt,He=i&ae,ze=i&fe,ut=i&(Ve|Ct),Ot=i&_n,Wt=ze?n:qi(t);function Lt(){for(var Gt=arguments.length,Yt=de(Gt),or=Gt;or--;)Yt[or]=arguments[or];if(ut)var Kn=Ii(Lt),ar=hf(Yt,Kn);if(c&&(Yt=Du(Yt,c,L,ut)),ee&&(Yt=Uu(Yt,ee,ne,ut)),Gt-=ar,ut&&Gt<Ce){var In=zr(Yt,Kn);return qu(t,i,Ts,Lt.placeholder,o,Yt,In,ie,le,Ce-Gt)}var Tr=He?o:this,Hr=ze?Tr[t]:t;return Gt=Yt.length,ie?Yt=bd(Yt,ie):Ot&&Gt>1&&Yt.reverse(),Me&&le<Gt&&(Yt.length=le),this&&this!==Cn&&this instanceof Lt&&(Hr=Wt||qi(Hr)),Hr.apply(Tr,Yt)}return Lt}function Wu(t,i){return function(o,c){return Rh(o,t,i(c),{})}}function Os(t,i){return function(o,c){var L;if(o===n&&c===n)return i;if(o!==n&&(L=o),c!==n){if(L===n)return c;typeof o=="string"||typeof c=="string"?(o=ir(o),c=ir(c)):(o=Ou(o),c=Ou(c)),L=t(o,c)}return L}}function Fo(t){return Fr(function(i){return i=fn(i,rr(ct())),qt(function(o){var c=this;return t(i,function(L){return nr(L,c,o)})})})}function Rs(t,i){i=i===n?" ":ir(i);var o=i.length;if(o<2)return o?Lo(i,t):i;var c=Lo(i,ps(t/gi(i)));return pi(i)?Yr(wr(c),0,t).join(""):c.slice(0,t)}function td(t,i,o,c){var L=i&ae,ee=qi(t);function ne(){for(var ie=-1,le=arguments.length,Ce=-1,Me=c.length,He=de(Me+le),ze=this&&this!==Cn&&this instanceof ne?ee:t;++Ce<Me;)He[Ce]=c[Ce];for(;le--;)He[Ce++]=arguments[++ie];return nr(ze,L?o:this,He)}return ne}function Vu(t){return function(i,o,c){return c&&typeof c!="number"&&qn(i,o,c)&&(o=c=n),i=$r(i),o===n?(o=i,i=0):o=$r(o),c=c===n?i<o?1:-1:$r(c),$h(i,o,c,t)}}function Ps(t){return function(i,o){return typeof i=="string"&&typeof o=="string"||(i=mr(i),o=mr(o)),t(i,o)}}function qu(t,i,o,c,L,ee,ne,ie,le,Ce){var Me=i&Ve,He=Me?ne:n,ze=Me?n:ne,ut=Me?ee:n,Ot=Me?n:ee;i|=Me?Ge:st,i&=~(Me?st:Ge),i&Be||(i&=~(ae|fe));var Wt=[t,i,L,ut,He,Ot,ze,ie,le,Ce],Lt=o.apply(n,Wt);return zo(t)&&nc(Lt,Wt),Lt.placeholder=c,rc(Lt,t,i)}function ko(t){var i=Sn[t];return function(o,c){if(o=mr(o),c=c==null?0:Nn(Ht(c),292),c&&ru(o)){var L=(Jt(o)+"e").split("e"),ee=i(L[0]+"e"+(+L[1]+c));return L=(Jt(ee)+"e").split("e"),+(L[0]+"e"+(+L[1]-c))}return i(o)}}var nd=vi&&1/is(new vi([,-0]))[1]==Qr?function(t){return new vi(t)}:oa;function zu(t){return function(i){var o=Fn(i);return o==yr?po(i):o==br?yf(i):ff(i,t(i))}}function Ur(t,i,o,c,L,ee,ne,ie){var le=i&fe;if(!le&&typeof t!="function")throw new lr(h);var Ce=c?c.length:0;if(Ce||(i&=~(Ge|st),c=L=n),ne=ne===n?ne:On(Ht(ne),0),ie=ie===n?ie:Ht(ie),Ce-=L?L.length:0,i&st){var Me=c,He=L;c=L=n}var ze=le?n:Ho(t),ut=[t,i,o,c,L,Me,He,ee,ne,ie];if(ze&&md(ut,ze),t=ut[0],i=ut[1],o=ut[2],c=ut[3],L=ut[4],ie=ut[9]=ut[9]===n?le?0:t.length:On(ut[9]-Ce,0),!ie&&i&(Ve|Ct)&&(i&=~(Ve|Ct)),!i||i==ae)var Ot=Qh(t,i,o);else i==Ve||i==Ct?Ot=ed(t,i,ie):(i==Ge||i==(ae|Ge))&&!L.length?Ot=td(t,i,o,c):Ot=Ts.apply(n,ut);var Wt=ze?Su:nc;return rc(Wt(Ot,ut),t,i)}function Gu(t,i,o,c){return t===n||Sr(t,mi[o])&&!Qt.call(c,o)?i:t}function ju(t,i,o,c,L,ee){return dn(t)&&dn(i)&&(ee.set(i,t),Es(t,i,n,ju,ee),ee.delete(i)),t}function rd(t){return ji(t)?n:t}function Ku(t,i,o,c,L,ee){var ne=o&he,ie=t.length,le=i.length;if(ie!=le&&!(ne&&le>ie))return!1;var Ce=ee.get(t),Me=ee.get(i);if(Ce&&Me)return Ce==i&&Me==t;var He=-1,ze=!0,ut=o&ve?new ri:n;for(ee.set(t,i),ee.set(i,t);++He<ie;){var Ot=t[He],Wt=i[He];if(c)var Lt=ne?c(Wt,Ot,He,i,t,ee):c(Ot,Wt,He,t,i,ee);if(Lt!==n){if(Lt)continue;ze=!1;break}if(ut){if(!ao(i,function(Gt,Yt){if(!Mi(ut,Yt)&&(Ot===Gt||L(Ot,Gt,o,c,ee)))return ut.push(Yt)})){ze=!1;break}}else if(!(Ot===Wt||L(Ot,Wt,o,c,ee))){ze=!1;break}}return ee.delete(t),ee.delete(i),ze}function id(t,i,o,c,L,ee,ne){switch(o){case fi:if(t.byteLength!=i.byteLength||t.byteOffset!=i.byteOffset)return!1;t=t.buffer,i=i.buffer;case xi:return!(t.byteLength!=i.byteLength||!ee(new ls(t),new ls(i)));case Ti:case Oi:case Ri:return Sr(+t,+i);case Yi:return t.name==i.name&&t.message==i.message;case Pi:case Li:return t==i+"";case yr:var ie=po;case br:var le=c&he;if(ie||(ie=is),t.size!=i.size&&!le)return!1;var Ce=ne.get(t);if(Ce)return Ce==i;c|=ve,ne.set(t,i);var Me=Ku(ie(t),ie(i),c,L,ee,ne);return ne.delete(t),Me;case Ji:if(ki)return ki.call(t)==ki.call(i)}return!1}function sd(t,i,o,c,L,ee){var ne=o&he,ie=Bo(t),le=ie.length,Ce=Bo(i),Me=Ce.length;if(le!=Me&&!ne)return!1;for(var He=le;He--;){var ze=ie[He];if(!(ne?ze in i:Qt.call(i,ze)))return!1}var ut=ee.get(t),Ot=ee.get(i);if(ut&&Ot)return ut==i&&Ot==t;var Wt=!0;ee.set(t,i),ee.set(i,t);for(var Lt=ne;++He<le;){ze=ie[He];var Gt=t[ze],Yt=i[ze];if(c)var or=ne?c(Yt,Gt,ze,i,t,ee):c(Gt,Yt,ze,t,i,ee);if(!(or===n?Gt===Yt||L(Gt,Yt,o,c,ee):or)){Wt=!1;break}Lt||(Lt=ze=="constructor")}if(Wt&&!Lt){var Kn=t.constructor,ar=i.constructor;Kn!=ar&&"constructor"in t&&"constructor"in i&&!(typeof Kn=="function"&&Kn instanceof Kn&&typeof ar=="function"&&ar instanceof ar)&&(Wt=!1)}return ee.delete(t),ee.delete(i),Wt}function Fr(t){return jo(ec(t,n,cc),t+"")}function Bo(t){return pu(t,Ln,Vo)}function $o(t){return pu(t,er,Xu)}var Ho=_s?function(t){return _s.get(t)}:oa;function Ls(t){for(var i=t.name+"",o=yi[i],c=Qt.call(yi,i)?o.length:0;c--;){var L=o[c],ee=L.func;if(ee==null||ee==t)return L.name}return i}function Ii(t){var i=Qt.call(V,"placeholder")?V:t;return i.placeholder}function ct(){var t=V.iteratee||ia;return t=t===ia?mu:t,arguments.length?t(arguments[0],arguments[1]):t}function Cs(t,i){var o=t.__data__;return dd(i)?o[typeof i=="string"?"string":"hash"]:o.map}function Wo(t){for(var i=Ln(t),o=i.length;o--;){var c=i[o],L=t[c];i[o]=[c,L,Ju(L)]}return i}function oi(t,i){var o=_f(t,i);return _u(o)?o:n}function od(t){var i=Qt.call(t,ti),o=t[ti];try{t[ti]=n;var c=!0}catch{}var L=us.call(t);return c&&(i?t[ti]=o:delete t[ti]),L}var Vo=_o?function(t){return t==null?[]:(t=sn(t),Vr(_o(t),function(i){return tu.call(t,i)}))}:aa,Xu=_o?function(t){for(var i=[];t;)qr(i,Vo(t)),t=fs(t);return i}:aa,Fn=$n;(mo&&Fn(new mo(new ArrayBuffer(1)))!=fi||Di&&Fn(new Di)!=yr||vo&&Fn(vo.resolve())!=fa||vi&&Fn(new vi)!=br||Ui&&Fn(new Ui)!=Ci)&&(Fn=function(t){var i=$n(t),o=i==xr?t.constructor:n,c=o?ai(o):"";if(c)switch(c){case Wf:return fi;case Vf:return yr;case qf:return fa;case zf:return br;case Gf:return Ci}return i});function ad(t,i,o){for(var c=-1,L=o.length;++c<L;){var ee=o[c],ne=ee.size;switch(ee.type){case"drop":t+=ne;break;case"dropRight":i-=ne;break;case"take":i=Nn(i,t+ne);break;case"takeRight":t=On(t,i-ne);break}}return{start:t,end:i}}function ud(t){var i=t.match(dl);return i?i[1].split(pl):[]}function Yu(t,i,o){i=Xr(i,t);for(var c=-1,L=i.length,ee=!1;++c<L;){var ne=Lr(i[c]);if(!(ee=t!=null&&o(t,ne)))break;t=t[ne]}return ee||++c!=L?ee:(L=t==null?0:t.length,!!L&&ks(L)&&kr(ne,L)&&(kt(t)||ui(t)))}function cd(t){var i=t.length,o=new t.constructor(i);return i&&typeof t[0]=="string"&&Qt.call(t,"index")&&(o.index=t.index,o.input=t.input),o}function Zu(t){return typeof t.constructor=="function"&&!zi(t)?bi(fs(t)):{}}function ld(t,i,o){var c=t.constructor;switch(i){case xi:return Uo(t);case Ti:case Oi:return new c(+t);case fi:return jh(t,o);case Hs:case Ws:case Vs:case qs:case zs:case Gs:case js:case Ks:case Xs:return Mu(t,o);case yr:return new c;case Ri:case Li:return new c(t);case Pi:return Kh(t);case br:return new c;case Ji:return Xh(t)}}function fd(t,i){var o=i.length;if(!o)return t;var c=o-1;return i[c]=(o>1?"& ":"")+i[c],i=i.join(o>2?", ":" "),t.replace(hl,`{
/* [wrapped with `+i+`] */
`)}function hd(t){return kt(t)||ui(t)||!!(nu&&t&&t[nu])}function kr(t,i){var o=typeof t;return i=i==null?Wr:i,!!i&&(o=="number"||o!="symbol"&&Il.test(t))&&t>-1&&t%1==0&&t<i}function qn(t,i,o){if(!dn(o))return!1;var c=typeof i;return(c=="number"?Jn(o)&&kr(i,o.length):c=="string"&&i in o)?Sr(o[i],t):!1}function qo(t,i){if(kt(t))return!1;var o=typeof t;return o=="number"||o=="symbol"||o=="boolean"||t==null||sr(t)?!0:ul.test(t)||!al.test(t)||i!=null&&t in sn(i)}function dd(t){var i=typeof t;return i=="string"||i=="number"||i=="symbol"||i=="boolean"?t!=="__proto__":t===null}function zo(t){var i=Ls(t),o=V[i];if(typeof o!="function"||!(i in Xt.prototype))return!1;if(t===o)return!0;var c=Ho(o);return!!c&&t===c[0]}function pd(t){return!!Ja&&Ja in t}var gd=os?Br:ua;function zi(t){var i=t&&t.constructor,o=typeof i=="function"&&i.prototype||mi;return t===o}function Ju(t){return t===t&&!dn(t)}function Qu(t,i){return function(o){return o==null?!1:o[t]===i&&(i!==n||t in sn(o))}}function _d(t){var i=Us(t,function(c){return o.size===k&&o.clear(),c}),o=i.cache;return i}function md(t,i){var o=t[1],c=i[1],L=o|c,ee=L<(ae|fe|xt),ne=c==xt&&o==Ve||c==xt&&o==Kt&&t[7].length<=i[8]||c==(xt|Kt)&&i[7].length<=i[8]&&o==Ve;if(!(ee||ne))return t;c&ae&&(t[2]=i[2],L|=o&ae?0:Be);var ie=i[3];if(ie){var le=t[3];t[3]=le?Du(le,ie,i[4]):ie,t[4]=le?zr(t[3],te):i[4]}return ie=i[5],ie&&(le=t[5],t[5]=le?Uu(le,ie,i[6]):ie,t[6]=le?zr(t[5],te):i[6]),ie=i[7],ie&&(t[7]=ie),c&xt&&(t[8]=t[8]==null?i[8]:Nn(t[8],i[8])),t[9]==null&&(t[9]=i[9]),t[0]=i[0],t[1]=L,t}function vd(t){var i=[];if(t!=null)for(var o in sn(t))i.push(o);return i}function yd(t){return us.call(t)}function ec(t,i,o){return i=On(i===n?t.length-1:i,0),function(){for(var c=arguments,L=-1,ee=On(c.length-i,0),ne=de(ee);++L<ee;)ne[L]=c[i+L];L=-1;for(var ie=de(i+1);++L<i;)ie[L]=c[L];return ie[i]=o(ne),nr(t,this,ie)}}function tc(t,i){return i.length<2?t:si(t,dr(i,0,-1))}function bd(t,i){for(var o=t.length,c=Nn(i.length,o),L=Zn(t);c--;){var ee=i[c];t[c]=kr(ee,o)?L[ee]:n}return t}function Go(t,i){if(!(i==="constructor"&&typeof t[i]=="function")&&i!="__proto__")return t[i]}var nc=ic(Su),Gi=Df||function(t,i){return Cn.setTimeout(t,i)},jo=ic(Vh);function rc(t,i,o){var c=i+"";return jo(t,fd(c,wd(ud(c),o)))}function ic(t){var i=0,o=0;return function(){var c=Bf(),L=Hc-(c-o);if(o=c,L>0){if(++i>=ci)return arguments[0]}else i=0;return t.apply(n,arguments)}}function xs(t,i){var o=-1,c=t.length,L=c-1;for(i=i===n?c:i;++o<i;){var ee=Po(o,L),ne=t[ee];t[ee]=t[o],t[o]=ne}return t.length=i,t}var sc=_d(function(t){var i=[];return t.charCodeAt(0)===46&&i.push(""),t.replace(cl,function(o,c,L,ee){i.push(L?ee.replace(ml,"$1"):c||o)}),i});function Lr(t){if(typeof t=="string"||sr(t))return t;var i=t+"";return i=="0"&&1/t==-Qr?"-0":i}function ai(t){if(t!=null){try{return as.call(t)}catch{}try{return t+""}catch{}}return""}function wd(t,i){return cr(jc,function(o){var c="_."+o[0];i&o[1]&&!ns(t,c)&&t.push(c)}),t.sort()}function oc(t){if(t instanceof Xt)return t.clone();var i=new fr(t.__wrapped__,t.__chain__);return i.__actions__=Zn(t.__actions__),i.__index__=t.__index__,i.__values__=t.__values__,i}function Ed(t,i,o){(o?qn(t,i,o):i===n)?i=1:i=On(Ht(i),0);var c=t==null?0:t.length;if(!c||i<1)return[];for(var L=0,ee=0,ne=de(ps(c/i));L<c;)ne[ee++]=dr(t,L,L+=i);return ne}function Id(t){for(var i=-1,o=t==null?0:t.length,c=0,L=[];++i<o;){var ee=t[i];ee&&(L[c++]=ee)}return L}function Ad(){var t=arguments.length;if(!t)return[];for(var i=de(t-1),o=arguments[0],c=t;c--;)i[c-1]=arguments[c];return qr(kt(o)?Zn(o):[o],xn(i,1))}var Sd=qt(function(t,i){return mn(t)?$i(t,xn(i,1,mn,!0)):[]}),Td=qt(function(t,i){var o=pr(i);return mn(o)&&(o=n),mn(t)?$i(t,xn(i,1,mn,!0),ct(o,2)):[]}),Od=qt(function(t,i){var o=pr(i);return mn(o)&&(o=n),mn(t)?$i(t,xn(i,1,mn,!0),n,o):[]});function Rd(t,i,o){var c=t==null?0:t.length;return c?(i=o||i===n?1:Ht(i),dr(t,i<0?0:i,c)):[]}function Pd(t,i,o){var c=t==null?0:t.length;return c?(i=o||i===n?1:Ht(i),i=c-i,dr(t,0,i<0?0:i)):[]}function Ld(t,i){return t&&t.length?As(t,ct(i,3),!0,!0):[]}function Cd(t,i){return t&&t.length?As(t,ct(i,3),!0):[]}function xd(t,i,o,c){var L=t==null?0:t.length;return L?(o&&typeof o!="number"&&qn(t,i,o)&&(o=0,c=L),Ah(t,i,o,c)):[]}function ac(t,i,o){var c=t==null?0:t.length;if(!c)return-1;var L=o==null?0:Ht(o);return L<0&&(L=On(c+L,0)),rs(t,ct(i,3),L)}function uc(t,i,o){var c=t==null?0:t.length;if(!c)return-1;var L=c-1;return o!==n&&(L=Ht(o),L=o<0?On(c+L,0):Nn(L,c-1)),rs(t,ct(i,3),L,!0)}function cc(t){var i=t==null?0:t.length;return i?xn(t,1):[]}function Md(t){var i=t==null?0:t.length;return i?xn(t,Qr):[]}function Nd(t,i){var o=t==null?0:t.length;return o?(i=i===n?1:Ht(i),xn(t,i)):[]}function Dd(t){for(var i=-1,o=t==null?0:t.length,c={};++i<o;){var L=t[i];c[L[0]]=L[1]}return c}function lc(t){return t&&t.length?t[0]:n}function Ud(t,i,o){var c=t==null?0:t.length;if(!c)return-1;var L=o==null?0:Ht(o);return L<0&&(L=On(c+L,0)),di(t,i,L)}function Fd(t){var i=t==null?0:t.length;return i?dr(t,0,-1):[]}var kd=qt(function(t){var i=fn(t,No);return i.length&&i[0]===t[0]?Ao(i):[]}),Bd=qt(function(t){var i=pr(t),o=fn(t,No);return i===pr(o)?i=n:o.pop(),o.length&&o[0]===t[0]?Ao(o,ct(i,2)):[]}),$d=qt(function(t){var i=pr(t),o=fn(t,No);return i=typeof i=="function"?i:n,i&&o.pop(),o.length&&o[0]===t[0]?Ao(o,n,i):[]});function Hd(t,i){return t==null?"":Ff.call(t,i)}function pr(t){var i=t==null?0:t.length;return i?t[i-1]:n}function Wd(t,i,o){var c=t==null?0:t.length;if(!c)return-1;var L=c;return o!==n&&(L=Ht(o),L=L<0?On(c+L,0):Nn(L,c-1)),i===i?wf(t,i,L):rs(t,qa,L,!0)}function Vd(t,i){return t&&t.length?wu(t,Ht(i)):n}var qd=qt(fc);function fc(t,i){return t&&t.length&&i&&i.length?Ro(t,i):t}function zd(t,i,o){return t&&t.length&&i&&i.length?Ro(t,i,ct(o,2)):t}function Gd(t,i,o){return t&&t.length&&i&&i.length?Ro(t,i,n,o):t}var jd=Fr(function(t,i){var o=t==null?0:t.length,c=bo(t,i);return Au(t,fn(i,function(L){return kr(L,o)?+L:L}).sort(Nu)),c});function Kd(t,i){var o=[];if(!(t&&t.length))return o;var c=-1,L=[],ee=t.length;for(i=ct(i,3);++c<ee;){var ne=t[c];i(ne,c,t)&&(o.push(ne),L.push(c))}return Au(t,L),o}function Ko(t){return t==null?t:Hf.call(t)}function Xd(t,i,o){var c=t==null?0:t.length;return c?(o&&typeof o!="number"&&qn(t,i,o)?(i=0,o=c):(i=i==null?0:Ht(i),o=o===n?c:Ht(o)),dr(t,i,o)):[]}function Yd(t,i){return Is(t,i)}function Zd(t,i,o){return Co(t,i,ct(o,2))}function Jd(t,i){var o=t==null?0:t.length;if(o){var c=Is(t,i);if(c<o&&Sr(t[c],i))return c}return-1}function Qd(t,i){return Is(t,i,!0)}function ep(t,i,o){return Co(t,i,ct(o,2),!0)}function tp(t,i){var o=t==null?0:t.length;if(o){var c=Is(t,i,!0)-1;if(Sr(t[c],i))return c}return-1}function np(t){return t&&t.length?Tu(t):[]}function rp(t,i){return t&&t.length?Tu(t,ct(i,2)):[]}function ip(t){var i=t==null?0:t.length;return i?dr(t,1,i):[]}function sp(t,i,o){return t&&t.length?(i=o||i===n?1:Ht(i),dr(t,0,i<0?0:i)):[]}function op(t,i,o){var c=t==null?0:t.length;return c?(i=o||i===n?1:Ht(i),i=c-i,dr(t,i<0?0:i,c)):[]}function ap(t,i){return t&&t.length?As(t,ct(i,3),!1,!0):[]}function up(t,i){return t&&t.length?As(t,ct(i,3)):[]}var cp=qt(function(t){return Kr(xn(t,1,mn,!0))}),lp=qt(function(t){var i=pr(t);return mn(i)&&(i=n),Kr(xn(t,1,mn,!0),ct(i,2))}),fp=qt(function(t){var i=pr(t);return i=typeof i=="function"?i:n,Kr(xn(t,1,mn,!0),n,i)});function hp(t){return t&&t.length?Kr(t):[]}function dp(t,i){return t&&t.length?Kr(t,ct(i,2)):[]}function pp(t,i){return i=typeof i=="function"?i:n,t&&t.length?Kr(t,n,i):[]}function Xo(t){if(!(t&&t.length))return[];var i=0;return t=Vr(t,function(o){if(mn(o))return i=On(o.length,i),!0}),fo(i,function(o){return fn(t,uo(o))})}function hc(t,i){if(!(t&&t.length))return[];var o=Xo(t);return i==null?o:fn(o,function(c){return nr(i,n,c)})}var gp=qt(function(t,i){return mn(t)?$i(t,i):[]}),_p=qt(function(t){return Mo(Vr(t,mn))}),mp=qt(function(t){var i=pr(t);return mn(i)&&(i=n),Mo(Vr(t,mn),ct(i,2))}),vp=qt(function(t){var i=pr(t);return i=typeof i=="function"?i:n,Mo(Vr(t,mn),n,i)}),yp=qt(Xo);function bp(t,i){return Lu(t||[],i||[],Bi)}function wp(t,i){return Lu(t||[],i||[],Vi)}var Ep=qt(function(t){var i=t.length,o=i>1?t[i-1]:n;return o=typeof o=="function"?(t.pop(),o):n,hc(t,o)});function dc(t){var i=V(t);return i.__chain__=!0,i}function Ip(t,i){return i(t),t}function Ms(t,i){return i(t)}var Ap=Fr(function(t){var i=t.length,o=i?t[0]:0,c=this.__wrapped__,L=function(ee){return bo(ee,t)};return i>1||this.__actions__.length||!(c instanceof Xt)||!kr(o)?this.thru(L):(c=c.slice(o,+o+(i?1:0)),c.__actions__.push({func:Ms,args:[L],thisArg:n}),new fr(c,this.__chain__).thru(function(ee){return i&&!ee.length&&ee.push(n),ee}))});function Sp(){return dc(this)}function Tp(){return new fr(this.value(),this.__chain__)}function Rp(){this.__values__===n&&(this.__values__=Oc(this.value()));var t=this.__index__>=this.__values__.length,i=t?n:this.__values__[this.__index__++];return{done:t,value:i}}function Pp(){return this}function Lp(t){for(var i,o=this;o instanceof vs;){var c=oc(o);c.__index__=0,c.__values__=n,i?L.__wrapped__=c:i=c;var L=c;o=o.__wrapped__}return L.__wrapped__=t,i}function Cp(){var t=this.__wrapped__;if(t instanceof Xt){var i=t;return this.__actions__.length&&(i=new Xt(this)),i=i.reverse(),i.__actions__.push({func:Ms,args:[Ko],thisArg:n}),new fr(i,this.__chain__)}return this.thru(Ko)}function xp(){return Pu(this.__wrapped__,this.__actions__)}var Mp=Ss(function(t,i,o){Qt.call(t,o)?++t[o]:Dr(t,o,1)});function Np(t,i,o){var c=kt(t)?Wa:Ih;return o&&qn(t,i,o)&&(i=n),c(t,ct(i,3))}function Dp(t,i){var o=kt(t)?Vr:hu;return o(t,ct(i,3))}var Up=$u(ac),Fp=$u(uc);function kp(t,i){return xn(Ns(t,i),1)}function Bp(t,i){return xn(Ns(t,i),Qr)}function $p(t,i,o){return o=o===n?1:Ht(o),xn(Ns(t,i),o)}function pc(t,i){var o=kt(t)?cr:jr;return o(t,ct(i,3))}function gc(t,i){var o=kt(t)?rf:fu;return o(t,ct(i,3))}var Hp=Ss(function(t,i,o){Qt.call(t,o)?t[o].push(i):Dr(t,o,[i])});function Wp(t,i,o,c){t=Jn(t)?t:Si(t),o=o&&!c?Ht(o):0;var L=t.length;return o<0&&(o=On(L+o,0)),Bs(t)?o<=L&&t.indexOf(i,o)>-1:!!L&&di(t,i,o)>-1}var Vp=qt(function(t,i,o){var c=-1,L=typeof i=="function",ee=Jn(t)?de(t.length):[];return jr(t,function(ne){ee[++c]=L?nr(i,ne,o):Hi(ne,i,o)}),ee}),qp=Ss(function(t,i,o){Dr(t,o,i)});function Ns(t,i){var o=kt(t)?fn:vu;return o(t,ct(i,3))}function zp(t,i,o,c){return t==null?[]:(kt(i)||(i=i==null?[]:[i]),o=c?n:o,kt(o)||(o=o==null?[]:[o]),Eu(t,i,o))}var Gp=Ss(function(t,i,o){t[o?0:1].push(i)},function(){return[[],[]]});function jp(t,i,o){var c=kt(t)?oo:Ga,L=arguments.length<3;return c(t,ct(i,4),o,L,jr)}function Kp(t,i,o){var c=kt(t)?sf:Ga,L=arguments.length<3;return c(t,ct(i,4),o,L,fu)}function Xp(t,i){var o=kt(t)?Vr:hu;return o(t,Fs(ct(i,3)))}function Yp(t){var i=kt(t)?au:Hh;return i(t)}function Zp(t,i,o){(o?qn(t,i,o):i===n)?i=1:i=Ht(i);var c=kt(t)?vh:Wh;return c(t,i)}function Jp(t){var i=kt(t)?yh:qh;return i(t)}function Qp(t){if(t==null)return 0;if(Jn(t))return Bs(t)?gi(t):t.length;var i=Fn(t);return i==yr||i==br?t.size:To(t).length}function eg(t,i,o){var c=kt(t)?ao:zh;return o&&qn(t,i,o)&&(i=n),c(t,ct(i,3))}var tg=qt(function(t,i){if(t==null)return[];var o=i.length;return o>1&&qn(t,i[0],i[1])?i=[]:o>2&&qn(i[0],i[1],i[2])&&(i=[i[0]]),Eu(t,xn(i,1),[])}),Ds=Nf||function(){return Cn.Date.now()};function ng(t,i){if(typeof i!="function")throw new lr(h);return t=Ht(t),function(){if(--t<1)return i.apply(this,arguments)}}function _c(t,i,o){return i=o?n:i,i=t&&i==null?t.length:i,Ur(t,xt,n,n,n,n,i)}function mc(t,i){var o;if(typeof i!="function")throw new lr(h);return t=Ht(t),function(){return--t>0&&(o=i.apply(this,arguments)),t<=1&&(i=n),o}}var Yo=qt(function(t,i,o){var c=ae;if(o.length){var L=zr(o,Ii(Yo));c|=Ge}return Ur(t,c,i,o,L)}),vc=qt(function(t,i,o){var c=ae|fe;if(o.length){var L=zr(o,Ii(vc));c|=Ge}return Ur(i,c,t,o,L)});function yc(t,i,o){i=o?n:i;var c=Ur(t,Ve,n,n,n,n,n,i);return c.placeholder=yc.placeholder,c}function bc(t,i,o){i=o?n:i;var c=Ur(t,Ct,n,n,n,n,n,i);return c.placeholder=bc.placeholder,c}function wc(t,i,o){var c,L,ee,ne,ie,le,Ce=0,Me=!1,He=!1,ze=!0;if(typeof t!="function")throw new lr(h);i=mr(i)||0,dn(o)&&(Me=!!o.leading,He="maxWait"in o,ee=He?On(mr(o.maxWait)||0,i):ee,ze="trailing"in o?!!o.trailing:ze);function ut(In){var Tr=c,Hr=L;return c=L=n,Ce=In,ne=t.apply(Hr,Tr),ne}function Ot(In){return Ce=In,ie=Gi(Gt,i),Me?ut(In):ne}function Wt(In){var Tr=In-le,Hr=In-Ce,$c=i-Tr;return He?Nn($c,ee-Hr):$c}function Lt(In){var Tr=In-le,Hr=In-Ce;return le===n||Tr>=i||Tr<0||He&&Hr>=ee}function Gt(){var In=Ds();if(Lt(In))return Yt(In);ie=Gi(Gt,Wt(In))}function Yt(In){return ie=n,ze&&c?ut(In):(c=L=n,ne)}function or(){ie!==n&&Cu(ie),Ce=0,c=le=L=ie=n}function Kn(){return ie===n?ne:Yt(Ds())}function ar(){var In=Ds(),Tr=Lt(In);if(c=arguments,L=this,le=In,Tr){if(ie===n)return Ot(le);if(He)return Cu(ie),ie=Gi(Gt,i),ut(le)}return ie===n&&(ie=Gi(Gt,i)),ne}return ar.cancel=or,ar.flush=Kn,ar}var rg=qt(function(t,i){return lu(t,1,i)}),ig=qt(function(t,i,o){return lu(t,mr(i)||0,o)});function sg(t){return Ur(t,_n)}function Us(t,i){if(typeof t!="function"||i!=null&&typeof i!="function")throw new lr(h);var o=function(){var c=arguments,L=i?i.apply(this,c):c[0],ee=o.cache;if(ee.has(L))return ee.get(L);var ne=t.apply(this,c);return o.cache=ee.set(L,ne)||ee,ne};return o.cache=new(Us.Cache||Nr),o}Us.Cache=Nr;function Fs(t){if(typeof t!="function")throw new lr(h);return function(){var i=arguments;switch(i.length){case 0:return!t.call(this);case 1:return!t.call(this,i[0]);case 2:return!t.call(this,i[0],i[1]);case 3:return!t.call(this,i[0],i[1],i[2])}return!t.apply(this,i)}}function og(t){return mc(2,t)}var ag=Gh(function(t,i){i=i.length==1&&kt(i[0])?fn(i[0],rr(ct())):fn(xn(i,1),rr(ct()));var o=i.length;return qt(function(c){for(var L=-1,ee=Nn(c.length,o);++L<ee;)c[L]=i[L].call(this,c[L]);return nr(t,this,c)})}),Zo=qt(function(t,i){var o=zr(i,Ii(Zo));return Ur(t,Ge,n,i,o)}),Ec=qt(function(t,i){var o=zr(i,Ii(Ec));return Ur(t,st,n,i,o)}),ug=Fr(function(t,i){return Ur(t,Kt,n,n,n,i)});function cg(t,i){if(typeof t!="function")throw new lr(h);return i=i===n?i:Ht(i),qt(t,i)}function lg(t,i){if(typeof t!="function")throw new lr(h);return i=i==null?0:On(Ht(i),0),qt(function(o){var c=o[i],L=Yr(o,0,i);return c&&qr(L,c),nr(t,this,L)})}function fg(t,i,o){var c=!0,L=!0;if(typeof t!="function")throw new lr(h);return dn(o)&&(c="leading"in o?!!o.leading:c,L="trailing"in o?!!o.trailing:L),wc(t,i,{leading:c,maxWait:i,trailing:L})}function hg(t){return _c(t,1)}function dg(t,i){return Zo(Do(i),t)}function pg(){if(!arguments.length)return[];var t=arguments[0];return kt(t)?t:[t]}function gg(t){return hr(t,ue)}function _g(t,i){return i=typeof i=="function"?i:n,hr(t,ue,i)}function mg(t){return hr(t,se|ue)}function vg(t,i){return i=typeof i=="function"?i:n,hr(t,se|ue,i)}function yg(t,i){return i==null||cu(t,i,Ln(i))}function Sr(t,i){return t===i||t!==t&&i!==i}var bg=Ps(Io),wg=Ps(function(t,i){return t>=i}),ui=gu(function(){return arguments}())?gu:function(t){return pn(t)&&Qt.call(t,"callee")&&!tu.call(t,"callee")},kt=de.isArray,Eg=Ua?rr(Ua):Ph;function Jn(t){return t!=null&&ks(t.length)&&!Br(t)}function mn(t){return pn(t)&&Jn(t)}function Ig(t){return t===!0||t===!1||pn(t)&&$n(t)==Ti}var Zr=Uf||ua,Ag=Fa?rr(Fa):Lh;function Sg(t){return pn(t)&&t.nodeType===1&&!ji(t)}function Tg(t){if(t==null)return!0;if(Jn(t)&&(kt(t)||typeof t=="string"||typeof t.splice=="function"||Zr(t)||Ai(t)||ui(t)))return!t.length;var i=Fn(t);if(i==yr||i==br)return!t.size;if(zi(t))return!To(t).length;for(var o in t)if(Qt.call(t,o))return!1;return!0}function Og(t,i){return Wi(t,i)}function Rg(t,i,o){o=typeof o=="function"?o:n;var c=o?o(t,i):n;return c===n?Wi(t,i,n,o):!!c}function Jo(t){if(!pn(t))return!1;var i=$n(t);return i==Yi||i==Xc||typeof t.message=="string"&&typeof t.name=="string"&&!ji(t)}function Pg(t){return typeof t=="number"&&ru(t)}function Br(t){if(!dn(t))return!1;var i=$n(t);return i==Zi||i==la||i==Kc||i==Zc}function Ic(t){return typeof t=="number"&&t==Ht(t)}function ks(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=Wr}function dn(t){var i=typeof t;return t!=null&&(i=="object"||i=="function")}function pn(t){return t!=null&&typeof t=="object"}var Ac=ka?rr(ka):xh;function Lg(t,i){return t===i||So(t,i,Wo(i))}function Cg(t,i,o){return o=typeof o=="function"?o:n,So(t,i,Wo(i),o)}function xg(t){return Sc(t)&&t!=+t}function Mg(t){if(gd(t))throw new Ut(u);return _u(t)}function Ng(t){return t===null}function Dg(t){return t==null}function Sc(t){return typeof t=="number"||pn(t)&&$n(t)==Ri}function ji(t){if(!pn(t)||$n(t)!=xr)return!1;var i=fs(t);if(i===null)return!0;var o=Qt.call(i,"constructor")&&i.constructor;return typeof o=="function"&&o instanceof o&&as.call(o)==Lf}var Qo=Ba?rr(Ba):Mh;function Ug(t){return Ic(t)&&t>=-Wr&&t<=Wr}var Tc=$a?rr($a):Nh;function Bs(t){return typeof t=="string"||!kt(t)&&pn(t)&&$n(t)==Li}function sr(t){return typeof t=="symbol"||pn(t)&&$n(t)==Ji}var Ai=Ha?rr(Ha):Dh;function Fg(t){return t===n}function kg(t){return pn(t)&&Fn(t)==Ci}function Bg(t){return pn(t)&&$n(t)==Qc}var $g=Ps(Oo),Hg=Ps(function(t,i){return t<=i});function Oc(t){if(!t)return[];if(Jn(t))return Bs(t)?wr(t):Zn(t);if(Ni&&t[Ni])return vf(t[Ni]());var i=Fn(t),o=i==yr?po:i==br?is:Si;return o(t)}function $r(t){if(!t)return t===0?t:0;if(t=mr(t),t===Qr||t===-Qr){var i=t<0?-1:1;return i*qc}return t===t?t:0}function Ht(t){var i=$r(t),o=i%1;return i===i?o?i-o:i:0}function Rc(t){return t?ii(Ht(t),0,Or):0}function mr(t){if(typeof t=="number")return t;if(sr(t))return Ki;if(dn(t)){var i=typeof t.valueOf=="function"?t.valueOf():t;t=dn(i)?i+"":i}if(typeof t!="string")return t===0?t:+t;t=ja(t);var o=bl.test(t);return o||El.test(t)?ef(t.slice(2),o?2:8):yl.test(t)?Ki:+t}function Pc(t){return Pr(t,er(t))}function Wg(t){return t?ii(Ht(t),-Wr,Wr):t===0?t:0}function Jt(t){return t==null?"":ir(t)}var Vg=wi(function(t,i){if(zi(i)||Jn(i)){Pr(i,Ln(i),t);return}for(var o in i)Qt.call(i,o)&&Bi(t,o,i[o])}),Lc=wi(function(t,i){Pr(i,er(i),t)}),$s=wi(function(t,i,o,c){Pr(i,er(i),t,c)}),qg=wi(function(t,i,o,c){Pr(i,Ln(i),t,c)}),zg=Fr(bo);function Gg(t,i){var o=bi(t);return i==null?o:uu(o,i)}var jg=qt(function(t,i){t=sn(t);var o=-1,c=i.length,L=c>2?i[2]:n;for(L&&qn(i[0],i[1],L)&&(c=1);++o<c;)for(var ee=i[o],ne=er(ee),ie=-1,le=ne.length;++ie<le;){var Ce=ne[ie],Me=t[Ce];(Me===n||Sr(Me,mi[Ce])&&!Qt.call(t,Ce))&&(t[Ce]=ee[Ce])}return t}),Kg=qt(function(t){return t.push(n,ju),nr(Cc,n,t)});function Xg(t,i){return Va(t,ct(i,3),Rr)}function Yg(t,i){return Va(t,ct(i,3),Eo)}function Zg(t,i){return t==null?t:wo(t,ct(i,3),er)}function Jg(t,i){return t==null?t:du(t,ct(i,3),er)}function Qg(t,i){return t&&Rr(t,ct(i,3))}function e_(t,i){return t&&Eo(t,ct(i,3))}function t_(t){return t==null?[]:ws(t,Ln(t))}function n_(t){return t==null?[]:ws(t,er(t))}function ea(t,i,o){var c=t==null?n:si(t,i);return c===n?o:c}function r_(t,i){return t!=null&&Yu(t,i,Sh)}function ta(t,i){return t!=null&&Yu(t,i,Th)}var i_=Wu(function(t,i,o){i!=null&&typeof i.toString!="function"&&(i=us.call(i)),t[i]=o},ra(tr)),s_=Wu(function(t,i,o){i!=null&&typeof i.toString!="function"&&(i=us.call(i)),Qt.call(t,i)?t[i].push(o):t[i]=[o]},ct),o_=qt(Hi);function Ln(t){return Jn(t)?ou(t):To(t)}function er(t){return Jn(t)?ou(t,!0):Uh(t)}function a_(t,i){var o={};return i=ct(i,3),Rr(t,function(c,L,ee){Dr(o,i(c,L,ee),c)}),o}function u_(t,i){var o={};return i=ct(i,3),Rr(t,function(c,L,ee){Dr(o,L,i(c,L,ee))}),o}var c_=wi(function(t,i,o){Es(t,i,o)}),Cc=wi(function(t,i,o,c){Es(t,i,o,c)}),l_=Fr(function(t,i){var o={};if(t==null)return o;var c=!1;i=fn(i,function(ee){return ee=Xr(ee,t),c||(c=ee.length>1),ee}),Pr(t,$o(t),o),c&&(o=hr(o,se|re|ue,rd));for(var L=i.length;L--;)xo(o,i[L]);return o});function f_(t,i){return xc(t,Fs(ct(i)))}var h_=Fr(function(t,i){return t==null?{}:kh(t,i)});function xc(t,i){if(t==null)return{};var o=fn($o(t),function(c){return[c]});return i=ct(i),Iu(t,o,function(c,L){return i(c,L[0])})}function d_(t,i,o){i=Xr(i,t);var c=-1,L=i.length;for(L||(L=1,t=n);++c<L;){var ee=t==null?n:t[Lr(i[c])];ee===n&&(c=L,ee=o),t=Br(ee)?ee.call(t):ee}return t}function p_(t,i,o){return t==null?t:Vi(t,i,o)}function g_(t,i,o,c){return c=typeof c=="function"?c:n,t==null?t:Vi(t,i,o,c)}var Mc=zu(Ln),Nc=zu(er);function __(t,i,o){var c=kt(t),L=c||Zr(t)||Ai(t);if(i=ct(i,4),o==null){var ee=t&&t.constructor;L?o=c?new ee:[]:dn(t)?o=Br(ee)?bi(fs(t)):{}:o={}}return(L?cr:Rr)(t,function(ne,ie,le){return i(o,ne,ie,le)}),o}function m_(t,i){return t==null?!0:xo(t,i)}function v_(t,i,o){return t==null?t:Ru(t,i,Do(o))}function y_(t,i,o,c){return c=typeof c=="function"?c:n,t==null?t:Ru(t,i,Do(o),c)}function Si(t){return t==null?[]:ho(t,Ln(t))}function b_(t){return t==null?[]:ho(t,er(t))}function w_(t,i,o){return o===n&&(o=i,i=n),o!==n&&(o=mr(o),o=o===o?o:0),i!==n&&(i=mr(i),i=i===i?i:0),ii(mr(t),i,o)}function E_(t,i,o){return i=$r(i),o===n?(o=i,i=0):o=$r(o),t=mr(t),Oh(t,i,o)}function I_(t,i,o){if(o&&typeof o!="boolean"&&qn(t,i,o)&&(i=o=n),o===n&&(typeof i=="boolean"?(o=i,i=n):typeof t=="boolean"&&(o=t,t=n)),t===n&&i===n?(t=0,i=1):(t=$r(t),i===n?(i=t,t=0):i=$r(i)),t>i){var c=t;t=i,i=c}if(o||t%1||i%1){var L=iu();return Nn(t+L*(i-t+Ql("1e-"+((L+"").length-1))),i)}return Po(t,i)}var A_=Ei(function(t,i,o){return i=i.toLowerCase(),t+(o?Dc(i):i)});function Dc(t){return na(Jt(t).toLowerCase())}function Uc(t){return t=Jt(t),t&&t.replace(Al,df).replace(Vl,"")}function S_(t,i,o){t=Jt(t),i=ir(i);var c=t.length;o=o===n?c:ii(Ht(o),0,c);var L=o;return o-=i.length,o>=0&&t.slice(o,L)==i}function T_(t){return t=Jt(t),t&&il.test(t)?t.replace(da,pf):t}function O_(t){return t=Jt(t),t&&ll.test(t)?t.replace(Ys,"\\$&"):t}var R_=Ei(function(t,i,o){return t+(o?"-":"")+i.toLowerCase()}),P_=Ei(function(t,i,o){return t+(o?" ":"")+i.toLowerCase()}),L_=Bu("toLowerCase");function C_(t,i,o){t=Jt(t),i=Ht(i);var c=i?gi(t):0;if(!i||c>=i)return t;var L=(i-c)/2;return Rs(gs(L),o)+t+Rs(ps(L),o)}function x_(t,i,o){t=Jt(t),i=Ht(i);var c=i?gi(t):0;return i&&c<i?t+Rs(i-c,o):t}function M_(t,i,o){t=Jt(t),i=Ht(i);var c=i?gi(t):0;return i&&c<i?Rs(i-c,o)+t:t}function N_(t,i,o){return o||i==null?i=0:i&&(i=+i),$f(Jt(t).replace(Zs,""),i||0)}function D_(t,i,o){return(o?qn(t,i,o):i===n)?i=1:i=Ht(i),Lo(Jt(t),i)}function U_(){var t=arguments,i=Jt(t[0]);return t.length<3?i:i.replace(t[1],t[2])}var F_=Ei(function(t,i,o){return t+(o?"_":"")+i.toLowerCase()});function k_(t,i,o){return o&&typeof o!="number"&&qn(t,i,o)&&(i=o=n),o=o===n?Or:o>>>0,o?(t=Jt(t),t&&(typeof i=="string"||i!=null&&!Qo(i))&&(i=ir(i),!i&&pi(t))?Yr(wr(t),0,o):t.split(i,o)):[]}var B_=Ei(function(t,i,o){return t+(o?" ":"")+na(i)});function $_(t,i,o){return t=Jt(t),o=o==null?0:ii(Ht(o),0,t.length),i=ir(i),t.slice(o,o+i.length)==i}function H_(t,i,o){var c=V.templateSettings;o&&qn(t,i,o)&&(i=n),t=Jt(t),i=$s({},i,c,Gu);var L=$s({},i.imports,c.imports,Gu),ee=Ln(L),ne=ho(L,ee),ie,le,Ce=0,Me=i.interpolate||Qi,He="__p += '",ze=go((i.escape||Qi).source+"|"+Me.source+"|"+(Me===pa?vl:Qi).source+"|"+(i.evaluate||Qi).source+"|$","g"),ut="//# sourceURL="+(Qt.call(i,"sourceURL")?(i.sourceURL+"").replace(/\s/g," "):"lodash.templateSources["+ ++Kl+"]")+`
`;t.replace(ze,function(Lt,Gt,Yt,or,Kn,ar){return Yt||(Yt=or),He+=t.slice(Ce,ar).replace(Sl,gf),Gt&&(ie=!0,He+=`' +
__e(`+Gt+`) +
'`),Kn&&(le=!0,He+=`';
`+Kn+`;
__p += '`),Yt&&(He+=`' +
((__t = (`+Yt+`)) == null ? '' : __t) +
'`),Ce=ar+Lt.length,Lt}),He+=`';
`;var Ot=Qt.call(i,"variable")&&i.variable;if(!Ot)He=`with (obj) {
`+He+`
}
`;else if(_l.test(Ot))throw new Ut(w);He=(le?He.replace(el,""):He).replace(tl,"$1").replace(nl,"$1;"),He="function("+(Ot||"obj")+`) {
`+(Ot?"":`obj || (obj = {});
`)+"var __t, __p = ''"+(ie?", __e = _.escape":"")+(le?`, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
`:`;
`)+He+`return __p
}`;var Wt=kc(function(){return Zt(ee,ut+"return "+He).apply(n,ne)});if(Wt.source=He,Jo(Wt))throw Wt;return Wt}function W_(t){return Jt(t).toLowerCase()}function V_(t){return Jt(t).toUpperCase()}function q_(t,i,o){if(t=Jt(t),t&&(o||i===n))return ja(t);if(!t||!(i=ir(i)))return t;var c=wr(t),L=wr(i),ee=Ka(c,L),ne=Xa(c,L)+1;return Yr(c,ee,ne).join("")}function z_(t,i,o){if(t=Jt(t),t&&(o||i===n))return t.slice(0,Za(t)+1);if(!t||!(i=ir(i)))return t;var c=wr(t),L=Xa(c,wr(i))+1;return Yr(c,0,L).join("")}function G_(t,i,o){if(t=Jt(t),t&&(o||i===n))return t.replace(Zs,"");if(!t||!(i=ir(i)))return t;var c=wr(t),L=Ka(c,wr(i));return Yr(c,L).join("")}function j_(t,i){var o=Cr,c=Jr;if(dn(i)){var L="separator"in i?i.separator:L;o="length"in i?Ht(i.length):o,c="omission"in i?ir(i.omission):c}t=Jt(t);var ee=t.length;if(pi(t)){var ne=wr(t);ee=ne.length}if(o>=ee)return t;var ie=o-gi(c);if(ie<1)return c;var le=ne?Yr(ne,0,ie).join(""):t.slice(0,ie);if(L===n)return le+c;if(ne&&(ie+=le.length-ie),Qo(L)){if(t.slice(ie).search(L)){var Ce,Me=le;for(L.global||(L=go(L.source,Jt(ga.exec(L))+"g")),L.lastIndex=0;Ce=L.exec(Me);)var He=Ce.index;le=le.slice(0,He===n?ie:He)}}else if(t.indexOf(ir(L),ie)!=ie){var ze=le.lastIndexOf(L);ze>-1&&(le=le.slice(0,ze))}return le+c}function K_(t){return t=Jt(t),t&&rl.test(t)?t.replace(ha,Ef):t}var X_=Ei(function(t,i,o){return t+(o?" ":"")+i.toUpperCase()}),na=Bu("toUpperCase");function Fc(t,i,o){return t=Jt(t),i=o?n:i,i===n?mf(t)?Sf(t):uf(t):t.match(i)||[]}var kc=qt(function(t,i){try{return nr(t,n,i)}catch(o){return Jo(o)?o:new Ut(o)}}),Y_=Fr(function(t,i){return cr(i,function(o){o=Lr(o),Dr(t,o,Yo(t[o],t))}),t});function Z_(t){var i=t==null?0:t.length,o=ct();return t=i?fn(t,function(c){if(typeof c[1]!="function")throw new lr(h);return[o(c[0]),c[1]]}):[],qt(function(c){for(var L=-1;++L<i;){var ee=t[L];if(nr(ee[0],this,c))return nr(ee[1],this,c)}})}function J_(t){return Eh(hr(t,se))}function ra(t){return function(){return t}}function Q_(t,i){return t==null||t!==t?i:t}var em=Hu(),tm=Hu(!0);function tr(t){return t}function ia(t){return mu(typeof t=="function"?t:hr(t,se))}function nm(t){return yu(hr(t,se))}function rm(t,i){return bu(t,hr(i,se))}var im=qt(function(t,i){return function(o){return Hi(o,t,i)}}),sm=qt(function(t,i){return function(o){return Hi(t,o,i)}});function sa(t,i,o){var c=Ln(i),L=ws(i,c);o==null&&!(dn(i)&&(L.length||!c.length))&&(o=i,i=t,t=this,L=ws(i,Ln(i)));var ee=!(dn(o)&&"chain"in o)||!!o.chain,ne=Br(t);return cr(L,function(ie){var le=i[ie];t[ie]=le,ne&&(t.prototype[ie]=function(){var Ce=this.__chain__;if(ee||Ce){var Me=t(this.__wrapped__),He=Me.__actions__=Zn(this.__actions__);return He.push({func:le,args:arguments,thisArg:t}),Me.__chain__=Ce,Me}return le.apply(t,qr([this.value()],arguments))})}),t}function om(){return Cn._===this&&(Cn._=Cf),this}function oa(){}function am(t){return t=Ht(t),qt(function(i){return wu(i,t)})}var um=Fo(fn),cm=Fo(Wa),lm=Fo(ao);function Bc(t){return qo(t)?uo(Lr(t)):Bh(t)}function fm(t){return function(i){return t==null?n:si(t,i)}}var hm=Vu(),dm=Vu(!0);function aa(){return[]}function ua(){return!1}function pm(){return{}}function gm(){return""}function _m(){return!0}function mm(t,i){if(t=Ht(t),t<1||t>Wr)return[];var o=Or,c=Nn(t,Or);i=ct(i),t-=Or;for(var L=fo(c,i);++o<t;)i(o);return L}function vm(t){return kt(t)?fn(t,Lr):sr(t)?[t]:Zn(sc(Jt(t)))}function ym(t){var i=++Pf;return Jt(t)+i}var bm=Os(function(t,i){return t+i},0),wm=ko("ceil"),Em=Os(function(t,i){return t/i},1),Im=ko("floor");function Am(t){return t&&t.length?bs(t,tr,Io):n}function Sm(t,i){return t&&t.length?bs(t,ct(i,2),Io):n}function Tm(t){return za(t,tr)}function Om(t,i){return za(t,ct(i,2))}function Rm(t){return t&&t.length?bs(t,tr,Oo):n}function Pm(t,i){return t&&t.length?bs(t,ct(i,2),Oo):n}var Lm=Os(function(t,i){return t*i},1),Cm=ko("round"),xm=Os(function(t,i){return t-i},0);function Mm(t){return t&&t.length?lo(t,tr):0}function Nm(t,i){return t&&t.length?lo(t,ct(i,2)):0}return V.after=ng,V.ary=_c,V.assign=Vg,V.assignIn=Lc,V.assignInWith=$s,V.assignWith=qg,V.at=zg,V.before=mc,V.bind=Yo,V.bindAll=Y_,V.bindKey=vc,V.castArray=pg,V.chain=dc,V.chunk=Ed,V.compact=Id,V.concat=Ad,V.cond=Z_,V.conforms=J_,V.constant=ra,V.countBy=Mp,V.create=Gg,V.curry=yc,V.curryRight=bc,V.debounce=wc,V.defaults=jg,V.defaultsDeep=Kg,V.defer=rg,V.delay=ig,V.difference=Sd,V.differenceBy=Td,V.differenceWith=Od,V.drop=Rd,V.dropRight=Pd,V.dropRightWhile=Ld,V.dropWhile=Cd,V.fill=xd,V.filter=Dp,V.flatMap=kp,V.flatMapDeep=Bp,V.flatMapDepth=$p,V.flatten=cc,V.flattenDeep=Md,V.flattenDepth=Nd,V.flip=sg,V.flow=em,V.flowRight=tm,V.fromPairs=Dd,V.functions=t_,V.functionsIn=n_,V.groupBy=Hp,V.initial=Fd,V.intersection=kd,V.intersectionBy=Bd,V.intersectionWith=$d,V.invert=i_,V.invertBy=s_,V.invokeMap=Vp,V.iteratee=ia,V.keyBy=qp,V.keys=Ln,V.keysIn=er,V.map=Ns,V.mapKeys=a_,V.mapValues=u_,V.matches=nm,V.matchesProperty=rm,V.memoize=Us,V.merge=c_,V.mergeWith=Cc,V.method=im,V.methodOf=sm,V.mixin=sa,V.negate=Fs,V.nthArg=am,V.omit=l_,V.omitBy=f_,V.once=og,V.orderBy=zp,V.over=um,V.overArgs=ag,V.overEvery=cm,V.overSome=lm,V.partial=Zo,V.partialRight=Ec,V.partition=Gp,V.pick=h_,V.pickBy=xc,V.property=Bc,V.propertyOf=fm,V.pull=qd,V.pullAll=fc,V.pullAllBy=zd,V.pullAllWith=Gd,V.pullAt=jd,V.range=hm,V.rangeRight=dm,V.rearg=ug,V.reject=Xp,V.remove=Kd,V.rest=cg,V.reverse=Ko,V.sampleSize=Zp,V.set=p_,V.setWith=g_,V.shuffle=Jp,V.slice=Xd,V.sortBy=tg,V.sortedUniq=np,V.sortedUniqBy=rp,V.split=k_,V.spread=lg,V.tail=ip,V.take=sp,V.takeRight=op,V.takeRightWhile=ap,V.takeWhile=up,V.tap=Ip,V.throttle=fg,V.thru=Ms,V.toArray=Oc,V.toPairs=Mc,V.toPairsIn=Nc,V.toPath=vm,V.toPlainObject=Pc,V.transform=__,V.unary=hg,V.union=cp,V.unionBy=lp,V.unionWith=fp,V.uniq=hp,V.uniqBy=dp,V.uniqWith=pp,V.unset=m_,V.unzip=Xo,V.unzipWith=hc,V.update=v_,V.updateWith=y_,V.values=Si,V.valuesIn=b_,V.without=gp,V.words=Fc,V.wrap=dg,V.xor=_p,V.xorBy=mp,V.xorWith=vp,V.zip=yp,V.zipObject=bp,V.zipObjectDeep=wp,V.zipWith=Ep,V.entries=Mc,V.entriesIn=Nc,V.extend=Lc,V.extendWith=$s,sa(V,V),V.add=bm,V.attempt=kc,V.camelCase=A_,V.capitalize=Dc,V.ceil=wm,V.clamp=w_,V.clone=gg,V.cloneDeep=mg,V.cloneDeepWith=vg,V.cloneWith=_g,V.conformsTo=yg,V.deburr=Uc,V.defaultTo=Q_,V.divide=Em,V.endsWith=S_,V.eq=Sr,V.escape=T_,V.escapeRegExp=O_,V.every=Np,V.find=Up,V.findIndex=ac,V.findKey=Xg,V.findLast=Fp,V.findLastIndex=uc,V.findLastKey=Yg,V.floor=Im,V.forEach=pc,V.forEachRight=gc,V.forIn=Zg,V.forInRight=Jg,V.forOwn=Qg,V.forOwnRight=e_,V.get=ea,V.gt=bg,V.gte=wg,V.has=r_,V.hasIn=ta,V.head=lc,V.identity=tr,V.includes=Wp,V.indexOf=Ud,V.inRange=E_,V.invoke=o_,V.isArguments=ui,V.isArray=kt,V.isArrayBuffer=Eg,V.isArrayLike=Jn,V.isArrayLikeObject=mn,V.isBoolean=Ig,V.isBuffer=Zr,V.isDate=Ag,V.isElement=Sg,V.isEmpty=Tg,V.isEqual=Og,V.isEqualWith=Rg,V.isError=Jo,V.isFinite=Pg,V.isFunction=Br,V.isInteger=Ic,V.isLength=ks,V.isMap=Ac,V.isMatch=Lg,V.isMatchWith=Cg,V.isNaN=xg,V.isNative=Mg,V.isNil=Dg,V.isNull=Ng,V.isNumber=Sc,V.isObject=dn,V.isObjectLike=pn,V.isPlainObject=ji,V.isRegExp=Qo,V.isSafeInteger=Ug,V.isSet=Tc,V.isString=Bs,V.isSymbol=sr,V.isTypedArray=Ai,V.isUndefined=Fg,V.isWeakMap=kg,V.isWeakSet=Bg,V.join=Hd,V.kebabCase=R_,V.last=pr,V.lastIndexOf=Wd,V.lowerCase=P_,V.lowerFirst=L_,V.lt=$g,V.lte=Hg,V.max=Am,V.maxBy=Sm,V.mean=Tm,V.meanBy=Om,V.min=Rm,V.minBy=Pm,V.stubArray=aa,V.stubFalse=ua,V.stubObject=pm,V.stubString=gm,V.stubTrue=_m,V.multiply=Lm,V.nth=Vd,V.noConflict=om,V.noop=oa,V.now=Ds,V.pad=C_,V.padEnd=x_,V.padStart=M_,V.parseInt=N_,V.random=I_,V.reduce=jp,V.reduceRight=Kp,V.repeat=D_,V.replace=U_,V.result=d_,V.round=Cm,V.runInContext=ce,V.sample=Yp,V.size=Qp,V.snakeCase=F_,V.some=eg,V.sortedIndex=Yd,V.sortedIndexBy=Zd,V.sortedIndexOf=Jd,V.sortedLastIndex=Qd,V.sortedLastIndexBy=ep,V.sortedLastIndexOf=tp,V.startCase=B_,V.startsWith=$_,V.subtract=xm,V.sum=Mm,V.sumBy=Nm,V.template=H_,V.times=mm,V.toFinite=$r,V.toInteger=Ht,V.toLength=Rc,V.toLower=W_,V.toNumber=mr,V.toSafeInteger=Wg,V.toString=Jt,V.toUpper=V_,V.trim=q_,V.trimEnd=z_,V.trimStart=G_,V.truncate=j_,V.unescape=K_,V.uniqueId=ym,V.upperCase=X_,V.upperFirst=na,V.each=pc,V.eachRight=gc,V.first=lc,sa(V,function(){var t={};return Rr(V,function(i,o){Qt.call(V.prototype,o)||(t[o]=i)}),t}(),{chain:!1}),V.VERSION=s,cr(["bind","bindKey","curry","curryRight","partial","partialRight"],function(t){V[t].placeholder=V}),cr(["drop","take"],function(t,i){Xt.prototype[t]=function(o){o=o===n?1:On(Ht(o),0);var c=this.__filtered__&&!i?new Xt(this):this.clone();return c.__filtered__?c.__takeCount__=Nn(o,c.__takeCount__):c.__views__.push({size:Nn(o,Or),type:t+(c.__dir__<0?"Right":"")}),c},Xt.prototype[t+"Right"]=function(o){return this.reverse()[t](o).reverse()}}),cr(["filter","map","takeWhile"],function(t,i){var o=i+1,c=o==ca||o==Vc;Xt.prototype[t]=function(L){var ee=this.clone();return ee.__iteratees__.push({iteratee:ct(L,3),type:o}),ee.__filtered__=ee.__filtered__||c,ee}}),cr(["head","last"],function(t,i){var o="take"+(i?"Right":"");Xt.prototype[t]=function(){return this[o](1).value()[0]}}),cr(["initial","tail"],function(t,i){var o="drop"+(i?"":"Right");Xt.prototype[t]=function(){return this.__filtered__?new Xt(this):this[o](1)}}),Xt.prototype.compact=function(){return this.filter(tr)},Xt.prototype.find=function(t){return this.filter(t).head()},Xt.prototype.findLast=function(t){return this.reverse().find(t)},Xt.prototype.invokeMap=qt(function(t,i){return typeof t=="function"?new Xt(this):this.map(function(o){return Hi(o,t,i)})}),Xt.prototype.reject=function(t){return this.filter(Fs(ct(t)))},Xt.prototype.slice=function(t,i){t=Ht(t);var o=this;return o.__filtered__&&(t>0||i<0)?new Xt(o):(t<0?o=o.takeRight(-t):t&&(o=o.drop(t)),i!==n&&(i=Ht(i),o=i<0?o.dropRight(-i):o.take(i-t)),o)},Xt.prototype.takeRightWhile=function(t){return this.reverse().takeWhile(t).reverse()},Xt.prototype.toArray=function(){return this.take(Or)},Rr(Xt.prototype,function(t,i){var o=/^(?:filter|find|map|reject)|While$/.test(i),c=/^(?:head|last)$/.test(i),L=V[c?"take"+(i=="last"?"Right":""):i],ee=c||/^find/.test(i);!L||(V.prototype[i]=function(){var ne=this.__wrapped__,ie=c?[1]:arguments,le=ne instanceof Xt,Ce=ie[0],Me=le||kt(ne),He=function(Gt){var Yt=L.apply(V,qr([Gt],ie));return c&&ze?Yt[0]:Yt};Me&&o&&typeof Ce=="function"&&Ce.length!=1&&(le=Me=!1);var ze=this.__chain__,ut=!!this.__actions__.length,Ot=ee&&!ze,Wt=le&&!ut;if(!ee&&Me){ne=Wt?ne:new Xt(this);var Lt=t.apply(ne,ie);return Lt.__actions__.push({func:Ms,args:[He],thisArg:n}),new fr(Lt,ze)}return Ot&&Wt?t.apply(this,ie):(Lt=this.thru(He),Ot?c?Lt.value()[0]:Lt.value():Lt)})}),cr(["pop","push","shift","sort","splice","unshift"],function(t){var i=ss[t],o=/^(?:push|sort|unshift)$/.test(t)?"tap":"thru",c=/^(?:pop|shift)$/.test(t);V.prototype[t]=function(){var L=arguments;if(c&&!this.__chain__){var ee=this.value();return i.apply(kt(ee)?ee:[],L)}return this[o](function(ne){return i.apply(kt(ne)?ne:[],L)})}}),Rr(Xt.prototype,function(t,i){var o=V[i];if(o){var c=o.name+"";Qt.call(yi,c)||(yi[c]=[]),yi[c].push({name:i,func:o})}}),yi[Ts(n,fe).name]=[{name:"wrapper",func:n}],Xt.prototype.clone=jf,Xt.prototype.reverse=Kf,Xt.prototype.value=Xf,V.prototype.at=Ap,V.prototype.chain=Sp,V.prototype.commit=Tp,V.prototype.next=Rp,V.prototype.plant=Lp,V.prototype.reverse=Cp,V.prototype.toJSON=V.prototype.valueOf=V.prototype.value=xp,V.prototype.first=V.prototype.head,Ni&&(V.prototype[Ni]=Pp),V},_i=Tf();ei?((ei.exports=_i)._=_i,ro._=_i):Cn._=_i}).call(commonjsGlobal)})(lodash,lodash.exports);var _=lodash.exports,shortUniqueId={exports:{}};(function(r){var e=(()=>{var n=Object.defineProperty,s=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable,h=(ae,fe,Be)=>fe in ae?n(ae,fe,{enumerable:!0,configurable:!0,writable:!0,value:Be}):ae[fe]=Be,w=(ae,fe)=>{for(var Be in fe||(fe={}))a.call(fe,Be)&&h(ae,Be,fe[Be]);if(s)for(var Be of s(fe))u.call(fe,Be)&&h(ae,Be,fe[Be]);return ae},B=ae=>n(ae,"__esModule",{value:!0}),k=(ae,fe)=>{B(ae);for(var Be in fe)n(ae,Be,{get:fe[Be],enumerable:!0})},te={};k(te,{DEFAULT_UUID_LENGTH:()=>re,default:()=>ve});var se="4.4.4",re=6,ue={dictionary:"alphanum",shuffle:!0,debug:!1,length:re},he=class extends Function{constructor(ae={}){super();this.dictIndex=0,this.dictRange=[],this.lowerBound=0,this.upperBound=0,this.dictLength=0,this._digit_first_ascii=48,this._digit_last_ascii=58,this._alpha_lower_first_ascii=97,this._alpha_lower_last_ascii=123,this._hex_last_ascii=103,this._alpha_upper_first_ascii=65,this._alpha_upper_last_ascii=91,this._number_dict_ranges={digits:[this._digit_first_ascii,this._digit_last_ascii]},this._alpha_dict_ranges={lowerCase:[this._alpha_lower_first_ascii,this._alpha_lower_last_ascii],upperCase:[this._alpha_upper_first_ascii,this._alpha_upper_last_ascii]},this._alpha_lower_dict_ranges={lowerCase:[this._alpha_lower_first_ascii,this._alpha_lower_last_ascii]},this._alpha_upper_dict_ranges={upperCase:[this._alpha_upper_first_ascii,this._alpha_upper_last_ascii]},this._alphanum_dict_ranges={digits:[this._digit_first_ascii,this._digit_last_ascii],lowerCase:[this._alpha_lower_first_ascii,this._alpha_lower_last_ascii],upperCase:[this._alpha_upper_first_ascii,this._alpha_upper_last_ascii]},this._alphanum_lower_dict_ranges={digits:[this._digit_first_ascii,this._digit_last_ascii],lowerCase:[this._alpha_lower_first_ascii,this._alpha_lower_last_ascii]},this._alphanum_upper_dict_ranges={digits:[this._digit_first_ascii,this._digit_last_ascii],upperCase:[this._alpha_upper_first_ascii,this._alpha_upper_last_ascii]},this._hex_dict_ranges={decDigits:[this._digit_first_ascii,this._digit_last_ascii],alphaDigits:[this._alpha_lower_first_ascii,this._hex_last_ascii]},this.log=(...Ge)=>{const st=[...Ge];if(st[0]=`[short-unique-id] ${Ge[0]}`,this.debug===!0&&typeof console!="undefined"&&console!==null)return console.log(...st)},this.setDictionary=(Ge,st)=>{let xt;if(Ge&&Array.isArray(Ge)&&Ge.length>1)xt=Ge;else{xt=[];let Kt;this.dictIndex=Kt=0;const _n=`_${Ge}_dict_ranges`,Cr=this[_n];Object.keys(Cr).forEach(Jr=>{const ci=Jr;for(this.dictRange=Cr[ci],this.lowerBound=this.dictRange[0],this.upperBound=this.dictRange[1],this.dictIndex=Kt=this.lowerBound;this.lowerBound<=this.upperBound?Kt<this.upperBound:Kt>this.upperBound;this.dictIndex=this.lowerBound<=this.upperBound?Kt+=1:Kt-=1)xt.push(String.fromCharCode(this.dictIndex))})}st&&(xt=xt.sort(()=>Math.random()-.5)),this.dict=xt,this.dictLength=this.dict.length,this.counter=0},this.seq=()=>this.sequentialUUID(),this.sequentialUUID=()=>{let Ge,st,xt="";Ge=this.counter;do st=Ge%this.dictLength,Ge=Math.trunc(Ge/this.dictLength),xt+=this.dict[st];while(Ge!==0);return this.counter+=1,xt},this.randomUUID=(Ge=this.uuidLength||re)=>{let st,xt,Kt;if(Ge===null||typeof Ge=="undefined"||Ge<1)throw new Error("Invalid UUID Length Provided");for(st="",Kt=0;Kt<Ge;Kt+=1)xt=parseInt((Math.random()*this.dictLength).toFixed(0),10)%this.dictLength,st+=this.dict[xt];return st},this.availableUUIDs=(Ge=this.uuidLength)=>parseFloat(Math.pow([...new Set(this.dict)].length,Ge).toFixed(0)),this.approxMaxBeforeCollision=(Ge=this.availableUUIDs(this.uuidLength))=>parseFloat(Math.sqrt(Math.PI/2*Ge).toFixed(20)),this.collisionProbability=(Ge=this.availableUUIDs(this.uuidLength),st=this.uuidLength)=>parseFloat((this.approxMaxBeforeCollision(Ge)/this.availableUUIDs(st)).toFixed(20)),this.uniqueness=(Ge=this.availableUUIDs(this.uuidLength))=>{const st=parseFloat((1-this.approxMaxBeforeCollision(Ge)/Ge).toFixed(20));return st>1?1:st<0?0:st},this.getVersion=()=>this.version,this.stamp=Ge=>{if(typeof Ge!="number"||Ge<10)throw new Error("Param finalLength must be number greater than 10");const st=Math.floor(+new Date/1e3).toString(16),xt=Ge-9,Kt=Math.round(Math.random()*(xt>15?15:xt)),_n=this.randomUUID(xt);return`${_n.substr(0,Kt)}${st}${_n.substr(Kt)}${Kt.toString(16)}`},this.parseStamp=Ge=>{if(Ge.length<10)throw new Error("Stamp length invalid");const st=parseInt(Ge.substr(Ge.length-1,1),16);return new Date(parseInt(Ge.substr(st,8),16)*1e3)};const fe=w(w({},ue),ae);this.counter=0,this.debug=!1,this.dict=[],this.version=se;const{dictionary:Be,shuffle:Ve,length:Ct}=fe;return this.uuidLength=Ct,this.setDictionary(Be,Ve),this.debug=fe.debug,this.log(this.dict),this.log(`Generator instantiated with Dictionary Size ${this.dictLength}`),new Proxy(this,{apply:(Ge,st,xt)=>this.randomUUID(...xt)})}},ve=he;return ve.default=he,te})();r.exports=e.default,typeof window!="undefined"&&(e=e.default)})(shortUniqueId);var ShortUniqueId=getDefaultExportFromCjs(shortUniqueId.exports);/**
 * @license
 * Copyright 2009 The Closure Library Authors
 * Copyright 2020 Daniel Wirtz / The long.js Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */var wasm=null;try{wasm=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}function Long(r,e,n){this.low=r|0,this.high=e|0,this.unsigned=!!n}Long.prototype.__isLong__;Object.defineProperty(Long.prototype,"__isLong__",{value:!0});function isLong(r){return(r&&r.__isLong__)===!0}function ctz32(r){var e=Math.clz32(r&-r);return r?31-e:e}Long.isLong=isLong;var INT_CACHE={},UINT_CACHE={};function fromInt(r,e){var n,s,a;return e?(r>>>=0,(a=0<=r&&r<256)&&(s=UINT_CACHE[r],s)?s:(n=fromBits(r,0,!0),a&&(UINT_CACHE[r]=n),n)):(r|=0,(a=-128<=r&&r<128)&&(s=INT_CACHE[r],s)?s:(n=fromBits(r,r<0?-1:0,!1),a&&(INT_CACHE[r]=n),n))}Long.fromInt=fromInt;function fromNumber(r,e){if(isNaN(r))return e?UZERO:ZERO;if(e){if(r<0)return UZERO;if(r>=TWO_PWR_64_DBL)return MAX_UNSIGNED_VALUE}else{if(r<=-TWO_PWR_63_DBL)return MIN_VALUE;if(r+1>=TWO_PWR_63_DBL)return MAX_VALUE}return r<0?fromNumber(-r,e).neg():fromBits(r%TWO_PWR_32_DBL|0,r/TWO_PWR_32_DBL|0,e)}Long.fromNumber=fromNumber;function fromBits(r,e,n){return new Long(r,e,n)}Long.fromBits=fromBits;var pow_dbl=Math.pow;function fromString(r,e,n){if(r.length===0)throw Error("empty string");if(typeof e=="number"?(n=e,e=!1):e=!!e,r==="NaN"||r==="Infinity"||r==="+Infinity"||r==="-Infinity")return e?UZERO:ZERO;if(n=n||10,n<2||36<n)throw RangeError("radix");var s;if((s=r.indexOf("-"))>0)throw Error("interior hyphen");if(s===0)return fromString(r.substring(1),e,n).neg();for(var a=fromNumber(pow_dbl(n,8)),u=ZERO,h=0;h<r.length;h+=8){var w=Math.min(8,r.length-h),B=parseInt(r.substring(h,h+w),n);if(w<8){var k=fromNumber(pow_dbl(n,w));u=u.mul(k).add(fromNumber(B))}else u=u.mul(a),u=u.add(fromNumber(B))}return u.unsigned=e,u}Long.fromString=fromString;function fromValue(r,e){return typeof r=="number"?fromNumber(r,e):typeof r=="string"?fromString(r,e):fromBits(r.low,r.high,typeof e=="boolean"?e:r.unsigned)}Long.fromValue=fromValue;var TWO_PWR_16_DBL=1<<16,TWO_PWR_24_DBL=1<<24,TWO_PWR_32_DBL=TWO_PWR_16_DBL*TWO_PWR_16_DBL,TWO_PWR_64_DBL=TWO_PWR_32_DBL*TWO_PWR_32_DBL,TWO_PWR_63_DBL=TWO_PWR_64_DBL/2,TWO_PWR_24=fromInt(TWO_PWR_24_DBL),ZERO=fromInt(0);Long.ZERO=ZERO;var UZERO=fromInt(0,!0);Long.UZERO=UZERO;var ONE=fromInt(1);Long.ONE=ONE;var UONE=fromInt(1,!0);Long.UONE=UONE;var NEG_ONE=fromInt(-1);Long.NEG_ONE=NEG_ONE;var MAX_VALUE=fromBits(-1,2147483647,!1);Long.MAX_VALUE=MAX_VALUE;var MAX_UNSIGNED_VALUE=fromBits(-1,-1,!0);Long.MAX_UNSIGNED_VALUE=MAX_UNSIGNED_VALUE;var MIN_VALUE=fromBits(0,-2147483648,!1);Long.MIN_VALUE=MIN_VALUE;var LongPrototype=Long.prototype;LongPrototype.toInt=function(){return this.unsigned?this.low>>>0:this.low};LongPrototype.toNumber=function(){return this.unsigned?(this.high>>>0)*TWO_PWR_32_DBL+(this.low>>>0):this.high*TWO_PWR_32_DBL+(this.low>>>0)};LongPrototype.toString=function(e){if(e=e||10,e<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(MIN_VALUE)){var n=fromNumber(e),s=this.div(n),a=s.mul(n).sub(this);return s.toString(e)+a.toInt().toString(e)}else return"-"+this.neg().toString(e);for(var u=fromNumber(pow_dbl(e,6),this.unsigned),h=this,w="";;){var B=h.div(u),k=h.sub(B.mul(u)).toInt()>>>0,te=k.toString(e);if(h=B,h.isZero())return te+w;for(;te.length<6;)te="0"+te;w=""+te+w}};LongPrototype.getHighBits=function(){return this.high};LongPrototype.getHighBitsUnsigned=function(){return this.high>>>0};LongPrototype.getLowBits=function(){return this.low};LongPrototype.getLowBitsUnsigned=function(){return this.low>>>0};LongPrototype.getNumBitsAbs=function(){if(this.isNegative())return this.eq(MIN_VALUE)?64:this.neg().getNumBitsAbs();for(var e=this.high!=0?this.high:this.low,n=31;n>0&&(e&1<<n)==0;n--);return this.high!=0?n+33:n+1};LongPrototype.isZero=function(){return this.high===0&&this.low===0};LongPrototype.eqz=LongPrototype.isZero;LongPrototype.isNegative=function(){return!this.unsigned&&this.high<0};LongPrototype.isPositive=function(){return this.unsigned||this.high>=0};LongPrototype.isOdd=function(){return(this.low&1)===1};LongPrototype.isEven=function(){return(this.low&1)===0};LongPrototype.equals=function(e){return isLong(e)||(e=fromValue(e)),this.unsigned!==e.unsigned&&this.high>>>31===1&&e.high>>>31===1?!1:this.high===e.high&&this.low===e.low};LongPrototype.eq=LongPrototype.equals;LongPrototype.notEquals=function(e){return!this.eq(e)};LongPrototype.neq=LongPrototype.notEquals;LongPrototype.ne=LongPrototype.notEquals;LongPrototype.lessThan=function(e){return this.comp(e)<0};LongPrototype.lt=LongPrototype.lessThan;LongPrototype.lessThanOrEqual=function(e){return this.comp(e)<=0};LongPrototype.lte=LongPrototype.lessThanOrEqual;LongPrototype.le=LongPrototype.lessThanOrEqual;LongPrototype.greaterThan=function(e){return this.comp(e)>0};LongPrototype.gt=LongPrototype.greaterThan;LongPrototype.greaterThanOrEqual=function(e){return this.comp(e)>=0};LongPrototype.gte=LongPrototype.greaterThanOrEqual;LongPrototype.ge=LongPrototype.greaterThanOrEqual;LongPrototype.compare=function(e){if(isLong(e)||(e=fromValue(e)),this.eq(e))return 0;var n=this.isNegative(),s=e.isNegative();return n&&!s?-1:!n&&s?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1};LongPrototype.comp=LongPrototype.compare;LongPrototype.negate=function(){return!this.unsigned&&this.eq(MIN_VALUE)?MIN_VALUE:this.not().add(ONE)};LongPrototype.neg=LongPrototype.negate;LongPrototype.add=function(e){isLong(e)||(e=fromValue(e));var n=this.high>>>16,s=this.high&65535,a=this.low>>>16,u=this.low&65535,h=e.high>>>16,w=e.high&65535,B=e.low>>>16,k=e.low&65535,te=0,se=0,re=0,ue=0;return ue+=u+k,re+=ue>>>16,ue&=65535,re+=a+B,se+=re>>>16,re&=65535,se+=s+w,te+=se>>>16,se&=65535,te+=n+h,te&=65535,fromBits(re<<16|ue,te<<16|se,this.unsigned)};LongPrototype.subtract=function(e){return isLong(e)||(e=fromValue(e)),this.add(e.neg())};LongPrototype.sub=LongPrototype.subtract;LongPrototype.multiply=function(e){if(this.isZero())return this;if(isLong(e)||(e=fromValue(e)),wasm){var n=wasm.mul(this.low,this.high,e.low,e.high);return fromBits(n,wasm.get_high(),this.unsigned)}if(e.isZero())return this.unsigned?UZERO:ZERO;if(this.eq(MIN_VALUE))return e.isOdd()?MIN_VALUE:ZERO;if(e.eq(MIN_VALUE))return this.isOdd()?MIN_VALUE:ZERO;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(TWO_PWR_24)&&e.lt(TWO_PWR_24))return fromNumber(this.toNumber()*e.toNumber(),this.unsigned);var s=this.high>>>16,a=this.high&65535,u=this.low>>>16,h=this.low&65535,w=e.high>>>16,B=e.high&65535,k=e.low>>>16,te=e.low&65535,se=0,re=0,ue=0,he=0;return he+=h*te,ue+=he>>>16,he&=65535,ue+=u*te,re+=ue>>>16,ue&=65535,ue+=h*k,re+=ue>>>16,ue&=65535,re+=a*te,se+=re>>>16,re&=65535,re+=u*k,se+=re>>>16,re&=65535,re+=h*B,se+=re>>>16,re&=65535,se+=s*te+a*k+u*B+h*w,se&=65535,fromBits(ue<<16|he,se<<16|re,this.unsigned)};LongPrototype.mul=LongPrototype.multiply;LongPrototype.divide=function(e){if(isLong(e)||(e=fromValue(e)),e.isZero())throw Error("division by zero");if(wasm){if(!this.unsigned&&this.high===-2147483648&&e.low===-1&&e.high===-1)return this;var n=(this.unsigned?wasm.div_u:wasm.div_s)(this.low,this.high,e.low,e.high);return fromBits(n,wasm.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?UZERO:ZERO;var s,a,u;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return UZERO;if(e.gt(this.shru(1)))return UONE;u=UZERO}else{if(this.eq(MIN_VALUE)){if(e.eq(ONE)||e.eq(NEG_ONE))return MIN_VALUE;if(e.eq(MIN_VALUE))return ONE;var h=this.shr(1);return s=h.div(e).shl(1),s.eq(ZERO)?e.isNegative()?ONE:NEG_ONE:(a=this.sub(e.mul(s)),u=s.add(a.div(e)),u)}else if(e.eq(MIN_VALUE))return this.unsigned?UZERO:ZERO;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();u=ZERO}for(a=this;a.gte(e);){s=Math.max(1,Math.floor(a.toNumber()/e.toNumber()));for(var w=Math.ceil(Math.log(s)/Math.LN2),B=w<=48?1:pow_dbl(2,w-48),k=fromNumber(s),te=k.mul(e);te.isNegative()||te.gt(a);)s-=B,k=fromNumber(s,this.unsigned),te=k.mul(e);k.isZero()&&(k=ONE),u=u.add(k),a=a.sub(te)}return u};LongPrototype.div=LongPrototype.divide;LongPrototype.modulo=function(e){if(isLong(e)||(e=fromValue(e)),wasm){var n=(this.unsigned?wasm.rem_u:wasm.rem_s)(this.low,this.high,e.low,e.high);return fromBits(n,wasm.get_high(),this.unsigned)}return this.sub(this.div(e).mul(e))};LongPrototype.mod=LongPrototype.modulo;LongPrototype.rem=LongPrototype.modulo;LongPrototype.not=function(){return fromBits(~this.low,~this.high,this.unsigned)};LongPrototype.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32};LongPrototype.clz=LongPrototype.countLeadingZeros;LongPrototype.countTrailingZeros=function(){return this.low?ctz32(this.low):ctz32(this.high)+32};LongPrototype.ctz=LongPrototype.countTrailingZeros;LongPrototype.and=function(e){return isLong(e)||(e=fromValue(e)),fromBits(this.low&e.low,this.high&e.high,this.unsigned)};LongPrototype.or=function(e){return isLong(e)||(e=fromValue(e)),fromBits(this.low|e.low,this.high|e.high,this.unsigned)};LongPrototype.xor=function(e){return isLong(e)||(e=fromValue(e)),fromBits(this.low^e.low,this.high^e.high,this.unsigned)};LongPrototype.shiftLeft=function(e){return isLong(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?fromBits(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):fromBits(0,this.low<<e-32,this.unsigned)};LongPrototype.shl=LongPrototype.shiftLeft;LongPrototype.shiftRight=function(e){return isLong(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?fromBits(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):fromBits(this.high>>e-32,this.high>=0?0:-1,this.unsigned)};LongPrototype.shr=LongPrototype.shiftRight;LongPrototype.shiftRightUnsigned=function(e){return isLong(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?fromBits(this.low>>>e|this.high<<32-e,this.high>>>e,this.unsigned):e===32?fromBits(this.high,0,this.unsigned):fromBits(this.high>>>e-32,0,this.unsigned)};LongPrototype.shru=LongPrototype.shiftRightUnsigned;LongPrototype.shr_u=LongPrototype.shiftRightUnsigned;LongPrototype.rotateLeft=function(e){var n;return isLong(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?fromBits(this.high,this.low,this.unsigned):e<32?(n=32-e,fromBits(this.low<<e|this.high>>>n,this.high<<e|this.low>>>n,this.unsigned)):(e-=32,n=32-e,fromBits(this.high<<e|this.low>>>n,this.low<<e|this.high>>>n,this.unsigned))};LongPrototype.rotl=LongPrototype.rotateLeft;LongPrototype.rotateRight=function(e){var n;return isLong(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?fromBits(this.high,this.low,this.unsigned):e<32?(n=32-e,fromBits(this.high<<n|this.low>>>e,this.low<<n|this.high>>>e,this.unsigned)):(e-=32,n=32-e,fromBits(this.low<<n|this.high>>>e,this.high<<n|this.low>>>e,this.unsigned))};LongPrototype.rotr=LongPrototype.rotateRight;LongPrototype.toSigned=function(){return this.unsigned?fromBits(this.low,this.high,!1):this};LongPrototype.toUnsigned=function(){return this.unsigned?this:fromBits(this.low,this.high,!0)};LongPrototype.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()};LongPrototype.toBytesLE=function(){var e=this.high,n=this.low;return[n&255,n>>>8&255,n>>>16&255,n>>>24,e&255,e>>>8&255,e>>>16&255,e>>>24]};LongPrototype.toBytesBE=function(){var e=this.high,n=this.low;return[e>>>24,e>>>16&255,e>>>8&255,e&255,n>>>24,n>>>16&255,n>>>8&255,n&255]};Long.fromBytes=function(e,n,s){return s?Long.fromBytesLE(e,n):Long.fromBytesBE(e,n)};Long.fromBytesLE=function(e,n){return new Long(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,n)};Long.fromBytesBE=function(e,n){return new Long(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],n)};var grpcWebClient_umd={exports:{}};(function(r,e){(function(n,s){r.exports=s()})(commonjsGlobal,function(){return n={418:function(a,u){(function(h,w){for(var B in w)h[B]=w[B]})(u,function(h){var w={};function B(k){if(w[k])return w[k].exports;var te=w[k]={i:k,l:!1,exports:{}};return h[k].call(te.exports,te,te.exports,B),te.l=!0,te.exports}return B.m=h,B.c=w,B.i=function(k){return k},B.d=function(k,te,se){B.o(k,te)||Object.defineProperty(k,te,{configurable:!1,enumerable:!0,get:se})},B.n=function(k){var te=k&&k.__esModule?function(){return k.default}:function(){return k};return B.d(te,"a",te),te},B.o=function(k,te){return Object.prototype.hasOwnProperty.call(k,te)},B.p="",B(B.s=1)}([function(h,w,B){Object.defineProperty(w,"__esModule",{value:!0});var k=B(3),te=function(){function se(re,ue){re===void 0&&(re={}),ue===void 0&&(ue={splitValues:!1});var he,ve=this;this.headersMap={},re&&(typeof Headers!="undefined"&&re instanceof Headers?k.getHeaderKeys(re).forEach(function(ae){k.getHeaderValues(re,ae).forEach(function(fe){ue.splitValues?ve.append(ae,k.splitHeaderValue(fe)):ve.append(ae,fe)})}):typeof(he=re)=="object"&&typeof he.headersMap=="object"&&typeof he.forEach=="function"?re.forEach(function(ae,fe){ve.append(ae,fe)}):typeof Map!="undefined"&&re instanceof Map?re.forEach(function(ae,fe){ve.append(fe,ae)}):typeof re=="string"?this.appendFromString(re):typeof re=="object"&&Object.getOwnPropertyNames(re).forEach(function(ae){var fe=re[ae];Array.isArray(fe)?fe.forEach(function(Be){ve.append(ae,Be)}):ve.append(ae,fe)}))}return se.prototype.appendFromString=function(re){for(var ue=re.split(`\r
`),he=0;he<ue.length;he++){var ve=ue[he],ae=ve.indexOf(":");if(ae>0){var fe=ve.substring(0,ae).trim(),Be=ve.substring(ae+1).trim();this.append(fe,Be)}}},se.prototype.delete=function(re,ue){var he=k.normalizeName(re);if(ue===void 0)delete this.headersMap[he];else{var ve=this.headersMap[he];if(ve){var ae=ve.indexOf(ue);ae>=0&&ve.splice(ae,1),ve.length===0&&delete this.headersMap[he]}}},se.prototype.append=function(re,ue){var he=this,ve=k.normalizeName(re);Array.isArray(this.headersMap[ve])||(this.headersMap[ve]=[]),Array.isArray(ue)?ue.forEach(function(ae){he.headersMap[ve].push(k.normalizeValue(ae))}):this.headersMap[ve].push(k.normalizeValue(ue))},se.prototype.set=function(re,ue){var he=k.normalizeName(re);if(Array.isArray(ue)){var ve=[];ue.forEach(function(ae){ve.push(k.normalizeValue(ae))}),this.headersMap[he]=ve}else this.headersMap[he]=[k.normalizeValue(ue)]},se.prototype.has=function(re,ue){var he=this.headersMap[k.normalizeName(re)];if(!Array.isArray(he))return!1;if(ue!==void 0){var ve=k.normalizeValue(ue);return he.indexOf(ve)>=0}return!0},se.prototype.get=function(re){var ue=this.headersMap[k.normalizeName(re)];return ue!==void 0?ue.concat():[]},se.prototype.forEach=function(re){var ue=this;Object.getOwnPropertyNames(this.headersMap).forEach(function(he){re(he,ue.headersMap[he])},this)},se.prototype.toHeaders=function(){if(typeof Headers!="undefined"){var re=new Headers;return this.forEach(function(ue,he){he.forEach(function(ve){re.append(ue,ve)})}),re}throw new Error("Headers class is not defined")},se}();w.BrowserHeaders=te},function(h,w,B){Object.defineProperty(w,"__esModule",{value:!0});var k=B(0);w.BrowserHeaders=k.BrowserHeaders},function(h,w,B){Object.defineProperty(w,"__esModule",{value:!0}),w.iterateHeaders=function(k,te){for(var se=k[Symbol.iterator](),re=se.next();!re.done;)te(re.value[0]),re=se.next()},w.iterateHeadersKeys=function(k,te){for(var se=k.keys(),re=se.next();!re.done;)te(re.value),re=se.next()}},function(h,w,B){Object.defineProperty(w,"__esModule",{value:!0});var k=B(2);w.normalizeName=function(te){if(typeof te!="string"&&(te=String(te)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(te))throw new TypeError("Invalid character in header field name");return te.toLowerCase()},w.normalizeValue=function(te){return typeof te!="string"&&(te=String(te)),te},w.getHeaderValues=function(te,se){var re=te;if(re instanceof Headers&&re.getAll)return re.getAll(se);var ue=re.get(se);return ue&&typeof ue=="string"?[ue]:ue},w.getHeaderKeys=function(te){var se=te,re={},ue=[];return se.keys?k.iterateHeadersKeys(se,function(he){re[he]||(re[he]=!0,ue.push(he))}):se.forEach?se.forEach(function(he,ve){re[ve]||(re[ve]=!0,ue.push(ve))}):k.iterateHeaders(se,function(he){var ve=he[0];re[ve]||(re[ve]=!0,ue.push(ve))}),ue},w.splitHeaderValue=function(te){var se=[];return te.split(", ").forEach(function(re){re.split(",").forEach(function(ue){se.push(ue)})}),se}}]))},617:function(a,u,h){Object.defineProperty(u,"__esModule",{value:!0}),u.ChunkParser=u.ChunkType=u.encodeASCII=u.decodeASCII=void 0;var w,B=h(65);function k(ae){return(fe=ae)===9||fe===10||fe===13||ae>=32&&ae<=126;var fe}function te(ae){for(var fe=0;fe!==ae.length;++fe)if(!k(ae[fe]))throw new Error("Metadata is not valid (printable) ASCII");return String.fromCharCode.apply(String,Array.prototype.slice.call(ae))}function se(ae){return(128&ae.getUint8(0))==128}function re(ae){return ae.getUint32(1,!1)}function ue(ae,fe,Be){return ae.byteLength-fe>=Be}function he(ae,fe,Be){if(ae.slice)return ae.slice(fe,Be);var Ve=ae.length;Be!==void 0&&(Ve=Be);for(var Ct=new Uint8Array(Ve-fe),Ge=0,st=fe;st<Ve;st++)Ct[Ge++]=ae[st];return Ct}u.decodeASCII=te,u.encodeASCII=function(ae){for(var fe=new Uint8Array(ae.length),Be=0;Be!==ae.length;++Be){var Ve=ae.charCodeAt(Be);if(!k(Ve))throw new Error("Metadata contains invalid ASCII");fe[Be]=Ve}return fe},function(ae){ae[ae.MESSAGE=1]="MESSAGE",ae[ae.TRAILERS=2]="TRAILERS"}(w=u.ChunkType||(u.ChunkType={}));var ve=function(){function ae(){this.buffer=null,this.position=0}return ae.prototype.parse=function(fe,Be){if(fe.length===0&&Be)return[];var Ve,Ct=[];if(this.buffer==null)this.buffer=fe,this.position=0;else if(this.position===this.buffer.byteLength)this.buffer=fe,this.position=0;else{var Ge=this.buffer.byteLength-this.position,st=new Uint8Array(Ge+fe.byteLength),xt=he(this.buffer,this.position);st.set(xt,0);var Kt=new Uint8Array(fe);st.set(Kt,Ge),this.buffer=st,this.position=0}for(;;){if(!ue(this.buffer,this.position,5))return Ct;var _n=he(this.buffer,this.position,this.position+5),Cr=new DataView(_n.buffer,_n.byteOffset,_n.byteLength),Jr=re(Cr);if(!ue(this.buffer,this.position,5+Jr))return Ct;var ci=he(this.buffer,this.position+5,this.position+5+Jr);if(this.position+=5+Jr,se(Cr))return Ct.push({chunkType:w.TRAILERS,trailers:(Ve=ci,new B.Metadata(te(Ve)))}),Ct;Ct.push({chunkType:w.MESSAGE,data:ci})}},ae}();u.ChunkParser=ve},8:function(a,u){var h;Object.defineProperty(u,"__esModule",{value:!0}),u.httpStatusToCode=u.Code=void 0,function(w){w[w.OK=0]="OK",w[w.Canceled=1]="Canceled",w[w.Unknown=2]="Unknown",w[w.InvalidArgument=3]="InvalidArgument",w[w.DeadlineExceeded=4]="DeadlineExceeded",w[w.NotFound=5]="NotFound",w[w.AlreadyExists=6]="AlreadyExists",w[w.PermissionDenied=7]="PermissionDenied",w[w.ResourceExhausted=8]="ResourceExhausted",w[w.FailedPrecondition=9]="FailedPrecondition",w[w.Aborted=10]="Aborted",w[w.OutOfRange=11]="OutOfRange",w[w.Unimplemented=12]="Unimplemented",w[w.Internal=13]="Internal",w[w.Unavailable=14]="Unavailable",w[w.DataLoss=15]="DataLoss",w[w.Unauthenticated=16]="Unauthenticated"}(h=u.Code||(u.Code={})),u.httpStatusToCode=function(w){switch(w){case 0:return h.Internal;case 200:return h.OK;case 400:return h.InvalidArgument;case 401:return h.Unauthenticated;case 403:return h.PermissionDenied;case 404:return h.NotFound;case 409:return h.Aborted;case 412:return h.FailedPrecondition;case 429:return h.ResourceExhausted;case 499:return h.Canceled;case 500:return h.Unknown;case 501:return h.Unimplemented;case 503:return h.Unavailable;case 504:return h.DeadlineExceeded;default:return h.Unknown}}},934:function(a,u,h){Object.defineProperty(u,"__esModule",{value:!0}),u.client=void 0;var w=h(65),B=h(617),k=h(8),te=h(346),se=h(57),re=h(882);u.client=function(ve,ae){return new ue(ve,ae)};var ue=function(){function ve(ae,fe){this.started=!1,this.sentFirstMessage=!1,this.completed=!1,this.closed=!1,this.finishedSending=!1,this.onHeadersCallbacks=[],this.onMessageCallbacks=[],this.onEndCallbacks=[],this.parser=new B.ChunkParser,this.methodDefinition=ae,this.props=fe,this.createTransport()}return ve.prototype.createTransport=function(){var ae=this.props.host+"/"+this.methodDefinition.service.serviceName+"/"+this.methodDefinition.methodName,fe={methodDefinition:this.methodDefinition,debug:this.props.debug||!1,url:ae,onHeaders:this.onTransportHeaders.bind(this),onChunk:this.onTransportChunk.bind(this),onEnd:this.onTransportEnd.bind(this)};this.props.transport?this.transport=this.props.transport(fe):this.transport=se.makeDefaultTransport(fe)},ve.prototype.onTransportHeaders=function(ae,fe){if(this.props.debug&&te.debug("onHeaders",ae,fe),this.closed)this.props.debug&&te.debug("grpc.onHeaders received after request was closed - ignoring");else if(fe!==0){this.responseHeaders=ae,this.props.debug&&te.debug("onHeaders.responseHeaders",JSON.stringify(this.responseHeaders,null,2));var Be=he(ae);this.props.debug&&te.debug("onHeaders.gRPCStatus",Be);var Ve=Be&&Be>=0?Be:k.httpStatusToCode(fe);this.props.debug&&te.debug("onHeaders.code",Ve);var Ct=ae.get("grpc-message")||[];if(this.props.debug&&te.debug("onHeaders.gRPCMessage",Ct),this.rawOnHeaders(ae),Ve!==k.Code.OK){var Ge=this.decodeGRPCStatus(Ct[0]);this.rawOnError(Ve,Ge,ae)}}},ve.prototype.onTransportChunk=function(ae){var fe=this;if(this.closed)this.props.debug&&te.debug("grpc.onChunk received after request was closed - ignoring");else{var Be=[];try{Be=this.parser.parse(ae)}catch(Ve){return this.props.debug&&te.debug("onChunk.parsing error",Ve,Ve.message),void this.rawOnError(k.Code.Internal,"parsing error: "+Ve.message)}Be.forEach(function(Ve){if(Ve.chunkType===B.ChunkType.MESSAGE){var Ct=fe.methodDefinition.responseType.deserializeBinary(Ve.data);fe.rawOnMessage(Ct)}else Ve.chunkType===B.ChunkType.TRAILERS&&(fe.responseHeaders?(fe.responseTrailers=new w.Metadata(Ve.trailers),fe.props.debug&&te.debug("onChunk.trailers",fe.responseTrailers)):(fe.responseHeaders=new w.Metadata(Ve.trailers),fe.rawOnHeaders(fe.responseHeaders)))})}},ve.prototype.onTransportEnd=function(){if(this.props.debug&&te.debug("grpc.onEnd"),this.closed)this.props.debug&&te.debug("grpc.onEnd received after request was closed - ignoring");else if(this.responseTrailers!==void 0){var ae=he(this.responseTrailers);if(ae!==null){var fe=this.responseTrailers.get("grpc-message"),Be=this.decodeGRPCStatus(fe[0]);this.rawOnEnd(ae,Be,this.responseTrailers)}else this.rawOnError(k.Code.Internal,"Response closed without grpc-status (Trailers provided)")}else{if(this.responseHeaders===void 0)return void this.rawOnError(k.Code.Unknown,"Response closed without headers");var Ve=he(this.responseHeaders),Ct=this.responseHeaders.get("grpc-message");if(this.props.debug&&te.debug("grpc.headers only response ",Ve,Ct),Ve===null)return void this.rawOnEnd(k.Code.Unknown,"Response closed without grpc-status (Headers only)",this.responseHeaders);var Ge=this.decodeGRPCStatus(Ct[0]);this.rawOnEnd(Ve,Ge,this.responseHeaders)}},ve.prototype.decodeGRPCStatus=function(ae){if(!ae)return"";try{return decodeURIComponent(ae)}catch{return ae}},ve.prototype.rawOnEnd=function(ae,fe,Be){var Ve=this;this.props.debug&&te.debug("rawOnEnd",ae,fe,Be),this.completed||(this.completed=!0,this.onEndCallbacks.forEach(function(Ct){if(!Ve.closed)try{Ct(ae,fe,Be)}catch(Ge){setTimeout(function(){throw Ge},0)}}))},ve.prototype.rawOnHeaders=function(ae){this.props.debug&&te.debug("rawOnHeaders",ae),this.completed||this.onHeadersCallbacks.forEach(function(fe){try{fe(ae)}catch(Be){setTimeout(function(){throw Be},0)}})},ve.prototype.rawOnError=function(ae,fe,Be){var Ve=this;Be===void 0&&(Be=new w.Metadata),this.props.debug&&te.debug("rawOnError",ae,fe),this.completed||(this.completed=!0,this.onEndCallbacks.forEach(function(Ct){if(!Ve.closed)try{Ct(ae,fe,Be)}catch(Ge){setTimeout(function(){throw Ge},0)}}))},ve.prototype.rawOnMessage=function(ae){var fe=this;this.props.debug&&te.debug("rawOnMessage",ae.toObject()),this.completed||this.closed||this.onMessageCallbacks.forEach(function(Be){if(!fe.closed)try{Be(ae)}catch(Ve){setTimeout(function(){throw Ve},0)}})},ve.prototype.onHeaders=function(ae){this.onHeadersCallbacks.push(ae)},ve.prototype.onMessage=function(ae){this.onMessageCallbacks.push(ae)},ve.prototype.onEnd=function(ae){this.onEndCallbacks.push(ae)},ve.prototype.start=function(ae){if(this.started)throw new Error("Client already started - cannot .start()");this.started=!0;var fe=new w.Metadata(ae||{});fe.set("content-type","application/grpc-web+proto"),fe.set("x-grpc-web","1"),this.transport.start(fe)},ve.prototype.send=function(ae){if(!this.started)throw new Error("Client not started - .start() must be called before .send()");if(this.closed)throw new Error("Client already closed - cannot .send()");if(this.finishedSending)throw new Error("Client already finished sending - cannot .send()");if(!this.methodDefinition.requestStream&&this.sentFirstMessage)throw new Error("Message already sent for non-client-streaming method - cannot .send()");this.sentFirstMessage=!0;var fe=re.frameRequest(ae);this.transport.sendMessage(fe)},ve.prototype.finishSend=function(){if(!this.started)throw new Error("Client not started - .finishSend() must be called before .close()");if(this.closed)throw new Error("Client already closed - cannot .send()");if(this.finishedSending)throw new Error("Client already finished sending - cannot .finishSend()");this.finishedSending=!0,this.transport.finishSend()},ve.prototype.close=function(){if(!this.started)throw new Error("Client not started - .start() must be called before .close()");if(this.closed)throw new Error("Client already closed - cannot .close()");this.closed=!0,this.props.debug&&te.debug("request.abort aborting request"),this.transport.cancel()},ve}();function he(ve){var ae=ve.get("grpc-status")||[];if(ae.length>0)try{var fe=ae[0];return parseInt(fe,10)}catch{return null}return null}},346:function(a,u){Object.defineProperty(u,"__esModule",{value:!0}),u.debug=void 0,u.debug=function(){for(var h=[],w=0;w<arguments.length;w++)h[w]=arguments[w];console.debug?console.debug.apply(null,h):console.log.apply(null,h)}},607:function(a,u,h){Object.defineProperty(u,"__esModule",{value:!0}),u.grpc=void 0;var w,B=h(418),k=h(57),te=h(229),se=h(540),re=h(210),ue=h(859),he=h(8),ve=h(938),ae=h(35),fe=h(934);(w=u.grpc||(u.grpc={})).setDefaultTransport=k.setDefaultTransportFactory,w.CrossBrowserHttpTransport=ue.CrossBrowserHttpTransport,w.FetchReadableStreamTransport=te.FetchReadableStreamTransport,w.XhrTransport=re.XhrTransport,w.WebsocketTransport=se.WebsocketTransport,w.Code=he.Code,w.Metadata=B.BrowserHeaders,w.client=function(Be,Ve){return fe.client(Be,Ve)},w.invoke=ve.invoke,w.unary=ae.unary},938:function(a,u,h){Object.defineProperty(u,"__esModule",{value:!0}),u.invoke=void 0;var w=h(934);u.invoke=function(B,k){if(B.requestStream)throw new Error(".invoke cannot be used with client-streaming methods. Use .client instead.");var te=w.client(B,{host:k.host,transport:k.transport,debug:k.debug});return k.onHeaders&&te.onHeaders(k.onHeaders),k.onMessage&&te.onMessage(k.onMessage),k.onEnd&&te.onEnd(k.onEnd),te.start(k.metadata),te.send(k.request),te.finishSend(),{close:function(){te.close()}}}},65:function(a,u,h){Object.defineProperty(u,"__esModule",{value:!0}),u.Metadata=void 0;var w=h(418);Object.defineProperty(u,"Metadata",{enumerable:!0,get:function(){return w.BrowserHeaders}})},57:function(a,u,h){Object.defineProperty(u,"__esModule",{value:!0}),u.makeDefaultTransport=u.setDefaultTransportFactory=void 0;var w=h(859),B=function(k){return w.CrossBrowserHttpTransport({withCredentials:!1})(k)};u.setDefaultTransportFactory=function(k){B=k},u.makeDefaultTransport=function(k){return B(k)}},229:function(a,u,h){var w=this&&this.__assign||function(){return(w=Object.assign||function(se){for(var re,ue=1,he=arguments.length;ue<he;ue++)for(var ve in re=arguments[ue])Object.prototype.hasOwnProperty.call(re,ve)&&(se[ve]=re[ve]);return se}).apply(this,arguments)};Object.defineProperty(u,"__esModule",{value:!0}),u.detectFetchSupport=u.FetchReadableStreamTransport=void 0;var B=h(65),k=h(346);u.FetchReadableStreamTransport=function(se){return function(re){return function(ue,he){return ue.debug&&k.debug("fetchRequest",ue),new te(ue,he)}(re,se)}};var te=function(){function se(re,ue){this.cancelled=!1,this.controller=self.AbortController&&new AbortController,this.options=re,this.init=ue}return se.prototype.pump=function(re,ue){var he=this;if(this.reader=re,this.cancelled)return this.options.debug&&k.debug("Fetch.pump.cancel at first pump"),void this.reader.cancel().catch(function(ve){he.options.debug&&k.debug("Fetch.pump.reader.cancel exception",ve)});this.reader.read().then(function(ve){if(ve.done)return he.options.onEnd(),ue;he.options.onChunk(ve.value),he.pump(he.reader,ue)}).catch(function(ve){he.cancelled?he.options.debug&&k.debug("Fetch.catch - request cancelled"):(he.cancelled=!0,he.options.debug&&k.debug("Fetch.catch",ve.message),he.options.onEnd(ve))})},se.prototype.send=function(re){var ue=this;fetch(this.options.url,w(w({},this.init),{headers:this.metadata.toHeaders(),method:"POST",body:re,signal:this.controller&&this.controller.signal})).then(function(he){if(ue.options.debug&&k.debug("Fetch.response",he),ue.options.onHeaders(new B.Metadata(he.headers),he.status),!he.body)return he;ue.pump(he.body.getReader(),he)}).catch(function(he){ue.cancelled?ue.options.debug&&k.debug("Fetch.catch - request cancelled"):(ue.cancelled=!0,ue.options.debug&&k.debug("Fetch.catch",he.message),ue.options.onEnd(he))})},se.prototype.sendMessage=function(re){this.send(re)},se.prototype.finishSend=function(){},se.prototype.start=function(re){this.metadata=re},se.prototype.cancel=function(){var re=this;this.cancelled?this.options.debug&&k.debug("Fetch.cancel already cancelled"):(this.cancelled=!0,this.controller?(this.options.debug&&k.debug("Fetch.cancel.controller.abort"),this.controller.abort()):this.options.debug&&k.debug("Fetch.cancel.missing abort controller"),this.reader?(this.options.debug&&k.debug("Fetch.cancel.reader.cancel"),this.reader.cancel().catch(function(ue){re.options.debug&&k.debug("Fetch.cancel.reader.cancel exception",ue)})):this.options.debug&&k.debug("Fetch.cancel before reader"))},se}();u.detectFetchSupport=function(){return typeof Response!="undefined"&&Response.prototype.hasOwnProperty("body")&&typeof Headers=="function"}},859:function(a,u,h){Object.defineProperty(u,"__esModule",{value:!0}),u.CrossBrowserHttpTransport=void 0;var w=h(229),B=h(210);u.CrossBrowserHttpTransport=function(k){if(w.detectFetchSupport()){var te={credentials:k.withCredentials?"include":"same-origin"};return w.FetchReadableStreamTransport(te)}return B.XhrTransport({withCredentials:k.withCredentials})}},210:function(a,u,h){var w,B=this&&this.__extends||(w=function(ae,fe){return(w=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(Be,Ve){Be.__proto__=Ve}||function(Be,Ve){for(var Ct in Ve)Object.prototype.hasOwnProperty.call(Ve,Ct)&&(Be[Ct]=Ve[Ct])})(ae,fe)},function(ae,fe){function Be(){this.constructor=ae}w(ae,fe),ae.prototype=fe===null?Object.create(fe):(Be.prototype=fe.prototype,new Be)});Object.defineProperty(u,"__esModule",{value:!0}),u.stringToArrayBuffer=u.MozChunkedArrayBufferXHR=u.XHR=u.XhrTransport=void 0;var k=h(65),te=h(346),se=h(849);u.XhrTransport=function(ae){return function(fe){if(se.detectMozXHRSupport())return new ue(fe,ae);if(se.detectXHROverrideMimeTypeSupport())return new re(fe,ae);throw new Error("This environment's XHR implementation cannot support binary transfer.")}};var re=function(){function ae(fe,Be){this.options=fe,this.init=Be}return ae.prototype.onProgressEvent=function(){this.options.debug&&te.debug("XHR.onProgressEvent.length: ",this.xhr.response.length);var fe=this.xhr.response.substr(this.index);this.index=this.xhr.response.length;var Be=ve(fe);this.options.onChunk(Be)},ae.prototype.onLoadEvent=function(){this.options.debug&&te.debug("XHR.onLoadEvent"),this.options.onEnd()},ae.prototype.onStateChange=function(){this.options.debug&&te.debug("XHR.onStateChange",this.xhr.readyState),this.xhr.readyState===XMLHttpRequest.HEADERS_RECEIVED&&this.options.onHeaders(new k.Metadata(this.xhr.getAllResponseHeaders()),this.xhr.status)},ae.prototype.sendMessage=function(fe){this.xhr.send(fe)},ae.prototype.finishSend=function(){},ae.prototype.start=function(fe){var Be=this;this.metadata=fe;var Ve=new XMLHttpRequest;this.xhr=Ve,Ve.open("POST",this.options.url),this.configureXhr(),this.metadata.forEach(function(Ct,Ge){Ve.setRequestHeader(Ct,Ge.join(", "))}),Ve.withCredentials=Boolean(this.init.withCredentials),Ve.addEventListener("readystatechange",this.onStateChange.bind(this)),Ve.addEventListener("progress",this.onProgressEvent.bind(this)),Ve.addEventListener("loadend",this.onLoadEvent.bind(this)),Ve.addEventListener("error",function(Ct){Be.options.debug&&te.debug("XHR.error",Ct),Be.options.onEnd(Ct.error)})},ae.prototype.configureXhr=function(){this.xhr.responseType="text",this.xhr.overrideMimeType("text/plain; charset=x-user-defined")},ae.prototype.cancel=function(){this.options.debug&&te.debug("XHR.abort"),this.xhr.abort()},ae}();u.XHR=re;var ue=function(ae){function fe(){return ae!==null&&ae.apply(this,arguments)||this}return B(fe,ae),fe.prototype.configureXhr=function(){this.options.debug&&te.debug("MozXHR.configureXhr: setting responseType to 'moz-chunked-arraybuffer'"),this.xhr.responseType="moz-chunked-arraybuffer"},fe.prototype.onProgressEvent=function(){var Be=this.xhr.response;this.options.debug&&te.debug("MozXHR.onProgressEvent: ",new Uint8Array(Be)),this.options.onChunk(new Uint8Array(Be))},fe}(re);function he(ae,fe){var Be=ae.charCodeAt(fe);if(Be>=55296&&Be<=56319){var Ve=ae.charCodeAt(fe+1);Ve>=56320&&Ve<=57343&&(Be=65536+(Be-55296<<10)+(Ve-56320))}return Be}function ve(ae){for(var fe=new Uint8Array(ae.length),Be=0,Ve=0;Ve<ae.length;Ve++){var Ct=String.prototype.codePointAt?ae.codePointAt(Ve):he(ae,Ve);fe[Be++]=255&Ct}return fe}u.MozChunkedArrayBufferXHR=ue,u.stringToArrayBuffer=ve},849:function(a,u){var h;function w(){if(h!==void 0)return h;if(XMLHttpRequest){h=new XMLHttpRequest;try{h.open("GET","https://localhost")}catch{}}return h}function B(k){var te=w();if(!te)return!1;try{return te.responseType=k,te.responseType===k}catch{}return!1}Object.defineProperty(u,"__esModule",{value:!0}),u.detectXHROverrideMimeTypeSupport=u.detectMozXHRSupport=u.xhrSupportsResponseType=void 0,u.xhrSupportsResponseType=B,u.detectMozXHRSupport=function(){return typeof XMLHttpRequest!="undefined"&&B("moz-chunked-arraybuffer")},u.detectXHROverrideMimeTypeSupport=function(){return typeof XMLHttpRequest!="undefined"&&XMLHttpRequest.prototype.hasOwnProperty("overrideMimeType")}},540:function(a,u,h){Object.defineProperty(u,"__esModule",{value:!0}),u.WebsocketTransport=void 0;var w,B=h(346),k=h(617);(function(se){se[se.FINISH_SEND=1]="FINISH_SEND"})(w||(w={}));var te=new Uint8Array([1]);u.WebsocketTransport=function(){return function(se){return function(re){re.debug&&B.debug("websocketRequest",re);var ue,he=function(fe){if(fe.substr(0,8)==="https://")return"wss://"+fe.substr(8);if(fe.substr(0,7)==="http://")return"ws://"+fe.substr(7);throw new Error("Websocket transport constructed with non-https:// or http:// host.")}(re.url),ve=[];function ae(fe){if(fe===w.FINISH_SEND)ue.send(te);else{var Be=fe,Ve=new Int8Array(Be.byteLength+1);Ve.set(new Uint8Array([0])),Ve.set(Be,1),ue.send(Ve)}}return{sendMessage:function(fe){ue&&ue.readyState!==ue.CONNECTING?ae(fe):ve.push(fe)},finishSend:function(){ue&&ue.readyState!==ue.CONNECTING?ae(w.FINISH_SEND):ve.push(w.FINISH_SEND)},start:function(fe){(ue=new WebSocket(he,["grpc-websockets"])).binaryType="arraybuffer",ue.onopen=function(){var Be;re.debug&&B.debug("websocketRequest.onopen"),ue.send((Be="",fe.forEach(function(Ve,Ct){Be+=Ve+": "+Ct.join(", ")+`\r
`}),k.encodeASCII(Be))),ve.forEach(function(Ve){ae(Ve)})},ue.onclose=function(Be){re.debug&&B.debug("websocketRequest.onclose",Be),re.onEnd()},ue.onerror=function(Be){re.debug&&B.debug("websocketRequest.onerror",Be)},ue.onmessage=function(Be){re.onChunk(new Uint8Array(Be.data))}},cancel:function(){re.debug&&B.debug("websocket.abort"),ue.close()}}}(se)}}},35:function(a,u,h){Object.defineProperty(u,"__esModule",{value:!0}),u.unary=void 0;var w=h(65),B=h(934);u.unary=function(k,te){if(k.responseStream)throw new Error(".unary cannot be used with server-streaming methods. Use .invoke or .client instead.");if(k.requestStream)throw new Error(".unary cannot be used with client-streaming methods. Use .client instead.");var se=null,re=null,ue=B.client(k,{host:te.host,transport:te.transport,debug:te.debug});return ue.onHeaders(function(he){se=he}),ue.onMessage(function(he){re=he}),ue.onEnd(function(he,ve,ae){te.onEnd({status:he,statusMessage:ve,headers:se||new w.Metadata,message:re,trailers:ae})}),ue.start(te.metadata),ue.send(te.request),ue.finishSend(),{close:function(){ue.close()}}}},882:function(a,u){Object.defineProperty(u,"__esModule",{value:!0}),u.frameRequest=void 0,u.frameRequest=function(h){var w=h.serializeBinary(),B=new ArrayBuffer(w.byteLength+5);return new DataView(B,1,4).setUint32(0,w.length,!1),new Uint8Array(B,5).set(w),new Uint8Array(B)}}},s={},function a(u){if(s[u])return s[u].exports;var h=s[u]={exports:{}};return n[u].call(h.exports,h,h.exports,a),h.exports}(607);var n,s})})(grpcWebClient_umd);var indexMinimal={},minimal$1={},aspromise=asPromise;function asPromise(r,e){for(var n=new Array(arguments.length-1),s=0,a=2,u=!0;a<arguments.length;)n[s++]=arguments[a++];return new Promise(function(w,B){n[s]=function(te){if(u)if(u=!1,te)B(te);else{for(var se=new Array(arguments.length-1),re=0;re<se.length;)se[re++]=arguments[re];w.apply(null,se)}};try{r.apply(e||null,n)}catch(k){u&&(u=!1,B(k))}})}var base64$1={};(function(r){var e=r;e.length=function(w){var B=w.length;if(!B)return 0;for(var k=0;--B%4>1&&w.charAt(B)==="=";)++k;return Math.ceil(w.length*3)/4-k};for(var n=new Array(64),s=new Array(123),a=0;a<64;)s[n[a]=a<26?a+65:a<52?a+71:a<62?a-4:a-59|43]=a++;e.encode=function(w,B,k){for(var te=null,se=[],re=0,ue=0,he;B<k;){var ve=w[B++];switch(ue){case 0:se[re++]=n[ve>>2],he=(ve&3)<<4,ue=1;break;case 1:se[re++]=n[he|ve>>4],he=(ve&15)<<2,ue=2;break;case 2:se[re++]=n[he|ve>>6],se[re++]=n[ve&63],ue=0;break}re>8191&&((te||(te=[])).push(String.fromCharCode.apply(String,se)),re=0)}return ue&&(se[re++]=n[he],se[re++]=61,ue===1&&(se[re++]=61)),te?(re&&te.push(String.fromCharCode.apply(String,se.slice(0,re))),te.join("")):String.fromCharCode.apply(String,se.slice(0,re))};var u="invalid encoding";e.decode=function(w,B,k){for(var te=k,se=0,re,ue=0;ue<w.length;){var he=w.charCodeAt(ue++);if(he===61&&se>1)break;if((he=s[he])===void 0)throw Error(u);switch(se){case 0:re=he,se=1;break;case 1:B[k++]=re<<2|(he&48)>>4,re=he,se=2;break;case 2:B[k++]=(re&15)<<4|(he&60)>>2,re=he,se=3;break;case 3:B[k++]=(re&3)<<6|he,se=0;break}}if(se===1)throw Error(u);return k-te},e.test=function(w){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(w)}})(base64$1);var eventemitter=EventEmitter;function EventEmitter(){this._listeners={}}EventEmitter.prototype.on=function(e,n,s){return(this._listeners[e]||(this._listeners[e]=[])).push({fn:n,ctx:s||this}),this};EventEmitter.prototype.off=function(e,n){if(e===void 0)this._listeners={};else if(n===void 0)this._listeners[e]=[];else for(var s=this._listeners[e],a=0;a<s.length;)s[a].fn===n?s.splice(a,1):++a;return this};EventEmitter.prototype.emit=function(e){var n=this._listeners[e];if(n){for(var s=[],a=1;a<arguments.length;)s.push(arguments[a++]);for(a=0;a<n.length;)n[a].fn.apply(n[a++].ctx,s)}return this};var float=factory(factory);function factory(r){return typeof Float32Array!="undefined"?function(){var e=new Float32Array([-0]),n=new Uint8Array(e.buffer),s=n[3]===128;function a(B,k,te){e[0]=B,k[te]=n[0],k[te+1]=n[1],k[te+2]=n[2],k[te+3]=n[3]}function u(B,k,te){e[0]=B,k[te]=n[3],k[te+1]=n[2],k[te+2]=n[1],k[te+3]=n[0]}r.writeFloatLE=s?a:u,r.writeFloatBE=s?u:a;function h(B,k){return n[0]=B[k],n[1]=B[k+1],n[2]=B[k+2],n[3]=B[k+3],e[0]}function w(B,k){return n[3]=B[k],n[2]=B[k+1],n[1]=B[k+2],n[0]=B[k+3],e[0]}r.readFloatLE=s?h:w,r.readFloatBE=s?w:h}():function(){function e(s,a,u,h){var w=a<0?1:0;if(w&&(a=-a),a===0)s(1/a>0?0:2147483648,u,h);else if(isNaN(a))s(2143289344,u,h);else if(a>34028234663852886e22)s((w<<31|2139095040)>>>0,u,h);else if(a<11754943508222875e-54)s((w<<31|Math.round(a/1401298464324817e-60))>>>0,u,h);else{var B=Math.floor(Math.log(a)/Math.LN2),k=Math.round(a*Math.pow(2,-B)*8388608)&8388607;s((w<<31|B+127<<23|k)>>>0,u,h)}}r.writeFloatLE=e.bind(null,writeUintLE),r.writeFloatBE=e.bind(null,writeUintBE);function n(s,a,u){var h=s(a,u),w=(h>>31)*2+1,B=h>>>23&255,k=h&8388607;return B===255?k?NaN:w*(1/0):B===0?w*1401298464324817e-60*k:w*Math.pow(2,B-150)*(k+8388608)}r.readFloatLE=n.bind(null,readUintLE),r.readFloatBE=n.bind(null,readUintBE)}(),typeof Float64Array!="undefined"?function(){var e=new Float64Array([-0]),n=new Uint8Array(e.buffer),s=n[7]===128;function a(B,k,te){e[0]=B,k[te]=n[0],k[te+1]=n[1],k[te+2]=n[2],k[te+3]=n[3],k[te+4]=n[4],k[te+5]=n[5],k[te+6]=n[6],k[te+7]=n[7]}function u(B,k,te){e[0]=B,k[te]=n[7],k[te+1]=n[6],k[te+2]=n[5],k[te+3]=n[4],k[te+4]=n[3],k[te+5]=n[2],k[te+6]=n[1],k[te+7]=n[0]}r.writeDoubleLE=s?a:u,r.writeDoubleBE=s?u:a;function h(B,k){return n[0]=B[k],n[1]=B[k+1],n[2]=B[k+2],n[3]=B[k+3],n[4]=B[k+4],n[5]=B[k+5],n[6]=B[k+6],n[7]=B[k+7],e[0]}function w(B,k){return n[7]=B[k],n[6]=B[k+1],n[5]=B[k+2],n[4]=B[k+3],n[3]=B[k+4],n[2]=B[k+5],n[1]=B[k+6],n[0]=B[k+7],e[0]}r.readDoubleLE=s?h:w,r.readDoubleBE=s?w:h}():function(){function e(s,a,u,h,w,B){var k=h<0?1:0;if(k&&(h=-h),h===0)s(0,w,B+a),s(1/h>0?0:2147483648,w,B+u);else if(isNaN(h))s(0,w,B+a),s(2146959360,w,B+u);else if(h>17976931348623157e292)s(0,w,B+a),s((k<<31|2146435072)>>>0,w,B+u);else{var te;if(h<22250738585072014e-324)te=h/5e-324,s(te>>>0,w,B+a),s((k<<31|te/4294967296)>>>0,w,B+u);else{var se=Math.floor(Math.log(h)/Math.LN2);se===1024&&(se=1023),te=h*Math.pow(2,-se),s(te*4503599627370496>>>0,w,B+a),s((k<<31|se+1023<<20|te*1048576&1048575)>>>0,w,B+u)}}}r.writeDoubleLE=e.bind(null,writeUintLE,0,4),r.writeDoubleBE=e.bind(null,writeUintBE,4,0);function n(s,a,u,h,w){var B=s(h,w+a),k=s(h,w+u),te=(k>>31)*2+1,se=k>>>20&2047,re=4294967296*(k&1048575)+B;return se===2047?re?NaN:te*(1/0):se===0?te*5e-324*re:te*Math.pow(2,se-1075)*(re+4503599627370496)}r.readDoubleLE=n.bind(null,readUintLE,0,4),r.readDoubleBE=n.bind(null,readUintBE,4,0)}(),r}function writeUintLE(r,e,n){e[n]=r&255,e[n+1]=r>>>8&255,e[n+2]=r>>>16&255,e[n+3]=r>>>24}function writeUintBE(r,e,n){e[n]=r>>>24,e[n+1]=r>>>16&255,e[n+2]=r>>>8&255,e[n+3]=r&255}function readUintLE(r,e){return(r[e]|r[e+1]<<8|r[e+2]<<16|r[e+3]<<24)>>>0}function readUintBE(r,e){return(r[e]<<24|r[e+1]<<16|r[e+2]<<8|r[e+3])>>>0}var inquire_1=inquire;function inquire(moduleName){try{var mod=eval("quire".replace(/^/,"re"))(moduleName);if(mod&&(mod.length||Object.keys(mod).length))return mod}catch(r){}return null}var utf8$2={};(function(r){var e=r;e.length=function(s){for(var a=0,u=0,h=0;h<s.length;++h)u=s.charCodeAt(h),u<128?a+=1:u<2048?a+=2:(u&64512)===55296&&(s.charCodeAt(h+1)&64512)===56320?(++h,a+=4):a+=3;return a},e.read=function(s,a,u){var h=u-a;if(h<1)return"";for(var w=null,B=[],k=0,te;a<u;)te=s[a++],te<128?B[k++]=te:te>191&&te<224?B[k++]=(te&31)<<6|s[a++]&63:te>239&&te<365?(te=((te&7)<<18|(s[a++]&63)<<12|(s[a++]&63)<<6|s[a++]&63)-65536,B[k++]=55296+(te>>10),B[k++]=56320+(te&1023)):B[k++]=(te&15)<<12|(s[a++]&63)<<6|s[a++]&63,k>8191&&((w||(w=[])).push(String.fromCharCode.apply(String,B)),k=0);return w?(k&&w.push(String.fromCharCode.apply(String,B.slice(0,k))),w.join("")):String.fromCharCode.apply(String,B.slice(0,k))},e.write=function(s,a,u){for(var h=u,w,B,k=0;k<s.length;++k)w=s.charCodeAt(k),w<128?a[u++]=w:w<2048?(a[u++]=w>>6|192,a[u++]=w&63|128):(w&64512)===55296&&((B=s.charCodeAt(k+1))&64512)===56320?(w=65536+((w&1023)<<10)+(B&1023),++k,a[u++]=w>>18|240,a[u++]=w>>12&63|128,a[u++]=w>>6&63|128,a[u++]=w&63|128):(a[u++]=w>>12|224,a[u++]=w>>6&63|128,a[u++]=w&63|128);return u-h}})(utf8$2);var pool_1=pool;function pool(r,e,n){var s=n||8192,a=s>>>1,u=null,h=s;return function(B){if(B<1||B>a)return r(B);h+B>s&&(u=r(s),h=0);var k=e.call(u,h,h+=B);return h&7&&(h=(h|7)+1),k}}var longbits=LongBits$2,util$5=minimal$1;function LongBits$2(r,e){this.lo=r>>>0,this.hi=e>>>0}var zero=LongBits$2.zero=new LongBits$2(0,0);zero.toNumber=function(){return 0};zero.zzEncode=zero.zzDecode=function(){return this};zero.length=function(){return 1};var zeroHash=LongBits$2.zeroHash="\0\0\0\0\0\0\0\0";LongBits$2.fromNumber=function r(e){if(e===0)return zero;var n=e<0;n&&(e=-e);var s=e>>>0,a=(e-s)/4294967296>>>0;return n&&(a=~a>>>0,s=~s>>>0,++s>4294967295&&(s=0,++a>4294967295&&(a=0))),new LongBits$2(s,a)};LongBits$2.from=function r(e){if(typeof e=="number")return LongBits$2.fromNumber(e);if(util$5.isString(e))if(util$5.Long)e=util$5.Long.fromString(e);else return LongBits$2.fromNumber(parseInt(e,10));return e.low||e.high?new LongBits$2(e.low>>>0,e.high>>>0):zero};LongBits$2.prototype.toNumber=function r(e){if(!e&&this.hi>>>31){var n=~this.lo+1>>>0,s=~this.hi>>>0;return n||(s=s+1>>>0),-(n+s*4294967296)}return this.lo+this.hi*4294967296};LongBits$2.prototype.toLong=function r(e){return util$5.Long?new util$5.Long(this.lo|0,this.hi|0,Boolean(e)):{low:this.lo|0,high:this.hi|0,unsigned:Boolean(e)}};var charCodeAt=String.prototype.charCodeAt;LongBits$2.fromHash=function r(e){return e===zeroHash?zero:new LongBits$2((charCodeAt.call(e,0)|charCodeAt.call(e,1)<<8|charCodeAt.call(e,2)<<16|charCodeAt.call(e,3)<<24)>>>0,(charCodeAt.call(e,4)|charCodeAt.call(e,5)<<8|charCodeAt.call(e,6)<<16|charCodeAt.call(e,7)<<24)>>>0)};LongBits$2.prototype.toHash=function r(){return String.fromCharCode(this.lo&255,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,this.hi&255,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)};LongBits$2.prototype.zzEncode=function r(){var e=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^e)>>>0,this.lo=(this.lo<<1^e)>>>0,this};LongBits$2.prototype.zzDecode=function r(){var e=-(this.lo&1);return this.lo=((this.lo>>>1|this.hi<<31)^e)>>>0,this.hi=(this.hi>>>1^e)>>>0,this};LongBits$2.prototype.length=function r(){var e=this.lo,n=(this.lo>>>28|this.hi<<4)>>>0,s=this.hi>>>24;return s===0?n===0?e<16384?e<128?1:2:e<2097152?3:4:n<16384?n<128?5:6:n<2097152?7:8:s<128?9:10};(function(r){var e=r;e.asPromise=aspromise,e.base64=base64$1,e.EventEmitter=eventemitter,e.float=float,e.inquire=inquire_1,e.utf8=utf8$2,e.pool=pool_1,e.LongBits=longbits,e.isNode=Boolean(typeof commonjsGlobal!="undefined"&&commonjsGlobal&&commonjsGlobal.process&&commonjsGlobal.process.versions&&commonjsGlobal.process.versions.node),e.global=e.isNode&&commonjsGlobal||typeof window!="undefined"&&window||typeof self!="undefined"&&self||commonjsGlobal,e.emptyArray=Object.freeze?Object.freeze([]):[],e.emptyObject=Object.freeze?Object.freeze({}):{},e.isInteger=Number.isInteger||function(u){return typeof u=="number"&&isFinite(u)&&Math.floor(u)===u},e.isString=function(u){return typeof u=="string"||u instanceof String},e.isObject=function(u){return u&&typeof u=="object"},e.isset=e.isSet=function(u,h){var w=u[h];return w!=null&&u.hasOwnProperty(h)?typeof w!="object"||(Array.isArray(w)?w.length:Object.keys(w).length)>0:!1},e.Buffer=function(){try{var a=e.inquire("buffer").Buffer;return a.prototype.utf8Write?a:null}catch{return null}}(),e._Buffer_from=null,e._Buffer_allocUnsafe=null,e.newBuffer=function(u){return typeof u=="number"?e.Buffer?e._Buffer_allocUnsafe(u):new e.Array(u):e.Buffer?e._Buffer_from(u):typeof Uint8Array=="undefined"?u:new Uint8Array(u)},e.Array=typeof Uint8Array!="undefined"?Uint8Array:Array,e.Long=e.global.dcodeIO&&e.global.dcodeIO.Long||e.global.Long||e.inquire("long"),e.key2Re=/^true|false|0|1$/,e.key32Re=/^-?(?:0|[1-9][0-9]*)$/,e.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/,e.longToHash=function(u){return u?e.LongBits.from(u).toHash():e.LongBits.zeroHash},e.longFromHash=function(u,h){var w=e.LongBits.fromHash(u);return e.Long?e.Long.fromBits(w.lo,w.hi,h):w.toNumber(Boolean(h))};function n(a,u,h){for(var w=Object.keys(u),B=0;B<w.length;++B)(a[w[B]]===void 0||!h)&&(a[w[B]]=u[w[B]]);return a}e.merge=n,e.lcFirst=function(u){return u.charAt(0).toLowerCase()+u.substring(1)};function s(a){function u(h,w){if(!(this instanceof u))return new u(h,w);Object.defineProperty(this,"message",{get:function(){return h}}),Error.captureStackTrace?Error.captureStackTrace(this,u):Object.defineProperty(this,"stack",{value:new Error().stack||""}),w&&n(this,w)}return(u.prototype=Object.create(Error.prototype)).constructor=u,Object.defineProperty(u.prototype,"name",{get:function(){return a}}),u.prototype.toString=function(){return this.name+": "+this.message},u}e.newError=s,e.ProtocolError=s("ProtocolError"),e.oneOfGetter=function(u){for(var h={},w=0;w<u.length;++w)h[u[w]]=1;return function(){for(var B=Object.keys(this),k=B.length-1;k>-1;--k)if(h[B[k]]===1&&this[B[k]]!==void 0&&this[B[k]]!==null)return B[k]}},e.oneOfSetter=function(u){return function(h){for(var w=0;w<u.length;++w)u[w]!==h&&delete this[u[w]]}},e.toJSONOptions={longs:String,enums:String,bytes:String,json:!0},e._configure=function(){var a=e.Buffer;if(!a){e._Buffer_from=e._Buffer_allocUnsafe=null;return}e._Buffer_from=a.from!==Uint8Array.from&&a.from||function(h,w){return new a(h,w)},e._Buffer_allocUnsafe=a.allocUnsafe||function(h){return new a(h)}}})(minimal$1);var writer=Writer$1,util$4=minimal$1,BufferWriter$1,LongBits$1=util$4.LongBits,base64=util$4.base64,utf8$1=util$4.utf8;function Op(r,e,n){this.fn=r,this.len=e,this.next=void 0,this.val=n}function noop(){}function State(r){this.head=r.head,this.tail=r.tail,this.len=r.len,this.next=r.states}function Writer$1(){this.len=0,this.head=new Op(noop,0,0),this.tail=this.head,this.states=null}var create$1=function r(){return util$4.Buffer?function(){return(Writer$1.create=function(){return new BufferWriter$1})()}:function(){return new Writer$1}};Writer$1.create=create$1();Writer$1.alloc=function r(e){return new util$4.Array(e)};util$4.Array!==Array&&(Writer$1.alloc=util$4.pool(Writer$1.alloc,util$4.Array.prototype.subarray));Writer$1.prototype._push=function r(e,n,s){return this.tail=this.tail.next=new Op(e,n,s),this.len+=n,this};function writeByte(r,e,n){e[n]=r&255}function writeVarint32(r,e,n){for(;r>127;)e[n++]=r&127|128,r>>>=7;e[n]=r}function VarintOp(r,e){this.len=r,this.next=void 0,this.val=e}VarintOp.prototype=Object.create(Op.prototype);VarintOp.prototype.fn=writeVarint32;Writer$1.prototype.uint32=function r(e){return this.len+=(this.tail=this.tail.next=new VarintOp((e=e>>>0)<128?1:e<16384?2:e<2097152?3:e<268435456?4:5,e)).len,this};Writer$1.prototype.int32=function r(e){return e<0?this._push(writeVarint64,10,LongBits$1.fromNumber(e)):this.uint32(e)};Writer$1.prototype.sint32=function r(e){return this.uint32((e<<1^e>>31)>>>0)};function writeVarint64(r,e,n){for(;r.hi;)e[n++]=r.lo&127|128,r.lo=(r.lo>>>7|r.hi<<25)>>>0,r.hi>>>=7;for(;r.lo>127;)e[n++]=r.lo&127|128,r.lo=r.lo>>>7;e[n++]=r.lo}Writer$1.prototype.uint64=function r(e){var n=LongBits$1.from(e);return this._push(writeVarint64,n.length(),n)};Writer$1.prototype.int64=Writer$1.prototype.uint64;Writer$1.prototype.sint64=function r(e){var n=LongBits$1.from(e).zzEncode();return this._push(writeVarint64,n.length(),n)};Writer$1.prototype.bool=function r(e){return this._push(writeByte,1,e?1:0)};function writeFixed32(r,e,n){e[n]=r&255,e[n+1]=r>>>8&255,e[n+2]=r>>>16&255,e[n+3]=r>>>24}Writer$1.prototype.fixed32=function r(e){return this._push(writeFixed32,4,e>>>0)};Writer$1.prototype.sfixed32=Writer$1.prototype.fixed32;Writer$1.prototype.fixed64=function r(e){var n=LongBits$1.from(e);return this._push(writeFixed32,4,n.lo)._push(writeFixed32,4,n.hi)};Writer$1.prototype.sfixed64=Writer$1.prototype.fixed64;Writer$1.prototype.float=function r(e){return this._push(util$4.float.writeFloatLE,4,e)};Writer$1.prototype.double=function r(e){return this._push(util$4.float.writeDoubleLE,8,e)};var writeBytes=util$4.Array.prototype.set?function r(e,n,s){n.set(e,s)}:function r(e,n,s){for(var a=0;a<e.length;++a)n[s+a]=e[a]};Writer$1.prototype.bytes=function r(e){var n=e.length>>>0;if(!n)return this._push(writeByte,1,0);if(util$4.isString(e)){var s=Writer$1.alloc(n=base64.length(e));base64.decode(e,s,0),e=s}return this.uint32(n)._push(writeBytes,n,e)};Writer$1.prototype.string=function r(e){var n=utf8$1.length(e);return n?this.uint32(n)._push(utf8$1.write,n,e):this._push(writeByte,1,0)};Writer$1.prototype.fork=function r(){return this.states=new State(this),this.head=this.tail=new Op(noop,0,0),this.len=0,this};Writer$1.prototype.reset=function r(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new Op(noop,0,0),this.len=0),this};Writer$1.prototype.ldelim=function r(){var e=this.head,n=this.tail,s=this.len;return this.reset().uint32(s),s&&(this.tail.next=e.next,this.tail=n,this.len+=s),this};Writer$1.prototype.finish=function r(){for(var e=this.head.next,n=this.constructor.alloc(this.len),s=0;e;)e.fn(e.val,n,s),s+=e.len,e=e.next;return n};Writer$1._configure=function(r){BufferWriter$1=r,Writer$1.create=create$1(),BufferWriter$1._configure()};var writer_buffer=BufferWriter,Writer=writer;(BufferWriter.prototype=Object.create(Writer.prototype)).constructor=BufferWriter;var util$3=minimal$1;function BufferWriter(){Writer.call(this)}BufferWriter._configure=function(){BufferWriter.alloc=util$3._Buffer_allocUnsafe,BufferWriter.writeBytesBuffer=util$3.Buffer&&util$3.Buffer.prototype instanceof Uint8Array&&util$3.Buffer.prototype.set.name==="set"?function(e,n,s){n.set(e,s)}:function(e,n,s){if(e.copy)e.copy(n,s,0,e.length);else for(var a=0;a<e.length;)n[s++]=e[a++]}};BufferWriter.prototype.bytes=function r(e){util$3.isString(e)&&(e=util$3._Buffer_from(e,"base64"));var n=e.length>>>0;return this.uint32(n),n&&this._push(BufferWriter.writeBytesBuffer,n,e),this};function writeStringBuffer(r,e,n){r.length<40?util$3.utf8.write(r,e,n):e.utf8Write?e.utf8Write(r,n):e.write(r,n)}BufferWriter.prototype.string=function r(e){var n=util$3.Buffer.byteLength(e);return this.uint32(n),n&&this._push(writeStringBuffer,n,e),this};BufferWriter._configure();var reader=Reader$1,util$2=minimal$1,BufferReader$1,LongBits=util$2.LongBits,utf8=util$2.utf8;function indexOutOfRange(r,e){return RangeError("index out of range: "+r.pos+" + "+(e||1)+" > "+r.len)}function Reader$1(r){this.buf=r,this.pos=0,this.len=r.length}var create_array=typeof Uint8Array!="undefined"?function r(e){if(e instanceof Uint8Array||Array.isArray(e))return new Reader$1(e);throw Error("illegal buffer")}:function r(e){if(Array.isArray(e))return new Reader$1(e);throw Error("illegal buffer")},create=function r(){return util$2.Buffer?function(n){return(Reader$1.create=function(a){return util$2.Buffer.isBuffer(a)?new BufferReader$1(a):create_array(a)})(n)}:create_array};Reader$1.create=create();Reader$1.prototype._slice=util$2.Array.prototype.subarray||util$2.Array.prototype.slice;Reader$1.prototype.uint32=function r(){var e=4294967295;return function(){if(e=(this.buf[this.pos]&127)>>>0,this.buf[this.pos++]<128||(e=(e|(this.buf[this.pos]&127)<<7)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<14)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<21)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&15)<<28)>>>0,this.buf[this.pos++]<128))return e;if((this.pos+=5)>this.len)throw this.pos=this.len,indexOutOfRange(this,10);return e}}();Reader$1.prototype.int32=function r(){return this.uint32()|0};Reader$1.prototype.sint32=function r(){var e=this.uint32();return e>>>1^-(e&1)|0};function readLongVarint(){var r=new LongBits(0,0),e=0;if(this.len-this.pos>4){for(;e<4;++e)if(r.lo=(r.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return r;if(r.lo=(r.lo|(this.buf[this.pos]&127)<<28)>>>0,r.hi=(r.hi|(this.buf[this.pos]&127)>>4)>>>0,this.buf[this.pos++]<128)return r;e=0}else{for(;e<3;++e){if(this.pos>=this.len)throw indexOutOfRange(this);if(r.lo=(r.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return r}return r.lo=(r.lo|(this.buf[this.pos++]&127)<<e*7)>>>0,r}if(this.len-this.pos>4){for(;e<5;++e)if(r.hi=(r.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return r}else for(;e<5;++e){if(this.pos>=this.len)throw indexOutOfRange(this);if(r.hi=(r.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return r}throw Error("invalid varint encoding")}Reader$1.prototype.bool=function r(){return this.uint32()!==0};function readFixed32_end(r,e){return(r[e-4]|r[e-3]<<8|r[e-2]<<16|r[e-1]<<24)>>>0}Reader$1.prototype.fixed32=function r(){if(this.pos+4>this.len)throw indexOutOfRange(this,4);return readFixed32_end(this.buf,this.pos+=4)};Reader$1.prototype.sfixed32=function r(){if(this.pos+4>this.len)throw indexOutOfRange(this,4);return readFixed32_end(this.buf,this.pos+=4)|0};function readFixed64(){if(this.pos+8>this.len)throw indexOutOfRange(this,8);return new LongBits(readFixed32_end(this.buf,this.pos+=4),readFixed32_end(this.buf,this.pos+=4))}Reader$1.prototype.float=function r(){if(this.pos+4>this.len)throw indexOutOfRange(this,4);var e=util$2.float.readFloatLE(this.buf,this.pos);return this.pos+=4,e};Reader$1.prototype.double=function r(){if(this.pos+8>this.len)throw indexOutOfRange(this,4);var e=util$2.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,e};Reader$1.prototype.bytes=function r(){var e=this.uint32(),n=this.pos,s=this.pos+e;if(s>this.len)throw indexOutOfRange(this,e);return this.pos+=e,Array.isArray(this.buf)?this.buf.slice(n,s):n===s?new this.buf.constructor(0):this._slice.call(this.buf,n,s)};Reader$1.prototype.string=function r(){var e=this.bytes();return utf8.read(e,0,e.length)};Reader$1.prototype.skip=function r(e){if(typeof e=="number"){if(this.pos+e>this.len)throw indexOutOfRange(this,e);this.pos+=e}else do if(this.pos>=this.len)throw indexOutOfRange(this);while(this.buf[this.pos++]&128);return this};Reader$1.prototype.skipType=function(r){switch(r){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;(r=this.uint32()&7)!==4;)this.skipType(r);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+r+" at offset "+this.pos)}return this};Reader$1._configure=function(r){BufferReader$1=r,Reader$1.create=create(),BufferReader$1._configure();var e=util$2.Long?"toLong":"toNumber";util$2.merge(Reader$1.prototype,{int64:function(){return readLongVarint.call(this)[e](!1)},uint64:function(){return readLongVarint.call(this)[e](!0)},sint64:function(){return readLongVarint.call(this).zzDecode()[e](!1)},fixed64:function(){return readFixed64.call(this)[e](!0)},sfixed64:function(){return readFixed64.call(this)[e](!1)}})};var reader_buffer=BufferReader,Reader=reader;(BufferReader.prototype=Object.create(Reader.prototype)).constructor=BufferReader;var util$1=minimal$1;function BufferReader(r){Reader.call(this,r)}BufferReader._configure=function(){util$1.Buffer&&(BufferReader.prototype._slice=util$1.Buffer.prototype.slice)};BufferReader.prototype.string=function r(){var e=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+e,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+e,this.len))};BufferReader._configure();var rpc={},service=Service,util=minimal$1;(Service.prototype=Object.create(util.EventEmitter.prototype)).constructor=Service;function Service(r,e,n){if(typeof r!="function")throw TypeError("rpcImpl must be a function");util.EventEmitter.call(this),this.rpcImpl=r,this.requestDelimited=Boolean(e),this.responseDelimited=Boolean(n)}Service.prototype.rpcCall=function r(e,n,s,a,u){if(!a)throw TypeError("request must be specified");var h=this;if(!u)return util.asPromise(r,h,e,n,s,a);if(!h.rpcImpl){setTimeout(function(){u(Error("already ended"))},0);return}try{return h.rpcImpl(e,n[h.requestDelimited?"encodeDelimited":"encode"](a).finish(),function(B,k){if(B)return h.emit("error",B,e),u(B);if(k===null){h.end(!0);return}if(!(k instanceof s))try{k=s[h.responseDelimited?"decodeDelimited":"decode"](k)}catch(te){return h.emit("error",te,e),u(te)}return h.emit("data",k,e),u(null,k)})}catch(w){h.emit("error",w,e),setTimeout(function(){u(w)},0);return}};Service.prototype.end=function r(e){return this.rpcImpl&&(e||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this};(function(r){var e=r;e.Service=service})(rpc);var roots={};(function(r){var e=r;e.build="minimal",e.Writer=writer,e.BufferWriter=writer_buffer,e.Reader=reader,e.BufferReader=reader_buffer,e.util=minimal$1,e.rpc=rpc,e.roots=roots,e.configure=n;function n(){e.util._configure(),e.Writer._configure(e.BufferWriter),e.Reader._configure(e.BufferReader)}n()})(indexMinimal);var minimal=indexMinimal,browserHeaders_umd={exports:{}};(function(r,e){(function(s,a){r.exports=a()})(commonjsGlobal,function(){return function(n){var s={};function a(u){if(s[u])return s[u].exports;var h=s[u]={i:u,l:!1,exports:{}};return n[u].call(h.exports,h,h.exports,a),h.l=!0,h.exports}return a.m=n,a.c=s,a.i=function(u){return u},a.d=function(u,h,w){a.o(u,h)||Object.defineProperty(u,h,{configurable:!1,enumerable:!0,get:w})},a.n=function(u){var h=u&&u.__esModule?function(){return u.default}:function(){return u};return a.d(h,"a",h),h},a.o=function(u,h){return Object.prototype.hasOwnProperty.call(u,h)},a.p="",a(a.s=1)}([function(n,s,a){Object.defineProperty(s,"__esModule",{value:!0});var u=a(3);function h(B){return typeof B=="object"&&typeof B.headersMap=="object"&&typeof B.forEach=="function"}var w=function(){function B(k,te){k===void 0&&(k={}),te===void 0&&(te={splitValues:!1});var se=this;if(this.headersMap={},k)if(typeof Headers!="undefined"&&k instanceof Headers){var re=u.getHeaderKeys(k);re.forEach(function(he){var ve=u.getHeaderValues(k,he);ve.forEach(function(ae){te.splitValues?se.append(he,u.splitHeaderValue(ae)):se.append(he,ae)})})}else if(h(k))k.forEach(function(he,ve){se.append(he,ve)});else if(typeof Map!="undefined"&&k instanceof Map){var ue=k;ue.forEach(function(he,ve){se.append(ve,he)})}else typeof k=="string"?this.appendFromString(k):typeof k=="object"&&Object.getOwnPropertyNames(k).forEach(function(he){var ve=k,ae=ve[he];Array.isArray(ae)?ae.forEach(function(fe){se.append(he,fe)}):se.append(he,ae)})}return B.prototype.appendFromString=function(k){for(var te=k.split(`\r
`),se=0;se<te.length;se++){var re=te[se],ue=re.indexOf(":");if(ue>0){var he=re.substring(0,ue).trim(),ve=re.substring(ue+1).trim();this.append(he,ve)}}},B.prototype.delete=function(k,te){var se=u.normalizeName(k);if(te===void 0)delete this.headersMap[se];else{var re=this.headersMap[se];if(re){var ue=re.indexOf(te);ue>=0&&re.splice(ue,1),re.length===0&&delete this.headersMap[se]}}},B.prototype.append=function(k,te){var se=this,re=u.normalizeName(k);Array.isArray(this.headersMap[re])||(this.headersMap[re]=[]),Array.isArray(te)?te.forEach(function(ue){se.headersMap[re].push(u.normalizeValue(ue))}):this.headersMap[re].push(u.normalizeValue(te))},B.prototype.set=function(k,te){var se=u.normalizeName(k);if(Array.isArray(te)){var re=[];te.forEach(function(ue){re.push(u.normalizeValue(ue))}),this.headersMap[se]=re}else this.headersMap[se]=[u.normalizeValue(te)]},B.prototype.has=function(k,te){var se=this.headersMap[u.normalizeName(k)],re=Array.isArray(se);if(!re)return!1;if(te!==void 0){var ue=u.normalizeValue(te);return se.indexOf(ue)>=0}else return!0},B.prototype.get=function(k){var te=this.headersMap[u.normalizeName(k)];return te!==void 0?te.concat():[]},B.prototype.forEach=function(k){var te=this;Object.getOwnPropertyNames(this.headersMap).forEach(function(se){k(se,te.headersMap[se])},this)},B.prototype.toHeaders=function(){if(typeof Headers!="undefined"){var k=new Headers;return this.forEach(function(te,se){se.forEach(function(re){k.append(te,re)})}),k}else throw new Error("Headers class is not defined")},B}();s.BrowserHeaders=w},function(n,s,a){Object.defineProperty(s,"__esModule",{value:!0});var u=a(0);s.BrowserHeaders=u.BrowserHeaders},function(n,s,a){Object.defineProperty(s,"__esModule",{value:!0});function u(w,B){for(var k=w[Symbol.iterator](),te=k.next();!te.done;)B(te.value[0]),te=k.next()}s.iterateHeaders=u;function h(w,B){for(var k=w.keys(),te=k.next();!te.done;)B(te.value),te=k.next()}s.iterateHeadersKeys=h},function(n,s,a){Object.defineProperty(s,"__esModule",{value:!0});var u=a(2);function h(re){if(typeof re!="string"&&(re=String(re)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(re))throw new TypeError("Invalid character in header field name");return re.toLowerCase()}s.normalizeName=h;function w(re){return typeof re!="string"&&(re=String(re)),re}s.normalizeValue=w;function B(re,ue){var he=re;if(he instanceof Headers&&he.getAll)return he.getAll(ue);var ve=he.get(ue);return ve&&typeof ve=="string"?[ve]:ve}s.getHeaderValues=B;function k(re){return re}function te(re){var ue=re,he={},ve=[];return ue.keys?u.iterateHeadersKeys(ue,function(ae){he[ae]||(he[ae]=!0,ve.push(ae))}):ue.forEach?ue.forEach(function(ae,fe){he[fe]||(he[fe]=!0,ve.push(fe))}):u.iterateHeaders(ue,function(ae){var fe=ae[0];he[fe]||(he[fe]=!0,ve.push(fe))}),ve}s.getHeaderKeys=te;function se(re){var ue=[],he=re.split(", ");return he.forEach(function(ve){ve.split(",").forEach(function(ae){ue.push(ae)})}),ue}s.splitHeaderValue=se}])})})(browserHeaders_umd);export{run_all as $,get_spread_object as A,destroy_component as B,assign as C,writable as D,tick as E,query_selector_all as F,src_url_equal as G,append_hydration as H,noop$3 as I,create_slot as J,update_slot_base as K,get_all_dirty_from_scope as L,get_slot_changes as M,svg_element as N,claim_svg_element as O,exclude_internal_props as P,initializeApp as Q,on as R,SvelteComponent as S,GoogleAuthProvider as T,getAuth as U,onAuthStateChanged as V,signInWithPopup as W,component_subscribe as X,handle_promise as Y,update_await_block_branch as Z,listen as _,children as a,reauthenticateWithPopup as a0,Ir as a1,wn as a2,Er as a3,vr as a4,_ as a5,ShortUniqueId as a6,readable as a7,Subject as a8,BehaviorSubject as a9,scan as aa,debounceTime as ab,minimal as ac,Long as ad,update_keyed_each as ae,outro_and_destroy_block as af,attr as b,claim_element as c,detach as d,element as e,set_style as f,insert_hydration as g,claim_text as h,init as i,set_data as j,space as k,empty as l,claim_space as m,group_outros as n,transition_out as o,check_outros as p,transition_in as q,setContext as r,safe_not_equal as s,text as t,afterUpdate as u,onMount as v,create_component as w,claim_component as x,mount_component as y,get_spread_update as z};
