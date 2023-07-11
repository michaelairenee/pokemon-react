import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const getListPokemon = (limit: number, offset: number) => {
  return api.get(`/pokemon?limit=${limit}&offset=${offset}`);
};

export const getDetailPokemon = (id: string | undefined) => {
  return api.get(`/pokemon/${id}`);
};

export const getAbilityPokemon = (id: string | undefined) => {
  return api.get(`/ability/${id}`);
};
