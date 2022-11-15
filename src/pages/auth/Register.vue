<template>
  <div class="container-fluid">
    <info-box v-if="successful">
      <template #title>
        <h3>Account creation successful</h3>
      </template>
    </info-box>

    <info-box v-if="requestError">
      <template #title>
        <h3>Too Many Requests</h3>
      </template>
      <template #content>
        <p>
          You have reached the request limit, please try again in 15 minutes.
        </p>
      </template>
    </info-box>

    <div class="main-form container-fluid mt-5" data-view>
      <form method="post" name="form" @submit.prevent="handleRegister">
        <h4 class="text-center color-blue">Create An Account</h4>

        <div v-if="!successful">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input v-model="user.name" v-validate="'required|min:3|max:20'" type="text" class="form-control"
              name="name" />
            <div v-if="submitted && errors.has('name')" class="alert-danger">
              {{ errors.first('name') }}
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input v-model="user.email" v-validate="'required|email|max:50'" type="email" class="form-control"
              name="email" />
            <div v-if="submitted && errors.has('email')" class="alert-danger">
              {{ errors.first('email') }}
            </div>
          </div>

          <div class="form-group">
            <label>Role:</label>
            <multiselect v-model="user.role" :options="roles" placeholder="Select role" />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input v-model="user.password" v-validate="'required|min:6|max:40'" type="password" class="form-control"
              name="password" />
            <div v-if="submitted && errors.has('password')" class="alert-danger">
              {{ errors.first('password') }}
            </div>
          </div>

          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading" type="submit">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span v-if="loading == false">Create an account</span>
            </button>
          </div>
          <router-link to="/login" class="link">Exisitng User ? Login Here</router-link><br />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      user: {
        name: '',
        email: '',
        role: '',
        password: ''
      },
      roles: ['student', 'lecturer'],
      loading: false,
      successful: false
    };
  },
  methods: {
    handleRegister() {
      this.submitted = true;
      this.loading = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/REGISTER', this.user).then(
            resp => {
              this.$noty.success(resp.msg);
              this.successful = true;
            },
            error => {
              if (error.status == '429') {
                this.requestError = true;
              } else {
                this.$noty.error(error.data.msg);
              }
              this.successful = false;
              this.loading = false;
            }
          );
        } else {
          this.loading = false;
        }
      });
    }
  }
};
</script>
