<template>
  <div class="container">
    <md-dialog :md-active.sync="showConfirmDialog" v-if="curAdmin !== null" style="background: white">
      <md-dialog-title>Are you sure you want to make {{  curAdmin['display_name'] }} Admin?</md-dialog-title>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showConfirmDialog=false">No</md-button>
        <md-button class="md-primary" @click="submitConfirm()">Yes</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-dialog :md-active.sync="showCompleteDialog"  v-if="curAdmin !== null" style="background: white">
      <md-dialog-title>You have succesfully set the user {{ curAdmin['display_name'] }} as an admin.</md-dialog-title>
      <md-dialog-actions>
        <md-button class="md-primary" @click="complete()">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-card class="md-elevation-15" style="background-color: white">
      <div class="row admin-content">
        <div class="col-12" style="height: 80vh; overflow: scroll">
          <md-table v-model="searched" md-sort="user_id" md-sort-order="asc" class="md-elevation-0">
            <md-table-toolbar>
              <div class="md-toolbar-section-start">
                <h1><b>Create Admins</b></h1>
              </div>
              <md-field md-clearable class="md-toolbar-section-end">
                <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
              </md-field>
            </md-table-toolbar>
            <md-table-empty-state
              md-label="No users found"
              :md-description="`No user found for this '${search}' query. Try a different search term or create a new user.`">
            </md-table-empty-state>
            <md-table-row :key="item.display_name" slot="md-table-row" :class="getBgRowColor()" slot-scope="{ item }">
              <md-table-cell md-label="User Id" md-sort-by="user_id">{{ item.user_id }}</md-table-cell>
              <md-table-cell md-label="First Name" md-sort-by="first_name">{{ item.first_name }}</md-table-cell>
              <md-table-cell md-label="Last Name" md-sort-by="last_name">{{ item.last_name }}</md-table-cell>
              <md-table-cell md-label="Display Name" md-sort-by="display_name">{{ item.display_name }}</md-table-cell>
              <md-table-cell md-label="Date Joined" md-sort-by="created_on">{{ convertToDate(item.created_on) }}</md-table-cell>
              <md-table-cell md-label="Make Admin">
                <button type="button" class="btn btn-outline-primary" @click="updateCurAdmin(item)">Make Admin</button>
              </md-table-cell>
            </md-table-row>
          </md-table>

              
        </div>
      </div>
    </md-card>
  </div>
</template>
<script>
import axios from 'axios';
const searchByName = (items, term) => {
  console.log('ow')
  if (term) {
    return items.filter(item => toLower(item.first_name).includes(toLower(term)))
  }

  return items
}
const toLower = (text) => {
  return text.toString().toLowerCase()
}
export default {
  created () {
    this.searched = [];
    this.getUsers();
    console.log(this.jwt);
  },
  methods: {
    getUsers: function() {
      axios({
        method: 'get',
        url: `/api/user/search?query=`,
        headers: {'x-access-token': this.jwt}
      }).then((res) => {
        console.log(res.data);
        const nonAdminUsers = res.data.users.filter((item) => {
          return parseInt(item['access_level']) != 10;
        });
        console.log(nonAdminUsers);
        this.users = nonAdminUsers;
        this.searched = this.users
      }).catch((err) => {
        console.log(err);
      })
    },
    convertToDate: function(date) {
      const month = new Date(date).getMonth();
      const day = new Date(date).getDate();
      const year = new Date(date).getFullYear();
      const retDate = (month + 1) + "/" + day + "/" + year;
      return retDate;
    },
    newUser: function() {
      window.alert('Noop')
    },
    searchOnTable: function() {
      this.searched = searchByName(this.users, this.search)
    },
    updateCurAdmin: function(item) {
      console.log(item);
      this.curAdmin = item;
      this.showConfirmDialog = true;
    },
    submitConfirm: function(){
      this.showConfirmDialog = false;
      axios({
        method: 'post',
        url: '/api/users/makeadmin',
        data: {
          user_id: this.curAdmin['user_id']
        },
        headers: {'x-access-token': this.jwt}
      }).then((res) => {
        this.errors = null;
        this.showCompleteDialog = true;
        this.getUsers();
        console.log(res);
      }).catch((err) => {
        this.errors = err.response.data.errors;
        console.log(err);
      })
    },
    complete: function(){
      this.curAdmin = null;
      this.showCompleteDialog = false;
    },
    getBgRowColor: function() {
      // this.bgRowColor = this.bgRowColor + 1;
      if(this.bgRowColor % 2 == 0) {
        return 'md-primary';
      } else {
        return 'md-accent';
      }
    }
  },
  data: function() {
    return {
      search: null,
      users: null,
      searched: [],
      curAdmin: null,
      showConfirmDialog: false,
      showCompleteDialog: false,
      errors: null,
      bgRowColor: 0
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