import Button from "@/components/Button";
import classNames from "classnames";
import { useQuery } from "@tanstack/react-query";
import { Pokemon } from "@types";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { getPokemon } from "services/getPokemon";

import styles from "./Pokemon.module.scss";
import BaseStats from "@/components/BaseStats";

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

  return (
    <div className={styles.Pokemon}>
      <Button onClick={back}>Back</Button>
      <h1>{data?.name}</h1>
      <Image
        width={400}
        height={400}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
        alt={data?.name}
      />
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
    </div>
  );
};

export default Pokemon;
