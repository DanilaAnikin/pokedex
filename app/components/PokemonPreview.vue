<script setup lang="ts">
import { getPokemon } from '~~/store/pokemon';
import { type Pokemon, type PokemonData, typeColors, type TypeColorsKey } from "~~/types";
import { getPokemonId } from "~~/utils/pokemon";

const props = defineProps<{
    pokemon: Pokemon,
}>();

const pokemonId = getPokemonId(props.pokemon);
const { data: pokemon } = await useAsyncData<PokemonData>(`pokemon-${pokemonId}`, () => getPokemon(pokemonId) as Promise<PokemonData>)
if (!pokemon.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Pokemon not found",
    fatal: true,
  });
}

const pokemonType = pokemon.value.types[0]!.type.name as TypeColorsKey;
const pokemonTypeColor = typeColors[pokemonType] as string;
const pokemonTypesColors = pokemon.value.types.map((type) => typeColors[type.type.name as TypeColorsKey]);
</script>

<template>
  <div 
    v-if="pokemon" 
    class="rounded-xl shadow-md transform transition duration-300 hover:scale-105 overflow-hidden cursor-pointer"
    :style="`background-color: ${pokemonTypeColor}`"
  >
    <div class="flex justify-center items-center p-4">
      <img
        :src="`https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`"
        :alt="pokemon.name"
        class="w-24 h-24 object-contain"
      />
    </div>
    <div class="px-4 pb-4">
      <div class="flex flex-col justify-between items-center">
        <h2 class="text-lg font-bold capitalize text-white">{{ pokemon.name }}</h2>
        <span class="text-sm text-white">#{{ pokemonId.toString().padStart(3, '0') }}</span>
      </div>
      <div class="flex space-x-2 mt-2">
        <span 
          v-for="(type, index) in pokemon.types" 
          :key="index" 
          class="px-2 py-1 text-xs rounded-full text-white shadow"
          :style="`background-color: ${pokemonTypesColors[index]}`"
        >
          {{ type.type.name }}
        </span>
      </div>
    </div>
  </div>
</template>
