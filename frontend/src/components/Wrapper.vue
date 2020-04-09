<template v-if="this.jwt">
  <div id="#app">
    <md-app>
      <md-app-toolbar class="md-primary" md-elevation="0">
        <div class="d-flex align-items-center w-100">
          <md-button class="md-icon-button justify-self-start" @click="toggleMenu" v-if="!menuVisible">
            <md-icon style="color: white">menu</md-icon>
          </md-button>
          <button type="button" class="btn justify-self-end" @click="logout()" style="color: white"><h4>Logout</h4></button>
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
          <div class="admin-list-button btn" v-on:click="page='groups'">
            <md-list-item class="admin-drawer-item">
              <md-icon>group</md-icon>
              <span class="md-list-item-text">Groups</span>
            </md-list-item>
          </div>
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
        <template v-if="this.page === 'dashboard'">
          <Dashboard />
        </template>
        <template v-if="this.page === 'administrators'">
          <Administrators />
        </template>
        <template v-if="this.page === 'users'">
          <Users />
        </template>
        <template v-if="this.page === 'tags'">
          <Tags />
        </template>
        <template v-if="this.page === 'groups'">
          <Groups />
        </template>
      </md-app-content>
    </md-app>
  </div>
</template>
<script>
import Groups from './Groups';
import Users from './Users';
import Dashboard from './Dashboard';
import Tags from './Tags';
import Administrators from './Administrators';
export default {
  name: "App",
  components: {
    Groups,
    Users,
    Dashboard,
    Tags,
    Administrators
  },
  props: {
    page: String
  },
  data: () => ({
    menuVisible: false,
    curPage: null,
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
  .admin-list-button {
    padding: 0;
  }
</style>