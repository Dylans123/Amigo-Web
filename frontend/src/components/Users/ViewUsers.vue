<template>
  <div class="container">
    <md-card class="md-elevation-15" style="background-color: white">
      <div class="row admin-content">
        <div class="col-12">
          <div class="d-flex justify-content-start align-items-center w-100 my-3">
            <h3><b>Users</b></h3>
          </div>
        </div>
        <div class="col-12">
          <md-table>
            <md-table-row>
              <md-table-head>First Name</md-table-head>
              <md-table-head>Last Name</md-table-head>
              <md-table-head>Display Name</md-table-head>
              <md-table-head>Date Joined</md-table-head>
              <md-table-head></md-table-head>
            </md-table-row>
            <template v-for="user in users">
              <md-table-row :key="user.display_name">
                <md-table-cell>{{ user.first_name }}</md-table-cell>
                <md-table-cell>{{ user.last_name }}</md-table-cell>
                <md-table-cell>{{ user.display_name }}</md-table-cell>
                <md-table-cell>{{ user.created_on }}</md-table-cell>
                <md-table-cell>
                  <button type="button" class="btn btn-outline-primary" @click="updateCurUser(user)">Remove</button>
                </md-table-cell>
              </md-table-row>
            </template>
          </md-table>
        </div>
      </div>
    </md-card>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  created () {
    this.getUsers();
  },
  methods: {
    getUsers: function() {
      axios({
        method: 'get',
        url: `/api/user/search?query=`,
        headers: {'x-access-token': this.jwt}
      }).then((res) => {
        console.log(res.data);
        this.users = res.data.users;
      }).catch((err) => {
        console.log(err);
      })
    },
  },
  data: function() {
    return {
      users: null
    }
  },
  props: {
    jwt: String
  }
}
</script>
<style scoped>
  .admin-content {
    padding: 20px;
  }
</style>