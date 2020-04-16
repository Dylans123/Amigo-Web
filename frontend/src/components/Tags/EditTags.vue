<template>
  <div class="container">
    <md-dialog :md-active.sync="showCompleteDialog"  v-if="curTag !== null" style="background: white">
      <md-dialog-title>You've succesfully edited the tag {{ this.curTag.name }}.</md-dialog-title>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showCompleteDialog=false">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-dialog :md-active.sync="showEditDialog" v-if="curTag !== null" style="background: white">
      <md-dialog-title>Edit Tag</md-dialog-title>
      <md-dialog-content>
        <div class="form-group">
          <label for="tagPhoto">Tag Image</label>
          <div class="custom-file">
            <label class="custom-file-label" for="tagPhoto">{{ this.curTagPhoto !== null ? this.curTagPhoto.name : "Choose image here" }}</label>
            <input type="file" class="custom-file-input" id="tagPhoto" @change="fileChange($event.target.files)" />
          </div>
        </div>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" v-model="curTag.name" value="" required>
        </div>
        <div style="color: red;" class="py-2" v-if="errors !== null">
          <h6>Errors:</h6>
          <div v-for="error in errors" v-bind:key="error.msg">
            Error: {{ error.msg }}
          </div>
        </div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showEditDialog=false">Close</md-button>
        <md-button class="md-primary" @click="submitEdit()">Submit Edit</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-card class="md-elevation-15" style="background-color: white">
      <div class="row admin-content">
        <div class="col-12" style="height: 80vh; overflow: scroll">
          <md-table v-model="searched" md-sort="tag_id" md-sort-order="asc" class="md-elevation-0">
            <md-table-toolbar>
              <div class="md-toolbar-section-start">
                <h1><b>Edit Tags</b></h1>
              </div>
              <md-field md-clearable class="md-toolbar-section-end">
                <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
              </md-field>
            </md-table-toolbar>
            <md-table-empty-state
              md-label="No tags found"
              :md-description="`No tag found for this '${search}' query. Try a different search term or create a new tag.`">
            </md-table-empty-state>
            <md-table-row :key="item.name" slot="md-table-row" :class="getBgRowColor()" slot-scope="{ item }">
              <md-table-cell md-label="Tag Id" md-sort-by="tag_id">{{ item.tag_id }}</md-table-cell>
              <md-table-cell md-label="Tag Name" md-sort-by="name">{{ item.name }}</md-table-cell>
              <md-table-cell md-label="Date Joined" md-sort-by="created_on">{{ convertToDate(item.created_on) }}</md-table-cell>
              <md-table-cell md-label="Edit">
                <button type="button" class="btn btn-outline-primary" @click="updateCurTag(item)">Edit</button>
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
  if (term) {
    return items.filter(item => toLower(item.name).includes(toLower(term)))
  }

  return items
}
const toLower = (text) => {
  return text.toString().toLowerCase()
}
export default {
  created () {
    this.searched = [];
    this.getTags();
  },
  methods: {
    getTags: function() {
      axios({
        method: 'get',
        url: `/api/tags`,
        headers: {'x-access-token': this.jwt}
      }).then((res) => {
        console.log(res.data);
        this.tags = res.data.tags;
        this.searched = this.tags
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
      this.searched = searchByName(this.tags, this.search)
    },
    getBgRowColor: function() {
      // this.bgRowColor = this.bgRowColor + 1;
      if(this.bgRowColor % 2 == 0) {
        return 'md-primary';
      } else {
        return 'md-accent';
      }
    },
    updateCurTag: function(item) {
      console.log(item);
      this.curTag = item;
      this.showEditDialog = true;
    },
    submitEdit: function() {
      this.showEditDialog = false;
      const formData = new FormData();
      formData.append("tag_id", this.curTag.tag_id);
      formData.append("name", this.curTag.name);
      formData.append("file", this.curTagPhoto);
      axios.post(
        '/api/tags/update',
        formData,
        {
          headers: {
            'x-access-token': this.jwt,
            'content-type': 'multipart/form-data'
          }
        }
      ).then((res) => {
        console.log(res);
        this.errors = null;
        this.showCompleteDialog = true
      })
      .catch((err) => {
        this.errors = err.response.data.errors;
      })
    },
    editComplete: function() {
      this.curTag = null;
      this.curTagPhoto = null;
      this.showCompleteDialog = false;
    },
    fileChange: function(files) {
      console.log(files[0]);
      this.curTagPhoto = files[0];
    }
  },
  data: function() {
    return {
      search: null,
      tags: null,
      curTag: null,
      curTagPhoto: null,
      errors: null,
      showEditDialog: false,
      showCompleteDialog: false,
      searched: [],
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