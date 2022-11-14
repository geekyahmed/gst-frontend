<template>
    <div class="col-md-12 col-12 mt-5">
        <div class="alert alert-info alert-dismissible" role="alert">
            <div class="alert-icon">
                <i class="far fa-fw fa-bell"></i>
            </div>
            <div class="alert-message">
                <div class="alert-heading">
                    <slot name="title"></slot>
                </div>
                <hr />
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'InfoBox'
    }
</script>