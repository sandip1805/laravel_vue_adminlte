<template>
    <!-- // load content before login -->
    <div>
        <!-- route outlet -->
        <router-view></router-view>
        <!-- set progressbar -->
        <vue-progress-bar></vue-progress-bar>
    </div>

</template>
<script>
import * as auth from './../services/AuthService'
  export default {
    name:'Index',
    data() {
      return {
        //
      }
    },
    components: {
        //
    },
    beforeCreate: function() {
      // check for auto login
      auth.autoLogin()

    }
  }
</script>
