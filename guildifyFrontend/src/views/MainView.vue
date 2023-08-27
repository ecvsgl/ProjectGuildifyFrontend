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
    <h1 class="text-center">Welcome to Guildify!</h1>
  </div>

  <div class="container-fluid">
    <div class="row">
      <!-- Left side (Posts): 8 out of 12 columns -->
      <div class="col-md-8">
        <div class="card mt-4">
          <div class="card-body">
            <h3 class="card-title text-center">Join to the Fireside!</h3>

            <!-- New Post Input Box -->
            <div class="mb-4">
              <form @submit.prevent="addNewPost">
                <div class="form-group">
                  <textarea class="form-control" v-model="newPostContent" placeholder="Write your post..."
                    rows="3"></textarea>
                </div>
                <div class="form-group mt-2">
                  <button class="btn btn-primary" type="submit">Post</button>
                </div>
              </form>
            </div>

            <ul class="list-unstyled">
              <li v-for="post in posts" :key="post.postId">
                <!-- Post Card -->
                <div class="card mb-4">
                  <div class="card-body">
                    <h5 class="card-title">{{ post.postOwnerDisplayName }}</h5>
                    <p>{{ post.postContent }}</p>
                    <!-- Add Comment Input Box -->
                    <div class="mb-4">
                      <form @submit.prevent="addNewComment(post.postId)">
                        <div class="form-group">
                          <textarea class="form-control" v-model="commentMap[post.postId]" placeholder="Write your comment..."
                            rows="1"></textarea>
                        </div>
                        <div class="form-group mt-2">
                          <button class="btn btn-secondary" type="submit">Add Comment</button>
                        </div>
                      </form>
                    </div>
                    <!-- Comment Cards with Indentation -->
                    <div class="pl-4" v-if="post.postCommentsList && post.postCommentsList.length > 0">
                      <ul class="list-unstyled">
                        <div>Comments</div>
                        <li v-for="comment in post.postCommentsList" :key="comment.commentId">
                          <div class="card mt-2">
                            <div class="card-body">
                              <h5 class="card-title">{{ comment.senderDisplayName }}</h5>
                              <p>{{ comment.commentContent }}</p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            </ul>

          </div>
        </div>
      </div>
      <!-- Right side (Events and Guilds): 4 out of 12 columns -->
      <div class="col-md-4">
        <!-- Events -->
        <div class="card mt-4 mb-4">
          <div class="card-body">
            <h5 class="card-title">Upcoming Events!</h5>
            <ul class="list-styled">
              <li v-for="event in events" :key="event.eventId">
                {{ event.eventName }} - {{ formatDate(event.eventTime) }}
              </li>
            </ul>
          </div>
        </div>
        <!-- Guilds -->
        <div class="card mt-4">
          <div class="card-body">
            <h5 class="card-title">Guilds</h5>
            <ul class="list-styled">
              <li v-for="guild in guilds" :key="guild.guildId">
                {{ guild.guildName }}
              </li>
            </ul>
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
      events: [],
      guilds: [],
      posts: [],
      newPostContent: '',
      commentMap: {}
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
      try {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
          this.error = "No jwt";
          return;
        }
        const response = await axios.get('http://localhost:8081/user/events', {
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        });
        this.events = response.data;
      } catch (error) {
        alert(error.response.data.exceptionMessage);
      }
    },
    async getGuilds() {
      try {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
          this.error = "No jwt";
          return;
        }
        const response = await axios.get('http://localhost:8081/user/guilds', {
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        });
        this.guilds = response.data;
      } catch (error) {
        alert(error.response.data.exceptionMessage);
      }
    },
    async getPosts() {
      try {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
          this.error = "No jwt";
          return;
        }
        const response = await axios.get('http://localhost:8081/user/allposts', {
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        });
        this.posts = response.data;
      } catch (error) {
        alert(error.response.data.exceptionMessage);
      }
    },
    async addNewPost() {
      try {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
          this.error = "No jwt";
          return;
        }
        const response = await axios.post('http://localhost:8081/user/newpost',
        JSON.stringify({ 
          postContent: this.newPostContent 
        }),
        { 
          headers: { 
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
          } 
        }
      );
        location.reload();
      } catch (error) {
        alert(error.response.data.exceptionMessage);      
      }
    },
    async addNewComment(postId){
      try {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
          this.error = "No jwt";
          return;
        }
        const response = await axios.post('http://localhost:8081/user/newcomment',
        JSON.stringify({ 
          commentContent: this.commentMap[postId],
          postId: postId
        }),
        { 
          headers: { 
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
          } 
        }
      );
        location.reload();
      } catch (error) {
        alert(error.response.data.exceptionMessage);      
      }
    },
    formatDate(dateString) {
      const eventTime = new Date(dateString);
      return `${eventTime.getDate().toString().padStart(2, '0')}/${(eventTime.getMonth() + 1).toString().padStart(2, '0')}/${eventTime.getFullYear()}`;
    }
  },
  async mounted() {
    if (localStorage.getItem("jwt") == null || localStorage.getItem("jwt") == '') {
      alert("Please sign in.");
      this.$router.push('/');
    } else {
      await this.getEvents(); // Fetch events when authenticated
      await this.getGuilds();
      await this.getPosts();
    }
  }
}
</script>
<style></style>
