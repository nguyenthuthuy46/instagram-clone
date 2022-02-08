import React from 'react'
import { DotsHorizontalIcon } from '@heroicons/react/solid'
import { BookmarkIcon, ChatIcon, HeartIcon, PaperAirplaneIcon, EmojiHappyIcon } from '@heroicons/react/outline'

const Post = ({ id, username, avatar, imagePost, caption }) => {
  return (
    <div className='bg-white my-7 border rounded-sm'>
      <div className='flex items-center p-5'>
        <img className='w-12 h-12 rounded-full object-cover border p-1 mr-3' alt='profile_image' src={avatar} />
        <p className='flex-1 font-bold'>{username}</p>
        <DotsHorizontalIcon className='h-5' />
      </div>
      <div>
        <img src='post_img' src={imagePost} className='object-cover w-full' />
      </div>
      <div className='flex justify-between px-4 pt-4'>
        <div className='flex space-x-4'>
          <HeartIcon className='btn' />
          <ChatIcon className='btn' />
          <PaperAirplaneIcon className='btn' />
        </div>
        <BookmarkIcon className='btn' />
      </div>
      <p className='p-5 truncate'>
        <span className='font-bold mr-1'>{username}</span> {caption}
      </p>

      {/*  Form input*/}
      <form className='flex items-center p-4'>
        <EmojiHappyIcon className='h-7' />
        <input
          placeholder="Add your comment..."
          type='text'
          className="border-none flex-1 focus:ring-0 outline-none "
        />
        <button className="text-blue-400">Post</button>
      </form>
    </div>
  )
}
export default Post
