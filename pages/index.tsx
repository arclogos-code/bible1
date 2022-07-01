/** @format */

import {
  Heading,
  Input,
  Stack,
  Flex,
  Button,
  HStack,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import Link from 'next/link'
import { SearchSchema } from '../lib/schema'
import { bookList, bookMap } from '../lib/data'

export default function Home(props) {
  return (
    <Flex h='100vh' align='center' justify='center'>
      <Stack spacing={4}>
        <Heading>Bible</Heading>
        <Formik
          validationSchema={SearchSchema}
          initialValues={{ query: '' }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              const re = /(\W+)(\d+):(\d+)/g
              const result = re.exec(values.query?.trim())
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
              window.location.href = `/c/${bookEN}${chapter}#${verse}`
              actions.setSubmitting(false)
            }, 1000)
          }}>
          {(props) => (
            <Form>
              <Field name='query'>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.query && form.touched.query}>
                    <HStack>
                      <Input
                        {...field}
                        id='query'
                        name='query'
                        placeholder='슥4:1'
                      />
                      <Button
                        colorScheme='blackAlpha'
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
      </Stack>
      <HStack pos='fixed' bottom={3} right={3}>
        <Link href='/bulk'>
          <a>
            <Button p={3} variant='link'>
              Bulk
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
