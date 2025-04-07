import React, { useEffect, useState } from "react";
import "../pokedex.css";
import { useNavigate, useParams } from "react-router";

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
}

export function Pokedex() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchPokemonAndNeighbors = async () => {
      try {
        // Fetch o Pokémon atual e alguns vizinhos
        const pokemonId = Number(id);
        const startId = Math.max(1, pokemonId - 7); // Pega 7 Pokémon antes

        const promises = Array.from({ length: 15 }, (_, i) => {
          const currentId = startId + i;
          return fetch(`https://pokeapi.co/api/v2/pokemon/${currentId}`)
            .then((res) => res.json())
            .catch(() => null);
        });

        const results = await Promise.all(promises);
        const validResults = results.filter((result) => result !== null);

        setPokemons(validResults);
        const currentPokemon = validResults.find((p) => p.id === pokemonId);
        setSelectedPokemon(currentPokemon || validResults[0]);
      } catch (error) {
        console.error("Error fetching pokemon:", error);
      }
    };

    fetchPokemonAndNeighbors();
  }, [id]);

  return (
    <div id="pokedex">
      <div id="left">
        <div id="logo"></div>
        <div id="bg_curve1_left"></div>
        <div id="bg_curve2_left"></div>
        <div id="curve1_left">
          <div id="buttonGlass">
            <div id="reflect"></div>
          </div>
          <div id="miniButtonGlass1"></div>
          <div id="miniButtonGlass2"></div>
          <div id="miniButtonGlass3"></div>
        </div>
        <div id="curve2_left">
          <div id="junction">
            <div id="junction1"></div>
            <div id="junction2"></div>
          </div>
        </div>
        <div id="screen">
          <div id="topPicture">
            <div id="buttontopPicture1"></div>
            <div id="buttontopPicture2"></div>
          </div>
          <div id="picture">
            {selectedPokemon && (
              <img
                id="pokemonImage"
                src={selectedPokemon.sprites.front_default}
                alt={selectedPokemon.name}
                height="170"
              />
            )}
          </div>
          <div id="buttonbottomPicture"></div>
          <div id="speakers">
            <div className="sp"></div>
            <div className="sp"></div>
            <div className="sp"></div>
            <div className="sp"></div>
          </div>
        </div>
        <div id="bigbluebutton"></div>
        <div id="barbutton1"></div>
        <div id="barbutton2"></div>
        <div id="cross">
          <div
            id="leftcross"
            onClick={() => {
              const currentIndex = pokemons.findIndex(
                (p) => p.id === selectedPokemon?.id
              );
              const newIndex =
                (currentIndex - 1 + pokemons.length) % pokemons.length;
              setSelectedPokemon(pokemons[newIndex]);
            }}
          >
            <div id="leftT"></div>
          </div>
          <div
            id="topcross"
            onClick={() => {
              const currentIndex = pokemons.findIndex(
                (p) => p.id === selectedPokemon?.id
              );
              const newIndex =
                (currentIndex - 2 + pokemons.length) % pokemons.length;
              setSelectedPokemon(pokemons[newIndex]);
            }}
          >
            <div id="upT"></div>
          </div>
          <div
            id="rightcross"
            onClick={() => {
              const currentIndex = pokemons.findIndex(
                (p) => p.id === selectedPokemon?.id
              );
              const newIndex = (currentIndex + 1) % pokemons.length;
              setSelectedPokemon(pokemons[newIndex]);
            }}
          >
            <div id="rightT"></div>
          </div>
          <div id="midcross">
            <div id="midCircle"></div>
          </div>
          <div
            id="botcross"
            onClick={() => {
              const currentIndex = pokemons.findIndex(
                (p) => p.id === selectedPokemon?.id
              );
              const newIndex = (currentIndex + 2) % pokemons.length;
              setSelectedPokemon(pokemons[newIndex]);
            }}
          >
            <div id="downT"></div>
          </div>
        </div>
      </div>
      <div id="right">
        <div id="stats">
          <strong>Name:</strong>{" "}
          <span id="pokemonName">{selectedPokemon?.name}</span>
          <br />
          <strong>Type:</strong>{" "}
          <span id="pokemonTypes">
            {selectedPokemon?.types.map((type) => type.type.name).join(", ")}
          </span>
          <br />
          <strong>Height:</strong>{" "}
          <span id="pokemonHeight">
            {selectedPokemon?.height ? selectedPokemon.height / 10 : ""}
          </span>
          m<br />
          <strong>Weight:</strong>{" "}
          <span id="pokemonWeight">
            {selectedPokemon?.weight ? selectedPokemon.weight / 10 : ""}
          </span>
          kg
          <br />
          <strong>Skills:</strong>{" "}
          <span id="pokemonSkills">
            {selectedPokemon?.abilities
              .map((ability) => ability.ability.name)
              .join(", ")}
          </span>
        </div>
        <div id="blueButtons1">
          {pokemons.slice(0, 5).map((pokemon) => (
            <div
              key={pokemon.id}
              className="blueButton"
              onClick={() => setSelectedPokemon(pokemon)}
            >
              <span className="pokemon-id">{pokemon.id}</span>
            </div>
          ))}
        </div>
        <div id="blueButtons2">
          {pokemons.slice(5, 10).map((pokemon) => (
            <div
              key={pokemon.id}
              className="blueButton"
              onClick={() => setSelectedPokemon(pokemon)}
            >
              <span className="pokemon-id">{pokemon.id}</span>
            </div>
          ))}
        </div>
        <div id="blueButtons3">
          {pokemons.slice(10, 15).map((pokemon) => (
            <div
              key={pokemon.id}
              className="blueButton"
              onClick={() => setSelectedPokemon(pokemon)}
            >
              <span className="pokemon-id">{pokemon.id}</span>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100"
      >
        Voltar para Lista
      </button>
    </div>
  );
}
