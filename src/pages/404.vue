<template>
    <div class="container text-center mtb-7 err-page">
        <h2 class="title color-blue">Oops ! Page Not Found</h2>
        <h1 style="background-image: url('/assets/img/bg/slider-bg.jpg') ;" class=" num">404</h1>
        <p class="text">Seems like you are lost</p>
        <router-link to="/" class="link">Go Back Home</router-link>
    </div>
</template>

<style scoped>
    .err-page {
        font-family: 'Poppins', sans-serif;
        margin-top: 10%;
        margin-bottom: 10%;
    }

    .err-page h2 {
        font-size: 20px;
    }

    .err-page .num {
        font-size: 120px;
        margin: 0;
        font-weight: 900;
        letter-spacing: 20px;
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        font-family: Poppins;
    }

    .err-page .link {
        text-decoration: none;
        background: #ff6600;
        color: #fff;
        font-family: 'Poppins', sans-serif;
        padding: 12px 24px;
        display: inline-block;
        border-radius: 25px;
        font-size: 14px;
    }

    .err-page .link:hover {
        background: transparent;
        border: 2px solid #000;
        color: #3c3c94;
    }
</style>

<script>
    export default {
        name: "NotFound"
    }
</script>