<template>
    <main class="content" data-view>
        <div class="">
            <section class="pitch-details spad">
                <div class="container-fluid">
                    <div class="row">

                        <!-- Delete Category Modal -->
                        <base-modal id="deleteCatModal" title="Delete Category">
                            <template #content>
                                <p>Are you sure you want to delete this category?</p>
                            </template>

                            <template #footer>
                                <button type="submit" class="btn btn-danger" v-on:click="deleteCategory">Delete
                                    Category</button>
                            </template>
                        </base-modal>

                        <div class="col-12 col-md-12">
                            <div class="card">
                                <div class="card-header">
                                    <h2 class="md-text capitalize">{{category.name}}</h2>
                                    <div class="buttons fl-right">
                                      <router-link class="btn-info" :to="{ name: 'edit-category', params: {slug: category.slug} }">Edit</router-link>
                                        <a href="#" class="btn-danger" data-toggle="modal"
                                            data-target="#deleteCatModal">Delete</a>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <p>{{category.body}}</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-12 col-lg-12 col-xl-12 mb-20">
                            <div class="card">
                                <div class="card-body">
                                    <p>Posts Under Category</p>
                                    <h4 class="text-center mt-4" v-if="posts == []">You currently don't have any posts
                                    </h4>
                                    <ul class="post-list" v-for="post in posts" :key="post.id">
                                        <li class="single-post-list">
                                            <router-link :to="{ name: 'post-preview', params: {slug: post.slug } }"
                                                class="clickable">
                                                <div class="mr-5 info">
                                                    <div class="details">
                                                        <h5 class="post-name capitalize">{{post.title}}</h5>
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
        </div>
    </main>
</template>

<script>
    import BaseModal from '../../components/ui/BaseModal'
    import GlobalMixin from '../../mixins/global.mixin';

    export default {
        name: 'ProjectPreview',
        mixins: [GlobalMixin],
        data() {
            return {
                category: null,
                posts: []
            }
        },
        components: {
            BaseModal
        },
        metaInfo: {
            title: 'Tribinnov Africa - Category Details'
        },
        mounted() {
            this.$store.dispatch('category/GET_CATEGORY_DETAILS', this.$route.params.slug)
                .then(resp => {
                    this.category = resp.data.category
                    this.posts = resp.data.posts
                }, error => {
                    this.noty.error(error.response.data.msg)
                })
        },
        methods: {
            deleteCategory() {
                this.$store.dispatch('post/DELETE_CATEGORY', this.$route.params.slug)
                    .then(resp => {
                        this.$noty.success(resp.msg)
                        this.$router.push('/categories')
                    }, error => {
                        this.$noty.error(error.data.msg)
                    })
            }
        }
    }
</script>