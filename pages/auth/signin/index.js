import React from 'react'
import { signIn as signInToProviders, getProviders } from 'next-auth/react'
import Header from '../../../components/layouts-components/Header'
import Image from 'next/image'

const SignIn = ({ providers }) => {
  return (
    <>
      <Header />

      <div className='flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14 text-center'>
        <img
          className='w-80'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png'
        />
        <p className='font-xs italic'>This is not REAL app, this is a project to practice by @nguyenthuthuy</p>
        <div className='mt-28'>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button className='p-3 text-white bg-blue-500 rounded-lg' onClick={() => signInToProviders(provider.id, {callbackUrl: "/"})}>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const providers = await getProviders()
  return {
    props: {
      providers: providers
    }
  }
}

export default SignIn
