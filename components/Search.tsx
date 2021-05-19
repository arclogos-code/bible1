import { Input } from "@chakra-ui/react"
import List from 'list.js'

export default function setList() {
  const options = {
    valueNames: ['chapter']
  };
  const list = new List('chapterList', options);
  return (
    <Input />
  )
}