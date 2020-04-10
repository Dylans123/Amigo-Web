<template>
  <div class="container">
    <md-card class="md-elevation-15" style="background-color: white">
      <div class="row admin-content">
        <div class="col-12">
          <h1><b>Create User</b></h1>
        </div>
        <div class="col-12 my-2">
          <label for="emailAddress">Email address</label>
          <input v-model="email" type="email" class="form-control" id="emailAddress">
        </div>
        <div class="col-12 my-2">
          <label for="firstName">First Name</label>
          <input v-model="firstName" type="text" class="form-control" id="firstName">
        </div>
        <div class="col-12 my-2">
          <label for="lastName">Last Name</label>
          <input v-model="lastName" type="text" class="form-control" id="lastName">
        </div>
        <div class="col-12 my-2">
          <label for="displayName">Display Name</label>
          <input v-model="displayName" type="text" class="form-control" id="displayName">
        </div>
        <div class="col-12 my-2">
          <label for="">School</label>
          <input type="text" class="form-control" id="emailAddress">
        </div>
        <div class="col-12 my-2">
          <label for="password">Password</label>
          <input v-model="password" type="password" class="form-control" id="password">
        </div>
        <div class="col-12 my-2">
          <label for="confirmPassword">Confirm Password</label>
          <input v-model="confirmdPassword" type="text" class="form-control" id="confirmPassword">
        </div>
        <div class="col-12 my-2">
          <button type="button" class="btn btn-block btn-primary">Create User</button>
        </div>
      </div>
    </md-card>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      email: '',
      firstName: '',
      lastName: '',
      displayName: '',
      school: '',
      password: '',
      confirmPassword: ''
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