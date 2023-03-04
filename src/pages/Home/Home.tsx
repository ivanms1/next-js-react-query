import Head from "next/head";
import Image from "next/image";

import { useQuery } from "@tanstack/react-query";

import { getPokemons } from "services/getPokemons";

import styles from "./Home.module.scss";
import { Pokemons } from "@types";
import Link from "next/link";
import { NextSeo } from "next-seo";

const PIKACHU_IMAGE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg";

function Home() {
  const { data } = useQuery<Pokemons>({
    queryKey: ["pokemons"],
    queryFn: getPokemons,
  });

  return (
    <div className={styles.Container}>
      <Head>
        <title>Next js + React Query</title>
        <meta name="description" content="Next js + React Query" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.PokemonList}>
        {data?.results?.map((pokemon, index) => (
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
      <NextSeo
        title="Pokemon + React Query"
        description="Pokemon + React Query"
        openGraph={{
          title: "Pokemon + React Query",
          description: "Pokemon + React Query",
          images: [
            {
              url: PIKACHU_IMAGE,
              width: 1600,
              height: 1200,
              alt: "Pokemon + React Query",
            },
          ],
        }}
      />
    </div>
  );
}

export default Home;
