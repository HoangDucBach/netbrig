import { Center, Flex } from "@chakra-ui/react";
import Hero from "./_components/Hero";
import { Cover } from "./_components/Cover";
import { Search } from "./_components/Search";

export default function Home() {

  return (
    <Flex w={"full"} h={"full"} mt={"32"} gap={"6"} direction={"column"} alignItems={"center"} paddingX={"64"}>
      <Hero />
      <Search />
      <Cover />
    </Flex>
  );
}
