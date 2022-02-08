import React from 'react'
import Image from 'next/image'
import {
  HeartIcon,
  MenuIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  SearchIcon,
  UserGroupIcon
} from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { modalState } from '../../../common/atomos/modalAtom'
import { useRecoilState, } from 'recoil';
const Header = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState)
  const router = useRouter();

  return (
    <div className="shadow-sm border-b sticky top-0 bg-white z-50">
      <div className='flex justify-between max-w-6xl mx-5 lg:mx-auto'>
        <div className='relative w-24 hidden lg:inline-grid'>
          <Image
            onClick={() => router.push("/")}
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png'
            layout='fill'
            objectFit='contain'
            className="cursor-pointer"
          />
        </div>
        <div className='relative w-10 lg:hidden flex-shrink-0 '>
          <Image
            onClick={() => router.push("/")}
            src='https://logowik.com/content/uploads/images/instagram-glyph.jpg'
            layout='fill'
            objectFit='contain'
            className="cursor-pointer"
          />
        </div>
        <div className='relative mt-1 p-3 rounded-md'>
          <div className='absolute inset-y-0 flex items-center pl-3 pointer-events-none'>
            <SearchIcon className='h-5 w-5 text-gray-500' />
          </div>
          <input
            className='bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md'
            type='text'
            placeholder='Search' />
        </div>

        <div className='flex space-x-4 items-center justify-end'>
          <HomeIcon className='navBtn' onClick={() => router.push("/")} />
          <MenuIcon className='h-6 md:hidden cursor-pointer' />
          {session ? (
            <>
              <div className='relative navBtn'>
                <PaperAirplaneIcon className='navBtn rotate-45' />
                <div className='absolute -top-1 -right-2 text-xs w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white animate-pulse'>3</div>
              </div>
              <PlusCircleIcon className='navBtn' onClick={() => setOpen(true)} />
              <UserGroupIcon className='navBtn' />
              <HeartIcon className='navBtn' />
              <img
                onClick={signOut}
                alt=''
                className='h-10 w-10 object-cover rounded-full cursor-pointer'
                src={session?.user?.image}
              />
            </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  )
}
export default Header
