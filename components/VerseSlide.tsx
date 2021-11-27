import { Flex, Text } from "@chakra-ui/react"
import React from 'react';

export const VerseSlide = ({
  props
}: {
  props: {
    number: string,
    verse: string
  }
}) => {
  return <Flex
    id={props.number}
    className="verse"
    p={6}
    v="100vw"
    h="100vh"
    justifyContent="center"
    alignItems="flex-start">
    <Flex mt="5vh" fontWeight="semibold">
      <Text
        h="fit-content"
        fontSize={{ base: 'x-large', md: '5vh' }}
        mr={{ base: '5', md: '5vh' }}
        mt={{ base: '1', md: '1.3vh' }}>
        {props.number}
      </Text>
      <Text
        h="fit-content"
        fontSize={{ base: 'x-large', md: '6.7vh' }}
        w="80vw"
        lineHeight="tall">
        {props.verse}
      </Text>
    </Flex>
  </Flex>
}
