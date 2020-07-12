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
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>183</td>
                      <td>John Doe</td>
                      <td>11-7-2014</td>
                      <td><span class="tag tag-success">Approved</span></td>
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
                <ValidationObserver v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(createUser)">
                        <div class="modal-body">
                            <div class="form-group" :class="{ 'has-error': userForm.errors.has('name') }">
                                <label>Name</label>
                                <ValidationProvider name="email" rules="required|alpha" v-slot="{ errors }">
                                <input v-model="userForm.name" placeholder="Name" type="text" name="name" id="name"
                                    class="form-control" :class="{ 'is-invalid': userForm.errors.has('name') }">
                                    <span>{{ errors[0] }}</span>
                                </ValidationProvider>
                                <has-error :form="userForm" field="name"></has-error>

                                <!-- <ValidationProvider rules="positive|odd|prime|fib" :bails="false" v-slot="{ errors }">
                                <input v-model="value" type="text">
                                <ul>
                                    <li v-for="error in errors">{{ error }}</li>
                                </ul>
                                </ValidationProvider> -->
                            </div>

                            <div class="form-group">
                                <label>Email</label>
                                <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                                <input v-model="userForm.email" type="email" name="email"
                                    placeholder="Email Address"
                                    class="form-control" :class="{ 'is-invalid': userForm.errors.has('email') }">
                                <span>{{ errors[0] }}</span>
                                </ValidationProvider>
                                <has-error :form="userForm" field="email"></has-error>
                            </div>

                            <div class="form-group">
                                <label>Bio</label>
                                <textarea v-model="userForm.bio" name="bio" id="bio"
                                placeholder="Short bio for user (Optional)"
                                class="form-control" :class="{ 'is-invalid': userForm.errors.has('bio') }"></textarea>
                                <has-error :form="userForm" field="bio"></has-error>
                            </div>


                            <div class="form-group">
                                <label>Role</label>
                                <select name="type" v-model="userForm.type" id="type" class="form-control" :class="{ 'is-invalid': userForm.errors.has('type') }">
                                    <option value="">Select User Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">Standard User</option>
                                    <option value="author">Author</option>
                                </select>
                                <has-error :form="userForm" field="type"></has-error>
                            </div>

                            <div class="form-group">
                                <label>Password</label>
                                <input v-model="userForm.password" type="password" name="password" id="password"
                                class="form-control" :class="{ 'is-invalid': userForm.errors.has('password') }">
                                <has-error :form="userForm" field="password"></has-error>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Save</button>
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

                userForm:new Form({
                    name:'',
                })
            }
        },
        methods: {
            createUser(){
                alert('Form has been submitted!');
            }
        },
        mounted() {
            console.log('Component mounted.')
        }

    }
</script>
