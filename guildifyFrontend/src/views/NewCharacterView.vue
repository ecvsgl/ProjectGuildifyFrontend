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
                        <router-link to="/register" class="nav-link" @click.native="handleLogout"
                            href="#">Logout</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <h2 class="text-center">Add New Character</h2>

    <main class="form-signin w-100 m-auto">
        <form>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="charName" v-model="charName" placeholder="Character Name">
                <label for="charName">Character Name</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="charLevel" v-model="charLevel" placeholder="Character Level">
                <label for="charLevel">Character Level</label>
            </div>
            <div class="form-floating mb-3">
                <select class="form-control" id="gameName" v-model="gameName">
                    <option disabled value="">Please select one</option>
                    <option v-for="game in allGames" :key="game.gameId" :value="game.gameName">{{ game.gameName }}</option>
                </select>

                <label for="gameName">Select Game</label>
            </div>
            <button class="btn btn-primary w-100 py-2" @click.prevent="addNewCharacter" type="submit">Add Character</button>
            <p class="mt-5 mb-3 text-body-secondary">&copy; Guildify 2023</p>
        </form>
    </main>
</template>
    
<script>
import axios from 'axios';
export default {
    name: 'NewCharacterView',
    data() {
        return {
            charName: null,
            charLevel: null,
            userDisplayName: null,
            gameName: null,
            allGames: [],
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
        async addNewCharacter() {
            const jwt = localStorage.getItem('jwt');
            console.log(this.charName);
            console.log(this.charLevel);
            console.log(this.userDisplayName);
            console.log(this.gameName);
            try {
                const response = await axios.post(`http://localhost:8081/user/gamechars`, JSON.stringify({
                    charName: this.charName,
                    charLevel: this.charLevel,
                    userDisplayName: this.userDisplayName,
                    gameName: this.gameName
                }),
                    {
                        headers: {
                            'Authorization': `Bearer ${jwt}`,
                            'Content-Type': 'application/json'
                        }
                    });
                location.reload();
            } catch (error) {
                alert(error);
            }
        },
        async getGames() {
            const jwt = localStorage.getItem('jwt');
            try {
                const response = await axios.get(`http://localhost:8081/user/games`, {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                });
                this.allGames = response.data;
                if (this.allGames.length > 0) {
                    this.userDisplayName = this.allGames[0].createdBy;
                } else {
                    console.warn('allGames array is empty.');
                }
            } catch (error) {
                console.error("Error in getGames: ", error.response ? error.response.data : error.message);
            }
        }
    },
    async mounted() {
        if (localStorage.getItem("jwt") == null || localStorage.getItem("jwt") == '') {
            alert("Please sign in.");
            this.$router.push('/');
        } else {
            await this.getGames();

        }
    }
}
</script>