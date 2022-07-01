/** @format */

import { getChapterData } from '../../lib/chapters'
import {
  convertHTMLtoVerses,
  getChapterNameKRAndIndex
} from '../../lib/converter'

export default async (req, res) => {
  const chapter = req.query.chapter
  const chapterData = await getChapterData(chapter)
  const verseList = convertHTMLtoVerses(chapterData.contentHtml)
  res.status(200).json(verseList)
}
