"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2429],{40933:function(e,t,r){r.d(t,{Z:function(){return n}});/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=(0,r(78030).Z)("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]])},18146:function(e,t,r){r.d(t,{VY:function(){return Q},aV:function(){return $},fC:function(){return Y},xz:function(){return J}});var n=r(2265),o=r(78149),a=r(98324),l=r(1584),i=r(57437),u=n.forwardRef((e,t)=>{let{children:r,...o}=e,a=n.Children.toArray(r),l=a.find(f);if(l){let e=l.props.children,r=a.map(t=>t!==l?t:n.Children.count(e)>1?n.Children.only(null):n.isValidElement(e)?e.props.children:null);return(0,i.jsx)(s,{...o,ref:t,children:n.isValidElement(e)?n.cloneElement(e,void 0,r):null})}return(0,i.jsx)(s,{...o,ref:t,children:r})});u.displayName="Slot";var s=n.forwardRef((e,t)=>{let{children:r,...o}=e;if(n.isValidElement(r)){let e,a;let i=(e=Object.getOwnPropertyDescriptor(r.props,"ref")?.get)&&"isReactWarning"in e&&e.isReactWarning?r.ref:(e=Object.getOwnPropertyDescriptor(r,"ref")?.get)&&"isReactWarning"in e&&e.isReactWarning?r.props.ref:r.props.ref||r.ref,u=function(e,t){let r={...t};for(let n in t){let o=e[n],a=t[n];/^on[A-Z]/.test(n)?o&&a?r[n]=(...e)=>{a(...e),o(...e)}:o&&(r[n]=o):"style"===n?r[n]={...o,...a}:"className"===n&&(r[n]=[o,a].filter(Boolean).join(" "))}return{...e,...r}}(o,r.props);return r.type!==n.Fragment&&(u.ref=t?(0,l.F)(t,i):i),n.cloneElement(r,u)}return n.Children.count(r)>1?n.Children.only(null):null});s.displayName="SlotClone";var c=({children:e})=>(0,i.jsx)(i.Fragment,{children:e});function f(e){return n.isValidElement(e)&&e.type===c}var d=r(53201);r(54887);var p=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"].reduce((e,t)=>{let r=n.forwardRef((e,r)=>{let{asChild:n,...o}=e,a=n?u:t;return"undefined"!=typeof window&&(window[Symbol.for("radix-ui")]=!0),(0,i.jsx)(a,{...o,ref:r})});return r.displayName=`Primitive.${t}`,{...e,[t]:r}},{}),m=r(75137),v=r(91715),b=r(87513),y="rovingFocusGroup.onEntryFocus",w={bubbles:!1,cancelable:!0},g="RovingFocusGroup",[h,R,x]=function(e){let t=e+"CollectionProvider",[r,o]=(0,a.b)(t),[s,c]=r(t,{collectionRef:{current:null},itemMap:new Map}),f=e=>{let{scope:t,children:r}=e,o=n.useRef(null),a=n.useRef(new Map).current;return(0,i.jsx)(s,{scope:t,itemMap:a,collectionRef:o,children:r})};f.displayName=t;let d=e+"CollectionSlot",p=n.forwardRef((e,t)=>{let{scope:r,children:n}=e,o=c(d,r),a=(0,l.e)(t,o.collectionRef);return(0,i.jsx)(u,{ref:a,children:n})});p.displayName=d;let m=e+"CollectionItemSlot",v="data-radix-collection-item",b=n.forwardRef((e,t)=>{let{scope:r,children:o,...a}=e,s=n.useRef(null),f=(0,l.e)(t,s),d=c(m,r);return n.useEffect(()=>(d.itemMap.set(s,{ref:s,...a}),()=>void d.itemMap.delete(s))),(0,i.jsx)(u,{[v]:"",ref:f,children:o})});return b.displayName=m,[{Provider:f,Slot:p,ItemSlot:b},function(t){let r=c(e+"CollectionConsumer",t);return n.useCallback(()=>{let e=r.collectionRef.current;if(!e)return[];let t=Array.from(e.querySelectorAll("[".concat(v,"]")));return Array.from(r.itemMap.values()).sort((e,r)=>t.indexOf(e.ref.current)-t.indexOf(r.ref.current))},[r.collectionRef,r.itemMap])},o]}(g),[C,j]=(0,a.b)(g,[x]),[M,F]=C(g),E=n.forwardRef((e,t)=>(0,i.jsx)(h.Provider,{scope:e.__scopeRovingFocusGroup,children:(0,i.jsx)(h.Slot,{scope:e.__scopeRovingFocusGroup,children:(0,i.jsx)(I,{...e,ref:t})})}));E.displayName=g;var I=n.forwardRef((e,t)=>{let{__scopeRovingFocusGroup:r,orientation:a,loop:u=!1,dir:s,currentTabStopId:c,defaultCurrentTabStopId:f,onCurrentTabStopIdChange:d,onEntryFocus:g,preventScrollOnEntryFocus:h=!1,...x}=e,C=n.useRef(null),j=(0,l.e)(t,C),F=(0,b.gm)(s),[E=null,I]=(0,v.T)({prop:c,defaultProp:f,onChange:d}),[A,D]=n.useState(!1),T=(0,m.W)(g),k=R(r),N=n.useRef(!1),[P,K]=n.useState(0);return n.useEffect(()=>{let e=C.current;if(e)return e.addEventListener(y,T),()=>e.removeEventListener(y,T)},[T]),(0,i.jsx)(M,{scope:r,orientation:a,dir:F,loop:u,currentTabStopId:E,onItemFocus:n.useCallback(e=>I(e),[I]),onItemShiftTab:n.useCallback(()=>D(!0),[]),onFocusableItemAdd:n.useCallback(()=>K(e=>e+1),[]),onFocusableItemRemove:n.useCallback(()=>K(e=>e-1),[]),children:(0,i.jsx)(p.div,{tabIndex:A||0===P?-1:0,"data-orientation":a,...x,ref:j,style:{outline:"none",...e.style},onMouseDown:(0,o.M)(e.onMouseDown,()=>{N.current=!0}),onFocus:(0,o.M)(e.onFocus,e=>{let t=!N.current;if(e.target===e.currentTarget&&t&&!A){let t=new CustomEvent(y,w);if(e.currentTarget.dispatchEvent(t),!t.defaultPrevented){let e=k().filter(e=>e.focusable);S([e.find(e=>e.active),e.find(e=>e.id===E),...e].filter(Boolean).map(e=>e.ref.current),h)}}N.current=!1}),onBlur:(0,o.M)(e.onBlur,()=>D(!1))})})}),A="RovingFocusGroupItem",D=n.forwardRef((e,t)=>{let{__scopeRovingFocusGroup:r,focusable:a=!0,active:l=!1,tabStopId:u,...s}=e,c=(0,d.M)(),f=u||c,m=F(A,r),v=m.currentTabStopId===f,b=R(r),{onFocusableItemAdd:y,onFocusableItemRemove:w}=m;return n.useEffect(()=>{if(a)return y(),()=>w()},[a,y,w]),(0,i.jsx)(h.ItemSlot,{scope:r,id:f,focusable:a,active:l,children:(0,i.jsx)(p.span,{tabIndex:v?0:-1,"data-orientation":m.orientation,...s,ref:t,onMouseDown:(0,o.M)(e.onMouseDown,e=>{a?m.onItemFocus(f):e.preventDefault()}),onFocus:(0,o.M)(e.onFocus,()=>m.onItemFocus(f)),onKeyDown:(0,o.M)(e.onKeyDown,e=>{if("Tab"===e.key&&e.shiftKey){m.onItemShiftTab();return}if(e.target!==e.currentTarget)return;let t=function(e,t,r){var n;let o=(n=e.key,"rtl"!==r?n:"ArrowLeft"===n?"ArrowRight":"ArrowRight"===n?"ArrowLeft":n);if(!("vertical"===t&&["ArrowLeft","ArrowRight"].includes(o))&&!("horizontal"===t&&["ArrowUp","ArrowDown"].includes(o)))return T[o]}(e,m.orientation,m.dir);if(void 0!==t){if(e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return;e.preventDefault();let o=b().filter(e=>e.focusable).map(e=>e.ref.current);if("last"===t)o.reverse();else if("prev"===t||"next"===t){var r,n;"prev"===t&&o.reverse();let a=o.indexOf(e.currentTarget);o=m.loop?(r=o,n=a+1,r.map((e,t)=>r[(n+t)%r.length])):o.slice(a+1)}setTimeout(()=>S(o))}})})})});D.displayName=A;var T={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function S(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=document.activeElement;for(let n of e)if(n===r||(n.focus({preventScroll:t}),document.activeElement!==r))return}var k=r(31383),N="Tabs",[P,K]=(0,a.b)(N,[j]),V=j(),[_,L]=P(N),O=n.forwardRef((e,t)=>{let{__scopeTabs:r,value:n,onValueChange:o,defaultValue:a,orientation:l="horizontal",dir:u,activationMode:s="automatic",...c}=e,f=(0,b.gm)(u),[m,y]=(0,v.T)({prop:n,onChange:o,defaultProp:a});return(0,i.jsx)(_,{scope:r,baseId:(0,d.M)(),value:m,onValueChange:y,orientation:l,dir:f,activationMode:s,children:(0,i.jsx)(p.div,{dir:f,"data-orientation":l,...c,ref:t})})});O.displayName=N;var G="TabsList",W=n.forwardRef((e,t)=>{let{__scopeTabs:r,loop:n=!0,...o}=e,a=L(G,r),l=V(r);return(0,i.jsx)(E,{asChild:!0,...l,orientation:a.orientation,dir:a.dir,loop:n,children:(0,i.jsx)(p.div,{role:"tablist","aria-orientation":a.orientation,...o,ref:t})})});W.displayName=G;var z="TabsTrigger",B=n.forwardRef((e,t)=>{let{__scopeTabs:r,value:n,disabled:a=!1,...l}=e,u=L(z,r),s=V(r),c=q(u.baseId,n),f=H(u.baseId,n),d=n===u.value;return(0,i.jsx)(D,{asChild:!0,...s,focusable:!a,active:d,children:(0,i.jsx)(p.button,{type:"button",role:"tab","aria-selected":d,"aria-controls":f,"data-state":d?"active":"inactive","data-disabled":a?"":void 0,disabled:a,id:c,...l,ref:t,onMouseDown:(0,o.M)(e.onMouseDown,e=>{a||0!==e.button||!1!==e.ctrlKey?e.preventDefault():u.onValueChange(n)}),onKeyDown:(0,o.M)(e.onKeyDown,e=>{[" ","Enter"].includes(e.key)&&u.onValueChange(n)}),onFocus:(0,o.M)(e.onFocus,()=>{let e="manual"!==u.activationMode;d||a||!e||u.onValueChange(n)})})})});B.displayName=z;var U="TabsContent",Z=n.forwardRef((e,t)=>{let{__scopeTabs:r,value:o,forceMount:a,children:l,...u}=e,s=L(U,r),c=q(s.baseId,o),f=H(s.baseId,o),d=o===s.value,m=n.useRef(d);return n.useEffect(()=>{let e=requestAnimationFrame(()=>m.current=!1);return()=>cancelAnimationFrame(e)},[]),(0,i.jsx)(k.z,{present:a||d,children:r=>{let{present:n}=r;return(0,i.jsx)(p.div,{"data-state":d?"active":"inactive","data-orientation":s.orientation,role:"tabpanel","aria-labelledby":c,hidden:!n,id:f,tabIndex:0,...u,ref:t,style:{...e.style,animationDuration:m.current?"0s":void 0},children:n&&l})}})});function q(e,t){return"".concat(e,"-trigger-").concat(t)}function H(e,t){return"".concat(e,"-content-").concat(t)}Z.displayName=U;var Y=O,$=W,J=B,Q=Z}}]);