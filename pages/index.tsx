import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetStaticProps } from "next";
import { getPokemons } from "services/getPokemons";

import Home from "src/pages/Home";

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["pokemons"], getPokemons);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
