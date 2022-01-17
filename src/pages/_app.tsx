import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
