/** @format */

import {
  Heading,
  Stack,
  Flex,
  Text,
  Button,
  HStack,
  FormControl,
  FormErrorMessage,
  Textarea
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import Link from 'next/link'
import { BulkSchema } from '../lib/schema'
import { bookList, bookMap } from '../lib/data'
import { useState } from 'react'

export default function Home(props) {
  const [result, setResult] = useState(null)
  return (
    <Flex h='100vh' align='center' justify='center'>
      <Stack spacing={4} p={6}>
        <Heading>Bulk search</Heading>
        <Formik
          validationSchema={BulkSchema}
          initialValues={{ query: '' }}
          onSubmit={async (values, actions) => {
            const input = /[가-힣]+\d+:\d+-*\d*/g
            const multiple = values.query.match(input)
            console.log(multiple)

            setResult([])
            for (const query of multiple) {
              const re = /(\W+)(\d+):(\d+)/g
              const result = re.exec(query)
              console.log(result)
              const bookShort = result[1]
              const chapter = result[2]
              const verse = result[3]

              // Convert book short into book index, then EN.
              let index = 0
              bookMap.map((book, _index) => {
                if (book.short == bookShort) index = _index
              })
              const bookEN = bookList[index]

              // Get
              const res = await fetch(`/api/get?chapter=${bookEN}${chapter}`)
              const data = await res.json()
              await data.map((v) => {
                if (v.number == verse) {
                  setResult((prev) => [
                    ...prev,
                    { bookShort, chapter, verse, text: v.verse }
                  ])
                }
              })
            }
            console.log(result)

            // window.location.href = `/c/${bookEN}${chapter}#${verse}`
            actions.setSubmitting(false)
          }}>
          {(props) => (
            <Form>
              <Field name='query'>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.query && form.touched.query}>
                    <HStack>
                      <Textarea
                        {...field}
                        id='query'
                        name='query'
                        w={400}
                        h={150}
                        placeholder='요10:10, 눅7:11, 눅7:14, 요10:1, 눅7:16, 마1:21'
                      />
                      <Button
                        type='submit'
                        isLoading={props.isSubmitting}
                        isDisabled={!props.isValid}>
                        Search
                      </Button>
                    </HStack>
                    <FormErrorMessage>{form.errors.query}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Form>
          )}
        </Formik>
        {result?.length && (
          <>
            {' '}
            <Stack spacing={4} h='50vh' overflow='scroll'>
              {result?.map((data, index) => {
                return (
                  <HStack align='flex-start' key={index}>
                    <Text w={100} flexShrink={0}>
                      {data.bookShort}
                      {data.chapter}:{data.verse}
                    </Text>
                    <Text maxW={500} key={index}>
                      {data.text}
                    </Text>
                  </HStack>
                )
              })}
            </Stack>
            <Text color='green'>Scroll down if many</Text>
          </>
        )}
      </Stack>
      <HStack pos='fixed' bottom={3} right={3}>
        <Link href='/'>
          <a>
            <Button p={3} variant='link'>
              Home
            </Button>
          </a>
        </Link>
        <Link href='/original'>
          <a>
            <Button p={3} variant='link'>
              Original
            </Button>
          </a>
        </Link>
      </HStack>
    </Flex>
  )
}

export async function getStaticProps({ params }) {
  return {
    props: {}
  }
}
