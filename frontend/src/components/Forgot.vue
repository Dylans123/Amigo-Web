<template>
  <div class="new-pass-page">
    <md-dialog :md-active.sync="showCompleteDialog"  v-if="email !== null" style="background: white">
      <md-dialog-title>An email to reset your password has been resent to {{ this.email }}.</md-dialog-title>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showCompleteDialog=false">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-12 col-md-6">
          <h1 class="mb-2">
            Forgot your <span class="admin-text">Password?</span>
          </h1>
          <h6 class="mb-4 description-text">Resetting your password is easy, just tell us the email address you new-passed with Amigo.</h6>
          <md-card class="md-elevation-15">
            <div class="row">
              <div class="col-12 new-pass-text">
                <div class="input-group mb-3 new-pass-field">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <md-icon>email</md-icon>
                    </span>
                  </div>
                  <input type="text" class="form-control" placeholder="Email" v-model="email">     
                </div>
                <div style="color: red;" class="py-2" v-if="errors !== null">
                  <h6>Errors:</h6>
                  <div v-for="error in errors" v-bind:key="error.msg">
                    Error: {{ error.msg }}
                  </div>
                </div>
                <div>
                  <button type="button" class="btn btn-block btn-primary" @click="sendReset">Send</button>
                </div>
                <div class="new-pass-links my-2">
                  <router-link class="forgot" to="/login">Login to your account</router-link>
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
  data: function() {
    return {
      email: null,
      showCompleteDialog: false,
      errors: null,
    }
  },
  methods: {
    sendReset: function() {
      axios({
        method: 'get',
        url: `/api/resetpasswordrequest?email=${this.email}`
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
  .new-pass-page {
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

  .new-pass-field span {
    background: none !important;
  }

  .new-pass-field input {
    height: 50px;
  }

  .new-pass-text {
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .new-pass-image img {
    height: 100%;
    width: 100%;
  }

  .new-pass-links {
    display: flex;
    justify-content: space-between;
  }

  .new-pass-forgot {
    color: #B0B3B5;
  }

</style>