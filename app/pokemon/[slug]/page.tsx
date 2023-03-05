import classNames from "classnames";
import Link from "next/link";

import Image from "next/image";

import BaseStats from "@/components/BaseStats";

import { getPokemon } from "services/getPokemon";
import { getPokemons } from "services/getPokemons";

import type { Metadata } from "next";

import styles from "./Pokemon.module.scss";

type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const pokemon = await getPokemon(params.slug);

  const uppercasedName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  return {
    title: `${uppercasedName} | Next.js + React Query`,
    description: `${uppercasedName} | Next.js + React Query`,
    openGraph: {
      title: `${uppercasedName} | Next.js + React Query`,
      description: `${uppercasedName} | Next.js + React Query`,
      images: [
        {
          url: pokemon.sprites.front_default,
          width: 400,
          height: 400,
          alt: pokemon.name,
        },
      ],
    },
  };
}

export default async function Pokemon({ params }: Params) {
  const { slug } = params;
  const pokemon = await getPokemon(slug);

  const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`;

  return (
    <div className={styles.Pokemon}>
      <Link href="/">Home</Link>
      <h1>{pokemon?.name}</h1>
      <Image
        width={400}
        height={400}
        src={sprite}
        alt={pokemon?.name}
        priority
      />
      <div className={styles.InfoStatsContainer}>
        <div className={styles.Section}>
          <span>Types:</span>
          <div className={styles.Types}>
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className={classNames(styles.Type, styles[type?.type?.name])}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.Section}>
          <span>Abilities:</span>
          <div className={styles.Abilities}>
            {pokemon.abilities.map((ability) => (
              <span key={ability.ability.name} className={styles.Ability}>
                {ability.ability.name.replace("-", " ")}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.Section}>
          <span>Heigth:</span>
          <div>
            <span>{pokemon.height} m</span>
          </div>
        </div>
        <div className={styles.Section}>
          <span>Weight:</span>
          <div>
            <span>{pokemon.weight} kg</span>
          </div>
        </div>
      </div>
      <BaseStats
        baseStats={{
          hp: pokemon.stats[0].base_stat,
          attack: pokemon.stats[1].base_stat,
          defense: pokemon.stats[2].base_stat,
          specialAttack: pokemon.stats[3].base_stat,
          specialDefense: pokemon.stats[4].base_stat,
          speed: pokemon.stats[5].base_stat,
        }}
      />
    </div>
  );
}

export async function generateStaticParams() {
  const res = await getPokemons();

  return res.results.map((pokemon) => ({
    slug: pokemon.name,
  }));
}
