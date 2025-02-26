// test-pokeapi.js
import axios from 'axios';

async function testPokeAPI() {
  const endpoint = 'https://pokeapi.co/api/v2/pokemon?limit=151';
  try {
    const response = await axios.get(endpoint);
    console.log('PokeAPI response:', response.data);
  } catch (error) {
    console.error('Error fetching from PokeAPI:', error.message);
  }
}

testPokeAPI();