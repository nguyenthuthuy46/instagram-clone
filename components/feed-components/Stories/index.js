import React, { useEffect, useState } from 'react'
import faker from '@faker-js/faker'
import Story from '../Story'
import { useSession } from 'next-auth/react'

const Stories = (props) => {

  const [suggestion, setSuggestion] = useState([])
  const { data: session } = useSession()
  useEffect(() => {
    const suggestion = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      i
    }))
    setSuggestion(suggestion)
  }, [])
  return (
    <div
      className='flex space-x-4 bg-white overflow-x-scroll mt-8 p-6 rounded-sm border border-gray-200 scrollbar-thin scrollbar-thumb-black'>
      {session && (
        <div>
          <img
            src={session?.user?.image}
            className='w-14 h-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-125 transition duration-150 ease-out '
          />
          <p className='text-sm truncate w-14 text-center'>{session?.user?.username}</p>
        </div>
      )}
      {suggestion.map(profile => (
        <Story key={profile.id} image={profile.avatar} username={profile.username} />
      ))}
    </div>
  )
}
export default Stories
