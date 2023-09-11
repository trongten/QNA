import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { clientNamespaces } from "ni18n";
import QuestionDataList from "../util/mock/QuestionDataList.mock";
import { Box, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import { Colors } from "@/assets/constant/Colors";
import QuestionItem from "@/components/QuestionItem";
export default function Home() {
  const { colorMode } = useColorMode();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }
  return (
    <Fragment>
      <Head>
        <title>Question Dân It</title>
        <meta
          name="description"
          content="The website answers the question about IT"
        />
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
      </Head>
      <HStack
        spacing={3}
        px={{ base: 0, md: 10 }}
        height={"full"}
        w={"full"}
        alignItems={"flex-start"}
      >
        <Flex
          m="auto"
          alignItems={"start"}
          justifyContent={"start"}
          wrap={"wrap"}
          flex={{ base: 1, md: 0.8 }}
        >
          {QuestionDataList.postList.map((question, index) => (
            <QuestionItem
              key={question.id}
              question={question}
              isLast={index === QuestionDataList.postList.length - 1}
              isDarkMode={colorMode === "dark"}
            />
          ))}
        </Flex>
        <Box
          rounded={"md"}
          pos={"sticky"}
          top={"11%"}
          flex={{ base: 0, md: 0.2 }}
          // w={80}
          height={"50vh"}
          bg={Colors(colorMode === "dark").PRIMARY_BG}
        ></Box>
      </HStack>
    </Fragment>
  );
}
export const getStaticProps = async (props) => {
  return {
    props: {
      // ...(await loadTranslations(ni18nConfig, props.locale, [
      //   "server-namespace",
      // ])),
      ...clientNamespaces(["home-page"]),
    },
  };
};
