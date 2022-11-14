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
                                    <h5 class="card-title mb-0">Post info</h5>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label>Title:</label>
                                                <input type="text" class="form-control" v-model="post.title"
                                                    placeholder="Type your post title here">
                                            </div>

                                            <div class="form-group">
                                                <label>Type:</label>
                                                <multiselect v-model="post.type" :options="types"
                                                    placeholder="Select post type" />
                                            </div>

                                            <div class="form-group">
                                                <label>Category:</label>
                                                <multiselect v-model="post.category" :options="categoryNames"
                                                    placeholder="Select post categories" />
                                            </div>

                                            <div class="form-group">
                                                <label>Body</label>
                                                <vue-editor id="editor" useCustomImageHandler
                                                    @image-added="handleImageAdded" v-model="post.body">
                                                </vue-editor>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn-info">Update Post</button>
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
    import { VueEditor } from "vue2-editor";
    import axios from "axios";

    export default {
        name: "UpdatePost",
        data() {
            return {
                post: {
                    title: '',
                    category: '',
                    type: '',
                    body: ''
                },
                types: ['draft', 'published'],
                categoryArray: []
            }
        },
        components: {
            VueEditor
        },
        computed: {
            categories() {
                return this.$store.getters['category/categories']
            },
            categoryNames() {
                return this.mapArray(this.categoryArray, cat => cat.name)
            }
        },
        mounted() {
            this.$store.dispatch('post/GET_POST_DETAILS', this.$route.params.slug)
                .then(resp => {
                    this.post.title = resp.data.title
                    this.post.category = resp.data.category.name
                    this.post.type = resp.data.type
                    this.post.body = this.render(resp.data.body)
                })
                .catch(err => {
                    this.$noty.error(err.response.data.msg)
                })

            this.$store.dispatch('category/GET_CATEGORIES')
                .then(resp => {
                    this.categoryArray = resp.data.data
                })
                .catch(err => {
                    this.$noty.error(err.response.data.msg)
                })
        },
        methods: {
            render(content) {
                const doc = new DOMParser().parseFromString(content, 'text/html')
                const textContent = doc.documentElement.textContent

                return textContent
            },
            mapArray(array, transform) {
                let mapped = [];
                for (let element of array) {
                    mapped.push(transform(element));
                }
                return mapped;
            },
            handleImageAdded(file, Editor, cursorLocation, resetUploader) {

                var formData = new FormData();
                formData.append("image", file);

                axios({
                    url: "https://api.imgbb.com/1/upload?key=f7ca185f64a55b062a3a913697e9f7b8",
                    method: "POST",
                    data: formData
                })
                    .then(result => {
                        const url = result.data.data.url; // Get url from response
                        Editor.insertEmbed(cursorLocation, "image", url);
                        resetUploader();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            handleSubmit() {
                this.$store.dispatch('post/UPDATE_POST', { slug: this.$route.params.slug, data: this.post })
                    .then(resp => {
                        this.$noty.success(resp.msg)
                        this.$router.push('/posts/' + resp.data.slug + '/preview')
                    })
                    .catch(error => {
                        this.$noty.error(error.data.error.msg)
                    })
            }
        }
    }
</script>