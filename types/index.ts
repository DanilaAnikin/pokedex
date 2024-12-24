export interface Pokemons {
    count: number,
    next: string,
    previous?: string | null,
    results: Pokemon[],
}

export interface Pokemon {
    name: string,
    url: string,
}

export interface PokemonData {
    abilities: Ability[],
    base_experience: number,
    cries: {
        latest: string,
        legacy: string,
    },
    forms: Pokemon[],
    game_indices: Game_Indices[],
    height: number,
    held_items: [],
    id: number,
    is_default: boolean,
    location_area_encounters: string,
    moves: Move[],
    name: string,
    order: number,
    past_abilities: [],
    past_types: [],
    species: Pokemon,
    sprites: {},
    stats: Stat[],
    types: Type[],
    weight: number,
}

export interface Ability {
    ability: {
        name: string,
        url: string,
    },
    is_hidden: boolean,
    slot: number,
}

export interface Game_Indices {
    game_index: number,
    version: Pokemon,
}

export interface Move {
    move: Pokemon,
    version_group_details: Version_Group_Detail[],
}

export interface Version_Group_Detail {
    level_learned_at: number,
    move_learn_method: Pokemon,
    version_group: Pokemon,
}

export interface Stat {
    base_stat: number,
    effort: number,
    stat: Pokemon,
}

export interface Type {
    slot: number,
    type: Pokemon,
}

export const typeColors = {
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
}

export type TypeColorsKey = keyof typeof typeColors;

export interface PokemonSpecies {
    base_happiness: number,
    capture_rate: number,
    color: string,
    egg_groups: Pokemon[],
    evolution_chain: { url: string },
    flavor_text_entries: FlavorTextEntry[],
    form_descriptions: [],
    forms_switchable: boolean,
    gender_rate: number,
    genera: Genus[],
    generation: Pokemon,
    growth_rate: Pokemon,
    habitat: Pokemon,
    hatch_gender_differences: boolean,
    hatch_counter: number,
    id: number,
    is_baby: boolean,
    is_legendary: boolean,
    is_mythical: boolean,
    name: string,
    names: SpeciesNames[],
    order: number,
    pal_park_encounters: PalParkEncounter[],
    pokedex_numbers: PokedexNumber[],
    shape: Pokemon,
    varieties: Variety[],
}

interface FlavorTextEntry {
    flavor_text: string,
    language: Pokemon,
    version: Pokemon,
}

interface Genus {
    genus: string,
    language: Pokemon,
}

interface SpeciesNames {
    language: Pokemon,
    name: string,
}

interface PalParkEncounter {
    area: Pokemon,
    base_score: number,
    rate: number,
}

interface PokedexNumber {
    entry_number: number,
    pokedex: Pokemon,
}

interface Variety {
    is_default: boolean,
    pokemon: Pokemon,
}