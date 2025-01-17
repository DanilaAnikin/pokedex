<script setup lang="ts">
import axios from 'axios';
import { useRoute } from 'vue-router';
import { type PokemonData, type PokemonSpecies, typeColors, type TypeColorsKey } from '~~/types';

<<<<<<< HEAD
const route = useRoute();
const id = Number(route.params.id);
=======
const id = ref<number>(parseInt(useRoute().path.split('/')[2]!));

const pokemonResponse = await axios.get(`http://localhost:3000/api/pokemon/${id.value}`);
const pokemon = ref(pokemonResponse.data);

const speciesResponse = await axios.get(`http://localhost:3000/api/pokemon-species/${id.value}`)
const species = ref(speciesResponse.data);
>>>>>>> 6aa520c (updaty s db)

if(isNaN(id)) {
    throw createError({
        statusMessage: "Invalid pokemon ID",
        fatal: true,
    });
}

const { data: pokemon } = await useAsyncData<PokemonData>('pokemon', () => getPokemon(id) as Promise<PokemonData>);
const { data: species } = await useAsyncData<PokemonSpecies>('species', () => getSpecies(id) as Promise<PokemonSpecies>);

if(!pokemon.value || !species.value) {
    throw createError({
        statusCode: 404,
        statusMessage: "Pokemon not found",
        fatal: true,
    });
}

const pokemonStats = [ "HP", "ATK", "DEF", "SATK", "SDEF", "SPD" ];
const pokemonType = pokemon.value.types[0]!.type.name as TypeColorsKey;
const pokemonTypeColor = typeColors[pokemonType];
const pokemonTypesColors = pokemon.value.types.map((type) => typeColors[type.type.name as TypeColorsKey]);

const hexToRGB = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1]!, 16),
        g: parseInt(result[2]!, 16),
        b: parseInt(result[3]!, 16),
    } : null;
}
</script>

<template>
    <main v-if="pokemon">
        <img
            src="../../img/pokedex.svg"
            alt="pokedex"
            class="absolute top-0 right-0 opacity-15 w-[40%] max-h-[40%] bg-blend-overlay mix-blend-overlay"
        >
        <header :style="`background-color: ${pokemonTypeColor}`">
            <div class="flex w-full justify-center gap-20 items-center p-6">
                <div class="flex justify-left max-w-xs w-full gap-4 items-center">
                    <NuxtLink to="/" class="w-10 font-extrabold cursor-pointer">
                        <img
                            src="../../img/back-to-home.svg"
                            alt="back to home"
                            class="w-full"
                            id="back-btn"
                        >
                    </NuxtLink>
                    <div class="">
                        <h1 class="text-white font-extrabold text-3xl capitalize drop-shadow-2xl shadow-white">{{ pokemon.name }}</h1>
                    </div>
                </div>
                <div class="">
                    <p class="font-extrabold text-white">#{{ id }}</p>
                </div>
            </div>
        </header>
        <div class="flex items-center justify-center pt-4" :style="`background-color: ${pokemonTypeColor}`" >
            <div class="flex items-center w-[600px] justify-between px-2 ">
                <NuxtLink
                    :to="`/pokemon/${id !== 1 ? id - 1 : 151}`"
                >
                    <img
                        src="../../img/chevron_left.svg"
                        alt="back"
                        class="w-[60%]"
                    >
                </NuxtLink>
                <div class="w-[60%] mb-[-10%]">
                    <img
                    :src="`https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`"
                    :alt="pokemon.name"
                    class="w-full"
                    >
                </div>
                <NuxtLink :to="`/pokemon/${id !== 151 ? id + 1 : 1}`">
                    <img
                        src="../../img/chevron_right.svg"
                        alt="forward"
                        class="w-[60%]"
                    >
                </NuxtLink>
            </div>
        </div>
        <div class="">
            <div class="flex justify-center gap-5 h-28 items-end">
                <p
                    v-for="(type, typeIndex) in pokemon.types"
                    :style="`background-color: ${pokemonTypesColors[typeIndex]}`"
                    class="h-fit rounded-3xl w-fit px-3 py-2 capitalize font-extrabold text-white"
                >
                    {{ type.type.name }}
                </p>
            </div>
            <p class="justify-center flex font-extrabold py-3 text-xl">About</p>
            <div class="flex justify-center items-center px-6">
                <div class="flex flex-col gap-3 items-center pr-8 justify-center">
                    <div class="flex gap-3">
                        <img
                            src="../../img/weight.svg"
                            alt="weight"
                            class="w-6 h-6"
                        >
                        <p class="">{{ pokemon.weight }} kg</p>
                    </div>
                    <p class="text-xs font-extrabold text-slate-500">Weight</p>
                </div>
                <div class="flex flex-col gap-3 items-center border-x border-slate-400 px-8 h-20 justify-center">
                    <div class="flex gap-3">
                        <img
                            src="../../img/height.svg"
                            alt="height"
                            class="w-6 h-6"
                        >
                        <p class="">{{ pokemon.height }} m</p>
                    </div>
                    <p class="text-xs font-extrabold text-slate-500">Height</p>
                </div>
                <div class="flex flex-col gap-3 items-center pl-8 justify-center">
                    <div class="text-sm flex flex-col justify-center items-center"><p v-for="move in pokemon.abilities">{{ move.ability.name }}</p></div>
                    <p class="text-xs font-extrabold text-slate-500">Moves</p>
                </div>
            </div>
            <p class="px-8 text-sm py-6 items-center text-center">{{ species?.flavor_text_entries[0]?.flavor_text }}</p>
            <p class="text-center text-xl font-extrabold">Base Stats</p>
            <div class="px-8 text-sm pt-4 w-full flex flex-col items-center">
                <div
                    v-for="(stat, statIndex) in pokemon.stats"
                    class="max-w-lg w-full flex items-center"
                    data-stat="HP"
                >
                    <p class="border-r border-slate-400 w-20 text-center pr-3">{{ pokemonStats[statIndex] }}</p>
                    <p class="w-16 text-center">{{ stat.base_stat }}</p>
                    <div class="w-full rounded-full h-2 bg-opacity-25" :style="`background-color: rgba(${hexToRGB(pokemonTypeColor)!.r}, ${hexToRGB(pokemonTypeColor)!.g}, ${hexToRGB(pokemonTypeColor)!.b}, 0.25)`">
                        <div :style="`background-color: ${pokemonTypeColor}; width: ${stat.base_stat/2}%;`" class="h-2 bg-opacity-100 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
