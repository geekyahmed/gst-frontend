<template>
  <main class="content" data-view>
    <!-- Modal -->
    <div
      class="modal fade"
      id="userPreviewModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="userPreviewModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">User Details</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>
              Name:
              <strong>{{ userInfo.name }}</strong>
            </p>
            <p>
              Email:
              <strong>{{ userInfo.email }}</strong>
            </p>
            <p>
              Role:
              <strong>{{ userInfo.role }}</strong>
            </p>
            <p>
              Date Of Registration:
              <strong>{{ userInfo.createdAt }}</strong>
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#editUserModal"
              @click="getData(userInfo._id)"
            >
              Edit
            </button>
            <button
              type="button"
              class="btn btn-success"
              @click="deleteUser(userInfo._id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="editUserModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editUserModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <form method="PUT" name="form" @submit.prevent="updateUser">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Update User
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="col-md-12">
                <div class="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="user.name"
                    placeholder="Type user name here"
                  />
                </div>
                <div class="form-group">
                  <label>Role:</label>
                  <multiselect
                    v-model="user.role"
                    :options="roles"
                    placeholder="Select role"
                  />
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="user.email"
                    placeholder="Type user email here"
                  />
                </div>
                <div class="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="user.password"
                    placeholder="Type user password here"
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="createUserModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="createUserModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <form method="POST" name="form" @submit.prevent="createUser">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Create User
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="col-md-12">
                <div class="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="user.name"
                    placeholder="Type user name here"
                  />
                </div>
                <div class="form-group">
                  <label>Role:</label>
                  <multiselect
                    v-model="user.role"
                    :options="roles"
                    placeholder="Select role"
                  />
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="user.email"
                    placeholder="Type user email here"
                  />
                </div>
                <div class="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="user.password"
                    placeholder="Type user password here"
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Content -->

    <section class="section-padding-sm-2 blue-bg">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-lg-12 col-xl-12 mb-20">
            <div class="card">
              <div class="card-body">
                <p>
                  Total users :
                  <strong>{{ users.length }}</strong>
                </p>
                <h4 class="text-center mt-4" v-if="users == []">
                  You currently don't have any users
                </h4>
                <ul class="user-list" v-for="user in users" :key="user.id">
                  <li class="single-user-list">
                    <div class="mr-5 info">
                      <div class="details">
                        <h5 class="user-name capitalize">{{ user.name }}</h5>
                      </div>
                    </div>

                    <button
                      type="button"
                      class="btn btn-primary"
                      data-toggle="modal"
                      data-target="#userPreviewModal"
                      @click="getUserInfo(user._id)"
                    >
                      View Info
                    </button>
                  </li>
                </ul>
                <div class="mb-1">
                  <span>
                    <button
                      type="button"
                      class="btn-info"
                      data-toggle="modal"
                      data-target="#createUserModal"
                    >
                      Create User
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-lg-12 col-xl-12 mb-20">
            <div class="card">
              <div class="card-body">
                <p>
                  Lecturers :
                  <strong>{{ lecturers.length }}</strong>
                </p>
                <h4 class="text-center mt-4" v-if="!lecturers">
                  You currently don't have any lecturers
                </h4>
                <ul class="user-list" v-for="user in lecturers" :key="user.id">
                  <li class="single-user-list">
                    <div class="mr-5 info">
                      <div class="details">
                        <h5 class="user-name capitalize">{{ user.name }}</h5>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-lg-12 col-xl-12 mb-20">
            <div class="card">
              <div class="card-body">
                <p>
                  Students :
                  <strong>{{ students.length }}</strong>
                </p>
                <h4 class="text-center mt-4" v-if="students === []">
                  You currently don't have any students
                </h4>
                <ul class="user-list" v-for="user in students" :key="user.id">
                  <li class="single-user-list">
                    <div class="mr-5 info">
                      <div class="details">
                        <h5 class="user-name capitalize">{{ user.name }}</h5>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import UserService from '../../services/user.service';

export default {
  name: 'users',
  data() {
    return {
      user: {
        txId: '',
        name: '',
        email: '',
        role: '',
        password: ''
      },
      roles: ['student', 'lecturer'],
      userInfo: {},
      users: [],
      students: [],
      lecturers: []
    };
  },
  methods: {
    getUserInfo(id) {
      UserService.getUserInfo(id)
        .then(resp => {
          this.userInfo = resp.data.data;

          this.$noty.success(resp.data.msg);
        })
        .catch(err => {
          this.$noty.error(err.response.msg);
        });
    },
    getData(id) {
      UserService.getUserInfo(id).then(resp => {
        this.user.txId = resp.data.data._id;
        this.user.email = resp.data.data.email;
        this.user.name = resp.data.data.name;
        this.user.role = resp.data.data.role;

        this.$noty.success(data.data.msg);
      });
    },
    createUser() {
      UserService.createUser(this.user).then(resp => {
        this.$noty.success(resp.data.msg);

        this.$router.push('/users');
      });
    },
    updateUser() {
      UserService.updateUser(this.user.txId, this.user).then(resp => {
        this.$noty.success(resp.data.msg);
      });
    },
    deleteUser(id) {
      UserService.deleteUser(id).then(resp => {
        this.$noty.success(resp.data.msg);
      });
    }
  },
  mounted() {
    return UserService.getUsers().then(resp => {
      this.users = resp.data.data;
      this.students = this.users.filter(user => user.role === 'student');
      this.lecturers = this.users.filter(user => user.role === 'lecturer');

      console.log(this.users);
    });
  }
};
</script>
