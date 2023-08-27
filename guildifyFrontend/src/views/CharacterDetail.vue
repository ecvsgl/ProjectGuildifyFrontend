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
  <h2 class="text-center">My Character</h2>
  <div class="container mt-5">
    <div class="row justify-content-center">
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
  <br>
  <div class="text-center">
    <!-- Dropdown -->
    <div class="dropdown mb-3">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown"
        aria-expanded="false">
        {{ selectedOption || 'Select Guild' }}
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li v-for="guild in dropdownOptions" :key="guild.guildId">
          <a class="dropdown-item" @click="selectedOption = guild.guildName">{{ guild.guildName }}</a>
        </li>
      </ul>
    </div>

    <!-- Submit Button -->
    <button class="btn btn-primary" @click="joinGuild">Join Guild</button>

  </div>
</template>
  
<script>
import axios from 'axios';
export default {
  name: 'CharacterDetail',
  data() {
    return {
      charId: null,
      char: [],
      dropdownOptions: [],
      selectedOption: null
    };
  },
  methods: {
    async getDropdownData() {
      const jwt = localStorage.getItem('jwt');
      try {
        const response = await axios.get(`http://localhost:8081/user/guilds`, {
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        });
        this.dropdownOptions = response.data;
      } catch (error) {
        alert(error.response.data.exceptionMessage);
      }
    },
    async joinGuild() {
      const jwt = localStorage.getItem('jwt');
      try {
        const response = await axios.put(`http://localhost:8081/user/gamechars/addguild/`, {
          charId: this.charId,
          guildName: this.selectedOption
        }, {
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        });
        location.reload();
      } catch (error) {
        alert(error.response.data.exceptionMessage);
      }
    },
    async getMyChar(charId) {
      try {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
          this.error = 'No JWT found!';
          return;
        }
        const response = await axios.get(`http://localhost:8081/user/gamechars/${charId}`, {
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        });
        this.char = response.data;
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
      this.charId = this.$route.params.id;
      await this.getMyChar(this.charId);
      await this.getDropdownData();
    }
  }
}
</script>