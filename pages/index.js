import Head from 'next/head'
import Header from '../components/layouts-components/Header'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Instagram clone</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/*  Header*/}
      <Header />
      {/*  Feed*/}
      {/*  Footer*/}
    </div>
  )
}
