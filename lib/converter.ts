import { map, bookList } from "./data"

function addressToBookAndIndex(address: string) {
  const chapterIndex = Number(/\d+$/.exec(address)[0])
  const bookName = address.replace(/\d+$/, '')
  return {
    bookName, chapterIndex
  }
}

export function getAddressFromPath(path) {
  return path.substring(path.lastIndexOf('/') + 1)
}

export function getNextChapterName(address: string) {
  const object = addressToBookAndIndex(address)
  const bookIndex = bookList.indexOf(object.bookName)

  let newAddress = ''
  map[bookIndex].chapters
  if (object.chapterIndex < map[bookIndex].chapters) {
    newAddress = object.bookName + String(object.chapterIndex + 1)
  } else {
    newAddress = bookList[bookIndex + 1] + '1'
  }
  return newAddress
}

export function getChapterNameKR(address: string) {
  const object = addressToBookAndIndex(address)
  const bookIndex = bookList.indexOf(object.bookName)
  return map[bookIndex].name + ' ' + object.chapterIndex
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