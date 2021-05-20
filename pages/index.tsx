import { Heading, Box, Button, Input, Link, Grid } from "@chakra-ui/react"
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
      <Heading p="6">
        Bible-slide.com
      </Heading>
      <Box>
        <Search />
      </Box>
      <Box id="chapters">
        <Grid className="list" templateColumns="repeat(5, 1fr)" gap={5} p="6">
          {
            data.paths.map((chapter, index) => (
              <Link href={`/chapters/${chapter.params.id}`} key={index}>
                <Button className="chapter" colorScheme="teal">
                  {chapter.params.id}
                </Button>
              </Link>
            ))
          }
        </Grid>
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
