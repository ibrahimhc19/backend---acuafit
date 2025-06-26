import{c as g}from"./createLucideIcon-ChwpPmIM.js";import{R as u}from"./index-2LiSZXBZ.js";/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],k=g("plus",p),l=t=>{let e;const s=new Set,c=(n,r)=>{const o=typeof n=="function"?n(e):n;if(!Object.is(o,e)){const d=e;e=r??(typeof o!="object"||o===null)?o:Object.assign({},e,o),s.forEach(f=>f(e,d))}},a=()=>e,i={setState:c,getState:a,getInitialState:()=>b,subscribe:n=>(s.add(n),()=>s.delete(n))},b=e=t(c,a,i);return i},y=t=>t?l(t):l,m=t=>t;function I(t,e=m){const s=u.useSyncExternalStore(t.subscribe,()=>e(t.getState()),()=>e(t.getInitialState()));return u.useDebugValue(s),s}const S=t=>{const e=y(t),s=c=>I(e,c);return Object.assign(s,e),s},v=t=>t?S(t):S;export{k as P,v as c};
