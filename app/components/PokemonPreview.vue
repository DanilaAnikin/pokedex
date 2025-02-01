<script setup lang="ts">
import { ref, watch } from "vue";
import { type PokemonData, typeColors, type TypeColorsKey } from "~~/types";

const props = defineProps<{
  pokemon: PokemonData;
}>();

// Reactive properties
const pokemonId = ref<number>(props.pokemon.id);
const pokemonType = ref<TypeColorsKey>(props.pokemon.types[0]!.name as TypeColorsKey);
const pokemonTypeColor = ref<string>(typeColors[pokemonType.value] as string);
const pokemonTypesColors = ref<string[]>(
  props.pokemon.types.map((type) => typeColors[type.name as TypeColorsKey]) || []
);

// Watch for changes in the pokemon prop
watch(
  () => props.pokemon,
  (newPokemon) => {
    if (!newPokemon) return;
    pokemonId.value = newPokemon.id;
    pokemonType.value = newPokemon.types[0]!.name as TypeColorsKey;
    pokemonTypeColor.value = typeColors[pokemonType.value] as string;
    pokemonTypesColors.value = newPokemon.types.map((type) => typeColors[type.name as TypeColorsKey]) || [];
  },
  { immediate: true, deep: true }
);

// Throw an error if pokemon is not provided
if (!props.pokemon) {
  throw createError({
    statusCode: 404,
    statusMessage: "Pokemon not found",
    fatal: true,
  });
}
</script>

<template>
  <div
    v-if="pokemon"
    class="h-[120px] w-full rounded-2xl"
    :style="`background-color: ${pokemonTypeColor}`"
  >
    <div class="h-[60%] -mt-2">
      <img
        :src="`https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`"
        :alt="pokemon.name"
        class="w-full h-full"
      />
    </div>
    <div class="flex justify-between pr-2">
      <div class="flex flex-col w-full px-3 text-slate-100 font-extrabold">
        <div class="">
          <p class="text-sm">{{ pokemon.name }}</p>
        </div>
        <div class="">
          <p class="text-xs h-2"># {{ pokemonId.toString().padStart(3, "0") }}</p>
        </div>
      </div>
      <div class="flex flex-wrap text-xs items-end gap-1">
        <div
          v-for="(type, index) in pokemon.types"
          class="w-fit h-fit shadow-inner shadow-slate-300 text-slate-100 py-0.5 px-1 rounded-full"
          :style="`background-color: ${pokemonTypesColors[index]}`"
        >
          {{ type.name }}
        </div>
      </div>
    </div>
  </div>
</template>
