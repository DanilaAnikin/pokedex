<script setup lang="ts">
import axios from 'axios';
import { type Pokemon } from '~~/types';

const pokemonResponse = await axios.get('http://localhost:3000/api/pokemons');
const pokemons = ref(pokemonResponse.data);

const searchInput = ref<string>("");
const numberChecked = ref<boolean>(false);
const nameChecked = ref<boolean>(true);

const handleSearch = async() => {
 const searchTerm = searchInput.value.toLowerCase();
 let filteredPokemons;
 pokemons.value = (await axios.get('http://localhost:3000/api/pokemons')).data;

 if (searchInput.value.length === 0) {
  filteredPokemons = pokemons.value;
 } else if(numberChecked.value) {
   filteredPokemons = pokemons.value.filter((pokemon: any) => {
    const pokemonId = pokemon.url.split("/")[6];
    return pokemonId?.startsWith(searchTerm);
   })
 } else if(nameChecked.value) {
   filteredPokemons = pokemons.value.filter((pokemon: any) => {
    return pokemon.name.toLowerCase().startsWith(searchTerm);
   })
 } else {
  filteredPokemons = pokemons.value;
 }

 pokemons.value = filteredPokemons;
}

// const redirect = (id: number) => window.location.pathname = id.toString();

</script>

<template>
    <main class="">
      <header class="">
        <div class="">
          <div class="bg-slate-500">
            <img src="../img/pokeball.svg" alt="pokeball" />
            <h1>Pokedex</h1>
          </div>
          <div class="">
            <div class="">
              <img src="../img/search.svg" @click="handleSearch()" />
              <input v-model="searchInput" @keyup="handleSearch()" type="text" v-on:keyup.enter="handleSearch()" class="" placeholder="Search" id="search-input" />
              <img src="../img/cross.svg" @click="searchInput=''; handleSearch()" alt="cross icon" class="" id="search-close-icon" />
            </div>
            <div class="">
              <div class="">
                <img src="../img/sorting.svg" alt="sorting icon" class="" id="sort-icon" />
              </div>
              <div class="">
                <p class=""> Sort by:</p>
                <div class="">
                  <div>
                    <input @click="numberChecked=true; nameChecked=false" type="radio" id="number" name="filters" value="number" checked>
                    <label for="number" class="">Number</label>
                  </div>
                  <div>
                    <input @click="numberChecked=false; nameChecked=true" type="radio" id="name" name="filters" value="name" checked>
                    <label for="number" class="">Name</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section class="">
        <div class="">
          <div class="">

          </div>
        </div>
        <div v-if="pokemons.length === 0" class="">
          Pokemon not found
        </div>
        <div v-if="pokemons.length != 0" v-for="pokemon in pokemons" @click="navigateTo(`./pokemon/${pokemon.url.split('/')[6]}`)" >
          <div class="">
            <p class="">{{ pokemon.url.split("/")[6] }}</p>
          </div>
          <div class="">
            <img
              :src="`https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemon.url.split('/')[6]}.svg`"
              :alt="pokemon.name"
            >
          </div>
          <div class="">
            <p class="">{{ pokemon.name }}</p>
          </div>
        </div>
      </section>
    </main>
</template>