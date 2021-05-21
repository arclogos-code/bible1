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
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Bible-slide.com" />
        <meta property="og:title" content="Bible-slide.com" />
        <meta property="og:description" content="Bible PPT" />
        <link rel="shortcut icon" type="image/png" href="https://res.cloudinary.com/lco-linco/image/upload/b_rgb:423dd9,c_fill,g_west,h_100,w_100/v1619264171/linco_xhyhbd.png" />
      </Head>
      <Box bg="gray.900" color="white" minW="100vw" minH="100vh">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}

export default MyApp