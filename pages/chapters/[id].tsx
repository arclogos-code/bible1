import { getAllChapterIds, getChapterData } from '../../lib/chapters'
import { Box, Heading, Text } from "@chakra-ui/react"

export default function Chapter({ verseList }) {
  return (
    <Box>
      <Text fontSize="3xl">
        {
          verseList.map(({ number, verse }, index) => (
            <Box key={number} p="6">
              <Text>
                {number}
              </Text>
              <Text>
                {verse}
              </Text>
            </Box>
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
  raw = raw.replace(/<[^>]+>/g, '');
  let lineList = raw.match(/\d+\W+/g);
  let verseList = [];
  lineList.map((line, index) => {
    var verse = line.match(/(?<number>\d+)\s(?<text>\W*)/).groups;
    verseList.push({
      number: verse.number,
      verse: verse.text.replace(/(?:\\[rn]|[\r\n]+)+/g, '')
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