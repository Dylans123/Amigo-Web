<template>
  <div class="container">
    <div class="row justify-content-center align-items-center" style="height: 90vh;">
      <div class="col-3">
        <md-card class="md-elevation-15" style="height: 25vh; background-color: white">
          <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column">
            <h5>Number of Users</h5>
            <h1>101</h1>
          </div>
        </md-card>
      </div>
      <div class="col-3">
        <md-card class="md-elevation-15" style="height: 25vh; background-color: white">
          <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column">
            <h5>Number of Channels</h5>
            <h1>101</h1>
          </div>
        </md-card>
      </div>
      <div class="col-3">
        <md-card class="md-elevation-15" style="height: 25vh; background-color: white">
          <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column">
            <h5>Total Direct Messages</h5>
            <h1>101</h1>
          </div>
        </md-card>
      </div>
      <div class="col-3">
        <md-card class="md-elevation-15" style="height: 25vh; background-color: white; text-align: center">
          <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column">
            <h5>Number of Channel Messages</h5>
            <h1>101</h1>
          </div>
        </md-card>
      </div>
      <div class="col-12">
        <md-card class="md-elevation-15" style="height: 50vh; background-color: white">
          <md-card-header>
            <md-card-header-text>
              <div><h6>Messages Sent Over Time</h6></div>
            </md-card-header-text>
          </md-card-header>
          <div style="height: 100%; width: 100%">
            <MessagesChart :options="{ responsive: true }" />
          </div>
        </md-card>
      </div>
    </div>
  </div>
</template>
<script>
import MessagesChart from './MessagesChart';
export default {
  components: {
    MessagesChart
  },
  data: function() {
    return {
      data: {
        responsive: true,
      }
    }
  }
}
</script>
<style scoped>

</style>