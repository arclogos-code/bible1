import { Box, Flex } from "@chakra-ui/react"
import React from "react"
import { VerseButton } from "./VerseButton"

export const VerseNav = (props: { total: number }) => {
  const [hover, setHover] = React.useState(false)
  const dummy = Array.apply(null, Array(props.total))
  return <Flex
    pos="fixed"
    right={0}
    w="60px"
    h="full"
    alignItems="center"
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}>
    <Flex
      py={3}
      w="full"
      h="full"
      overflowY="scroll"
      display={hover ? "flex" : "none"}
      direction="column">
      {dummy.map((item, index: number) => {
        return <VerseButton verse={index + 1} key={index} />
      })}
    </Flex>
  </Flex>
}