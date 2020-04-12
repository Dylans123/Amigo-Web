<template>
  <div class="container">
    <md-dialog :md-active.sync="showCompleteDialog"  v-if="curGroup !== null" style="background: white">
      <md-dialog-title>You've succesfully edited the group {{ this.curGroup.name }}.</md-dialog-title>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showCompleteDialog=false">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-dialog :md-active.sync="showEditDialog" v-if="curGroup !== null" style="background: white">
      <md-dialog-title>Edit {{ this.curGroup.name }}</md-dialog-title>
      <md-dialog-content>
        <div class="form-group">
          <label for="groupPhoto">Group Image</label>
          <div class="custom-file">
            <label class="custom-file-label" for="groupPhoto"></label>
            <input type="file" class="custom-file-input" id="groupPhoto" @change="fileChange($event.target.files)" />
          </div>
        </div>
        <div class="form-group">
          <label for="tag">Tag</label>
          <select class="custom-select" name="tag" v-model="curGroup.tag_id">
            <option v-for="tag in tags" :key="tag['tag_id']" v-bind:value="tag['tag_id']">{{ tag.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="school">School</label>
          <select class="custom-select" name="school" v-model="curGroup.school_id">
            <option selected></option>
            <option v-for="school in schools" :key="school.name" v-bind:value="school['school_id']">{{ school.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" v-model="curGroup.name" value="" required>
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea type="text" class="form-control" v-model="curGroup.description" value="" required />
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
          <md-table v-model="searched" md-sort="channel_id" md-sort-order="asc" class="md-elevation-0">
            <md-table-toolbar>
              <div class="md-toolbar-section-start">
                <h1><b>Edit Groups</b></h1>
              </div>
              <md-field md-clearable class="md-toolbar-section-end">
                <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
              </md-field>
            </md-table-toolbar>
            <md-table-empty-state
              md-label="No groups found"
              :md-description="`No groups found for this '${search}' query. Try a different search term or create a new group.`">
            </md-table-empty-state>
            <md-table-row :key="item.channel_id" slot="md-table-row" :class="getBgRowColor()" slot-scope="{ item }">
              <md-table-cell md-label="Group Id" md-sort-by="channel_id">{{ item.channel_id }}</md-table-cell>
              <md-table-cell md-label="Group Name" md-sort-by="name">{{ item.name }}</md-table-cell>
              <md-table-cell md-label="Group Description" md-sort-by="description">{{ item.description }}</md-table-cell>
              <md-table-cell md-label="Group Tag" md-sort-by="tag_name">{{ item.tag_name }}</md-table-cell>
              <md-table-cell md-label="Group School" md-sort-by="school_name">{{ item.school_name }}</md-table-cell>
              <md-table-cell md-label="Date Joined" md-sort-by="created_on">{{ convertToDate(item.created_on) }}</md-table-cell>
              <md-table-cell md-label="Edit">
                <button type="button" class="btn btn-outline-primary" @click="updateCurGroup(item)">Edit</button>
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
    this.getGroups();
    this.getSchools();
    this.getTags();
  },
  methods: {
    getGroups: function() {
      axios({
        method: 'get',
        url: `/api/channels`,
        headers: {'x-access-token': this.jwt}
      }).then((res) => {
        console.log(res.data);
        this.groups = res.data.channels;
        this.searched = this.groups
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
      this.searched = searchByName(this.groups, this.search)
    },
    getBgRowColor: function() {
      // this.bgRowColor = this.bgRowColor + 1;
      if(this.bgRowColor % 2 == 0) {
        return 'md-primary';
      } else {
        return 'md-accent';
      }
    },
    updateCurGroup: function(item) {
      console.log(item);
      this.curGroup = item;
      this.showEditDialog = true;
    },
    submitEdit: function() {
      this.showEditDialog = false;
      const formData = new FormData();
      formData.append("channel_id", this.curGroup.channel_id);
      formData.append("name", this.curGroup.name);
      formData.append("description", this.curGroup.description);
      formData.append("school_id", this.curGroup.school_id);
      formData.append("tag_id", this.curGroup.tag_id);
      formData.append("file", this.curGroupPhoto);
      axios.post(
        '/api/channels/update',
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
    editComplete: function() {
      this.curGroup = null;
      this.curGroupPhoto = null;
      this.showCompleteDialog = false;
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
        console.log(res.data);
        this.tags = res.data.tags;
      }).catch((err) => {
        console.log(err);
      })
    },
    fileChange: function(files) {
      console.log(files[0]);
      this.curGroupPhoto = files[0];
    }
  },
  data: function() {
    return {
      search: null,
      groups: null,
      tags: null,
      schools: null,
      curGroup: null,
      curGroupPhoto: null,
      showEditDialog: false,
      showCompleteDialog: false,
      errors: null,
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