import Document, { Html, Head, Main, NextScript } from 'next/document'
import Link from 'next/link'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
        <link 
            href="https://fonts.googleapis.com/css2?family=Cairo:wght@600&display=swap" 
            rel="stylesheet">
        </link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument