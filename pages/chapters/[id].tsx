import { getAllChapterIds, getChapterData } from '../../lib/chapters'
import React, { useEffect, useCallback, useRef } from 'react'
import { VerseSlide } from '../../components/VerseSlide'
import VerseCounter from '../../components/VerseCounter'
import { toggleFullScreen } from '../../lib/window'
import { Text } from "@chakra-ui/react"
import { convertHTMLtoVerses, getNextChapterName, getAddressFromPath, getChapterNameKRAndIndex } from '../../lib/converter'

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
  const [verse, setVerse] = React.useState(1)

  const handleKeyDown = (event) => {
    // Arrow down
    if (event.keyCode === 40) {
      if (verse < verseList.length) {
        setVerse(verse + 1)
        event.preventDefault()
      } else {

        // Go to next chapter or book.
        document.removeEventListener("keydown", handleKeyDown, false)
        window.location.href = '/chapters/' + getNextChapterName(getAddressFromPath(window.location.pathname))
        event.preventDefault()
      }

    } else if (event.keyCode === 38) {
      // Arrow up
      if (verse > 1) {
        setVerse(verse - 1)
        event.preventDefault()
      }

    } else if (event.keyCode == 13) {
      toggleFullScreen()
      setTimeout(() => {
        var target = document.getElementById(String(verse))
        window.scrollTo(0, target.scrollHeight * (verse - 1))
      }, 300)
      return false
    }
  }

  const hashChange = () => {
    if (window.location.hash) {
      const hash = Number(window.location.hash.replace('#', ''))
      setVerse(hash)
    } else {
      setVerse(1)
    }
  }

  useEffect(() => {
    hashChange()
  }, [])

  useEffect(() => {
    window.location.hash = String(verse)
    verseCounter.current.setState({
      number: verse
    })

    document.addEventListener("keydown", handleKeyDown, false)
    window.addEventListener("hashchange", hashChange, false)
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false)
      window.removeEventListener("hashchange", hashChange, false)
    }
  }, [verse])

  return (
    <>
      {
        verseList.map(({ number, verse }, index) => (
          <VerseSlide props={{ number, verse }} key={number} />
        ))
      }
      <Text
        onClick={() => { window.location.href = '/' }}
        position="fixed"
        right="10vh"
        bottom="7vh"
        fontSize="5vh"
        fontWeight="semibold"
        cursor="pointer">
        {data.nameKR + ' ' + data.chapterIndex}:<VerseCounter ref={verseCounter} />
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