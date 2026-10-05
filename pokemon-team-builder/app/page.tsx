import PokemonCard from "@/components/PokemonCard";

export default async function Home() {

  const response = await fetch(
  "https://pokeapi.co/api/v2/pokemon?limit=6"
);

const pokemon = await response.json();

const pokemonData = await Promise.all(
  data.results.map(async (pokemon: { url: string }) => {
    const response = await fetch(pokemon.url);
    return response.json();
  })
);
  return (
    <main>
      <h1>Pokémon App</h1>

        <PokemonCard
        name={pokemon.name}
        type={pokemon.types[0].type.name}
        image={pokemon.sprites.front_default}
      />

    </main>
  );
}