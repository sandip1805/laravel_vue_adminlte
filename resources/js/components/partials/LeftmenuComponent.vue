<template>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <a href="index3.html" class="brand-link">
        <img src="img/logo.png" alt="Larave Vue Admin LTE" class="brand-image img-circle elevation-3"
            style="opacity: .8">
        <span class="brand-text font-weight-light">Larave Vue</span>
        </a>

        <!-- Sidebar -->
        <div class="sidebar">
        <!-- Sidebar user panel (optional) -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
            <img src="img/user.png" class="img-circle elevation-2" alt="User Image">
            </div>
            <div class="info">
            <a href="#" class="d-block">{{this.userData.name}}</a>
            </div>
        </div>

        <!-- Sidebar Menu -->
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <!-- Add icons to the links using the .nav-icon class
                with font-awesome or any other icon font library -->
            <li class="nav-item">
                <router-link :to="{ name: 'home' }" class="nav-link">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                    Dashboard
                </p>
                </router-link>
            </li>
            <li class="nav-item has-treeview">
                <a href="#" class="nav-link">
                <i class="fas fa-cog green"></i>
                <p>
                    Management
                    <i class="right fas fa-angle-left"></i>
                </p>
                </a>
                <ul class="nav nav-treeview">
                <li class="nav-item">
                    <router-link :to="{ name: 'users' }" class="nav-link">
                    <i class="fas fa-users nav-icon"></i>
                    <p>Users List</p>
                    </router-link>
                </li>
                </ul>
            </li>
            <!-- <li class="nav-item">
                <router-link :to="{ name: 'developer' }" class="nav-link">
                <i class="fas fa-cogs"></i>
                <p>
                    Developer
                </p>
                </router-link>
            </li> -->
            <li class="nav-item">
                <router-link :to="{name: 'profile' }" class="nav-link">
                <i class="fas fa-user orange"></i>
                <p>
                    Profile
                </p>
                </router-link>
            </li>
            <li class="nav-item">
                <a class="nav-link" javascript="void(0)" @click="logout()">
                    <i class="fas fa-power-off red"></i>
                    <p>
                        Logout
                    </p>
                </a>
            </li>
            </ul>
        </nav>
        <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
  </aside>
</template>
<script>
    import * as auth from './../../services/AuthService'
    export default {
        name: 'LeftmenuComponent',
        data() {
            return {
                userData:JSON.parse(this.$store.state.user)
            }
        },
        methods: {

            logout(){
                auth.logout()
            },
        },
        mounted() {
            //console.log('Component mounted.', this.userData)
        },

    }
</script>
