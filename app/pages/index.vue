<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { type Pokemon } from '~~/types';
import { getPokemonId } from '~~/utils/pokemon';

// Fetch Pokémon list from the Express server
const pokemonsResponse = await axios.get('http://localhost:3000/pokemons').catch((error) => {
  console.error('Error fetching Pokémon list:', error);
  throw createError({
    statusCode: 500,
    statusMessage: "Failed fetching Pokémon list",
    fatal: true,
  });
});

const pokemons = ref(pokemonsResponse?.data || [
  { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
  { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
]);

if (pokemons.value.length === 0) {
  console.warn('No Pokémon data found.');
}
const searchInput = ref<string>("");
const numberChecked = ref<boolean>(false);
const nameChecked = ref<boolean>(true);
const sortingOpened = ref<boolean>(false);

const handleSearch = async () => {
  const searchTerm = searchInput.value.toLowerCase();
  let filteredPokemons;

  if (searchInput.value.length === 0) {
    filteredPokemons = pokemons.value;
  } else if (numberChecked.value) {
    filteredPokemons = pokemons.value.filter((pokemon: any) => {
      const pokemonId = pokemon.url.split("/")[6];
      return pokemonId?.startsWith(searchTerm);
    });
  } else if (nameChecked.value) {
    filteredPokemons = pokemons.value.filter((pokemon: any) => {
      return pokemon.name.toLowerCase().startsWith(searchTerm);
    });
  } else {
    filteredPokemons = pokemons.value;
  }

  visiblePokemons.value = filteredPokemons;
};

const visiblePokemons = ref<Pokemon[]>(pokemons.value);
</script>

<template>
  <main class="bg-[#DC0A2D] pb-1 h-full w-full">
    <header>
      <div class="flex flex-col justify-center w-full items-center">
        <div class="flex text-white gap-6 text-4xl font-extrabold pt-5 px-6 items-center max-w-md w-full">
          <img src="../img/pokeball.svg" alt="pokeball" class="w-9 h-9" />
          <h1>Pokédex</h1>
        </div>
        <div class="pt-4 flex items-center gap-6 justify-between max-w-[420px] w-[98%]">
          <div class="bg-white flex rounded-3xl px-4 py-2 shadow-md justify-between gap-4 items-center w-[80%]">
            <img src="../img/search.svg" @click="handleSearch" class="w-5 h-5 cursor-pointer" />
            <input v-model="searchInput" @keyup="handleSearch" class="w-full placeholder:text-sm placeholder:font-extrabold outline-none" type="text" placeholder="Search" id="search-input" />
            <img v-if="searchInput !== ''" src="../img/cross.svg" @click="searchInput = ''; handleSearch()" alt="cross icon" class="h-4 w-4 cursor-pointer" id="search-close-icon" />
          </div>
          <div class="flex flex-col items-center">
            <div @click="sortingOpened = !sortingOpened" class="bg-white cursor-pointer rounded-full p-2 w-10 h-10">
              <img src="../img/sorting.svg" alt="sorting icon" class="h-6 w-6" id="sort-icon" />
            </div>
            <div v-if="sortingOpened" class="shadow-inner shadow-slate-500 bg-white px-1 py-1 w-fit rounded-lg absolute mr-8 -mt-4 font-extrabold text-red-950">
              <div class="flex items-center gap-2">
                <img @click="sortingOpened = false" src="../img/cross.svg" class="h-3 w-3 cursor-pointer" />
                <p class="text-sm flex justify-between items-center w-full">Sort</p>
              </div>
              <div>
                <div class="flex gap-1 cursor-pointer">
                  <input @click="numberChecked = true; nameChecked = false" type="radio" id="number" name="filters" value="number" />
                  <label for="number" class="text-xs">Number</label>
                </div>
                <div class="flex gap-1 cursor-pointer">
                  <input @click="numberChecked = false; nameChecked = true" type="radio" id="name" name="filters" value="name" />
                  <label for="name" class="text-xs">Name</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="w-full flex justify-center">
      <section class="flex justify-center my-4 mx-1 bg-white rounded-xl max-w-[680px] w-[98%]">
        <div v-if="visiblePokemons.length === 0" class="p-4">
          Pokemon not found
        </div>
        <div v-if="visiblePokemons.length > 0" class="flex flex-wrap w-full justify-center rounded-xl">
          <div
            v-for="pokemon in visiblePokemons"
            @click="navigateTo(`/pokemon/${getPokemonId(pokemon)}`)"
            class="p-1 rounded-xl mt-2 max-w-[226px] w-[50%] h-fit cursor-pointer"
          >
            <PokemonPreview :pokemon="pokemon" class="flex flex-col w-full" />
          </div>
        </div>
      </section>
    </div>
  </main>
</template>