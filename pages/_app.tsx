import * as React from "react"
import { ChakraProvider, Box } from "@chakra-ui/react"
import Head from 'next/head'
import TagManager from 'react-gtm-module'

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    TagManager.initialize({
      gtmId: 'GTM-TCBLM7Z'
    })
  })
  return (
    <ChakraProvider>
      <Head>
        <meta charSet="euc-kr" />
        <meta title="Bible-slide.com" />
      </Head>
      <Box bg="gray.900" color="white" minW="100vw" minH="100vh">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}

export default MyApp