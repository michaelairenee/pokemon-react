import { useEffect, useState } from "react";
import Header from "../template/Header";
import { getAbilityPokemon, getDetailPokemon } from "../api/api";
import { useLocation } from "react-router-dom";
import { PokemonDetail } from "../types/detail";
import { capitalization, getPokemonId } from "../utils/utils";
import { PokemonAbility } from "../types/ability";
import { Table } from "../components/Table";

const iDetail = {
  name: "",
  height: 0,
  weight: 0,
  sprites: {
    other: {
      dream_world: {
        front_default: "",
      },
    },
  },
  types: [],
  stats: [],
  abilities: [],
};

const Detail: React.FC = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").pop();

  const [isLoading, setIsLoading] = useState(true);
  const [detail, setDetail] = useState<PokemonDetail>(iDetail);
  const [abilities, setAbilities] = useState<PokemonAbility[]>([]);

  const fetchDetail = async () => {
    try {
      const response = await getDetailPokemon(id);
      setDetail(response.data);
    } catch (error) {
      console.error("Error fetching pokemon detail data:", error);
    }
  };

  const fetchAbility = async () => {
    try {
      const abilitiesResp = await Promise.all(
        detail.abilities.map(async (val, index) => {
          const response = await getAbilityPokemon(
            getPokemonId(val.ability.url)
          );
          return response.data;
        })
      );
      setAbilities(abilitiesResp);
    } catch (error) {
      console.error("Error fetching pokemon ability data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  useEffect(() => {
    if (detail) fetchAbility();
  }, [detail]);

  return (
    <Header>
      {isLoading ? (
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <p>Loading...</p>
        </div>
      ) : (
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <img
              className="mb-8"
              src={detail.sprites.other.dream_world.front_default}
              alt={detail.name}
            />
            <div className="py-4 px-4 lg:px-0">
              <div className="text-2xl font-semibold">Pokemon Information</div>
              <div>Name: {capitalization(detail.name)}</div>
              <div>Height: {detail.height}</div>
              <div>Weight: {detail.weight}</div>
              <div>
                Types:{" "}
                {detail.types.map((val, index) => (
                  <label key={index}>
                    {capitalization(val.type.name)}
                    {index < detail.types.length - 1 && ", "}
                  </label>
                ))}
              </div>
            </div>
            <div className="py-4 px-4 lg:px-0">
              <div className="text-2xl font-semibold">Stats</div>
              <Table stats={detail.stats} width="w-full lg:w-5/12" />
            </div>
            <div className="py-4 px-4 lg:px-0">
              <div className="text-2xl font-semibold">Abilities</div>
              {abilities.map((val, index) => (
                <div key={index}>
                  <label className="font-semibold">
                    {capitalization(val.name)}
                  </label>
                  <label className="mx-2">-</label>
                  <label>
                    {
                      val.effect_entries.find(
                        (item) => item.language.name === "en"
                      )?.short_effect
                    }
                  </label>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}
    </Header>
  );
};

export default Detail;
