import { getAllChapterIds, getChapterData } from '../../lib/chapters'

export default function Post({ chapterData }) {
  return (
    <>
      {chapterData.id}
      {chapterData.contentHtml}
    </>
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