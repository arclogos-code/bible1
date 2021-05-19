import { Heading, Box, Button, Text, Link, Grid, GridItem } from "@chakra-ui/react"
import { map, bookList } from '../lib/data'
import { getAllChapterIds, getChapterData } from '../lib/chapters'

export default function Home(data) {

  console.log(data)

  return (
    <Box>
      <Heading p="6">
        Bible-slide.com
      </Heading>
      <Grid templateColumns="repeat(5, 1fr)" gap={5} p="6">
        {
          data.paths.map((chapter, index) => (
            <Box w="100%" h="10">
              <Link href={`/chapters/${chapter.params.id}`} >
                <Button colorScheme="teal">
                  {chapter.params.id}
                </Button>
              </Link>
            </Box>
          ))
        }
      </Grid>

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