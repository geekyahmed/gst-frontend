<template>
  <main class="content" data-view>
    <div class="container-fluid">

      <h1 class="h3 mb-3">Categories</h1>

      <div class="row">
        <div class="col-12 col-xl-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Categories</h5>
              <router-link to="/categories/create" class="btn-info">Create Category</router-link>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th style="width:40%;">Name</th>
                  <th style="width:25%">Description</th>
                  <!-- <th class="d-none d-md-table-cell" style="width:25%">Posts</th> -->
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cat in categories" key="cat.id">
                  <td>{{cat.name}}</td>
                  <td>{{cat.body}}</td>
                  <!-- <td class="d-none d-md-table-cell"></td> -->
                  <td class="table-action">
                    <router-link class="ml-3" :to="{name: 'category-preview', params: {slug: cat.slug} }">
                      <i class="align-middle" data-feather="eye"></i>View
                    </router-link>
                    <router-link class="ml-3" :to="{name: 'edit-category', params: {slug: cat.slug} }">
                      <i class="align-middle" data-feather="edit-2"></i>Edit
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'Categories',
    computed: {
      categories() {
        return this.$store.getters['category/categories']
      }
    },
    metaInfo: {
      title: 'Tribinnov Africa - Categories'
    },
    mounted() {
      this.$store.dispatch('category/GET_CATEGORIES')
    }
  }
</script>