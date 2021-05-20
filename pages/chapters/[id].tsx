import { getAllChapterIds, getChapterData } from '../../lib/chapters'
import { Box, Heading, Flex, Text } from "@chakra-ui/react"

export default function Chapter({ verseList }) {
  return (
    <Box>
      <Text fontSize="3xl">
        {
          verseList.map(({ number, verse }, index) => (
            <Flex key={number} p="6" v="100vw" h="100vh" justifyContent="center" alignItems="center">
              <Flex>
                <Text h="fit-content" fontSize="4xl" mr="10" mt="3">
                  {number}
                </Text>
                <Text h="fit-content" fontSize="6xl" fontWeight="semibold" w="80vw">
                  {verse}
                </Text>
              </Flex>
            </Flex>
          ))
        }
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

function convert(raw) {
  raw = raw.replace(/<[^>]+>/g, '').trim();
  let lineList = raw.split(/\r?\n/g);
  let verseList = [];
  lineList.map((line, index) => {
    line = line.replace(/(?:\\[rn]|[\r\n]+)+/g, '').trim()
    var verseGroup = line.match(/(?<number>\d+)\s(?<text>.*)/).groups;
    verseList.push({
      number: verseGroup.number,
      verse: verseGroup.text
    })
  });
  return verseList
}

export async function getStaticProps({ params }) {
  const chapterData = await getChapterData(params.id)
  const verseList = convert(chapterData.contentHtml)
  return {
    props: {
      verseList
    }
  }
}