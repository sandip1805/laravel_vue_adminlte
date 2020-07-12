import store from './store'
import Vue from 'vue'
import Router from "vue-router"
//import DashboardComponent from './components/DashboardComponent.vue';
/* import RegistrationComponent from './components/auth/RegistrationComponent';
import LoginComponent from './components/auth/LoginComponent';
import DashboardComponent from './components/DashboardComponent';
import ProfileComponent from './components/auth/ProfileComponent';
import UsersComponent from './components/user/UsersComponent';
import DeveloperComponent from './components/auth/DeveloperComponent'; */

// implement lazy loading start
//const RegistrationComponent = () => import('./components/auth/RegistrationComponent.vue') or const RegistrationComponent = () => import('./components/RegistrationComponent')
const RegistrationComponent = () => import('./components/auth/RegistrationComponent')
const LoginComponent = () => import('./components/auth/LoginComponent')
const DashboardComponent = () => import('./components/DashboardComponent')
const HomePageComponent = () => import('./components/HomePageComponent')
const ProfileComponent = () => import('./components/auth/ProfileComponent')
const UsersComponent = () => import('./components/user/UsersComponent')
const DeveloperComponent = () => import('./components/auth/DeveloperComponent')
const PageNotFoundComponent = () => import('./components/PageNotFoundComponent')
// implement lazy loading end
Vue.use(Router);

const routes = [
    {
        path: "/",
        name: "dashboard",
        component: DashboardComponent,
        children: [
            {
                path: "",
                name: "home",
                component: HomePageComponent,

            },
            {
                path: "users",
                name: "users",
                component: UsersComponent,
                meta: { auth: true }
            },
            {
                path: "/profile",
                name: "profile",
                component: ProfileComponent,
                meta: { auth: true }
            },
        ],
        meta: { auth: true }
    },
    {
        path: "/login",
        name: "login",
        component: LoginComponent,
        meta: { auth: false }
    },
    {
        path: "/register",
        name: "register",
        component: RegistrationComponent,
        meta: { auth: false }
    },

    {
        path: '*',
        name: "page-not-found",
        component: PageNotFoundComponent,
      //redirect: '/'
    }
    /* {
        path: "/developer",
        name: "developer",
        component: DeveloperComponent,
        meta: { auth: true }
    } */
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.


export default new Router({
    mode: 'history',
    routes // short for `routes: routes`
})
