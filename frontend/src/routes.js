// import Home from './components/Home.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';
import Forgot from './components/Forgot.vue';
import Newpassword from './components/Newpassword.vue';
import Verify from './components/Verify.vue';
import Wrapper from './components/Wrapper.vue';
import Groups from './components/Groups.vue';
import Users from './components/Users.vue';
import Tags from './components/Tags.vue';
import Dashboard from './components/Dashboard.vue';
import Administrators from './components/Administrators.vue';

const cookie = document.cookie;
let jwt = null;
if (cookie.length != 0) {
  jwt = cookie.split("jwt=")[1];
}
if (!jwt) {
  window.location.href = "/login"
} else {
  console.log("Were cookin now");
}

const routes = [
    { path: '/groups/', component: Wrapper,
        children: [
          {path: 'view', component: Groups, props: { jwt: jwt }},
          {path: 'create', component: Groups, props: { jwt: jwt }},
          {path: 'delete', component: Groups, props: { jwt: jwt }}
        ]
    },
    { path: '/users/', component: Wrapper,
        children: [
          {path: 'view', component: Users, props: { jwt: jwt }},
          {path: 'create', component: Users, props: { jwt: jwt }},
          {path: 'delete', component: Users, props: { jwt: jwt }}
        ]
    },
    { path: '/tags/', component: Wrapper,
        children: [
          {path: 'view', component: Tags, props: { jwt: jwt }},
          {path: 'create', component: Tags, props: { jwt: jwt }},
          {path: 'delete', component: Tags, props: { jwt: jwt }}
        ]
    },
    { path: '/groups/', component: Wrapper,
        children: [
          {path: 'view', component: Groups, props: { jwt: jwt }},
          {path: 'create', component: Groups, props: { jwt: jwt }},
          {path: 'delete', component: Groups, props: { jwt: jwt }}
        ]
    },
    { path: '/', component: Wrapper,
        children: [
          {path: '', component: Dashboard, props: { jwt: jwt }}
        ]
    },
    { path: '/administrators/', component: Wrapper,
        children: [
          {path: 'edit', component: Administrators, props: { jwt: jwt }}
        ]
    },
    { path: '/register', component: Register },
    { path: '/forgot', component: Forgot },
    { path: '/login', component: Login },
    { path: '/newpassword', component: Newpassword },
    { path: '/verify', component: Verify }
];

export default routes;