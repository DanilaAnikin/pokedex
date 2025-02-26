import express from 'express';
import cors from 'cors';
import { fetchPokemons, fetchPokemon, fetchPokemonSpecies, getPokemonImage } from '../cache.js';

const app = express();
const PORT = 3000;

app.use(cors());

// Route to fetch all Pokémon
app.get('/pokemons', async (req, res) => {
  try {
    const pokemons = await fetchPokemons();
    res.json(pokemons);
  } catch (error) {
    console.error('Error fetching Pokemons:', error);
    res.status(500).json({ error: 'Error fetching Pokemons' });
  }
});

// Route to fetch a specific Pokémon by ID
app.get('/pokemon/:id', async (req, res) => {
  const pokemonId = req.params.id;
  try {
    const pokemon = await fetchPokemon(pokemonId);
    const imageUrl = getPokemonImage(pokemonId);
    res.json({ ...pokemon, imageUrl });
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch details for Pokémon ${pokemonId}.` });
  }
});

// Route to fetch Pokémon species by ID
app.get('/pokemon-species/:id', async (req, res) => {
  const pokemonId = req.params.id;
  try {
    const species = await fetchPokemonSpecies(pokemonId);
    res.json(species);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch species for Pokémon ${pokemonId}.` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});