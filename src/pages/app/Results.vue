<template>
  <main class="content" data-view>
    <!-- Modal -->
    <div class="modal fade" id="userPreviewModal" tabindex="-1" role="dialog" aria-labelledby="userPreviewModal"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Result Details
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body capitalize">
            <p>
              Course:
              <strong>{{ resultInfo.course }}</strong>
            </p>
            <p>
              Score:
              <strong>{{ resultInfo.score }}</strong>
            </p>
            <p>
              Grade:
              <strong>{{ resultInfo.grade }}</strong>
            </p>
            <p>
              Status:
              <strong>{{ resultInfo.status }}</strong>
            </p>
            <p>
              Student Id:
              <strong>{{ resultInfo.student }}</strong>
            </p>
          </div>
          <div class="modal-footer" v-if="admin">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editResultModal"
              @click="getData(resultInfo._id)">
              Edit
            </button>
            <button type="button" class="btn btn-success" @click="deleteResult(resultInfo._id)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="editResultModal" tabindex="-1" role="dialog" aria-labelledby="editResultModal"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <form method="PUT" name="form" @submit.prevent="updateResult">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Update Result
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="col-md-12">
                <div class="form-group">
                  <label>Course</label>
                  <input type="text" class="form-control" v-model="result.course" placeholder="Type course name here" />
                </div>
                <div class="form-group">
                  <label>Score</label>
                  <input type="number" class="form-control" v-model="result.score"
                    placeholder="Type course score here" />
                </div>
                <div class="form-group">
                  <label>Grade:</label>
                  <multiselect v-model="result.grade" :options="grades" placeholder="Select grade" />
                </div>
                <div class="form-group">
                  <label>Status:</label>
                  <multiselect v-model="result.status" :options="statuses" placeholder="Select status" />
                </div>
                <div class="form-group">
                  <label>Student:</label>
                  <multiselect v-model="result.student" :options="users" placeholder="Select student id" />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
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
    <div class="modal fade" id="createResultModal" tabindex="-1" role="dialog" aria-labelledby="createResultModal"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <form method="POST" name="form" @submit.prevent="createResult">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Create Result
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="col-md-12">
                <div class="form-group">
                  <label>Course</label>
                  <input type="text" class="form-control" v-model="result.course" placeholder="Type course name here" />
                </div>
                <div class="form-group">
                  <label>Score</label>
                  <input type="number" class="form-control" v-model="result.score"
                    placeholder="Type course score here" />
                </div>
                <div class="form-group">
                  <label>Grade:</label>
                  <multiselect v-model="result.grade" :options="grades" placeholder="Select grade" />
                </div>
                <div class="form-group">
                  <label>Status:</label>
                  <multiselect v-model="result.status" :options="statuses" placeholder="Select status" />
                </div>
                <div class="form-group">
                  <label>Student:</label>
                  <multiselect v-model="result.student" :options="users" placeholder="Select student id" />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
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
                  Total results :
                  <strong>{{ results.length }}</strong>
                </p>
                <h4 class="text-center mt-4" v-if="results === []">
                  You currently don't have any results
                </h4>
                <div class="mb-1" v-if="admin">
                  <span>
                    <button type="button" class="btn-info" data-toggle="modal" data-target="#createResultModal">
                      Create Result
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table table-hover table-dark capitalize">
                <thead>
                  <tr>
                    <th scope="col">Course</th>
                    <th scope="col">Score</th>
                    <th scope="col">Grade</th>
                    <th scope="col">Status</th>
                    <th scope="col">Student Id</th>
                  </tr>
                </thead>
                <tbody v-for="result in results" :key="result._id">
                  <tr>
                    <td>{{ result.course }}</td>
                    <td>{{ result.score }}</td>
                    <td>{{ result.grade }}</td>
                    <td>{{ result.status }}</td>
                    <td>{{ result.student }}</td>
                    <td>
                      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#userPreviewModal"
                        @click="getResultInfo(result._id)">
                        View Info
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import ResultService from '../../services/result.service';
import UserService from '../../services/user.service';
import { mapGetters } from 'vuex';

export default {
  name: 'results',
  data() {
    return {
      result: {
        course: '',
        score: '',
        grade: '',
        status: '',
        student: ''
      },
      statuses: ['pass', 'fail', 'credit'],
      grades: ['A', 'B', 'C', 'D', 'E', 'F'],
      results: [],
      users: [],
      resultInfo: {}
    };
  },
  computed: {
    ...mapGetters({
      currentUser: 'user/user'
    }),

    admin() {
      if (this.currentUser.role === 'admin') {
        return true;
      } else {
        return false;
      }
    },
    student() {
      if (this.currentUser.role === 'student') {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    getResultInfo(id) {
      ResultService.getResultInfo(id)
        .then(resp => {
          this.resultInfo = resp.data.data;

          this.$noty.success(resp.data.msg);
        })
        .catch(err => {
          this.$noty.error(err.response.msg);
        });
    },
    getData(id) {
      ResultService.getResultInfo(id).then(resp => {
        this.result.txId = resp.data.data._id;
        this.result.course = resp.data.data.course;
        this.result.grade = resp.data.data.grade;
        this.result.status = resp.data.data.status;
        this.result.student = resp.data.data.student;
        this.result.course = resp.data.data.course;

        this.$noty.success(data.data.msg);
      });
    },
    createResult() {
      ResultService.createResult(this.result).then(resp => {
        this.$noty.success(resp.data.msg);

        this.$route.push('/results');
      });
    },
    updateResult() {
      ResultService.updateUser(this.result.txId, this.result).then(resp => {
        this.$noty.success(resp.data.msg);
      });
    },
    deleteResult(id) {
      ResultService.deleteResult(id).then(resp => {
        this.$noty.success(resp.data.msg);
      });
    }
  },
  mounted() {
    return ResultService.getResults().then(async resp => {
      await UserService.getUsers().then(resp => {
        let users = resp.data.data;

        let filtered = users.filter(user => user.role === 'student');

        this.users = filtered.map(user => user._id);
      });

      if (this.currentUser.role === 'admin') {
        this.results = resp.data.data;
      } else {
        this.results = resp.data.data.filter(
          result => result.student === this.currentUser._id
        );
      }

      // console.log(resp.data.data.filter(
      //     result => result.student === this.currentUser.id
      //   ));
    });
  }
};
</script>
