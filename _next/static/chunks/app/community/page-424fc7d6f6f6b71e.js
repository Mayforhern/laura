(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4616],{72134:function(e,t,s){Promise.resolve().then(s.bind(s,73033))},73033:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return S}});var r=s(57437),n=s(2265),a=s(47267),i=s(36013),o=s(50495),c=s(83102),l=s(93146),d=s(85273),u=s(17583),m=s(71976),f=s(11240),p=s(74453),h=s(54817),x=s(92513),g=s(60994),v=s(52022);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let b=(0,s(78030).Z)("ThumbsUp",[["path",{d:"M7 10v12",key:"1qc93n"}],["path",{d:"M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",key:"emmmcr"}]]);var y=s(40933),j=s(35657),N=s(6649),w=s(16463);let k=[{id:"anxiety",name:"Anxiety Support",description:"A safe space to discuss anxiety, share coping strategies, and find support",icon:"\uD83D\uDE0C",memberCount:1234,postCount:567,isPrivate:!0,topics:["Coping Strategies","Panic Attacks","Social Anxiety","General Anxiety"]},{id:"depression",name:"Depression Support",description:"Connect with others who understand what you're going through",icon:"\uD83C\uDF31",memberCount:2345,postCount:890,isPrivate:!0,topics:["Daily Struggles","Recovery Journey","Self-Care","Professional Help"]},{id:"mindfulness",name:"Mindfulness & Meditation",description:"Share meditation experiences and mindfulness techniques",icon:"\uD83E\uDDD8",memberCount:3456,postCount:1234,isPrivate:!1,topics:["Meditation Tips","Mindfulness Practices","Stress Relief","Daily Practice"]},{id:"general",name:"General Mental Health",description:"Discuss various aspects of mental health and well-being",icon:"\uD83D\uDCAD",memberCount:4567,postCount:2345,isPrivate:!1,topics:["Self-Care","Lifestyle","Resources","Success Stories"]}];function S(){var e,t,s,S,C,Z;let[D,T]=(0,n.useState)("anxiety"),[A,M]=(0,n.useState)(""),[P,R]=(0,n.useState)({title:"",content:""}),[_,E]=(0,n.useState)(!1),{toast:O}=(0,j.pm)(),{user:I,authenticated:z}=(0,N.s)(),V=(0,w.useRouter)();return(0,r.jsxs)("div",{className:"container mx-auto py-8 px-4 max-w-7xl mt-16",children:[(0,r.jsxs)(a.E.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:"mb-8",children:[(0,r.jsx)("h1",{className:"text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent",children:"Community Support"}),(0,r.jsx)("p",{className:"text-muted-foreground mt-2",children:"Connect with others who understand what you're going through"})]}),(0,r.jsx)(i.Zb,{className:"mb-8 border-none shadow-md bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur supports-[backdrop-filter]:bg-background/60",children:(0,r.jsx)(i.aY,{className:"p-6",children:(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsxs)("div",{className:"space-y-1",children:[(0,r.jsx)("h2",{className:"text-2xl font-semibold",children:"Live Community Chat"}),(0,r.jsx)("p",{className:"text-muted-foreground",children:"Join real-time conversations with community members"})]}),(0,r.jsxs)(o.z,{size:"lg",className:"gap-2",onClick:()=>V.push("/community/chat"),children:[(0,r.jsx)(u.Z,{className:"w-5 h-5"}),"Join Chat",(0,r.jsx)(m.Z,{className:"w-4 h-4"})]})]})})}),(0,r.jsxs)("div",{className:"grid gap-6 md:grid-cols-4",children:[(0,r.jsxs)(i.Zb,{className:"md:col-span-1 border-none shadow-md bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60",children:[(0,r.jsxs)(i.Ol,{children:[(0,r.jsxs)(i.ll,{className:"flex items-center gap-2",children:[(0,r.jsx)(f.Z,{className:"w-5 h-5 text-primary"}),"Support Forums"]}),(0,r.jsx)(i.SZ,{children:"Choose a topic to discuss"})]}),(0,r.jsx)(i.aY,{children:(0,r.jsx)("div",{className:"space-y-2",children:k.map(e=>(0,r.jsxs)(o.z,{variant:D===e.id?"default":"ghost",className:"w-full justify-start gap-2",onClick:()=>T(e.id),children:[(0,r.jsx)("span",{className:"text-xl",children:e.icon}),(0,r.jsxs)("div",{className:"flex flex-col items-start",children:[(0,r.jsx)("span",{children:e.name}),(0,r.jsxs)("span",{className:"text-xs text-muted-foreground",children:[e.memberCount," members • ",e.postCount," posts"]})]}),e.isPrivate&&(0,r.jsx)(p.Z,{className:"w-4 h-4 ml-auto text-muted-foreground"})]},e.id))})})]}),(0,r.jsxs)("div",{className:"md:col-span-3 space-y-6",children:[(0,r.jsxs)("div",{className:"flex gap-4",children:[(0,r.jsxs)("div",{className:"relative flex-1",children:[(0,r.jsx)(h.Z,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"}),(0,r.jsx)(c.I,{placeholder:"Search posts...",className:"pl-10",value:A,onChange:e=>M(e.target.value)})]}),(0,r.jsxs)(o.z,{onClick:()=>E(!_),className:"flex items-center gap-2",children:[(0,r.jsx)(x.Z,{className:"w-4 h-4"}),"New Post"]})]}),_&&(0,r.jsx)(a.E.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},children:(0,r.jsx)(i.Zb,{className:"border-none shadow-md bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60",children:(0,r.jsx)(i.aY,{className:"pt-6",children:(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsx)(c.I,{placeholder:"Post title",value:P.title,onChange:e=>R({...P,title:e.target.value})}),(0,r.jsx)(l.g,{placeholder:"Share your thoughts...",value:P.content,onChange:e=>R({...P,content:e.target.value}),className:"min-h-[150px]"}),(0,r.jsxs)("div",{className:"flex justify-end gap-2",children:[(0,r.jsx)(o.z,{variant:"outline",onClick:()=>E(!1),children:"Cancel"}),(0,r.jsxs)(o.z,{onClick:()=>{if(!z){O({title:"Authentication Required",description:"Please sign in to create a post",variant:"destructive"});return}if(!P.title||!P.content){O({title:"Missing Information",description:"Please fill in both title and content",variant:"destructive"});return}O({title:"Success",description:"Your post has been created"}),R({title:"",content:""}),E(!1)},className:"flex items-center gap-2",children:[(0,r.jsx)(g.Z,{className:"w-4 h-4"}),"Post"]})]})]})})})}),(0,r.jsxs)(i.Zb,{className:"border-none shadow-md bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60",children:[(0,r.jsxs)(i.Ol,{children:[(0,r.jsxs)(i.ll,{className:"flex items-center gap-2",children:[null===(e=k.find(e=>e.id===D))||void 0===e?void 0:e.icon,null===(t=k.find(e=>e.id===D))||void 0===t?void 0:t.name]}),(0,r.jsx)(i.SZ,{children:null===(s=k.find(e=>e.id===D))||void 0===s?void 0:s.description})]}),(0,r.jsx)(i.aY,{children:(0,r.jsxs)(d.mQ,{defaultValue:(null===(S=k.find(e=>e.id===D))||void 0===S?void 0:S.topics[0])||"",children:[(0,r.jsx)(d.dr,{className:"grid w-full grid-cols-2 lg:grid-cols-4",children:null===(C=k.find(e=>e.id===D))||void 0===C?void 0:C.topics.map(e=>(0,r.jsx)(d.SP,{value:e,children:e},e))}),null===(Z=k.find(e=>e.id===D))||void 0===Z?void 0:Z.topics.map(e=>(0,r.jsx)(d.nU,{value:e,children:(0,r.jsx)("div",{className:"space-y-4",children:[1,2,3].map(e=>(0,r.jsx)(i.Zb,{className:"border-none shadow-sm hover:shadow-md transition-shadow duration-200",children:(0,r.jsx)(i.aY,{className:"p-4",children:(0,r.jsxs)("div",{className:"flex items-start gap-4",children:[(0,r.jsx)("div",{className:"w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center",children:(0,r.jsx)(v.Z,{className:"w-5 h-5 text-primary"})}),(0,r.jsxs)("div",{className:"flex-1",children:[(0,r.jsxs)("h3",{className:"font-semibold",children:["Example Post Title ",e]}),(0,r.jsx)("p",{className:"text-sm text-muted-foreground mt-1",children:"This is an example post content. In a real implementation, this would be user-generated content."}),(0,r.jsxs)("div",{className:"flex items-center gap-4 mt-4 text-sm text-muted-foreground",children:[(0,r.jsxs)("div",{className:"flex items-center gap-1",children:[(0,r.jsx)(b,{className:"w-4 h-4"}),(0,r.jsx)("span",{children:"24"})]}),(0,r.jsxs)("div",{className:"flex items-center gap-1",children:[(0,r.jsx)(u.Z,{className:"w-4 h-4"}),(0,r.jsx)("span",{children:"8"})]}),(0,r.jsxs)("div",{className:"flex items-center gap-1",children:[(0,r.jsx)(y.Z,{className:"w-4 h-4"}),(0,r.jsx)("span",{children:"2h ago"})]})]})]})]})})},e))})},e))]})})]})]})]})]})}},50495:function(e,t,s){"use strict";s.d(t,{z:function(){return l}});var r=s(57437),n=s(2265),a=s(71538),i=s(13027),o=s(37440);let c=(0,i.j)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),l=n.forwardRef((e,t)=>{let{className:s,variant:n,size:i,asChild:l=!1,...d}=e,u=l?a.g7:"button";return(0,r.jsx)(u,{className:(0,o.cn)(c({variant:n,size:i,className:s})),ref:t,...d})});l.displayName="Button"},36013:function(e,t,s){"use strict";s.d(t,{Ol:function(){return o},SZ:function(){return l},Zb:function(){return i},aY:function(){return d},ll:function(){return c}});var r=s(57437),n=s(2265),a=s(37440);let i=n.forwardRef((e,t)=>{let{className:s,...n}=e;return(0,r.jsx)("div",{ref:t,className:(0,a.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",s),...n})});i.displayName="Card";let o=n.forwardRef((e,t)=>{let{className:s,...n}=e;return(0,r.jsx)("div",{ref:t,className:(0,a.cn)("flex flex-col space-y-1.5 p-6",s),...n})});o.displayName="CardHeader";let c=n.forwardRef((e,t)=>{let{className:s,...n}=e;return(0,r.jsx)("h3",{ref:t,className:(0,a.cn)("text-2xl font-semibold leading-none tracking-tight",s),...n})});c.displayName="CardTitle";let l=n.forwardRef((e,t)=>{let{className:s,...n}=e;return(0,r.jsx)("p",{ref:t,className:(0,a.cn)("text-sm text-muted-foreground",s),...n})});l.displayName="CardDescription";let d=n.forwardRef((e,t)=>{let{className:s,...n}=e;return(0,r.jsx)("div",{ref:t,className:(0,a.cn)("p-6 pt-0",s),...n})});d.displayName="CardContent",n.forwardRef((e,t)=>{let{className:s,...n}=e;return(0,r.jsx)("div",{ref:t,className:(0,a.cn)("flex items-center p-6 pt-0",s),...n})}).displayName="CardFooter"},83102:function(e,t,s){"use strict";s.d(t,{I:function(){return i}});var r=s(57437),n=s(2265),a=s(37440);let i=n.forwardRef((e,t)=>{let{className:s,type:n,...i}=e;return(0,r.jsx)("input",{type:n,className:(0,a.cn)("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",s),ref:t,...i})});i.displayName="Input"},85273:function(e,t,s){"use strict";s.d(t,{SP:function(){return l},dr:function(){return c},mQ:function(){return o},nU:function(){return d}});var r=s(57437),n=s(2265),a=s(18146),i=s(37440);let o=a.fC,c=n.forwardRef((e,t)=>{let{className:s,...n}=e;return(0,r.jsx)(a.aV,{ref:t,className:(0,i.cn)("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",s),...n})});c.displayName=a.aV.displayName;let l=n.forwardRef((e,t)=>{let{className:s,...n}=e;return(0,r.jsx)(a.xz,{ref:t,className:(0,i.cn)("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",s),...n})});l.displayName=a.xz.displayName;let d=n.forwardRef((e,t)=>{let{className:s,...n}=e;return(0,r.jsx)(a.VY,{ref:t,className:(0,i.cn)("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",s),...n})});d.displayName=a.VY.displayName},93146:function(e,t,s){"use strict";s.d(t,{g:function(){return i}});var r=s(57437),n=s(2265),a=s(37440);let i=n.forwardRef((e,t)=>{let{className:s,...n}=e;return(0,r.jsx)("textarea",{className:(0,a.cn)("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",s),ref:t,...n})});i.displayName="Textarea"},35657:function(e,t,s){"use strict";s.d(t,{pm:function(){return m}});var r=s(2265);let n=0,a=new Map,i=e=>{if(a.has(e))return;let t=setTimeout(()=>{a.delete(e),d({type:"REMOVE_TOAST",toastId:e})},1e6);a.set(e,t)},o=(e,t)=>{switch(t.type){case"ADD_TOAST":return{...e,toasts:[t.toast,...e.toasts].slice(0,1)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case"DISMISS_TOAST":{let{toastId:s}=t;return s?i(s):e.toasts.forEach(e=>{i(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,open:!1}:e)}}case"REMOVE_TOAST":if(void 0===t.toastId)return{...e,toasts:[]};return{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)}}},c=[],l={toasts:[]};function d(e){l=o(l,e),c.forEach(e=>{e(l)})}function u(e){let{...t}=e,s=(n=(n+1)%Number.MAX_VALUE).toString(),r=()=>d({type:"DISMISS_TOAST",toastId:s});return d({type:"ADD_TOAST",toast:{...t,id:s,open:!0,onOpenChange:e=>{e||r()}}}),{id:s,dismiss:r,update:e=>d({type:"UPDATE_TOAST",toast:{...e,id:s}})}}function m(){let[e,t]=r.useState(l);return r.useEffect(()=>(c.push(t),()=>{let e=c.indexOf(t);e>-1&&c.splice(e,1)}),[e]),{...e,toast:u,dismiss:e=>d({type:"DISMISS_TOAST",toastId:e})}}},37440:function(e,t,s){"use strict";s.d(t,{cn:function(){return a}});var r=s(44839),n=s(96164);function a(){for(var e=arguments.length,t=Array(e),s=0;s<e;s++)t[s]=arguments[s];return(0,n.m6)((0,r.W)(t))}},71976:function(e,t,s){"use strict";s.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,s(78030).Z)("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]])},74453:function(e,t,s){"use strict";s.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,s(78030).Z)("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]])},17583:function(e,t,s){"use strict";s.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,s(78030).Z)("MessageCircle",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]])},92513:function(e,t,s){"use strict";s.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,s(78030).Z)("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]])},54817:function(e,t,s){"use strict";s.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,s(78030).Z)("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]])},60994:function(e,t,s){"use strict";s.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,s(78030).Z)("Send",[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]])},52022:function(e,t,s){"use strict";s.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,s(78030).Z)("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]])},11240:function(e,t,s){"use strict";s.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,s(78030).Z)("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]])},16463:function(e,t,s){"use strict";var r=s(71169);s.o(r,"useRouter")&&s.d(t,{useRouter:function(){return r.useRouter}}),s.o(r,"useSearchParams")&&s.d(t,{useSearchParams:function(){return r.useSearchParams}})}},function(e){e.O(0,[8502,6649,7267,5990,2429,2971,7023,1744],function(){return e(e.s=72134)}),_N_E=e.O()}]);