export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: {
    ability: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

interface PokemonFromList {
  name: string;
  url: string;
}

export interface Pokemons {
  count: number;
  next: string;
  previous: string;
  results: PokemonFromList[];
}
