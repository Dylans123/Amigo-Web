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


const routes = [
    { path: '/groups/', component: Wrapper,
        children: [
          {path: 'view', component: Groups},
          {path: 'create', component: Groups},
          {path: 'delete', component: Groups}
        ]
    },
    { path: '/users/', component: Wrapper,
        children: [
          {path: 'view', component: Users},
          {path: 'create', component: Users},
          {path: 'delete', component: Users}
        ]
    },
    { path: '/tags/', component: Wrapper,
        children: [
          {path: 'view', component: Tags},
          {path: 'create', component: Tags},
          {path: 'delete', component: Tags}
        ]
    },
    { path: '/groups/', component: Wrapper,
        children: [
          {path: 'view', component: Groups},
          {path: 'create', component: Groups},
          {path: 'delete', component: Groups}
        ]
    },
    { path: '/', component: Wrapper,
        children: [
          {path: '', component: Dashboard}
        ]
    },
    { path: '/administrators/', component: Wrapper,
        children: [
          {path: 'edit', component: Administrators}
        ]
    },
    { path: '/register', component: Register },
    { path: '/forgot', component: Forgot },
    { path: '/login', component: Login },
    { path: '/newpassword', component: Newpassword },
    { path: '/verify', component: Verify }
];

export default routes;