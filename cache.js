import sqlite3 from 'sqlite3';
import axios from 'axios';

// Initialize SQLite database
const db = new sqlite3.Database('./pokemon_cache.db', (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS pokemons (
      id INTEGER PRIMARY KEY,
      count INTEGER,
      next TEXT,
      previous TEXT,
      results TEXT,
      timestamp INTEGER
    )
  `, (err) => {
    if (err) console.error('Error creating pokemons table:', err.message);
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS pokemon (
      id INTEGER PRIMARY KEY,
      name TEXT,
      details TEXT
    )
  `, (err) => {
    if (err) console.error('Error creating pokemon table:', err.message);
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS pokemon_species (
      id INTEGER PRIMARY KEY,
      species TEXT
    )
  `, (err) => {
    if (err) console.error('Error creating pokemon_species table:', err.message);
  });
});

async function fetchPokemons() {
  const endpoint = 'https://pokeapi.co/api/v2/pokemon?limit=151';

  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM pokemons', async (err, row) => {
      const now = Date.now();
      if (err) {
        console.error('Database error (SELECT):', err.message);
        return reject(err);
      }

      let retries = 3;
      while (retries > 0) {
        try {
          console.log('Making request to PokeAPI...');
          const response = await axios.get(endpoint);
          console.log('PokeAPI response:', response.status, response.statusText);
          const data = response.data;

          // Fetch detailed data for each Pokémon
          const detailedPokemons = await Promise.all(
            data.results.map(async (pokemon) => {
              const pokemonResponse = await axios.get(pokemon.url);
              return pokemonResponse.data;
            })
          );

          db.run(
            `INSERT INTO pokemons (id, count, next, previous, results, timestamp) 
             VALUES (?, ?, ?, ?, ?, ?) 
             ON CONFLICT(id) DO UPDATE SET count = excluded.count, next = excluded.next, previous = excluded.previous, results = excluded.results, timestamp = excluded.timestamp`,
            [1, data.count, data.next, data.previous, JSON.stringify(detailedPokemons), now],
            (err) => {
              if (err) {
                console.error('Database error (INSERT/UPDATE):', err.message);
                return reject(err);
              }
              console.log('Pokémon list fetched and cached successfully');
              resolve(detailedPokemons);
            }
          );
          break;
        } catch (error) {
          console.error(`Error fetching Pokémon list from PokeAPI (${retries} retries left):`, error.message);
          retries--;
          if (retries === 0) {
            reject(error);
          }
        }
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

process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Closed the database connection.');
    process.exit(0);
  });
});

export { fetchPokemons, fetchPokemon, fetchPokemonSpecies, getPokemonImage };