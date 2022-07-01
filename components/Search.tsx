/** @format */

import { Input } from '@chakra-ui/react'
import List from 'list.js'

export default function SearchFilterInput(props) {
  const listObject = new List('chapters', {
    valueNames: ['chapterName', 'chapterNameAlt', 'chapterNameAltShort']
  })

  const handle = (event) => {
    let query = event.target.value
    listObject.search(query)
  }

  return (
    <Input
      className='fuzzy-search'
      onKeyUp={handle}
      {...props}
      size='lg'
      fontSize='x-large'
      autoFocus={true}
    />
  )
}
