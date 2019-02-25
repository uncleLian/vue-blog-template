
<template>
    <div class="my-side-link">
        <a v-if="isExternal"
            :href="to.path"
            target="_blank">
            <slot />
        </a>
        <router-link v-else
            :to="{'name': to.name}">
            <slot />
        </router-link>
    </div>
</template>

<script>
export default {
    props: {
        to: {
            required: true
        }
    },
    computed: {
        isExternal() {
            return /^(https?:|mailto:|tel:)/.test(this.to.path)
        }
    }
}
</script>
