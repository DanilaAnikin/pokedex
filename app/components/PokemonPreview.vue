<script setup lang="ts">
import { getPokemon } from '~~/store/pokemon';
import {type Pokemon, type PokemonData, typeColors, type TypeColorsKey} from "~~/types";
import {getPokemonId} from "~~/utils/pokemon";

const props = defineProps<{
  pokemon: Pokemon
}>();

const pokemonId = getPokemonId(props.pokemon)
/*
* Here you have to fetch pokemon in each card which may be slow and it created 150+ requests to pokeapi from the FE
* I would create an endpoint in the server directory (https://nuxt.com/docs/guide/directory-structure/server)
* Where I would first fetch all pokemons and then I would use Promise.all() to fetch all pokemon data and then return all of that to FE
* That would mean that you would have all of the data when rendering the page and wouldn't have to do this fetching inside every preview card
* */
const {data: pokemon} = await useAsyncData<PokemonData>(`pokemon-${pokemonId}`,() => getPokemon(pokemonId))
if(!pokemon.value){
  throw createError({
    statusCode: 404,
    statusMessage: "Pokemon not found",
    fatal: true
  })
}


const pokemonType = pokemon.value.types[0]!.type.name as TypeColorsKey
const pokemonTypeColor = typeColors[pokemonType] as string;
const pokemonTypesColors = pokemon.value.types.map((type) => typeColors[type.type.name as TypeColorsKey])
</script>

<template>
    <div
      v-if="pokemon"
      class="h-[120px] w-full rounded-2xl"
      :style="`background-color: ${pokemonTypeColor}`"
    >
        <div class="h-[60%]">
          <img
            class="w-full h-full"
            :src="`https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`"
            :alt="pokemon.name"
          >
        </div>
        <div class="flex justify-between pr-2">
            <div class="flex flex-col w-full px-3 text-slate-100 font-extrabold">
                <div class="">
                    <p class="text-sm">{{ pokemon.name }}</p>
                </div>
                <div class="">
                    <p class="text-xs h-2"># {{ pokemonId.toString().padStart(3, '0') }}</p>
                </div>
            </div>
            <div class="flex text-xs items-end h-10 gap-2">
                <div
                    v-for="(type, index) in pokemon.types"
                    :class="`w-fit h-fit shadow-inner shadow-slate-500 px-2 py-1 rounded-full`"
                    :style="`background-color: ${pokemonTypesColors[index]}`"
                >
                    {{ type.type.name }}
                </div>
            </div>
        </div>
    </div>
</template>