import Document, { Html, Head, Main, NextScript } from 'next/document'

const styles = `
:root {
  font-family: 'PT Sans', sans-serif;
}

pre, code {
  font-family: 'Fira Code', sans-serif;
}
`

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <style dangerouslySetInnerHTML={{ __html: styles }}></style>
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
