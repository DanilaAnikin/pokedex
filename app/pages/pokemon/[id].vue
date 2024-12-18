<script setup lang="ts">
import { getPokemon } from '~~/store/pokemon';
import type { PokemonData } from '~~/types';
import { useRoute } from 'vue-router';

const id = ref<number>(parseInt(useRoute().path.split('/')[2]!));
const pokemon = ref(getPokemon(id.value));
console.log(pokemon);
</script>

<template>
    <main class="">
        <header class="">
            <div class="">
                <div class="">
                    <a href="./index.vue" class="">
                        <img
                            src="../../img/back-to-home.svg"
                            alt="back to home"
                            class=""
                            id="back-btn"
                        >
                    </a>
                    <div class="">
                        <h1 class=""></h1>
                    </div>
                </div>
                <div class="">
                    <p class=""></p>
                </div>
            </div>
        </header>
        <div class="">
            <a href="#" class="" id="left-arrow">
                <img
                    src="../../img/chevron_left.svg"
                    alt="back"
                >
            </a>
            <div class="">
                <img src="" alt="">
            </div>
            <div @click="navigateTo(`pokemon/${id+1}`)" class="">
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
