(function(t){function e(e){for(var a,i,r=e[0],c=e[1],l=e[2],d=0,p=[];d<r.length;d++)i=r[d],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&p.push(n[i][0]),n[i]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);u&&u(e);while(p.length)p.shift()();return o.push.apply(o,l||[]),s()}function s(){for(var t,e=0;e<o.length;e++){for(var s=o[e],a=!0,r=1;r<s.length;r++){var c=s[r];0!==n[c]&&(a=!1)}a&&(o.splice(e--,1),t=i(i.s=s[0]))}return t}var a={},n={app:0},o=[];function i(e){if(a[e])return a[e].exports;var s=a[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=a,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(s,a,function(e){return t[e]}.bind(null,a));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=e,r=r.slice();for(var l=0;l<r.length;l++)e(r[l]);var u=c;o.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"05bb":function(t,e,s){},3778:function(t,e,s){},"388f":function(t,e,s){"use strict";var a=s("d7a4"),n=s.n(a);n.a},"3dd9":function(t,e,s){},4361:function(t,e,s){},5525:function(t,e,s){},"56d7":function(t,e,s){"use strict";s.r(e);s("e260"),s("e6cf"),s("cca6"),s("a79d");var a=s("2b0e"),n=s("8c4f"),o=s("43f9"),i=s.n(o),r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("router-view")],1)},c=[],l={},u=l,d=s("2877"),p=Object(d["a"])(u,r,c,!1,null,"15da3f52",null),m=p.exports,v=(s("de82"),s("51de"),function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[this.jwt?[s("div",[s("md-dialog",{staticStyle:{background:"white"},attrs:{"md-active":t.showGroupDialog},on:{"update:mdActive":function(e){t.showGroupDialog=e},"update:md-active":function(e){t.showGroupDialog=e}}},[s("md-dialog-title",[t._v("New Group Information")]),s("div",{staticClass:"row px-5"},[s("div",{staticClass:"col-12 my-1"},[s("label",{attrs:{for:"tag"}},[t._v("Tag")]),s("select",{directives:[{name:"model",rawName:"v-model",value:t.newGroupTag,expression:"newGroupTag"}],staticClass:"custom-select",attrs:{name:"tag"},on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.newGroupTag=e.target.multiple?s:s[0]}}},[s("option",{attrs:{selected:""}}),t._l(t.tags,(function(e){return s("option",{key:e["tag_id"],domProps:{value:e["tag_id"]}},[t._v(t._s(e.name))])}))],2)]),s("div",{staticClass:"col-12 my-1"},[s("label",{attrs:{for:"school"}},[t._v("School")]),s("select",{directives:[{name:"model",rawName:"v-model",value:t.newGroupSchool,expression:"newGroupSchool"}],staticClass:"custom-select",attrs:{name:"school"},on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.newGroupSchool=e.target.multiple?s:s[0]}}},[s("option",{attrs:{selected:""}}),t._l(t.schools,(function(e){return s("option",{key:e.name,domProps:{value:e["school_id"]}},[t._v(t._s(e.name))])}))],2)]),s("div",{staticClass:"col-12 my-1"},[s("label",{attrs:{for:"name"}},[t._v("Name")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.newGroupName,expression:"newGroupName"}],staticClass:"form-control",attrs:{type:"text",value:"",required:""},domProps:{value:t.newGroupName},on:{input:function(e){e.target.composing||(t.newGroupName=e.target.value)}}})]),s("div",{staticClass:"col-12 my-1"},[s("label",{attrs:{for:"description"}},[t._v("Description")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.newGroupDescription,expression:"newGroupDescription"}],staticClass:"form-control",attrs:{type:"text",value:"",required:""},domProps:{value:t.newGroupDescription},on:{input:function(e){e.target.composing||(t.newGroupDescription=e.target.value)}}})])]),s("md-dialog-actions",[s("md-button",{staticClass:"md-primary",on:{click:function(e){t.showGroupDialog=!1}}},[t._v("Cancel")]),s("md-button",{staticClass:"md-primary",on:{click:function(e){return t.createGroup()}}},[t._v("Create")])],1)],1),s("md-dialog",{staticStyle:{background:"white"},attrs:{"md-active":t.showDeleteDialog},on:{"update:mdActive":function(e){t.showDeleteDialog=e},"update:md-active":function(e){t.showDeleteDialog=e}}},[s("md-dialog-title",[t._v("Are you sure you want to remove this user from this group? This action can't be undone.")]),s("md-dialog-actions",[s("md-button",{staticClass:"md-primary",on:{click:function(e){t.showDeleteDialog=!1}}},[t._v("No")]),s("md-button",{staticClass:"md-primary",on:{click:function(e){return t.removeUser(t.curUser["user_id"],t.curChannel["channel_id"])}}},[t._v("Yes")])],1)],1),s("md-toolbar",{attrs:{"md-elevation":"0"}},[s("div",{staticClass:"container d-flex justify-content-between align-items-center w-100 my-3"},[s("h3",{staticClass:"admin-text"},[s("b",[t._v("Amigo Admin Dashboard")])]),s("button",{staticClass:"btn",attrs:{type:"button"},on:{click:function(e){return t.logout()}}},[s("h4",[t._v("Logout")])])])]),s("md-divider"),s("div",{staticClass:"container"},[s("div",{staticClass:"d-flex justify-content-between align-items-center w-100 my-3"},[t._m(0),s("button",{staticClass:"btn btn-outline-primary",attrs:{type:"button"},on:{click:function(e){t.showGroupDialog=!0}}},[t._v("New Group +")])]),s("div",{staticClass:"row"},[s("div",{staticClass:"col-3 home-data"},[t._m(1),t._l(t.groups,(function(e){return[s("md-card",{key:e.name,staticClass:"my-2 md-elevation-4",class:{active:t.curChannel["channel_id"]==e["channel_id"]},attrs:{"md-with-hover":""},nativeOn:{click:function(s){return t.updateCurChannel(e)}}},[s("md-card-media",[s("div",{staticClass:"red-circle"})]),s("md-card-header",[s("md-card-header-text",[s("div",[s("h6",[t._v(t._s(e.name))])])])],1)],1)]}))],2),s("div",{staticClass:"col-9 home-data"},[s("md-table",[s("md-table-row",[s("md-table-head",[t._v("First Name")]),s("md-table-head",[t._v("Last Name")]),s("md-table-head",[t._v("Display Name")]),s("md-table-head",[t._v("Date Joined")]),s("md-table-head")],1),t._l(t.users,(function(e){return[s("md-table-row",{key:e.display_name},[s("md-table-cell",[t._v(t._s(e.first_name))]),s("md-table-cell",[t._v(t._s(e.last_name))]),s("md-table-cell",[t._v(t._s(e.display_name))]),s("md-table-cell",[t._v(t._s(e.created_on))]),s("md-table-cell",[s("button",{staticClass:"btn btn-outline-primary",attrs:{type:"button"},on:{click:function(s){return t.updateCurUser(e)}}},[t._v("Remove")])])],1)]}))],2)],1)])])],1)]:t._e()],2)}),h=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h3",[s("b",[t._v("Groups")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("p",{staticClass:"my-3"},[s("b",[t._v("Admin Groups")])])}],g=(s("4160"),s("ac1f"),s("5319"),s("1276"),s("159b"),s("bc3a")),f=s.n(g),b={created:function(){var t=document.cookie;0!=t.length&&(this.jwt=t.split("jwt=")[1]),this.jwt?console.log("Were cookin now"):window.location.href="/login",this.getGroups(),this.getSchools(),this.getTags()},data:function(){return{showGroupDialog:!1,showDeleteDialog:!1,newGroupName:null,newGroupDescription:null,newGroupTag:null,newGroupSchool:null,curUser:null,curChannel:null,users:null,groups:null,schools:null,tags:null,jwt:null}},methods:{logout:function(){document.cookie.split(";").forEach((function(t){document.cookie=t.replace(/^ +/,"").replace(/=.*/,"=;expires="+(new Date).toUTCString()+";path=/")})),this.$router.push("/login")},updateCurChannel:function(t){this.curChannel=t,this.getUsers()},updateCurUser:function(t){this.curUser=t,this.showDeleteDialog=!0},removeUser:function(t,e){var s=this;f()({method:"post",url:"/api/channels/users/remove",data:{user_id:t,channel_id:e},headers:{"x-access-token":this.jwt}}).then((function(){s.users=s.getUsers()})).catch((function(t){console.log(t)})),this.showDeleteDialog=!1,this.curUser=null},getUsers:function(){var t=this;f()({method:"get",url:"/api/channels/users?channel_id=".concat(this.curChannel["channel_id"]),headers:{"x-access-token":this.jwt}}).then((function(e){t.users=e.data.users})).catch((function(t){console.log(t)}))},getGroups:function(){var t=this;f()({method:"get",url:"/api/channels?all=true",headers:{"x-access-token":this.jwt}}).then((function(e){t.groups=e.data.channels,t.curChannel=e.data.channels[0],t.users=t.getUsers()})).catch((function(t){console.log(t)}))},getSchools:function(){var t=this;f()({method:"get",url:"/api/schools",headers:{"x-access-token":this.jwt}}).then((function(e){t.schools=e.data.schools})).catch((function(t){console.log(t)}))},getTags:function(){var t=this;f()({method:"get",url:"/api/tags",headers:{"x-access-token":this.jwt}}).then((function(e){t.tags=e.data.tags})).catch((function(t){console.log(t)}))},createGroup:function(){var t=this;console.log({tag_id:this.newGroupTag,school_id:this.newGroupSchool,name:this.newGroupName,description:this.newGroupDescription}),f()({method:"post",url:"/api/channels",data:{tag_id:this.newGroupTag,school_id:this.newGroupSchool,name:this.newGroupName,description:this.newGroupDescription},headers:{"x-access-token":this.jwt}}).then((function(e){console.log(e),t.groups=t.getGroups()})).catch((function(t){console.log(t)})),this.showGroupDialog=!1}}},_=b,C=(s("388f"),Object(d["a"])(_,v,h,!1,null,"cc025c76",null)),w=C.exports,y=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"register-page"},[s("div",{staticClass:"container"},[s("div",{staticClass:"row justify-content-center align-items-center"},[s("div",{staticClass:"col-12 col-md-6"},[t._m(0),s("h5",{staticClass:"mb-4 description-text"},[t._v("Create an Admin Account to Get Started")]),s("md-card",{staticClass:"md-elevation-15"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-12 register-text"},[s("div",{staticClass:"input-group mb-3 register-field"},[s("div",{staticClass:"input-group-prepend"},[s("span",{staticClass:"input-group-text",attrs:{id:"basic-addon1"}},[s("md-icon",[t._v("account_circle")])],1)]),s("input",{staticClass:"form-control",attrs:{type:"text",placeholder:"Username or Email","aria-label":"Username","aria-describedby":"basic-addon1"}})]),s("div",{staticClass:"input-group mb-3 register-field"},[s("div",{staticClass:"input-group-prepend"},[s("span",{staticClass:"input-group-text",attrs:{id:"basic-addon2"}},[s("md-icon",[t._v("lock")])],1)]),s("input",{staticClass:"form-control",attrs:{type:"password",placeholder:"Password","aria-label":"Username","aria-describedby":"basic-addon2"}})]),s("div",[s("button",{staticClass:"btn btn-block btn-primary",attrs:{type:"button"}},[t._v("register")])]),s("div",{staticClass:"register-links my-2"},[s("router-link",{staticClass:"register-login",attrs:{to:"/login"}},[t._v("Login to your account")]),s("router-link",{staticClass:"register-forgot",attrs:{to:"/forgot"}},[t._v("Forgot Password")])],1)])])])],1)])])])},x=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h1",{staticClass:"mb-2"},[t._v(" Welcome to "),s("span",{staticClass:"admin-text"},[t._v("Amigo Admin")])])}],k={},G=k,j=(s("9958"),Object(d["a"])(G,y,x,!1,null,"e7780456",null)),D=j.exports,U=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"login-page"},[s("div",{staticClass:"container"},[s("div",{staticClass:"row justify-content-center align-items-center"},[s("div",{staticClass:"col-12 col-md-6"},[t._m(0),s("h5",{staticClass:"mb-5 description-text"},[t._v("Login to Get Started")]),s("md-card",{staticClass:"md-elevation-15"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-12 login-text"},[s("div",{staticClass:"input-group mb-3 login-field"},[s("div",{staticClass:"input-group-prepend"},[s("span",{staticClass:"input-group-text",attrs:{id:"basic-addon1"}},[s("md-icon",[t._v("account_circle")])],1)]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Username or Email","aria-label":"Username","aria-describedby":"basic-addon1"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}})]),s("div",{staticClass:"input-group mb-3 login-field"},[s("div",{staticClass:"input-group-prepend"},[s("span",{staticClass:"input-group-text",attrs:{id:"basic-addon2"}},[s("md-icon",[t._v("lock")])],1)]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-control",attrs:{type:"password",placeholder:"Password","aria-label":"Username","aria-describedby":"basic-addon2"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),s("div",[s("button",{staticClass:"btn btn-block btn-primary",attrs:{type:"button"},on:{click:function(e){return t.login(t.username,t.password)}}},[t._v("Login")])]),s("div",{staticClass:"login-links my-2"},[s("router-link",{staticClass:"login-register",attrs:{to:"/register"}},[t._v("Register")]),s("router-link",{staticClass:"login-forgot",attrs:{to:"/forgot"}},[t._v("Forgot Password")])],1)])])])],1)])])])},E=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h1",{staticClass:"mb-2"},[t._v(" Welcome to "),s("span",{staticClass:"admin-text"},[t._v("Amigo Admin")])])}],N=s("bc3a"),P=N.create({baseURL:"/api"}),S=function(t,e){return P.post("/login",{email:t,password:e})},O=function(t){return P.get("/verify?".concat(t))},$={login:S,verify:O},A=$,T={methods:{login:function(t,e){var s=this;console.log("hello this is an event handler"),console.log("Username: "+t),console.log("Password: "+e),A.login(t,e).then((function(t,e){e?console.log("there was an error "+e):(console.log(t),document.cookie="jwt=".concat(t.data["x-access-token"]),s.$router.push("/"))}))}}},R=T,L=(s("e20b"),Object(d["a"])(R,U,E,!1,null,"02ffb913",null)),F=L.exports,M=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"register-page"},[s("div",{staticClass:"container"},[s("div",{staticClass:"row justify-content-center align-items-center"},[s("div",{staticClass:"col-12 col-md-6"},[t._m(0),s("h6",{staticClass:"mb-4 description-text"},[t._v("Resetting your password is easy, just tell us the email address you registered with Amigo.")]),s("md-card",{staticClass:"md-elevation-15"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-12 register-text"},[s("div",{staticClass:"input-group mb-3 register-field"},[s("div",{staticClass:"input-group-prepend"},[s("span",{staticClass:"input-group-text"},[s("md-icon",[t._v("email")])],1)]),s("input",{staticClass:"form-control",attrs:{type:"text",placeholder:"Email"}})]),s("div",[s("button",{staticClass:"btn btn-block btn-primary",attrs:{type:"button"}},[t._v("Send")])]),s("div",{staticClass:"register-links my-2"},[s("router-link",{staticClass:"forgot",attrs:{to:"/login"}},[t._v("Login to your account")])],1)])])])],1)])])])},J=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h1",{staticClass:"mb-2"},[t._v(" Forgot your "),s("span",{staticClass:"admin-text"},[t._v("Password?")])])}],W={},Y=W,q=(s("5994"),Object(d["a"])(Y,M,J,!1,null,"101aff0a",null)),I=q.exports,V=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"register-page"},[s("div",{staticClass:"container"},[s("div",{staticClass:"row justify-content-center align-items-center"},[s("div",{staticClass:"col-12 col-md-6"},[t._m(0),s("h5",{staticClass:"mb-4 description-text"}),s("md-card",{staticClass:"md-elevation-15"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-12 register-text"},[s("div",{staticClass:"input-group mb-3 register-field"},[s("div",{staticClass:"input-group-prepend"},[s("span",{staticClass:"input-group-text",attrs:{id:"basic-addon1"}},[s("md-icon",[t._v("lock")])],1)]),s("input",{staticClass:"form-control",attrs:{type:"text",placeholder:"New Password","aria-label":"Username","aria-describedby":"basic-addon1"}})]),s("div",{staticClass:"input-group mb-3 register-field"},[s("div",{staticClass:"input-group-prepend"},[s("span",{staticClass:"input-group-text",attrs:{id:"basic-addon2"}},[s("md-icon",[t._v("lock")])],1)]),s("input",{staticClass:"form-control",attrs:{type:"password",placeholder:"Confirm New Password","aria-label":"Username","aria-describedby":"basic-addon2"}})]),s("div",[s("button",{staticClass:"btn btn-block btn-primary",attrs:{type:"button"}},[t._v("Reset")])]),s("div",{staticClass:"register-links my-2"},[s("router-link",{staticClass:"register-login",attrs:{to:"/login"}},[t._v("Login to your account")])],1)])])])],1)])])])},H=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h1",{staticClass:"mb-2"},[t._v(" Change "),s("span",{staticClass:"admin-text"},[t._v("Password")])])}],z={},B=z,K=(s("cafc"),Object(d["a"])(B,V,H,!1,null,"94bc5f58",null)),Q=K.exports,X=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"register-page"},[s("div",{staticClass:"container"},[s("div",{staticClass:"row justify-content-center align-items-center"},[s("div",{staticClass:"col-12 col-md-6"},[t._m(0),s("h5",{staticClass:"mb-4 description-text"}),s("md-card",{staticClass:"md-elevation-15"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-12 login-text"},[this.verifyRes||this.verifyErr?[this.verifyRes?[s("p",[t._v("You have succesfully verified your account! You can now return to the app and login.")])]:t._e(),this.verifyErr?[s("p",[t._v("There was an error with your email verification. In order to send a new verification link please press the button below.")]),s("div",{staticClass:"input-group mb-3 login-field"},[s("div",{staticClass:"input-group-prepend"},[s("span",{staticClass:"input-group-text",attrs:{id:"basic-addon1"}},[s("md-icon",[t._v("account_circle")])],1)]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Username or Email","aria-label":"Username","aria-describedby":"basic-addon1"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}})]),s("button",{staticClass:"btn btn-block btn-primary",attrs:{type:"button"},on:{click:t.resend}},[t._v("Resend Verification")])]:t._e()]:[t._v(" Loading ")]],2)])])],1)])])])},Z=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h1",{staticClass:"mb-2"},[t._v(" Email "),s("span",{staticClass:"admin-text"},[t._v("Verification")])])}],tt={created:function(){var t=window.location.href,e=t.split("?"),s=e[1];console.log(s),this.verify(s)},data:function(){return{verifyRes:null,verifyErr:null}},methods:{verify:function(t){var e=this;console.log("hello this is an event handler"),A.verify(t).then((function(t){console.log("Here"),console.log(t),console.log("response"),e.verifyRes=t.data})).catch((function(t){console.log("there was an error "+t),e.verifyErr=t}))}}},et=tt,st=(s("a7cb"),Object(d["a"])(et,X,Z,!1,null,"99bec0e2",null)),at=st.exports,nt=[{path:"/",component:w},{path:"/register",component:D},{path:"/forgot",component:I},{path:"/login",component:F},{path:"/newpassword",component:Q},{path:"/verify",component:at}],ot=nt;a["default"].config.productionTip=!1,a["default"].use(n["a"]),a["default"].use(i.a);var it=new n["a"]({mode:"history",routes:ot});new a["default"]({router:it,render:function(t){return t(m)}}).$mount("#app")},5994:function(t,e,s){"use strict";var a=s("5525"),n=s.n(a);n.a},9958:function(t,e,s){"use strict";var a=s("3dd9"),n=s.n(a);n.a},a7cb:function(t,e,s){"use strict";var a=s("4361"),n=s.n(a);n.a},cafc:function(t,e,s){"use strict";var a=s("3778"),n=s.n(a);n.a},d7a4:function(t,e,s){},de82:function(t,e,s){},e20b:function(t,e,s){"use strict";var a=s("05bb"),n=s.n(a);n.a}});
//# sourceMappingURL=app.a761ed8a.js.map