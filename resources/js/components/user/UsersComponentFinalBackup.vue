<template>
    <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="card mt-5">
              <div class="card-header">
                <h3 class="card-title">User List</h3>

                <div class="card-tools">
                    <button class="btn btn-success" data-toggle="modal" data-target="#createUserModal">Add New <i class="fas fa-user-plus fa-fw"></i></button>
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
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr v-for="user in users.data" :key="user.id">
                      <td>{{user.id}}</td>
                      <td>{{user.name}}</td>
                      <td>{{user.email}}</td>
                      <td>{{user.type}}</td>
                      <td>{{user.created_at}}</td>
                      <td><a href=""><i class="fas fa-edit blue"></i></a> | <a href=""><i class="fas fa-trash red"></i></a></td>
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
                <h5 class="modal-title" id="createUserModalLabel">Create User</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>

                <!-- //disable submit button until all validation goes true start
                <ValidationObserver v-slot="{ invalid }">
                    <form @submit.prevent="handleSubmit(createUser)">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
                            <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-user"></i></span>
                            </div>
                            <input v-model="userForm.name" type="text" name="name" id="name"
                                placeholder="Name"
                                class="form-control" :class="{ 'is-invalid': userForm.errors.has('name') }">
                            </div>
                            <span class="text-danger">{{ errors[0] }}</span>
                            </ValidationProvider>
                            <has-error :form="userForm" field="name"></has-error>
                        </div>
                        <button type="submit" :disabled="invalid" class="btn btn-primary">Create</button>
                    </form>
                </ValidationObserver>
                //disable submit button until all validation goes true end -->


                <ValidationObserver v-slot="{ invalid, handleSubmit }">
                <form @submit.prevent="handleSubmit(createUser)">
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
                            class="form-control" :class="{ 'is-invalid': userForm.errors.has('name') }">
                            <has-error :form="userForm" field="name"></has-error>
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
                            class="form-control" :class="{ 'is-invalid': userForm.errors.has('email') }">
                            <has-error :form="userForm" field="email"></has-error>
                            <span v-if="userForm.errors.has('email')">
                            {{ userForm.errors.get('email') }}
                            </span>
                        </div>
                        <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>

                    </div>
                    <div class="form-group">
                        <label for="name">Bio</label>
                        <ValidationProvider name="Bio" rules="required" v-slot="{ errors }">
                        <textarea v-model="userForm.bio" name="bio" id="bio"
                            placeholder="Bio"
                            class="form-control" :class="{ 'is-invalid': userForm.errors.has('bio') }">
                        </textarea>
                        <has-error :form="userForm" field="bio"></has-error>
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
                        <select v-model="userForm.type" name="type" id="type" class="form-control" :class="{ 'is-invalid': userForm.errors.has('type') }">
                            <option value="">Select User Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">Standard User</option>
                            <option value="author">Author</option>
                        </select>
                        <has-error :form="userForm" field="type"></has-error>
                        </div>
                        <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>

                    </div>

                    <div class="form-group">
                        <label for="password">Password</label>
                        <ValidationProvider name="Password" rules="required|confirmed:confirm_password" v-slot="{ errors }">
                        <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-key"></i></span>
                        </div>
                        <input v-model="userForm.password" type="password" name="password" id="password"
                            placeholder="Password"
                            class="form-control" :class="{ 'is-invalid': userForm.errors.has('password') }">
                            <has-error :form="userForm" field="password"></has-error>
                        </div>
                        <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>

                    </div>

                    <div class="form-group">
                        <label for="confirm_password">Confirm Password</label>
                        <ValidationProvider name="Confirm Password" rules="required" vid="confirm_password" v-slot="{ errors }">
                        <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-key"></i></span>
                        </div>
                        <input v-model="userForm.confirm_password" type="password" name="confirm_password" id="confirm_password"
                            placeholder="Confirm Password"
                            class="form-control" :class="{ 'is-invalid': userForm.errors.has('confirm_password') }">
                            <has-error :form="userForm" field="confirm_password"></has-error>
                        </div>
                        <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>

                    </div>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                      <button type="submit" class="btn btn-primary" :disabled="invalid">Create</button>
                  </div>
                </form>
            </ValidationObserver>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    export default {

        data() {
            return {
                errors:[],
                users:{},
                userForm:new Form({
                    id:'',
                    name : '',
                    email: '',
                    password: '',
                    confirm_password:'',
                    type: '',
                    bio: '',
                    photo: ''
                })
            }
        },
        methods: {
            loadUsers(){
                axios.get(`api/user`)
                .then(response => {
                this.users = response.data
                })
                .catch(e => {
                this.errors.push(e)
                /*if(e.response.status === 401) {
                    this.$router.push({
                    name: 'Login'
                    })
                }*/
                })
            },
            createUser(){
                //this.userForm.post('api/user');

                axios.post(`api/user`, this.userForm)
                .then(response => {
                    console.log(response);
                })
                .catch(e => {
                    console.log(e)
                    this.errors = e.response.data.errors;
                    //this.errors.push(e)
                })
            }
        },
        mounted() {
            this.loadUsers();
        }

    }
</script>
