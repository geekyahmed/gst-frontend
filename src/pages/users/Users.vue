<template>
  <main class="content" data-view>
    <section class="section-padding-sm-2 blue-bg">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-lg-12 col-xl-12 mb-20">
            <div class="card">
              <div class="card-body">
                <p>My posts</p>
                <h4 class="text-center mt-4" v-if="posts == []">
                  You currently don't have any posts
                </h4>
                <ul class="post-list" v-for="post in ownPosts" :key="post.id">
                  <li class="single-post-list">
                    <router-link
                      :to="{
                        name: 'post-preview',
                        params: { slug: post.slug }
                      }"
                      class="clickable"
                    >
                      <div class="mr-5 info">
                        <div class="details">
                          <h5 class="post-name capitalize">{{ post.title }}</h5>
                        </div>
                      </div>
                    </router-link>
                  </li>
                </ul>
                <div class="mb-1">
                  <span>
                    <router-link to="/posts/create" class="btn-info"
                      >Create New post</router-link
                    >
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-lg-12 col-xl-12 mb-20">
            <div class="card">
              <div class="card-body">
                <p>Published posts</p>
                <h4 class="text-center mt-4" v-if="publishedPosts === []">
                  You currently don't have any published posts
                </h4>
                <ul
                  class="post-list"
                  v-for="post in publishedPosts"
                  :key="post.id"
                >
                  <li class="single-post-list">
                    <router-link
                      :to="{
                        name: 'post-preview',
                        params: { slug: post.slug }
                      }"
                      class="clickable"
                    >
                      <div class="mr-5 info">
                        <div class="details">
                          <h5 class="post-name capitalize">{{ post.title }}</h5>
                        </div>
                      </div>
                    </router-link>
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
import GlobalMixin from '../../mixins/global.mixin';
import UserService from '../../services/user.service';

export default {
  name: 'users',
  data() {
    return {
      users: []
    };
  },
  mixins: [GlobalMixin],
  computed: {
    students() {
      this.users.filter(user => user.role === 'student');
    },
    lecturers() {
      this.users.filter(user => user.role === 'lecturer');
    }
  },
  mounted() {
    console.log('Yo')
    return UserService.getUsers().then(resp => {
      console.log(resp);
      return Promise.resolve(resp.data);
    });
  }
};
</script>
