<template>
    <div class="login-page">
        <div class="login-box">
            <div class="login-logo">
                <a href="../../index2.html"><b>Admin</b>LTE</a>
            </div>
            <!-- /.login-logo -->
            <div class="card">
                <div class="card-body login-card-body">
                <!-- <p class="login-box-msg">{{$store.state.test}}</p> Access store valiable in template-->
                <p class="login-box-msg">Sign in to start your session</p>
                <ValidationObserver ref="loginFormRef" v-slot="{ invalid, handleSubmit }">
                <form @submit.prevent="handleSubmit(login)">
                        <ValidationProvider name="Email Address" rules="required|email" v-slot="{ errors }">
                        <div class="input-group mb-3">
                            <input v-model="loginForm.email" type="email" name="email" id="email"
                                        placeholder="Email Address"
                                        class="form-control">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div class="text-danger" v-if="serverErrors.email">
                        {{ serverErrors.email[0] }}
                        </div>
                        <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>

                        <ValidationProvider name="Password" rules="required" v-slot="{ errors }">
                            <div class="input-group mb-3">
                                <input v-model="loginForm.password" type="password" name="password" id="password"
                                            placeholder="Password"
                                            class="form-control">
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="text-danger" v-if="serverErrors.password">
                            {{ serverErrors.password[0] }}
                            </div>
                            <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <div class="row">
                        <!-- /.col -->
                        <div class="col-4">
                            <button type="submit" class="btn btn-primary btn-block" :disabled="invalid">Login</button>
                        </div>
                        <div class="col-8">
                            <p class="mb-1">
                                <router-link to="/register" class="text-center">Register a new membership</router-link>
                            </p>
                            <p class="mb-1">
                                <router-link to="#" class="text-center">I forgot my password</router-link>
                            </p>
                        </div>
                    <!-- /.col -->
                    </div>
                </form>
                </ValidationObserver>
                </div>
                <!-- /.login-card-body -->
            </div>
        </div>
    </div>
</template>

<script>
    import * as auth from './../../services/AuthService'
    export default {
        data() {
            return {
                serverErrors:[],
                loginForm:{
                    id:'',
                    name : '',
                    email: '',
                    password: '',
                }
            }
        },
        methods: {
            resetForm() {
            this.loginForm = {
                id:'',
                name : '',
                email: '',
                password: '',
            },
            this.$nextTick(() => {
            this.$refs.loginFormRef.reset()
            })
            },

            login(){
                this.$Progress.start()
                auth.login(this.loginForm).then( response => {
                    this.serverErrors = []
                    this.$store.commit('LoginUser', response.data.data)
                    this.$store.commit('UserData', response.data.data)
                    this.$Progress.finish()
                    this.$router.push({name:'home'})
                    Toast.fire({
                        icon: 'success',
                        title: 'Welcome to the dashboard!'
                    })
                } ).catch((error) => {
                    this.$Progress.fail()
                    if(error.response.data.errors) {
                        this.serverErrors = error.response.data.errors
                    }
                    if(error.response.data.message) {
                        Toast.fire({
                        icon: 'error',
                        title: error.response.data.message
                        })

                    }
                });
            },
        },
        mounted() {
            //console.log(this.$store.state.test)
        }

    }
</script>
