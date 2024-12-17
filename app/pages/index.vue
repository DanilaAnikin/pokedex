<script setup lang="ts">
const MAX_POKEMON = 151;

const all_pokemons = [];


</script>

<template>
    <main class="main">
      <header class="header-home">
        <div class="container">
          <div class="logo-wrapper bg-slate-500">
            <img src="../img/pokeball.svg" alt="pokeball" />
            <h1>Pokedex</h1>
          </div>
          <div class="search-wrapper">
            <div class="search-wrap">
              <img src="../img/search.svg" />
              <input type="text" class="search-input body3-fonts" placeholder="Search" id="search-input" />
              <img src="../img/cross.svg" alt="cross icon" class="search-close-icon" id="search-close-icon" />
            </div>
            <div class="sort-wrapper">
              <div class="sort-wrap">
                <img src="../img/sorting.svg" alt="sorting icon" class="sort-icon" id="sort-icon" />
              </div>
              <div class="filter-wrapper">
                <p class="body2-fonts"> Sort by:</p>
                <div class="filter-wrap">
                  <div>
                    <input type="radio" id="number" name="filters" value="number" checked>
                    <label for="number" class="body3-fonts">Number</label>
                  </div>
                  <div>
                    <input type="radio" id="name" name="filters" value="name" checked>
                    <label for="number" class="body3-fonts">Name</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section class="pokemon-list">
        <div class="container">
          <div class="list-wrapper">

          </div>
        </div>
        <div class="not-found-message">
          Pokemon not found
        </div>
      </section>
    </main>
</template>