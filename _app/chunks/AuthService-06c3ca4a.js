var I=Object.defineProperty,b=Object.defineProperties;var A=Object.getOwnPropertyDescriptors;var c=Object.getOwnPropertySymbols;var v=Object.prototype.hasOwnProperty,S=Object.prototype.propertyIsEnumerable;var s=(t,e,n)=>e in t?I(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,h=(t,e)=>{for(var n in e||(e={}))v.call(e,n)&&s(t,n,e[n]);if(c)for(var n of c(e))S.call(e,n)&&s(t,n,e[n]);return t},l=(t,e)=>b(t,A(e));import{N as T,O as L,P as U,Q as r,R as i,T as o,U as a,V as u,W as p,X as m}from"./vendor-bbbb77bf.js";const f=new T({authState:{type:"Waiting"}}),d=w();function w(){return{profileService:{url:"http://127.0.0.1:8080"},authConfig:{AUTH_DOMAIN:"targist.eu.auth0.com",AUTH_CLIENT_ID:"lh3A83dJbBkSKISZ5pLwu8aLHaPSLUzW"}}}const y=new L,g=new L;function C(){g.next("Login")}function H(){g.next("Logout")}function x(t){return r(o({type:"Waiting"}),a(t.loginWithPopup()).pipe(i(()=>r(o({type:"LoggedIn"}),a(t.getUser()).pipe(p(e=>({type:"LoggedIn",user:e})),u(e=>o({type:"LoggedIn"}))))),u(e=>o({type:"Error",error:e}))))}function O(t){return r(o({type:"Waiting"}),a(t.isAuthenticated()).pipe(i(e=>e?r(o({type:"LoggedIn"}),a(t.getUser()).pipe(p(n=>({type:"LoggedIn",user:n})),u(n=>o({type:"LoggedIn"})))):o({type:"LoggedOut"})),u(e=>o({type:"Error",error:e}))))}function W(t){return r(o({type:"Waiting"}),a(_(t)).pipe(p(()=>({type:"LoggedOut"})),u(e=>o({type:"LoggedOut"}))))}async function _(t){return await t.logout()}function N(){a(m({domain:d.authConfig.AUTH_DOMAIN,client_id:d.authConfig.AUTH_CLIENT_ID,cacheLocation:"localstorage",useRefreshTokens:!0})).subscribe({next:t=>y.next(t)})}y.pipe(U(t=>r(O(t),g.pipe(i(e=>{switch(e){case"Login":return x(t);case"Logout":return W(t)}}))))).subscribe({next:t=>f.next(l(h({},f.value),{authState:t}))});export{C as a,N as c,f as g,H as l};
