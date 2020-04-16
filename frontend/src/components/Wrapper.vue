<template v-if="this.jwt">
  <div>
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
          <md-list-item class="admin-drawer-item my-2" to="/admin" exact>
            <md-icon v-bind:style="{ color: getWindow() === '/admin' || getWindow() === '/admin/' ? '#F65D62' : 'black' }">home</md-icon>
            <span class="md-list-item-text" v-bind:style="{ color: getWindow() === '/admin' || getWindow() === '/admin/' ? '#F65D62' : 'black' }">Home</span>
          </md-list-item>
          <md-list-item class="admin-drawer-item my-2" md-expand>
            <md-icon v-bind:style="{ color: getWindow().includes('users') ? '#F65D62' : 'black' }">account_circle</md-icon>
            <span class="md-list-item-text" v-bind:style="{ color: getWindow().includes('users') ? '#F65D62' : 'black' }">Users</span>
            <md-list slot="md-expand">
              <md-list-item to="/admin/users/view" exact class="md-inset">
                <div v-bind:style="{ color: getWindow() === '/admin/users/view' ? '#F65D62' : 'black' }">
                  View Users
                </div>
              </md-list-item>
              <md-list-item to="/admin/users/create" exact class="md-inset">
                <div v-bind:style="{ color: getWindow() === '/admin/users/create' ? '#F65D62' : 'black' }">
                  Create Users
                </div>
              </md-list-item>
            </md-list>
          </md-list-item>
          <md-list-item class="admin-drawer-item my-2" md-expand>
            <md-icon v-bind:style="{ color: getWindow().includes('groups') ? '#F65D62' : 'black' }">group</md-icon>
            <span class="md-list-item-text" v-bind:style="{ color: getWindow().includes('groups') ? '#F65D62' : 'black' }">Groups</span>
            <md-list slot="md-expand">
              <md-list-item to="/admin/groups/edit" exact class="md-inset">
                <div v-bind:style="{ color: getWindow() === '/admin/groups/edit' ? '#F65D62' : 'black' }">  
                  Edit Groups
                </div>
              </md-list-item>
              <md-list-item to="/admin/groups/edit/users" exact class="md-inset">
                <div v-bind:style="{ color: getWindow() === '/admin/groups/edit/users' ? '#F65D62' : 'black' }">  
                  Edit Group Users
                </div>
              </md-list-item>
              <md-list-item to="/admin/groups/create" exact class="md-inset">
                <div v-bind:style="{ color: getWindow() === '/admin/groups/create' ? '#F65D62' : 'black' }">  
                  Create Group
                </div>
              </md-list-item>
            </md-list>
          </md-list-item>
          <md-list-item class="admin-drawer-item my-2" md-expand>
            <md-icon v-bind:style="{ color: getWindow().includes('tags') ? '#F65D62' : 'black' }">label</md-icon>
            <span class="md-list-item-text" v-bind:style="{ color: getWindow().includes('tags') ? '#F65D62' : 'black' }">Tags</span>
            <md-list slot="md-expand">
              <md-list-item to="/admin/tags/edit" exact class="md-inset">
                <div v-bind:style="{ color: getWindow() === '/admin/tags/edit' ? '#F65D62' : 'black' }">  
                  Edit Tags
                </div>
              </md-list-item>
              <md-list-item to="/admin/tags/create" exact class="md-inset">
                <div v-bind:style="{ color: getWindow() === '/admin/tags/create' ? '#F65D62' : 'black' }">  
                  Create Tags
                </div>
              </md-list-item>
            </md-list>
          </md-list-item>
          <md-list-item class="admin-drawer-item my-2" md-expand>
            <md-icon v-bind:style="{ color: getWindow().includes('administrators') ? '#F65D62' : 'black' }">supervised_user_circle</md-icon>
            <span class="md-list-item-text" v-bind:style="{ color: getWindow().includes('administrators') ? '#F65D62' : 'black' }">Admins</span>
            <md-list slot="md-expand">
              <md-list-item to="/admin/administrators/view" exact class="md-inset">
                <div v-bind:style="{ color: getWindow() === '/admin/administrators/view' ? '#F65D62' : 'black' }">  
                  View Admins
                </div>
                
                
              </md-list-item>
              <md-list-item to="/admin/administrators/create" exact class="md-inset">
                <div v-bind:style="{ color: getWindow() === '/admin/administrators/create' ? '#F65D62' : 'black' }">  
                  Create Admins
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
  name: "Wrapper",
  created () {
    if (!this.jwt || this.jwt == null) {
      this.$router.push('/login');
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
  },
  props: {
    jwt: String
  }
}
</script>
<style>
  .md-app-toolbar {
    border-bottom: 1px solid #9E9D9D;
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
    border-bottom: 2px solid #9E9D9D;
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