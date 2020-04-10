<template>
  <div class="container">
    <md-dialog :md-active.sync="showCompleteDialog" style="background: white">
      <md-dialog-title>You've succesfully added this user. Check {{ email }} for a verification email to complete the process.</md-dialog-title>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showCompleteDialog=false">Close</md-button>
        <md-button class="md-primary" @click="complete()">Add another user</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-card class="md-elevation-15" style="background-color: white">
      <div class="row admin-content">
        <div class="col-12">
          <h1><b>Create Group</b></h1>
        </div>
        <div class="col-12">
          <form v-on:submit.prevent="onSubmit">
            <div class="form-group">
              <label for="groupPhoto">Group Image</label>
              <div class="custom-file">
                <label class="custom-file-label" for="groupPhoto"></label>
                <input type="file" class="custom-file-input" id="groupPhoto" @change="fileChange($event.target.files)" />
              </div>
            </div>
            <div class="form-group">
              <label for="tag">Tag</label>
              <select class="custom-select" name="tag" v-model="groupTag">
                <option selected></option>
                <option v-for="tag in tags" :key="tag['tag_id']" v-bind:value="tag['tag_id']">{{ tag.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="school">School</label>
              <select class="custom-select" name="school" v-model="groupSchool">
                <option selected></option>
                <option v-for="school in schools" :key="school.name" v-bind:value="school['school_id']">{{ school.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" class="form-control" v-model="groupName" value="" required>
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <input type="text" class="form-control" v-model="groupDescription" value="" required>
            </div>
            <div style="color: red;" class="py-2" v-if="errors !== null">
              <h6>Errors:</h6>
              <div v-for="error in errors" v-bind:key="error.msg">
                Error: {{ error.msg }}
              </div>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-block btn-primary">Create User</button>
            </div>
          </form>
        </div>
      </div>
    </md-card>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  created () {
    this.getSchools();
    this.getTags();
  },
  data: function() {
    return {
      groupTag: null,
      groupSchool: null,
      groupName: null,
      groupDescription: null,
      schools: null,
      tags: null,
      errors: null,
      showCompleteDialog: false
    }
  },
  props: {
    jwt: String
  },
  methods: {
    onSubmit: function() {
      const formData = new FormData();
      formData.append("name", this.groupName);
      formData.append("description", this.groupDescription);
      formData.append("school_id", this.groupSchool);
      formData.append("tag_id", this.groupTag);
      formData.append("file", this.groupPhoto);
      console.log(formData);
      axios.post(
        '/api/tags',
        formData,
        {
          headers: {
            'x-access-token': this.jwt,
            'content-type': 'multipart/form-data'
          }
        }
      ).then((res) => {
        console.log(res);
        this.showCompleteDialog = true
      })
      .catch((err) => {
        this.errors = err.response.data.errors;
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
    fileChange: function(files) {
      console.log(files[0]);
      this.groupPhoto = files[0];
    },
    complete: function() {
      this.showCompleteDialog = false;
      window.location.reload();
    }
  }
}
</script>
<style scoped>
  .admin-content {
    padding: 20px;
  }
  label {
    font-size: 16px;
  }
</style>