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
          <md-list-item class="admin-drawer-item my-2" to="/" exact>
            <md-icon v-bind:style="{ color: getWindow() === '/' ? '#F65D62' : 'black' }">home</md-icon>
            <span class="md-list-item-text" v-bind:style="{ color: getWindow() === '/' ? '#F65D62' : 'black' }">Home</span>
          </md-list-item>
          <md-list-item class="admin-drawer-item my-2" md-expand>
            <md-icon v-bind:style="{ color: getWindow().includes('users') ? '#F65D62' : 'black' }">account_circle</md-icon>
            <span class="md-list-item-text" v-bind:style="{ color: getWindow().includes('users') ? '#F65D62' : 'black' }">Users</span>
            <md-list slot="md-expand">
              <md-list-item to="/users/view" exact class="md-inset">
                <div v-bind:style="{ color: getWindow() === '/users/view' ? '#F65D62' : 'black' }">
                  View Users
                </div>
              </md-list-item>
              <md-list-item to="/users/create" exact class="md-inset">
                <div v-bind:style="{ color: getWindow() === '/users/create' ? '#F65D62' : 'black' }">
                  Create Users
                </div>
              </md-list-item>
              <md-list-item to="/users/delete" exact class="md-inset">
                <div v-bind:style="{ color: getWindow() === '/users/delete' ? '#F65D62' : 'black' }">
                  Delete Users
                </div>
              </md-list-item>
            </md-list>
          </md-list-item>
          <md-list-item class="admin-drawer-item my-2" md-expand>
            <md-icon v-bind:style="{ color: getWindow().includes('groups') ? '#F65D62' : 'black' }">group</md-icon>
            <span class="md-list-item-text" v-bind:style="{ color: getWindow().includes('groups') ? '#F65D62' : 'black' }">Groups</span>
            <md-list slot="md-expand">
              <md-list-item to="/groups/view" exact class="md-inset">
                <div v-bind:style="{ color: getWindow() === '/groups/view' ? '#F65D62' : 'black' }">  
                  View Groups
                </div>
              </md-list-item>
              <md-list-item to="/groups/create" exact class="md-inset">
                <div v-bind:style="{ color: getWindow() === '/groups/create' ? '#F65D62' : 'black' }">  
                  Create Group
                </div>
              </md-list-item>
              <md-list-item to="/groups/delete" exact class="md-inset">
                <div v-bind:style="{ color: getWindow() === '/groups/delete' ? '#F65D62' : 'black' }">  
                  Delete Group
                </div>
              </md-list-item>
            </md-list>
          </md-list-item>
          <md-list-item class="admin-drawer-item my-2" md-expand>
            <md-icon v-bind:style="{ color: getWindow().includes('tags') ? '#F65D62' : 'black' }">label</md-icon>
            <span class="md-list-item-text" v-bind:style="{ color: getWindow().includes('tags') ? '#F65D62' : 'black' }">Tags</span>
            <md-list slot="md-expand">
              <md-list-item to="/tags/view" exact class="md-inset">
                <div v-bind:style="{ color: getWindow() === '/tags/view' ? '#F65D62' : 'black' }">  
                  View Tags
                </div>
              </md-list-item>
              <md-list-item to="/tags/create" exact class="md-inset">
                <div v-bind:style="{ color: getWindow() === '/tags/create' ? '#F65D62' : 'black' }">  
                  Create Tags
                </div>
              </md-list-item>
              <md-list-item to="/tags/delete" exact class="md-inset">
                <div v-bind:style="{ color: getWindow() === '/tags/delete' ? '#F65D62' : 'black' }">  
                  Delete Tags
                </div>
              </md-list-item>
            </md-list>
          </md-list-item>
          <md-list-item class="admin-drawer-item my-2" md-expand>
            <md-icon v-bind:style="{ color: getWindow().includes('administrators') ? '#F65D62' : 'black' }">supervised_user_circle</md-icon>
            <span class="md-list-item-text" v-bind:style="{ color: getWindow().includes('administrators') ? '#F65D62' : 'black' }">Administrators</span>
            <md-list slot="md-expand">
              <md-list-item to="/administrators/edit" exact class="md-inset">
                <div v-bind:style="{ color: getWindow() === '/administrators/edit' ? '#F65D62' : 'black' }">  
                  Edit Administrators
                </div>
              </md-list-item>
            </md-list>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content>
        <router-view />
      </md-app-content>
    </md-app>
  </div>
</template>
<script>
export default {
  name: "App",
  created () {
    const cookie = document.cookie;
    if (cookie.length != 0) {
      this.jwt = cookie.split("jwt=")[1];
    }
    if (!this.jwt) {
      window.location.href = "/login"
    } else {
      console.log("Were cookin now");
    }
  },
  methods: {
    logout: function() {
      // Code to remove the cookie that is storing the jwt
      document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
      this.$router.push('/login');
    },
    getWindow: function() {
      console.log(window.location.pathname)
      return window.location.pathname;
    }
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
  .md-list-item-container {
    color: black;
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