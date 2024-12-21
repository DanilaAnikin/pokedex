<script setup lang="ts">
import { getPokemon } from '~~/store/pokemon';

const props = defineProps<{
    id: number,
    img: string,
    name: string,
}>();

const pokemon = ref(await getPokemon(props.id));

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
</script>

<template>
    <div class="h-[120px] w-full rounded-2xl" :style="`background-color: ${pokemonTypeColor}`">
        <div class="h-[60%]">
            <img
            :src="`https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`"
            :alt="pokemon.name"
            class="w-full h-full"
            >
        </div>
        <div class="flex justify-between pr-2">
            <div class="flex flex-col w-full px-3 text-slate-100 font-extrabold">
                <div class="">
                    <p class="text-sm">{{ name }}</p>
                </div>
                <div class="">
                    <p class="text-xs h-2"># {{ id < 10 ? '00' : id < 100 ? '0' : '' }}{{ id }}</p>
                </div>
            </div>
            <div class="flex text-xs items-end h-10 gap-2">
                <div v-for="type, index in pokemon.types" :class="`w-fit h-fit shadow-inner shadow-slate-500 px-2 py-1 rounded-full`" :style="`background-color: ${pokemonTypesColors[index]}`">
                    {{ type.type.name }}
                </div>
            </div>
        </div>
    </div>
</template>