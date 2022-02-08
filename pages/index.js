import Head from 'next/head'
import Header from '../components/layouts-components/Header'
import Feed from '../components/layouts-components/Feed'

export default function Home() {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Instagram clone</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/*  Header*/}
      <Header />
      {/*  Feed*/}
      <Feed />
      {/*  Footer*/}
    </div>
  )
}
