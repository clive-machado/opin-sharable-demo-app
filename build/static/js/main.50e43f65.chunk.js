(this.webpackJsonpui=this.webpackJsonpui||[]).push([[0],{118:function(e,t,n){"use strict";n.r(t);var c=n(3),r=n(0),i=n.n(r),a=n(14),o=n.n(a),j=(n(75),n(36)),s=n(124),l=n(123),d=n(122),u=(n(76),n(77),new window.OPiN({mediaProperties:["blt5de182c7688d8331"],baseURL:"https://dev-nba-api.opin.media"})),b={countryCode:"IN"};u.setLocale("en-US");var O=function(){var e=Object(r.useState)(!1),t=Object(j.a)(e,2),n=t[0],i=t[1],a=Object(r.useState)([]),o=Object(j.a)(a,2),O=o[0],h=o[1],g=Object(r.useState)(null),p=Object(j.a)(g,2),x=p[0],f=p[1];return Object(c.jsxs)("div",{className:"App",children:[Object(c.jsx)("br",{}),u.hasLoggedInPartner()?n?Object(c.jsx)(d.a,{size:"large"}):Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("p",{children:"Welcome you're logged In "}),Object(c.jsx)(s.a,{type:"primary",onClick:function(){return i(!0),u.logout().then((function(){f(null),h([]),i(!1)}))},children:"Logout"})]}):Object(c.jsx)("div",{children:x?function(){var e=x.data,t=e.logo,n=(e.partner_configuration_name,e.login_redirect);e.partner_type;return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(l.a,{width:200,src:t,placeholder:Object(c.jsx)(d.a,{size:"large"})}),Object(c.jsxs)("h2",{children:[x.getName()," - ",n?"Redirect Full Page":"Same Window"]}),Object(c.jsx)(s.a,{type:"primary",onClick:function(){x.executeWorkflow("#opin-wrapper")},children:"Execute Workflow"})]})}():Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(s.a,{onClick:function(){return i(!0),void u.detectPartners(b).then((function(e){h(e),i(!1)})).catch((function(e){}))},children:"Detect Partner"}),Object(c.jsx)("br",{}),Object(c.jsx)("br",{}),n?Object(c.jsx)(d.a,{size:"large"}):function(){var e={color:"blue"};return Object(c.jsx)("div",{children:O.map((function(t){return Object(c.jsxs)("div",{children:[Object(c.jsxs)("h2",{style:e,children:[t.getName()," - ",t.data.login_redirect?"Redirect Full Page":"Same Window"]}),Object(c.jsx)(s.a,{type:"primary",onClick:function(){return f(t)},children:"Activate"}),Object(c.jsx)("br",{}),Object(c.jsx)("br",{})]},t.getConfigurationUid())}))})}()]})}),Object(c.jsx)("div",{id:"opin-wrapper",style:{height:300}})]})},h=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,125)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),i(e),a(e)}))};o.a.render(Object(c.jsx)(i.a.StrictMode,{children:Object(c.jsx)(O,{})}),document.getElementById("root")),h()},75:function(e,t,n){},77:function(e,t,n){}},[[118,1,2]]]);
//# sourceMappingURL=main.50e43f65.chunk.js.map