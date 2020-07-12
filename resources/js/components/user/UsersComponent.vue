<template>
    <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="card mt-5">
              <div class="card-header">
                <h3 class="card-title">User List</h3>

                <div class="card-tools">
                    <button class="btn btn-success" data-toggle="modal" data-target="#createUserModal" @click="newModel()">Add New <i class="fas fa-user-plus fa-fw"></i></button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th>DOB</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr v-for="user in users.data" :key="user.id">
                      <td>{{user.id}}</td>
                      <td>{{user.name}}</td>
                      <td>{{user.email}}</td>
                      <td>{{user.type | capitalize}}</td>
                      <!-- <td>{{user.created_at | MYDATE}}</td> -->
                      <td>{{user.date_of_birth}}</td>
                      <td><a href="javascript:void(0);" @click="editModel(user.id)"><i class="fas fa-edit blue"></i></a> | <a href="javascript:void(0);" @click="deleteUser(user.id)"><i class="fas fa-trash red"></i></a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="createUserModal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="createUserModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="createUserModalLabel" v-show="!editMode">Create User</h5>
                <h5 class="modal-title" id="createUserModalLabel" v-show="editMode">Edit User</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>

                <ValidationObserver ref="userFormRef" v-slot="{ invalid, handleSubmit }">
                <form @submit.prevent="editMode ? handleSubmit(updateUser) : handleSubmit(createUser)">
                  <div class="modal-body">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <!-- <ValidationProvider name="Name" rules="required|alpha" v-slot="{ errors }"> -->
                        <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
                        <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-user"></i></span>
                        </div>
                        <input v-model="userForm.name" type="text" name="name" id="name"
                            placeholder="Name"
                            class="form-control">
                        </div>
                        <div class="text-danger" v-if="serverErrors.name">
                        {{ serverErrors.name[0] }}
                        </div>
                        <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>

                    </div>

                    <div class="form-group">
                        <label for="email">Email</label>
                        <ValidationProvider name="Email Address" rules="required|email" v-slot="{ errors }">
                        <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-envelope-square"></i></span>
                        </div>
                        <input v-model="userForm.email" type="email" name="email" id="email"
                            placeholder="Email Address"
                            class="form-control">
                        </div>
                        <div class="text-danger" v-if="serverErrors.email">
                        {{ serverErrors.email[0] }}
                        </div>
                        <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="form-group">
                        <label for="name">Bio</label>
                        <ValidationProvider name="Bio" rules="required" v-slot="{ errors }">
                        <textarea v-model="userForm.bio" name="bio" id="bio"
                            placeholder="Bio"
                            class="form-control">
                        </textarea>
                        <div class="text-danger" v-if="serverErrors.bio">
                        {{ serverErrors.bio[0] }}
                        </div>
                        <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>

                    </div>
                    <div class="form-group">
                        <label for="type">User Type</label>
                        <ValidationProvider name="User Type" rules="required" v-slot="{ errors }">
                        <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-user-tag"></i></span>
                        </div>
                        <select v-model="userForm.type" name="type" id="type" class="form-control">
                            <option value="">Select User Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">Standard User</option>
                            <option value="author">Author</option>
                        </select>
                        </div>
                        <div class="text-danger" v-if="serverErrors.type">
                        {{ serverErrors.type[0] }}
                        </div>
                        <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>

                    </div>

                    <div class="form-group">
                        <label for="password">Password</label>
                        <!-- <ValidationProvider name="Password" rules="required|confirmed:confirm_password" v-slot="{ errors }"> -->
                        <ValidationProvider name="Password" rules="confirmed:confirm_password" v-slot="{ errors }">
                        <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-key"></i></span>
                        </div>
                        <input v-model="userForm.password" type="password" name="password" id="password"
                            placeholder="Password"
                            class="form-control">
                        </div>
                        <div class="text-danger" v-if="serverErrors.password">
                        {{ serverErrors.password[0] }}
                        </div>
                        <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>

                    </div>

                    <div class="form-group">
                        <label for="confirm_password">Confirm Password</label>
                        <!-- <ValidationProvider name="Confirm Password" rules="required" vid="confirm_password" v-slot="{ errors }"> -->
                        <ValidationProvider name="Confirm Password" rules="" vid="confirm_password" v-slot="{ errors }">
                        <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-key"></i></span>
                        </div>
                        <input v-model="userForm.confirm_password" type="password" name="confirm_password" id="confirm_password"
                            placeholder="Confirm Password"
                            class="form-control">
                        </div>
                        <div class="text-danger" v-if="serverErrors.confirm_password">
                        {{ serverErrors.confirm_password[0] }}
                        </div>
                        <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>

                    </div>

                    <div class="form-group">
                        <label for="date_of_birth">Register Date</label>
                        <ValidationProvider name="Register Date" rules="required" vid="date_of_birth" v-slot="{ errors }">
                        <div class="input-group">
                        <Calendar  v-model="userForm.date_of_birth" :monthNavigator="true" :yearNavigator="true" yearRange="2000:2030" dateFormat="dd/mm/yy" :showIcon="true"  />
                        </div>
                        <div class="text-danger" v-if="serverErrors.date_of_birth">
                        {{ serverErrors.date_of_birth[0] }}
                        </div>
                        <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                  </div>

                  <div class="modal-footer">
                      <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                      <button type="submit" class="btn btn-primary" v-show="!editMode" :disabled="invalid">Create</button>
                      <button type="submit" class="btn btn-primary" v-show="editMode" :disabled="invalid">Update</button>
                  </div>
                </form>
            </ValidationObserver>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    import * as user from './../../services/UserService'
    import Calendar from 'primevue/calendar';
    export default {

        components: {
            'Calendar': Calendar
        },
        // local filter start
        filters: {
            uppercase: function (value) {
                if (!value) return ''
                return value.toUpperCase()
            }
        },// local filter end
        data() {
            return {
                editMode:false,
                serverErrors:[],
                users:{},
                userForm:{
                    id:'',
                    name : '',
                    email: '',
                    password: '',
                    confirm_password:'',
                    type: '',
                    bio: '',
                    photo: '',
                    date_of_birth:null
                }
            }
        },
        methods: {
            resetForm() {
            this.userForm = {
                id:'',
                name : '',
                email: '',
                password: '',
                confirm_password:'',
                type: '',
                bio: '',
                photo: '',
                date_of_birth:null
            },
            this.$nextTick(() => {
            this.$refs.userFormRef.reset()
            })
            },

            newModel() {
                this.resetForm()
                /* $('#createUserModal').modal({
                show:true,
                keyboard: false
                }) */
                $('#createUserModal').modal('show')
            },

            createUser(){
                //this.userForm.post('user')
                this.editMode = false
                this.$Progress.start()
                user.create(this.userForm).then( response => {
                    this.serverErrors = []
                    //this.$emit('AfterCreate'); //local event emitter
                    this.$emit('LocalEvtEmitData',{name:'Tushar'}) //local event emitter with data
                    Fire.$emit('AfterCreate') //global event emitter

                    $('#createUserModal').modal('hide')

                    Toast.fire({
                        icon: 'success',
                        title: 'User created successfully!'
                    })
                    this.$Progress.finish()
                } ).catch((error) => {
                    this.$Progress.fail()
                    this.serverErrors = error.response.data.errors
                });
            },

            editModel(id) {
                this.editMode = true
                this.resetForm()
                this.$Progress.start()
                user.edit(id)
                .then(response => {
                this.userForm = response.data
                this.$Progress.finish()
                 $('#createUserModal').modal('show')
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

            updateUser() {
                this.editMode = true
                this.$Progress.start()
                user.update(this.userForm.id, this.userForm).then( response => {
                    this.serverErrors = []
                    Fire.$emit('AfterCreate') //global event emitter
                    $('#createUserModal').modal('hide')
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

            loadUsers(){
                this.$Progress.start()
                user.users()
                .then(response => {
                this.$Progress.finish()
                this.users = response.data
                })
                .catch(error => {
                this.$Progress.fail()
               // this.errors.push(error)
                /*if(e.response.status === 401) {
                    this.$router.push({
                    name: 'Login'
                    })
                }*/
                })
            },

            deleteUser(id) {
                Swal2.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.value) {
                    //send delete request to the server
                        this.$Progress.start()
                        user.deleteUser(id).then( response => {
                            console.log(response);
                            Swal2.fire(
                                'Deleted!',
                                response.data.message,
                                'success'
                            )
                            Fire.$emit('AfterCreate') //global event emitter
                            this.$Progress.finish()
                        } ).catch((error) => {
                            //this.serverErrors = error.response.data.errors;
                            Swal2.fire(
                            'Failed!',
                            'There was something wrong!',
                            'warning'
                            )
                            this.$Progress.fail()
                        })
                }
                })
            }
        },
        created() {
            console.log(this.$gate.isAdmin());

            this.loadUsers();
            /* this.$on('AfterCreate', ()=>{
                this.loadUsers();
            }) */ // local event subscriber
            this.$on('LocalEvtEmitData', (data)=>{
                console.log(data)
            })// local event subscriber with data

            Fire.$on('AfterCreate', ()=>{
                this.loadUsers()
            }) // global event subscriber

            /* setInterval(() => {
            this.loadUsers();
            }, 3000); */
        }

    }
</script>
