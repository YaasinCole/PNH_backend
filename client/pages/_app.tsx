import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

//@ts-ignore
global.performance = global.performance || {
  now: () => new Date().getTime(),
};