(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9852],{53956:function(e,t,s){Promise.resolve().then(s.bind(s,47315))},47315:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return j}});var r=s(57437),a=s(2265),n=s(36013),l=s(50495),i=s(24241),d=s(40933),c=s(94207),o=s(3274),m=s(53225),u=s(79869),x=s(64042),f=s(70571),h=s(49127),p=s(37418);function j(){let[e,t]=(0,a.useState)("week"),[s,j]=(0,a.useState)([]),[g,v]=(0,a.useState)([]),[N,y]=(0,a.useState)(!0),{user:b}=(0,h.a)();(0,a.useEffect)(()=>{(async()=>{if(null==b?void 0:b.id){y(!0);try{let[t,s]=await Promise.all([(0,p.Ue)(b.id,"week"===e?7:"month"===e?30:365),(0,p.If)(b.id)]);j(t),v(s)}catch(e){console.error("Error loading activities:",e)}finally{y(!1)}}})()},[null==b?void 0:b.id,e]);let w=g.length,k=g.filter(e=>"completed"===e.status).length,Z=s.filter(e=>e.duration).reduce((e,t)=>e+(t.duration||0),0)/s.length||0,C=w>0?Math.round(k/w*100):0,S=[{title:"Total Sessions",value:w.toString(),icon:i.Z,trend:"+12%",trendUp:!0},{title:"Average Duration",value:"".concat(Math.round(Z)," min"),icon:d.Z,trend:"+5%",trendUp:!0},{title:"Engagement Rate",value:"".concat(C,"%"),icon:c.Z,trend:"-2%",trendUp:!1}];return N?(0,r.jsx)("div",{className:"flex items-center justify-center min-h-screen pt-20 px-6",children:(0,r.jsxs)("div",{className:"flex flex-col items-center gap-2",children:[(0,r.jsx)(o.Z,{className:"w-8 h-8 animate-spin text-primary"}),(0,r.jsx)("p",{className:"text-sm text-muted-foreground",children:"Loading your activities..."})]})}):(0,r.jsxs)("div",{className:"container max-w-6xl space-y-8 pt-20 px-6",children:[(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsx)("h1",{className:"text-3xl font-bold",children:"Activity"}),(0,r.jsx)("p",{className:"text-muted-foreground",children:"Track your mental health journey and progress"})]}),(0,r.jsxs)("div",{className:"flex gap-2",children:[(0,r.jsx)(l.z,{variant:"week"===e?"default":"outline",onClick:()=>t("week"),children:"Week"}),(0,r.jsx)(l.z,{variant:"month"===e?"default":"outline",onClick:()=>t("month"),children:"Month"}),(0,r.jsx)(l.z,{variant:"year"===e?"default":"outline",onClick:()=>t("year"),children:"Year"})]}),(0,r.jsx)("div",{className:"grid gap-4 md:grid-cols-3",children:S.map(e=>(0,r.jsx)(n.Zb,{children:(0,r.jsxs)(n.aY,{className:"pt-6",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsxs)("div",{className:"space-y-1",children:[(0,r.jsx)("p",{className:"text-sm font-medium text-muted-foreground",children:e.title}),(0,r.jsx)("p",{className:"text-2xl font-bold",children:e.value})]}),(0,r.jsx)("div",{className:"p-2 bg-primary/10 rounded-full",children:(0,r.jsx)(e.icon,{className:"w-4 h-4 text-primary"})})]}),(0,r.jsxs)("div",{className:"flex items-center mt-4",children:[(0,r.jsx)(m.Z,{className:"w-4 h-4 mr-1 ".concat(e.trendUp?"text-green-500":"text-red-500")}),(0,r.jsx)("span",{className:"text-sm ".concat(e.trendUp?"text-green-500":"text-red-500"),children:e.trend})]})]})},e.title))}),(0,r.jsxs)(n.Zb,{children:[(0,r.jsxs)(n.Ol,{children:[(0,r.jsxs)(n.ll,{className:"flex items-center gap-2",children:[(0,r.jsx)(c.Z,{className:"w-5 h-5"}),"Weekly Progress"]}),(0,r.jsx)(n.SZ,{children:"Your mental health journey progress"})]}),(0,r.jsxs)(n.aY,{className:"space-y-4",children:[(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsxs)("div",{className:"flex justify-between",children:[(0,r.jsx)("span",{className:"text-sm font-medium",children:"Mood Stability"}),(0,r.jsxs)("span",{className:"text-sm text-muted-foreground",children:[Math.round(s.filter(e=>"mood"===e.type).length/7*100),"%"]})]}),(0,r.jsx)(f.E,{value:Math.round(s.filter(e=>"mood"===e.type).length/7*100)})]}),(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsxs)("div",{className:"flex justify-between",children:[(0,r.jsx)("span",{className:"text-sm font-medium",children:"Session Attendance"}),(0,r.jsxs)("span",{className:"text-sm text-muted-foreground",children:[C,"%"]})]}),(0,r.jsx)(f.E,{value:C})]}),(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsxs)("div",{className:"flex justify-between",children:[(0,r.jsx)("span",{className:"text-sm font-medium",children:"Goal Achievement"}),(0,r.jsxs)("span",{className:"text-sm text-muted-foreground",children:[Math.round(s.filter(e=>e.completed).length/s.length*100),"%"]})]}),(0,r.jsx)(f.E,{value:Math.round(s.filter(e=>e.completed).length/s.length*100)})]})]})]}),(0,r.jsxs)(n.Zb,{children:[(0,r.jsxs)(n.Ol,{children:[(0,r.jsxs)(n.ll,{className:"flex items-center gap-2",children:[(0,r.jsx)(i.Z,{className:"w-5 h-5"}),"Recent Activity"]}),(0,r.jsx)(n.SZ,{children:"Your recent mental health activities"})]}),(0,r.jsx)(n.aY,{children:(0,r.jsxs)("div",{className:"space-y-6",children:[s.slice(0,5).map(e=>(0,r.jsxs)("div",{className:"flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0",children:[(0,r.jsx)("div",{className:"p-2 bg-primary/10 rounded-full",children:"therapy"===e.type?(0,r.jsx)(u.Z,{className:"w-4 h-4 text-primary"}):"mood"===e.type?(0,r.jsx)(x.Z,{className:"w-4 h-4 text-primary"}):(0,r.jsx)(c.Z,{className:"w-4 h-4 text-primary"})}),(0,r.jsxs)("div",{className:"flex-1",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsx)("h4",{className:"font-medium",children:e.name}),(0,r.jsx)("span",{className:"text-sm text-muted-foreground",children:e.duration?"".concat(e.duration," minutes"):"N/A"})]}),(0,r.jsx)("p",{className:"text-sm text-muted-foreground mt-1",children:e.description||"No description available"}),(0,r.jsx)("p",{className:"text-xs text-muted-foreground mt-2",children:new Date(e.timestamp).toLocaleDateString()})]})]},e.id)),0===s.length&&(0,r.jsx)("div",{className:"text-center py-8 text-muted-foreground",children:"No activities recorded yet. Start your mental health journey by completing a therapy session or logging your mood."})]})})]})]})}},50495:function(e,t,s){"use strict";s.d(t,{z:function(){return c}});var r=s(57437),a=s(2265),n=s(71538),l=s(13027),i=s(37440);let d=(0,l.j)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),c=a.forwardRef((e,t)=>{let{className:s,variant:a,size:l,asChild:c=!1,...o}=e,m=c?n.g7:"button";return(0,r.jsx)(m,{className:(0,i.cn)(d({variant:a,size:l,className:s})),ref:t,...o})});c.displayName="Button"},36013:function(e,t,s){"use strict";s.d(t,{Ol:function(){return i},SZ:function(){return c},Zb:function(){return l},aY:function(){return o},ll:function(){return d}});var r=s(57437),a=s(2265),n=s(37440);let l=a.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,r.jsx)("div",{ref:t,className:(0,n.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",s),...a})});l.displayName="Card";let i=a.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,r.jsx)("div",{ref:t,className:(0,n.cn)("flex flex-col space-y-1.5 p-6",s),...a})});i.displayName="CardHeader";let d=a.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,r.jsx)("h3",{ref:t,className:(0,n.cn)("text-2xl font-semibold leading-none tracking-tight",s),...a})});d.displayName="CardTitle";let c=a.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,r.jsx)("p",{ref:t,className:(0,n.cn)("text-sm text-muted-foreground",s),...a})});c.displayName="CardDescription";let o=a.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,r.jsx)("div",{ref:t,className:(0,n.cn)("p-6 pt-0",s),...a})});o.displayName="CardContent",a.forwardRef((e,t)=>{let{className:s,...a}=e;return(0,r.jsx)("div",{ref:t,className:(0,n.cn)("flex items-center p-6 pt-0",s),...a})}).displayName="CardFooter"},70571:function(e,t,s){"use strict";s.d(t,{E:function(){return i}});var r=s(57437),a=s(2265),n=s(52431),l=s(37440);let i=a.forwardRef((e,t)=>{let{className:s,value:a,...i}=e;return(0,r.jsx)(n.fC,{ref:t,className:(0,l.cn)("relative h-2 w-full overflow-hidden rounded-full bg-primary/10",s),...i,children:(0,r.jsx)(n.z$,{className:"h-full w-full flex-1 bg-primary transition-all",style:{transform:"translateX(-".concat(100-(a||0),"%)")}})})});i.displayName=n.fC.displayName},37440:function(e,t,s){"use strict";s.d(t,{cn:function(){return n}});var r=s(44839),a=s(96164);function n(){for(var e=arguments.length,t=Array(e),s=0;s<e;s++)t[s]=arguments[s];return(0,a.m6)((0,r.W)(t))}}},function(e){e.O(0,[8502,6649,5504,2460,4683,2971,7023,1744],function(){return e(e.s=53956)}),_N_E=e.O()}]);