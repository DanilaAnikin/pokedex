import sqlite3 from 'sqlite3';
import axios from 'axios';

// Initialize SQLite database
const db = new sqlite3.Database('./pokemon_cache.db', (err) => {
  if (err) console.error(err.message);
  else console.log('Connected to SQLite database.');
});

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS pokemons (
      id INTEGER PRIMARY KEY,
      count INTEGER,
      next TEXT,
      previous TEXT,
      results TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS pokemon (
      id INTEGER PRIMARY KEY,
      name TEXT,
      details TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS pokemon_species (
      id INTEGER PRIMARY KEY,
      species TEXT
    )
  `);
});

const CACHE_DURATION = 3600 * 1000; // 1 hour in milliseconds

async function fetchPokemons() {
  const endpoint = 'https://pokeapi.co/api/v2/pokemon?limit=151';
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM pokemons', async (err, row) => {
      const now = Date.now();
      if (err) {
        return reject(err);
      } else {
        console.log('Fetched Pokemons:', row);
        resolve(row);
      }

      if (row && now - row.id < CACHE_DURATION) {
        console.log('Serving Pokémon list from cache');
        return resolve(JSON.parse(row.results));
      }

      try {
        const response = await axios.get(endpoint);
        const data = response.data;

        db.run(
          `INSERT INTO pokemons (id, count, next, previous, results) 
           VALUES (?, ?, ?, ?, ?) 
           ON CONFLICT(id) DO UPDATE SET count = excluded.count, next = excluded.next, previous = excluded.previous, results = excluded.results`,
          [now, data.count, data.next, data.previous, JSON.stringify(data.results)]
        );

        resolve(data.results);
      } catch (error) {
        reject(error);
      }
    });
  });
}

async function fetchPokemon(pokemonId) {
  const endpoint = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM pokemon WHERE id = ?', [pokemonId], async (err, row) => {
      if (err) return reject(err);

      if (row) {
        console.log(`Serving Pokémon ${pokemonId} details from cache`);
        return resolve(JSON.parse(row.details));
      }

      try {
        const response = await axios.get(endpoint);
        const data = response.data;

        db.run(
          `INSERT INTO pokemon (id, name, details) 
           VALUES (?, ?, ?) 
           ON CONFLICT(id) DO UPDATE SET name = excluded.name, details = excluded.details`,
          [pokemonId, data.name, JSON.stringify(data)]
        );

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  });
}

async function fetchPokemonSpecies(pokemonId) {
  const endpoint = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`;
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM pokemon_species WHERE id = ?', [pokemonId], async (err, row) => {
      if (err) return reject(err);

      if (row) {
        console.log(`Serving Pokémon species ${pokemonId} from cache`);
        return resolve(JSON.parse(row.species));
      }

      try {
        const response = await axios.get(endpoint);
        const data = response.data;

        db.run(
          `INSERT INTO pokemon_species (id, species) 
           VALUES (?, ?) 
           ON CONFLICT(id) DO UPDATE SET species = excluded.species`,
          [pokemonId, JSON.stringify(data)]
        );

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  });
}

function getPokemonImage(pokemonId) {
  return `https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
}

// Export all functions
export { fetchPokemons, fetchPokemon, fetchPokemonSpecies, getPokemonImage };
