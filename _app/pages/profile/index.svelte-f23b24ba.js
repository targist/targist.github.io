import{_ as ce}from"../../chunks/preload-helper-ec9aa979.js";import{S as K,i as Q,s as X,e as v,t as P,c as b,a as y,h as k,d as p,b as g,g as S,H as m,j as fe,k as V,m as C,_ as Y,I as F,C as re,$ as se,w as B,x as A,y as U,q as x,o as H,B as j,a1 as J,v as ue,n as de,p as me}from"../../chunks/vendor-9bb32b1c.js";import{P as he,S as pe}from"../../chunks/StandardTopBar-ff370fc0.js";import{c as ge,a as _e}from"../../chunks/AuthService-73b3557b.js";import"../../chunks/singletons-a6a7384f.js";function ne(r){let e,t,a=r[3].reason+"",n;return{c(){e=v("span"),t=P("* "),n=P(a),this.h()},l(i){e=b(i,"SPAN",{class:!0});var l=y(e);t=k(l,"* "),n=k(l,a),l.forEach(p),this.h()},h(){g(e,"class","ml-1 text-xs font-light italic text-red")},m(i,l){S(i,e,l),m(e,t),m(e,n)},p(i,l){l&8&&a!==(a=i[3].reason+"")&&fe(n,a)},d(i){i&&p(e)}}}function ve(r){let e,t,a,n,i,l,c,f,o,_,d=r[3].type=="not_valid"&&ne(r);return{c(){e=v("div"),t=v("label"),a=P(r[0]),n=V(),d&&d.c(),i=V(),l=v("input"),this.h()},l(h){e=b(h,"DIV",{class:!0});var s=y(e);t=b(s,"LABEL",{class:!0,for:!0});var u=y(t);a=k(u,r[0]),n=C(u),d&&d.l(u),u.forEach(p),i=C(s),l=b(s,"INPUT",{class:!0,type:!0}),s.forEach(p),this.h()},h(){g(t,"class","block text-black text-sm mb-2"),g(t,"for","firstname"),g(l,"class",c=`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none ${r[3].type=="valid"?"border-gray":"border-red"}`),g(l,"type","text"),l.value=r[1],g(e,"class",f=r[4].class)},m(h,s){S(h,e,s),m(e,t),m(t,a),m(t,n),d&&d.m(t,null),m(e,i),m(e,l),o||(_=Y(l,"input",r[6]),o=!0)},p(h,[s]){s&1&&fe(a,h[0]),h[3].type=="not_valid"?d?d.p(h,s):(d=ne(h),d.c(),d.m(t,null)):d&&(d.d(1),d=null),s&8&&c!==(c=`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none ${h[3].type=="valid"?"border-gray":"border-red"}`)&&g(l,"class",c),s&2&&l.value!==h[1]&&(l.value=h[1]),s&16&&f!==(f=h[4].class)&&g(e,"class",f)},i:F,o:F,d(h){h&&p(e),d&&d.d(),o=!1,_()}}}function be(r,e,t){let a,{fieldName:n}=e,{value:i}=e,{onChange:l}=e,{validator:c}=e;const f=o=>{l(o.currentTarget.value)};return r.$$set=o=>{t(4,e=re(re({},e),se(o))),"fieldName"in o&&t(0,n=o.fieldName),"value"in o&&t(1,i=o.value),"onChange"in o&&t(2,l=o.onChange),"validator"in o&&t(5,c=o.validator)},r.$$.update=()=>{r.$$.dirty&34&&t(3,a=c(i))},e=se(e),[n,i,l,a,e,c,f]}class ie extends K{constructor(e){super();Q(this,e,be,ve,X,{fieldName:0,value:1,onChange:2,validator:5})}}function oe(r,e,t){return a=>!a||a.length<e?{type:"not_valid",reason:`field "${r}: should be longer than ${e} character`}:a&&a.length>t?{type:"not_valid",reason:`field "${r}" should be shorter than ${t} character`}:{type:"valid"}}function ye(r){let e,t,a,n,i,l,c,f,o,_,d,h;return t=new ie({props:{fieldName:"First Name",value:r[0].firstName,onChange:r[8],validator:oe("First Name",1,15)}}),n=new ie({props:{fieldName:"Family Name",value:r[0].familyName,onChange:r[9],validator:oe("Family name",1,15)}}),{c(){e=v("div"),B(t.$$.fragment),a=V(),B(n.$$.fragment),i=V(),l=v("div"),c=v("button"),f=P("Save"),this.h()},l(s){e=b(s,"DIV",{class:!0});var u=y(e);A(t.$$.fragment,u),a=C(u),A(n.$$.fragment,u),i=C(u),l=b(u,"DIV",{class:!0});var D=y(l);c=b(D,"BUTTON",{class:!0});var N=y(c);f=k(N,"Save"),N.forEach(p),D.forEach(p),u.forEach(p),this.h()},h(){c.disabled=r[1],g(c,"class",o=`px-5 py-2 rounded-lg cursor-pointer mr-1 ${r[1]?"bg-lightGray":"bg-bluelight hover:bg-bluemiddle"}`),g(l,"class","flex flex-row place-content-end"),g(e,"class","flex flex-col space-y-2")},m(s,u){S(s,e,u),U(t,e,null),m(e,a),U(n,e,null),m(e,i),m(e,l),m(l,c),m(c,f),_=!0,d||(h=Y(c,"click",r[2]),d=!0)},p(s,[u]){const D={};u&1&&(D.value=s[0].firstName),u&1&&(D.onChange=s[8]),t.$set(D);const N={};u&1&&(N.value=s[0].familyName),u&1&&(N.onChange=s[9]),n.$set(N),(!_||u&2)&&(c.disabled=s[1]),(!_||u&2&&o!==(o=`px-5 py-2 rounded-lg cursor-pointer mr-1 ${s[1]?"bg-lightGray":"bg-bluelight hover:bg-bluemiddle"}`))&&g(c,"class",o)},i(s){_||(x(t.$$.fragment,s),x(n.$$.fragment,s),_=!0)},o(s){H(t.$$.fragment,s),H(n.$$.fragment,s),_=!1},d(s){s&&p(e),j(t),j(n),d=!1,h()}}}function Ee(r){return r.firstName&&r.familyName&&r.familyName.length>=1&&r.firstName.length>=1&&r.familyName.length<=15&&r.firstName.length<=15}function Ne(r,e,t){let a,n,i,{profile:l}=e,{profileHandler:c}=e,f=J.clone(l),o=!1;async function _(){try{t(5,o=!0);const s=await(c==null?void 0:c.updateProfile(l));t(4,f=J.clone(l))}finally{t(5,o=!1)}}const d=s=>t(0,l.firstName=s,l),h=s=>t(0,l.familyName=s,l);return r.$$set=s=>{"profile"in s&&t(0,l=s.profile),"profileHandler"in s&&t(3,c=s.profileHandler)},r.$$.update=()=>{r.$$.dirty&17&&t(7,a=J.isEqual(f,l)),r.$$.dirty&1&&t(6,n=Ee(l)),r.$$.dirty&224&&t(1,i=a||o||!n)},[l,i,_,c,f,o,n,a,d,h]}class Ie extends K{constructor(e){super();Q(this,e,Ne,ye,X,{profile:0,profileHandler:3})}}function De(r){let e,t;return e=new pe({props:{slot:"topbar"}}),{c(){B(e.$$.fragment)},l(a){A(e.$$.fragment,a)},m(a,n){U(e,a,n),t=!0},p:F,i(a){t||(x(e.$$.fragment,a),t=!0)},o(a){H(e.$$.fragment,a),t=!1},d(a){j(e,a)}}}function Pe(r){let e,t,a;return{c(){e=v("div"),t=v("div"),a=P("There seems to be some error"),this.h()},l(n){e=b(n,"DIV",{class:!0});var i=y(e);t=b(i,"DIV",{});var l=y(t);a=k(l,"There seems to be some error"),l.forEach(p),i.forEach(p),this.h()},h(){g(e,"class","flex flex-col flex-grow w-full h-full items-center place-content-center space-y-6 text-6xl text-bluestrong")},m(n,i){S(n,e,i),m(e,t),m(t,a)},p:F,i:F,o:F,d(n){n&&p(e)}}}function ke(r){let e,t,a,n,i,l,c,f,o,_,d,h,s,u,D,N,w,z,T,G,q,W,Z;return l=new Ie({props:{profile:r[1],profileHandler:r[0]}}),{c(){e=v("div"),t=v("div"),a=P("Personal info"),n=V(),i=v("div"),B(l.$$.fragment),c=V(),f=v("div"),o=v("div"),_=P("Danger zone"),d=V(),h=v("div"),s=v("div"),u=v("button"),D=P("Delete profile"),N=V(),w=v("div"),z=P("* The website is in beta stage, in case of any issue feel free to contact "),T=v("a"),G=P("info@targist.com"),this.h()},l(E){e=b(E,"DIV",{class:!0});var I=y(e);t=b(I,"DIV",{class:!0});var L=y(t);a=k(L,"Personal info"),L.forEach(p),n=C(I),i=b(I,"DIV",{class:!0});var O=y(i);A(l.$$.fragment,O),c=C(O),f=b(O,"DIV",{});var R=y(f);o=b(R,"DIV",{class:!0});var $=y(o);_=k($,"Danger zone"),$.forEach(p),d=C(R),h=b(R,"DIV",{class:!0});var ee=y(h);s=b(ee,"DIV",{class:!0});var te=y(s);u=b(te,"BUTTON",{class:!0});var ae=y(u);D=k(ae,"Delete profile"),ae.forEach(p),te.forEach(p),ee.forEach(p),R.forEach(p),O.forEach(p),I.forEach(p),N=C(E),w=b(E,"DIV",{class:!0});var M=y(w);z=k(M,"* The website is in beta stage, in case of any issue feel free to contact "),T=b(M,"A",{class:!0,href:!0});var le=y(T);G=k(le,"info@targist.com"),le.forEach(p),M.forEach(p),this.h()},h(){g(t,"class","hero-title"),g(o,"class","text-red"),g(u,"class","px-4 py-2 flex bg-red rounded-md text-light "),g(s,"class",""),g(h,"class","flex flex-col space-y-4 border-2 border-red rounded-lg w-full p-1"),g(i,"class","flex flex-col space-y-4 mt-28"),g(e,"class","flex flex-col my-8"),g(T,"class","text-bluestrong underline"),g(T,"href","mailto:info@targist.com"),g(w,"class","italic text-gray text-sm mt-14")},m(E,I){S(E,e,I),m(e,t),m(t,a),m(e,n),m(e,i),U(l,i,null),m(i,c),m(i,f),m(f,o),m(o,_),m(f,d),m(f,h),m(h,s),m(s,u),m(u,D),S(E,N,I),S(E,w,I),m(w,z),m(w,T),m(T,G),q=!0,W||(Z=Y(u,"click",r[3]),W=!0)},p(E,I){const L={};I&2&&(L.profile=E[1]),I&1&&(L.profileHandler=E[0]),l.$set(L)},i(E){q||(x(l.$$.fragment,E),q=!0)},o(E){H(l.$$.fragment,E),q=!1},d(E){E&&p(e),j(l),E&&p(N),E&&p(w),W=!1,Z()}}}function we(r){let e,t,a,n;const i=[ke,Pe],l=[];function c(f,o){return f[2]=="Success"?0:f[2]=="Error"?1:-1}return~(t=c(r))&&(a=l[t]=i[t](r)),{c(){e=v("div"),a&&a.c(),this.h()},l(f){e=b(f,"DIV",{class:!0,slot:!0});var o=y(e);a&&a.l(o),o.forEach(p),this.h()},h(){g(e,"class","flex flex-col lg:mx-auto max-w-screen-md w-full mx-3"),g(e,"slot","main")},m(f,o){S(f,e,o),~t&&l[t].m(e,null),n=!0},p(f,o){let _=t;t=c(f),t===_?~t&&l[t].p(f,o):(a&&(de(),H(l[_],1,1,()=>{l[_]=null}),me()),~t?(a=l[t],a?a.p(f,o):(a=l[t]=i[t](f),a.c()),x(a,1),a.m(e,null)):a=null)},i(f){n||(x(a),n=!0)},o(f){H(a),n=!1},d(f){f&&p(e),~t&&l[t].d()}}}function Ve(r){let e,t;return e=new he({props:{deny_if_not_auth:!0,pageIsReady:r[2]!="Loading",$$slots:{main:[we],topbar:[De]},$$scope:{ctx:r}}}),{c(){B(e.$$.fragment)},l(a){A(e.$$.fragment,a)},m(a,n){U(e,a,n),t=!0},p(a,[n]){const i={};n&4&&(i.pageIsReady=a[2]!="Loading"),n&23&&(i.$$scope={dirty:n,ctx:a}),e.$set(i)},i(a){t||(x(e.$$.fragment,a),t=!0)},o(a){H(e.$$.fragment,a),t=!1},d(a){j(e,a)}}}function Ce(r,e,t){let a,n,i="Loading";return ue(async()=>{try{const c=await new Promise((d,h)=>{const s=ge.subscribe(u=>{u.auth0Client!=null&&(d(u.auth0Client),s())})});await new Promise((d,h)=>{const s=_e.subscribe(u=>{u.authState.type=="LoggedIn"&&(d(u.authState),s())})});const f=(await ce(()=>import("../../chunks/profile-utils-4404320e.js"),["chunks/profile-utils-4404320e.js","chunks/AuthService-73b3557b.js","assets/AuthService-8c813eb7.css","chunks/vendor-9bb32b1c.js"])).ProfileHandler,o=await c.getTokenSilently();t(0,a=new f(o));const _=await a.getProfile();_.failed?t(2,i="Error"):(t(1,n=_.succeeded.profile),t(2,i="Success"))}catch(c){console.log(c)}}),[a,n,i,()=>{a.deleteProfile()}]}class Fe extends K{constructor(e){super();Q(this,e,Ce,Ve,X,{})}}export{Fe as default};
