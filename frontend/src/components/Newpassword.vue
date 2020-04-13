<template>
  <div class="reset-page">
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
                  <input type="text" class="form-control" placeholder="New Password" aria-label="Username" aria-describedby="basic-addon1">
                </div>
                <div class="input-group mb-3 reset-field">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon2">
                      <md-icon>lock</md-icon>
                    </span>
                  </div>
                  <input type="password" class="form-control" placeholder="Confirm New Password" aria-label="Username" aria-describedby="basic-addon2">
                </div>
                <div>
                  <button type="button" class="btn btn-block btn-primary">Reset</button>
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
export default {
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