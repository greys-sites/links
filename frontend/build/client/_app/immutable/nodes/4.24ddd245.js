import{S as z,i as B,s as G,k as p,a as E,l as _,m as O,c as T,h as P,n as l,b as L,E as i,Q,I as q,R as H,q as A,r as F,u as M}from"../chunks/index.9c9e698c.js";import{a as V}from"../chunks/toasts.25852f94.js";import{e as j}from"../chunks/forms.58d63d22.js";/* empty css                                                    */function w(u,e,a){const r=u.slice();return r[2]=e[a],r}function x(u){let e,a,r=u[2].hid+"",v,o,N,h,b=u[2].name+"",y,I,U,d,c,n,s,m,t,k,C;return{c(){e=p("div"),a=p("a"),v=A(r),N=E(),h=p("a"),y=A(b),U=E(),d=p("form"),c=p("input"),s=E(),m=p("input"),t=E(),this.h()},l(g){e=_(g,"DIV",{class:!0});var f=O(e);a=_(f,"A",{href:!0,target:!0});var D=O(a);v=F(D,r),D.forEach(P),N=T(f),h=_(f,"A",{href:!0,target:!0});var R=O(h);y=F(R,b),R.forEach(P),U=T(f),d=_(f,"FORM",{method:!0,action:!0,class:!0});var S=O(d);c=_(S,"INPUT",{type:!0,name:!0}),s=T(S),m=_(S,"INPUT",{type:!0}),S.forEach(P),t=T(f),f.forEach(P),this.h()},h(){l(a,"href",o="/"+u[2].hid),l(a,"target","_blank"),l(h,"href",I=u[2].url),l(h,"target","_blank"),l(c,"type","text"),c.value=n=u[2].hid,l(c,"name","hid"),c.hidden=!0,l(m,"type","submit"),m.value="delete",l(d,"method","POST"),l(d,"action","?/del"),l(d,"class","svelte-10uyn75"),l(e,"class","link svelte-10uyn75")},m(g,f){L(g,e,f),i(e,a),i(a,v),i(e,N),i(e,h),i(h,y),i(e,U),i(e,d),i(d,c),i(d,s),i(d,m),i(e,t),k||(C=Q(j.call(null,d)),k=!0)},p(g,f){f&1&&r!==(r=g[2].hid+"")&&M(v,r),f&1&&o!==(o="/"+g[2].hid)&&l(a,"href",o),f&1&&b!==(b=g[2].name+"")&&M(y,b),f&1&&I!==(I=g[2].url)&&l(h,"href",I),f&1&&n!==(n=g[2].hid)&&c.value!==n&&(c.value=n)},d(g){g&&P(e),k=!1,C()}}}function J(u){let e,a,r,v,o,N,h,b,y,I,U,d,c=u[0].links,n=[];for(let s=0;s<c.length;s+=1)n[s]=x(w(u,c,s));return{c(){e=p("div"),a=p("form"),r=p("input"),v=E(),o=p("input"),N=E(),h=p("input"),b=E(),y=p("input"),I=E();for(let s=0;s<n.length;s+=1)n[s].c();this.h()},l(s){e=_(s,"DIV",{class:!0});var m=O(e);a=_(m,"FORM",{method:!0,action:!0});var t=O(a);r=_(t,"INPUT",{type:!0,placeholder:!0,name:!0}),v=T(t),o=_(t,"INPUT",{type:!0,placeholder:!0,name:!0}),N=T(t),h=_(t,"INPUT",{type:!0,placeholder:!0,name:!0}),b=T(t),y=_(t,"INPUT",{type:!0}),t.forEach(P),I=T(m);for(let k=0;k<n.length;k+=1)n[k].l(m);m.forEach(P),this.h()},h(){l(r,"type","text"),l(r,"placeholder","name"),l(r,"name","name"),l(o,"type","text"),l(o,"placeholder","url"),l(o,"name","url"),l(h,"type","text"),l(h,"placeholder","custom ID"),l(h,"name","hid"),l(y,"type","submit"),y.value="submit",l(a,"method","POST"),l(a,"action","?/create"),l(e,"class","container")},m(s,m){L(s,e,m),i(e,a),i(a,r),i(a,v),i(a,o),i(a,N),i(a,h),i(a,b),i(a,y),i(e,I);for(let t=0;t<n.length;t+=1)n[t]&&n[t].m(e,null);U||(d=Q(j.call(null,a)),U=!0)},p(s,[m]){if(m&1){c=s[0].links;let t;for(t=0;t<c.length;t+=1){const k=w(s,c,t);n[t]?n[t].p(k,m):(n[t]=x(k),n[t].c(),n[t].m(e,null))}for(;t<n.length;t+=1)n[t].d(1);n.length=c.length}},i:q,o:q,d(s){s&&P(e),H(n,s),U=!1,d()}}}function K(u,e,a){let{form:r}=e,{data:v}=e;return u.$$set=o=>{"form"in o&&a(1,r=o.form),"data"in o&&a(0,v=o.data)},u.$$.update=()=>{if(u.$$.dirty&2&&console.log(r),u.$$.dirty&2&&r)switch(r.success){case!0:V({type:"success",message:`Link ${r.action}d!`,timeout:5e3,canClose:!0});break;case!1:V({type:"error",message:`Error: ${r.message}`,timeout:5e3,canClose:!0});break}},[v,r]}class $ extends z{constructor(e){super(),B(this,e,K,J,G,{form:1,data:0})}}export{$ as component};