export interface PokemonDetail {
  name: string;
  height: number;
  weight: number;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  types: Type[];
  stats: Stat[];
  abilities: Ability[];
}

interface Type {
  type: {
    name: string;
  };
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
  };
}

interface Ability {
  ability: {
    name: string;
    url: string;
  };
}
