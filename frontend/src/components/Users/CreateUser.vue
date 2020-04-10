<template>
  <div class="container">
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
import axios from 'axios';
export default {
  created () {
    this.getSchools();
  },
  data: function() {
    return {
      email: '',
      firstName: '',
      lastName: '',
      displayName: '',
      school: '',
      password: '',
      confirmPassword: '',
      schools: null
    }
  },
  props: {
    jwt: String,
  },
  methods: {
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
    onSubmit: function() {
      const data = {
        email: this.email,
        password: this.password,
        confirmation_password: this.confirmPassword,
        first_name: this.firstName,
        last_name: this.lastName,
        display_name: this.displayName,
        school_id: this.school
      }
      console.log(data);
      axios({
        method: 'post',
        url: '/api/signup',
        headers: {'x-access-token': this.jwt},
        data
      }).then((res) => {
        console.log(res)
        // this.schools = res.data.schools;
      }).catch((err) => {
        console.log(err);
      })
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