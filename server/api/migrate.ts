import prisma from '../../lib/prisma'
import {Ability, Pokemon, Stat, Type} from "@prisma/client";

export default defineEventHandler(async() => {
    await prisma.pokemon.deleteMany();
    const limit = 100;
    const endpoint = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
    const response = await $fetch(endpoint);
    const data = response.results;

    for(const poke of data){
        const pokemonResponse = await $fetch(poke.url)

        const pokemonToCreate: Pokemon = {
            id: pokemonResponse.id,
            name: pokemonResponse.name,
            order: pokemonResponse.order,
            baseExperience: pokemonResponse.base_experience,
            height: pokemonResponse.height,
            weight: pokemonResponse.weight,
            isDefault: pokemonResponse.is_default,
            locationAreaEncounter: pokemonResponse.location_area_encounters,
            speciesName: pokemonResponse.species.name,
            speciesUrl: pokemonResponse.species.url,
        }

        const stats: Stat[] = pokemonResponse.stats.map(s => ({
            baseStat: s.base_stat,
            effort: s.effort,
            name: s.stat.name,
            url: s.stat.url,
        }))

        const types: Type[] = pokemonResponse.types.map(t => ({
            slot: t.slot,
            name: t.type.name,
            url: t.type.url
        }))

        const abilities: Ability[] = pokemonResponse.abilities.map(a => ({
            name: a.ability.name,
            url: a.ability.url,
            isHidden: a.is_hidden,
            slot: a.slot
        }))

        await prisma.pokemon.create({
            data: {
                ...pokemonToCreate,
                stats: {
                    createMany: {
                        data: stats
                    }
                },
                types: {
                    createMany: {
                        data: types
                    }
                },
                abilities: {
                    createMany: {
                        data: abilities
                    }
                }
            }
        })
    }

    const inserted = await prisma.pokemon.count()
    return {
        limit,
        inserted,
        success: limit === inserted
    }
})
