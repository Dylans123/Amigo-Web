<template>
  <div class="verify-page">
    <md-dialog :md-active.sync="showCompleteDialog"  v-if="email !== null" style="background: white">
      <md-dialog-title>The verification email has been resent to {{ this.email}}.</md-dialog-title>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showCompleteDialog=false">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-12 col-md-6">
          <h1 class="mb-2">
            Email <span class="admin-text">Verification</span>
          </h1>
          <h5 class="mb-4 description-text"></h5>
          <md-card class="md-elevation-15">
            <div class="row">
              <div class="col-12 login-text">
                <template v-if="this.verifyRes || this.verifyErr">
                  <template v-if="this.verifyRes">
                    <p>You have succesfully verified your account! You can now return to the app and login!</p>
                  </template>
                  <template v-if="this.verifyErr">
                    <p>There was an error with your email verification. In order to send a new verification link please press the button below.</p>
                    <div class="input-group mb-3 login-field">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">
                        <md-icon>account_circle</md-icon>
                        </span>
                      </div>
                      <input type="text" class="form-control" placeholder="Email" v-model="email" aria-label="Email" aria-describedby="basic-addon1">
                    </div>
                    <button type="button" class="btn btn-block btn-primary" v-on:click="resend">Resend Verification</button>
                    <div style="color: red;" class="py-2" v-if="errors !== null">
                      <h6>Errors:</h6>
                      <div v-for="error in errors" v-bind:key="error.msg">
                        Error: {{ error.msg }}
                      </div>
                    </div>
                  </template>
                </template>
                <template v-else>
                    Loading
                </template>
              </div>
            </div>
          </md-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../api";
import axios from "axios";
export default {
  created () {
    const url = window.location.href;
    const vals = url.split("?token=");
    const token = vals[1];
    console.log(token);
    this.verify(token);
  },
  data: function() {
    return {
      verifyRes: null,
      verifyErr: null,
      email: null,
      errors: null,
      showCompleteDialog: false,
    }
  },
  methods: {
    verify: function (jwt) {
      api.verify(jwt).then((res) => {
        console.log("Here");
        console.log(res);
        console.log('response');
        this.verifyRes = res.data;
      })
      .catch((err) => {
        console.log('there was an error ' + err);
        this.verifyErr = err;
      });
    },
    resend: function () {
      axios({
        method: 'get',
        url: `/api/sendverification?email=${this.email}`
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
  .verify-page {
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
    padding: 50px;
    vertical-align: top;
    background-color: white !important;
    border-radius:8px;
  }

  .md-icon {
    color: #CED4DA;
  }

  .login-field span {
    background: none !important;
  }
</style>