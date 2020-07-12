<style>
.widget-user-header{
    background-position: center center;
    background-size: cover;
    height: 250px !important;
}
.widget-user .card-footer{
    padding: 0;
}

</style>
<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12 mt-3">
                <div class="card card-widget widget-user">
                <!-- Add the bg color to the header using any of the bg-* classes -->
                <div class="widget-user-header text-white" style="background-image:url('/img/user-cover.jpg')">
                    <h3 class="widget-user-username"></h3>
                    <h5 class="widget-user-desc"></h5>
                </div>
                <div class="widget-user-image">
                    <img class="img-circle" v-bind:src="getProfilePhoto()" alt="User Avatar">
                </div>
                <div class="card-footer">
                    <div class="row">
                    <div class="col-sm-4 border-right">
                        <div class="description-block">
                        <h5 class="description-header">3,200</h5>
                        <span class="description-text">SALES</span>
                        </div>
                        <!-- /.description-block -->
                    </div>
                    <!-- /.col -->
                    <div class="col-sm-4 border-right">
                        <div class="description-block">
                        <h5 class="description-header">13,000</h5>
                        <span class="description-text">FOLLOWERS</span>
                        </div>
                        <!-- /.description-block -->
                    </div>
                    <!-- /.col -->
                    <div class="col-sm-4">
                        <div class="description-block">
                        <h5 class="description-header">35</h5>
                        <span class="description-text">PRODUCTS</span>
                        </div>
                        <!-- /.description-block -->
                    </div>
                    <!-- /.col -->
                    </div>
                    <!-- /.row -->
                </div>
                </div>
            </div>

            <!-- tab -->

            <div class="col-md-12">
                <div class="card">
                    <div class="card-header p-2">
                        <ul class="nav nav-pills">
                        <li class="nav-item"><a class="nav-link" href="#activity" data-toggle="tab">Activity</a></li>
                        <li class="nav-item"><a class="nav-link active show" href="#settings" data-toggle="tab">Settings</a></li>
                        </ul>
                    </div><!-- /.card-header -->
                    <div class="card-body">
                        <div class="tab-content">
                            <!-- Activity Tab -->
                            <div class="tab-pane" id="activity">
                                <h3 class="text-center">Display User Activity</h3>
                            </div>
                            <!-- Setting Tab -->
                            <div class="tab-pane active show" id="settings">
                                <ValidationObserver ref="profileFormRef" v-slot="{ invalid, handleSubmit }">
                                <form class="form-horizontal" @submit.prevent="handleSubmit(updateProfile)">
                                <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
                                <div class="form-group">
                                    <label for="inputName" class="col-sm-2 control-label">Name</label>
                                    <div class="col-sm-12">
                                    <input type="text" v-model="profileForm.name" name="name" class="form-control" id="name" placeholder="Name">
                                    <div class="text-danger" v-if="serverErrors.name">
                                    {{ serverErrors.name[0] }}
                                    </div>
                                    <span class="text-danger">{{ errors[0] }}</span>
                                    </div>
                                </div>
                                </ValidationProvider>
                                <ValidationProvider name="Email Address" rules="required|email" v-slot="{ errors }">
                                <div class="form-group">
                                    <label for="inputEmail" class="col-sm-2 control-label">Email</label>
                                    <div class="col-sm-12">
                                    <input type="email" v-model="profileForm.email" name="email" class="form-control" id="email" placeholder="Email" >
                                    <div class="text-danger" v-if="serverErrors.email">
                                    {{ serverErrors.email[0] }}
                                    </div>
                                    <span class="text-danger">{{ errors[0] }}</span>
                                    </div>
                                </div>
                                </ValidationProvider>
                                <ValidationProvider name="Bio" rules="required" v-slot="{ errors }">
                                <div class="form-group">
                                    <label for="inputExperience" class="col-sm-2 control-label">Experience</label>
                                    <div class="col-sm-12">
                                    <textarea v-model="profileForm.bio" name="bio"  class="form-control" id="bio" placeholder="Experience" ></textarea>
                                    <div class="text-danger" v-if="serverErrors.bio">
                                    {{ serverErrors.bio[0] }}
                                    </div>
                                    <span class="text-danger">{{ errors[0] }}</span>
                                    </div>
                                </div>
                                </ValidationProvider>
                                <div class="form-group">
                                    <label for="photo" class="col-sm-2 control-label">Profile Photo</label>
                                    <div class="col-sm-12">
                                        <input type="file" name="photo" v-on:change="choosePhoto($event)" class="form-input">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="password" class="col-sm-12 control-label">Passport (leave empty if not changing)</label>
                                    <div class="col-sm-12">
                                    <input type="password"
                                        v-model="profileForm.password"
                                        name="password"
                                        class="form-control"
                                        id="password"
                                        placeholder="Passport"
                                    >
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-offset-2 col-sm-12">
                                    <button type="submit" class="btn btn-success" :disabled="invalid">Update</button>
                                    </div>
                                </div>
                                </form>
                            </ValidationObserver>
                            </div>
                        <!-- /.tab-pane -->
                        </div>
                        <!-- /.tab-content -->
                    </div><!-- /.card-body -->
                </div>
                <!-- /.nav-tabs-custom -->
          </div>
          <!-- end tabs -->
        </div>
    </div>
</template>

<script>
    import * as user from './../../services/UserService'
    export default {
        data() {
            return {
                serverErrors:[],
                profileForm:{
                    id:'',
                    name : '',
                    email: '',
                    password:'',
                    type: '',
                    bio: '',
                    photo: ''
                }
            }
        },

        methods: {
            getProfilePhoto(){
                if(this.profileForm.photo){
                    let photo = (this.profileForm.photo.length > 200) ? this.profileForm.photo : "img/profile/"+ this.profileForm.photo ;
                    return photo;
                }
            },
            updateProfile(){
                    this.$Progress.start()
                    user.updateProfile(this.profileForm).then( response => {
                        this.serverErrors = []
                        Swal2.fire(
                        'Updated!',
                        response.data.message,
                        'success'
                        )
                        this.$Progress.finish()
                    } ).catch((error) => {
                        this.editMode = true
                        this.$Progress.fail()
                        this.serverErrors = error.response.data.errors
                    });
            },
            choosePhoto(e) {
                let file = e.target.files[0];
                let reader = new FileReader();
                if(file['size'] < 2111775) {
                    reader.onloadend = (file)=>{
                        this.profileForm.photo = reader.result;
                        //console.log(this.profileForm.photo);
                    }
                    reader.readAsDataURL(file);
                } else {
                    Swal2.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'You are uploading a large file'
                    })
                }
            }
        },
        created() {
                this.$Progress.start()
                user.profile()
                .then(response => {
                    console.log(response.data);
                this.profileForm = response.data
                this.$Progress.finish()
                })
                .catch(error => {
                this.$Progress.fail()
                this.serverErrors = error.response.data.errors
                /*if(e.response.status === 401) {
                    this.$router.push({
                    name: 'Login'
                    })
                }*/
                })
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
