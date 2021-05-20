import { Heading, Box, Button, Link, Flex } from "@chakra-ui/react"
import { map, bookList } from '../lib/data'
import { getAllChapterIds, getChapterData } from '../lib/chapters'
import dynamic from 'next/dynamic'
import React, { useEffect } from "react";

const Search = dynamic(() => import('../components/Search'), {
  ssr: false
})

export default function Home(data) {
  return (
    <Box>
      <Box p="6"position="fixed" bg="gray.900" zIndex="100" w="full">
        <Heading >
          Bible-slide.com
        </Heading>
        <Box mt="6" maxW="300px">
          <Search />
        </Box>
      </Box>
      <Box id="chapters" pt="150px">
        <Flex className="list" p="6" wrap="wrap">
          {
            data.paths.map((chapter, index) => (
              <Flex w="200px" py="6">
                <Link href={`/chapters/${chapter.params.id}`} key={index}>
                  <Button className="chapter" colorScheme="teal">
                    {chapter.params.id}
                  </Button>
                </Link>
              </Flex>
            ))
          }
        </Flex>
      </Box>
    </Box>
  )
}

export async function getStaticProps({ params }) {
  const paths = getAllChapterIds()
  return {
    props: {
      paths
    }
  }
}
