<template>
  <div class="login-page">
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-12 col-md-6">
          <h1 class="mb-2">
            Welcome to <span class="admin-text">Amigo Admin</span>
          </h1>
          <h5 class="mb-5 description-text">Login to Get Started</h5>
          <md-card class="md-elevation-15">
            <div class="row">
              <div class="col-12 login-text">
                <div class="input-group mb-3 login-field">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">
                      <md-icon>account_circle</md-icon>
                    </span>
                  </div>
                  <input type="text" class="form-control" placeholder="Username or Email" v-model="username" aria-label="Username" aria-describedby="basic-addon1">
                </div>
                <div class="input-group mb-3 login-field">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon2">
                      <md-icon>lock</md-icon>
                    </span>
                  </div>
                  <input type="password" class="form-control" placeholder="Password" v-model="password" aria-label="Username" aria-describedby="basic-addon2">
                </div>
                <div style="color: red; text-align: left" class="py-2" v-if="errors !== null">
                  <h6>Errors:</h6>
                  <div v-for="error in errors" v-bind:key="error.msg">
                    Error: {{ error.msg }}
                  </div>
                </div>
                <div>
                  <button type="button" class="btn btn-block btn-primary" v-on:click="login(username,password)">Login</button>
                </div>
                <div class="login-links my-2">
                  <router-link class="login-forgot" to="/forgot">Forgot Password</router-link>
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
import api from "../api";
export default {
  data: function() {
    return {
      errors: null,
      username: null,
      password: null
    }
  },
  methods: {
    login: function (username, password) {
      api.login(username, password)
        .then((res) => {
          console.log(res);
          this.errors = null;
          document.cookie = `jwt=${res.data["x-access-token"]}`;
          window.location.href = '/admin';
        })
        .catch((err) => {
          console.log(err);
          this.errors = err.response.data.errors;
        })
    }
  }
}
</script>

<style scoped>
  .login-page {
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

  .login-field input {
    height: 50px;
  }

  .login-text {
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .login-image img {
    height: 100%;
    width: 100%;
  }

  .login-links {
    display: flex;
    justify-content: flex-end;
  }

  .login-forgot {
    color: #B0B3B5;
  }

</style>