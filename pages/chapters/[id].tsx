import { getAllChapterIds, getChapterData } from '../../lib/chapters'
import { Box, Heading, Text } from "@chakra-ui/react"

export default function Post({ chapterData }) {
  return (
    <Box>
      <Text fontSize="3xl">
        {chapterData.contentHtml}
      </Text>
    </Box>
  )
}

export async function getStaticPaths() {
  const paths = getAllChapterIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const chapterData = await getChapterData(params.id)
  return {
    props: {
      chapterData
    }
  }
}