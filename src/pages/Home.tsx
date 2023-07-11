import { useEffect, useState } from "react";
import Header from "../template/Header";
import { getListPokemon } from "../api/api";
import InfiniteScroll from "react-infinite-scroll-component";
import { capitalization, getPokemonId } from "../utils/utils";
import { Link } from "react-router-dom";
import { Pokemon } from "../types/pokemon";

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState<Pokemon[]>([]);

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Header>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Pokemon App - Michaela
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <InfiniteScroll
              dataLength={data.length}
              next={fetchData}
              hasMore={hasMore}
              loader={<p className="mx-4">Loading...</p>}
            >
              <div className="flex flex-wrap -mx-4">
                {data.map((value: Pokemon, index) => (
                  <Link
                    to={`/pokemon/${getPokemonId(value.url)}`}
                    key={index}
                    className="w-1/3 lg:w-1/5 px-4"
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
                  </Link>
                ))}
              </div>
            </InfiniteScroll>
          )}
        </div>
      </main>
    </Header>
  );
};

export default Home;
