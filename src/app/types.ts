export type PokemonQueryType = 'Water' | 'Fire' | 'Grass';
export type PokemonQueryItem = {
  number_i: number;
  height_s: string;
  description_t: string;
  title_s: string;
  weight_s: string;
  image_s?: string;
  type_o: { item: { value_smv: PokemonQueryType }[] };
};
export type PokemonQueryData = {
  component_pokemon: { items: PokemonQueryItem[] };
};
