<script setup lang="ts">
import { ref } from 'vue';

<<<<<<< HEAD
const {data: pokemons} = await useFetch('/api/all')

if(!pokemons.value){
=======
const { data: pokemons } = await useAsyncData<Pokemon[]>(() => getAllPokemons());
if(!pokemons.value) {
>>>>>>> cdf95b2 (should work)
  throw createError({
    fatal: true
  })
}

const visiblePokemons = ref(pokemons.value);

const searchInput = ref<string>("");
const handleSearch = async () => {
  const searchTerm = searchInput.value.toLowerCase();
  let filteredPokemons;

  if (searchInput.value.length === 0) {
    filteredPokemons = pokemons.value;
  } else {
    filteredPokemons = pokemons.value!.filter((pokemon: any) => {
      return pokemon.name.toLowerCase().startsWith(searchTerm);
    });
  }

  visiblePokemons.value = filteredPokemons;
};

</script>

<template>
  <main class="bg-[#DC0A2D] pb-1 h-full w-full">
    <header>
      <div class="flex flex-col justify-center w-full items-center">
        <div class="flex text-white gap-6 text-4xl font-extrabold pt-5 px-6 items-center max-w-md w-full">
          <img src="../img/pokeball.svg" alt="pokeball" class="w-9 h-9" />
          <h1>Pokédex</h1>
        </div>
        <div class="pt-4 flex items-center gap-6 justify-center max-w-[420px] w-[98%]">
          <div class="bg-white flex rounded-3xl px-4 py-2 shadow-md justify-between gap-4 items-center w-[80%]">
            <img src="../img/search.svg" @click="handleSearch" class="w-5 h-5 cursor-pointer" />
            <input v-model="searchInput" @keyup="handleSearch" class="w-full placeholder:text-sm placeholder:font-extrabold outline-none" type="text" placeholder="Search" id="search-input" />
            <img v-if="searchInput !== ''" src="../img/cross.svg" @click="searchInput = ''; handleSearch()" alt="cross icon" class="h-4 w-4 cursor-pointer" id="search-close-icon" />
          </div>
        </div>
      </div>
    </header>
    <div class="flex justify-center w-full">
    <div class="w-[80%] flex justify-center">
      <section class="flex justify-center my-4 mx-1 rounded-xl max-w-fit w-full">
        <div v-if="visiblePokemons.length === 0" class="p-4">
          Pokemon not found
        </div>
        <div v-if="visiblePokemons.length > 0" class="flex flex-wrap w-full justify-center rounded-xl">
          <div
            v-for="pokemon in visiblePokemons"
            @click="navigateTo(`/pokemon/${pokemon.id}`)"
            class="p-1 rounded-xl max-w-[226px] min-w-[173px] w-full h-fit cursor-pointer"
          >
            <PokemonPreview :pokemon="pokemon" class="flex flex-col w-full" />
          </div>
        </div>
      </section>
    </div>
<<<<<<< HEAD
  </div>
  </main>
</template>
=======
  </main>
</template>
>>>>>>> cdf95b2 (should work)
