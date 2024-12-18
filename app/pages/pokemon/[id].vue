<script setup lang="ts">
import { getPokemon, getSpecies } from '~~/store/pokemon';
import { useRoute } from 'vue-router';
import type { PokemonData } from '~~/types';

const id = ref<number>(parseInt(useRoute().path.split('/')[2]!));
const pokemon = ref(await getPokemon(id.value));
const species = ref(await getSpecies(id.value));

const pokemonType = ref<string>(pokemon.value.types[0].type.name);
console.log(pokemon);

const typeColors = ref({
    "normal": "#A8A878",
    "fire": "#F08030",
    "water": "#6890F0",
    "electric": "#F8D030",
    "grass": "#78C850",
    "ice": "#98D8D8",
    "fighting": "#C03028",
    "poison": "#A040A0",
    "ground": "#E0C068",
    "flying": "#A890F0",
    "psychic": "#F85888",
    "bug": "#A8B820",
    "rock": "#B8A038",
    "ghost": "#705898",
    "dragon": "#7038F8",
    "dark": "#705848",
    "steel": "#B8B8D0",
    "fairy": "#EE99AC",
});
</script>

<template>
    <main class="">
        <header class="">
            <div class="">
                <div class="flex">
                    <div @click="navigateTo('/')" class="">
                        <img
                            src="../../img/back-to-home.svg"
                            alt="back to home"
                            class=""
                            id="back-btn"
                        >
                    </div>
                    <div class="">
                        <h1 class="">{{ pokemon.name }}</h1>
                    </div>
                </div>
                <div class="">
                    <p class=""></p>
                </div>
            </div>
        </header>
        <div :class="`flex items-center justify-center gap-6 bg-[${typeColors[pokemonType]}]`">
            <div @click="id !== 1 ? navigateTo(`./${id-1}`) : navigateTo(`./151`)" class="w-[10%]" id="left-arrow">
                <img
                    src="../../img/chevron_left.svg"
                    alt="back"
                >
            </div>
            <div class="w-full max-w-[33%]">
                <img :src="`https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`" :alt="pokemon.name">
            </div>
            <div @click="id !== 151 ? navigateTo(`./${id+1}`) : navigateTo(`./${1}`)" class="w-[10%]">
                <img
                    src="../../img/chevron_right.svg"
                    alt="forward"
                >
            </div>
        </div>
        <div class="">
            <div class="">
                <p class=""></p>
                <p class=""></p>
            </div>
            <p class="">About</p>
            <div class="">
                <div class="">
                    <div class="">
                        <img
                            src="../../img/weight.svg"
                            alt="weight"
                        >
                        <p class=""></p>
                    </div>
                    <p class="">Weight</p>
                </div>
                <div class="">
                    <div class="p">
                        <img
                            src="../../img/height.svg"
                            alt="height"
                        >
                        <p class=""></p>
                    </div>
                    <p class="">Height</p>
                </div>
                <div class="">
                    <div class=""></div>
                    <p class="">Move</p>
                </div>
            </div>
            <p class=""></p>
            <p class="">Base Stats</p>
            <div class="">
                <div class="" data-stat="HP" >
                    <p class="">HP</p>
                    <p class=""></p>
                    <progress value="" max="100" class=""></progress>
                </div>
                <div class="" data-stat="ATK" >
                    <p class="">ATK</p>
                    <p class=""></p>
                    <progress value="" max="100" class=""></progress>
                </div>
                <div class="" data-stat="DEF" >
                    <p class="">DEF</p>
                    <p class=""></p>
                    <progress value="" max="100" class=""></progress>
                </div>
                <div class="" data-stat="SATK" >
                    <p class="">SATK</p>
                    <p class=""></p>
                    <progress value="" max="100" class=""></progress>
                </div>
            </div>
        </div>
        <img
            src="../../img/pokedex.svg"
            alt="pokedex"
            class=""
        >
    </main>
</template>
