import { Flex, Link } from "@chakra-ui/react"

export const VerseButton = (props: { verse: number }) => {
  return <Flex
    w="full"
    h="full"
    my={1}
    alignItems="center"
    justifyContent="center">
    <Link
      href={`#${props.verse}`}
      fontWeight="semibold"
      colorScheme="light">
      {props.verse}
    </Link>
  </Flex>
}