<template>
    <div class="card">
        <slot name="header"></slot>
        <div class="card-body mt-1">
            <slot name="image"></slot>
            <slot name="title"></slot>
            <slot name="content"></slot>
            <div class="mb-1">
                <span>
                    <slot name="footer"></slot>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BaseCard'
    }
</script>