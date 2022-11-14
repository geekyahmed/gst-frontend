<template>
    <div class="card">
        <slot name="header"></slot>
        <div class="card-body mt-1">
            <slot name="content"></slot>
            <perfect-scrollbar>
                <slot name="scrollable"></slot>
            </perfect-scrollbar>
        </div>
    </div>
</template>

<script>
    import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
    
    export default {
        name: 'BaseScrollableCard',
        components: {
            PerfectScrollbar
        }
    }
</script>

<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css" />

<style>
    .ps {
        height: 300px;
    }
</style>