<template>
    <main class="content" data-view>
        <div class="">
            <section class="pitch-details spad">
                <div class="container-fluid">
                    <div class="row">
                        <!-- Delete Project Modal -->
                        <base-modal id="deletePostModal" title="Delete Project">
                            <template #content>
                                <p>Are you sure you want to delete this post?</p>
                                <p>Note: Once you delete this post, neither you nor Tribinnov Africa will have access
                                    to it again.</p>
                            </template>

                            <template #footer>
                                <button type="submit" class="btn btn-danger" v-on:click="deletePost">Delete
                                    Post</button>
                            </template>
                        </base-modal>

                        <div class="col-12 col-md-12">
                            <div class="card">
                                <div class="card-header">
                                    <h2 class="md-text capitalize">{{post.title}}</h2>
                                    <div class="buttons fl-right">
                                        <router-link :to="{ name: 'edit-post', params: {slug: post.slug } }"
                                            class="btn-info">Edit</router-link>
                                        <a href="#" class="btn-danger" data-toggle="modal"
                                            data-target="#deletePostModal">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-8 col-12">
                            <div class="pitch__details__tab">
                                <div class="pitch__details__tab__desc">
                                    <div class="card">
                                        <div class="card-header">
                                            <h2 class="md-text">Body</h2>
                                        </div>
                                        <div class="card-body">
                                            <span v-html="render(post.body)"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-4 col-12">
                            <div class="pitch__details__tab">
                                <div class="pitch__details__tab__desc">
                                    <div class="card">
                                        <div class="card-header">
                                            <h2 class="md-text">Details</h2>
                                        </div>
                                        <div class="card-body capitalize">
                                            <h5>Category: </h5>
                                            <p>{{post.category.name}}</p>
                                            <h5>Type: </h5>
                                            <p>{{post.type}}</p>
                                            <h5>Author: </h5>
                                            <p>{{post.user.firstName}} {{post.user.lastName}}</p>
                                        </div>
                                    </div>

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
                post: null
            }
        },
        components: {
            BaseModal
        },
        metaInfo: {
            title: 'Tribinnov Africa - Post Details'
        },
        mounted() {
            this.$store.dispatch('post/GET_POST_DETAILS', this.$route.params.slug)
                .then(resp => {
                    this.post = resp.data
                }, error => {
                    this.noty.error(error.response.data.msg)
                })
        },
        methods: {
            render(content) {
                const doc = new DOMParser().parseFromString(content, 'text/html')
                const textContent = doc.documentElement.textContent

                return textContent
            },
            deletePost() {
                this.$store.dispatch('post/DELETE_POST', this.$route.params.slug)
                    .then(resp => {
                        this.$noty.success(resp.msg)
                        this.$router.push('/posts')
                    }, error => {
                        this.$noty.error(error.data.msg)
                    })
            }
        },
    }
</script>