<template>
  <div class="container">
    <md-dialog :md-active.sync="showCompleteDialog" style="background: white">
      <md-dialog-title>You've succesfully added the tag {{ tag }}</md-dialog-title>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showCompleteDialog=false">Close</md-button>
        <md-button class="md-primary" @click="complete()">Add another tag</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-card class="md-elevation-15" style="background-color: white">
      <div class="row admin-content">
        <div class="col-12">
          <h1><b>Create Tag</b></h1>
        </div>
        <div class="col-12">
          <form v-on:submit.prevent="onSubmit">
            <div class="form-group">
              <label for="tagPhoto">Tag Image</label>
              <div class="custom-file">
                <label class="custom-file-label" for="tagPhoto">{{ this.tagPhoto !== null ? this.tagPhoto.name : "Choose image here" }}</label>
                <input type="file" class="custom-file-input" id="tagPhoto" @change="fileChange($event.target.files)" />
              </div>
            </div>
            <div class="form-group">
              <label for="tagName">Tag Name</label>
              <input v-model="tagName" type="text" class="form-control" id="tagName">
            </div>
            <div style="color: red;" class="py-2" v-if="errors !== null">
              <h6>Errors:</h6>
              <div v-for="error in errors" v-bind:key="error.msg">
                Error: {{ error.msg }}
              </div>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-block btn-primary">Create Tag</button>
            </div>
          </form>
        </div>
      </div>
    </md-card>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data: function() {
    return {
      tagName: null,
      tagPhoto: null,
      errors: null,
      showCompleteDialog: false,
    }
  },
  props: {
    jwt: String
  },
  methods: {
    onSubmit: function() {
      console.log(this.tagName);
      console.log(this.tagPhoto)
      const formData = new FormData();
      formData.append("name", this.tagName);
      formData.append("file", this.tagPhoto);
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
    fileChange: function(files) {
      console.log(files[0]);
      this.tagPhoto = files[0];
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