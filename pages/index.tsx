import { Heading, Box, Button, Link, Flex, propNames } from "@chakra-ui/react"
import { getAllChapterIds, getChapterData } from '../lib/chapters'
import dynamic from 'next/dynamic'
import { getChapterNameKR } from '../lib/converter'

const Search = dynamic(() => import('../components/Search'), {
  ssr: false
})

export default function Home(props) {
  return (
    <Box>
      <Box p="6" position="fixed" bg="gray.900" zIndex="100" w="full">
        <Heading >
          Bible-slide.com
        </Heading>
        <Box mt="6" maxW="300px">
          <Search placeholder="수 23" tabIndex={0} />
        </Box>
      </Box>
      <Box id="chapters" pt="150px">
        <Flex className="list" px="6" wrap="wrap" overflow="scroll" h="calc(100vh - 150px)">
          {
            props.paths.map((chapter, index) => (
              <Flex w="200px" py="6" key={index}>
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

