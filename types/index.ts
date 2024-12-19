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
