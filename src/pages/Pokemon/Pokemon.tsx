import classNames from "classnames";
import { useQuery } from "@tanstack/react-query";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useRouter } from "next/router";

import BaseStats from "@/components/BaseStats";
import Button from "@/components/Button";

import { getPokemon } from "services/getPokemon";

import type { Pokemon } from "@types";

import styles from "./Pokemon.module.scss";

interface PokemonProps {}

const Pokemon = ({}: PokemonProps) => {
  const { query, back } = useRouter();

  const { data } = useQuery<Pokemon>(
    ["pokemon", query.slug],
    () => getPokemon(query?.slug as string),
    {
      enabled: !!query.slug,
    }
  );

  if (!data) {
    return null;
  }

  const uppercasedNameForSEO =
    data.name.charAt(0).toUpperCase() + data.name.slice(1);

  const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`;

  return (
    <div className={styles.Pokemon}>
      <Button onClick={back}>Back</Button>
      <h1>{data?.name}</h1>
      <Image width={400} height={400} src={sprite} alt={data?.name} />
      <div className={styles.InfoStatsContainer}>
        <div className="Info">
          <div className={styles.TypesContainer}>
            <span>Types:</span>
            <div className={styles.Types}>
              {data.types.map((type) => (
                <span
                  key={type.type.name}
                  className={classNames(styles.Type, styles[type?.type?.name])}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.Abilities}>
            <span>Abilities:</span>
            <div>
              {data.abilities.map((ability) => (
                <span key={ability.ability.name} className={styles.Ability}>
                  {ability.ability.name.replace("-", " ")}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.Abilities}>
            <span>Heigth:</span>
            <div>
              <span className={styles.Ability}>{data.height} m</span>
            </div>
          </div>
          <div className={styles.Abilities}>
            <span>Weight:</span>
            <div>
              <span className={styles.Ability}>{data.weight} kg</span>
            </div>
          </div>
        </div>
        <BaseStats
          baseStats={{
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            specialAttack: data.stats[3].base_stat,
            specialDefense: data.stats[4].base_stat,
            speed: data.stats[5].base_stat,
          }}
        />
      </div>
      <NextSeo
        title={uppercasedNameForSEO}
        description={uppercasedNameForSEO}
        openGraph={{
          title: uppercasedNameForSEO,
          description: uppercasedNameForSEO,
          images: [
            {
              url: sprite,
              width: 1600,
              height: 1200,
              alt: uppercasedNameForSEO,
            },
          ],
        }}
      />
    </div>
  );
};

export default Pokemon;
