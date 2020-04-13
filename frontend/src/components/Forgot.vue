<template>
  <div class="new-pass-page">
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
                  <input type="text" class="form-control" placeholder="Email">
                                  
                </div>
                <div>
                  <button type="button" class="btn btn-block btn-primary">Send</button>
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
export default {
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