<template>
<div class="register-page">
    <div class="register-box">
        <div class="register-logo">
            <a href="../../index2.html"><b>Admin</b>LTE</a>
        </div>

        <div class="card">
            <div class="card-body register-card-body">
            <p class="login-box-msg">Register a new membership</p>
            <ValidationObserver ref="registerFormRef" v-slot="{ invalid, handleSubmit }">
            <form @submit.prevent="handleSubmit(registerUser)">
                <ValidationProvider name="Full Name" rules="required" v-slot="{ errors }">
                    <div class="input-group mb-3">
                        <input v-model="regForm.name" type="text" name="name" id="name"
                                            placeholder="Full Name"
                                            class="form-control">
                        <div class="input-group-append">
                            <div class="input-group-text">
                            <span class="fas fa-user"></span>
                            </div>
                        </div>
                    </div>
                    <div class="text-danger" v-if="serverErrors.name">
                    {{ serverErrors.name[0] }}
                    </div>
                    <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>

                <ValidationProvider name="Email Address" rules="required|email" v-slot="{ errors }">
                    <div class="input-group mb-3">
                        <input v-model="regForm.email" type="email" name="email" id="email"
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

                <ValidationProvider name="Password" rules="required|confirmed:confirm_password" v-slot="{ errors }">
                    <div class="input-group mb-3">
                        <input v-model="regForm.password" type="password" name="password" id="password"
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
                <ValidationProvider name="Confirm Password" rules="required" vid="confirm_password" v-slot="{ errors }">
                    <div class="input-group mb-3">
                        <input v-model="regForm.confirm_password" type="password" name="confirm_password" id="confirm_password"
                                    placeholder="Retype Password"
                                    class="form-control">
                        <div class="input-group-append">
                            <div class="input-group-text">
                            <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div class="text-danger" v-if="serverErrors.confirm_password">
                    {{ serverErrors.confirm_password[0] }}
                    </div>
                    <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>

                <div class="row">
                <div class="col-8">
                    <div class="icheck-primary">
                    <input type="checkbox" id="agreeTerms" name="terms" value="agree">
                    <label for="agreeTerms">
                    I agree to the <a href="#">terms</a>
                    </label>
                    </div>
                </div>
                <!-- /.col -->
                <div class="col-4">
                    <button type="submit" class="btn btn-primary btn-block" :disabled="invalid">SigUp</button>
                </div>
                <!-- /.col -->
                </div>
            </form>
            </ValidationObserver>
            <router-link to="/login" class="text-center">I already have a membership</router-link>
            </div>
            <!-- /.form-box -->
        </div><!-- /.card -->
    </div>
</div>
</template>

<script>
    import * as auth from './../../services/AuthService'
    export default {
        data() {
            return {
                serverErrors:[],
                regForm:{
                    id:'',
                    name : '',
                    email: '',
                    password: '',
                    confirm_password:''
                }
            }
        },
        methods: {
            resetForm() {
            this.regForm = {
                id:'',
                name : '',
                email: '',
                password: '',
                confirm_password:''
            },
            this.$nextTick(() => {
            this.$refs.registerFormRef.reset()
            })
            },

            registerUser(){
                this.$Progress.start()
                auth.register(this.regForm).then( response => {
                    this.serverErrors = []
                    this.$Progress.finish()
                    this.$router.push({name: 'login'})
                    Toast.fire({
                        icon: 'success',
                        title: response.data.message,
                    })
                } ).catch((error) => {
                    this.$Progress.fail()
                    this.serverErrors = error.response.data.errors
                });
            },
        },
        mounted() {
        }

    }
</script>
