import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./pokelist.css";

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

export function PokemonList() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=15"
        );
        const data = await response.json();

        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon: { url: string }) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );

        setPokemons(pokemonDetails);
      } catch (error) {
        console.error("Error fetching pokemon:", error);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div className="pokemon-container">
      <h1 className="pokemon-title">Pokédex</h1>
      <div className="pokemon-list">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            onClick={() => navigate(`/pokemon/${pokemon.id}`)}
            className="pokemon-card"
          >
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="pokemon-image"
            />
            <h2 className="pokemon-name">{pokemon.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
