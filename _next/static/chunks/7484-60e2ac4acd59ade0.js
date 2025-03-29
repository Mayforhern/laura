"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7484],{87592:function(e,n,r){r.d(n,{Z:function(){return t}});/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let t=(0,r(78030).Z)("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]])},28165:function(e,n,r){r.d(n,{Z:function(){return t}});/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let t=(0,r(78030).Z)("Circle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]])},50129:function(e,n,r){r.d(n,{oC:function(){return ng},VY:function(){return np},ZA:function(){return nv},ck:function(){return nm},wU:function(){return nx},__:function(){return nh},Uv:function(){return nf},Ee:function(){return nw},Rk:function(){return ny},fC:function(){return nd},Z0:function(){return nb},Tr:function(){return nM},tu:function(){return nD},fF:function(){return nC},xz:function(){return nc}});var t,o=r(2265),a=r(78149),u=r(1584),i=r(98324),l=r(91715),s=r(25171),d=r(90976),c=r(87513),f=r(75137),p=r(66486),v=r(57437),h="dismissableLayer.update",m=o.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),g=o.forwardRef((e,n)=>{var r,i;let{disableOutsidePointerEvents:l=!1,onEscapeKeyDown:d,onPointerDownOutside:c,onFocusOutside:g,onInteractOutside:x,onDismiss:b,...M}=e,C=o.useContext(m),[D,E]=o.useState(null),R=null!==(i=null==D?void 0:D.ownerDocument)&&void 0!==i?i:null===(r=globalThis)||void 0===r?void 0:r.document,[,j]=o.useState({}),k=(0,u.e)(n,e=>E(e)),P=Array.from(C.layers),[_]=[...C.layersWithOutsidePointerEventsDisabled].slice(-1),T=P.indexOf(_),I=D?P.indexOf(D):-1,L=C.layersWithOutsidePointerEventsDisabled.size>0,F=I>=T,O=function(e){var n;let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null===(n=globalThis)||void 0===n?void 0:n.document,t=(0,f.W)(e),a=o.useRef(!1),u=o.useRef(()=>{});return o.useEffect(()=>{let e=e=>{if(e.target&&!a.current){let n=function(){y("dismissableLayer.pointerDownOutside",t,o,{discrete:!0})},o={originalEvent:e};"touch"===e.pointerType?(r.removeEventListener("click",u.current),u.current=n,r.addEventListener("click",u.current,{once:!0})):n()}else r.removeEventListener("click",u.current);a.current=!1},n=window.setTimeout(()=>{r.addEventListener("pointerdown",e)},0);return()=>{window.clearTimeout(n),r.removeEventListener("pointerdown",e),r.removeEventListener("click",u.current)}},[r,t]),{onPointerDownCapture:()=>a.current=!0}}(e=>{let n=e.target,r=[...C.branches].some(e=>e.contains(n));!F||r||(null==c||c(e),null==x||x(e),e.defaultPrevented||null==b||b())},R),S=function(e){var n;let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null===(n=globalThis)||void 0===n?void 0:n.document,t=(0,f.W)(e),a=o.useRef(!1);return o.useEffect(()=>{let e=e=>{e.target&&!a.current&&y("dismissableLayer.focusOutside",t,{originalEvent:e},{discrete:!1})};return r.addEventListener("focusin",e),()=>r.removeEventListener("focusin",e)},[r,t]),{onFocusCapture:()=>a.current=!0,onBlurCapture:()=>a.current=!1}}(e=>{let n=e.target;[...C.branches].some(e=>e.contains(n))||(null==g||g(e),null==x||x(e),e.defaultPrevented||null==b||b())},R);return(0,p.e)(e=>{I!==C.layers.size-1||(null==d||d(e),!e.defaultPrevented&&b&&(e.preventDefault(),b()))},R),o.useEffect(()=>{if(D)return l&&(0===C.layersWithOutsidePointerEventsDisabled.size&&(t=R.body.style.pointerEvents,R.body.style.pointerEvents="none"),C.layersWithOutsidePointerEventsDisabled.add(D)),C.layers.add(D),w(),()=>{l&&1===C.layersWithOutsidePointerEventsDisabled.size&&(R.body.style.pointerEvents=t)}},[D,R,l,C]),o.useEffect(()=>()=>{D&&(C.layers.delete(D),C.layersWithOutsidePointerEventsDisabled.delete(D),w())},[D,C]),o.useEffect(()=>{let e=()=>j({});return document.addEventListener(h,e),()=>document.removeEventListener(h,e)},[]),(0,v.jsx)(s.WV.div,{...M,ref:k,style:{pointerEvents:L?F?"auto":"none":void 0,...e.style},onFocusCapture:(0,a.M)(e.onFocusCapture,S.onFocusCapture),onBlurCapture:(0,a.M)(e.onBlurCapture,S.onBlurCapture),onPointerDownCapture:(0,a.M)(e.onPointerDownCapture,O.onPointerDownCapture)})});function w(){let e=new CustomEvent(h);document.dispatchEvent(e)}function y(e,n,r,t){let{discrete:o}=t,a=r.originalEvent.target,u=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:r});n&&a.addEventListener(e,n,{once:!0}),o?(0,s.jH)(a,u):a.dispatchEvent(u)}g.displayName="DismissableLayer",o.forwardRef((e,n)=>{let r=o.useContext(m),t=o.useRef(null),a=(0,u.e)(n,t);return o.useEffect(()=>{let e=t.current;if(e)return r.branches.add(e),()=>{r.branches.delete(e)}},[r.branches]),(0,v.jsx)(s.WV.div,{...e,ref:a})}).displayName="DismissableLayerBranch";var x=r(20589),b=r(80467),M=r(53201),C=r(49171),D=r(56935),E=r(31383),R="rovingFocusGroup.onEntryFocus",j={bubbles:!1,cancelable:!0},k="RovingFocusGroup",[P,_,T]=(0,d.B)(k),[I,L]=(0,i.b)(k,[T]),[F,O]=I(k),S=o.forwardRef((e,n)=>(0,v.jsx)(P.Provider,{scope:e.__scopeRovingFocusGroup,children:(0,v.jsx)(P.Slot,{scope:e.__scopeRovingFocusGroup,children:(0,v.jsx)(N,{...e,ref:n})})}));S.displayName=k;var N=o.forwardRef((e,n)=>{let{__scopeRovingFocusGroup:r,orientation:t,loop:i=!1,dir:d,currentTabStopId:p,defaultCurrentTabStopId:h,onCurrentTabStopIdChange:m,onEntryFocus:g,preventScrollOnEntryFocus:w=!1,...y}=e,x=o.useRef(null),b=(0,u.e)(n,x),M=(0,c.gm)(d),[C=null,D]=(0,l.T)({prop:p,defaultProp:h,onChange:m}),[E,k]=o.useState(!1),P=(0,f.W)(g),T=_(r),I=o.useRef(!1),[L,O]=o.useState(0);return o.useEffect(()=>{let e=x.current;if(e)return e.addEventListener(R,P),()=>e.removeEventListener(R,P)},[P]),(0,v.jsx)(F,{scope:r,orientation:t,dir:M,loop:i,currentTabStopId:C,onItemFocus:o.useCallback(e=>D(e),[D]),onItemShiftTab:o.useCallback(()=>k(!0),[]),onFocusableItemAdd:o.useCallback(()=>O(e=>e+1),[]),onFocusableItemRemove:o.useCallback(()=>O(e=>e-1),[]),children:(0,v.jsx)(s.WV.div,{tabIndex:E||0===L?-1:0,"data-orientation":t,...y,ref:b,style:{outline:"none",...e.style},onMouseDown:(0,a.M)(e.onMouseDown,()=>{I.current=!0}),onFocus:(0,a.M)(e.onFocus,e=>{let n=!I.current;if(e.target===e.currentTarget&&n&&!E){let n=new CustomEvent(R,j);if(e.currentTarget.dispatchEvent(n),!n.defaultPrevented){let e=T().filter(e=>e.focusable);V([e.find(e=>e.active),e.find(e=>e.id===C),...e].filter(Boolean).map(e=>e.ref.current),w)}}I.current=!1}),onBlur:(0,a.M)(e.onBlur,()=>k(!1))})})}),A="RovingFocusGroupItem",K=o.forwardRef((e,n)=>{let{__scopeRovingFocusGroup:r,focusable:t=!0,active:u=!1,tabStopId:i,...l}=e,d=(0,M.M)(),c=i||d,f=O(A,r),p=f.currentTabStopId===c,h=_(r),{onFocusableItemAdd:m,onFocusableItemRemove:g}=f;return o.useEffect(()=>{if(t)return m(),()=>g()},[t,m,g]),(0,v.jsx)(P.ItemSlot,{scope:r,id:c,focusable:t,active:u,children:(0,v.jsx)(s.WV.span,{tabIndex:p?0:-1,"data-orientation":f.orientation,...l,ref:n,onMouseDown:(0,a.M)(e.onMouseDown,e=>{t?f.onItemFocus(c):e.preventDefault()}),onFocus:(0,a.M)(e.onFocus,()=>f.onItemFocus(c)),onKeyDown:(0,a.M)(e.onKeyDown,e=>{if("Tab"===e.key&&e.shiftKey){f.onItemShiftTab();return}if(e.target!==e.currentTarget)return;let n=function(e,n,r){var t;let o=(t=e.key,"rtl"!==r?t:"ArrowLeft"===t?"ArrowRight":"ArrowRight"===t?"ArrowLeft":t);if(!("vertical"===n&&["ArrowLeft","ArrowRight"].includes(o))&&!("horizontal"===n&&["ArrowUp","ArrowDown"].includes(o)))return W[o]}(e,f.orientation,f.dir);if(void 0!==n){if(e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return;e.preventDefault();let o=h().filter(e=>e.focusable).map(e=>e.ref.current);if("last"===n)o.reverse();else if("prev"===n||"next"===n){var r,t;"prev"===n&&o.reverse();let a=o.indexOf(e.currentTarget);o=f.loop?(r=o,t=a+1,r.map((e,n)=>r[(t+n)%r.length])):o.slice(a+1)}setTimeout(()=>V(o))}})})})});K.displayName=A;var W={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function V(e){let n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=document.activeElement;for(let t of e)if(t===r||(t.focus({preventScroll:n}),document.activeElement!==r))return}var B=r(71538),G=r(78369),U=r(49418),z=["Enter"," "],Z=["ArrowUp","PageDown","End"],X=["ArrowDown","PageUp","Home",...Z],H={ltr:[...z,"ArrowRight"],rtl:[...z,"ArrowLeft"]},Y={ltr:["ArrowLeft"],rtl:["ArrowRight"]},q="Menu",[J,Q,$]=(0,d.B)(q),[ee,en]=(0,i.b)(q,[$,C.D7,L]),er=(0,C.D7)(),et=L(),[eo,ea]=ee(q),[eu,ei]=ee(q),el=e=>{let{__scopeMenu:n,open:r=!1,children:t,dir:a,onOpenChange:u,modal:i=!0}=e,l=er(n),[s,d]=o.useState(null),p=o.useRef(!1),h=(0,f.W)(u),m=(0,c.gm)(a);return o.useEffect(()=>{let e=()=>{p.current=!0,document.addEventListener("pointerdown",n,{capture:!0,once:!0}),document.addEventListener("pointermove",n,{capture:!0,once:!0})},n=()=>p.current=!1;return document.addEventListener("keydown",e,{capture:!0}),()=>{document.removeEventListener("keydown",e,{capture:!0}),document.removeEventListener("pointerdown",n,{capture:!0}),document.removeEventListener("pointermove",n,{capture:!0})}},[]),(0,v.jsx)(C.fC,{...l,children:(0,v.jsx)(eo,{scope:n,open:r,onOpenChange:h,content:s,onContentChange:d,children:(0,v.jsx)(eu,{scope:n,onClose:o.useCallback(()=>h(!1),[h]),isUsingKeyboardRef:p,dir:m,modal:i,children:t})})})};el.displayName=q;var es=o.forwardRef((e,n)=>{let{__scopeMenu:r,...t}=e,o=er(r);return(0,v.jsx)(C.ee,{...o,...t,ref:n})});es.displayName="MenuAnchor";var ed="MenuPortal",[ec,ef]=ee(ed,{forceMount:void 0}),ep=e=>{let{__scopeMenu:n,forceMount:r,children:t,container:o}=e,a=ea(ed,n);return(0,v.jsx)(ec,{scope:n,forceMount:r,children:(0,v.jsx)(E.z,{present:r||a.open,children:(0,v.jsx)(D.h,{asChild:!0,container:o,children:t})})})};ep.displayName=ed;var ev="MenuContent",[eh,em]=ee(ev),eg=o.forwardRef((e,n)=>{let r=ef(ev,e.__scopeMenu),{forceMount:t=r.forceMount,...o}=e,a=ea(ev,e.__scopeMenu),u=ei(ev,e.__scopeMenu);return(0,v.jsx)(J.Provider,{scope:e.__scopeMenu,children:(0,v.jsx)(E.z,{present:t||a.open,children:(0,v.jsx)(J.Slot,{scope:e.__scopeMenu,children:u.modal?(0,v.jsx)(ew,{...o,ref:n}):(0,v.jsx)(ey,{...o,ref:n})})})})}),ew=o.forwardRef((e,n)=>{let r=ea(ev,e.__scopeMenu),t=o.useRef(null),i=(0,u.e)(n,t);return o.useEffect(()=>{let e=t.current;if(e)return(0,G.Ry)(e)},[]),(0,v.jsx)(ex,{...e,ref:i,trapFocus:r.open,disableOutsidePointerEvents:r.open,disableOutsideScroll:!0,onFocusOutside:(0,a.M)(e.onFocusOutside,e=>e.preventDefault(),{checkForDefaultPrevented:!1}),onDismiss:()=>r.onOpenChange(!1)})}),ey=o.forwardRef((e,n)=>{let r=ea(ev,e.__scopeMenu);return(0,v.jsx)(ex,{...e,ref:n,trapFocus:!1,disableOutsidePointerEvents:!1,disableOutsideScroll:!1,onDismiss:()=>r.onOpenChange(!1)})}),ex=o.forwardRef((e,n)=>{let{__scopeMenu:r,loop:t=!1,trapFocus:i,onOpenAutoFocus:l,onCloseAutoFocus:s,disableOutsidePointerEvents:d,onEntryFocus:c,onEscapeKeyDown:f,onPointerDownOutside:p,onFocusOutside:h,onInteractOutside:m,onDismiss:w,disableOutsideScroll:y,...M}=e,D=ea(ev,r),E=ei(ev,r),R=er(r),j=et(r),k=Q(r),[P,_]=o.useState(null),T=o.useRef(null),I=(0,u.e)(n,T,D.onContentChange),L=o.useRef(0),F=o.useRef(""),O=o.useRef(0),N=o.useRef(null),A=o.useRef("right"),K=o.useRef(0),W=y?U.Z:o.Fragment,V=y?{as:B.g7,allowPinchZoom:!0}:void 0,G=e=>{var n,r;let t=F.current+e,o=k().filter(e=>!e.disabled),a=document.activeElement,u=null===(n=o.find(e=>e.ref.current===a))||void 0===n?void 0:n.textValue,i=function(e,n,r){var t;let o=n.length>1&&Array.from(n).every(e=>e===n[0])?n[0]:n,a=(t=Math.max(r?e.indexOf(r):-1,0),e.map((n,r)=>e[(t+r)%e.length]));1===o.length&&(a=a.filter(e=>e!==r));let u=a.find(e=>e.toLowerCase().startsWith(o.toLowerCase()));return u!==r?u:void 0}(o.map(e=>e.textValue),t,u),l=null===(r=o.find(e=>e.textValue===i))||void 0===r?void 0:r.ref.current;!function e(n){F.current=n,window.clearTimeout(L.current),""!==n&&(L.current=window.setTimeout(()=>e(""),1e3))}(t),l&&setTimeout(()=>l.focus())};o.useEffect(()=>()=>window.clearTimeout(L.current),[]),(0,x.EW)();let z=o.useCallback(e=>{var n,r,t;return A.current===(null===(n=N.current)||void 0===n?void 0:n.side)&&!!(t=null===(r=N.current)||void 0===r?void 0:r.area)&&function(e,n){let{x:r,y:t}=e,o=!1;for(let e=0,a=n.length-1;e<n.length;a=e++){let u=n[e].x,i=n[e].y,l=n[a].x,s=n[a].y;i>t!=s>t&&r<(l-u)*(t-i)/(s-i)+u&&(o=!o)}return o}({x:e.clientX,y:e.clientY},t)},[]);return(0,v.jsx)(eh,{scope:r,searchRef:F,onItemEnter:o.useCallback(e=>{z(e)&&e.preventDefault()},[z]),onItemLeave:o.useCallback(e=>{var n;z(e)||(null===(n=T.current)||void 0===n||n.focus(),_(null))},[z]),onTriggerLeave:o.useCallback(e=>{z(e)&&e.preventDefault()},[z]),pointerGraceTimerRef:O,onPointerGraceIntentChange:o.useCallback(e=>{N.current=e},[]),children:(0,v.jsx)(W,{...V,children:(0,v.jsx)(b.M,{asChild:!0,trapped:i,onMountAutoFocus:(0,a.M)(l,e=>{var n;e.preventDefault(),null===(n=T.current)||void 0===n||n.focus({preventScroll:!0})}),onUnmountAutoFocus:s,children:(0,v.jsx)(g,{asChild:!0,disableOutsidePointerEvents:d,onEscapeKeyDown:f,onPointerDownOutside:p,onFocusOutside:h,onInteractOutside:m,onDismiss:w,children:(0,v.jsx)(S,{asChild:!0,...j,dir:E.dir,orientation:"vertical",loop:t,currentTabStopId:P,onCurrentTabStopIdChange:_,onEntryFocus:(0,a.M)(c,e=>{E.isUsingKeyboardRef.current||e.preventDefault()}),preventScrollOnEntryFocus:!0,children:(0,v.jsx)(C.VY,{role:"menu","aria-orientation":"vertical","data-state":eH(D.open),"data-radix-menu-content":"",dir:E.dir,...R,...M,ref:I,style:{outline:"none",...M.style},onKeyDown:(0,a.M)(M.onKeyDown,e=>{let n=e.target.closest("[data-radix-menu-content]")===e.currentTarget,r=e.ctrlKey||e.altKey||e.metaKey,t=1===e.key.length;n&&("Tab"===e.key&&e.preventDefault(),!r&&t&&G(e.key));let o=T.current;if(e.target!==o||!X.includes(e.key))return;e.preventDefault();let a=k().filter(e=>!e.disabled).map(e=>e.ref.current);Z.includes(e.key)&&a.reverse(),function(e){let n=document.activeElement;for(let r of e)if(r===n||(r.focus(),document.activeElement!==n))return}(a)}),onBlur:(0,a.M)(e.onBlur,e=>{e.currentTarget.contains(e.target)||(window.clearTimeout(L.current),F.current="")}),onPointerMove:(0,a.M)(e.onPointerMove,eJ(e=>{let n=e.target,r=K.current!==e.clientX;if(e.currentTarget.contains(n)&&r){let n=e.clientX>K.current?"right":"left";A.current=n,K.current=e.clientX}}))})})})})})})});eg.displayName=ev;var eb=o.forwardRef((e,n)=>{let{__scopeMenu:r,...t}=e;return(0,v.jsx)(s.WV.div,{role:"group",...t,ref:n})});eb.displayName="MenuGroup";var eM=o.forwardRef((e,n)=>{let{__scopeMenu:r,...t}=e;return(0,v.jsx)(s.WV.div,{...t,ref:n})});eM.displayName="MenuLabel";var eC="MenuItem",eD="menu.itemSelect",eE=o.forwardRef((e,n)=>{let{disabled:r=!1,onSelect:t,...i}=e,l=o.useRef(null),d=ei(eC,e.__scopeMenu),c=em(eC,e.__scopeMenu),f=(0,u.e)(n,l),p=o.useRef(!1);return(0,v.jsx)(eR,{...i,ref:f,disabled:r,onClick:(0,a.M)(e.onClick,()=>{let e=l.current;if(!r&&e){let n=new CustomEvent(eD,{bubbles:!0,cancelable:!0});e.addEventListener(eD,e=>null==t?void 0:t(e),{once:!0}),(0,s.jH)(e,n),n.defaultPrevented?p.current=!1:d.onClose()}}),onPointerDown:n=>{var r;null===(r=e.onPointerDown)||void 0===r||r.call(e,n),p.current=!0},onPointerUp:(0,a.M)(e.onPointerUp,e=>{var n;p.current||null===(n=e.currentTarget)||void 0===n||n.click()}),onKeyDown:(0,a.M)(e.onKeyDown,e=>{let n=""!==c.searchRef.current;!r&&(!n||" "!==e.key)&&z.includes(e.key)&&(e.currentTarget.click(),e.preventDefault())})})});eE.displayName=eC;var eR=o.forwardRef((e,n)=>{let{__scopeMenu:r,disabled:t=!1,textValue:i,...l}=e,d=em(eC,r),c=et(r),f=o.useRef(null),p=(0,u.e)(n,f),[h,m]=o.useState(!1),[g,w]=o.useState("");return o.useEffect(()=>{let e=f.current;if(e){var n;w((null!==(n=e.textContent)&&void 0!==n?n:"").trim())}},[l.children]),(0,v.jsx)(J.ItemSlot,{scope:r,disabled:t,textValue:null!=i?i:g,children:(0,v.jsx)(K,{asChild:!0,...c,focusable:!t,children:(0,v.jsx)(s.WV.div,{role:"menuitem","data-highlighted":h?"":void 0,"aria-disabled":t||void 0,"data-disabled":t?"":void 0,...l,ref:p,onPointerMove:(0,a.M)(e.onPointerMove,eJ(e=>{t?d.onItemLeave(e):(d.onItemEnter(e),e.defaultPrevented||e.currentTarget.focus({preventScroll:!0}))})),onPointerLeave:(0,a.M)(e.onPointerLeave,eJ(e=>d.onItemLeave(e))),onFocus:(0,a.M)(e.onFocus,()=>m(!0)),onBlur:(0,a.M)(e.onBlur,()=>m(!1))})})})}),ej=o.forwardRef((e,n)=>{let{checked:r=!1,onCheckedChange:t,...o}=e;return(0,v.jsx)(eO,{scope:e.__scopeMenu,checked:r,children:(0,v.jsx)(eE,{role:"menuitemcheckbox","aria-checked":eY(r)?"mixed":r,...o,ref:n,"data-state":eq(r),onSelect:(0,a.M)(o.onSelect,()=>null==t?void 0:t(!!eY(r)||!r),{checkForDefaultPrevented:!1})})})});ej.displayName="MenuCheckboxItem";var ek="MenuRadioGroup",[eP,e_]=ee(ek,{value:void 0,onValueChange:()=>{}}),eT=o.forwardRef((e,n)=>{let{value:r,onValueChange:t,...o}=e,a=(0,f.W)(t);return(0,v.jsx)(eP,{scope:e.__scopeMenu,value:r,onValueChange:a,children:(0,v.jsx)(eb,{...o,ref:n})})});eT.displayName=ek;var eI="MenuRadioItem",eL=o.forwardRef((e,n)=>{let{value:r,...t}=e,o=e_(eI,e.__scopeMenu),u=r===o.value;return(0,v.jsx)(eO,{scope:e.__scopeMenu,checked:u,children:(0,v.jsx)(eE,{role:"menuitemradio","aria-checked":u,...t,ref:n,"data-state":eq(u),onSelect:(0,a.M)(t.onSelect,()=>{var e;return null===(e=o.onValueChange)||void 0===e?void 0:e.call(o,r)},{checkForDefaultPrevented:!1})})})});eL.displayName=eI;var eF="MenuItemIndicator",[eO,eS]=ee(eF,{checked:!1}),eN=o.forwardRef((e,n)=>{let{__scopeMenu:r,forceMount:t,...o}=e,a=eS(eF,r);return(0,v.jsx)(E.z,{present:t||eY(a.checked)||!0===a.checked,children:(0,v.jsx)(s.WV.span,{...o,ref:n,"data-state":eq(a.checked)})})});eN.displayName=eF;var eA=o.forwardRef((e,n)=>{let{__scopeMenu:r,...t}=e;return(0,v.jsx)(s.WV.div,{role:"separator","aria-orientation":"horizontal",...t,ref:n})});eA.displayName="MenuSeparator";var eK=o.forwardRef((e,n)=>{let{__scopeMenu:r,...t}=e,o=er(r);return(0,v.jsx)(C.Eh,{...o,...t,ref:n})});eK.displayName="MenuArrow";var eW="MenuSub",[eV,eB]=ee(eW),eG=e=>{let{__scopeMenu:n,children:r,open:t=!1,onOpenChange:a}=e,u=ea(eW,n),i=er(n),[l,s]=o.useState(null),[d,c]=o.useState(null),p=(0,f.W)(a);return o.useEffect(()=>(!1===u.open&&p(!1),()=>p(!1)),[u.open,p]),(0,v.jsx)(C.fC,{...i,children:(0,v.jsx)(eo,{scope:n,open:t,onOpenChange:p,content:d,onContentChange:c,children:(0,v.jsx)(eV,{scope:n,contentId:(0,M.M)(),triggerId:(0,M.M)(),trigger:l,onTriggerChange:s,children:r})})})};eG.displayName=eW;var eU="MenuSubTrigger",ez=o.forwardRef((e,n)=>{let r=ea(eU,e.__scopeMenu),t=ei(eU,e.__scopeMenu),i=eB(eU,e.__scopeMenu),l=em(eU,e.__scopeMenu),s=o.useRef(null),{pointerGraceTimerRef:d,onPointerGraceIntentChange:c}=l,f={__scopeMenu:e.__scopeMenu},p=o.useCallback(()=>{s.current&&window.clearTimeout(s.current),s.current=null},[]);return o.useEffect(()=>p,[p]),o.useEffect(()=>{let e=d.current;return()=>{window.clearTimeout(e),c(null)}},[d,c]),(0,v.jsx)(es,{asChild:!0,...f,children:(0,v.jsx)(eR,{id:i.triggerId,"aria-haspopup":"menu","aria-expanded":r.open,"aria-controls":i.contentId,"data-state":eH(r.open),...e,ref:(0,u.F)(n,i.onTriggerChange),onClick:n=>{var t;null===(t=e.onClick)||void 0===t||t.call(e,n),e.disabled||n.defaultPrevented||(n.currentTarget.focus(),r.open||r.onOpenChange(!0))},onPointerMove:(0,a.M)(e.onPointerMove,eJ(n=>{l.onItemEnter(n),n.defaultPrevented||e.disabled||r.open||s.current||(l.onPointerGraceIntentChange(null),s.current=window.setTimeout(()=>{r.onOpenChange(!0),p()},100))})),onPointerLeave:(0,a.M)(e.onPointerLeave,eJ(e=>{var n,t;p();let o=null===(n=r.content)||void 0===n?void 0:n.getBoundingClientRect();if(o){let n=null===(t=r.content)||void 0===t?void 0:t.dataset.side,a="right"===n,u=o[a?"left":"right"],i=o[a?"right":"left"];l.onPointerGraceIntentChange({area:[{x:e.clientX+(a?-5:5),y:e.clientY},{x:u,y:o.top},{x:i,y:o.top},{x:i,y:o.bottom},{x:u,y:o.bottom}],side:n}),window.clearTimeout(d.current),d.current=window.setTimeout(()=>l.onPointerGraceIntentChange(null),300)}else{if(l.onTriggerLeave(e),e.defaultPrevented)return;l.onPointerGraceIntentChange(null)}})),onKeyDown:(0,a.M)(e.onKeyDown,n=>{let o=""!==l.searchRef.current;if(!e.disabled&&(!o||" "!==n.key)&&H[t.dir].includes(n.key)){var a;r.onOpenChange(!0),null===(a=r.content)||void 0===a||a.focus(),n.preventDefault()}})})})});ez.displayName=eU;var eZ="MenuSubContent",eX=o.forwardRef((e,n)=>{let r=ef(ev,e.__scopeMenu),{forceMount:t=r.forceMount,...i}=e,l=ea(ev,e.__scopeMenu),s=ei(ev,e.__scopeMenu),d=eB(eZ,e.__scopeMenu),c=o.useRef(null),f=(0,u.e)(n,c);return(0,v.jsx)(J.Provider,{scope:e.__scopeMenu,children:(0,v.jsx)(E.z,{present:t||l.open,children:(0,v.jsx)(J.Slot,{scope:e.__scopeMenu,children:(0,v.jsx)(ex,{id:d.contentId,"aria-labelledby":d.triggerId,...i,ref:f,align:"start",side:"rtl"===s.dir?"left":"right",disableOutsidePointerEvents:!1,disableOutsideScroll:!1,trapFocus:!1,onOpenAutoFocus:e=>{var n;s.isUsingKeyboardRef.current&&(null===(n=c.current)||void 0===n||n.focus()),e.preventDefault()},onCloseAutoFocus:e=>e.preventDefault(),onFocusOutside:(0,a.M)(e.onFocusOutside,e=>{e.target!==d.trigger&&l.onOpenChange(!1)}),onEscapeKeyDown:(0,a.M)(e.onEscapeKeyDown,e=>{s.onClose(),e.preventDefault()}),onKeyDown:(0,a.M)(e.onKeyDown,e=>{let n=e.currentTarget.contains(e.target),r=Y[s.dir].includes(e.key);if(n&&r){var t;l.onOpenChange(!1),null===(t=d.trigger)||void 0===t||t.focus(),e.preventDefault()}})})})})})});function eH(e){return e?"open":"closed"}function eY(e){return"indeterminate"===e}function eq(e){return eY(e)?"indeterminate":e?"checked":"unchecked"}function eJ(e){return n=>"mouse"===n.pointerType?e(n):void 0}eX.displayName=eZ;var eQ="DropdownMenu",[e$,e0]=(0,i.b)(eQ,[en]),e1=en(),[e7,e5]=e$(eQ),e8=e=>{let{__scopeDropdownMenu:n,children:r,dir:t,open:a,defaultOpen:u,onOpenChange:i,modal:s=!0}=e,d=e1(n),c=o.useRef(null),[f=!1,p]=(0,l.T)({prop:a,defaultProp:u,onChange:i});return(0,v.jsx)(e7,{scope:n,triggerId:(0,M.M)(),triggerRef:c,contentId:(0,M.M)(),open:f,onOpenChange:p,onOpenToggle:o.useCallback(()=>p(e=>!e),[p]),modal:s,children:(0,v.jsx)(el,{...d,open:f,onOpenChange:p,dir:t,modal:s,children:r})})};e8.displayName=eQ;var e3="DropdownMenuTrigger",e6=o.forwardRef((e,n)=>{let{__scopeDropdownMenu:r,disabled:t=!1,...o}=e,i=e5(e3,r),l=e1(r);return(0,v.jsx)(es,{asChild:!0,...l,children:(0,v.jsx)(s.WV.button,{type:"button",id:i.triggerId,"aria-haspopup":"menu","aria-expanded":i.open,"aria-controls":i.open?i.contentId:void 0,"data-state":i.open?"open":"closed","data-disabled":t?"":void 0,disabled:t,...o,ref:(0,u.F)(n,i.triggerRef),onPointerDown:(0,a.M)(e.onPointerDown,e=>{t||0!==e.button||!1!==e.ctrlKey||(i.onOpenToggle(),i.open||e.preventDefault())}),onKeyDown:(0,a.M)(e.onKeyDown,e=>{!t&&(["Enter"," "].includes(e.key)&&i.onOpenToggle(),"ArrowDown"===e.key&&i.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(e.key)&&e.preventDefault())})})})});e6.displayName=e3;var e9=e=>{let{__scopeDropdownMenu:n,...r}=e,t=e1(n);return(0,v.jsx)(ep,{...t,...r})};e9.displayName="DropdownMenuPortal";var e2="DropdownMenuContent",e4=o.forwardRef((e,n)=>{let{__scopeDropdownMenu:r,...t}=e,u=e5(e2,r),i=e1(r),l=o.useRef(!1);return(0,v.jsx)(eg,{id:u.contentId,"aria-labelledby":u.triggerId,...i,...t,ref:n,onCloseAutoFocus:(0,a.M)(e.onCloseAutoFocus,e=>{var n;l.current||null===(n=u.triggerRef.current)||void 0===n||n.focus(),l.current=!1,e.preventDefault()}),onInteractOutside:(0,a.M)(e.onInteractOutside,e=>{let n=e.detail.originalEvent,r=0===n.button&&!0===n.ctrlKey,t=2===n.button||r;(!u.modal||t)&&(l.current=!0)}),style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});e4.displayName=e2;var ne=o.forwardRef((e,n)=>{let{__scopeDropdownMenu:r,...t}=e,o=e1(r);return(0,v.jsx)(eb,{...o,...t,ref:n})});ne.displayName="DropdownMenuGroup";var nn=o.forwardRef((e,n)=>{let{__scopeDropdownMenu:r,...t}=e,o=e1(r);return(0,v.jsx)(eM,{...o,...t,ref:n})});nn.displayName="DropdownMenuLabel";var nr=o.forwardRef((e,n)=>{let{__scopeDropdownMenu:r,...t}=e,o=e1(r);return(0,v.jsx)(eE,{...o,...t,ref:n})});nr.displayName="DropdownMenuItem";var nt=o.forwardRef((e,n)=>{let{__scopeDropdownMenu:r,...t}=e,o=e1(r);return(0,v.jsx)(ej,{...o,...t,ref:n})});nt.displayName="DropdownMenuCheckboxItem";var no=o.forwardRef((e,n)=>{let{__scopeDropdownMenu:r,...t}=e,o=e1(r);return(0,v.jsx)(eT,{...o,...t,ref:n})});no.displayName="DropdownMenuRadioGroup";var na=o.forwardRef((e,n)=>{let{__scopeDropdownMenu:r,...t}=e,o=e1(r);return(0,v.jsx)(eL,{...o,...t,ref:n})});na.displayName="DropdownMenuRadioItem";var nu=o.forwardRef((e,n)=>{let{__scopeDropdownMenu:r,...t}=e,o=e1(r);return(0,v.jsx)(eN,{...o,...t,ref:n})});nu.displayName="DropdownMenuItemIndicator";var ni=o.forwardRef((e,n)=>{let{__scopeDropdownMenu:r,...t}=e,o=e1(r);return(0,v.jsx)(eA,{...o,...t,ref:n})});ni.displayName="DropdownMenuSeparator",o.forwardRef((e,n)=>{let{__scopeDropdownMenu:r,...t}=e,o=e1(r);return(0,v.jsx)(eK,{...o,...t,ref:n})}).displayName="DropdownMenuArrow";var nl=o.forwardRef((e,n)=>{let{__scopeDropdownMenu:r,...t}=e,o=e1(r);return(0,v.jsx)(ez,{...o,...t,ref:n})});nl.displayName="DropdownMenuSubTrigger";var ns=o.forwardRef((e,n)=>{let{__scopeDropdownMenu:r,...t}=e,o=e1(r);return(0,v.jsx)(eX,{...o,...t,ref:n,style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});ns.displayName="DropdownMenuSubContent";var nd=e8,nc=e6,nf=e9,np=e4,nv=ne,nh=nn,nm=nr,ng=nt,nw=no,ny=na,nx=nu,nb=ni,nM=e=>{let{__scopeDropdownMenu:n,children:r,open:t,onOpenChange:o,defaultOpen:a}=e,u=e1(n),[i=!1,s]=(0,l.T)({prop:t,defaultProp:a,onChange:o});return(0,v.jsx)(eG,{...u,open:i,onOpenChange:s,children:r})},nC=nl,nD=ns}}]);