<template>
    <div class="relative h-full bg-black">
        <transition
            name="fade"
            mode="out-in"
            appear
            @after-enter="onAfterEnter"
            @before-leave="isTransitioning = true"
        >
            <router-view :key="$route.fullPath" />
        </transition>
        <div
            :class="[
        'fixed inset-0 bg-black transition-opacity pointer-events-none z-[9999]',
        isTransitioning ? 'opacity-100 pointer-events-auto' : 'opacity-0'
      ]"
        ></div>
    </div>
</template>

<script>
export default {
    name: 'App',
    data: () => ({ isTransitioning: false }),
    created() {
        this.$router.beforeEach((to, from, next) => {
            this.isTransitioning = true;
            setTimeout(() => next(), 200);
        });
    },
    methods: {
        onAfterEnter() {
            this.isTransitioning = false;
        }
    }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
