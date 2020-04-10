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
          <h1><b>Create User</b></h1>
        </div>
        <div class="col-12">
          <form v-on:submit.prevent="onSubmit">
            <div class="form-group">
              <label for="emailAddress">Email address</label>
              <input v-model="email" type="email" class="form-control" id="emailAddress">
            </div>
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input v-model="firstName" type="text" class="form-control" id="firstName">
            </div>
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input v-model="lastName" type="text" class="form-control" id="lastName">
            </div>
            <div class="form-group">
              <label for="displayName">Display Name</label>
              <input v-model="displayName" type="text" class="form-control" id="displayName">
            </div>
            <div class="form-group">
              <label for="school">School</label>
              <select class="form-control" name="school" v-model="school">
                <option selected></option>
                <option v-for="school in schools" :key="school.name" v-bind:value="school['school_id']">{{ school.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input v-model="password" type="password" class="form-control" id="password">
            </div>
            <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <input v-model="confirmPassword" type="password" class="form-control" id="confirmPassword">
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
export default {
  
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