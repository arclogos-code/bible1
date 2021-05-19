import * as React from "react"
import { ChakraProvider, Box } from "@chakra-ui/react"
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Head>
        <meta charSet="euc-kr" />
        <meta title="Bible-slide.com" />
      </Head>
      <Box bg="gray.900" color="white">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}

export default MyApp