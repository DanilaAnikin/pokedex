<script setup lang="ts">
import { getPokemon, getSpecies } from '~~/store/pokemon';
import { useRoute } from 'vue-router';
import type { PokemonData } from '~~/types';

const id = ref<number>(parseInt(useRoute().path.split('/')[2]!));
const pokemon = ref(await getPokemon(id.value));
const species = ref(await getSpecies(id.value));

const pokemonType = ref<TypeColorsKey>(pokemon.value.types[0].type.name);
const typeColors = ref({
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
});

type TypeColorsKey = keyof typeof typeColors.value;

const pokemonTypeColor = ref<string>(typeColors.value[pokemonType.value]);

const getPokemonTypesColors = (): string[] => {
    const list = [];
    for (let i = 0; i < pokemon.value.types.length; i++) {
        const pokType: TypeColorsKey = pokemon.value.types[i].type.name
        list.push(typeColors.value[pokType]);
    }
    return list;
}

const pokemonTypesColors = ref<string[]>(getPokemonTypesColors());
console.log(pokemonTypesColors.value);
</script>

<template>
    <main>
        <img
            src="../../img/pokedex.svg"
            alt="pokedex"
            class="absolute top-0 right-0 opacity-15 w-[40%] max-h-[40%] bg-blend-overlay mix-blend-overlay"
        >
        <header :class="`bg-[${pokemonTypeColor}]`">
            <div class="flex w-full justify-center gap-20 items-center p-6">
                <div class="flex justify-left max-w-xs w-full gap-4 items-center">
                    <div @click="navigateTo('/')" class="w-10 font-extrabold">
                        <img
                            src="../../img/back-to-home.svg"
                            alt="back to home"
                            class="w-full"
                            id="back-btn"
                        >
                    </div>
                    <div class="">
                        <h1 class="text-white font-extrabold text-3xl capitalize drop-shadow-2xl shadow-white">{{ pokemon.name }}</h1>
                    </div>
                </div>
                <div class="">
                    <p class="font-extrabold text-white">#{{ id }}</p>
                </div>
            </div>
        </header>
        <div class="flex items-center justify-center pt-4" :class="`bg-[${pokemonTypeColor}]`">
            <div class="flex items-center w-[600px] justify-between px-2 ">
                <div @click="id !== 1 ? navigateTo(`./${id-1}`) : navigateTo(`./151`)" id="left-arrow">
                    <img
                        src="../../img/chevron_left.svg"
                        alt="back"
                        class="w-[60%]"
                    >
                </div>
                <div class="w-[60%] mb-[-10%]">
                    <img
                    :src="`https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`"
                    :alt="pokemon.name"
                    class="w-full"
                    >
                </div>
                <div @click="id !== 151 ? navigateTo(`./${id+1}`) : navigateTo(`./${1}`)">
                    <img
                        src="../../img/chevron_right.svg"
                        alt="forward"
                        class="w-[60%]"
                    >
                </div>
            </div>
        </div>
        <div class="pt-[11%]">
            <div class="flex justify-center gap-5">
                <p v-for="type, index in pokemon.types" :class="`bg-[${pokemonTypesColors[index]}]`" class="rounded-3xl w-fit px-3 py-2 capitalize font-extrabold text-white">{{ type.type.name }}</p>
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
            <p class="px-8 text-sm py-6">{{ species.flavor_text_entries[0].flavor_text }}</p>
            <p class="text-center text-xl font-extrabold">Base Stats</p>
            <div class="px-8 text-sm pt-4">
                <div class="flex items-center" data-stat="HP" >
                    <p class="border-r border-slate-400 w-20 text-center pr-3">HP</p>
                    <p class="w-16 text-center">{{ pokemon.stats[0].base_stat }}</p>
                    <div :class="`w-full bg-[${pokemonTypeColor}] rounded-full h-2 bg-opacity-25`">
                        <div :class="`bg-[${pokemonTypeColor}] h-2 rounded-full w-[${pokemon.stats[0].base_stat/2}%]`"></div>
                    </div>
                </div>
                <div class="flex items-center" data-stat="ATK" >
                    <p class="border-r border-slate-400 w-20 text-center pr-3">ATK</p>
                    <p class="w-16 text-center">{{ pokemon.stats[1].base_stat }}</p>
                    <div :class="`w-full bg-[${pokemonTypeColor}] rounded-full h-2 bg-opacity-25`">
                        <div :class="`bg-[${pokemonTypeColor}] h-2 rounded-full w-[${pokemon.stats[1].base_stat/2}%]`"></div>
                    </div>
                </div>
                <div class="flex items-center" data-stat="DEF" >
                    <p class="border-r border-slate-400 w-20 text-center pr-3">DEF</p>
                    <p class="w-16 text-center">{{ pokemon.stats[2].base_stat }}</p>
                    <div :class="`w-full bg-[${pokemonTypeColor}] rounded-full h-2 bg-opacity-25`">
                        <div :class="`bg-[${pokemonTypeColor}] h-2 rounded-full w-[${pokemon.stats[2].base_stat/2}%]`"></div>
                    </div>
                </div>
                <div class="flex items-center" data-stat="SATK" >
                    <p class="border-r border-slate-400 w-20 text-center pr-3">SATK</p>
                    <p class="w-16 text-center">{{ pokemon.stats[3].base_stat }}</p>
                    <div :class="`w-full bg-[${pokemonTypeColor}] rounded-full h-2 bg-opacity-25`">
                        <div :class="`bg-[${pokemonTypeColor}] h-2 rounded-full w-[${pokemon.stats[3].base_stat/2}%]`"></div>
                    </div>
                </div>
                <div class="flex items-center" data-stat="SDEF" >
                    <p class="border-r border-slate-400 w-20 text-center pr-3">SDEF</p>
                    <p class="w-16 text-center">{{ pokemon.stats[4].base_stat }}</p>
                    <div :class="`w-full bg-[${pokemonTypeColor}] rounded-full h-2 bg-opacity-25`">
                        <div :class="`bg-[${pokemonTypeColor}] h-2 rounded-full w-[${pokemon.stats[4].base_stat/2}%]`"></div>
                    </div>
                </div>
                <div class="flex items-center" data-stat="SPD" >
                    <p class="border-r border-slate-400 w-20 text-center pr-3">SPD</p>
                    <p class="w-16 text-center">{{ pokemon.stats[5].base_stat }}</p>
                    <div :class="`w-full bg-[${pokemonTypeColor}] rounded-full h-2 bg-opacity-25`">
                        <div :class="`bg-[${pokemonTypeColor}] h-2 rounded-full w-[${pokemon.stats[5].base_stat/2}%]`"></div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
