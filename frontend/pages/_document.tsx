import { Html, Head, Main, NextScript } from "next/document";
import { type ReactElement } from "react";

export default function Document(): ReactElement {
  return (
    <Html className="h-full bg-gray-100">
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
