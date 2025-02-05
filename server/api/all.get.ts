import prisma from "~~/lib/prisma";
export default defineEventHandler(async() => {
    return prisma.pokemon.findMany({
        include: {
            abilities: true,
            stats: true,
            types: true
        }
    })
})
