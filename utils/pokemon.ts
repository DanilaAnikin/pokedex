import type {Pokemon} from "~~/types";

/**
 * Gets pokemon ID from the URL property on pokemon
 * @param pokemon
 * @throws Invalid Pokemon ID
 * @returns id - number
 */
export function getPokemonId(pokemon: Pokemon): number{
    const pokemonId = Number(pokemon.url.split('/')[6])

    if(isNaN(pokemonId)){
        throw createError({
            statusCode: 500,
            statusMessage: "Invalid pokemon ID",
            fatal: true
        })
    }

    return pokemonId
}