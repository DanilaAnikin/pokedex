<script setup lang="ts">
import { getAllPokemons } from '~~/store/pokemon';
import { type Pokemon } from '~~/types';

const pokemons = ref<Pokemon[]>(await getAllPokemons());
const searchInput = ref<string>("");
const numberChecked = ref<boolean>(false);
const nameChecked = ref<boolean>(true);
const sortingOpened = ref<boolean>(false);

const handleSearch = async() => {
 const searchTerm = searchInput.value.toLowerCase();
 let filteredPokemons;
 pokemons.value = await getAllPokemons();

 if (searchInput.value.length === 0) {
  filteredPokemons = pokemons.value;
 } else if(numberChecked.value) {
   filteredPokemons = pokemons.value.filter((pokemon) => {
    const pokemonId = pokemon.url.split("/")[6];
    return pokemonId?.startsWith(searchTerm);
   })
 } else if(nameChecked.value) {
   filteredPokemons = pokemons.value.filter((pokemon) => {
    return pokemon.name.toLowerCase().startsWith(searchTerm);
   })
 } else {
  filteredPokemons = pokemons.value;
 }

 pokemons.value = filteredPokemons;
}
</script>

<template>
    <main class="bg-[#DC0A2D] pb-1 h-full w-full">
      <header class="">
        <div class="flex flex-col justify-center w-full items-center">
          <div class="flex text-white gap-6 text-4xl font-extrabold pt-5 px-6 items-center max-w-md w-full">
            <img src="../img/pokeball.svg" alt="pokeball" class="w-9 h-9" />
            <h1>Pokédex</h1>
          </div>
          <div class="pt-4 flex items-center gap-6 justify-between max-w-[420px] w-[98%]">
            <div class="bg-white flex rounded-3xl px-4 py-2 shadow-md justify-between gap-4 items-center w-[80%]">
              <img src="../img/search.svg" @click="handleSearch()" class="w-5 h-5" />
              <input v-model="searchInput" @keyup="handleSearch()" class="w-full placeholder:text-sm placeholder:font-extrabold outline-none" type="text" v-on:keyup.enter="handleSearch()" placeholder="Search" id="search-input" />
              <img v-if="searchInput !== ''" src="../img/cross.svg" @click="searchInput=''; handleSearch()" alt="cross icon" class="h-4 w-4" id="search-close-icon" />
            </div>
            <div class="flex flex-col items-center">
              <div @click="sortingOpened = !sortingOpened" class="bg-white cursor-pointer rounded-full p-2 w-10 h-10">
                <img src="../img/sorting.svg" alt="sorting icon" class="h-6 w-6" id="sort-icon" />
              </div>
              <div v-if="sortingOpened" class="shadow-inner shadow-slate-500 bg-white px-1 py-1 w-fit rounded-lg absolute mr-8 -mt-4 font-extrabold text-red-950">
                <div class="flex items-center gap-2">
                  <img @click="sortingOpened = false" src="../img/cross.svg" class="h-3 w-3 cursor-pointer">  
                  <p class="text-sm flex justify-between items-center w-full">Sort</p>
                </div>
                  <div class="">
                  <div class="flex gap-1 cursor-pointer">
                    <input @click="numberChecked=true; nameChecked=false" type="radio" id="number" name="filters" value="number" checked>
                    <label for="number" class="text-xs">Number</label>
                  </div>
                  <div class="flex gap-1 cursor-pointer">
                    <input @click="numberChecked=false; nameChecked=true" type="radio" id="name" name="filters" value="name" checked>
                    <label for="number" class="text-xs">Name</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div class="w-full flex justify-center">
      <section class="flex justify-center my-4 mx-1 bg-white rounded-xl max-w-[680px] w-[98%]">
        <div class="">
          <div class="">

          </div>
        </div>
        <div v-if="pokemons.length === 0" class="">
          Pokemon not found
        </div>
        <div v-if="pokemons.length > 0" class="flex flex-wrap w-full justify-center rounded-xl">
          <div v-for="pokemon in pokemons" @click="navigateTo(`./pokemon/${pokemon.url.split('/')[6]}`)" class="p-1 rounded-xl mt-2 max-w-[226px] w-[50%] h-fit cursor-pointer">
            <PokemonPreview :id="parseInt(pokemon.url.split('/')[6]!)" :img="pokemon.url" :name="pokemon.name" class="flex flex-col w-full" />
          </div>
        </div>
        </section>
        </div>
    </main>
</template>