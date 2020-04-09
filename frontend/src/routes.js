// import Home from './components/Home.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';
import Forgot from './components/Forgot.vue';
import Newpassword from './components/Newpassword.vue';
import Verify from './components/Verify.vue';
import Wrapper from './components/Wrapper.vue';


const routes = [
    { path: '/', component: Wrapper, props: { page: 'dashboard' } },
    { path: '/register', component: Register },
    { path: '/forgot', component: Forgot },
    { path: '/login', component: Login },
    { path: '/newpassword', component: Newpassword },
    { path: '/verify', component: Verify }
];

export default routes;