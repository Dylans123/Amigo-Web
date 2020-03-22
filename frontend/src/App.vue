<template>
  <div id="app">
    <div>{{ info }}</div>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue App" :info="info" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'

const api = axios.create({
    baseURL: '',
})

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      info: ''
    }
  },
  mounted () {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => this.info = json)
    // api.get('/verify')
    //   .then(response => (this.info = response))
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
