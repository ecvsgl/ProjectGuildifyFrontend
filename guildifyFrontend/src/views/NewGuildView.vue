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
                        <router-link to="/register" class="nav-link" @click.native="handleLogout"
                            href="#">Logout</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <h2 class="text-center">Create New Guild</h2>

    <main class="form-signin w-100 m-auto">
        <form>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="guildName" v-model="guildName" placeholder="Guild Name">
                <label for="guildName">Guild Name</label>
            </div>
            <div class="form-floating mb-3">
                <select class="form-control" id="gameName" v-model="gameName">
                    <option disabled value="">Please select one</option>
                    <option v-for="game in allGames" :key="game.gameId" :value="game.gameName">{{ game.gameName }}</option>
                </select>
                <label for="gameName">Select Game</label>
            </div>
            <button class="btn btn-primary w-100 py-2" @click.prevent="addNewGuild" type="submit">Create Guild</button>
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
            guildName: null,
            guildLeaderUserDisplayName: null,
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
        async addNewGuild() {
            const jwt = localStorage.getItem('jwt');
            try {
                const response = await axios.post(`http://localhost:8081/user/newguild`, JSON.stringify({
                    guildName: this.guildName,
                    guildLeaderUserDisplayName: this.guildLeaderUserDisplayName,
                    gameName: this.gameName
                }),
                    {
                        headers: {
                            'Authorization': `Bearer ${jwt}`,
                            'Content-Type': 'application/json'
                        }
                    });
                alert("Guild successfully created.");
                this.$router.push('/main');
            } catch (error) {
                alert(error.response.data.exceptionMessage);
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
                    this.guildLeaderUserDisplayName = this.allGames[0].createdBy;
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