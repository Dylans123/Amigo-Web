<template>
  <div>
    <md-app>
      <md-app-toolbar class="md-primary" md-elevation="0">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <md-icon style="color: white">menu</md-icon>
        </md-button>
        <div class="container d-flex justify-content-end align-items-center w-100">
          <button type="button" class="btn" @click="logout()" style="color: white"><h4>Logout</h4></button>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
        <md-toolbar class="md-transparent" md-elevation="0">
          <h3 class="admin-text"><b>Amigo Admin</b></h3>
          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <md-list-item class="admin-drawer-item">
            <md-icon>home</md-icon>
            <span class="md-list-item-text">Home</span>
          </md-list-item>

          <md-list-item class="admin-drawer-item">
            <md-icon>account_circle</md-icon>
            <span class="md-list-item-text">Users</span>
          </md-list-item>

          <md-list-item class="admin-drawer-item">
            <md-icon>group</md-icon>
            <span class="md-list-item-text">Groups</span>
          </md-list-item>

          <md-list-item class="admin-drawer-item">
            <md-icon>label</md-icon>
            <span class="md-list-item-text">Tags</span>
          </md-list-item>

          <md-list-item class="admin-drawer-item">
            <md-icon>supervised_user_circle</md-icon>
            <span class="md-list-item-text">Administrators</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <!-- <router-view> -->
      </md-app-content>
    </md-app>
  </div>
</template>
<script>
// import Home from './Home.vue';
export default {
  name: "Wrapper",
  components: {
    // Home
  },
  data: () => ({
    menuVisible: false
  }),
  methods: {
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    },
    logout: function() {
      // Code to remove the cookie that is storing the jwt
      document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
      this.$router.push('/login');
    },
  }
}
</script>
<style>
  .md-app-toolbar {
    border-bottom: 1px solid black;
    background-color: #F65D62;
    color: white !important
  }
  .md-app-content {
    background-color: #F4F3F0;
  }
  .md-app-content .md-card {
    margin-right: 0;
    margin-left: 0;
    overflow: visible;
  }
  .md-drawer {
    width: 300px;
  }
  .md-toolbar {
    border-bottom: 1px solid black;
  }
  .md-app {
    height: 100vh;
  }
  .admin-drawer-item {
    cursor: pointer;
  }
</style>