<template>
  <div>
    <template v-if="this.jwt">
      <div>
        <md-dialog :md-active.sync="showDialog" style="background: white">
          <md-dialog-title>New Group Information</md-dialog-title>
          <md-dialog-actions>
            <md-button class="md-primary" @click="showDialog = false">Close</md-button>
            <md-button class="md-primary" @click="showDialog = false">Save</md-button>
          </md-dialog-actions>
        </md-dialog>
        <md-toolbar md-elevation="0">
          <div class="container d-flex justify-content-between align-items-center w-100 my-3">
            <h3 class="admin-text"><b>Amigo Admin Dashboard</b></h3>
            <button type="button" class="btn" v-on:click="logout()"><h4>Logout</h4></button>
          </div>
        </md-toolbar>
        <md-divider></md-divider>
        <div class="container">
          <div class="d-flex justify-content-between align-items-center w-100 my-3">
            <h3><b>Groups</b></h3>
            <button type="button" class="btn btn-outline-primary" @click="showDialog=true">New Group +</button>
          </div>
          <div class="row">
            <div class="col-3 home-data">
              <p class="my-3"><b>Admin Groups</b></p>
              <template v-for="group in groups">
                <md-card :key="group.name" class="my-2 md-elevation-4" md-with-hover>
                  <md-card-media>
                    <div class="red-circle"></div>
                  </md-card-media>
                  <md-card-header>
                    <md-card-header-text>
                      <div><h6>{{ group.name }}</h6></div>
                      <div>{{ group.memberCount }} members</div>
                    </md-card-header-text>
                  </md-card-header>
                </md-card>
              </template>
            </div>
            <div class="col-9 home-data">
              <md-table>
                <md-table-row>
                  <md-table-head>First Name</md-table-head>
                  <md-table-head>Last Name</md-table-head>
                  <md-table-head>Display Name</md-table-head>
                  <md-table-head>Date Joined</md-table-head>
                  <md-table-head></md-table-head>
                </md-table-row>
                <template v-for="user in users">
                  <md-table-row :key="user.displayName">
                    <md-table-cell>{{ user.firstName }}</md-table-cell>
                    <md-table-cell>{{ user.lastName }}</md-table-cell>
                    <md-table-cell>{{ user.displayName }}</md-table-cell>
                    <md-table-cell>{{ user.dateJoined }}</md-table-cell>
                    <md-table-cell>
                      <button type="button" class="btn btn-outline-primary" v-on:click="logout()">Remove</button>
                    </md-table-cell>
                  </md-table-row>
                </template>
              </md-table>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import generateUsers from "../users.js"
// import generateGroups from "../groups.js"
import axios from 'axios';
export default {
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
    this.groups = this.getGroups();
  },
  data: function() {
    return {
      users: generateUsers(),
      groups: null,
      showDialog: false,
      jwt: null
    }
  },
  methods: {
    logout: function() {
      // Code to remove the cookie that is storing the jwt
      document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
      this.$router.push('/login');
    },
    getGroups: function() {
      console.log(this.jwt)
      axios.get('/api/channels/all', {
        headers: {'x-access-token': this.jwt}
      }).then((res) => {  
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })
    }
  }
}
</script>
<style scoped>
  .md-toolbar {
    display: flex;
    justify-content: space-between;
    border-bottom: 3px solid black;
  }
  .admin-text {
    color: #F65D62;
  }
  .home-data {
    max-height: 75vh;
    overflow: scroll;
  }
  .red-circle {
    border-radius: 100%;
    height: 40px;
    width: 40px;
    background: #F65D62;
  }
  .md-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
  }
</style>