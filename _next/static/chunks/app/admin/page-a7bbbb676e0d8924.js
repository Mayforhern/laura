(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3],{91536:function(e,t,s){Promise.resolve().then(s.bind(s,52914))},52914:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return x}});var r=s(57437),n=s(36013),a=s(3274),i=s(76780),l=s(11240),c=s(94207),o=s(12140),d=s(2265),u=s(35657),f=s(47412),m=s(50495);function x(){let[e,t]=(0,d.useState)(null),[s,x]=(0,d.useState)(!0),[p,h]=(0,d.useState)(null),[v,j]=(0,d.useState)(null),{toast:y}=(0,u.pm)(),g=async()=>{try{x(!0),h(null),j(null);let e=await fetch("/api/admin/users/count"),s=await e.json();if(!e.ok)throw Error("Users API error: ".concat(s.error," - ").concat(s.details||"No details available"));let[r,n,a,i]=await Promise.all([fetch("/api/admin/sessions/active"),fetch("/api/admin/support-groups/count"),fetch("/api/admin/analytics/weekly-growth"),fetch("/api/admin/activities/recent")]),[{count:l},{count:c},{percentage:o},{activities:d}]=await Promise.all([r.json(),n.json(),a.json(),i.json()]);t({totalUsers:s.count,activeUsers:l,supportGroups:c,weeklyGrowth:o,recentActivities:d})}catch(e){console.error("Error fetching dashboard stats:",e),h("Failed to load dashboard statistics"),j(e instanceof Error?e.message:"Unknown error"),y({title:"Error",description:"Failed to load dashboard statistics. Check console for details.",variant:"destructive"})}finally{x(!1)}};if((0,d.useEffect)(()=>{g();let e=setInterval(g,3e4);return()=>clearInterval(e)},[]),s)return(0,r.jsx)("div",{className:"container mx-auto py-8 px-4 min-h-[calc(100vh-4rem)] flex items-center justify-center",children:(0,r.jsxs)("div",{className:"flex flex-col items-center gap-4",children:[(0,r.jsx)(a.Z,{className:"h-8 w-8 animate-spin text-primary"}),(0,r.jsx)("p",{className:"text-sm text-muted-foreground",children:"Loading dashboard data..."})]})});if(p)return(0,r.jsxs)("div",{className:"container mx-auto py-8 px-4",children:[(0,r.jsxs)(f.bZ,{variant:"destructive",className:"mb-6",children:[(0,r.jsx)(i.Z,{className:"h-4 w-4"}),(0,r.jsx)(f.Cd,{children:"Error"}),(0,r.jsxs)(f.X,{children:[(0,r.jsx)("p",{children:p}),v&&(0,r.jsxs)("p",{className:"mt-2 text-sm opacity-80",children:["Details: ",v]})]})]}),(0,r.jsx)(m.z,{onClick:g,variant:"outline",className:"mt-4",children:"Retry"})]});let N=e||{totalUsers:0,activeUsers:0,supportGroups:0,weeklyGrowth:0,recentActivities:[]};return(0,r.jsxs)("div",{className:"container mx-auto py-8 px-4",children:[(0,r.jsxs)("div",{className:"space-y-0.5 mb-8",children:[(0,r.jsx)("h2",{className:"text-2xl font-bold tracking-tight",children:"Admin Dashboard"}),(0,r.jsx)("p",{className:"text-muted-foreground",children:"Overview of platform statistics and recent activity"})]}),(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",children:[(0,r.jsxs)(n.Zb,{children:[(0,r.jsxs)(n.Ol,{className:"flex flex-row items-center justify-between space-y-0 pb-2",children:[(0,r.jsx)(n.ll,{className:"text-sm font-medium",children:"Total Users"}),(0,r.jsx)(l.Z,{className:"h-4 w-4 text-muted-foreground"})]}),(0,r.jsx)(n.aY,{children:(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsx)("div",{className:"text-2xl font-bold",children:N.totalUsers.toLocaleString()}),(0,r.jsxs)("div",{className:"text-sm text-green-500 flex items-center",children:["Live",(0,r.jsx)(c.Z,{className:"ml-1 h-4 w-4 animate-pulse"})]})]})})]}),(0,r.jsxs)(n.Zb,{children:[(0,r.jsxs)(n.Ol,{className:"flex flex-row items-center justify-between space-y-0 pb-2",children:[(0,r.jsx)(n.ll,{className:"text-sm font-medium",children:"Active Sessions"}),(0,r.jsx)(c.Z,{className:"h-4 w-4 text-muted-foreground"})]}),(0,r.jsx)(n.aY,{children:(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsx)("div",{className:"text-2xl font-bold",children:N.activeUsers}),(0,r.jsxs)("div",{className:"text-sm text-green-500 flex items-center",children:["Live",(0,r.jsx)(c.Z,{className:"ml-1 h-4 w-4 animate-pulse"})]})]})})]}),(0,r.jsxs)(n.Zb,{children:[(0,r.jsxs)(n.Ol,{className:"flex flex-row items-center justify-between space-y-0 pb-2",children:[(0,r.jsx)(n.ll,{className:"text-sm font-medium",children:"Support Groups"}),(0,r.jsx)(l.Z,{className:"h-4 w-4 text-muted-foreground"})]}),(0,r.jsx)(n.aY,{children:(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsx)("div",{className:"text-2xl font-bold",children:N.supportGroups}),(0,r.jsxs)("div",{className:"text-sm text-green-500 flex items-center",children:["Live",(0,r.jsx)(c.Z,{className:"ml-1 h-4 w-4 animate-pulse"})]})]})})]}),(0,r.jsxs)(n.Zb,{children:[(0,r.jsxs)(n.Ol,{className:"flex flex-row items-center justify-between space-y-0 pb-2",children:[(0,r.jsx)(n.ll,{className:"text-sm font-medium",children:"Weekly Growth"}),(0,r.jsx)(o.Z,{className:"h-4 w-4 text-muted-foreground"})]}),(0,r.jsx)(n.aY,{children:(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsxs)("div",{className:"text-2xl font-bold",children:[N.weeklyGrowth,"%"]}),(0,r.jsxs)("div",{className:"text-sm text-green-500 flex items-center",children:["Live",(0,r.jsx)(c.Z,{className:"ml-1 h-4 w-4 animate-pulse"})]})]})})]})]}),(0,r.jsxs)(n.Zb,{className:"mt-6",children:[(0,r.jsx)(n.Ol,{children:(0,r.jsxs)(n.ll,{className:"flex items-center justify-between",children:["Recent Activity",(0,r.jsxs)("span",{className:"text-sm text-green-500 flex items-center gap-1",children:["Live",(0,r.jsx)(c.Z,{className:"h-4 w-4 animate-pulse"})]})]})}),(0,r.jsx)(n.aY,{children:(0,r.jsx)("div",{className:"space-y-4",children:N.recentActivities.length>0?N.recentActivities.map(e=>(0,r.jsxs)("div",{className:"flex items-center gap-4",children:[(0,r.jsx)("div",{className:"h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center",children:(0,r.jsx)(c.Z,{className:"h-4 w-4 text-primary"})}),(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{className:"text-sm font-medium",children:e.description}),(0,r.jsx)("p",{className:"text-sm text-muted-foreground",children:new Intl.RelativeTimeFormat("en",{numeric:"auto"}).format(-Math.round((Date.now()-new Date(e.timestamp).getTime())/36e5),"hours")})]})]},e.id)):(0,r.jsx)("div",{className:"text-center py-8",children:(0,r.jsx)("p",{className:"text-sm text-muted-foreground",children:"No recent activities"})})})})]})]})}},47412:function(e,t,s){"use strict";s.d(t,{Cd:function(){return o},X:function(){return d},bZ:function(){return c}});var r=s(57437),n=s(2265),a=s(13027),i=s(37440);let l=(0,a.j)("relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",{variants:{variant:{default:"bg-background text-foreground",destructive:"border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"}},defaultVariants:{variant:"default"}}),c=n.forwardRef((e,t)=>{let{className:s,variant:n,...a}=e;return(0,r.jsx)("div",{ref:t,role:"alert",className:(0,i.cn)(l({variant:n}),s),...a})});c.displayName="Alert";let o=n.forwardRef((e,t)=>{let{className:s,...n}=e;return(0,r.jsx)("h5",{ref:t,className:(0,i.cn)("mb-1 font-medium leading-none tracking-tight",s),...n})});o.displayName="AlertTitle";let d=n.forwardRef((e,t)=>{let{className:s,...n}=e;return(0,r.jsx)("div",{ref:t,className:(0,i.cn)("text-sm [&_p]:leading-relaxed",s),...n})});d.displayName="AlertDescription"},50495:function(e,t,s){"use strict";s.d(t,{z:function(){return o}});var r=s(57437),n=s(2265),a=s(71538),i=s(13027),l=s(37440);let c=(0,i.j)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),o=n.forwardRef((e,t)=>{let{className:s,variant:n,size:i,asChild:o=!1,...d}=e,u=o?a.g7:"button";return(0,r.jsx)(u,{className:(0,l.cn)(c({variant:n,size:i,className:s})),ref:t,...d})});o.displayName="Button"},36013:function(e,t,s){"use strict";s.d(t,{Ol:function(){return l},SZ:function(){return o},Zb:function(){return i},aY:function(){return d},ll:function(){return c}});var r=s(57437),n=s(2265),a=s(37440);let i=n.forwardRef((e,t)=>{let{className:s,...n}=e;return(0,r.jsx)("div",{ref:t,className:(0,a.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",s),...n})});i.displayName="Card";let l=n.forwardRef((e,t)=>{let{className:s,...n}=e;return(0,r.jsx)("div",{ref:t,className:(0,a.cn)("flex flex-col space-y-1.5 p-6",s),...n})});l.displayName="CardHeader";let c=n.forwardRef((e,t)=>{let{className:s,...n}=e;return(0,r.jsx)("h3",{ref:t,className:(0,a.cn)("text-2xl font-semibold leading-none tracking-tight",s),...n})});c.displayName="CardTitle";let o=n.forwardRef((e,t)=>{let{className:s,...n}=e;return(0,r.jsx)("p",{ref:t,className:(0,a.cn)("text-sm text-muted-foreground",s),...n})});o.displayName="CardDescription";let d=n.forwardRef((e,t)=>{let{className:s,...n}=e;return(0,r.jsx)("div",{ref:t,className:(0,a.cn)("p-6 pt-0",s),...n})});d.displayName="CardContent",n.forwardRef((e,t)=>{let{className:s,...n}=e;return(0,r.jsx)("div",{ref:t,className:(0,a.cn)("flex items-center p-6 pt-0",s),...n})}).displayName="CardFooter"},35657:function(e,t,s){"use strict";s.d(t,{pm:function(){return f}});var r=s(2265);let n=0,a=new Map,i=e=>{if(a.has(e))return;let t=setTimeout(()=>{a.delete(e),d({type:"REMOVE_TOAST",toastId:e})},1e6);a.set(e,t)},l=(e,t)=>{switch(t.type){case"ADD_TOAST":return{...e,toasts:[t.toast,...e.toasts].slice(0,1)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case"DISMISS_TOAST":{let{toastId:s}=t;return s?i(s):e.toasts.forEach(e=>{i(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,open:!1}:e)}}case"REMOVE_TOAST":if(void 0===t.toastId)return{...e,toasts:[]};return{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)}}},c=[],o={toasts:[]};function d(e){o=l(o,e),c.forEach(e=>{e(o)})}function u(e){let{...t}=e,s=(n=(n+1)%Number.MAX_VALUE).toString(),r=()=>d({type:"DISMISS_TOAST",toastId:s});return d({type:"ADD_TOAST",toast:{...t,id:s,open:!0,onOpenChange:e=>{e||r()}}}),{id:s,dismiss:r,update:e=>d({type:"UPDATE_TOAST",toast:{...e,id:s}})}}function f(){let[e,t]=r.useState(o);return r.useEffect(()=>(c.push(t),()=>{let e=c.indexOf(t);e>-1&&c.splice(e,1)}),[e]),{...e,toast:u,dismiss:e=>d({type:"DISMISS_TOAST",toastId:e})}}},37440:function(e,t,s){"use strict";s.d(t,{cn:function(){return a}});var r=s(44839),n=s(96164);function a(){for(var e=arguments.length,t=Array(e),s=0;s<e;s++)t[s]=arguments[s];return(0,n.m6)((0,r.W)(t))}},94207:function(e,t,s){"use strict";s.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,s(78030).Z)("Activity",[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]])},12140:function(e,t,s){"use strict";s.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,s(78030).Z)("ChartLine",[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"m19 9-5 5-4-4-3 3",key:"2osh9i"}]])},76780:function(e,t,s){"use strict";s.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,s(78030).Z)("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]])},3274:function(e,t,s){"use strict";s.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,s(78030).Z)("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]])},11240:function(e,t,s){"use strict";s.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,s(78030).Z)("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]])},1584:function(e,t,s){"use strict";s.d(t,{F:function(){return a},e:function(){return i}});var r=s(2265);function n(e,t){if("function"==typeof e)return e(t);null!=e&&(e.current=t)}function a(...e){return t=>{let s=!1,r=e.map(e=>{let r=n(e,t);return s||"function"!=typeof r||(s=!0),r});if(s)return()=>{for(let t=0;t<r.length;t++){let s=r[t];"function"==typeof s?s():n(e[t],null)}}}}function i(...e){return r.useCallback(a(...e),e)}},71538:function(e,t,s){"use strict";s.d(t,{g7:function(){return i}});var r=s(2265),n=s(1584),a=s(57437),i=r.forwardRef((e,t)=>{let{children:s,...n}=e,i=r.Children.toArray(s),c=i.find(o);if(c){let e=c.props.children,s=i.map(t=>t!==c?t:r.Children.count(e)>1?r.Children.only(null):r.isValidElement(e)?e.props.children:null);return(0,a.jsx)(l,{...n,ref:t,children:r.isValidElement(e)?r.cloneElement(e,void 0,s):null})}return(0,a.jsx)(l,{...n,ref:t,children:s})});i.displayName="Slot";var l=r.forwardRef((e,t)=>{let{children:s,...a}=e;if(r.isValidElement(s)){let e,i;let l=(e=Object.getOwnPropertyDescriptor(s.props,"ref")?.get)&&"isReactWarning"in e&&e.isReactWarning?s.ref:(e=Object.getOwnPropertyDescriptor(s,"ref")?.get)&&"isReactWarning"in e&&e.isReactWarning?s.props.ref:s.props.ref||s.ref;return r.cloneElement(s,{...function(e,t){let s={...t};for(let r in t){let n=e[r],a=t[r];/^on[A-Z]/.test(r)?n&&a?s[r]=(...e)=>{a(...e),n(...e)}:n&&(s[r]=n):"style"===r?s[r]={...n,...a}:"className"===r&&(s[r]=[n,a].filter(Boolean).join(" "))}return{...e,...s}}(a,s.props),ref:t?(0,n.F)(t,l):l})}return r.Children.count(s)>1?r.Children.only(null):null});l.displayName="SlotClone";var c=({children:e})=>(0,a.jsx)(a.Fragment,{children:e});function o(e){return r.isValidElement(e)&&e.type===c}},13027:function(e,t,s){"use strict";s.d(t,{j:function(){return i}});var r=s(44839);let n=e=>"boolean"==typeof e?`${e}`:0===e?"0":e,a=r.W,i=(e,t)=>s=>{var r;if((null==t?void 0:t.variants)==null)return a(e,null==s?void 0:s.class,null==s?void 0:s.className);let{variants:i,defaultVariants:l}=t,c=Object.keys(i).map(e=>{let t=null==s?void 0:s[e],r=null==l?void 0:l[e];if(null===t)return null;let a=n(t)||n(r);return i[e][a]}),o=s&&Object.entries(s).reduce((e,t)=>{let[s,r]=t;return void 0===r||(e[s]=r),e},{});return a(e,c,null==t?void 0:null===(r=t.compoundVariants)||void 0===r?void 0:r.reduce((e,t)=>{let{class:s,className:r,...n}=t;return Object.entries(n).every(e=>{let[t,s]=e;return Array.isArray(s)?s.includes({...l,...o}[t]):({...l,...o})[t]===s})?[...e,s,r]:e},[]),null==s?void 0:s.class,null==s?void 0:s.className)}}},function(e){e.O(0,[8502,2971,7023,1744],function(){return e(e.s=91536)}),_N_E=e.O()}]);