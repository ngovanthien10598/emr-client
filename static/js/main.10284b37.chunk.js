(this["webpackJsonpemr-client-js"]=this["webpackJsonpemr-client-js"]||[]).push([[0],{209:function(e,t,n){},366:function(e,t,n){},367:function(e,t,n){"use strict";n.r(t);var c=n(2),a=n(0),r=n(30),i=n.n(r),s=(n(209),n(11)),o=n.n(s),u=n(26),j=n(40),l=n(41),d=n(373),b=n(375),h=n(46),O=n(368),x=function(){return Object(c.jsxs)("svg",{width:"50",height:"50",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",version:"1.1",id:"Capa_1",x:"0px",y:"0px",viewBox:"0 0 512.002 512.002",fill:"currentColor",xmlSpace:"preserve",children:[Object(c.jsx)("g",{children:Object(c.jsx)("g",{children:Object(c.jsxs)("g",{children:[Object(c.jsx)("circle",{cx:"338",cy:"346.001",r:"20"}),Object(c.jsx)("path",{d:"M238,472.001H80c-22.056,0-40-17.944-40-40v-164c0-22.056,17.944-40,40-40h288c22.056,0,40,17.944,40,40v40     c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20v-40c0-44.112-35.888-80-80-80h-24.037v-70.534     c0-64.771-53.832-117.466-120-117.466s-120,52.695-120,117.466v70.534H80c-44.112,0-80,35.888-80,80v164     c0,44.112,35.888,80,80,80h158c11.046,0,20-8.954,20-20S249.046,472.001,238,472.001z M143.963,117.467     c0-42.715,35.888-77.466,80-77.466s80,34.751,80,77.466v70.534h-160V117.467z"}),Object(c.jsx)("path",{d:"M503.643,325.739c-8.982-6.431-21.477-4.362-27.904,4.62l-98.581,137.7c-2.692,3.122-6.066,3.796-7.874,3.916     c-1.854,0.123-5.424-0.112-8.567-3.061l-63.708-62.171c-7.906-7.716-20.568-7.559-28.282,0.345     c-7.715,7.905-7.561,20.567,0.345,28.282l63.82,62.281c0.06,0.058,0.119,0.116,0.18,0.173C342.639,506.933,355.41,512,368.55,512     c1.129,0,2.261-0.037,3.393-0.113c14.314-0.954,27.679-7.915,36.666-19.097c0.232-0.29,0.456-0.585,0.673-0.887l98.981-138.26     C514.692,344.662,512.624,332.168,503.643,325.739z"}),Object(c.jsx)("circle",{cx:"262",cy:"346.001",r:"20"}),Object(c.jsx)("circle",{cx:"112",cy:"346.001",r:"20"}),Object(c.jsx)("circle",{cx:"187",cy:"346.001",r:"20"})]})})}),Object(c.jsx)("g",{}),Object(c.jsx)("g",{}),Object(c.jsx)("g",{}),Object(c.jsx)("g",{}),Object(c.jsx)("g",{}),Object(c.jsx)("g",{}),Object(c.jsx)("g",{}),Object(c.jsx)("g",{}),Object(c.jsx)("g",{}),Object(c.jsx)("g",{}),Object(c.jsx)("g",{}),Object(c.jsx)("g",{}),Object(c.jsx)("g",{}),Object(c.jsx)("g",{}),Object(c.jsx)("g",{})]})},p=n(50),f="LOGIN_PENDING",m="LOGIN_SUCCESS",g="LOGIN_FAILURE",v="GET_PROFILE_PENDING",y="GET_PROFILE_SUCCESS",k="GET_PROFILE_FAILURE",w="LOGOUT",_="https://emr-2020.wl.r.appspot.com/api",S=n(37),E=n.n(S),I="".concat(_,"/auth");function C(e,t){var n="".concat(I,"/login/");return E.a.post(n,{email:e,password:t})}function T(e){var t="".concat(I,"/refresh-token/");return E.a.post(t,{refresh_token:e})}var F=n(43),N=n.n(F),P="".concat(_,"/user");function L(){var e="".concat(P,"/profile/");return E.a.get(e)}function R(e){return{type:y,payload:e}}function M(){return function(){var e=Object(u.a)(o.a.mark((function e(t){var n,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t({type:v}),e.next=4,L();case 4:n=e.sent,c=n.data,t(R(c)),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0),t({type:k});case 13:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t){return e.apply(this,arguments)}}()}function D(){return N.a.remove("EMR_token"),N.a.remove("EMR_refresh"),function(e){e({type:w})}}var V=function(){var e=Object(l.g)(),t=Object(p.b)(),n=Object(p.c)((function(e){return e.authState})),r=Object(p.c)((function(e){return e.userState})),i=r.user;return Object(a.useEffect)((function(){if(i&&i.role){var t=function(e){if(!e)return"/login";switch(e.id){case 1:return"/admin";case 2:return"/physician";case 3:return"/receitionist";case 4:return"/patient";default:return""}}(i.role);console.log(t),e.replace(t)}}),[i]),Object(c.jsxs)(d.a,{className:"login-form",layout:"vertical",autoComplete:"off",onFinish:function(e){var n,c;t((n=e.email,c=e.password,function(){var e=Object(u.a)(o.a.mark((function e(t){var a,r,i,s;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t({type:f}),e.next=4,C(n,c);case 4:a=e.sent,r=a.data,i=r.access_token,s=r.refresh_token,N.a.set("EMR_token",i,{expires:3/24}),N.a.set("EMR_refresh",s,{expires:7}),t({type:m}),t(M()),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),t({type:g});case 17:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(t){return e.apply(this,arguments)}}()))},children:[Object(c.jsx)("div",{className:"text-center",children:Object(c.jsxs)("div",{className:"login-form__header",children:[Object(c.jsx)(O.a,{component:x}),Object(c.jsx)("h1",{className:"text-3xl",children:"\u0110\u0103ng nh\u1eadp"})]})}),Object(c.jsx)(d.a.Item,{name:"email",children:Object(c.jsx)(b.a,{type:"email",placeholder:"Email"})}),Object(c.jsx)(d.a.Item,{name:"password",className:"m-0",children:Object(c.jsx)(b.a.Password,{placeholder:"M\u1eadt kh\u1ea9u"})}),Object(c.jsx)(j.b,{className:"block mt-2 mb-6",to:"/forgot-password",children:"Qu\xean m\u1eadt kh\u1ea9u"}),Object(c.jsx)(d.a.Item,{children:Object(c.jsx)(h.a,{loading:n.loginLoading||r.getProfileLoading,block:!0,type:"primary",size:"large",htmlType:"submit",children:"\u0110\u0103ng nh\u1eadp"})})]})},B=function(e){return Object(c.jsx)("main",{className:"login-page",children:Object(c.jsx)(V,{})})},G=n(96),H=n(371),U=n(88),A=n(384),z=n(385),X=n(386),K=n(387),Q=n(388),W=n(389),q=n(390),J=n(391),$=n(392),Y=n(393),Z=n(394),ee=n(395),te=function(){return Object(c.jsx)("div",{children:"Admin dashboard"})},ne=n(7),ce=n(377),ae=n(378),re=n(369),ie=n(370),se=n(372),oe=n(374),ue=n(379),je=n(380),le=n(381),de=function(e){var t=e.form,n=e.onFinish,a=e.defaultCategory;return Object(c.jsx)(d.a,{layout:"vertical",form:t,onFinish:n,children:Object(c.jsx)(d.a.Item,{label:"Lo\u1ea1i thu\u1ed1c",name:"name",initialValue:null===a||void 0===a?void 0:a.name,children:Object(c.jsx)(b.a,{autoFocus:!0})})})},be="".concat(_,"/admin/manage-drug-category");function he(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t="".concat(be,"/?search=").concat(e);return E.a.get(t)}function Oe(e){var t="".concat(be,"/");return E.a.post(t,{name:e})}function xe(e,t){var n="".concat(be,"/").concat(e,"/");return E.a.put(n,{name:t})}function pe(e){var t="".concat(be,"/").concat(e,"/");return E.a.delete(t)}var fe="CREATE",me="UPDATE",ge=function(){var e=Object(a.useState)(!1),t=Object(ne.a)(e,2),n=t[0],r=t[1],i=Object(a.useState)([]),s=Object(ne.a)(i,2),j=s[0],l=s[1],b=Object(a.useState)(!1),O=Object(ne.a)(b,2),x=O[0],p=O[1],f=Object(a.useState)(!1),m=Object(ne.a)(f,2),g=m[0],v=m[1],y=Object(a.useState)(fe),k=Object(ne.a)(y,2),w=k[0],_=k[1],S=Object(a.useState)(null),E=Object(ne.a)(S,2),I=E[0],C=E[1],T=d.a.useForm(),F=Object(ne.a)(T,1)[0],N=[{title:"#",key:"#",render:function(e,t,n){return n+1}},{title:"T\xean",key:"name",dataIndex:"name"},{title:"H\xe0nh \u0111\u1ed9ng",key:"action",render:function(e,t,n){return Object(c.jsxs)(ce.b,{size:10,children:[Object(c.jsx)(h.a,{icon:Object(c.jsx)(ue.a,{}),onClick:function(){return e=t,_(me),C(e),void r(!0);var e}}),Object(c.jsx)(ae.a,{onConfirm:function(){return function(e){return D.apply(this,arguments)}(t)},title:"B\u1ea1n c\xf3 ch\u1eafc mu\u1ed1n x\xf3a kh\xf4ng?",okText:"X\xf3a",okType:"danger",cancelText:"H\u1ee7y b\u1ecf",children:Object(c.jsx)(h.a,{icon:Object(c.jsx)(je.a,{})})})]})}}];function P(){return L.apply(this,arguments)}function L(){return(L=Object(u.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,p(!0),e.next=4,he();case 4:t=e.sent,l(t.data),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:return e.prev=11,p(!1),e.finish(11);case 14:case"end":return e.stop()}}),e,null,[[0,8,11,14]])})))).apply(this,arguments)}function R(){return M.apply(this,arguments)}function M(){return(M=Object(u.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,v(!0),e.next=4,F.validateFields();case 4:if(t=e.sent,w!==fe){e.next=8;break}return e.next=8,Oe(t.name);case 8:if(w!==me){e.next=11;break}return e.next=11,xe(I.id,t.name);case 11:P(),r(!1),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(0),console.log(e.t0);case 18:return e.prev=18,v(!1),F.resetFields(),e.finish(18);case 22:case"end":return e.stop()}}),e,null,[[0,15,18,22]])})))).apply(this,arguments)}function D(){return(D=Object(u.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,pe(t.id);case 3:P(),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.log(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)}return Object(a.useEffect)((function(){P()}),[]),Object(c.jsxs)(c.Fragment,{children:[Object(c.jsxs)(re.a,{justify:"space-between",children:[Object(c.jsx)(ie.a,{children:Object(c.jsx)("h1",{className:"text-xl",children:"\u0110\u01a1n v\u1ecb t\xednh"})}),Object(c.jsx)(ie.a,{children:Object(c.jsx)(h.a,{type:"primary",icon:Object(c.jsx)(le.a,{}),onClick:function(){_(fe),r(!0)},children:"T\u1ea1o m\u1edbi"})})]}),Object(c.jsx)(se.a,{rowKey:"id",columns:N,dataSource:j,loading:x}),Object(c.jsx)(oe.a,{visible:n,title:w===fe?"Th\xeam lo\u1ea1i thu\u1ed1c":"C\u1eadp nh\u1eadt lo\u1ea1i thu\u1ed1c",onCancel:function(){r(!1)},confirmLoading:g,destroyOnClose:!0,afterClose:function(){F.resetFields(),C(null)},onOk:R,children:Object(c.jsx)(de,{onFinish:R,form:F,defaultCategory:I})})]})},ve=function(e){var t=e.form,n=e.onFinish,a=e.defaultUnit;return Object(c.jsx)(d.a,{layout:"vertical",form:t,onFinish:n,children:Object(c.jsx)(d.a.Item,{label:"\u0110\u01a1n v\u1ecb t\xednh",name:"name",initialValue:null===a||void 0===a?void 0:a.name,children:Object(c.jsx)(b.a,{autoFocus:!0})})})},ye="".concat(_,"/admin/manage-drug-unit");function ke(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t="".concat(ye,"/?search=").concat(e);return E.a.get(t)}function we(e){var t="".concat(ye,"/");return E.a.post(t,{name:e})}function _e(e,t){var n="".concat(ye,"/").concat(e,"/");return E.a.put(n,{name:t})}function Se(e){var t="".concat(ye,"/").concat(e,"/");return E.a.delete(t)}var Ee=function(){var e=Object(a.useState)(!1),t=Object(ne.a)(e,2),n=t[0],r=t[1],i=Object(a.useState)([]),s=Object(ne.a)(i,2),j=s[0],l=s[1],b=Object(a.useState)(!1),O=Object(ne.a)(b,2),x=O[0],p=O[1],f=Object(a.useState)(!1),m=Object(ne.a)(f,2),g=m[0],v=m[1],y=Object(a.useState)(fe),k=Object(ne.a)(y,2),w=k[0],_=k[1],S=Object(a.useState)(null),E=Object(ne.a)(S,2),I=E[0],C=E[1],T=d.a.useForm(),F=Object(ne.a)(T,1)[0],N=[{title:"#",key:"#",render:function(e,t,n){return n+1}},{title:"\u0110\u01a1n v\u1ecb t\xednh",key:"name",dataIndex:"name"},{title:"H\xe0nh \u0111\u1ed9ng",key:"action",render:function(e,t,n){return Object(c.jsxs)(ce.b,{size:10,children:[Object(c.jsx)(h.a,{icon:Object(c.jsx)(ue.a,{}),onClick:function(){return e=t,_(me),C(e),void r(!0);var e}}),Object(c.jsx)(ae.a,{onConfirm:function(){return function(e){return D.apply(this,arguments)}(t)},title:"B\u1ea1n c\xf3 ch\u1eafc mu\u1ed1n x\xf3a kh\xf4ng?",okText:"X\xf3a",okType:"danger",cancelText:"H\u1ee7y b\u1ecf",children:Object(c.jsx)(h.a,{icon:Object(c.jsx)(je.a,{})})})]})}}];function P(){return L.apply(this,arguments)}function L(){return(L=Object(u.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,p(!0),e.next=4,ke();case 4:t=e.sent,l(t.data),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:return e.prev=11,p(!1),e.finish(11);case 14:case"end":return e.stop()}}),e,null,[[0,8,11,14]])})))).apply(this,arguments)}function R(){return M.apply(this,arguments)}function M(){return(M=Object(u.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,v(!0),e.next=4,F.validateFields();case 4:if(t=e.sent,w!==fe){e.next=8;break}return e.next=8,we(t.name);case 8:if(w!==me){e.next=11;break}return e.next=11,_e(I.id,t.name);case 11:P(),r(!1),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(0),console.log(e.t0);case 18:return e.prev=18,v(!1),F.resetFields(),e.finish(18);case 22:case"end":return e.stop()}}),e,null,[[0,15,18,22]])})))).apply(this,arguments)}function D(){return(D=Object(u.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Se(t.id);case 3:P(),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.log(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)}return Object(a.useEffect)((function(){P()}),[]),Object(c.jsxs)(c.Fragment,{children:[Object(c.jsxs)(re.a,{justify:"space-between",children:[Object(c.jsx)(ie.a,{children:Object(c.jsx)("h1",{className:"text-xl",children:"\u0110\u01a1n v\u1ecb t\xednh"})}),Object(c.jsx)(ie.a,{children:Object(c.jsx)(h.a,{type:"primary",icon:Object(c.jsx)(le.a,{}),onClick:function(){_(fe),r(!0)},children:"T\u1ea1o m\u1edbi"})})]}),Object(c.jsx)(se.a,{rowKey:"id",columns:N,dataSource:j,loading:x}),Object(c.jsx)(oe.a,{visible:n,title:w===fe?"Th\xeam \u0111\u01a1n v\u1ecb t\xednh":"C\u1eadp nh\u1eadt \u0111\u01a1n v\u1ecb t\xednh",onCancel:function(){r(!1)},confirmLoading:g,destroyOnClose:!0,afterClose:function(){F.resetFields(),C(null)},onOk:R,children:Object(c.jsx)(ve,{onFinish:R,form:F,defaultUnit:I})})]})},Ie=n(8),Ce=n(187),Te=n(107),Fe="".concat(_,"/admin/manage-drug");function Ne(){var e="".concat(Fe,"/");return E.a.get(e)}function Pe(e){var t="".concat(Fe,"/").concat(e,"/");return E.a.get(t)}function Le(e){var t=e.code,n=e.name,c=e.drug_category,a=e.price,r=e.drug_unit,i="".concat(Fe,"/");return E.a.post(i,{code:t,name:n,drug_category:c,price:a,drug_unit:r})}function Re(e,t){var n=t.code,c=t.name,a=t.drug_category,r=t.price,i=t.drug_unit,s="".concat(Fe,"/").concat(e,"/");return E.a.put(s,{code:n,name:c,drug_category:a,price:r,drug_unit:i})}function Me(e){var t="".concat(Fe,"/").concat(e,"/");return E.a.delete(t)}var De=function(e){var t=e.form,n=e.onFinish,r=e.defaultDrug,i=Object(a.useState)([]),s=Object(ne.a)(i,2),j=s[0],l=s[1],h=Object(a.useState)([]),O=Object(ne.a)(h,2),x=O[0],p=O[1],f=Object(a.useState)(null),m=Object(ne.a)(f,2),g=m[0],v=m[1],y=Object(a.useState)(!1),k=Object(ne.a)(y,2),w=k[0],_=k[1],S=Object(a.useState)(!1),E=Object(ne.a)(S,2),I=E[0],C=E[1],T=Object(a.useState)(!1),F=Object(ne.a)(T,2),N=F[0],P=F[1];function L(){return R.apply(this,arguments)}function R(){return(R=Object(u.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,_(!0),e.next=4,he();case 4:t=e.sent,l(t.data),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:return e.prev=11,_(!1),e.finish(11);case 14:case"end":return e.stop()}}),e,null,[[0,8,11,14]])})))).apply(this,arguments)}function M(){return D.apply(this,arguments)}function D(){return(D=Object(u.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,C(!0),e.next=4,ke();case 4:t=e.sent,p(t.data),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:return e.prev=11,C(!1),e.finish(11);case 14:case"end":return e.stop()}}),e,null,[[0,8,11,14]])})))).apply(this,arguments)}function V(e){return B.apply(this,arguments)}function B(){return(B=Object(u.a)(o.a.mark((function e(t){var n,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,P(!0),e.next=4,Pe(t);case 4:n=e.sent,c=n.data,v(c),l((function(e){var t=e.findIndex((function(e){return e.id===r.drug_category}));return t>-1?(e[t]=c.drug_category,e):[c.drug_category].concat(Object(Ie.a)(e))})),p((function(e){var t=e.findIndex((function(e){return e.id===r.drug_unit}));return t>-1?(e[t]=c.drug_unit,e):[c.drug_unit].concat(Object(Ie.a)(e))})),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.log(e.t0);case 14:return e.prev=14,P(!1),e.finish(14);case 17:case"end":return e.stop()}}),e,null,[[0,11,14,17]])})))).apply(this,arguments)}function G(){return(G=Object(u.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(null===r||void 0===r?void 0:r.id)){e.next=5;break}return e.next=3,Promise.all([V(r.id),L(),M()]);case 3:e.next=7;break;case 5:return e.next=7,Promise.all([L(),M()]);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(a.useEffect)((function(){!function(){G.apply(this,arguments)}()}),[]),Object(a.useEffect)((function(){g&&t.setFieldsValue({code:g.code,name:g.name,price:g.price,drug_category:g.drug_category.id,drug_unit:g.drug_unit.id})}),[g,r]),Object(c.jsx)(Ce.a,{spinning:N,children:Object(c.jsxs)(d.a,{layout:"vertical",form:t,onFinish:n,children:[Object(c.jsx)(d.a.Item,{label:"M\xe3 thu\u1ed1c",name:"code",initialValue:null===g||void 0===g?void 0:g.code,children:Object(c.jsx)(b.a,{})}),Object(c.jsx)(d.a.Item,{label:"T\xean thu\u1ed1c",name:"name",initialValue:null===g||void 0===g?void 0:g.name,children:Object(c.jsx)(b.a,{})}),Object(c.jsx)(d.a.Item,{label:"Gi\xe1",name:"price",initialValue:null===g||void 0===g?void 0:g.price,children:Object(c.jsx)(b.a,{type:"number"})}),Object(c.jsx)(d.a.Item,{label:"Lo\u1ea1i thu\u1ed1c",name:"drug_category",initialValue:null===g||void 0===g?void 0:g.drug_category.id,children:Object(c.jsx)(Te.a,{loading:w,children:j.map((function(e){return Object(c.jsx)(Te.a.Option,{value:e.id,children:e.name},e.id)}))})}),Object(c.jsx)(d.a.Item,{label:"\u0110\u01a1n v\u1ecb t\xednh",name:"drug_unit",initialValue:null===g||void 0===g?void 0:g.drug_unit.id,children:Object(c.jsx)(Te.a,{loading:I,children:x.map((function(e){return Object(c.jsx)(Te.a.Option,{value:e.id,children:e.name},e.id)}))})})]})})},Ve=n(192),Be=function(){var e=Object(a.useState)(!1),t=Object(ne.a)(e,2),n=t[0],r=t[1],i=Object(a.useState)(),s=Object(ne.a)(i,2),j=s[0],l=s[1],b=Object(a.useState)(!1),O=Object(ne.a)(b,2),x=O[0],p=O[1],f=Object(a.useState)(!1),m=Object(ne.a)(f,2),g=m[0],v=m[1],y=Object(a.useState)(fe),k=Object(ne.a)(y,2),w=k[0],_=k[1],S=Object(a.useState)(null),E=Object(ne.a)(S,2),I=E[0],C=E[1],T=d.a.useForm(),F=Object(ne.a)(T,1)[0],N=[{title:"#",key:"#",render:function(e,t,n){return n+1}},{title:"M\xe3 thu\u1ed1c",key:"code",dataIndex:"code"},{title:"T\xean thu\u1ed1c",key:"name",dataIndex:"name"},{title:"Gi\xe1",key:"price",dataIndex:"price",render:function(e,t,n){return Object(c.jsx)(Ve.a,{thousandSeparator:" ",suffix:" VN\u0110",value:e,displayType:"text"})}},{title:"H\xe0nh \u0111\u1ed9ng",key:"action",render:function(e,t,n){return Object(c.jsxs)(ce.b,{size:10,children:[Object(c.jsx)(h.a,{icon:Object(c.jsx)(ue.a,{}),onClick:function(){return e=t,_(me),C(e),void r(!0);var e}}),Object(c.jsx)(ae.a,{onConfirm:function(){return function(e){return D.apply(this,arguments)}(t)},title:"B\u1ea1n c\xf3 ch\u1eafc mu\u1ed1n x\xf3a kh\xf4ng?",okText:"X\xf3a",okType:"danger",cancelText:"H\u1ee7y b\u1ecf",children:Object(c.jsx)(h.a,{icon:Object(c.jsx)(je.a,{})})})]})}}];function P(){return L.apply(this,arguments)}function L(){return(L=Object(u.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,p(!0),e.next=4,Ne();case 4:t=e.sent,l(t.data.results),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:return e.prev=11,p(!1),e.finish(11);case 14:case"end":return e.stop()}}),e,null,[[0,8,11,14]])})))).apply(this,arguments)}function R(){return M.apply(this,arguments)}function M(){return(M=Object(u.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,v(!0),e.next=4,F.validateFields();case 4:if(t=e.sent,n={code:t.code,name:t.name,price:t.price,drug_category:t.drug_category,drug_unit:t.drug_unit},w!==fe){e.next=9;break}return e.next=9,Le(n);case 9:if(w!==me){e.next=12;break}return e.next=12,Re(I.id,n);case 12:P(),r(!1),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(0),console.log(e.t0);case 19:return e.prev=19,v(!1),F.resetFields(),e.finish(19);case 23:case"end":return e.stop()}}),e,null,[[0,16,19,23]])})))).apply(this,arguments)}function D(){return(D=Object(u.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Me(t.id);case 3:P(),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.log(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)}return Object(a.useEffect)((function(){P()}),[]),Object(c.jsxs)(c.Fragment,{children:[Object(c.jsxs)(re.a,{justify:"space-between",children:[Object(c.jsx)(ie.a,{children:Object(c.jsx)("h1",{className:"text-xl",children:"\u0110\u01a1n v\u1ecb t\xednh"})}),Object(c.jsx)(ie.a,{children:Object(c.jsx)(h.a,{type:"primary",icon:Object(c.jsx)(le.a,{}),onClick:function(){_(fe),r(!0)},children:"T\u1ea1o m\u1edbi"})})]}),Object(c.jsx)(se.a,{rowKey:"id",columns:N,dataSource:j,loading:x}),Object(c.jsx)(oe.a,{visible:n,title:w===fe?"Th\xeam \u0111\u01a1n v\u1ecb t\xednh":"C\u1eadp nh\u1eadt \u0111\u01a1n v\u1ecb t\xednh",onCancel:function(){r(!1)},confirmLoading:g,destroyOnClose:!0,afterClose:function(){F.resetFields(),C(null)},onOk:R,children:Object(c.jsx)(De,{onFinish:R,form:F,defaultDrug:I})})]})},Ge=function(){return Object(c.jsx)("div",{children:"Drug Instruction"})},He=function(){return Object(c.jsx)("div",{children:"Disease category page"})},Ue=function(){return Object(c.jsx)("div",{children:"Disease Page"})},Ae=function(){return Object(c.jsx)("div",{children:"Notification Page"})},ze=function(){return Object(c.jsx)("div",{children:"Visit page"})},Xe=function(){return Object(c.jsx)("div",{children:"Patient page"})},Ke=function(){return Object(c.jsx)("div",{children:"Appointment Page"})},Qe=function(){return Object(c.jsx)("div",{children:"Service Page"})},We=function(){return Object(c.jsx)("div",{children:"WorkingHour Page"})},qe=function(){return Object(c.jsx)("div",{children:"RoomPage"})},Je=function(){return Object(c.jsx)("div",{children:"Account Page"})},$e=function(){return Object(c.jsx)("div",{children:"Admin setting page"})},Ye=n(1),Ze=function(e,t){return function(n){var r=Object(p.b)(),i=N.a.get("EMR_token"),s=(N.a.get("EMR_refresh"),Object(p.c)((function(e){return e.userState.user})));Object(a.useEffect)((function(){s&&s.role&&(function(e){var n=null===e||void 0===e?void 0:e.role.name;return t.includes(n)}(s)||r(D()))}),[s]);try{return i&&0!==i.length&&Object(G.a)(i)?Object(c.jsx)(e,Object(Ye.a)({},n)):Object(c.jsx)(l.a,{to:"/login"})}catch(o){console.log(o)}}},et=n(382),tt=n(383),nt=H.a.Header,ct=function(){var e=Object(p.b)(),t=Object(p.c)((function(e){return e.userState.user}));return Object(c.jsxs)(nt,{className:"header flex items-center",children:[Object(c.jsx)("div",{className:"text-2xl text-white",children:"EMR"}),Object(c.jsx)("div",{className:"ml-auto"}),Object(c.jsxs)("div",{className:"text-white",children:[null===t||void 0===t?void 0:t.first_name," ",null===t||void 0===t?void 0:t.last_name," ",Object(c.jsx)("span",{className:"ml-3",children:"|"})]}),Object(c.jsx)(h.a,{type:"default",ghost:!0,icon:Object(c.jsx)(tt.a,{}),className:"border-none",onClick:function(){oe.a.confirm({title:"\u0110\u0103ng xu\u1ea5t",icon:Object(c.jsx)(et.a,{}),content:"B\u1ea1n c\xf3 ch\u1eafc mu\u1ed1n \u0111\u0103ng xu\u1ea5t kh\xf4ng?",onOk:function(){e(D())}})},children:"\u0110\u0103ng xu\u1ea5t"})]})},at=H.a.Sider,rt=H.a.Content,it=U.a.SubMenu,st=Ze((function(){var e=Object(l.i)(),t=Object(l.h)(),n=e.path;return Object(c.jsxs)(H.a,{children:[Object(c.jsx)(ct,{}),Object(c.jsxs)(H.a,{children:[Object(c.jsx)(at,{width:200,className:"site-layout-background",children:Object(c.jsxs)(U.a,{mode:"inline",style:{height:"100%",borderRight:0},selectedKeys:[t.pathname],children:[Object(c.jsx)(U.a.Item,{icon:Object(c.jsx)(A.a,{}),children:Object(c.jsx)(j.b,{to:"/admin/dashboard",children:"B\u1ea3ng \u0111i\u1ec1u khi\u1ec3n"})},"/admin/dashboard"),Object(c.jsxs)(it,{icon:Object(c.jsx)(z.a,{}),title:"Qu\u1ea3n l\xfd thu\u1ed1c",children:[Object(c.jsx)(U.a.Item,{children:Object(c.jsx)(j.b,{to:"/admin/drug/category",children:"Lo\u1ea1i thu\u1ed1c"})},"/admin/drug/category"),Object(c.jsx)(U.a.Item,{children:Object(c.jsx)(j.b,{to:"/admin/drug/unit",children:"\u0110\u01a1n v\u1ecb t\xednh"})},"/admin/drug/unit"),Object(c.jsx)(U.a.Item,{children:Object(c.jsx)(j.b,{to:"/admin/drug",children:"Thu\u1ed1c"})},"/admin/drug"),Object(c.jsx)(U.a.Item,{children:Object(c.jsx)(j.b,{to:"/admin/drug/instruction",children:"S\u1eed d\u1ee5ng"})},"/admin/drug/instruction")]},"drug"),Object(c.jsxs)(it,{icon:Object(c.jsx)(X.a,{}),title:"Qu\u1ea3n l\xfd b\u1ec7nh",children:[Object(c.jsx)(U.a.Item,{children:Object(c.jsx)(j.b,{to:"/admin/disease/category",children:"Lo\u1ea1i b\u1ec7nh"})},"/admin/disease/category"),Object(c.jsx)(U.a.Item,{children:Object(c.jsx)(j.b,{to:"/admin/disease",children:"B\u1ec7nh"})},"/admin/disease")]},"disease"),Object(c.jsx)(U.a.Item,{icon:Object(c.jsx)(K.a,{}),children:Object(c.jsx)(j.b,{to:"/admin/notification",children:"Th\xf4ng b\xe1o"})},"/admin/notification"),Object(c.jsx)(U.a.Item,{icon:Object(c.jsx)(Q.a,{}),children:Object(c.jsx)(j.b,{to:"/admin/visit",children:"Kh\xe1m ch\u1eefa b\u1ec7nh"})},"/admin/visit"),Object(c.jsx)(U.a.Item,{icon:Object(c.jsx)(W.a,{}),children:Object(c.jsx)(j.b,{to:"/admin/patient",children:"B\u1ec7nh nh\xe2n"})},"/admin/patient"),Object(c.jsx)(U.a.Item,{icon:Object(c.jsx)(q.a,{}),children:Object(c.jsx)(j.b,{to:"/admin/appointment",children:"L\u1ecbch h\u1eb9n"})},"/admin/appointment"),Object(c.jsx)(U.a.Item,{icon:Object(c.jsx)(J.a,{}),children:Object(c.jsx)(j.b,{to:"/admin/service",children:"D\u1ecbch v\u1ee5"})},"/admin/service"),Object(c.jsx)(U.a.Item,{icon:Object(c.jsx)($.a,{}),children:Object(c.jsx)(j.b,{to:"/admin/working-hour",children:"Gi\u1edd l\xe0m vi\u1ec7c"})},"/admin/working-hour"),Object(c.jsx)(U.a.Item,{icon:Object(c.jsx)(Y.a,{}),children:Object(c.jsx)(j.b,{to:"/admin/room",children:"Ph\xf2ng"})},"/admin/room"),Object(c.jsx)(U.a.Item,{icon:Object(c.jsx)(Z.a,{}),children:Object(c.jsx)(j.b,{to:"/admin/account",children:"T\xe0i kho\u1ea3n"})},"/admin/account"),Object(c.jsx)(U.a.Item,{icon:Object(c.jsx)(ee.a,{}),children:Object(c.jsx)(j.b,{to:"/admin/setting",children:"C\xe0i \u0111\u1eb7t"})},"/admin/setting")]})}),Object(c.jsx)(H.a,{style:{padding:"0 24px 24px"},children:Object(c.jsx)(rt,{className:"site-layout-background",style:{padding:24,margin:0,minHeight:280},children:Object(c.jsxs)(l.d,{children:[Object(c.jsx)(l.b,{path:"".concat(n,"/dashboard"),children:Object(c.jsx)(te,{})}),Object(c.jsx)(l.b,{path:"".concat(n,"/drug/category"),children:Object(c.jsx)(ge,{})}),Object(c.jsx)(l.b,{path:"".concat(n,"/drug/unit"),children:Object(c.jsx)(Ee,{})}),Object(c.jsx)(l.b,{path:"".concat(n,"/drug"),exact:!0,children:Object(c.jsx)(Be,{})}),Object(c.jsx)(l.b,{path:"".concat(n,"/drug/instruction"),children:Object(c.jsx)(Ge,{})}),Object(c.jsx)(l.b,{path:"".concat(n,"/disease/category"),children:Object(c.jsx)(He,{})}),Object(c.jsx)(l.b,{path:"".concat(n,"/disease"),children:Object(c.jsx)(Ue,{})}),Object(c.jsx)(l.b,{path:"".concat(n,"/notification"),children:Object(c.jsx)(Ae,{})}),Object(c.jsx)(l.b,{path:"".concat(n,"/visit"),children:Object(c.jsx)(ze,{})}),Object(c.jsx)(l.b,{path:"".concat(n,"/patient"),children:Object(c.jsx)(Xe,{})}),Object(c.jsx)(l.b,{path:"".concat(n,"/appointment"),children:Object(c.jsx)(Ke,{})}),Object(c.jsx)(l.b,{path:"".concat(n,"/service"),children:Object(c.jsx)(Qe,{})}),Object(c.jsx)(l.b,{path:"".concat(n,"/working-hour"),children:Object(c.jsx)(We,{})}),Object(c.jsx)(l.b,{path:"".concat(n,"/room"),children:Object(c.jsx)(qe,{})}),Object(c.jsx)(l.b,{path:"".concat(n,"/account"),children:Object(c.jsx)(Je,{})}),Object(c.jsx)(l.b,{path:"".concat(n,"/setting"),children:Object(c.jsx)($e,{})}),Object(c.jsx)(l.a,{to:"/admin/dashboard"})]})})})]})]})}),["admin"]),ot=n(376);n(365),n(366);var ut=function(){E.a.interceptors.request.use((function(e){"delete"===e.method&&ot.b.loading("\u0110ang th\u1ef1c hi\u1ec7n");try{var t=N.a.get("EMR_token");t&&Object(G.a)(t)&&(e.headers.Authorization="Bearer ".concat(t))}catch(n){console.log(n)}return e}),(function(e){return Promise.reject(e)})),E.a.interceptors.response.use((function(e){switch(e.config.method){case"post":console.log(e.data),e.data.id&&ot.b.success({content:"T\u1ea1o th\xe0nh c\xf4ng"});break;case"put":case"patch":ot.b.success({content:"C\u1eadp nh\u1eadt th\xe0nh c\xf4ng"});break;case"delete":ot.b.destroy(),ot.b.success({content:"X\xf3a th\xe0nh c\xf4ng"})}return e}),function(){var e=Object(u.a)(o.a.mark((function e(t){var n,c,a,r,i,s,u;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.config,401!==t.response.status||n._retry||n.url==="".concat(_,"/auth/refresh-token/")){e.next=23;break}if(N.a.remove("EMR_token"),n._retry=!0,!((c=N.a.get("EMR_refresh"))&&c.length>0)){e.next=21;break}return e.prev=6,e.next=9,T(c);case 9:return a=e.sent,r=a.data.access_token,N.a.set("EMR_token",r),(i=t.config).headers.Authorization="Bearer ".concat(r),e.abrupt("return",new Promise((function(e,t){return E.a.request(i).then((function(t){return e(t)})).catch((function(e){return t(e)}))})));case 17:return e.prev=17,e.t0=e.catch(6),N.a.remove("EMR_refresh"),e.abrupt("return",Promise.reject(e.t0));case 21:e.next=25;break;case 23:u=(null===(s=t.response)||void 0===s?void 0:s.data.message)||"Unexpected error occurred",ot.b.error(u);case 25:return e.abrupt("return",Promise.reject(t));case 26:case"end":return e.stop()}}),e,null,[[6,17]])})));return function(t){return e.apply(this,arguments)}}());var e=Object(p.b)();function t(){try{var t=N.a.get("EMR_token");t&&Object(G.a)(t)&&e(M())}catch(n){console.log(n)}}function n(){return(n=Object(u.a)(o.a.mark((function e(){var n,c,a,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,n=N.a.get("EMR_token"),c=N.a.get("EMR_refresh"),n||!c){e.next=9;break}return e.next=6,T(c);case 6:a=e.sent,r=a.data,N.a.set("EMR_token",r.access_token,{expires:3/24});case 9:t(),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[0,12]])})))).apply(this,arguments)}return Object(a.useEffect)((function(){!function(){n.apply(this,arguments)}()})),Object(c.jsx)("div",{className:"app",children:Object(c.jsx)(j.a,{children:Object(c.jsxs)(l.d,{children:[Object(c.jsx)(l.b,{path:"/login",children:Object(c.jsx)(B,{})}),Object(c.jsx)(l.b,{path:"/admin",component:st}),Object(c.jsx)(l.a,{to:"/login"})]})})})},jt=n(80),lt={loginLoading:!1};var dt={user:null,getProfileLoading:!1};var bt=Object(jt.c)({userState:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:dt,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case v:return Object(Ye.a)(Object(Ye.a)({},e),{},{user:null,getProfileLoading:!0});case y:return Object(Ye.a)(Object(Ye.a)({},e),{},{user:t.payload,getProfileLoading:!1});case k:case w:return Object(Ye.a)(Object(Ye.a)({},e),{},{user:null,getProfileLoading:!1});default:return Object(Ye.a)({},e)}},authState:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:lt,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case f:return Object(Ye.a)(Object(Ye.a)({},e),{},{loginLoading:!0});case m:case g:return Object(Ye.a)(Object(Ye.a)({},e),{},{loginLoading:!1});default:return Object(Ye.a)({},e)}}}),ht=[n(194).a],Ot="object"===typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:jt.d,xt=Object(jt.e)(bt,Ot(jt.a.apply(void 0,ht)));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(Object(c.jsx)(p.a,{store:xt,children:Object(c.jsx)(ut,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[367,1,2]]]);
//# sourceMappingURL=main.10284b37.chunk.js.map