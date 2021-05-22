import { getAllChapterIds, getChapterData } from '../../lib/chapters'
import React, { useEffect, useCallback, useRef } from 'react';
import { VerseSlide } from '../../components/VerseSlide';
import VerseCounter from '../../components/VerseCounter';
import { toggleFullScreen } from '../../lib/window';
import { Text } from "@chakra-ui/react"
import { convertHTMLtoVerses, getNextChapterName, getAddressFromPath, getChapterNameKRAndIndex } from '../../lib/converter';

export default function Chapter({
  verseList,
  data
}: {
  verseList: [{
    number: string,
    verse: string
  }],
  data: {
    nameKR: string,
    chapterIndex: string
  }
}) {
  const verseCounter = useRef(null)

  const handleKeyDown = useCallback((event) => {
    let hash = Number(window.location.hash.replace('#', ''))
    // Arrow down
    if (event.keyCode === 40) {
      if (hash < verseList.length) {
        window.location.hash = String(hash + 1)
        // Count up
        verseCounter.current.setState({
          number: hash + 1
        });
        event.preventDefault();
      } else {
        // Go to next chapter or book.
        document.removeEventListener("keydown", handleKeyDown, false);
        window.location.href = '/chapters/' + getNextChapterName(getAddressFromPath(window.location.pathname))
        event.preventDefault();
      }
    } else if (event.keyCode === 38) {
      // Arrow up
      if (hash > 1) {
        window.location.hash = String(hash - 1)
        // Count down
        verseCounter.current.setState({
          number: hash - 1
        });
        event.preventDefault();
      }
    } else if (event.keyCode == 13) {
      toggleFullScreen();
      return false;
    }
  }, []);

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = '#1'
    }
    document.addEventListener("keydown", handleKeyDown, false);
  }, []);

  return (
    <>
      {
        verseList.map(({ number, verse }, index) => (
          <VerseSlide props={{ number, verse }} key={number} />
        ))
      }
      <Text onClick={() => { window.location.href = '/' }}
        position="fixed" right="7vh" bottom="5vh" fontSize="3vh" fontWeight="book" cursor="pointer">
        {data.nameKR + ' ' + data.chapterIndex}:<VerseCounter ref={verseCounter}></VerseCounter>
      </Text>
    </ >
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
  const verseList = convertHTMLtoVerses(chapterData.contentHtml)
  const data = getChapterNameKRAndIndex(params.id)
  return {
    props: {
      verseList,
      data
    }
  }
}