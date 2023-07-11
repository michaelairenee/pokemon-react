export interface PokemonAbility {
  effect_entries: Effect[];
  name: string;
}

interface Effect {
  short_effect: string;
  language: {
    name: string;
  };
}
