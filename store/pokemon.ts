import { type Pokemons } from '../types/index';

export const getAllPokemons = async() => {
    const MAX_POKEMON: number = 151;
    const response: Pokemons = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`).then((response) => response.json());
    
    return response.results;
}
