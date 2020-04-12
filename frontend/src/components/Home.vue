<template>
  <div style="height: 100vh; width: 100vw; background-color: #F65D62; color: white;">
      <div class="container h-100 d-flex justify-content-center align-items-center">
        <div class="row h-100 w-100 d-flex justify-content-center align-items-center">
          <div class="col-6">
            <div class="md-display-4 mb-4" style="font-weight: bold">Amigo</div>
            <br />
            <div class="md-display-1 mb-5">
              Discover new places, find new friends, and meet new people all in your local area! Find new ways to connect with those around you!
              Amigo is going to be your one stop shop for meeting people with similar interests and building meaningful connections!
            </div>
            <img src="../assets/App-Store.png" />
          </div>
          <div class="col-6 d-flex justify-content-end align-items-center">
            <img class="mobile-img" src="../assets/Android-Screenshot.png" />
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
  .title-text {
    font-size: 100px;
    font-weight: bold;
  }
  .summary-text {
    font-size: 50px;
  }
  .mobile-img {
    border-radius: 40px;
    height: 650px;
    width: 325px;
    box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
    background: black;
    transform: translatey(0px);
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
  0% {
    box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
    transform: translatey(0px);
  }
  50% {
    box-shadow: 0 45px 15px 0px rgba(0,0,0,0.2);
    transform: translatey(-20px);
  }
  100% {
    box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
    transform: translatey(0px);
  }
}
</style>