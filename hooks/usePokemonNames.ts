import { getPokemonId, getPokemonNameFR } from "@/functions/pokemon";
import { useEffect, useState } from "react";


export type PokemonFR = { id: number; nameFR: string };

export function usePokemonNames(pokemons: { name: string; url: string }[]) {
  const [pokemonsFR, setPokemonsFR] = useState<PokemonFR[]>([]);

  useEffect(() => {
    async function loadNames() {
      const dataWithFR = await Promise.all(
        pokemons.map(async (p) => {
          const id = getPokemonId(p.url);
          const nameFR = await getPokemonNameFR(id);
          return { id, nameFR };
        })
      );
      setPokemonsFR(dataWithFR);
    }

    if (pokemons.length) loadNames();
  }, [pokemons]);

  return pokemonsFR;
}
