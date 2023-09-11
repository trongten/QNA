"use client"
import { Colors } from "@/assets/constant/Colors";
import {
  Avatar,
  HStack,
  Heading,
  Image,
  Spacer,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import VoteButton from "../VoteButton";
import helper from "@/util/helper";
import { PostType } from "@/util/type/Post.type";
import { useRouter } from "next/router";
import { ChatIcon, ViewIcon } from "@chakra-ui/icons";
function QuestionItem({
  question,
  isDarkMode,
  onClick,
  isLast,
}: {
  question: PostType;
  isDarkMode?: boolean;
  onClick?: () => void;
  isLast?: boolean;
}) {
  const [count, setCount] = React.useState(question.voteNumber);
  const router = useRouter();
  return (
    <HStack
      mx={{ base: 2, md: 1 }}
      rounded={"md"}
      minW={{ base: "80%", md: "fit-content" }}
      _hover={{
        boxShadow: "0 0 0 1px " + Colors(isDarkMode).BORDER,
      }}
      height={170}
      w={{ base: "80%", md: "fit-content" }}
      mb={2}
      flex={{ base: 1, lg: isLast ? "none" : 1 }}
      transition={"ease-in-out 0.2s"}
      p={3}
      bg={Colors(isDarkMode).PRIMARY_BG}
    >
      <VStack spacing={0}>
        {/* up vote */}
        <VoteButton
          isDarkMode={isDarkMode}
          type="up"
          onClick={() => setCount(count + 1)}
        />
        <Heading size={"md"}>{helper.numberFormat(count)}</Heading>
        <VoteButton
          isDarkMode={isDarkMode}
          type="down"
          onClick={() => setCount(count - 1)}
        />
      </VStack>
      {question.images ? (
        question.images?.length > 0 ? (
          <Image
            src={question.images[0].url}
            alt="Picture of the author"
            width={150}
            height={300}
            rounded={"md"}
            style={{
              maxHeight: "150px",
              maxWidth: "200px",
              marginBlock: "20px",
              marginRight: "10px",
              objectFit: "cover",
            }}
          />
        ) : null
      ) : null}
      <VStack
        key={question.id}
        spacing={1}
        alignItems={"flex-start"}
        onClick={() => {
          onClick
            ? onClick
            : // @ts-ignore
              router.push(`question/${question.id}`);
        }}
        cursor={"pointer"}
      >
        <Text fontWeight={"bold"} maxW={"full"} noOfLines={1}>
          {question.title}
        </Text>
        <Text fontSize={"sm"} maxW={"full"} noOfLines={2}>
          {question.content}
        </Text>
        <HStack>
          {question.tags?.map((tag) => (
            <Tag
              key={tag.id}
              size={"sm"}
              colorScheme={"telegram"}
              py={1}
              px={2}
              rounded={"full"}
            >
              {tag.name}
            </Tag>
          ))}
        </HStack>
        <HStack w={"full"}>
          <Avatar size="sm" src={question.user.avatar} />
          <VStack spacing={0} alignItems={"flex-start"}>
            <Heading fontSize={"sm"}>{question.user.name}</Heading>
            <Text fontSize={"xs"}>
              {helper.formatDate(question.createdDate, true)}
            </Text>
          </VStack>
          <Spacer />
          <HStack>
            <Text>
              {helper.numberFormat(question.answerNumber ? question.answerNumber : 0)} <ChatIcon />
            </Text>
            <Text>
              {helper.numberFormat(question.viewsNumber ? question.viewsNumber : 0)} <ViewIcon />
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </HStack>
  );
}

export default QuestionItem;
