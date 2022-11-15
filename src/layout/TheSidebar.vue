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
          <router-link to="/timetables" class="sidebar-link">
            <i class="align-middle" data-feather="sliders"></i>
            <span class="align-middle" v-on:click="closeBar()">Profile</span>
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
      if (this.user.role === 'student') {
        return true;
      } else {
        return false;
      }
    },
    lecturer() {
      if (this.user.role === 'lecturer') {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    closeBar() {
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
