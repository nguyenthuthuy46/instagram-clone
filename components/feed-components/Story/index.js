import React from 'react'

const Story = ({ image, username }) => {
  return (
    <div>
      <img
        className='w-14 h-14 rounded-full p-[1.5px] border-red-500
        border-2 object-contain cursor-pointer hover:scale-125 transition duration-150 ease-out'
        src={image} alt={username} />
      <p className='text-sm w-14 truncate text-center'>{username}</p>
    </div>
  )
}
export default Story
