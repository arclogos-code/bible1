import { map, bookList } from "./data"

export function getChapterNameKR(name: string) {
  let verse = /\d+$/.exec(name)[0]
  name = name.replace(/\d+$/, '')
  let index = bookList.indexOf(name)
  return map[index].name + ' ' + verse
}