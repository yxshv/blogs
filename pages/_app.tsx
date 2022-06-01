import '../styles/globals.css';
import '../styles/prism.css';
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  // @ts-ignore
  return <Component {...pageProps} />
}
