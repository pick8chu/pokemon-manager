import { PokemonInfo } from '../component/PokemonCard';
import { API } from './api';

export const getPokemonCount = async (name: string) => {
  const response = await API.get('/pokemon/count', {
    params: {
      name: name ? name : null,
    },
  });
  console.log(parseInt(response.data.count as string));
  return parseInt(response.data.count as string);
};

export const getPokemons = async (name: string, page: number, limit: number) => {
  const response = await API.get('/pokemon', {
    params: {
      name: name ? name : null,
      page,
      limit,
    },
  });
  // console.log(response.data);
  return response.data;
};

export const createPokemon = async (pokemon: PokemonInfo) => {
  const response = await API.post('/pokemon', pokemon);
  return response.data;
};

export const removePokemon = async (id: string) => {
  const response = await API.delete(`/pokemon/${id}`);
  return response.data;
};
