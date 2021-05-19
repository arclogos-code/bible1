import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import iconv from 'iconv-lite'

const chaptersDirectory = path.join(process.cwd(), 'chapters')

export function getSortedChaptersData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(chaptersDirectory)
  const allChaptersData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.txt$/, '')

    // Read markdown file as string
    const fullPath = path.join(chaptersDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allChaptersData
}

export function getAllChapterIds() {
  const fileNames = fs.readdirSync(chaptersDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.txt$/, '')
      }
    }
  })
}

export async function getChapterData(id) {
  const fullPath = path.join(chaptersDirectory, `${id}.txt`)
  const fileContents = fs.readFileSync(fullPath)

  const euckr = iconv.decode(fileContents, 'euc-kr');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(euckr)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}