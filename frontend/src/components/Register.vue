<template>
  <div class="register-page">
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-12 col-md-6">
          <h1 class="mb-2">
            Welcome to <span class="admin-text">Amigo Admin</span>
          </h1>
          <h5 class="mb-4 description-text">Create an Admin Account to Get Started</h5>
          <md-card class="md-elevation-15">
            <div class="row">
              <div class="col-12 register-text">
                <div class="input-group mb-3 register-field">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">
                      <md-icon>account_circle</md-icon>
                    </span>
                  </div>
                  <input type="text" class="form-control" placeholder="Username or Email" aria-label="Username" aria-describedby="basic-addon1">
                </div>
                <div class="input-group mb-3 register-field">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon2">
                      <md-icon>lock</md-icon>
                    </span>
                  </div>
                  <input type="password" class="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon2">
                </div>
                <div>
                  <button type="button" class="btn btn-block btn-primary">register</button>
                </div>
                <div class="register-links my-2">
                  <router-link class="register-login" to="/login">Login to your account</router-link>
                  <router-link class="register-forgot" to="/forgot">Forgot Password</router-link>
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
export default {
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
    padding: 0 50px;
    vertical-align: top;
    background-color: white !important;
  }

  .md-icon {
    color: #CED4DA;
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