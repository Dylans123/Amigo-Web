import Home from './components/Home.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';
import Forgot from './components/Forgot.vue';
import Newpassword from './components/Newpassword.vue';
import Verify from './components/Verify.vue';
import Wrapper from './components/Wrapper.vue';
import EditGroups from './components/Groups/EditGroups.vue';
import CreateGroups from './components/Groups/CreateGroups.vue';
import ViewUsers from './components/Users/ViewUsers.vue';
import CreateUser from './components/Users/CreateUser.vue';
import EditTags from './components/Tags/EditTags.vue';
import CreateTags from './components/Tags/CreateTags.vue';
import EditAdministrators from './components/Administrators/EditAdministrators.vue';
import Dashboard from './components/Dashboard.vue';

const cookie = document.cookie;
let jwt = null;
if (cookie.length != 0) {
  jwt = cookie.split("jwt=")[1];
}
if (!jwt) {
  window.location.href = "/login"
} else {
  console.log("Logged in");
}

const routes = [
  { path: '/', component: Home},
  { path: '/register', component: Register },
  { path: '/forgot', component: Forgot },
  { path: '/login', component: Login },
  { path: '/newpassword', component: Newpassword },
  { path: '/verify', component: Verify },
  { path: '/admin', component: Wrapper, 
    children: [
      {path: '/', component: Dashboard, props: { jwt: jwt }},
      {path: 'groups/edit', component: EditGroups, props: { jwt: jwt }},
      {path: 'groups/create', component: CreateGroups, props: { jwt: jwt }},
      {path: 'users/view', component: ViewUsers, props: { jwt: jwt }},
      {path: 'users/create', component: CreateUser, props: { jwt: jwt }},
      {path: 'tags/edit', component: EditTags, props: { jwt: jwt }},
      {path: 'tags/create', component: CreateTags, props: { jwt: jwt }},
      {path: 'administrators/edit', component: EditAdministrators, props: { jwt: jwt }}
    ]
  }
];

export default routes;