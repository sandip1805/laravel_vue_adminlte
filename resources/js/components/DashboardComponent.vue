<template>
    <!-- // load content after login -->
    <div class="hold-transition sidebar-mini">
        <div class="wrapper">
                <!-- Navbar start -->
                <header-component></header-component>
                <!-- Navbar end -->
                <!-- Main Sidebar Container start -->
                    <left-menu></left-menu>
                <!-- Main Sidebar Container end -->

                <!-- Content Wrapper. Contains page content -->
                <div class="content-wrapper">
                    <!-- Main content -->
                    <div class="content">
                    <div class="container-fluid">
                        <div class="row">
                            <!-- route outlet -->
                            <!-- component matched by the route will render here -->
                            <router-view></router-view>
                        </div>
                        <!-- /.row -->
                    </div><!-- /.container-fluid -->
                    </div>
                    <!-- /.content -->
                </div>
                <!-- /.content-wrapper -->
                <!-- Main Footer start -->
                <footer-component></footer-component>
                <!-- Main Footer end-->
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
