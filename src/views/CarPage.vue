<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import CarCard from '../components/CarCard.vue'

const route = useRoute()

const car = ref(null)

const modules = import.meta.glob('../cars/*.json')

async function loadCar(id) {
    const path = Object.keys(modules).find(p => p.includes(`${id}.json`))
    try {
        const module = await modules[path]()
        car.value = module.default
    } catch {
    }
}

onMounted(() => loadCar(route.params.id))
watch(() => route.params.id, (newId) => loadCar(newId))
</script>

<template>
    <div v-if="car">
        <CarCard :car="car" />
    </div>
</template>

<style>
@import '@splidejs/splide/dist/css/splide.min.css';
</style>