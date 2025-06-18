<template>
    <div class="relative h-screen w-screen overflow-hidden bg-black">
        <iframe
                class="fixed top-[-10%] left-0 w-full h-[120%] object-cover pointer-events-none"
                :src="car.video + '?autoplay=1&mute=1&loop=1&showinfo=0&playlist=' + extractVideoId(car.video) + '&controls=0&modestbranding=1&iv_load_policy=3&rel=0&showinfo=0&disablekb=1'"
                allow="autoplay; fullscreen"
                allowfullscreen
                tabindex="-1"
        />

        <router-link
            to="/"
            class="fixed top-4 left-4 z-40 rounded bg-white/20 px-3 py-1 text-white text-sm font-semibold backdrop-blur-sm hover:bg-white/40 transition"
        >
            Главная
        </router-link>

        <div
            class="fixed top-0 left-0 w-full h-full bg-black z-20"
            :style="{
                opacity: overlayOpacity,
                transition: 'opacity 1.5s ease-in-out'
            }"
        ></div>

        <article
                class="relative z-30 mx-auto my-[2vh] max-w-4xl w-[90vw] sm:w-[40vw] overflow-y-auto rounded-xl border border-white/10 bg-gray-900/40 p-4 shadow-2xl backdrop-blur-md text-white custom-scroll"
        >
            <div class="relative mb-4 overflow-hidden rounded-md">
                <Splide :options="splideOptions" class="rounded-md overflow-hidden">
                    <SplideSlide v-for="(img, index) in car.gallery" :key="index">
                        <img
                            :src="img"
                            :alt="`${car.name} gallery image ${index + 1}`"
                            class="h-64 w-full rounded-md object-cover"
                        />
                    </SplideSlide>
                </Splide>
                <div
                    class="absolute top-2 left-1 flex w-full flex-wrap gap-2 justify-start rounded-b-md"
                >
          <span
              v-for="tag in car.hashtags"
              :key="tag"
              class="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm"
              style="text-shadow:
              -1px -1px 0 #595959,
               1px -1px 0 #595959,
              -1px  1px 0 #595959,
               1px  1px 0 #595959;"
          >
            #{{ tag }}
          </span>
                </div>
            </div>
            <div>
                <h1 class="mb-2 text-2xl font-extrabold">{{ car.name }} ({{ car.year }})</h1>
                <p class="mb-6">{{ car.description }}</p>
                <ul class="mb-6 list-inside list-disc space-y-1">
                    <li v-for="(value, key) in car.info" :key="key">
                        <strong class="capitalize">{{ key }}:</strong> {{ value }}
                    </li>
                </ul>
                <p class="mb-6 italic text-sm text-gray-400">{{ car.notes }}</p>
            </div>
        </article>

        <div
            class="fixed top-0 left-0 w-full h-full bg-black opacity-30 pointer-events-none z-10"
        ></div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide'

defineProps({ car: Object })

const splideOptions = {
    type: 'loop',
    perPage: 1,
    arrows: true,
    pagination: false,
    autoplay: true,
    interval: 5000,
    speed: 800,
    easing: 'ease-in-out',
    pauseOnHover: true,
    pauseOnFocus: false,
    rewind: true,
}

function extractVideoId(url) {
    const regExp = /^.*(youtu\.be\/|youtube\.com\/(embed\/|watch\?v=))([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[3].length === 11 ? match[3] : ''
}

const overlayOpacity = ref(1)
onMounted(() => {
    setTimeout(() => {
        overlayOpacity.value = 0
    }, 1000)
})
</script>

<style scoped>
.custom-scroll::-webkit-scrollbar {
    width: 4px;
}
.custom-scroll::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scroll::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
}
.custom-scroll {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}
</style>