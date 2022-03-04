import{a1 as g,a4 as oe,a5 as re,N as ie,a6 as le,a7 as se,a8 as ae,a9 as G,aa as M,S as D,i as N,s as L,e as x,c as q,a as $,d,b as w,g as _,I,l as b,n as V,o as h,p as U,q as p,t as T,h as K,j as B,w as P,x as A,y as E,B as H,H as z,k as ce,m as ue,ab as fe,_ as de,v as me,ac as pe}from"../../chunks/vendor-31a8d0de.js";import{B as _e}from"../../chunks/BlogPage-f13583f7.js";import"../../chunks/StandardTopBar-18167fd0.js";import"../../chunks/AuthService-1268c3b6.js";import"../../chunks/preload-helper-ec9aa979.js";import"../../chunks/singletons-d1fb5791.js";function j(i,e){return e==0?{firstHalf:i,secondHalf:""}:{firstHalf:i.slice(0,e),secondHalf:i.slice(e)}}function he(i){const{blockId:e,uiArticle:t}=i,n=t.editorData.article.blocks.findIndex(a=>e==a.id);return{blockIndex:n,block:n<0?void 0:t.editorData.article.blocks[n]}}function O(i){const{blockId:e,uiArticle:t,updateBlocks:n}=i,{block:a,blockIndex:l}=he({uiArticle:t,blockId:e});if(l<0)return console.log("block with id ",e," not found"),t;const{editorData:{article:{id:o,version:r,blocks:s,authorId:c},focus:u},history:{index:f,momento:v}}=t,k=n({block:a,allBlocks:s,blockIndex:l,focus:u}),y=k.updateVersion(r),C={article:{id:o,version:y,blocks:k.allBlocks,authorId:c},focus:k.focus},m=y!=r?[...v.slice(g.max([0,v.length-1e3]),f+1),C]:v,R=y!=r?f+1:f;return{editorData:C,history:{index:R,momento:m}}}function be(i){const{backspace:e}=i;return{isHandler:()=>e!=null,applyChange:t=>{const{editorData:{focus:{localized:n,range:a},article:l}}=t;if(!n)return t;const{blockId:o,cursor:r}=n;return O({blockId:o,uiArticle:t,updateBlocks:({block:s,allBlocks:c,blockIndex:u,focus:f})=>{if(!s.content.textContent)return console.log("Not handled delete if not text content"),{allBlocks:c,focus:f,updateVersion:m=>m+1};const{type:v,value:k}=s.content.textContent,{firstHalf:y,secondHalf:C}=j(k,r);if(y.length>0)return{focus:f,allBlocks:[...c.slice(0,u),{id:o,version:s.version+1,content:{textContent:{type:v,value:y.slice(0,y.length-1)+C}}},...c.slice(u+1)],updateVersion:m=>m+1};if(u==0)return{allBlocks:c,focus:f,updateVersion:m=>m+1};if(c[u-1].content.textContent){const m=c[u-1];return{focus:{localized:{cursor:r,blockId:m.id},range:void 0},allBlocks:[...c.slice(0,u-1),{id:m.id,version:m.version+1,content:{textContent:{type:m.content.textContent.type,value:m.content.textContent.value+s.content.textContent.value}}},...c.slice(u+1)],updateVersion:R=>R+1}}else return{focus:f,allBlocks:[...c.slice(0,u-1),...c.slice(u)],updateVersion:m=>m+1}}})}}}function ge(i){const{carriageReturn:e}=i;return{isHandler:()=>e!=null,applyChange:t=>{const{editorData:{focus:{localized:n,range:a},article:l}}=t;if(!n)return t;const{blockId:o,cursor:r}=n;return O({blockId:o,uiArticle:t,updateBlocks:({block:s,allBlocks:c,blockIndex:u,focus:f})=>{if(!s.content.textContent)return console.log("Not handled delete if not text content"),{allBlocks:c,focus:f,updateVersion:R=>R+1};const{type:v,value:k}=s.content.textContent,{firstHalf:y,secondHalf:C}=j(k,r);console.log({firstHalf:y,secondHalf:C});const m=F();return{focus:{localized:{blockId:m,cursor:-C.length},range:void 0},allBlocks:[...c.slice(0,u),{id:o,version:s.version+1,content:{textContent:{type:v,value:y}}},{id:m,version:0,content:{textContent:{type:v,value:C}}},...c.slice(u+1)],updateVersion:R=>R+1}}})}}}function ve(i){const{insertText:e}=i;return{isHandler:()=>e!=null,applyChange:t=>{const{editorData:{article:n,focus:a}}=t;switch(!0){case a.localized!=null:{const{blockId:l,cursor:o}=a.localized;return O({blockId:l,uiArticle:t,updateBlocks:({block:r,allBlocks:s,blockIndex:c,focus:u})=>{const{content:f,version:v}=r;if(f.textContent==null)return{allBlocks:s,focus:u,updateVersion:C=>C+1};const k=j(f.textContent.value,o),y=k.firstHalf+e.value+k.secondHalf;return{allBlocks:[...s.slice(0,c),{id:l,version:v+1,content:{textContent:{type:f.textContent.type,value:y}}},...s.slice(c+1)],focus:u,updateVersion:C=>C+1}}})}case a.range!=null:{console.log("Not handled");break}default:console.log("Unhandled focus case ",a)}return t}}}function ke(i){const{moveCursorLeft:e}=i;return{isHandler:()=>e!=null,applyChange:t=>{const{blockId:n,cursor:a}=t.editorData.focus.localized,{steps:l}=e;return O({blockId:n,uiArticle:t,updateBlocks:({block:o,allBlocks:r,blockIndex:s,focus:c})=>!c.localized||!o.content.textContent?(console.log("Not supported case , should be removed by end"),{allBlocks:r,focus:c,updateVersion:g.identity}):c.localized.cursor-1<-o.content.textContent.value.length?s>0?{allBlocks:r,focus:{localized:{blockId:r[s-1].id,cursor:0},range:void 0},updateVersion:g.identity}:{allBlocks:r,focus:c,updateVersion:g.identity}:{allBlocks:r,focus:{localized:{blockId:n,cursor:g.max([c.localized.cursor-l,-o.content.textContent.value.length])},range:void 0},updateVersion:g.identity}})}}}function ye(i){const{moveCursorRight:e}=i;return{isHandler:()=>e!=null,applyChange:t=>{const{blockId:n,cursor:a}=t.editorData.focus.localized,{steps:l}=e;return O({blockId:n,uiArticle:t,updateBlocks:({block:o,allBlocks:r,blockIndex:s,focus:c})=>!c.localized||!o.content.textContent?(console.log("Not supported case , should be removed by end"),{allBlocks:r,focus:c,updateVersion:g.identity}):c.localized.cursor<0?{allBlocks:r,focus:{localized:{blockId:n,cursor:g.min([a+l,0])},range:void 0},updateVersion:g.identity}:s<r.length-1?{allBlocks:r,focus:{localized:{blockId:r[s+1].id,cursor:-r[s+1].content.textContent.value.length},range:void 0},updateVersion:g.identity}:{allBlocks:r,focus:c,updateVersion:g.identity}})}}}function Ce(i){const{redo:e}=i;return{isHandler:()=>e!=null,applyChange:t=>{const{steps:n}=e,{editorData:a,history:{index:l,momento:o}}=t,r=g.min([o.length-1,l+n]);return{editorData:o[r],history:{index:r,momento:o}}}}}function we(i){const{undo:e}=i;return{isHandler:()=>e!=null,applyChange:t=>{const{steps:n}=e,{editorData:a,history:{index:l,momento:o}}=t,r=g.max([l-n,0]);return{editorData:o[r],history:{index:r,momento:o}}}}}const xe=[ve,be,ke,ye,ge,we,Ce],qe=30,$e=(i,e=Pe)=>{const t=new ie,n=new le(i);t.pipe(se((l,o)=>e(l,o),i)).subscribe(n);const a=l=>t.next(l);return{uiArticleObservable:n,getUIArticle:n.getValue,uiArticleReadable:re(i,l=>{const o=n.pipe(ae(1e3/qe)).subscribe({next:l});return()=>o.unsubscribe()}),dispatch:a}},Pe=(i,e)=>e.operations.reduce((n,a)=>{for(let l of xe){const o=l(a);if(o.isHandler())return o.applyChange(n)}return console.log("No handler found for operation",a),n},i),F=new oe({length:10});var S=(i=>(i[i.TITLE=0]="TITLE",i[i.PARAGRAPH=1]="PARAGRAPH",i[i.BLOCKQUOTE=2]="BLOCKQUOTE",i[i.UNRECOGNIZED=-1]="UNRECOGNIZED",i))(S||{}),Z=(()=>{if(typeof Z!="undefined")return Z;if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw"Unable to locate global object"})();G.util.Long!==M&&(G.util.Long=M,G.configure());function Ae(i){return{insertText(e){i({operations:[{insertText:{value:e}}]})},backspace(){i({operations:[{backspace:{}}]})},moveCursorRight(e=1){i({operations:[{moveCursorRight:{steps:e}}]})},moveCursorLeft(e=1){i({operations:[{moveCursorLeft:{steps:e}}]})},undo(e){i({operations:[{undo:{steps:e}}]})},redo(e){i({operations:[{redo:{steps:e}}]})},carriageReturn(){i({operations:[{carriageReturn:{}}]})}}}let Ee=()=>{const i={article:{id:F(),version:0,blocks:[{id:"1",version:0,content:{textContent:{type:S.TITLE,value:"Lorem Ipsum"}}},{id:2,version:0,content:{textContent:{type:S.PARAGRAPH,value:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}}},{id:F(),version:0,content:{textContent:{type:S.PARAGRAPH,value:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"}}}],authorId:""},focus:{localized:{blockId:"1",cursor:0}}};return{editorData:i,history:{index:0,momento:[i]}}};function He(i,e){return i.onkeydown=t=>{var n=t.key;switch(t.preventDefault(),!0){case(t.metaKey&&!t.shiftKey&&t.key.toLowerCase()=="z"):{e.undo(5);return}case(t.metaKey&&t.shiftKey&&t.key.toLowerCase()=="z"):{e.redo(5);return}}switch(!0){case n.length==1:{e.insertText(n);break}case n=="Backspace":{e.backspace();break}case n=="ArrowLeft":{e.moveCursorLeft(1);break}case n=="ArrowRight":{e.moveCursorRight(1);break}case n=="Enter":{e.carriageReturn();break}}},()=>{i.onkeydown=null}}function Re(i){let e;return{c(){e=x("span"),this.h()},l(t){e=q(t,"SPAN",{class:!0}),$(e).forEach(d),this.h()},h(){w(e,"class","relative")},m(t,n){_(t,e,n)},p:I,i:I,o:I,d(t){t&&d(e)}}}class ne extends D{constructor(e){super();N(this,e,null,Re,L,{})}}function Se(i){let e;return{c(){e=T(i[0])},l(t){e=K(t,i[0])},m(t,n){_(t,e,n)},p(t,n){n&1&&B(e,t[0])},i:I,o:I,d(t){t&&d(e)}}}function Ie(i){let e,t,n,a;const l=[De,ze],o=[];function r(s,c){return s[2]==0?0:1}return e=r(i),t=o[e]=l[e](i),{c(){t.c(),n=b()},l(s){t.l(s),n=b()},m(s,c){o[e].m(s,c),_(s,n,c),a=!0},p(s,c){let u=e;e=r(s),e===u?o[e].p(s,c):(V(),h(o[u],1,1,()=>{o[u]=null}),U(),t=o[e],t?t.p(s,c):(t=o[e]=l[e](s),t.c()),p(t,1),t.m(n.parentNode,n))},i(s){a||(p(t),a=!0)},o(s){h(t),a=!1},d(s){o[e].d(s),s&&d(n)}}}function ze(i){let e=i[0].slice(0,i[2])+"",t,n,a=i[0].slice(i[2])+"",l,o;return n=new ne({}),{c(){t=T(e),P(n.$$.fragment),l=T(a)},l(r){t=K(r,e),A(n.$$.fragment,r),l=K(r,a)},m(r,s){_(r,t,s),E(n,r,s),_(r,l,s),o=!0},p(r,s){(!o||s&5)&&e!==(e=r[0].slice(0,r[2])+"")&&B(t,e),(!o||s&5)&&a!==(a=r[0].slice(r[2])+"")&&B(l,a)},i(r){o||(p(n.$$.fragment,r),o=!0)},o(r){h(n.$$.fragment,r),o=!1},d(r){r&&d(t),H(n,r),r&&d(l)}}}function De(i){let e,t,n;return t=new ne({}),{c(){e=T(i[0]),P(t.$$.fragment)},l(a){e=K(a,i[0]),A(t.$$.fragment,a)},m(a,l){_(a,e,l),E(t,a,l),n=!0},p(a,l){(!n||l&1)&&B(e,a[0])},i(a){n||(p(t.$$.fragment,a),n=!0)},o(a){h(t.$$.fragment,a),n=!1},d(a){a&&d(e),H(t,a)}}}function Ne(i){let e,t,n,a;const l=[Ie,Se],o=[];function r(s,c){return s[1]?0:1}return e=r(i),t=o[e]=l[e](i),{c(){t.c(),n=b()},l(s){t.l(s),n=b()},m(s,c){o[e].m(s,c),_(s,n,c),a=!0},p(s,[c]){let u=e;e=r(s),e===u?o[e].p(s,c):(V(),h(o[u],1,1,()=>{o[u]=null}),U(),t=o[e],t?t.p(s,c):(t=o[e]=l[e](s),t.c()),p(t,1),t.m(n.parentNode,n))},i(s){a||(p(t),a=!0)},o(s){h(t),a=!1},d(s){o[e].d(s),s&&d(n)}}}function Le(i,e,t){let{text:n}=e,{isSelected:a}=e,{cursorPosition:l}=e;return i.$$set=o=>{"text"in o&&t(0,n=o.text),"isSelected"in o&&t(1,a=o.isSelected),"cursorPosition"in o&&t(2,l=o.cursorPosition)},[n,a,l]}class Q extends D{constructor(e){super();N(this,e,Le,Ne,L,{text:0,isSelected:1,cursorPosition:2})}}function Ve(i){let e,t,n,a,l=!i[1]&&J();return n=new Q({props:{cursorPosition:i[3],isSelected:i[2],text:i[1]}}),{c(){e=x("blockquote"),l&&l.c(),t=b(),P(n.$$.fragment),this.h()},l(o){e=q(o,"BLOCKQUOTE",{class:!0});var r=$(e);l&&l.l(r),t=b(),A(n.$$.fragment,r),r.forEach(d),this.h()},h(){w(e,"class","outline-none whitespace-pre-wrap")},m(o,r){_(o,e,r),l&&l.m(e,null),z(e,t),E(n,e,null),a=!0},p(o,r){o[1]?l&&(l.d(1),l=null):l||(l=J(),l.c(),l.m(e,t));const s={};r&8&&(s.cursorPosition=o[3]),r&4&&(s.isSelected=o[2]),r&2&&(s.text=o[1]),n.$set(s)},i(o){a||(p(n.$$.fragment,o),a=!0)},o(o){h(n.$$.fragment,o),a=!1},d(o){o&&d(e),l&&l.d(),H(n)}}}function Ue(i){let e,t,n,a,l=!i[1]&&W();return n=new Q({props:{cursorPosition:i[3],isSelected:i[2],text:i[1]}}),{c(){e=x("p"),l&&l.c(),t=b(),P(n.$$.fragment),this.h()},l(o){e=q(o,"P",{class:!0});var r=$(e);l&&l.l(r),t=b(),A(n.$$.fragment,r),r.forEach(d),this.h()},h(){w(e,"class","outline-none whitespace-pre-wrap")},m(o,r){_(o,e,r),l&&l.m(e,null),z(e,t),E(n,e,null),a=!0},p(o,r){o[1]?l&&(l.d(1),l=null):l||(l=W(),l.c(),l.m(e,t));const s={};r&8&&(s.cursorPosition=o[3]),r&4&&(s.isSelected=o[2]),r&2&&(s.text=o[1]),n.$set(s)},i(o){a||(p(n.$$.fragment,o),a=!0)},o(o){h(n.$$.fragment,o),a=!1},d(o){o&&d(e),l&&l.d(),H(n)}}}function Oe(i){let e,t,n,a,l,o=!i[1]&&X();return n=new Q({props:{cursorPosition:i[3],isSelected:i[2],text:i[1]}}),{c(){e=x("h1"),o&&o.c(),t=b(),P(n.$$.fragment),this.h()},l(r){e=q(r,"H1",{placeholder:!0,class:!0});var s=$(e);o&&o.l(s),t=b(),A(n.$$.fragment,s),s.forEach(d),this.h()},h(){w(e,"placeholder","Title"),w(e,"class",a=`${i[0]==0&&i[5]?"before:content-[attr(placeholder)] relative before:absolute before:text-medium-gray":""} outline-none whitespace-pre-wrap`)},m(r,s){_(r,e,s),o&&o.m(e,null),z(e,t),E(n,e,null),l=!0},p(r,s){r[1]?o&&(o.d(1),o=null):o||(o=X(),o.c(),o.m(e,t));const c={};s&8&&(c.cursorPosition=r[3]),s&4&&(c.isSelected=r[2]),s&2&&(c.text=r[1]),n.$set(c),(!l||s&33&&a!==(a=`${r[0]==0&&r[5]?"before:content-[attr(placeholder)] relative before:absolute before:text-medium-gray":""} outline-none whitespace-pre-wrap`))&&w(e,"class",a)},i(r){l||(p(n.$$.fragment,r),l=!0)},o(r){h(n.$$.fragment,r),l=!1},d(r){r&&d(e),o&&o.d(),H(n)}}}function J(i){let e;return{c(){e=x("span"),this.h()},l(t){e=q(t,"SPAN",{class:!0}),$(e).forEach(d),this.h()},h(){w(e,"class","inline-block")},m(t,n){_(t,e,n)},d(t){t&&d(e)}}}function W(i){let e;return{c(){e=x("span"),this.h()},l(t){e=q(t,"SPAN",{class:!0}),$(e).forEach(d),this.h()},h(){w(e,"class","inline-block")},m(t,n){_(t,e,n)},d(t){t&&d(e)}}}function X(i){let e;return{c(){e=x("span"),this.h()},l(t){e=q(t,"SPAN",{class:!0}),$(e).forEach(d),this.h()},h(){w(e,"class","inline-block")},m(t,n){_(t,e,n)},d(t){t&&d(e)}}}function Te(i){let e,t,n,a;const l=[Oe,Ue,Ve],o=[];function r(s,c){return S.TITLE==s[4]?0:S.PARAGRAPH==s[4]?1:S.BLOCKQUOTE==s[4]?2:-1}return~(e=r(i))&&(t=o[e]=l[e](i)),{c(){t&&t.c(),n=b()},l(s){t&&t.l(s),n=b()},m(s,c){~e&&o[e].m(s,c),_(s,n,c),a=!0},p(s,[c]){let u=e;e=r(s),e===u?~e&&o[e].p(s,c):(t&&(V(),h(o[u],1,1,()=>{o[u]=null}),U()),~e?(t=o[e],t?t.p(s,c):(t=o[e]=l[e](s),t.c()),p(t,1),t.m(n.parentNode,n)):t=null)},i(s){a||(p(t),a=!0)},o(s){h(t),a=!1},d(s){~e&&o[e].d(s),s&&d(n)}}}function Ke(i,e,t){let n,{index:a}=e,{text:l}=e,{isSelected:o}=e,{cursorPosition:r}=e,{type:s}=e;return i.$$set=c=>{"index"in c&&t(0,a=c.index),"text"in c&&t(1,l=c.text),"isSelected"in c&&t(2,o=c.isSelected),"cursorPosition"in c&&t(3,r=c.cursorPosition),"type"in c&&t(4,s=c.type)},i.$$.update=()=>{i.$$.dirty&2&&t(5,n=g.isEmpty(l))},[a,l,o,r,s,n]}class Be extends D{constructor(e){super();N(this,e,Ke,Te,L,{index:0,text:1,isSelected:2,cursorPosition:3,type:4})}}function Y(i,e,t){const n=i.slice();return n[5]=e[t],n[7]=t,n}function ee(i){var n,a,l,o;let e,t;return e=new Be({props:{index:i[7],type:i[5].content.textContent.type,text:i[5].content.textContent.value,isSelected:i[5].id==((a=(n=i[0].focus)==null?void 0:n.localized)==null?void 0:a.blockId),cursorPosition:(o=(l=i[0].focus)==null?void 0:l.localized)==null?void 0:o.cursor}}),{c(){P(e.$$.fragment)},l(r){A(e.$$.fragment,r)},m(r,s){E(e,r,s),t=!0},p(r,s){var u,f,v,k;const c={};s&1&&(c.index=r[7]),s&1&&(c.type=r[5].content.textContent.type),s&1&&(c.text=r[5].content.textContent.value),s&1&&(c.isSelected=r[5].id==((f=(u=r[0].focus)==null?void 0:u.localized)==null?void 0:f.blockId)),s&1&&(c.cursorPosition=(k=(v=r[0].focus)==null?void 0:v.localized)==null?void 0:k.cursor),e.$set(c)},i(r){t||(p(e.$$.fragment,r),t=!0)},o(r){h(e.$$.fragment,r),t=!1},d(r){H(e,r)}}}function te(i,e){let t,n,a,l=e[5].content.textContent!=null&&ee(e);return{key:i,first:null,c(){t=b(),l&&l.c(),n=b(),this.h()},l(o){t=b(),l&&l.l(o),n=b(),this.h()},h(){this.first=t},m(o,r){_(o,t,r),l&&l.m(o,r),_(o,n,r),a=!0},p(o,r){e=o,e[5].content.textContent!=null?l?(l.p(e,r),r&1&&p(l,1)):(l=ee(e),l.c(),p(l,1),l.m(n.parentNode,n)):l&&(V(),h(l,1,1,()=>{l=null}),U())},i(o){a||(p(l),a=!0)},o(o){h(l),a=!1},d(o){o&&d(t),l&&l.d(o),o&&d(n)}}}function Ge(i){let e,t,n,a=[],l=new Map,o,r=i[0].article.blocks;const s=c=>c[5].id;for(let c=0;c<r.length;c+=1){let u=Y(i,r,c),f=s(u);l.set(f,a[c]=te(f,u))}return{c(){e=x("div"),t=x("input"),n=ce();for(let c=0;c<a.length;c+=1)a[c].c();this.h()},l(c){e=q(c,"DIV",{class:!0});var u=$(e);t=q(u,"INPUT",{class:!0}),n=ue(u);for(let f=0;f<a.length;f+=1)a[f].l(u);u.forEach(d),this.h()},h(){w(t,"class","outline-none bg-bluelight"),w(e,"class","flex flex-col")},m(c,u){_(c,e,u),z(e,t),z(e,n);for(let f=0;f<a.length;f+=1)a[f].m(e,null);o=!0},p(c,[u]){u&1&&(r=c[0].article.blocks,V(),a=fe(a,u,s,1,c,r,l,e,pe,te,null,Y),U())},i(c){if(!o){for(let u=0;u<r.length;u+=1)p(a[u]);o=!0}},o(c){for(let u=0;u<a.length;u+=1)h(a[u]);o=!1},d(c){c&&d(e);for(let u=0;u<a.length;u+=1)a[u].d()}}}function Fe(i,e,t){let n,a;const l=$e(Ee()),o=Ae(l.dispatch),r=l.uiArticleReadable;return de(i,r,s=>t(2,a=s)),me(()=>He(document,o)),i.$$.update=()=>{i.$$.dirty&4&&t(0,n=a.editorData)},[n,r,a]}class je extends D{constructor(e){super();N(this,e,Fe,Ge,L,{})}}function Qe(i){let e,t;return e=new je({}),{c(){P(e.$$.fragment)},l(n){A(e.$$.fragment,n)},m(n,a){E(e,n,a),t=!0},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){h(e.$$.fragment,n),t=!1},d(n){H(e,n)}}}function Me(i){let e,t;return e=new _e({props:{$$slots:{default:[Qe]},$$scope:{ctx:i}}}),{c(){P(e.$$.fragment)},l(n){A(e.$$.fragment,n)},m(n,a){E(e,n,a),t=!0},p(n,[a]){const l={};a&1&&(l.$$scope={dirty:a,ctx:n}),e.$set(l)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){h(e.$$.fragment,n),t=!1},d(n){H(e,n)}}}class tt extends D{constructor(e){super();N(this,e,null,Me,L,{})}}export{tt as default};
