<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div class="container-fluid">
            <router-link to="/" class="navbar-brand" href="#">Guildify</router-link>
        <div>
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item">
                    <router-link to="/" class="nav-link" href="#">Login</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/register" class="nav-link" href="#">Register</router-link>
                </li>
            </ul>
        </div>
        </div>
    </nav>
    <main class="form-signin w-100 m-auto">
        <form>
            <h1 class="h3 mb-3 fw-normal">Registration</h1>
                <div class="form-floating">
                <input type="text" class="form-control" id="usernameinput" v-model= "username" placeholder="username">
                <label for="floatingInput">Username</label>
                </div>
                <div class="form-floating">
                <input type="password" class="form-control" id="passwordinput" v-model= "password" placeholder="password">
                <label for="floatingPassword">Password</label>
                </div>
                <div class="form-floating">
                <input type="email" class="form-control" id="emailinput" v-model= "email" placeholder="email">
                <label for="floatingEmail">E-mail</label>
                </div>
                <div class="form-floating">
                <input type="text" class="form-control" id="displaynameinput" v-model= "displayName" placeholder="displayname">
                <label for="floatingDisplayName">Displayname</label>
                </div>
            <button class="btn btn-primary w-100 py-2" type="submit" @click.prevent="handleRegister">Register</button>
            <p class="mt-5 mb-3 text-body-secondary">&copy; Guildify 2023</p>
        </form>
    </main>
</template>

<script>
    import axios from 'axios'
    export default {
        name : 'Register',
        data(){
            return {
                username: '',
                password: '',
                displayName: '',
                email: '',
            }
        },
        methods: {
            async handleRegister(){
                try{
                const response = await axios.post('http://localhost:8081/auth/register',{
                username: this.username,
                password: this.password,
                displayName: this.displayName,
                email: this.email
                });
                if(response.data){
                alert("User created for: " + response.data.displayName);
                }
            } catch (error){
                alert(error.response.data.exceptionMessage);
            }
            }
        }
    }
</script>

<style>
html,
body {
  height: 100%;
}

.form-signin {
  max-width: 330px;
  padding: 1rem;
}

.form-signin .form-floating:focus-within {
  z-index: 5000;
}
.form-signin input[type="text"] {
  margin-bottom: 10px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="email"] {
  margin-bottom: 10px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>