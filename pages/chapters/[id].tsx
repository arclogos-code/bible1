import { getAllChapterIds, getChapterData } from '../../lib/chapters'
import { Box, Heading, Flex, Text } from "@chakra-ui/react"
import React, { useEffect, useCallback, useRef } from 'react';
import { VerseSlide } from '../../components/VerseSlide';
import { convertHTMLtoVerses } from '../../lib/converter';

export default function Chapter({
  verseList
}: {
  verseList: [{
    number: string,
    verse: string
  }]
}) {
  const handleKeyDown = useCallback((event) => {
    let hash = Number(window.location.hash.replace('#', ''))
    if (event.keyCode === 40) {
      if (hash >= verseList.length) {
        window.location.hash = String(hash + 1)
        event.preventDefault();
      } else {
        // Go to next chapter
      }
    } else if (event.keyCode === 38) {
      if (hash > 1) {
        window.location.hash = String(hash - 1)
        event.preventDefault();
      }
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
  return {
    props: {
      verseList
    }
  }
}