import React from 'react'
import { signOut, useSession } from 'next-auth/react'

const MiniProfile = (props) => {
  const { data: session } = useSession()
  return (
    <div>
      {session ? (
        <div className='flex items-center justify-between mt-14 ml-10'>
          <img
            alt='Profile_picture'
            className='w-16 h-16 object-cover rounded-full cursor-pointer border p-[2px]'
            src={session?.user?.image}
          />

          <div className='flex-1 mx-4'>
            <h2 className='font-bold'>{session?.user?.username}</h2>
            <h3 className='text-sm text-gray-400'>Welcome to Instagram</h3>
          </div>
          <button className='text-blue-400' onClick={signOut}>Sign out</button>
        </div>
      ) : (
        <div></div>
      )
      }
    </div>
  )
}
export default MiniProfile
