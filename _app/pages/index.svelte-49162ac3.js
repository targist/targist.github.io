import{S as R,i as J,s as K,I as re,e as p,t as x,c as b,a as w,h as B,d as m,b as g,g as C,H as d,J as le,K as ae,L as se,q as _,o as $,w as D,x as S,y as V,B as y,k as A,m as G,G as W,j as H,n as Q,p as Y,X as Z,E as ee}from"../chunks/index-f40bfaf5.js";import{P as ne,S as oe}from"../chunks/StandardTopBar-36cfadc5.js";/* empty css                    */import"../chunks/singletons-0b89c4cc.js";function ie(s){let e,r,t;const l=s[1].default,i=re(l,s,s[0],null);return{c(){e=p("span"),r=x("#"),i&&i.c(),this.h()},l(a){e=b(a,"SPAN",{class:!0});var o=w(e);r=B(o,"#"),i&&i.l(o),o.forEach(m),this.h()},h(){g(e,"class","inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray mr-2 mb-2")},m(a,o){C(a,e,o),d(e,r),i&&i.m(e,null),t=!0},p(a,[o]){i&&i.p&&(!t||o&1)&&le(i,l,a,a[0],t?se(l,a[0],o,null):ae(a[0]),null)},i(a){t||(_(i,a),t=!0)},o(a){$(i,a),t=!1},d(a){a&&m(e),i&&i.d(a)}}}function ce(s,e,r){let{$$slots:t={},$$scope:l}=e;return s.$$set=i=>{"$$scope"in i&&r(0,l=i.$$scope)},[l,t]}class fe extends R{constructor(e){super();J(this,e,ce,ie,K,{})}}function X(s,e,r){const t=s.slice();return t[5]=e[r],t}function ue(s){let e=s[5]+"",r;return{c(){r=x(e)},l(t){r=B(t,e)},m(t,l){C(t,r,l)},p(t,l){l&8&&e!==(e=t[5]+"")&&H(r,e)},d(t){t&&m(r)}}}function z(s){let e,r;return e=new fe({props:{$$slots:{default:[ue]},$$scope:{ctx:s}}}),{c(){D(e.$$.fragment)},l(t){S(e.$$.fragment,t)},m(t,l){V(e,t,l),r=!0},p(t,l){const i={};l&264&&(i.$$scope={dirty:l,ctx:t}),e.$set(i)},i(t){r||(_(e.$$.fragment,t),r=!0)},o(t){$(e.$$.fragment,t),r=!1},d(t){y(e,t)}}}function he(s){let e,r,t,l,i,a,o,n,j,I,k,P,T,v,E=s[3],u=[];for(let c=0;c<E.length;c+=1)u[c]=z(X(s,E,c));const te=c=>$(u[c],1,1,()=>{u[c]=null});return{c(){e=p("a"),r=p("div"),t=p("img"),i=A(),a=p("div"),o=p("div"),n=x(s[0]),j=A(),I=p("p"),k=x(s[2]),P=A(),T=p("div");for(let c=0;c<u.length;c+=1)u[c].c();this.h()},l(c){e=b(c,"A",{href:!0,class:!0});var h=w(e);r=b(h,"DIV",{class:!0});var f=w(r);t=b(f,"IMG",{class:!0,src:!0,alt:!0}),i=G(f),a=b(f,"DIV",{class:!0});var U=w(a);o=b(U,"DIV",{class:!0});var L=w(o);n=B(L,s[0]),L.forEach(m),j=G(U),I=b(U,"P",{class:!0});var M=w(I);k=B(M,s[2]),M.forEach(m),U.forEach(m),P=G(f),T=b(f,"DIV",{class:!0});var N=w(T);for(let q=0;q<u.length;q+=1)u[q].l(N);N.forEach(m),f.forEach(m),h.forEach(m),this.h()},h(){g(t,"class","w-full object-cover aspect-[2] "),W(t.src,l=s[1])||g(t,"src",l),g(t,"alt","article"),g(o,"class","font-bold text-xl mb-2"),g(I,"class","text-gray text-base"),g(a,"class","px-6 py-4"),g(T,"class","px-6 pt-4 pb-2"),g(r,"class","border-2 border-gray-100 w-full hover:cursor-pointer md:rounded-lg overflow-hidden bg-light"),g(e,"href",s[4]),g(e,"class","w-full max-w-xl")},m(c,h){C(c,e,h),d(e,r),d(r,t),d(r,i),d(r,a),d(a,o),d(o,n),d(a,j),d(a,I),d(I,k),d(r,P),d(r,T);for(let f=0;f<u.length;f+=1)u[f].m(T,null);v=!0},p(c,[h]){if((!v||h&2&&!W(t.src,l=c[1]))&&g(t,"src",l),(!v||h&1)&&H(n,c[0]),(!v||h&4)&&H(k,c[2]),h&8){E=c[3];let f;for(f=0;f<E.length;f+=1){const U=X(c,E,f);u[f]?(u[f].p(U,h),_(u[f],1)):(u[f]=z(U),u[f].c(),_(u[f],1),u[f].m(T,null))}for(Q(),f=E.length;f<u.length;f+=1)te(f);Y()}(!v||h&16)&&g(e,"href",c[4])},i(c){if(!v){for(let h=0;h<E.length;h+=1)_(u[h]);v=!0}},o(c){u=u.filter(Boolean);for(let h=0;h<u.length;h+=1)$(u[h]);v=!1},d(c){c&&m(e),Z(u,c)}}}function ge(s,e,r){let{title:t}=e,{imageUrl:l}=e,{description:i}=e,{hashTags:a}=e,{href:o}=e;return s.$$set=n=>{"title"in n&&r(0,t=n.title),"imageUrl"in n&&r(1,l=n.imageUrl),"description"in n&&r(2,i=n.description),"hashTags"in n&&r(3,a=n.hashTags),"href"in n&&r(4,o=n.href)},[t,l,i,a,o]}class de extends R{constructor(e){super();J(this,e,ge,he,K,{title:0,imageUrl:1,description:2,hashTags:3,href:4})}}function F(s,e,r){const t=s.slice();return t[1]=e[r].description,t[2]=e[r].hashTags,t[3]=e[r].href,t[4]=e[r].imageUrl,t[5]=e[r].title,t}function me(s){let e,r;return e=new oe({props:{slot:"topbar"}}),{c(){D(e.$$.fragment)},l(t){S(e.$$.fragment,t)},m(t,l){V(e,t,l),r=!0},p:ee,i(t){r||(_(e.$$.fragment,t),r=!0)},o(t){$(e.$$.fragment,t),r=!1},d(t){y(e,t)}}}function O(s){let e,r;return e=new de({props:{imageUrl:s[4],title:s[5],description:s[1],hashTags:s[2],href:s[3]}}),{c(){D(e.$$.fragment)},l(t){S(e.$$.fragment,t)},m(t,l){V(e,t,l),r=!0},p:ee,i(t){r||(_(e.$$.fragment,t),r=!0)},o(t){$(e.$$.fragment,t),r=!1},d(t){y(e,t)}}}function _e(s){let e,r,t=s[0],l=[];for(let a=0;a<t.length;a+=1)l[a]=O(F(s,t,a));const i=a=>$(l[a],1,1,()=>{l[a]=null});return{c(){e=p("div");for(let a=0;a<l.length;a+=1)l[a].c();this.h()},l(a){e=b(a,"DIV",{slot:!0,class:!0});var o=w(e);for(let n=0;n<l.length;n+=1)l[n].l(o);o.forEach(m),this.h()},h(){g(e,"slot","main"),g(e,"class","flex flex-col w-full items-center pt-14 pb-20 space-y-5 md:px-1")},m(a,o){C(a,e,o);for(let n=0;n<l.length;n+=1)l[n].m(e,null);r=!0},p(a,o){if(o&1){t=a[0];let n;for(n=0;n<t.length;n+=1){const j=F(a,t,n);l[n]?(l[n].p(j,o),_(l[n],1)):(l[n]=O(j),l[n].c(),_(l[n],1),l[n].m(e,null))}for(Q(),n=t.length;n<l.length;n+=1)i(n);Y()}},i(a){if(!r){for(let o=0;o<t.length;o+=1)_(l[o]);r=!0}},o(a){l=l.filter(Boolean);for(let o=0;o<l.length;o+=1)$(l[o]);r=!1},d(a){a&&m(e),Z(l,a)}}}function pe(s){let e,r;return e=new ne({props:{$$slots:{main:[_e],topbar:[me]},$$scope:{ctx:s}}}),{c(){D(e.$$.fragment)},l(t){S(e.$$.fragment,t)},m(t,l){V(e,t,l),r=!0},p(t,[l]){const i={};l&256&&(i.$$scope={dirty:l,ctx:t}),e.$set(i)},i(t){r||(_(e.$$.fragment,t),r=!0)},o(t){$(e.$$.fragment,t),r=!1},d(t){y(e,t)}}}function be(s){return[[{imageUrl:"/projects/webrc/webrc_robot.jpg",title:"WebRC",description:"Control a robot from an online platform",hashTags:["android","arduino","webrtc","bluetooth"],href:"/projects/webrc"},{imageUrl:"/projects/ardui/ardui.jpg",title:"ArdUI",description:"Control an arduino using nothing but an android terminal...",hashTags:["android","arduino"],href:"/projects/ardui"}]]}class Ee extends R{constructor(e){super();J(this,e,be,pe,K,{})}}export{Ee as default};
