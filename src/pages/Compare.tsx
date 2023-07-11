import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../template/Header";
import { getDetailPokemon, getListPokemon } from "../api/api";
import InfiniteScroll from "react-infinite-scroll-component";
import { capitalization, getPokemonId } from "../utils/utils";
import { Pokemon } from "../types/pokemon";
import { Selected, SelectedDefault } from "../components/Selected";
import { PokemonDetail } from "../types/detail";
import { CompareDefault, CompareResult } from "../components/Compare";

const Compare: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState<Pokemon[]>([]);
  const [selectedPokemon1, setSelectedPokemon1] = useState<Pokemon | null>(
    null
  );
  const [selectedPokemon2, setSelectedPokemon2] = useState<Pokemon | null>(
    null
  );
  const [detailPokemon1, setDetailPokemon1] = useState<PokemonDetail | null>(
    null
  );
  const [detailPokemon2, setDetailPokemon2] = useState<PokemonDetail | null>(
    null
  );

  const fetchData = async () => {
    const limit = 25;

    try {
      const response = await getListPokemon(limit, offset);
      const newPokemonData = response.data.results;
      if (offset > 0) setData((prevData) => [...prevData, ...newPokemonData]);
      else setData(newPokemonData);
      setOffset((prevOffset) => prevOffset + limit);
      setHasMore(newPokemonData.length === 25);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDetail1 = async (value: Pokemon) => {
    setIsLoading1(true);
    try {
      const response = await getDetailPokemon(getPokemonId(value.url));
      setDetailPokemon1(response.data);
      setSelectedPokemon1(value);
    } catch (error) {
      console.error("Error fetching pokemon detail data:", error);
    } finally {
      setIsLoading1(false);
    }
  };

  const fetchDetail2 = async (value: Pokemon) => {
    setIsLoading2(true);
    try {
      const response = await getDetailPokemon(getPokemonId(value.url));
      setDetailPokemon2(response.data);
      setSelectedPokemon2(value);
    } catch (error) {
      console.error("Error fetching pokemon detail data:", error);
    } finally {
      setIsLoading2(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const comparisonResult = useMemo(() => {
    return [detailPokemon1, detailPokemon2];
  }, [detailPokemon1, detailPokemon2]);

  const handleSelectPokemon1 = useCallback((value: Pokemon) => {
    fetchDetail1(value);
  }, []);

  const handleSelectPokemon2 = useCallback((value: Pokemon) => {
    fetchDetail2(value);
  }, []);

  return (
    <Header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div className="grid lg:grid-cols-3 gap-4 justify-center items-center">
                {selectedPokemon1 && !isLoading1 ? (
                  <Selected data={selectedPokemon1} detail={detailPokemon1} />
                ) : (
                  <SelectedDefault title="Selected Pokemon 1" />
                )}
                {selectedPokemon1 && selectedPokemon2 ? (
                  <div />
                ) : (
                  <CompareDefault />
                )}
                {selectedPokemon2 && !isLoading2 ? (
                  <Selected data={selectedPokemon2} detail={detailPokemon2} />
                ) : (
                  <SelectedDefault title="Selected Pokemon 1" />
                )}
              </div>
              {selectedPokemon1 && selectedPokemon2 && (
                <>
                  <div className="mt-10 text-xl font-semibold">
                    Comparison Result
                  </div>
                  <CompareResult data={comparisonResult} />
                </>
              )}
              <div className="grid grid-cols-2 gap-4 mt-10">
                <InfiniteScroll
                  dataLength={data.length}
                  next={fetchData}
                  hasMore={hasMore}
                  loader={<p className="mx-4">Loading...</p>}
                >
                  <div className="grid grid-cols-1 -mx-4">
                    {data.map((value: Pokemon, index) => (
                      <div
                        key={index}
                        onClick={() => handleSelectPokemon1(value)}
                      >
                        <div className="flex items-center justify-center">
                          <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(
                              value.url
                            )}.png`}
                            alt={value.name}
                          />
                        </div>
                        <div className="p-4 mb-4 text-center font-semibold">
                          {capitalization(value.name)}
                        </div>
                      </div>
                    ))}
                  </div>
                </InfiniteScroll>
                <InfiniteScroll
                  dataLength={data.length}
                  next={fetchData}
                  hasMore={hasMore}
                  loader={<p className="mx-4">Loading...</p>}
                >
                  <div className="grid grid-cols-1 -mx-4">
                    {data.map((value: Pokemon, index) => (
                      <div
                        key={index}
                        onClick={() => handleSelectPokemon2(value)}
                      >
                        <div className="flex items-center justify-center">
                          <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(
                              value.url
                            )}.png`}
                            alt={value.name}
                          />
                        </div>
                        <div className="p-4 mb-4 text-center font-semibold">
                          {capitalization(value.name)}
                        </div>
                      </div>
                    ))}
                  </div>
                </InfiniteScroll>
              </div>
            </>
          )}
        </div>
      </main>
    </Header>
  );
};

export default Compare;
