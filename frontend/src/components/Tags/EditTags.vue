<template>
  <div class="container">
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
    }
  },
  data: function() {
    return {
      search: null,
      tags: null,
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