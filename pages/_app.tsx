import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Head>
        <meta charSet="euc-kr" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp