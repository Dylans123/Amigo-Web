<template>
  <div class="reset-page">
    <md-dialog :md-active.sync="showCompleteDialog" style="background: white">
      <md-dialog-title>Your password has been succesfully changed!</md-dialog-title>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showCompleteDialog=false">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-12 col-md-6">
          <h1 class="mb-2">
            Change <span class="admin-text">Password</span>
          </h1>
          <h5 class="mb-4 description-text"></h5>
          <md-card class="md-elevation-15">
            <div class="row">
              <div class="col-12 reset-text">
                <div class="input-group mb-3 reset-field">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">
                      <md-icon>lock</md-icon>
                    </span>
                  </div>
                  <input type="password" class="form-control" placeholder="New Password" aria-label="New Password" aria-describedby="basic-addon1" v-model="password">
                </div>
                <div class="input-group mb-3 reset-field">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon2">
                      <md-icon>lock</md-icon>
                    </span>
                  </div>
                  <input type="password" class="form-control" placeholder="Confirm New Password" aria-label="New Password Confirmation" aria-describedby="basic-addon2" v-model="confirmPassword">
                </div>
                <div style="color: red; text-align:left" class="py-2" v-if="errors !== null">
                  <h6>Errors:</h6>
                  <div v-for="error in errors" v-bind:key="error.msg">
                    Error: {{ error.msg }}
                  </div>
                </div>
                <div>
                  <button type="button" class="btn btn-block btn-primary" @click="changePass">Reset</button>
                </div>
                <div class="reset-links my-2">
                  <router-link class="reset-login" to="/login">Login to your account</router-link>
                </div>
              </div>
            </div>
          </md-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  created () {
    const url = window.location.href;
    const vals = url.split("?token=");
    const token = vals[1];
    this.token = token;
  },
  data: function() {
    return {
      password: null,
      confirmPassword: null,
      showCompleteDialog: false,
      errors: null,
      token: null,
    }
  },
  methods: {
    changePass: function() {
      axios({
        method: 'post',
        url: '/api/changepassword',
        data: {
          new_password: this.password,
          confirmation_new_password: this.confirmPassword,
          token: this.token,
        }
      }).then((res) => {
        this.errors = null;
        this.showCompleteDialog = true;
        console.log(res);
      }).catch((err) => {
        this.errors = err.response.data.errors;
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>
  .reset-page {
    height: 100vh;
    background-color: #F7F7F7;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .admin-text {
    color: #F65D62;
    font-size: 2.5rem;
  }

  .description-text {
    color: #989898;
  }

  .md-card {
    width: 100%;
    padding: 0 50px;
    vertical-align: top;
    background-color: white !important;
    border-radius:8px;
  }

  .md-icon {
    color: #CED4DA;
  }

  .reset-field span {
    background: none !important;
  }

  .reset-field input {
    height: 50px;
  }

  .reset-text {
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .reset-image img {
    height: 100%;
    width: 100%;
  }

  .reset-links {
    display: flex;
    justify-content: space-between;
  }

  .reset-forgot {
    color: #B0B3B5;
  }

</style>