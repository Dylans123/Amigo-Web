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
      </div>
    </div>
</template>
<script>
export default {
  mounted: () => {
    const cookie = document.cookie;
    console.log(cookie.john);
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