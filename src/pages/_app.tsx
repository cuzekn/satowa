import type { AppProps } from 'next/app'

import 'src/styles/styles.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default MyApp
