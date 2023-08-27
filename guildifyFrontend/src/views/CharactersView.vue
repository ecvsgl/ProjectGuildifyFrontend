<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div class="container-fluid">
            <router-link to="/main" class="navbar-brand" href="#">Guildify</router-link>
        <div>
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item">
                    <router-link to="/main" class="nav-link" href="#">Home</router-link>
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
      <h2 class="text-center">My Characters</h2>
      <br>
      <div class="row justify-content-center">
        <div class="col-md-4 mb-4" v-for="char in chars" :key="char.charId">
          <router-link :to="{ name: 'CharacterDetail', params: { id: char.charId } }" class="text-decoration-none">
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
          </router-link>
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
  name: 'CharactersView',
  data(){
    return{
      chars: []  
    }
  },
  methods: {
    async handleLogout(){
      try{
        localStorage.setItem('jwt', '');
        this.$router.push('/');
      } catch (error){
        console.error("Error signing out: ", error.response ? error.response.data : error.message);
      }
    },
    async getMyChars(){
      try{
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
          this.error = 'No JWT found!';
          return;
        }
        const response = await axios.get('http://localhost:8081/user/gamechars', {
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        });
        this.chars = response.data;
      } catch (error){
        alert(error.response.data.exceptionMessage);
      }
    }
  },
  async mounted() {
    if(localStorage.getItem("jwt") == null || localStorage.getItem("jwt") == '' ){
      alert("Please sign in.");
      this.$router.push('/');
    } else {
      await this.getMyChars();
    }
  }
}
</script>


<style>
</style>