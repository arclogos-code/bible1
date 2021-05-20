import { map, bookList } from "./data"

export function getChapterNameKR(name: string) {
  let verse = /\d+$/.exec(name)[0]
  name = name.replace(/\d+$/, '')
  let index = bookList.indexOf(name)
  return map[index].name + ' ' + verse
}

export function convertHTMLtoVerses(raw: string) {
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