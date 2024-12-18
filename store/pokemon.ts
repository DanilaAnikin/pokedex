import { type Pokemons } from '../types/index';

export const getAllPokemons = async() => {
    const MAX_POKEMON: number = 151;
    const response: Pokemons = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`).then((response) => response.json());
    
    return response.results;
}

export const getPokemon = async(id: number) => {
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json());
    return pokemon;
}

export const getSpecies = async(id: number) => {
    const pokemonSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(res => res.json());
    return pokemonSpecies;
}