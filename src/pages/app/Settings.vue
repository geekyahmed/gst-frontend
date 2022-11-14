<template>
  <main class="content" data-view>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3 col-xl-2">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Profile Settings</h5>
            </div>

            <div class="list-group list-group-flush" role="tablist">
              <a
                class="list-group-item list-group-item-action active"
                data-toggle="list"
                href="#account"
                role="tab"
              >
                Account
              </a>
            </div>
          </div>
        </div>

        <div class="col-md-9 col-xl-10">
          <div class="tab-content">
            <div class="tab-pane fade show active" id="account" role="tabpanel">
              <form method="PUT" name="form" @submit.prevent="handleSubmit">
                <div class="card">
                  <div class="card-header">
                    <h5 class="card-title mb-0">Public info</h5>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>Full name</label>
                          <input
                            type="text"
                            class="form-control capitalize"
                            v-model="user.name"
                            placeholder="Type your name here"
                          />
                        </div>

                        <div class="form-group">
                          <label>Account Type</label>
                          <p>
                            <span class="badge badge-primary">
                              <strong>{{ role }}</strong>
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card mt-5">
                  <div class="card-header">
                    <h5 class="card-title mb-0">Private info</h5>
                  </div>
                  <div class="card-body">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          class="form-control"
                          v-model="user.email"
                          placeholder="Type your email here"
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Settings',
  data() {
    return {
      user: {
        name: '',
        email: ''
      },
      role: ''
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters['user/user'];
    }
  },
  mounted() {
    this.$store
      .dispatch('user/GET_USER')
      .then(resp => {
        this.user.email = resp.email;
        this.user.name = resp.name;
        this.role = resp.role;
      })
      .catch(err => {
        this.$noty.error(err.response.data.msg);
      });
  },
  methods: {
    handleSubmit() {
      this.$store
        .dispatch('user/UPDATE_PROFILE', {
          id: this.currentUser._id,
          data: this.user
        })
        .then(
          data => {
            this.$noty.success('User updated successfully');
            this.$router.push('/settings');
          },
          error => {
            this.$noty.error(error);
          }
        );
    }
  }
};
</script>
