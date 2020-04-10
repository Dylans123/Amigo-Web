<template v-if="this.jwt">
  <div id="#app">
    <md-app>
      <md-app-toolbar class="md-primary" md-elevation="0">
        <div class="container logout-button">
          <button type="button" class="btn justify-self-end" @click="logout()"><h4>Logout</h4></button>
        </div>
      </md-app-toolbar>
      <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          <h3 class="admin-text"><b>Amigo Admin</b></h3>
        </md-toolbar>
        <md-list>
          <md-list-item class="admin-drawer-item my-2" v-on:click="page='dashboard'">
            <md-icon class="md-size-2x">home</md-icon>
            <span class="md-list-item-text">Home</span>
          </md-list-item>
          <md-list-item class="admin-drawer-item my-2" v-on:click="page='users'">
            <md-icon class="md-size-2x">account_circle</md-icon>
            <span class="md-list-item-text">Users</span>
          </md-list-item>
          <md-list-item class="admin-drawer-item my-2" v-on:click="page='groups'">
            <md-icon class="md-size-2x">group</md-icon>
            <span class="md-list-item-text">Groups</span>
          </md-list-item>
          <md-list-item class="admin-drawer-item my-2" v-on:click="page='tags'">
            <md-icon class="md-size-2x">label</md-icon>
            <span class="md-list-item-text">Tags</span>
          </md-list-item>
          <md-list-item class="admin-drawer-item my-2" v-on:click="page='administrators'">
            <md-icon class="md-size-2x">supervised_user_circle</md-icon>
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
    curPage: null,
  }),
  methods: {
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
    background-color: #F4F3F0;
  }
  .md-list-item-content {
    font-size: 25px;
    font-weight: bold;
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
  .admin-text {
    font-size: 30px
  }
  .logout-button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
  }
</style>