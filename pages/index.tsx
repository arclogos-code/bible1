import {
  Heading, Box, Button, Link, Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  HStack,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react"
import { InfoIcon } from '@chakra-ui/icons'
import { getAllChapterIds, getChapterData } from '../lib/chapters'
import dynamic from 'next/dynamic'
import { getChapterNameKR } from '../lib/converter'

const Search = dynamic(() => import('../components/Search'), {
  ssr: false
})

export default function Home(props) {
  return (
    <Box>
      <Box p="6" position="fixed" bg="black" zIndex="100" w="full">
        <Heading >
          Bible-slide.com
        </Heading>
        <HStack mt="6" maxW="300px">
          <Search placeholder="수 23" tabIndex={1} />
          <Popover placement="right-start">
            <PopoverTrigger>
              <Button colorScheme="black">
                <InfoIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent color="white" bg="black" borderColor="gray.300">
              <PopoverArrow bg="black" />
              <PopoverCloseButton />
              <PopoverHeader>사용법</PopoverHeader>
              <PopoverBody>
                - 검색화면<br />
                "요한복음 15장"은 "요 15"으로 빠른 검색<br />
                이후 탭과 엔터로 선택<br />
                <br />
                - 말씀 화면<br />
                엔터 - 전체화면<br />
                위/아래 - 절 변경<br />
                오른쪽 하단 구절 클릭 - 검색화면으로 복귀
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </HStack>
      </Box>
      <Box id="chapters" pt="150px">
        <Flex className="list" px="6" wrap="wrap" overflow="scroll" h="calc(100vh - 150px)">
          {
            props.paths.map((chapter, index) => (
              <Flex w={{ base: '40vw', md: '200px' }} py="6" key={index}>
                <Link href={`/chapters/${chapter.params.id}`} tabIndex={1} h="fit-content" w="fit-content">
                  <Button className="chapter" colorScheme="black" size="md" fontSize="x-large">
                    {props.names[index]}
                  </Button>
                </Link>
              </Flex>
            ))
          }
        </Flex>
      </Box>
    </Box >
  )
}

export async function getStaticProps({ params }) {
  const paths = getAllChapterIds()
  const names = []
  paths.map((object, index) => (
    names.push(getChapterNameKR(object.params.id))
  ))
  return {
    props: {
      paths,
      names
    }
  }
}

