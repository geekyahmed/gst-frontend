<template>
  <main class="content" data-view>
    <!-- Modal -->
    <div class="modal fade" id="userPreviewModal" tabindex="-1" role="dialog" aria-labelledby="userPreviewModal"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Timetable Details
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>
              Course:
              <strong>{{ timetableInfo.course }}</strong>
            </p>
            <p>
              Venue:
              <strong>{{ timetableInfo.venue }}</strong>
            </p>
            <p>
              Type:
              <strong>{{ timetableInfo.type }}</strong>
            </p>
            <p>
              Start Time:
              <strong>{{ timetableInfo.startTime }}</strong>
            </p>
            <p>
              End Time:
              <strong>{{ timetableInfo.endTime }}</strong>
            </p>
            <p>
              Lecturer:
              <strong>{{ timetableInfo.lecturer }}</strong>
            </p>
            <!-- <p>
                lecturer:
                <strong>{{ timetableInfo.lecturer.name }}</strong>
              </p> -->
          </div>
          <div class="modal-footer" v-if="admin">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#edittimetableModal"
              @click="getData(timetableInfo._id)">
              Edit
            </button>
            <button type="button" class="btn btn-success" @click="deleteTimetable(timetableInfo._id)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="edittimetableModal" tabindex="-1" role="dialog" aria-labelledby="edittimetableModal"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <form method="PUT" name="form" @submit.prevent="updatetimetable">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Update timetable
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="col-md-12">
                <div class="form-group">
                  <label>Course</label>
                  <input type="text" class="form-control" v-model="timetable.course"
                    placeholder="Type course name here" />
                </div>
                <div class="form-group">
                  <label>Venue</label>
                  <input type="text" class="form-control" v-model="timetable.venue"
                    placeholder="Type course venue here" />
                </div>
                <div class="form-group">
                  <label>Type:</label>
                  <multiselect v-model="timetable.type" :options="types" placeholder="Select type" />
                </div>
                <div class="form-group">
                  <label>Start Time:</label>
                  <input type="text" class="form-control" v-model="timetable.startTime" />
                </div>
                <div class="form-group">
                  <label>End Time:</label>
                  <input type="text" class="form-control" v-model="timetable.endTime" />
                </div>
                <div class="form-group">
                  <label>Lecturer:</label>
                  <multiselect v-model="timetable.lecturer" :options="users" placeholder="Select lecturer id" />
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
    <div class="modal fade" id="createTimetableModal" tabindex="-1" role="dialog" aria-labelledby="createTimetableModal"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <form method="POST" name="form" @submit.prevent="createTimetable">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Create timetable
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="col-md-12">
                <div class="form-group">
                  <label>Course</label>
                  <input type="text" class="form-control" v-model="timetable.course"
                    placeholder="Type course name here" />
                </div>
                <div class="form-group">
                  <label>Venue</label>
                  <input type="text" class="form-control" v-model="timetable.venue"
                    placeholder="Type course venue here" />
                </div>
                <div class="form-group">
                  <label>Type:</label>
                  <multiselect v-model="timetable.type" :options="types" placeholder="Select type" />
                </div>
                <div class="form-group">
                  <label>Start Time:</label>
                  <input type="text" class="form-control" v-model="timetable.startTime" />
                </div>
                <div class="form-group">
                  <label>End Time:</label>
                  <input type="text" class="form-control" v-model="timetable.endTime" />
                </div>
                <div class="form-group">
                  <label>Lecturer:</label>
                  <multiselect v-model="timetable.lecturer" :options="users" placeholder="Select lecturer id" />
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
                  Total timetables :
                  <strong>{{ timetables.length }}</strong>
                </p>
                <h4 class="text-center mt-4" v-if="timetables === []">
                  You currently don't have any timetables
                </h4>
                <div class="mb-1" v-if="admin">
                  <span>
                    <button type="button" class="btn-info" data-toggle="modal" data-target="#createTimetableModal">
                      Create Timetable
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
                    <th scope="col">Venue</th>
                    <th scope="col">Start Time</th>
                    <th scope="col">End Time</th>
                    <th scope="col">Lecturer Id</th>
                  </tr>
                </thead>
                <tbody v-for="timetable in timetables" :key="timetable._id">
                  <tr>
                    <td>{{ timetable.course }}</td>
                    <td>{{ timetable.venue }}</td>
                    <td>{{ timetable.startTime }}</td>
                    <td>{{ timetable.endTime }}</td>
                    <td>{{ timetable.lecturer }}</td>
                    <td>
                      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#userPreviewModal"
                        @click="getTimetableInfo(timetable._id)">
                        View Info
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="col-sm-12 col-lg-12 col-xl-12 mb-20" v-if="lecturer">
            <div class="card">
              <div class="card-body">
                <p>
                  Personal Timetable :
                  <strong>{{ lecturerTimeTables.length }}</strong>
                </p>
                <h4 class="text-center mt-4" v-if="lecturerTimeTables === []">
                  You currently don't have any timetables
                </h4>
              </div>
            </div>
          </div>

          <div class="col-md-12" v-if="lecturer">
            <div class="table-responsive">
              <table class="table table-hover table-dark capitalize">
                <thead>
                  <tr>
                    <th scope="col">Course</th>
                    <th scope="col">Venue</th>
                    <th scope="col">Start Time</th>
                    <th scope="col">End Time</th>
                    <th scope="col">Lecturer</th>
                  </tr>
                </thead>
                <tbody v-for="timetable in lecturerTimeTables" :key="timetable._id">
                  <tr>
                    <td>{{ timetable.course }}</td>
                    <td>{{ timetable.venue }}</td>
                    <td>{{ timetable.startTime }}</td>
                    <td>{{ timetable.endTime }}</td>
                    <td>{{ timetable.lecturer }}</td>
                    <td>
                      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#userPreviewModal"
                        @click="getTimetableInfo(timetable._id)">
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
import TimetableService from '../../services/timetable.service';
import UserService from '../../services/user.service';
import { mapGetters } from 'vuex';

