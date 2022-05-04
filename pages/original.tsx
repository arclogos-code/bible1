/** @format */

import {
  Heading,
  Box,
  Button,
  Flex,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  HStack,
  PopoverArrow,
  PopoverCloseButton,
  Stack
} from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'
import { getAllChapterIds } from '../lib/chapters'
import dynamic from 'next/dynamic'
import { getChapterNameKRAndIndex } from '../lib/converter'
import { bookMap } from '../lib/data'
import Link from 'next/link'

const Search = dynamic(() => import('../components/Search'), {
  ssr: false
})

export default function Home(props) {
  return (
    <Box>
      <Box p='6' position='fixed' bg='black' zIndex='100' w='full'>
        <Link href='/'>
          <a>
            <Heading>Bible1.app</Heading>
          </a>
        </Link>
        <HStack mt='6' maxW='300px'>
          <Search placeholder='수23' tabIndex={1} />
          <Popover placement='right-start'>
            <PopoverTrigger>
              <Button colorScheme='black'>
                <InfoIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent color='white' bg='black' borderColor='gray.300'>
              <PopoverArrow bg='black' />
              <PopoverCloseButton />
              <PopoverHeader>사용법</PopoverHeader>
              <PopoverBody>
                - 검색화면
                <br />
                "여호수아 23장"은 "수23"으로 빠른 검색
                <br />
                탭과 엔터로 바로 선택
                <br />
                <br />
                - 말씀화면
                <br />
                ENTER - 전체화면
                <br />
                ⬆️⬇️ - 절 변경
                <br />
                오른쪽 밑 구절 - 검색화면
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </HStack>
      </Box>
      <Box id='chapters' pt='150px'>
        <Flex
          className='list'
          px='6'
          wrap='wrap'
          overflow='scroll'
          h='calc(100vh - 150px)'>
          {props.paths.map((chapter, index) => (
            <Stack w={{ base: '40vw', md: '200px' }} py='6' key={index}>
              <Link href={`/c/${chapter.params.id}`}>
                <a>
                  <Button
                    variant='link'
                    className='chapterName'
                    colorScheme='black'
                    p={3}
                    fontSize='x-large'>
                    {props.names[index].nameKR +
                      ' ' +
                      props.names[index].chapterIndex}
                  </Button>
                  <Text
                    display='none'
                    className='chapterNameAlt'
                    colorScheme='black'>
                    {props.names[index].nameKR +
                      props.names[index].chapterIndex}
                  </Text>
                  <Text
                    display='none'
                    className='chapterNameAltShort'
                    colorScheme='black'>
                    {props.bookMap[props.names[index].bookIndex].short +
                      props.names[index].chapterIndex}
                  </Text>
                </a>
              </Link>
            </Stack>
          ))}
        </Flex>
      </Box>
    </Box>
  )
}

export async function getStaticProps({ params }) {
  const paths = getAllChapterIds()
  const names = []
  paths.map((object, index) =>
    names.push(getChapterNameKRAndIndex(object.params.id))
  )
  return {
    props: {
      paths,
      names,
      bookMap
    }
  }
}
