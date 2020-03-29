<template>
  <div class="login-page row">
    <div class="col-12 col-md-10">
      <md-card class="md-elevation-15">
        <div class="row">
          <div class="col-12 col-md-6 login-text">
            <h2 class="mb-4">
              Welcome!
            </h2>
            <div class="input-group mb-3 login-field">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  <md-icon>account_circle</md-icon>
                </span>
              </div>
              <input type="text" class="form-control" placeholder="Username or Email" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3 login-field">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon2">
                  <md-icon>lock</md-icon>
                </span>
              </div>
              <input type="password" class="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon2">
            </div>
            <div>
              <button type="button" class="btn btn-block btn-primary">Login</button>
            </div>
            <div class="login-links">
              <router-link class="login-register" to="/register">Register</router-link>
              <router-link class="login-forgot" to="/forgot">Forgot Password</router-link>
            </div>
          </div>
          <div class="d-none d-md-block col-6 login-image">
            <img src="../assets/Login.png" />
          </div>
        </div>
      </md-card>
    </div>
  </div>
</template>
<script>
export default {
}
</script>

<style scoped>
  .login-page {
    height: 100vh;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .md-card {
    width: 100%;
    padding: 100px 50px;
    vertical-align: top;
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
  }

  .login-image img {
    height: 100%;
    width: 100%;
  }
</style>