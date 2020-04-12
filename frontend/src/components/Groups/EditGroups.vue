<template>
  <div class="container">
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
            <md-table-row :key="item.name" slot="md-table-row" :class="getBgRowColor()" slot-scope="{ item }">
              <md-table-cell md-label="Group Id" md-sort-by="channel_id">{{ item.channel_id }}</md-table-cell>
              <md-table-cell md-label="Group Name" md-sort-by="name">{{ item.name }}</md-table-cell>
              <md-table-cell md-label="Group Description" md-sort-by="description">{{ item.description }}</md-table-cell>
              <md-table-cell md-label="Group Tag" md-sort-by="tag_name">{{ item.tag_name }}</md-table-cell>
              <md-table-cell md-label="Group School" md-sort-by="school_name">{{ item.school_name }}</md-table-cell>
              <md-table-cell md-label="Date Joined" md-sort-by="created_on">{{ convertToDate(item.created_on) }}</md-table-cell>
              <md-table-cell md-label="Edit">
                <button type="button" class="btn btn-outline-primary" @click="updateCurGroup(item)">Remove</button>
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
    }
  },
  data: function() {
    return {
      search: null,
      groups: null,
      curGroupName: null,
      curGroupDescription: null,
      curGroupTag: null,
      curGroupPhoto: null,
      curGroupSchool: null,
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