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
  <h1>chars</h1>
</template>
  
<script>
import axios from 'axios';
export default {
  name: 'CharacterDetail',
  data() {
    return {
      charId: null,
      char: []
    };
  },
  methods: {
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
    }
  }
}
</script>