(this.webpackJsonpui=this.webpackJsonpui||[]).push([[0],{118:function(e,t,n){"use strict";n.r(t);var c=n(3),r=n(0),i=n.n(r),o=n(14),a=n.n(o),s=(n(75),n(36)),j=n(124),l=n(123),d=n(122),u=(n(76),n(77),new window.OPiN({mediaProperties:["blte489113c35e01211"],baseURL:"https://dev-nba-api.opin.media",sessionType:"cookie",cookieDomain:".nba.com",env:"dev"})),b={countryCode:"IN"};u.setLocale("en-US");var h=function(){var e=Object(r.useState)(!1),t=Object(s.a)(e,2),n=t[0],i=t[1],o=Object(r.useState)([]),a=Object(s.a)(o,2),h=a[0],g=a[1],O=Object(r.useState)(null),p=Object(s.a)(O,2),x=p[0],f=p[1];return Object(c.jsxs)("div",{className:"App",children:[Object(c.jsx)("br",{}),u.hasLoggedInPartner()?n?Object(c.jsx)(d.a,{size:"large"}):Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("p",{children:"Welcome you're logged In "}),Object(c.jsx)(j.a,{type:"primary",onClick:function(){return i(!0),u.logout().then((function(){f(null),g([]),i(!1)}))},children:"Logout"})]}):Object(c.jsx)("div",{children:x?function(){var e=x.data,t=e.logo,n=(e.partner_configuration_name,e.login_redirect);e.partner_type;return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(l.a,{width:200,src:t,placeholder:Object(c.jsx)(d.a,{size:"large"})}),Object(c.jsxs)("h2",{children:[x.getName()," - ",n?"Redirect Full Page":"Same Window"]}),Object(c.jsx)(j.a,{type:"primary",onClick:function(){x.executeWorkflow("#opin-wrapper")},children:"Execute Workflow"})]})}():Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(j.a,{onClick:function(){return i(!0),void u.detectPartners(b).then((function(e){g(e),i(!1)})).catch((function(e){}))},children:"Detect Partner"}),Object(c.jsx)("br",{}),Object(c.jsx)("br",{}),n?Object(c.jsx)(d.a,{size:"large"}):function(){var e={color:"blue"};return h&&h.length<=0?Object(c.jsx)("h2",{style:{color:"#a93f3f"},children:"No Partner found please click detect button or check SDK configuration!"}):Object(c.jsx)("div",{children:h.map((function(t){return Object(c.jsxs)("div",{style:{border:"1px solid grey",margin:"1% 30%"},children:[Object(c.jsxs)("h2",{style:e,children:[t.getName()," - ",t.data.login_redirect?"(Full Page Redirect Partner)":"(Non Full Page redirect Partner)"]}),Object(c.jsx)(j.a,{type:"primary",onClick:function(){return f(t)},children:"Activate"}),Object(c.jsx)("br",{}),Object(c.jsx)("br",{})]},t.getConfigurationUid())}))})}()]})}),Object(c.jsx)("div",{id:"opin-wrapper",style:{height:300}})]})},g=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,125)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,i=t.getLCP,o=t.getTTFB;n(e),c(e),r(e),i(e),o(e)}))};a.a.render(Object(c.jsx)(i.a.StrictMode,{children:Object(c.jsx)(h,{})}),document.getElementById("root")),g()},75:function(e,t,n){},77:function(e,t,n){}},[[118,1,2]]]);
//# sourceMappingURL=main.b63028f1.chunk.js.map