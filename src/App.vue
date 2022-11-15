<template>
  <div id="app" class="wrapper mtb-7">
    <Sidebar />
    <div class="main">
      <Topbar />
      <router-view :key="$route.fullPath" />
      <CookieLaw theme="dark-lime" />
      <Footer />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */

import axios from 'axios';
import Sidebar from './layout/TheSidebar.vue';
import Topbar from './layout/TheTopbar.vue';
import Footer from './layout/TheFooter.vue';
import CookieLaw from 'vue-cookie-law';

export default {
  name: 'App',
  components: {
    Sidebar,
    Topbar,
    CookieLaw,
    Footer
  },
  mounted() {
    let vm = this;

    axios.interceptors.request.use(config => {
      return config;
    });
  },
  metaInfo: {
    title: 'Tribinnov Africa - Dashboard'
  }
};
</script>
