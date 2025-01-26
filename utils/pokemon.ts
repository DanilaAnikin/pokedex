import type { Pokemon } from "~~/types";

export function getPokemonId(pokemon: Pokemon): number{
    const pokemonId = Number(pokemon.url.split('/')[6])

    if(isNaN(pokemonId)){
        throw createError({
            statusCode: 500,
            statusMessage: "Invalid pokemon ID",
            fatal: true,
        });
    }

    return pokemonId
}