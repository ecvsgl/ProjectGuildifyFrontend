<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand" href="#">Guildify</router-link>
      <div>
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
                  <router-link to="/chars" class="nav-link" href="#">My Characters</router-link>
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

  <div class="container">
    <div class="row">
      <div class="col-6 custom-border">
        <!-- Your content here -->
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi totam quae animi adipisci quidem voluptatibus?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam maxime esse, atque eum quos ullam!</p>
      </div>
    </div>
  </div>

</template>


<script>
import axios from 'axios';
export default {
  methods:{
    async handleLogout(){
      try{
        localStorage.setItem('jwt', '');
        this.$router.push('/');
      } catch (error){
        console.error("Error signing out: ", error.response ? error.response.data : error.message);
      }
      
    }
  },
  mounted(){
    if(localStorage.getItem("jwt")==null || localStorage.getItem("jwt")=='' ){
      alert("Please sign in.");
      this.$router.push('/');
    }

  }
}
</script>

<style>
.custom-border {
  border: 2px solid #000;
  padding: 5px;
}
</style>
