<template>
  <div class="register-page">
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
                                    <p>You have succesfully verified your account! You can now return to the app and login.</p>
                                </template>
                                <template v-if="this.verifyErr">
                                    <p>There was an error with your email verification. In order to send a new verification link please press the button below.</p>
                                    <div class="input-group mb-3 login-field">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">
                                            <md-icon>account_circle</md-icon>
                                            </span>
                                        </div>
                                        <input type="text" class="form-control" placeholder="Username or Email" v-model="username" aria-label="Username" aria-describedby="basic-addon1">
                                    </div>
                                    <button type="button" class="btn btn-block btn-primary" v-on:click="resend">Resend Verification</button>
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
export default {
    created () {
        const url = window.location.href;
        const vals = url.split("?");
        const token = vals[1];
        console.log(token);
        this.verify(token);
    },
    data: function() {
        return {
            verifyRes: null,
            verifyErr: null,
        }
    },
    methods: {
        verify: function (jwt) {
            console.log('hello this is an event handler');
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
        }
    }
}
</script>

<style scoped>
  .register-page {
    height: 100vh;
    background-color: #F7F7F7;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .admin-text {
    color: #F65D62;
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

  .register-field span {
    background: none !important;
  }

  .register-field input {
    height: 50px;
  }

  .register-text {
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .register-image img {
    height: 100%;
    width: 100%;
  }

  .register-links {
    display: flex;
    justify-content: space-between;
  }

  .register-forgot {
    color: #B0B3B5;
  }

</style>