import{a1 as g,a4 as oe,a5 as re,N as ie,a6 as le,a7 as se,a8 as ae,a9 as B,aa as Z,S as I,i as z,s as L,e as x,c as $,a as q,d,b as w,g as _,I as S,l as b,n as N,o as h,p as V,q as p,t as U,h as K,j as T,w as P,x as A,y as H,B as D,H as j,$ as ce,ab as ue,_ as fe,ac as de}from"../../chunks/vendor-31a8d0de.js";import{B as me}from"../../chunks/BlogPage-f13583f7.js";import"../../chunks/StandardTopBar-18167fd0.js";import"../../chunks/AuthService-1268c3b6.js";import"../../chunks/preload-helper-ec9aa979.js";import"../../chunks/singletons-d1fb5791.js";function F(i,e){return e==0?{firstHalf:i,secondHalf:""}:{firstHalf:i.slice(0,e),secondHalf:i.slice(e)}}function pe(i){const{blockId:e,uiArticle:t}=i,n=t.editorData.article.blocks.findIndex(a=>e==a.id);return{blockIndex:n,block:n<0?void 0:t.editorData.article.blocks[n]}}function O(i){const{blockId:e,uiArticle:t,updateBlocks:n}=i,{block:a,blockIndex:l}=pe({uiArticle:t,blockId:e});if(l<0)return console.log("block with id ",e," not found"),t;const{editorData:{article:{id:o,version:r,blocks:s,authorId:c},focus:u},history:{index:f,momento:v}}=t,k=n({block:a,allBlocks:s,blockIndex:l,focus:u}),y=k.updateVersion(r),C={article:{id:o,version:y,blocks:k.allBlocks,authorId:c},focus:k.focus},m=y!=r?[...v.slice(g.max([0,v.length-1e3]),f+1),C]:v,E=y!=r?f+1:f;return{editorData:C,history:{index:E,momento:m}}}function _e(i){const{backspace:e}=i;return{isHandler:()=>e!=null,applyChange:t=>{const{editorData:{focus:{localized:n,range:a},article:l}}=t;if(!n)return t;const{blockId:o,cursor:r}=n;return O({blockId:o,uiArticle:t,updateBlocks:({block:s,allBlocks:c,blockIndex:u,focus:f})=>{if(!s.content.textContent)return console.log("Not handled delete if not text content"),{allBlocks:c,focus:f,updateVersion:m=>m+1};const{type:v,value:k}=s.content.textContent,{firstHalf:y,secondHalf:C}=F(k,r);if(y.length>0)return{focus:f,allBlocks:[...c.slice(0,u),{id:o,version:s.version+1,content:{textContent:{type:v,value:y.slice(0,y.length-1)+C}}},...c.slice(u+1)],updateVersion:m=>m+1};if(u==0)return{allBlocks:c,focus:f,updateVersion:m=>m+1};if(c[u-1].content.textContent){const m=c[u-1];return{focus:{localized:{cursor:r,blockId:m.id},range:void 0},allBlocks:[...c.slice(0,u-1),{id:m.id,version:m.version+1,content:{textContent:{type:m.content.textContent.type,value:m.content.textContent.value+s.content.textContent.value}}},...c.slice(u+1)],updateVersion:E=>E+1}}else return{focus:f,allBlocks:[...c.slice(0,u-1),...c.slice(u)],updateVersion:m=>m+1}}})}}}function he(i){const{carriageReturn:e}=i;return{isHandler:()=>e!=null,applyChange:t=>{const{editorData:{focus:{localized:n,range:a},article:l}}=t;if(!n)return t;const{blockId:o,cursor:r}=n;return O({blockId:o,uiArticle:t,updateBlocks:({block:s,allBlocks:c,blockIndex:u,focus:f})=>{if(!s.content.textContent)return console.log("Not handled delete if not text content"),{allBlocks:c,focus:f,updateVersion:E=>E+1};const{type:v,value:k}=s.content.textContent,{firstHalf:y,secondHalf:C}=F(k,r);console.log({firstHalf:y,secondHalf:C});const m=G();return{focus:{localized:{blockId:m,cursor:-C.length},range:void 0},allBlocks:[...c.slice(0,u),{id:o,version:s.version+1,content:{textContent:{type:v,value:y}}},{id:m,version:0,content:{textContent:{type:v,value:C}}},...c.slice(u+1)],updateVersion:E=>E+1}}})}}}function be(i){const{insertText:e}=i;return{isHandler:()=>e!=null,applyChange:t=>{const{editorData:{article:n,focus:a}}=t;switch(!0){case a.localized!=null:{const{blockId:l,cursor:o}=a.localized;return O({blockId:l,uiArticle:t,updateBlocks:({block:r,allBlocks:s,blockIndex:c,focus:u})=>{const{content:f,version:v}=r;if(f.textContent==null)return{allBlocks:s,focus:u,updateVersion:C=>C+1};const k=F(f.textContent.value,o),y=k.firstHalf+e.value+k.secondHalf;return{allBlocks:[...s.slice(0,c),{id:l,version:v+1,content:{textContent:{type:f.textContent.type,value:y}}},...s.slice(c+1)],focus:u,updateVersion:C=>C+1}}})}case a.range!=null:{console.log("Not handled");break}default:console.log("Unhandled focus case ",a)}return t}}}function ge(i){const{moveCursorLeft:e}=i;return{isHandler:()=>e!=null,applyChange:t=>{const{blockId:n,cursor:a}=t.editorData.focus.localized,{steps:l}=e;return O({blockId:n,uiArticle:t,updateBlocks:({block:o,allBlocks:r,blockIndex:s,focus:c})=>!c.localized||!o.content.textContent?(console.log("Not supported case , should be removed by end"),{allBlocks:r,focus:c,updateVersion:g.identity}):c.localized.cursor-1<-o.content.textContent.value.length?s>0?{allBlocks:r,focus:{localized:{blockId:r[s-1].id,cursor:0},range:void 0},updateVersion:g.identity}:{allBlocks:r,focus:c,updateVersion:g.identity}:{allBlocks:r,focus:{localized:{blockId:n,cursor:g.max([c.localized.cursor-l,-o.content.textContent.value.length])},range:void 0},updateVersion:g.identity}})}}}function ve(i){const{moveCursorRight:e}=i;return{isHandler:()=>e!=null,applyChange:t=>{const{blockId:n,cursor:a}=t.editorData.focus.localized,{steps:l}=e;return O({blockId:n,uiArticle:t,updateBlocks:({block:o,allBlocks:r,blockIndex:s,focus:c})=>!c.localized||!o.content.textContent?(console.log("Not supported case , should be removed by end"),{allBlocks:r,focus:c,updateVersion:g.identity}):c.localized.cursor<0?{allBlocks:r,focus:{localized:{blockId:n,cursor:g.min([a+l,0])},range:void 0},updateVersion:g.identity}:s<r.length-1?{allBlocks:r,focus:{localized:{blockId:r[s+1].id,cursor:-r[s+1].content.textContent.value.length},range:void 0},updateVersion:g.identity}:{allBlocks:r,focus:c,updateVersion:g.identity}})}}}function ke(i){const{redo:e}=i;return{isHandler:()=>e!=null,applyChange:t=>{const{steps:n}=e,{editorData:a,history:{index:l,momento:o}}=t,r=g.min([o.length-1,l+n]);return{editorData:o[r],history:{index:r,momento:o}}}}}function ye(i){const{undo:e}=i;return{isHandler:()=>e!=null,applyChange:t=>{const{steps:n}=e,{editorData:a,history:{index:l,momento:o}}=t,r=g.max([l-n,0]);return{editorData:o[r],history:{index:r,momento:o}}}}}const Ce=[be,_e,ge,ve,he,ye,ke],we=30,xe=(i,e=$e)=>{const t=new ie,n=new le(i);t.pipe(se((l,o)=>e(l,o),i)).subscribe(n);const a=l=>t.next(l);return{uiArticleObservable:n,getUIArticle:n.getValue,uiArticleReadable:re(i,l=>{const o=n.pipe(ae(1e3/we)).subscribe({next:l});return()=>o.unsubscribe()}),dispatch:a}},$e=(i,e)=>e.operations.reduce((n,a)=>{for(let l of Ce){const o=l(a);if(o.isHandler())return o.applyChange(n)}return console.log("No handler found for operation",a),n},i),G=new oe({length:10});var R=(i=>(i[i.TITLE=0]="TITLE",i[i.PARAGRAPH=1]="PARAGRAPH",i[i.BLOCKQUOTE=2]="BLOCKQUOTE",i[i.UNRECOGNIZED=-1]="UNRECOGNIZED",i))(R||{}),M=(()=>{if(typeof M!="undefined")return M;if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw"Unable to locate global object"})();B.util.Long!==Z&&(B.util.Long=Z,B.configure());function qe(i){return{insertText(e){i({operations:[{insertText:{value:e}}]})},backspace(){i({operations:[{backspace:{}}]})},moveCursorRight(e=1){i({operations:[{moveCursorRight:{steps:e}}]})},moveCursorLeft(e=1){i({operations:[{moveCursorLeft:{steps:e}}]})},undo(e){i({operations:[{undo:{steps:e}}]})},redo(e){i({operations:[{redo:{steps:e}}]})},carriageReturn(){i({operations:[{carriageReturn:{}}]})}}}let Pe=()=>{const i={article:{id:G(),version:0,blocks:[{id:"1",version:0,content:{textContent:{type:R.TITLE,value:"Lorem Ipsum"}}},{id:2,version:0,content:{textContent:{type:R.PARAGRAPH,value:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}}},{id:G(),version:0,content:{textContent:{type:R.PARAGRAPH,value:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"}}}],authorId:""},focus:{localized:{blockId:"1",cursor:0}}};return{editorData:i,history:{index:0,momento:[i]}}};function Ae(i){return e=>{var t=e.key;switch(!0){case(e.metaKey&&!e.shiftKey&&e.key.toLowerCase()=="z"):{i.undo(5),e.preventDefault();return}case(e.metaKey&&e.shiftKey&&e.key.toLowerCase()=="z"):{i.redo(5),e.preventDefault();return}}switch(!0){case t.length==1:{i.insertText(t),e.preventDefault();break}case t=="Backspace":{i.backspace(),e.preventDefault();break}case t=="ArrowLeft":{i.moveCursorLeft(1),e.preventDefault();break}case t=="ArrowRight":{i.moveCursorRight(1),e.preventDefault();break}case t=="Enter":{i.carriageReturn(),e.preventDefault();break}}}}function He(i){let e;return{c(){e=x("span"),this.h()},l(t){e=$(t,"SPAN",{class:!0}),q(e).forEach(d),this.h()},h(){w(e,"class","caret  svelte-16nu1js")},m(t,n){_(t,e,n)},p:S,i:S,o:S,d(t){t&&d(e)}}}class ne extends I{constructor(e){super();z(this,e,null,He,L,{})}}function De(i){let e;return{c(){e=U(i[0])},l(t){e=K(t,i[0])},m(t,n){_(t,e,n)},p(t,n){n&1&&T(e,t[0])},i:S,o:S,d(t){t&&d(e)}}}function Ee(i){let e,t,n,a;const l=[Se,Re],o=[];function r(s,c){return s[2]==0?0:1}return e=r(i),t=o[e]=l[e](i),{c(){t.c(),n=b()},l(s){t.l(s),n=b()},m(s,c){o[e].m(s,c),_(s,n,c),a=!0},p(s,c){let u=e;e=r(s),e===u?o[e].p(s,c):(N(),h(o[u],1,1,()=>{o[u]=null}),V(),t=o[e],t?t.p(s,c):(t=o[e]=l[e](s),t.c()),p(t,1),t.m(n.parentNode,n))},i(s){a||(p(t),a=!0)},o(s){h(t),a=!1},d(s){o[e].d(s),s&&d(n)}}}function Re(i){let e=i[0].slice(0,i[2])+"",t,n,a=i[0].slice(i[2])+"",l,o;return n=new ne({}),{c(){t=U(e),P(n.$$.fragment),l=U(a)},l(r){t=K(r,e),A(n.$$.fragment,r),l=K(r,a)},m(r,s){_(r,t,s),H(n,r,s),_(r,l,s),o=!0},p(r,s){(!o||s&5)&&e!==(e=r[0].slice(0,r[2])+"")&&T(t,e),(!o||s&5)&&a!==(a=r[0].slice(r[2])+"")&&T(l,a)},i(r){o||(p(n.$$.fragment,r),o=!0)},o(r){h(n.$$.fragment,r),o=!1},d(r){r&&d(t),D(n,r),r&&d(l)}}}function Se(i){let e,t,n;return t=new ne({}),{c(){e=U(i[0]),P(t.$$.fragment)},l(a){e=K(a,i[0]),A(t.$$.fragment,a)},m(a,l){_(a,e,l),H(t,a,l),n=!0},p(a,l){(!n||l&1)&&T(e,a[0])},i(a){n||(p(t.$$.fragment,a),n=!0)},o(a){h(t.$$.fragment,a),n=!1},d(a){a&&d(e),D(t,a)}}}function Ie(i){let e,t,n,a;const l=[Ee,De],o=[];function r(s,c){return s[1]?0:1}return e=r(i),t=o[e]=l[e](i),{c(){t.c(),n=b()},l(s){t.l(s),n=b()},m(s,c){o[e].m(s,c),_(s,n,c),a=!0},p(s,[c]){let u=e;e=r(s),e===u?o[e].p(s,c):(N(),h(o[u],1,1,()=>{o[u]=null}),V(),t=o[e],t?t.p(s,c):(t=o[e]=l[e](s),t.c()),p(t,1),t.m(n.parentNode,n))},i(s){a||(p(t),a=!0)},o(s){h(t),a=!1},d(s){o[e].d(s),s&&d(n)}}}function ze(i,e,t){let{text:n}=e,{isSelected:a}=e,{cursorPosition:l}=e;return i.$$set=o=>{"text"in o&&t(0,n=o.text),"isSelected"in o&&t(1,a=o.isSelected),"cursorPosition"in o&&t(2,l=o.cursorPosition)},[n,a,l]}class Q extends I{constructor(e){super();z(this,e,ze,Ie,L,{text:0,isSelected:1,cursorPosition:2})}}function Le(i){let e,t,n,a,l=!i[1]&&J();return n=new Q({props:{cursorPosition:i[3],isSelected:i[2],text:i[1]}}),{c(){e=x("blockquote"),l&&l.c(),t=b(),P(n.$$.fragment),this.h()},l(o){e=$(o,"BLOCKQUOTE",{class:!0});var r=q(e);l&&l.l(r),t=b(),A(n.$$.fragment,r),r.forEach(d),this.h()},h(){w(e,"class","outline-none whitespace-pre-wrap")},m(o,r){_(o,e,r),l&&l.m(e,null),j(e,t),H(n,e,null),a=!0},p(o,r){o[1]?l&&(l.d(1),l=null):l||(l=J(),l.c(),l.m(e,t));const s={};r&8&&(s.cursorPosition=o[3]),r&4&&(s.isSelected=o[2]),r&2&&(s.text=o[1]),n.$set(s)},i(o){a||(p(n.$$.fragment,o),a=!0)},o(o){h(n.$$.fragment,o),a=!1},d(o){o&&d(e),l&&l.d(),D(n)}}}function Ne(i){let e,t,n,a,l=!i[1]&&W();return n=new Q({props:{cursorPosition:i[3],isSelected:i[2],text:i[1]}}),{c(){e=x("p"),l&&l.c(),t=b(),P(n.$$.fragment),this.h()},l(o){e=$(o,"P",{class:!0});var r=q(e);l&&l.l(r),t=b(),A(n.$$.fragment,r),r.forEach(d),this.h()},h(){w(e,"class","outline-none whitespace-pre-wrap")},m(o,r){_(o,e,r),l&&l.m(e,null),j(e,t),H(n,e,null),a=!0},p(o,r){o[1]?l&&(l.d(1),l=null):l||(l=W(),l.c(),l.m(e,t));const s={};r&8&&(s.cursorPosition=o[3]),r&4&&(s.isSelected=o[2]),r&2&&(s.text=o[1]),n.$set(s)},i(o){a||(p(n.$$.fragment,o),a=!0)},o(o){h(n.$$.fragment,o),a=!1},d(o){o&&d(e),l&&l.d(),D(n)}}}function Ve(i){let e,t,n,a,l,o=!i[1]&&X();return n=new Q({props:{cursorPosition:i[3],isSelected:i[2],text:i[1]}}),{c(){e=x("h1"),o&&o.c(),t=b(),P(n.$$.fragment),this.h()},l(r){e=$(r,"H1",{placeholder:!0,class:!0});var s=q(e);o&&o.l(s),t=b(),A(n.$$.fragment,s),s.forEach(d),this.h()},h(){w(e,"placeholder","Title"),w(e,"class",a=`${i[0]==0&&i[5]?"before:content-[attr(placeholder)] relative before:absolute before:text-medium-gray":""} outline-none whitespace-pre-wrap`)},m(r,s){_(r,e,s),o&&o.m(e,null),j(e,t),H(n,e,null),l=!0},p(r,s){r[1]?o&&(o.d(1),o=null):o||(o=X(),o.c(),o.m(e,t));const c={};s&8&&(c.cursorPosition=r[3]),s&4&&(c.isSelected=r[2]),s&2&&(c.text=r[1]),n.$set(c),(!l||s&33&&a!==(a=`${r[0]==0&&r[5]?"before:content-[attr(placeholder)] relative before:absolute before:text-medium-gray":""} outline-none whitespace-pre-wrap`))&&w(e,"class",a)},i(r){l||(p(n.$$.fragment,r),l=!0)},o(r){h(n.$$.fragment,r),l=!1},d(r){r&&d(e),o&&o.d(),D(n)}}}function J(i){let e;return{c(){e=x("span"),this.h()},l(t){e=$(t,"SPAN",{class:!0}),q(e).forEach(d),this.h()},h(){w(e,"class","inline-block")},m(t,n){_(t,e,n)},d(t){t&&d(e)}}}function W(i){let e;return{c(){e=x("span"),this.h()},l(t){e=$(t,"SPAN",{class:!0}),q(e).forEach(d),this.h()},h(){w(e,"class","inline-block")},m(t,n){_(t,e,n)},d(t){t&&d(e)}}}function X(i){let e;return{c(){e=x("span"),this.h()},l(t){e=$(t,"SPAN",{class:!0}),q(e).forEach(d),this.h()},h(){w(e,"class","inline-block")},m(t,n){_(t,e,n)},d(t){t&&d(e)}}}function Oe(i){let e,t,n,a;const l=[Ve,Ne,Le],o=[];function r(s,c){return R.TITLE==s[4]?0:R.PARAGRAPH==s[4]?1:R.BLOCKQUOTE==s[4]?2:-1}return~(e=r(i))&&(t=o[e]=l[e](i)),{c(){t&&t.c(),n=b()},l(s){t&&t.l(s),n=b()},m(s,c){~e&&o[e].m(s,c),_(s,n,c),a=!0},p(s,[c]){let u=e;e=r(s),e===u?~e&&o[e].p(s,c):(t&&(N(),h(o[u],1,1,()=>{o[u]=null}),V()),~e?(t=o[e],t?t.p(s,c):(t=o[e]=l[e](s),t.c()),p(t,1),t.m(n.parentNode,n)):t=null)},i(s){a||(p(t),a=!0)},o(s){h(t),a=!1},d(s){~e&&o[e].d(s),s&&d(n)}}}function Ue(i,e,t){let n,{index:a}=e,{text:l}=e,{isSelected:o}=e,{cursorPosition:r}=e,{type:s}=e;return i.$$set=c=>{"index"in c&&t(0,a=c.index),"text"in c&&t(1,l=c.text),"isSelected"in c&&t(2,o=c.isSelected),"cursorPosition"in c&&t(3,r=c.cursorPosition),"type"in c&&t(4,s=c.type)},i.$$.update=()=>{i.$$.dirty&2&&t(5,n=g.isEmpty(l))},[a,l,o,r,s,n]}class Ke extends I{constructor(e){super();z(this,e,Ue,Oe,L,{index:0,text:1,isSelected:2,cursorPosition:3,type:4})}}function Y(i,e,t){const n=i.slice();return n[7]=e[t],n[9]=t,n}function ee(i){var n,a,l,o;let e,t;return e=new Ke({props:{index:i[9],type:i[7].content.textContent.type,text:i[7].content.textContent.value,isSelected:i[7].id==((a=(n=i[0].focus)==null?void 0:n.localized)==null?void 0:a.blockId),cursorPosition:(o=(l=i[0].focus)==null?void 0:l.localized)==null?void 0:o.cursor}}),{c(){P(e.$$.fragment)},l(r){A(e.$$.fragment,r)},m(r,s){H(e,r,s),t=!0},p(r,s){var u,f,v,k;const c={};s&1&&(c.index=r[9]),s&1&&(c.type=r[7].content.textContent.type),s&1&&(c.text=r[7].content.textContent.value),s&1&&(c.isSelected=r[7].id==((f=(u=r[0].focus)==null?void 0:u.localized)==null?void 0:f.blockId)),s&1&&(c.cursorPosition=(k=(v=r[0].focus)==null?void 0:v.localized)==null?void 0:k.cursor),e.$set(c)},i(r){t||(p(e.$$.fragment,r),t=!0)},o(r){h(e.$$.fragment,r),t=!1},d(r){D(e,r)}}}function te(i,e){let t,n,a,l=e[7].content.textContent!=null&&ee(e);return{key:i,first:null,c(){t=b(),l&&l.c(),n=b(),this.h()},l(o){t=b(),l&&l.l(o),n=b(),this.h()},h(){this.first=t},m(o,r){_(o,t,r),l&&l.m(o,r),_(o,n,r),a=!0},p(o,r){e=o,e[7].content.textContent!=null?l?(l.p(e,r),r&1&&p(l,1)):(l=ee(e),l.c(),p(l,1),l.m(n.parentNode,n)):l&&(N(),h(l,1,1,()=>{l=null}),V())},i(o){a||(p(l),a=!0)},o(o){h(l),a=!1},d(o){o&&d(t),l&&l.d(o),o&&d(n)}}}function Te(i){let e,t=[],n=new Map,a,l,o,r=i[0].article.blocks;const s=c=>c[7].id;for(let c=0;c<r.length;c+=1){let u=Y(i,r,c),f=s(u);n.set(f,t[c]=te(f,u))}return{c(){e=x("div");for(let c=0;c<t.length;c+=1)t[c].c();this.h()},l(c){e=$(c,"DIV",{contenteditable:!0});var u=q(e);for(let f=0;f<t.length;f+=1)t[f].l(u);u.forEach(d),this.h()},h(){w(e,"contenteditable","")},m(c,u){_(c,e,u);for(let f=0;f<t.length;f+=1)t[f].m(e,null);a=!0,l||(o=ce(e,"keydown",i[4]),l=!0)},p(c,[u]){u&1&&(r=c[0].article.blocks,N(),t=ue(t,u,s,1,c,r,n,e,de,te,null,Y),V())},i(c){if(!a){for(let u=0;u<r.length;u+=1)p(t[u]);a=!0}},o(c){for(let u=0;u<t.length;u+=1)h(t[u]);a=!1},d(c){c&&d(e);for(let u=0;u<t.length;u+=1)t[u].d();l=!1,o()}}}function Be(i,e,t){let n,a;const l=xe(Pe()),o=qe(l.dispatch),r=l.uiArticleReadable;fe(i,r,u=>t(3,a=u));const s=Ae(o),c=u=>s(u);return i.$$.update=()=>{i.$$.dirty&8&&t(0,n=a.editorData)},[n,r,s,a,c]}class Ge extends I{constructor(e){super();z(this,e,Be,Te,L,{})}}function je(i){let e,t;return e=new Ge({}),{c(){P(e.$$.fragment)},l(n){A(e.$$.fragment,n)},m(n,a){H(e,n,a),t=!0},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){h(e.$$.fragment,n),t=!1},d(n){D(e,n)}}}function Fe(i){let e,t;return e=new me({props:{$$slots:{default:[je]},$$scope:{ctx:i}}}),{c(){P(e.$$.fragment)},l(n){A(e.$$.fragment,n)},m(n,a){H(e,n,a),t=!0},p(n,[a]){const l={};a&1&&(l.$$scope={dirty:a,ctx:n}),e.$set(l)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){h(e.$$.fragment,n),t=!1},d(n){D(e,n)}}}class Ye extends I{constructor(e){super();z(this,e,null,Fe,L,{})}}export{Ye as default};
