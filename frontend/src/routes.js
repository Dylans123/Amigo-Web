import Home from './components/Home.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';
import Forgot from './components/Forgot.vue';
import Newpassword from './components/Newpassword.vue';


const routes = [
    { path: '/', component: Home },
    { path: '/register', component: Register },
    { path: '/forgot', component: Forgot },
    { path: '/login', component: Login },
    { path: '/newpassword', component: Newpassword },
    
];

export default routes;