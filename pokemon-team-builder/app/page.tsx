"use client";

import { useState } from "react";

type Pokemon = {
  name: string;
  sprites: {
    front_default: string | null;
  };
  types: {
    type: {
      name: string;
    };
  }[];
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [team, setTeam] = useState<Pokemon[]>([]);
  const [teamMessage, setTeamMessage] = useState("");

  async function handleSearch(event: React.FormEvent) {
    event.preventDefault();

    const pokemonName = search.trim().toLowerCase();

    if (!pokemonName) {
      return;
    }

    setIsLoading(true);
    setError("");
    setPokemon(null);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );

      if (!response.ok) {
        throw new Error("Pokémon not found");
      }

      const data = await response.json();
      setPokemon(data);
    } catch {
      setError("Pokémon not found. Try another name or Pokédex number.");
    } finally {
      setIsLoading(false);
    }
  }

  function addToTeam() {
    if (!pokemon) return;

    const alreadyOnTeam = team.some(
      (teamPokemon) => teamPokemon.name === pokemon.name
    );

    if (alreadyOnTeam) {
      setTeamMessage(`${pokemon.name} is already on your team.`);
      return;
    }

    if (team.length >= 6) {
      setTeamMessage("Your team already has six Pokémon.");
      return;
    }

    setTeam([...team, pokemon]);
    setTeamMessage(`${pokemon.name} was added to your team!`);
  }

  function removeFromTeam(name: string) {
    setTeam(team.filter((teamPokemon) => teamPokemon.name !== name));
    setTeamMessage("");
  }

  return (
    <main>
      <h1>Pokémon Team Builder</h1>
      <p>Search for a Pokémon to add to your team.</p>

      <form onSubmit={handleSearch}>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search a Pokémon"
        />
        <button type="submit">Search</button>
      </form>

      {isLoading && <p>Searching...</p>}
      {error && <p>{error}</p>}

      {pokemon && (
        <section className="pokemon-card">
          {pokemon.sprites.front_default && (
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          )}

          <h2>{pokemon.name}</h2>

          <p>
            Type:{" "}
            {pokemon.types.map((pokemonType) => pokemonType.type.name).join(", ")}
          </p>

          <button onClick={addToTeam}>Add to Team</button>
        </section>
      )}

      {teamMessage && <p>{teamMessage}</p>}

      <section className="team-section">
        <h2>Your Team ({team.length}/6)</h2>

        {team.length === 0 ? (
          <p>Your team is empty.</p>
        ) : (
          <div className="team-list">
            {team.map((teamPokemon) => (
              <article className="team-member" key={teamPokemon.name}>
                {teamPokemon.sprites.front_default && (
                  <img
                    src={teamPokemon.sprites.front_default}
                    alt={teamPokemon.name}
                  />
                )}

                <p>{teamPokemon.name}</p>

                <button onClick={() => removeFromTeam(teamPokemon.name)}>
                  Remove
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}