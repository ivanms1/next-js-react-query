import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetStaticProps } from "next";

import Pokemon from "@/pages/Pokemon";

import { getPokemon } from "services/getPokemon";
import { getPokemons } from "services/getPokemons";

export default Pokemon;

export async function getStaticPaths() {
  const { results } = await getPokemons();
  const paths = results.map((pokemon) => ({
    params: { slug: pokemon.name },
  }));

  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();

  if (params?.slug) {
    await queryClient.prefetchQuery(["pokemon", params.slug], () =>
      getPokemon(params?.slug as string)
    );
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
