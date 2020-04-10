<template>
  <div class="container">
    <div class="row justify-content-center align-items-center" style="height: 90vh;">
      <div class="col-3">
        <md-card class="md-elevation-15" style="height: 25vh; background-color: white">
          <div class="metric-card">
            <h5>Number of Users</h5>
            <h1>{{ numberUsers }}</h1>
          </div>
        </md-card>
      </div>
      <div class="col-3">
        <md-card class="md-elevation-15" style="height: 25vh; background-color: white">
          <div class="metric-card">
            <h5>Number of Channels</h5>
            <h1>{{ numberChannels }}</h1>
          </div>
        </md-card>
      </div>
      <div class="col-3">
        <md-card class="md-elevation-15" style="height: 25vh; background-color: white">
          <div class="metric-card">
            <h5>Total Direct Messages</h5>
            <h1>{{ numberDirect }}</h1>
          </div>
        </md-card>
      </div>
      <div class="col-3">
        <md-card class="md-elevation-15" style="height: 25vh; background-color: white; text-align: center">
          <div class="metric-card">
            <h5>Number of Channel Messages</h5>
            <h1>{{ numberMessages }}</h1>
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
import axios from 'axios';
export default {
  created () {
    this.getMetrics();
    this.getMessages();
  },
  components: {
    MessagesChart
  },
  props: {
    jwt: String
  },
  data: function() {
    return {
        responsive: true,
        numberUsers: null,
        numberChannels: null,
        numberDirect: null,
        numberMessages: null,
        data: null,
        labels: null
    }
  },
  methods: {
    getMetrics: function() {
      axios({
        method: 'get',
        url: '/api/admin/dashboard/metrics',
        headers: {'x-access-token': this.jwt}
      }).then((res) => {  
        console.log(res.data);
        this.numberUsers = res.data.metrics['user_count'];
        this.numberChannels = res.data.metrics['channel_count'];
        this.numberDirect = res.data.metrics['direct_message_count'];
        this.numberMessages = res.data.metrics['channel_message_count'];
      }).catch((err) => {
        console.log(err);
      })
    },
    getMessages: function() {
      axios({
        method: 'get',
        url: '/api/admin/dashboard/messages',
        headers: {'x-access-token': this.jwt}
      }).then((res) => {  
        console.log(res.data);
        const obj = {};
        res.data.messages.forEach((message) => {
          const month = new Date(message['created_on']).getMonth();
          const day = new Date(message['created_on']).getDate();
          const year = new Date(message['created_on']).getFullYear();
          const date = (month + 1) + "/" + day + "/" + year
          if (obj[date]) {
            obj[date] = obj[date] + 1;
          } else {
            obj[date] = 1;
          }
        })
        console.log(obj)
        this.labels = Object.keys(obj);
        this.data = Object.values(obj);
        // this.numberUsers = res.data.metrics['user_count'];
        // this.numberChannels = res.data.metrics['channel_count'];
        // this.numberDirect = res.data.metrics['direct_message_count'];
        // this.numberMessages = res.data.metrics['channel_message_count'];
        // this.curChannel = res.data.channels[0];
      }).catch((err) => {
        console.log(err);
      })
    }
  }
}
</script>
<style scoped>
.metric-card {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center
}
</style>