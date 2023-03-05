import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import styles from "./Home.module.scss";

import { getPokemons } from "services/getPokemons";

export default async function Page() {
  const results = await getPokemons();

  return (
    <div className={styles.Container}>
      <Head>
        <title>Next js + React Query</title>
        <meta name="description" content="Next js + React Query" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.PokemonList}>
        {results.results?.map((pokemon, index) => (
          <Link
            href={`/pokemon/${pokemon.name}`}
            key={pokemon.name}
            className={styles.PokemonCard}
          >
            <Image
              alt={pokemon.name}
              className={styles.PokemonImage}
              width={100}
              height={100}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                index + 1
              }.png`}
            />
            <p className={styles.PokemonName}>{pokemon.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
