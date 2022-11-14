<template>
    <main class="content" data-view>
        <div class="container-fluid">
            <!-- <h1 class="h3 mb-3">Settings</h1> -->
            <div class="row">
                <div class="col-md-12 col-xl-12 col-12 col-md-12">
                    <div class="tab-content">
                        <form method="PUT" @submit.prevent="handleSubmit">
                            <div class="card">
                                <div class="card-header">
                                    <h5 class="card-title mb-0">Category info</h5>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label>Name:</label>
                                                <input type="text" class="form-control" v-model="category.name"
                                                    placeholder="Type category name here">
                                            </div>

                                            <div class="form-group">
                                                <label>Type:</label>
                                                <multiselect v-model="category.type" :options="types"
                                                    placeholder="Select category type" />
                                            </div>

                                            <div class="form-group">
                                                <label>Body</label>
                                                <wysiwyg v-model="category.body"
                                                    placeholder="The description of the category" />
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn-info">Edit Category</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>


<script>
    export default {
        name: "EditCategory",
        data() {
            return {
                category: {
                    name: '',
                    type: '',
                    body: ''
                },
                types: ['draft', 'published']
            }
        },
        mounted() {
            this.$store.dispatch('category/GET_CATEGORY_DETAILS', this.$route.params.slug)
                .then(resp => {
                    this.category.name = resp.data.category.name
                    this.category.type = resp.data.category.type
                    this.category.body = resp.data.category.body
                })
                .catch(err => {
                    this.$noty.error(err.response.data.msg)
                })
        },
        methods: {
            handleSubmit() {
                this.$store.dispatch('category/UPDATE_CATEGORY', { slug: this.$route.params.slug, data: this.category })
                    .then(resp => {
                        this.$noty.success(resp.msg)
                        this.$router.push('/categories')
                    })
                    .catch(error => {
                        this.$noty.error(error.data.error.msg)
                    })
            }
        }
    }
</script>