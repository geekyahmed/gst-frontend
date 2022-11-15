<template>
  <main class="content" data-view>
    <section class="section-padding-sm-2 blue-bg">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12 col-lg-12 col-md-12 col-xl-12 mb-20">
            <base-card>
              <template #image>
                <img :src="user.photo" alt="" class="img-fluid fl-right">
              </template>

              <template #title>
                <h1 class="capitalize text-center bold">Welcome to your gst Dashboard</h1>
              </template>

              <template #content>
                <h3 class="capitalize text-center">
                  Hi,
                  <strong :key="user.name">{{ user.name }}</strong>
                </h3>
              </template>

              <template #footer>
                <router-link to="/settings" class="btn-info mt-3 text-center">Profile</router-link>
              </template>
            </base-card>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import GlobalMixin from '../../mixins/global.mixin'
import BaseCard from "../../components/ui/BaseCard";
import BaseScrollableCard from "../../components/ui/BaseScrollableCard";
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  mixins: [GlobalMixin],
  components: {
    BaseCard,
    BaseScrollableCard,
  },
  computed: {
    ...mapGetters({
      user: 'user/user'
    })
  },
  mounted() {
    this.$store.dispatch('user/GET_USER')
  }
};
</script>