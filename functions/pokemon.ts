export function getPokemonId (url: string): number {
    return parseInt(url.split('/').at(-2)!, 10)
}

export const pokemonNameCache: Record<number, string> = {};

export async function getPokemonNameFR(id: number) {
  if (pokemonNameCache[id]) return pokemonNameCache[id];

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const data = await res.json();
  const nameFR = data.names.find((n: any) => n.language.name === "fr")?.name ?? "N/A";

  pokemonNameCache[id] = nameFR;
  return nameFR;
}