export default {
  name: 'timetables',
  data() {
    return {
      timetable: {
        course: '',
        venue: '',
        type: '',
        startTime: '',
        endTime: '',
        lecturer: ''
      },
      types: ['exam', 'lecture'],
      timetables: [],
      users: [],
      timetableInfo: {}
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
    lecturer() {
      if (this.currentUser.role === 'lecturer') {
        return true;
      } else {
        return false;
      }
    },
    lecturerTimeTables() {
      return this.timetables.filter(data => data.lecturer === this.currentUser._id)
    }
  },
  methods: {
    getTimetableInfo(id) {
      TimetableService.getTimetableInfo(id)
        .then(resp => {
          this.timetableInfo = resp.data.data;

          this.$noty.success(resp.data.msg);
        })
        .catch(err => {
          this.$noty.error(err.response.msg);
        });
    },
    getData(id) {
      TimetableService.getTimetableInfo(id).then(resp => {
        this.timetable.txId = resp.data.data._id;
        this.timetable.course = resp.data.data.course;
        this.timetable.venue = resp.data.data.venue;
        this.timetable.type = resp.data.data.type;
        this.timetable.startTime = resp.data.data.startTime;
        this.timetable.endTime = resp.data.data.endTime;
        this.timetable.lecturer = resp.data.data.lecturer;

        this.$noty.success(data.data.msg);
      });
    },
    createTimetable() {
      TimetableService.createTimetable(this.timetable).then(resp => {
        this.$noty.success(resp.data.msg);

        this.$route.push('/timetables');
      });
    },
    updateTimetable() {
      TimetableService.updateUser(this.timetable.txId, this.timetable).then(resp => {
        this.$noty.success(resp.data.msg);
      });
    },
    deleteTimetable(id) {
      TimetableService.deletetimetable(id).then(resp => {
        this.$noty.success(resp.data.msg);
      });
    }
  },
  mounted() {
    return TimetableService.getTimetables().then(async resp => {
      await UserService.getUsers().then(resp => {
        let users = resp.data.data;

        let filtered = users.filter(user => user.role === 'lecturer');

        this.users = filtered.map(user => user._id);
      });


      this.timetables = resp.data.data;
    });
  }
};
</script>
  