import{S as T,i as w,s as V,w as b,x as y,y as k,q as S,o as D,B as E,I as N,e as d,k as I,c as _,a as h,m as O,d as u,b as p,g as v,H as f,t as x,h as $}from"../chunks/vendor-9835d907.js";import{P,S as R}from"../chunks/StandardTopBar-920ad26c.js";import"../chunks/AuthService-8c76074c.js";function j(n){let t,r;return t=new R({props:{slot:"topbar"}}),{c(){b(t.$$.fragment)},l(e){y(t.$$.fragment,e)},m(e,s){k(t,e,s),r=!0},p:N,i(e){r||(S(t.$$.fragment,e),r=!0)},o(e){D(t.$$.fragment,e),r=!1},d(e){E(t,e)}}}function A(n){let t,r;return{c(){t=d("div"),r=x("There seems to be some error"),this.h()},l(e){t=_(e,"DIV",{class:!0});var s=h(t);r=$(s,"There seems to be some error"),s.forEach(u),this.h()},h(){p(t,"class","text-6xl text-gray")},m(e,s){v(e,t,s),f(t,r)},d(e){e&&u(t)}}}function B(n){let t,r,e,s,a,o="\u{1F622}",l,i;return{c(){t=d("div"),r=x("SORRY, PAGE NOT FOUND"),e=I(),s=d("div"),a=x("4"),l=x(o),i=x("4"),this.h()},l(c){t=_(c,"DIV",{class:!0});var m=h(t);r=$(m,"SORRY, PAGE NOT FOUND"),m.forEach(u),e=O(c),s=_(c,"DIV",{class:!0});var g=h(s);a=$(g,"4"),l=$(g,o),i=$(g,"4"),g.forEach(u),this.h()},h(){p(t,"class","text-6xl text-gray"),p(s,"class","text-6xl text-gray")},m(c,m){v(c,t,m),f(t,r),v(c,e,m),v(c,s,m),f(s,a),f(s,l),f(s,i)},d(c){c&&u(t),c&&u(e),c&&u(s)}}}function q(n){let t,r,e;function s(l,i){return l[0]==404?B:A}let a=s(n),o=a(n);return{c(){t=d("div"),o.c(),r=I(),e=d("div"),this.h()},l(l){t=_(l,"DIV",{class:!0,slot:!0});var i=h(t);o.l(i),r=O(i),e=_(i,"DIV",{}),h(e).forEach(u),i.forEach(u),this.h()},h(){p(t,"class","flex flex-col flex-grow w-full h-full items-center place-content-center space-y-6"),p(t,"slot","main")},m(l,i){v(l,t,i),o.m(t,null),f(t,r),f(t,e)},p(l,i){a!==(a=s(l))&&(o.d(1),o=a(l),o&&(o.c(),o.m(t,r)))},d(l){l&&u(t),o.d()}}}function F(n){let t,r;return t=new P({props:{$$slots:{main:[q],topbar:[j]},$$scope:{ctx:n}}}),{c(){b(t.$$.fragment)},l(e){y(t.$$.fragment,e)},m(e,s){k(t,e,s),r=!0},p(e,[s]){const a={};s&5&&(a.$$scope={dirty:s,ctx:e}),t.$set(a)},i(e){r||(S(t.$$.fragment,e),r=!0)},o(e){D(t.$$.fragment,e),r=!1},d(e){E(t,e)}}}function H(n){return{props:{title:`${n.status}: ${n.error.message}`,status:n.status}}}function G(n,t,r){let{title:e}=t,{status:s}=t;return n.$$set=a=>{"title"in a&&r(1,e=a.title),"status"in a&&r(0,s=a.status)},[s,e]}class z extends T{constructor(t){super();w(this,t,G,F,V,{title:1,status:0})}}export{z as default,H as load};
