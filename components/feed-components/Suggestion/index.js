import React, { useEffect, useState } from 'react'
import faker from '@faker-js/faker'

const Suggestion = (props) => {
  const [suggestion, setSuggestion] = useState([])

  useEffect(() => {
    const list = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      i
    }))
    setSuggestion(list)
  }, [])
  console.log(suggestion)
  return (
    <div>
      <div className='mt-4 ml-10'>
        <div className='flex justify-between text-sm mb-5'>
          <h2 className='text-sm font-bold text-gray-400'>Suggestions for you</h2>
          <button className='text-gray-600 font-semibold'>See All</button>
        </div>
        <div>
          {suggestion.map((sug, i) => (
            <div className="flex items-center justify-between">
              <img
                alt='avatar-suggestion'
                src={sug.avatar}
                className='mb-3 w-16 h-16 rounded-full border p-[2px]'
              />
              <div className="flex-1 mx-4">
                <h3 className="font-bold">{sug.username}</h3>
                <span className="text-sm text-gray-400">Work att {sug.company.name}</span>
              </div>
              <button className="text-blue-400 text-semiblod">Follow</button>
            </div>
          ))}
        </div>

      </div>

    </div>
  )
}
export default Suggestion
