<template>
  <nav id="sidebar" class="sidebar" v-if="loggedIn">
    <div class="sidebar-content js-simplebar">
      <router-link class="sidebar-brand" to="/">
        <span class="align-middle">GST Dashboard</span>
      </router-link>
      <ul class="sidebar-nav">
        <li class="sidebar-header">
          Pages
        </li>

        <li class="sidebar-item">
          <router-link to="/" class="sidebar-link">
            <i class="align-middle" data-feather="sliders"></i>
            <span class="align-middle" v-on:click="closeBar()">Dashboard</span>
          </router-link>
        </li>

        <li class="sidebar-item">
          <router-link to="/users" class="sidebar-link" v-if="admin">
            <i class="align-middle" data-feather="sliders"></i>
            <span class="align-middle" v-on:click="closeBar()">Users</span>
          </router-link>
        </li>

        <li class="sidebar-item">
          <router-link to="/timetables" class="sidebar-link">
            <i class="align-middle" data-feather="sliders"></i>
            <span class="align-middle" v-on:click="closeBar()">Timetable</span>
          </router-link>
        </li>

        <li>
          <router-link to="/results" class="sidebar-link" v-if="!lecturer">
            <i class="align-middle" data-feather="sliders"></i>
            <span class="align-middle" v-on:click="closeBar()">Results</span>
          </router-link>
        </li>

        <!-- 
                <li class="sidebar-item">
                    <a href="#posts" data-toggle="collapse" class="sidebar-link collapsed">
                        <i class="align-middle" data-feather="book-open"></i> <span class="align-middle">Posts</span>
                    </a>
                    <ul id="posts" class="sidebar-dropdown list-unstyled collapse " data-parent="#sidebar">
                        <li class="sidebar-item">
                            <router-link to="/posts" class="sidebar-link" v-on:click="closeBar()">
                                All Posts
                            </router-link>
                        </li>
                        <li class="sidebar-item" v-on:click="closeBar()">
                            <router-link to="/posts/create" class="sidebar-link">
                                Create Post
                            </router-link>
                        </li>
                    </ul>
                </li> -->

        <div v-if="admin">
          <!-- <li class="sidebar-item">
                        <a href="#users" data-toggle="collapse" class="sidebar-link collapsed">
                            <i class="align-middle" data-feather="users"></i> <span class="align-middle">Users</span>
                        </a>
                        <ul id="users" class="sidebar-dropdown list-unstyled collapse " data-parent="#sidebar">
                            <li class="sidebar-item">
                                <router-link to="/users" class="sidebar-link" v-on:click="closeBar()">
                                    All Users
                                </router-link>
                            </li>
                            <li class="sidebar-item" v-on:click="closeBar()">
                                <router-link to="/create-user" class="sidebar-link">
                                    Register User
                                </router-link>
                            </li>
                        </ul>
                    </li> -->

          <!-- <li class="sidebar-item">
                        <a href="#categories" data-toggle="collapse" class="sidebar-link collapsed">
                            <i class="align-middle" data-feather="layers"></i> <span class="align-middle">Categories</span>
                        </a>
                        <ul id="categories" class="sidebar-dropdown list-unstyled collapse " data-parent="#sidebar">
                            <li class="sidebar-item">
                                <router-link to="/categories" class="sidebar-link" v-on:click="closeBar()">
                                    All Categories
                                </router-link>
                            </li>
                            <li class="sidebar-item" v-on:click="closeBar()">
                                <router-link to="/categories/create" class="sidebar-link">
                                    Create Category
                                </router-link>
                            </li>
                        </ul>
                    </li> -->
        </div>

        <li class="sidebar-item">
          <a href="#" class="sidebar-link" v-on:click="logOut()">
            <i class="align-middle" data-feather="log-out"></i>
            <span class="align-middle">Log Out</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import GlobalMixin from '../mixins/global.mixin';
import { mapGetters } from 'vuex';

export default {
  name: 'Sidebar',
  mixins: [GlobalMixin],
  computed: {
    ...mapGetters({
      user: 'user/user',
      loggedIn: 'auth/loggedIn'
    }),
    student() {
      if (this.currentUser.role === 'student') {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    console.log(this.loggedIn);
  },
  methods: {
    closeBar() {
      console.log(this.currentUser.role)
      let element = document.getElementById('sidebar');
      element.classList.remove('collapsed');
    },
    logOut() {
      this.$store.dispatch('auth/LOGOUT');
      this.$noty.error('Logout Successful');
      this.$router.push('/login');
    }
  }
};
</script>
