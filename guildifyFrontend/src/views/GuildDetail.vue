<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div class="container-fluid">
        <router-link to="/main" class="navbar-brand" href="#">Guildify</router-link>
        <div>
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <router-link to="/main" class="nav-link" href="#">My Characters</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/register" class="nav-link" @click.native="handleLogout" href="#">Logout</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container mt-5">
    <div v-if="chars.length > 0">
      <h2 class="text-center">Guild Members</h2>
      <br>
      <div class="row justify-content-center">
        <div class="col-md-4 mb-4" v-for="char in chars" :key="char.charId">
            <div class="card text-center">
              <div class="card-body">
                <h3 class="card-title">{{ char.charName }}</h3>
                <ul class="list-unstyled">
                  <li>Level: {{ char.charLevel }}</li>
                  <li>Game: {{ char.charGameName }}</li>
                  <li>Guild: <span v-if="char.charGuildName">{{ char.charGuildName }}</span><span v-else>-</span></li>
                </ul>
              </div>
            </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h2 class="text-center">No characters found.</h2>
    </div>
  </div>
</template>
    
<script>
  import axios from 'axios';
  export default {
    name: 'GuildDetail',
    data() {
      return {
        guildId: null,
        chars: [],
      };
    },
    methods: {
      async getGuildChars() {
        const jwt = localStorage.getItem('jwt');
        try {
          const response = await axios.get(`http://localhost:8081/user/guilds/sameguild/${this.guildId}`, {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
          });
          this.chars = response.data;
        } catch (error) {
          alert(error.response.data.exceptionMessage);
        }
      }
    },
    async mounted() {
      if (localStorage.getItem("jwt") == null || localStorage.getItem("jwt") == '') {
        alert("Please sign in.");
        this.$router.push('/');
      } else {
        this.guildId = this.$route.params.id;
        await this.getGuildChars();
      }
    }
  }
  </script>