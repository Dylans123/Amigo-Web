<template>
  <div>
    <template v-if="this.jwt">
      <div>
        <md-dialog :md-active.sync="showGroupDialog" style="background: white">
          <md-dialog-title>New Group Information</md-dialog-title>
          <div class="row px-5">
            <div class="col-12 my-1">
              <label for="tag">Tag</label>
              <select class="custom-select" name="tag" v-model="newGroupTag">
                <option selected></option>
                <option v-for="tag in tags" :key="tag['tag_id']" v-bind:value="tag['tag_id']">{{ tag.name }}</option>
              </select>
            </div>
            <div class="col-12 my-1">
              <label for="school">School</label>
              <select class="custom-select" name="school" v-model="newGroupSchool">
                <option selected></option>
                <option v-for="school in schools" :key="school.name" v-bind:value="school['school_id']">{{ school.name }}</option>
              </select>
            </div>
            <div class="col-12 my-1">
              <label for="name">Name</label>
              <input type="text" class="form-control" v-model="newGroupName" value="" required>
            </div>
            <div class="col-12 my-1">
              <label for="description">Description</label>
              <input type="text" class="form-control" v-model="newGroupDescription" value="" required>
            </div>
          </div>
          <md-dialog-actions>
            <md-button class="md-primary" @click="showGroupDialog=false">Cancel</md-button>
            <md-button class="md-primary" @click="createGroup()">Create</md-button>
          </md-dialog-actions>
        </md-dialog>
        <md-dialog :md-active.sync="showDeleteDialog" style="background: white">
          <md-dialog-title>Are you sure you want to remove this user from this group? This action can't be undone.</md-dialog-title>
          <md-dialog-actions>
            <md-button class="md-primary" @click="showDeleteDialog=false">No</md-button>
            <md-button class="md-primary" @click="removeUser(curUser['user_id'], curChannel['channel_id'])">Yes</md-button>
          </md-dialog-actions>
        </md-dialog>
        <div class="container">
          <md-card class="md-elevation-15">
            <div class="row admin-content">
              <div class="col-12">
                <div class="d-flex justify-content-between align-items-center w-100 my-3">
                  <h3><b>Groups</b></h3>
                  <button type="button" class="btn btn-outline-primary" @click="showGroupDialog=true">New Group +</button>
                </div>
              </div>
              <div class="col-3 home-data">
                <p class="my-3"><b>Admin Groups</b></p>
                <template v-for="group in groups" @click.native="updateCurChannel(group)">
                  <md-card :key="group.name" @click.native="updateCurChannel(group)" v-bind:class="{ 'active': curChannel['channel_id']==group['channel_id'] }" class="my-2 md-elevation-4" md-with-hover>
                    <md-card-media>
                      <div class="red-circle"></div>
                    </md-card-media>
                    <md-card-header>
                      <md-card-header-text>
                        <div><h6>{{ group.name }}</h6></div>
                        <!-- <div>{{ group.description }} members</div> -->
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
      </div>
    </template>
  </div>
</template>
<script>
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
    this.getGroups();
    this.getSchools();
    this.getTags();
  },
  data: function() {
    return {
      showGroupDialog: false,
      showDeleteDialog: false,
      newGroupName: null,
      newGroupDescription: null,
      newGroupTag: null,
      newGroupSchool: null,
      curUser: null,
      curChannel: null,
      users: null,
      groups: null,
      schools: null,
      tags: null,
      jwt: null
    }
  },
  methods: {
    updateCurChannel: function(channel) {
      this.curChannel = channel;
      this.getUsers();
    },
    updateCurUser: function(user) {
      this.curUser = user;
      this.showDeleteDialog = true; 
    },
    removeUser: function(user_id, channel_id) {
      axios({
        method: 'post',
        url: '/api/channels/users/remove',
        data: {
          user_id: user_id,
          channel_id: channel_id
        },
        headers: {'x-access-token': this.jwt}
      }).then(() => {  
        this.users = this.getUsers();
      }).catch((err) => {
        console.log(err);
      })
      this.showDeleteDialog = false;
      this.curUser = null;
    },
    getUsers: function() {
      axios({
        method: 'get',
        url: `/api/channels/users?channel_id=${this.curChannel['channel_id']}`,
        headers: {'x-access-token': this.jwt}
      }).then((res) => {  
        this.users = res.data.users;
      }).catch((err) => {
        console.log(err);
      })
    },
    getGroups: function() {
      axios({
        method: 'get',
        url: '/api/channels',
        headers: {'x-access-token': this.jwt}
      }).then((res) => {  
        this.groups = res.data.channels;
        this.curChannel = res.data.channels[0];
        this.users = this.getUsers();
      }).catch((err) => {
        console.log(err);
      })
    },
    getSchools: function() {
      axios({
        method: 'get',
        url: '/api/schools',
        headers: {'x-access-token': this.jwt}
      }).then((res) => {  
        this.schools = res.data.schools;
      }).catch((err) => {
        console.log(err);
      })
    },
    getTags: function() {
      axios({
        method: 'get',
        url: '/api/tags',
        headers: {'x-access-token': this.jwt}
      }).then((res) => {  
        this.tags = res.data.tags;
      }).catch((err) => {
        console.log(err);
      })
    },
    createGroup: function() {
      console.log({
        tag_id: this.newGroupTag,
        school_id: this.newGroupSchool,
        name: this.newGroupName,
        description: this.newGroupDescription
      });
      axios({
        method: 'post',
        url: '/api/channels',
        data: {
          tag_id: this.newGroupTag,
          school_id: this.newGroupSchool,
          name: this.newGroupName,
          description: this.newGroupDescription
        },
        headers: {'x-access-token': this.jwt}
      }).then((res) => {  
        console.log(res);
        this.groups = this.getGroups();
      }).catch((err) => {
        console.log(err);
      })
      this.showGroupDialog = false;
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
  .admin-content {
    padding: 20px;
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
  .active {
    border: #F65D62 solid 5px;
  }
</style>