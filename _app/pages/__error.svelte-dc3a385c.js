import{S as V,i as P,s as T,w as x,x as y,y as k,q as I,o as S,B as w,I as q,e as v,k as D,c as $,a as h,m as E,d as f,b as g,g as p,H as u,t as d,h as _}from"../chunks/vendor-e225b0fc.js";import{P as B,S as C}from"../chunks/StandardTopBar-1507e82a.js";import"../chunks/AuthService-86dcb104.js";import"../chunks/singletons-a6a7384f.js";function H(s){let t,a;return t=new C({props:{slot:"topbar"}}),{c(){x(t.$$.fragment)},l(e){y(t.$$.fragment,e)},m(e,r){k(t,e,r),a=!0},p:q,i(e){a||(I(t.$$.fragment,e),a=!0)},o(e){S(t.$$.fragment,e),a=!1},d(e){w(t,e)}}}function j(s){let t,a;return{c(){t=v("div"),a=d("There seems to be some error")},l(e){t=$(e,"DIV",{});var r=h(t);a=_(r,"There seems to be some error"),r.forEach(f)},m(e,r){p(e,t,r),u(t,a)},d(e){e&&f(t)}}}function z(s){let t,a,e,r,n,l="\u{1F622}",o,i;return{c(){t=v("div"),a=d("Sorry, Page not found"),e=D(),r=v("div"),n=d("4"),o=d(l),i=d("4")},l(c){t=$(c,"DIV",{});var m=h(t);a=_(m,"Sorry, Page not found"),m.forEach(f),e=E(c),r=$(c,"DIV",{});var b=h(r);n=_(b,"4"),o=_(b,l),i=_(b,"4"),b.forEach(f)},m(c,m){p(c,t,m),u(t,a),p(c,e,m),p(c,r,m),u(r,n),u(r,o),u(r,i)},d(c){c&&f(t),c&&f(e),c&&f(r)}}}function A(s){let t,a,e;function r(o,i){return o[0]==404?z:j}let n=r(s),l=n(s);return{c(){t=v("div"),l.c(),a=D(),e=v("div"),this.h()},l(o){t=$(o,"DIV",{class:!0,slot:!0});var i=h(t);l.l(i),a=E(i),e=$(i,"DIV",{}),h(e).forEach(f),i.forEach(f),this.h()},h(){g(t,"class","flex flex-col flex-grow w-full h-full items-center place-content-center space-y-6 text-6xl text-bluestrong"),g(t,"slot","main")},m(o,i){p(o,t,i),l.m(t,null),u(t,a),u(t,e)},p(o,i){n!==(n=r(o))&&(l.d(1),l=n(o),l&&(l.c(),l.m(t,a)))},d(o){o&&f(t),l.d()}}}function F(s){let t,a;return t=new B({props:{$$slots:{main:[A],topbar:[H]},$$scope:{ctx:s}}}),{c(){x(t.$$.fragment)},l(e){y(t.$$.fragment,e)},m(e,r){k(t,e,r),a=!0},p(e,[r]){const n={};r&5&&(n.$$scope={dirty:r,ctx:e}),t.$set(n)},i(e){a||(I(t.$$.fragment,e),a=!0)},o(e){S(t.$$.fragment,e),a=!1},d(e){w(t,e)}}}function N(s){return{props:{title:`${s.status}: ${s.error.message}`,status:s.status}}}function G(s,t,a){let{title:e}=t,{status:r}=t;return s.$$set=n=>{"title"in n&&a(1,e=n.title),"status"in n&&a(0,r=n.status)},[r,e]}class O extends V{constructor(t){super();P(this,t,G,F,T,{title:1,status:0})}}export{O as default,N as load};
