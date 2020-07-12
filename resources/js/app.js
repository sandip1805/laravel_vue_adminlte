/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap')
window.Vue = require('vue')
import router from './router'
//Import Default Component
import IndexComponent from './components/IndexComponent'
//Import Progressbar
import VueProgressBar from "vue-progressbar"
//Import Sweetalert
import Swal from 'sweetalert2'
//Import momentjs
import moment from "moment"
//Import vee validate for client side validation
import { ValidationObserver, ValidationProvider, extend } from "vee-validate"
//Import vee validate cutome rules for client side validation
import { required, email, alpha, confirmed } from "vee-validate/dist/rules"
//Import Vuex for state management
import Vuex from 'vuex'
//Import store plugin to use store js globally
//import storePlugin from './storePlugin'
import store from './store'
// importing interceptor
//import * as interceptors from './services/interceptor'

//import storePlugin from './storePlugin'
import * as auth from './services/AuthService'

//import gate to prevent route
import Gate from './gate'

//import common component
import HeaderComponent from './components/partials/HeaderComponent';
import FooterComponent from './components/partials/FooterComponent';
import LeftmenuComponent from './components/partials/LeftmenuComponent';

//All Validation rules for vue start //
/* import {
    ValidationObserver,
    ValidationProvider,
    extend,
    localize
} from "vee-validate";
import en from "vee-validate/dist/locale/en.json";
import * as rules from "vee-validate/dist/rules";
import App from "./App.vue";

// install rules and localization
Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});

localize("en", en);

// Install components globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider); */
//All Validation rules for vue end //

//import { Form, HasError, AlertError } from "vform"

// Use imports

// Load default component start
Vue.component('index', IndexComponent)
// Load default component end


//Progressbar start
Vue.use(VueProgressBar, {
    color: "rgb(143, 255, 199)",
    failedColor: "red",
    height: "10px"
});
//Progressbar end

//sweet alert2 start
window.Swal2 = Swal;

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: toast => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    }
});

window.Toast = Toast;
//sweet alert2 start

//global filters start
Vue.filter('MYDATE',(date)=>{
    return moment(date).format("MMMM Do YYYY");
})
Vue.filter('capitalize', (value)=>{
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
})
//global filters end

// global event emitter start
window.Fire = new Vue();
// global event emitter end

// Custome validation rules and messages start
extend('confirmed', confirmed);
extend('email', email);
extend('alpha', alpha);
// Override the default message.
extend('required', {
  ...required,
    message: '{_field_} is required'
});
// Custome validation rules and messages start
// Use v-validate components globally start
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
// Use v-validate components globally end

// use Vuex start
Vue.use(Vuex)
// use Vuex end

// Create prototy to use this variable globally
Vue.prototype.$gate = new Gate()
// Create prototy to use this variable globally

//use storePlugin start
//Vue.use(storePlugin) //globally
//use storePlugin end()

//user interceptor start
//interceptors.InitialRequest()
//user interceptor end

//Use v-form start
//window.Form = Form; // User Form Gloabally

//Vue.component(HasError.name, HasError);
//Vue.component(AlertError.name, AlertError);
//Use v-form end

//Passport global components start
Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue').default
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue').default
);
//Passport global components end

//Use common component start
Vue.component(
    'header-component',
    HeaderComponent
);
Vue.component(
    'left-menu',
    LeftmenuComponent
);
Vue.component(
    'footer-component',
    FooterComponent
);
//Use common component end

// 1. Define route components.
// These can be imported from other files
/* const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const routes = [
    { path: "/foo", component: Foo },
    { path: "/bar", component: Bar }
];

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
*/


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// Implement auth guard function start
router.beforeEach((to, from, next) => {

    // Create prototy to use this variable globally
    Vue.prototype.$gate = new Gate(JSON.parse(store.state.user))
    // Create prototy to use this variable globally

    // check if the route requires authentication and user is not logged in
    if (to.matched.some(route => route.meta.auth) && !store.state.isLoggedIn) {
        // redirect to login page
        next({ name: 'login' })
        return
    }
    if (to.matched.some(route => route.meta.auth===false) && store.state.isLoggedIn) {
        next({ name: 'dashboard' })
        return
    }

    /* if ((to.path === '/login' || to.path === '/register') && store.state.isLoggedIn) {
        next({ name: 'dashboard' })
        return
    } */

    next()
});
// Implement auth guard function end


// Add a request interceptor
axios.interceptors.request.use(
    config => {
        config['baseURL'] = store.state.apiUrl;
        const access_token = store.state.access_token;
        const token_type = store.state.token_type;
        if (access_token) {
            config.headers['Authorization'] = token_type + ' ' + access_token;
        }
        // config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        Promise.reject(error)
    });

axios.interceptors.response.use((response) => {
    return response
}, function (error) {
        if (error.response.status === 401) {
            auth.logout()
            return Promise.reject(error);
        }
        return Promise.reject(error);
});


const app = new Vue({
    store,
    el: "#app",
    router
});
