<script setup lang="ts">
import { getPokemon } from '~~/store/pokemon';

const props = defineProps<{
    id: number,
    img: string,
    name: string,
}>();

const pokemon = ref(await getPokemon(props.id));


</script>

<template>
    <div class="">
        <div class="flex justify-end items-center">
            <p class="text-xs text-slate-500 font-extrabold h-2">#{{ id }}</p>
        </div>
        <div class="flex items-center justify-center h-[84px]">
        <img
            :src="`https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`"
            :alt="pokemon.name"
            class="items-center flex justify-center max-h-[86px] h-full max-w-[95%] w-full"
        >
        </div>
        <div class="">
        <p class="text-sm text-center mt-1">{{ name }}</p>
        </div>

    </div>
    <div class="h-[40%] w-[132px] bg-blend-overlay bg-gray-200 -mt-[40px] -ml-1 rounded-xl"></div>
</template>