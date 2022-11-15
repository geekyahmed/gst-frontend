<template>
  <div class="container-fluid">

    <info-box v-if="requestError">
      <template #title>
        <h3>Too Many Requests</h3>
      </template>
      <template #content>
        <p>You have reached the request limit, please try again in 15 minutes. </p>
      </template>
    </info-box>

    <div class="main-form" data-view>
      <form method="post" name="form" @submit.prevent="handleLogin">
        <h4 class="text-center color-blue">Sign In To Your Account</h4>
        <div class="form-group">
          <input class="form-control" v-model="user.email" v-validate="'required'" type="email" name="email"
            placeholder="Your Email">

          <div v-if="errors.has('email')" class="alert-danger" role="alert">Email is required!</div>
        </div>
        <div class="form-group">
          <input class="form-control" v-model="user.password" v-validate="'required'" type="password" name="password"
            placeholder="Password">

          <div v-if="errors.has('password')" class="alert-danger" role="alert">Password is required!</div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading" type="submit">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span v-if="loading == false">Login</span>
          </button>
        </div>
        <router-link to="/auth/recover" class="link">Forgot your password ?</router-link>
        <router-link to="/register" class="link">Dont' have an account ? Register Here</router-link>

      </form>
    </div>
  </div>
</template>

<script>
  import InfoBox from '../../components/shared/InfoBox'

  export default {
    name: 'Login',
    data() {
      return {
        user: {
          email: "",
          password: '',
        },
        loading: false,
        verificationError: false,
        requestError: false
      };
    },
    components: {
      InfoBox
    },
    methods: {
      handleLogin() {
        this.loading = true;
        this.$validator.validateAll().then(isValid => {
          if (!isValid) {
            this.loading = false;
            return;
          }

          if (this.user.email && this.user.password) {
            this.$store.dispatch('auth/LOGIN', this.user).then(
              response => {
                this.$noty.success("Login successful")

                window.location.reload()
                window.location.href = '/'
              },
              error => {
                this.loading = false;
                if (error.status == "429") {
                  this.requestError = true
                } else {
                  this.verificationError = true;
                  this.$noty.error(error.data.msg)
                }
              }
            );
          }
        });
      }
    }
  }
</script>