(function(t){function e(e){for(var o,i,r=e[0],c=e[1],l=e[2],d=0,p=[];d<r.length;d++)i=r[d],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&p.push(n[i][0]),n[i]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(t[o]=c[o]);u&&u(e);while(p.length)p.shift()();return s.push.apply(s,l||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],o=!0,r=1;r<a.length;r++){var c=a[r];0!==n[c]&&(o=!1)}o&&(s.splice(e--,1),t=i(i.s=a[0]))}return t}var o={},n={app:0},s=[];function i(e){if(o[e])return o[e].exports;var a=o[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=o,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(a,o,function(e){return t[e]}.bind(null,o));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=e,r=r.slice();for(var l=0;l<r.length;l++)e(r[l]);var u=c;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},1546:function(t,e,a){"use strict";var o=a("3cb3"),n=a.n(o);n.a},"388f":function(t,e,a){"use strict";var o=a("d7a4"),n=a.n(o);n.a},"3cb3":function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var o=a("2b0e"),n=a("8c4f"),s=a("43f9"),i=a.n(s),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},c=[],l={},u=l,d=a("2877"),p=Object(d["a"])(u,r,c,!1,null,"15da3f52",null),m=p.exports,h=(a("de82"),a("51de"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[this.jwt?[a("div",[a("md-dialog",{staticStyle:{background:"white"},attrs:{"md-active":t.showGroupDialog},on:{"update:mdActive":function(e){t.showGroupDialog=e},"update:md-active":function(e){t.showGroupDialog=e}}},[a("md-dialog-title",[t._v("New Group Information")]),a("div",{staticClass:"row px-5"},[a("div",{staticClass:"col-12 my-1"},[a("label",{attrs:{for:"tag"}},[t._v("Tag")]),a("select",{directives:[{name:"model",rawName:"v-model",value:t.newGroupTag,expression:"newGroupTag"}],staticClass:"custom-select",attrs:{name:"tag"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.newGroupTag=e.target.multiple?a:a[0]}}},[a("option",{attrs:{selected:""}}),t._l(t.tags,(function(e){return a("option",{key:e["tag_id"],domProps:{value:e["tag_id"]}},[t._v(t._s(e.name))])}))],2)]),a("div",{staticClass:"col-12 my-1"},[a("label",{attrs:{for:"school"}},[t._v("School")]),a("select",{directives:[{name:"model",rawName:"v-model",value:t.newGroupSchool,expression:"newGroupSchool"}],staticClass:"custom-select",attrs:{name:"school"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.newGroupSchool=e.target.multiple?a:a[0]}}},[a("option",{attrs:{selected:""}}),t._l(t.schools,(function(e){return a("option",{key:e.name,domProps:{value:e["school_id"]}},[t._v(t._s(e.name))])}))],2)]),a("div",{staticClass:"col-12 my-1"},[a("label",{attrs:{for:"name"}},[t._v("Name")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.newGroupName,expression:"newGroupName"}],staticClass:"form-control",attrs:{type:"text",value:"",required:""},domProps:{value:t.newGroupName},on:{input:function(e){e.target.composing||(t.newGroupName=e.target.value)}}})]),a("div",{staticClass:"col-12 my-1"},[a("label",{attrs:{for:"description"}},[t._v("Description")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.newGroupDescription,expression:"newGroupDescription"}],staticClass:"form-control",attrs:{type:"text",value:"",required:""},domProps:{value:t.newGroupDescription},on:{input:function(e){e.target.composing||(t.newGroupDescription=e.target.value)}}})])]),a("md-dialog-actions",[a("md-button",{staticClass:"md-primary",on:{click:function(e){t.showGroupDialog=!1}}},[t._v("Cancel")]),a("md-button",{staticClass:"md-primary",on:{click:function(e){return t.createGroup()}}},[t._v("Create")])],1)],1),a("md-dialog",{staticStyle:{background:"white"},attrs:{"md-active":t.showDeleteDialog},on:{"update:mdActive":function(e){t.showDeleteDialog=e},"update:md-active":function(e){t.showDeleteDialog=e}}},[a("md-dialog-title",[t._v("Are you sure you want to remove this user from this group? This action can't be undone.")]),a("md-dialog-actions",[a("md-button",{staticClass:"md-primary",on:{click:function(e){t.showDeleteDialog=!1}}},[t._v("No")]),a("md-button",{staticClass:"md-primary",on:{click:function(e){return t.removeUser(t.curUser["user_id"],t.curChannel["channel_id"])}}},[t._v("Yes")])],1)],1),a("md-toolbar",{attrs:{"md-elevation":"0"}},[a("div",{staticClass:"container d-flex justify-content-between align-items-center w-100 my-3"},[a("h3",{staticClass:"admin-text"},[a("b",[t._v("Amigo Admin Dashboard")])]),a("button",{staticClass:"btn",attrs:{type:"button"},on:{click:function(e){return t.logout()}}},[a("h4",[t._v("Logout")])])])]),a("md-divider"),a("div",{staticClass:"container"},[a("div",{staticClass:"d-flex justify-content-between align-items-center w-100 my-3"},[t._m(0),a("button",{staticClass:"btn btn-outline-primary",attrs:{type:"button"},on:{click:function(e){t.showGroupDialog=!0}}},[t._v("New Group +")])]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-3 home-data"},[t._m(1),t._l(t.groups,(function(e){return[a("md-card",{key:e.name,staticClass:"my-2 md-elevation-4",class:{active:t.curChannel["channel_id"]==e["channel_id"]},attrs:{"md-with-hover":""},nativeOn:{click:function(a){return t.updateCurChannel(e)}}},[a("md-card-media",[a("div",{staticClass:"red-circle"})]),a("md-card-header",[a("md-card-header-text",[a("div",[a("h6",[t._v(t._s(e.name))])])])],1)],1)]}))],2),a("div",{staticClass:"col-9 home-data"},[a("md-table",[a("md-table-row",[a("md-table-head",[t._v("First Name")]),a("md-table-head",[t._v("Last Name")]),a("md-table-head",[t._v("Display Name")]),a("md-table-head",[t._v("Date Joined")]),a("md-table-head")],1),t._l(t.users,(function(e){return[a("md-table-row",{key:e.display_name},[a("md-table-cell",[t._v(t._s(e.first_name))]),a("md-table-cell",[t._v(t._s(e.last_name))]),a("md-table-cell",[t._v(t._s(e.display_name))]),a("md-table-cell",[t._v(t._s(e.created_on))]),a("md-table-cell",[a("button",{staticClass:"btn btn-outline-primary",attrs:{type:"button"},on:{click:function(a){return t.updateCurUser(e)}}},[t._v("Remove")])])],1)]}))],2)],1)])])],1)]:t._e()],2)}),v=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("h3",[a("b",[t._v("Groups")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",{staticClass:"my-3"},[a("b",[t._v("Admin Groups")])])}],g=(a("4160"),a("ac1f"),a("5319"),a("1276"),a("159b"),a("bc3a")),f=a.n(g),b={created:function(){var t=document.cookie;0!=t.length&&(this.jwt=t.split("jwt=")[1]),this.jwt?console.log("Were cookin now"):window.location.href="/login",this.getGroups(),this.getSchools(),this.getTags()},data:function(){return{showGroupDialog:!1,showDeleteDialog:!1,newGroupName:null,newGroupDescription:null,newGroupTag:null,newGroupSchool:null,curUser:null,curChannel:null,users:null,groups:null,schools:null,tags:null,jwt:null}},methods:{logout:function(){document.cookie.split(";").forEach((function(t){document.cookie=t.replace(/^ +/,"").replace(/=.*/,"=;expires="+(new Date).toUTCString()+";path=/")})),this.$router.push("/login")},updateCurChannel:function(t){this.curChannel=t,this.getUsers()},updateCurUser:function(t){this.curUser=t,this.showDeleteDialog=!0},removeUser:function(t,e){var a=this;f()({method:"post",url:"/api/channels/users/remove",data:{user_id:t,channel_id:e},headers:{"x-access-token":this.jwt}}).then((function(){a.users=a.getUsers()})).catch((function(t){console.log(t)})),this.showDeleteDialog=!1,this.curUser=null},getUsers:function(){var t=this;f()({method:"get",url:"/api/channels/users?channel_id=".concat(this.curChannel["channel_id"]),headers:{"x-access-token":this.jwt}}).then((function(e){t.users=e.data.users})).catch((function(t){console.log(t)}))},getGroups:function(){var t=this;f()({method:"get",url:"/api/channels?all=true",headers:{"x-access-token":this.jwt}}).then((function(e){t.groups=e.data.channels,t.curChannel=e.data.channels[0],t.users=t.getUsers()})).catch((function(t){console.log(t)}))},getSchools:function(){var t=this;f()({method:"get",url:"/api/schools",headers:{"x-access-token":this.jwt}}).then((function(e){t.schools=e.data.schools})).catch((function(t){console.log(t)}))},getTags:function(){var t=this;f()({method:"get",url:"/api/tags",headers:{"x-access-token":this.jwt}}).then((function(e){t.tags=e.data.tags})).catch((function(t){console.log(t)}))},createGroup:function(){var t=this;console.log({tag_id:this.newGroupTag,school_id:this.newGroupSchool,name:this.newGroupName,description:this.newGroupDescription}),f()({method:"post",url:"/api/channels",data:{tag_id:this.newGroupTag,school_id:this.newGroupSchool,name:this.newGroupName,description:this.newGroupDescription},headers:{"x-access-token":this.jwt}}).then((function(e){console.log(e),t.groups=t.getGroups()})).catch((function(t){console.log(t)})),this.showGroupDialog=!1}}},w=b,_=(a("388f"),Object(d["a"])(w,h,v,!1,null,"cc025c76",null)),C=_.exports,y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"register-page"},[a("div",{staticClass:"container"},[a("div",{staticClass:"row justify-content-center align-items-center"},[a("div",{staticClass:"col-12 col-md-6"},[t._m(0),a("h5",{staticClass:"mb-4 description-text"},[t._v("Create an Admin Account to Get Started")]),a("md-card",{staticClass:"md-elevation-15"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 register-text"},[a("div",{staticClass:"input-group mb-3 register-field"},[a("div",{staticClass:"input-group-prepend"},[a("span",{staticClass:"input-group-text",attrs:{id:"basic-addon1"}},[a("md-icon",[t._v("account_circle")])],1)]),a("input",{staticClass:"form-control",attrs:{type:"text",placeholder:"Username or Email","aria-label":"Username","aria-describedby":"basic-addon1"}})]),a("div",{staticClass:"input-group mb-3 register-field"},[a("div",{staticClass:"input-group-prepend"},[a("span",{staticClass:"input-group-text",attrs:{id:"basic-addon2"}},[a("md-icon",[t._v("lock")])],1)]),a("input",{staticClass:"form-control",attrs:{type:"password",placeholder:"Password","aria-label":"Username","aria-describedby":"basic-addon2"}})]),a("div",[a("button",{staticClass:"btn btn-block btn-primary",attrs:{type:"button"}},[t._v("register")])]),a("div",{staticClass:"register-links my-2"},[a("router-link",{staticClass:"register-login",attrs:{to:"/login"}},[t._v("Login to your account")]),a("router-link",{staticClass:"register-forgot",attrs:{to:"/forgot"}},[t._v("Forgot Password")])],1)])])])],1)])])])},G=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("h1",{staticClass:"mb-2"},[t._v(" Welcome to "),a("span",{staticClass:"admin-text"},[t._v("Amigo Admin")])])}],x={},k=x,D=(a("e92c"),Object(d["a"])(k,y,G,!1,null,"bb7c92b6",null)),j=D.exports,U=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"login-page"},[a("div",{staticClass:"container"},[a("div",{staticClass:"row justify-content-center align-items-center"},[a("div",{staticClass:"col-12 col-md-6"},[t._m(0),a("h5",{staticClass:"mb-5 description-text"},[t._v("Login to Get Started")]),a("md-card",{staticClass:"md-elevation-15"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 login-text"},[a("div",{staticClass:"input-group mb-3 login-field"},[a("div",{staticClass:"input-group-prepend"},[a("span",{staticClass:"input-group-text",attrs:{id:"basic-addon1"}},[a("md-icon",[t._v("account_circle")])],1)]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Username or Email","aria-label":"Username","aria-describedby":"basic-addon1"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}})]),a("div",{staticClass:"input-group mb-3 login-field"},[a("div",{staticClass:"input-group-prepend"},[a("span",{staticClass:"input-group-text",attrs:{id:"basic-addon2"}},[a("md-icon",[t._v("lock")])],1)]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-control",attrs:{type:"password",placeholder:"Password","aria-label":"Username","aria-describedby":"basic-addon2"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),a("div",[a("button",{staticClass:"btn btn-block btn-primary",attrs:{type:"button"},on:{click:function(e){return t.login(t.username,t.password)}}},[t._v("Login")])]),a("div",{staticClass:"login-links my-2"},[a("router-link",{staticClass:"login-register",attrs:{to:"/register"}},[t._v("Register")]),a("router-link",{staticClass:"login-forgot",attrs:{to:"/forgot"}},[t._v("Forgot Password")])],1)])])])],1)])])])},N=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("h1",{staticClass:"mb-2"},[t._v(" Welcome to "),a("span",{staticClass:"admin-text"},[t._v("Amigo Admin")])])}],S=a("bc3a"),P=S.create({baseURL:"/api"}),O=function(t,e){return P.post("/login",{email:t,password:e})},A={login:O},T=A,E={methods:{login:function(t,e){var a=this;console.log("hello this is an event handler"),console.log("Username: "+t),console.log("Password: "+e),T.login(t,e).then((function(t,e){e?console.log("there was an error "+e):(console.log(t),document.cookie="jwt=".concat(t.data["x-access-token"]),a.$router.push("/"))}))}}},$=E,L=(a("1546"),Object(d["a"])($,U,N,!1,null,"5cf4fa8a",null)),M=L.exports,F=[{path:"/",component:C},{path:"/register",component:j},{path:"/login",component:M}],J=F;o["default"].config.productionTip=!1,o["default"].use(n["a"]),o["default"].use(i.a);var R=new n["a"]({mode:"history",routes:J});new o["default"]({router:R,render:function(t){return t(m)}}).$mount("#app")},"5a28":function(t,e,a){},d7a4:function(t,e,a){},de82:function(t,e,a){},e92c:function(t,e,a){"use strict";var o=a("5a28"),n=a.n(o);n.a}});
//# sourceMappingURL=app.ff817568.js.map