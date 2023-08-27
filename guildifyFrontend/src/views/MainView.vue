<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <router-link to="/main" class="navbar-brand" href="#">Guildify</router-link>
      <div>
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
                  <router-link to="/characters" class="nav-link" href="#">My Characters</router-link>
              </li>
              <li class="nav-item">
                  <router-link to="/register" class="nav-link" @click.native="handleLogout" href="#">Logout</router-link>
              </li>
          </ul>
      </div>
    </div>
  </nav>
  
  <div>
    <h1>Welcome to Guildify!</h1>
  </div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-5">
        <div class="card mt-4">
          <div class="card-body">
            <h5 class="card-title">POSTS</h5>
            <p class="card-text">
              There will be a posts
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-7">
        <div class="row">
          <div class="col-md-6">
            <div class="card mt-4">
              <div class="card-body">
                <h5 class="card-title">Guilds</h5>
                <p class="card-text">
                  Guilds
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <!-- Content for the second right column -->
            <div class="card mt-4">
        <div class="card-body">
          <h5 class="card-title">Calendar</h5>
                <ul>
                  <li v-for="event in events" :key="event.eventId">
                   {{ event }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios';

export default {
  name: "MainView",
  data() {
    return {
      events: []
    };
  },
  methods: {
    async handleLogout() {
      try {
        localStorage.setItem('jwt', '');
        this.$router.push('/');
      } catch (error) {
        console.error("Error signing out: ", error.response ? error.response.data : error.message);
      }
    },
    async getEvents() {
      try{
        const jwt = localStorage.getItem('jwt');
        if(!jwt){
          this.error = "No jwt";
          return;
        }
      const response = await axios.get('http://localhost:8081/user/events',{
        headers: {
          'Authorization': "Bearer ${jwt}"
        }
      });
      this.events = response.data;
      }
      catch(error){
        alert(error.response.data.exceptionMessage);
      }
    },
    async mounted() {
    if (localStorage.getItem("jwt") == null || localStorage.getItem("jwt") == '') {
      alert("Please sign in.");
      this.$router.push('/');
    } else {
      await this.getEvents(); // Fetch events when authenticated
    }
  }
  }
};
</script>
<style>
</style>
