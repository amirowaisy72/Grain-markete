"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[272],{50076:function(e,r,t){t.r(r),t.d(r,{default:function(){return j}});var a=t(74165),n=t(15861),s=t(72791),c=t(1413),i=t(44925),o=t(81694),l=t.n(o),h=t(10162),u=t(80184),d=["bsPrefix","className","striped","bordered","borderless","hover","size","variant","responsive"],m=s.forwardRef((function(e,r){var t=e.bsPrefix,a=e.className,n=e.striped,s=e.bordered,o=e.borderless,m=e.hover,p=e.size,f=e.variant,x=e.responsive,v=(0,i.Z)(e,d),y=(0,h.vE)(t,"table"),j=l()(a,y,f&&"".concat(y,"-").concat(f),p&&"".concat(y,"-").concat(p),n&&"".concat(y,"-").concat("string"===typeof n?"striped-".concat(n):"striped"),s&&"".concat(y,"-bordered"),o&&"".concat(y,"-borderless"),m&&"".concat(y,"-hover")),b=(0,u.jsx)("table",(0,c.Z)((0,c.Z)({},v),{},{className:j,ref:r}));if(x){var g="".concat(y,"-responsive");return"string"===typeof x&&(g="".concat(g,"-").concat(x)),(0,u.jsx)("div",{className:g,children:b})}return b})),p=t(72426),f=t.n(p),x=t(78983),v=(t(33035),t(24846),t.p,t.p,t.p,t.p,t.p,t.p,t(96558),t(80650)),y=t(78847),j=function(){var e=(0,s.useContext)(y.Z),r=e.getCashDCs,t=(e.cashEntries,e.getTimeline),c=e.timeline,i=Date.now(),o=function(e,r,t){var a=new Date(e),n=new Date(r);return f()(a).diff(n,t)},l=function(e){var r=o(e,i,"years"),t=o(e,i,"months"),a=o(e,i,"days"),n=o(e,i,"hours"),s=o(e,i,"minutes");return 0!==r?Math.abs(r)+" \u0633\u0627\u0644 \u067e\u06c1\u0644\u06d2":0!==t?Math.abs(t)+" \u0645\u06c1\u06cc\u0646\u06d2 \u067e\u06c1\u0644\u06d2":0!==a?Math.abs(a)+" \u062f\u0646 \u067e\u06c1\u0644\u06d2":0!==n?Math.abs(n)+" \u06af\u06be\u0646\u0679\u06d2 \u067e\u06c1\u0644\u06d2":0!==s?Math.abs(s)+" \u0645\u0646\u0679 \u067e\u06c1\u0644\u06d2":"\u0627\u0628\u06be\u06cc \u0627\u0628\u06be\u06cc"},h=function(e){return"number"!==typeof e||isNaN(e)?"Invalid Amount":Math.abs(e).toLocaleString("en-PK",{style:"decimal",minimumFractionDigits:0,maximumFractionDigits:2})};(0,s.useEffect)((function(){var e=function(){var e=(0,n.Z)((0,a.Z)().mark((function e(){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r("");case 3:e.sent,e.next=8;break;case 6:e.prev=6,e.t0=e.catch(0);case 8:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(){return e.apply(this,arguments)}}();e()}),[r]),(0,s.useEffect)((function(){var e=function(){var e=(0,n.Z)((0,a.Z)().mark((function e(){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t("");case 3:e.sent,e.next=8;break;case 6:e.prev=6,e.t0=e.catch(0);case 8:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(){return e.apply(this,arguments)}}();e()}),[t]);var d=[];return c.filter((function(e){return!("Comission"===e.name||"Mazduri"===e.name||"Brokery"===e.name||"Accountant"===e.name||"Sootli"===e.name||"Ghisai"===e.name||"Markete_Fee"===e.name)})).forEach((function(e){var r={entryType:"",customerName:"",otherDetails:"",payment:"",activity:l(e.date)};"Accounts"===e.collectionName?(r.entryType="\u0646\u06cc\u0627 \u0627\u06a9\u0627\u0624\u0646\u0679 \u0628\u0646\u0627\u06cc\u0627 \u06af\u06cc\u0627",r.customerName=e.name,r.otherDetails=e.status):"CashDebitCredit"===e.collectionName?(r.entryType="Take Out"===e.transactionType?"\u067e\u06cc\u0633\u06d2 \u0646\u06a9\u0644\u0648\u0627\u0626\u06d2":"\u067e\u06cc\u0633\u06d2 \u062c\u0645\u0639 \u06a9\u0631\u0648\u0627\u0626\u06d2",r.customerName=e.customer+" \u06a9\u0648 \u062f\u0626\u06d2",r.payment=h(e.amount)):"CashPoints"===e.collectionName?(r.entryType="\u0646\u06cc\u0627 \u06a9\u06cc\u0634 \u067e\u0648\u0627\u0626\u0646\u0679 \u0628\u0646\u0627\u06cc\u0627 \u06af\u06cc\u0627",r.payment=e.balance):"Dc"===e.collectionName?"Invoice"===e.entryType?r.entryType="Invoice":(r.entryType="Debit"===e.DbCr?"\u067e\u06cc\u0633\u06d2 \u0646\u0627\u0645 \u0644\u06af\u06d2":"\u067e\u06cc\u0633\u06d2 \u062c\u0645\u0639 \u0644\u06af\u06d2",r.customerName=e.name,r.payment=h(e.amount)):"Stock"===e.collectionName&&("Invoice"===e.entryType?r.entryType="Invoice":(r.entryType="In"===e.inout?"\u0627\u0633\u0679\u0627\u06a9 \u062e\u0631\u06cc\u062f\u0627":"\u0627\u0633\u0679\u0627\u06a9 \u0628\u06cc\u0686\u0627",r.payment="".concat(e.quantity," Kilogram"))),d.push(r)})),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(v.Z,{}),(0,u.jsx)(x.rb,{children:(0,u.jsx)(x.b7,{xs:!0,children:(0,u.jsxs)(x.xH,{className:"mb-4",children:[(0,u.jsx)(x.bn,{children:"\u0622\u062c \u06a9\u06cc \u0679\u0627\u0626\u0645 \u0644\u0627\u0626\u0646"}),(0,u.jsxs)(x.sl,{children:[(0,u.jsx)("br",{}),(0,u.jsxs)(m,{striped:!0,bordered:!0,hover:!0,responsive:!0,children:[(0,u.jsx)("thead",{children:(0,u.jsxs)("tr",{children:[(0,u.jsx)("th",{}),(0,u.jsx)("th",{}),(0,u.jsx)("th",{}),(0,u.jsx)("th",{}),(0,u.jsx)("th",{})]})}),(0,u.jsx)("tbody",{children:d.slice().reverse().map((function(e,r){return(0,u.jsxs)("tr",{children:[(0,u.jsx)("td",{children:e.entryType}),(0,u.jsx)("td",{children:e.customerName}),(0,u.jsx)("td",{children:e.otherDetails}),(0,u.jsx)("td",{children:e.payment}),(0,u.jsx)("td",{children:e.activity})]},r)}))})]})]})]})})})]})}},96558:function(e,r,t){var a=t(1413),n=(t(72791),t(78983)),s=t(24846),c=t(30434),i=t(24914),o=t(75015),l=t(49909),h=t(33035),u=t(80184);r.Z=function(e){var r=e.withCharts,t={elements:{line:{tension:.4},point:{radius:0,hitRadius:10,hoverRadius:4,hoverBorderWidth:3}},maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{display:!1},y:{display:!1}}};return(0,u.jsxs)(n.rb,{children:[(0,u.jsx)(n.b7,{sm:6,lg:3,children:(0,u.jsx)(n.bP,(0,a.Z)((0,a.Z)({className:"mb-4"},r&&{chart:(0,u.jsx)(h.FR,{className:"position-absolute w-100 h-100",type:"line",data:{labels:["January","February","March","April","May","June","July"],datasets:[{backgroundColor:"rgba(255,255,255,.1)",borderColor:"rgba(255,255,255,.55)",pointHoverBackgroundColor:"#fff",borderWidth:2,data:[65,59,84,84,51,55,40],fill:!0}]},options:t})}),{},{icon:(0,u.jsx)(s.Z,{icon:c.t,height:52,className:"my-4 text-white"}),values:[{title:"friends",value:"89K"},{title:"feeds",value:"459"}],style:{"--cui-card-cap-bg":"#3b5998"}}))}),(0,u.jsx)(n.b7,{sm:6,lg:3,children:(0,u.jsx)(n.bP,(0,a.Z)((0,a.Z)({className:"mb-4"},r&&{chart:(0,u.jsx)(h.FR,{className:"position-absolute w-100 h-100",type:"line",data:{labels:["January","February","March","April","May","June","July"],datasets:[{backgroundColor:"rgba(255,255,255,.1)",borderColor:"rgba(255,255,255,.55)",pointHoverBackgroundColor:"#fff",borderWidth:2,data:[1,13,9,17,34,41,38],fill:!0}]},options:t})}),{},{icon:(0,u.jsx)(s.Z,{icon:i._,height:52,className:"my-4 text-white"}),values:[{title:"followers",value:"973k"},{title:"tweets",value:"1.792"}],style:{"--cui-card-cap-bg":"#00aced"}}))}),(0,u.jsx)(n.b7,{sm:6,lg:3,children:(0,u.jsx)(n.bP,(0,a.Z)((0,a.Z)({className:"mb-4"},r&&{chart:(0,u.jsx)(h.FR,{className:"position-absolute w-100 h-100",type:"line",data:{labels:["January","February","March","April","May","June","July"],datasets:[{backgroundColor:"rgba(255,255,255,.1)",borderColor:"rgba(255,255,255,.55)",pointHoverBackgroundColor:"#fff",borderWidth:2,data:[78,81,80,45,34,12,40],fill:!0}]},options:t})}),{},{icon:(0,u.jsx)(s.Z,{icon:o.n,height:52,className:"my-4 text-white"}),values:[{title:"contacts",value:"500"},{title:"feeds",value:"1.292"}],style:{"--cui-card-cap-bg":"#4875b4"}}))}),(0,u.jsx)(n.b7,{sm:6,lg:3,children:(0,u.jsx)(n.bP,(0,a.Z)((0,a.Z)({className:"mb-4",color:"warning"},r&&{chart:(0,u.jsx)(h.FR,{className:"position-absolute w-100 h-100",type:"line",data:{labels:["January","February","March","April","May","June","July"],datasets:[{backgroundColor:"rgba(255,255,255,.1)",borderColor:"rgba(255,255,255,.55)",pointHoverBackgroundColor:"#fff",borderWidth:2,data:[35,23,56,22,97,23,64],fill:!0}]},options:t})}),{},{icon:(0,u.jsx)(s.Z,{icon:l.J,height:52,className:"my-4 text-white"}),values:[{title:"events",value:"12+"},{title:"meetings",value:"4"}]}))})]})}},80650:function(e,r,t){t.d(r,{Z:function(){return d}});var a=t(74165),n=t(15861),s=t(29439),c=t(72791),i=t(24846),o=t(78983),l=t(78847),h=t(59135),u=t(80184),d=function(){var e=(0,c.useContext)(l.Z),r=e.accountsBlock,t=e.getStocks,d=e.stock,m=e.getCashPoints,p=e.cashPoints,f=(0,c.useState)({}),x=(0,s.Z)(f,2),v=x[0],y=x[1],j=(0,c.useState)(null),b=(0,s.Z)(j,2),g=b[0],w=b[1];(0,c.useEffect)((function(){var e=function(){var e=(0,n.Z)((0,a.Z)().mark((function e(){var t;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r();case 3:t=e.sent,y(t),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();e()}),[r]),(0,c.useEffect)((function(){var e=function(){var e=(0,n.Z)((0,a.Z)().mark((function e(){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t();case 3:e.sent,e.next=8;break;case 6:e.prev=6,e.t0=e.catch(0);case 8:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(){return e.apply(this,arguments)}}();e()}),[t]),(0,c.useEffect)((function(){var e=function(){var e=(0,n.Z)((0,a.Z)().mark((function e(){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m();case 3:e.sent,e.next=8;break;case 6:e.prev=6,e.t0=e.catch(0);case 8:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(){return e.apply(this,arguments)}}();e()}),[t]);return(0,u.jsxs)(o.rb,{children:[(0,u.jsx)(o.b7,{sm:6,lg:3,className:"d-flex flex-column",children:(0,u.jsx)("div",{className:"widget-container",children:(0,u.jsx)(o.co,{className:"mb-4",color:"primary",style:{height:"200px",overflow:"auto"},value:(0,u.jsxs)(u.Fragment,{children:["\u0627\u06a9\u0627\u0624\u0646\u0679\u0633",(0,u.jsxs)("span",{className:"fs-6 fw-normal",children:[" (",v.totalAccounts,")"]}),(0,u.jsx)("br",{}),(0,u.jsx)(h.gbA,{style:{color:"green",fontSize:"80%"}}),(0,u.jsxs)("span",{className:"fs-6 fw-normal",children:[" (",v.regularAccounts,")"]}),(0,u.jsx)("br",{}),(0,u.jsx)(h.gbA,{style:{color:"yellow",fontSize:"80%"}}),(0,u.jsxs)("span",{className:"fs-6 fw-normal",children:[" (",v.highRiskAccounts,")"]}),(0,u.jsx)("br",{}),(0,u.jsx)(h.gbA,{style:{color:"red",fontSize:"80%"}}),(0,u.jsxs)("span",{className:"fs-6 fw-normal",children:[" (",v.blackListedAccounts,")"]})]}),title:"",action:(0,u.jsxs)(o.w5,{alignment:"end",children:[(0,u.jsx)(o.SQ,{color:"transparent",caret:!1,className:"p-0",children:(0,u.jsx)(i.Z,{icon:"cilOptions",className:"text-high-emphasis-inverse"})}),(0,u.jsxs)(o.$H,{children:[(0,u.jsx)(o.$f,{children:"Action"}),(0,u.jsx)(o.$f,{children:"Another action"}),(0,u.jsx)(o.$f,{children:"Something else here..."}),(0,u.jsx)(o.$f,{disabled:!0,children:"Disabled action"})]})]})})})}),(0,u.jsx)(o.b7,{sm:6,lg:3,className:"d-flex flex-column",children:(0,u.jsx)("div",{className:"widget-container",children:(0,u.jsx)(o.co,{className:"mb-4",color:"info",style:{height:"200px",overflow:"auto"},value:(0,u.jsxs)(u.Fragment,{children:["\u0627\u0633\u0679\u0627\u06a9",(0,u.jsx)("span",{className:"fs-6 fw-normal",children:d.map((function(e,r){return(0,u.jsxs)("div",{children:[(0,u.jsxs)("div",{className:"d-flex justify-content-between",children:[(0,u.jsx)("span",{style:{float:"left"},children:e.quantity}),(0,u.jsx)("span",{className:"mx-3",style:{float:"right"},children:"Select Crop"===e.crop?"\u06a9\u0648\u0626\u06cc \u0627\u06cc\u06a9 \u0686\u0646\u06cc\u06ba":"Gandum"===e.crop?"\u06af\u0646\u062f\u0645":"Kapaas"===e.crop?"\u06a9\u067e\u0627\u0633":"Sarson"===e.crop?"\u0633\u0631\u0633\u0648\u06ba":"Mirch"===e.crop?"\u0645\u0631\u0686":"Moonji"===e.crop?"\u0645\u0648\u0646\u062c\u06be\u06cc":"Deegar"===e.crop?"\u062f\u06cc\u06af\u0631 (".concat(e.crop,")"):e.crop})]}),(0,u.jsx)("hr",{})," "]},r)}))})]}),action:(0,u.jsxs)(o.w5,{alignment:"end",children:[(0,u.jsx)(o.SQ,{color:"transparent",caret:!1,className:"p-0",children:(0,u.jsx)(i.Z,{icon:"cilOptions",className:"text-high-emphasis-inverse"})}),(0,u.jsxs)(o.$H,{children:[(0,u.jsx)(o.$f,{children:"Action"}),(0,u.jsx)(o.$f,{children:"Another action"}),(0,u.jsx)(o.$f,{children:"Something else here..."}),(0,u.jsx)(o.$f,{disabled:!0,children:"Disabled action"})]})]})})})}),(0,u.jsx)(o.b7,{sm:6,lg:3,className:"d-flex flex-column",children:(0,u.jsx)("div",{className:"widget-container",children:(0,u.jsx)(o.co,{className:"mb-4",color:"warning",style:{height:"200px",overflow:"auto"},value:(0,u.jsxs)(u.Fragment,{children:["\u06a9\u06cc\u0634 \u067e\u0648\u0627\u0626\u0646\u0679\u0633",(0,u.jsx)("span",{className:"fs-6 fw-normal",children:p.map((function(e,r){return(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{className:"float-start",children:e.name}),(0,u.jsx)("br",{}),(0,u.jsx)("div",{className:"",onClick:function(e){e.preventDefault(),e.stopPropagation()},onMouseDown:function(){w(r)},onMouseUp:function(){w(null)},onMouseLeave:function(){w(null)},children:g===r?"Rs "+(t=e.balance,"number"!==typeof t||isNaN(t)?"Invalid Amount":Math.abs(t).toLocaleString("en-PK",{style:"decimal",minimumFractionDigits:0,maximumFractionDigits:2})):"***"}),(0,u.jsx)("div",{className:"clearfix"}),r<p.length-1&&(0,u.jsx)("hr",{})]},r);var t}))})]}),action:(0,u.jsxs)(o.w5,{alignment:"end",children:[(0,u.jsx)(o.SQ,{color:"transparent",caret:!1,className:"p-0",children:(0,u.jsx)(i.Z,{icon:"cilOptions",className:"text-high-emphasis-inverse"})}),(0,u.jsxs)(o.$H,{children:[(0,u.jsx)(o.$f,{children:"Action"}),(0,u.jsx)(o.$f,{children:"Another action"}),(0,u.jsx)(o.$f,{children:"Something else here..."}),(0,u.jsx)(o.$f,{disabled:!0,children:"Disabled action"})]})]})})})}),(0,u.jsx)(o.b7,{sm:6,lg:3,className:"d-flex flex-column",children:(0,u.jsx)("div",{className:"widget-container",children:(0,u.jsx)(o.co,{className:"mb-4",color:"danger",style:{height:"200px",overflow:"auto"},value:(0,u.jsx)(u.Fragment,{}),action:(0,u.jsxs)(o.w5,{alignment:"end",children:[(0,u.jsx)(o.SQ,{color:"transparent",caret:!1,className:"p-0",children:(0,u.jsx)(i.Z,{icon:"cilOptions",className:"text-high-emphasis-inverse"})}),(0,u.jsxs)(o.$H,{children:[(0,u.jsx)(o.$f,{children:"Action"}),(0,u.jsx)(o.$f,{children:"Another action"}),(0,u.jsx)(o.$f,{children:"Something else here..."}),(0,u.jsx)(o.$f,{disabled:!0,children:"Disabled action"})]})]})})})})]})}},30434:function(e,r,t){t.d(r,{t:function(){return a}});var a=["32 32","<path d='M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z'/>"]},75015:function(e,r,t){t.d(r,{n:function(){return a}});var a=["32 32","<path d='M27.26 27.271h-4.733v-7.427c0-1.771-0.037-4.047-2.475-4.047-2.468 0-2.844 1.921-2.844 3.916v7.557h-4.739v-15.271h4.552v2.083h0.061c0.636-1.203 2.183-2.468 4.491-2.468 4.801 0 5.692 3.161 5.692 7.271v8.385zM7.115 9.912c-1.527 0-2.751-1.235-2.751-2.756 0-1.516 1.229-2.749 2.751-2.749s2.755 1.233 2.755 2.749c0 1.521-1.233 2.756-2.755 2.756zM9.489 27.271h-4.749v-15.271h4.749zM29.636 0h-27.276c-1.303 0-2.36 1.031-2.36 2.307v27.387c0 1.276 1.057 2.307 2.36 2.307h27.271c1.301 0 2.369-1.031 2.369-2.307v-27.387c0-1.276-1.068-2.307-2.369-2.307z'/>"]},24914:function(e,r,t){t.d(r,{_:function(){return a}});var a=["32 32","<path d='M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z'/>"]},49909:function(e,r,t){t.d(r,{J:function(){return a}});var a=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M472,96H384V40H352V96H160V40H128V96H40a24.028,24.028,0,0,0-24,24V456a24.028,24.028,0,0,0,24,24H472a24.028,24.028,0,0,0,24-24V120A24.028,24.028,0,0,0,472,96Zm-8,352H48V128h80v40h32V128H352v40h32V128h80Z' class='ci-primary'/><rect width='32' height='32' x='112' y='224' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='32' x='200' y='224' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='32' x='280' y='224' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='32' x='368' y='224' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='32' x='112' y='296' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='32' x='200' y='296' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='32' x='280' y='296' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='32' x='368' y='296' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='32' x='112' y='368' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='32' x='200' y='368' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='32' x='280' y='368' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='32' x='368' y='368' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/>"]}}]);
//# sourceMappingURL=272.94d6b37a.chunk.js.map