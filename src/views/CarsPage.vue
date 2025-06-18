<template>
    <div class="mx-auto w-[75vw] p-6 bg-black min-h-screen">
        <header class="mb-8">
            <h1 class="text-white text-4xl font-bold text-center">Моя коллекция машинок</h1>
        </header>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <router-link
                v-for="carObj in cars"
                :key="carObj.fileName"
                :to="`/${carObj.fileName}`"
                class="relative block group rounded-xl overflow-hidden transition-transform duration-500 hover:scale-[1.03]"
            >
                <div class="absolute inset-0 z-10 pointer-events-none rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 glow-border"></div>

                <img
                    :src="carObj.data.gallery[0]"
                    :alt="carObj.data.name"
                    class="w-full h-64 object-cover transition duration-700 ease-out group-hover:scale-[1.02] group-hover:brightness-90"
                />

                <div class="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-b-xl"></div>

                <div class="absolute bottom-0 left-0 right-0 h-1/5 pointer-events-none rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-md bg-gradient-to-t from-black/60 to-transparent"></div>

                <h1 class="absolute bottom-3 left-3 right-3 text-white font-semibold drop-shadow-lg transition-transform duration-500 group-hover:translate-y-0 translate-y-8">
                    {{ carObj.data.name }}
                </h1>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const cars = ref([])

const modules = import.meta.glob('../cars/*.json')

async function loadAllCars() {
    const loadedCars = []
    for (const path in modules) {
        try {
            const module = await modules[path]()
            const fileName = path.split('/').pop().replace('.json', '')
            loadedCars.push({ data: module.default, fileName })
        } catch {}
    }
    cars.value = loadedCars
}

onMounted(loadAllCars)
</script>

<style scoped>
.glow-border {
    position: absolute;
    inset: 0;
    border-radius: 0.75rem;
    pointer-events: none;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1), 0 8px 24px rgba(255, 255, 255, 0.08);
    transition: box-shadow 0.5s ease, opacity 0.5s ease;
    opacity: 0;
}
.group:hover .glow-border {
    opacity: 1;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2), 0 12px 32px rgba(255, 255, 255, 0.12);
}
</style>
