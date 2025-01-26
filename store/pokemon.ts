import { type Pokemons } from '~~/types';

export const getAllPokemons = async() => {
    const MAX_POKEMON: number = 100;
    const response: Pokemons = await $fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`);
    return response.results;
}

export const getPokemon = async(id: number) => {
    return $fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
}

export const getSpecies = async(id: number) => {
    return $fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
}
