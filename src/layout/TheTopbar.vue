<template>
    <nav class="navbar navbar-expand navbar-light navbar-bg" v-if="loggedIn" :key="loggedIn">
        <a class="sidebar-toggle d-flex">
            <i class="hamburger align-self-center"></i>
        </a>

        <div class="navbar-collapse collapse">
            <ul class="navbar-nav navbar-align">
                <li class="nav-item dropdown">
                    <a class="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#" data-toggle="dropdown">
                        <i class="align-middle" data-feather="settings"></i>
                    </a>

                    <a class="nav-link dropdown-toggle d-none d-sm-inline-block" href="#" data-toggle="dropdown">
                        <span class="text-dark capitalize">{{user.name}}</span>
                    </a>

                    <div class="dropdown-menu dropdown-menu-right">
                        <router-link to="/settings" class="dropdown-item">
                            <i class="align-middle mr-1" data-feather="user"></i> Profile
                        </router-link>

                        <div class="dropdown-divider"></div>

                        <a class="dropdown-item" href="#" v-on:click="logOut()"> <i class="align-middle mr-1"
                                data-feather="log-out"></i> Log out</a>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    import { mapGetters } from 'vuex'
    
    export default {
        name: 'Topbar',
        computed: {
            ...mapGetters({
                user: 'user/user',
                loggedIn: 'auth/loggedIn'
            })
        },
        methods: {
            logOut() {
                this.$store.dispatch('auth/LOGOUT')
                
                this.$noty.success('Logout Successful')
                this.$router.push('/login')
            }
        }
    }
</script>