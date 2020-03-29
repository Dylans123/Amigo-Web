<template>
    <div>
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
          <button type="button" class="btn btn-outline-primary" v-on:click="logout()">New Group +</button>
        </div>
        <div class="row">
          <div class="col-3">
            
          </div>
          <div class="col-9">
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
                    <button type="button" class="btn btn-outline-primary" v-on:click="logout()">New Group +</button>
                  </md-table-cell>
                </md-table-row>
              </template>
            </md-table>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import generateUsers from "../users.js"
export default {
  mounted: () => {
    const cookie = document.cookie;
    console.log(cookie.john);
  },
  data: function() {
    return {
      users: generateUsers()
    }
  },
  methods: {
    logout: function() {
      this.$router.push('/login');
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
</style>