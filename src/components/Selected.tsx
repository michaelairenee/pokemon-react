import { PokemonDetail } from "../types/detail";
import { Pokemon } from "../types/pokemon";
import { capitalization, getPokemonId } from "../utils/utils";
import { Table } from "./Table";

interface Default {
  title: string;
}

interface Selected {
  data: Pokemon;
  detail: PokemonDetail | null;
}

const SelectedDefault = ({ title }: Default) => {
  return (
    <div className="flex items-center justify-center w-full h-60 bg-gray-200">
      <div className="font-semibold">{title}</div>
    </div>
  );
};

const Selected = ({ data, detail }: Selected) => {
  return (
    <div className="block">
      <div className="flex items-center justify-center w-full">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(
            data.url
          )}.png`}
          alt={data.name}
        />
      </div>
      <div className="text-center font-semibold">
        {capitalization(data.name)}
      </div>
      <div className="mt-4">
        {detail && <Table stats={detail.stats} width="w-full" />}
      </div>
    </div>
  );
};

export { Selected, SelectedDefault };
