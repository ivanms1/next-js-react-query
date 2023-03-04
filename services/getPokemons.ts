import { Pokemons } from "@types";

export async function getPokemons(): Promise<Pokemons> {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
  );
  const data = await response.json();
  return data;
}
