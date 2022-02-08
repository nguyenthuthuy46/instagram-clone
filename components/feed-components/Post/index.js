import React, { useEffect, useState } from 'react'
import { DotsHorizontalIcon } from '@heroicons/react/solid'
import { BookmarkIcon, ChatIcon, HeartIcon, PaperAirplaneIcon, EmojiHappyIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from '../../../firebase'
import moment from "moment"
const Post = ({ id, username, avatar, imagePost, caption }) => {
  const { data: session } = useSession()
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState('')

  useEffect(
    () => onSnapshot(
      query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')),
      snapshot => setComments(snapshot.docs))
    , [db])

  console.log(comments)

  const sendComment = async (e) => {
    e.preventDefault()

    const content = comment
    setComment('')

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: content,
      username: session.user.username,
      userAvatar: session.user.image,
      timestamp: serverTimestamp()
    })
  }


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
      {session && (
        <div className='flex justify-between px-4 pt-4'>
          <div className='flex space-x-4'>
            <HeartIcon className='btn' />
            <ChatIcon className='btn' />
            <PaperAirplaneIcon className='btn' />
          </div>
          <BookmarkIcon className='btn' />
        </div>
      )}
      <p className='p-5 truncate'>
        <span className='font-bold mr-1'>{username}</span> {caption}
      </p>

      {comments.length > 0 && (
        <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
          {comments.map((cmt, i) => (
            <div key={cmt.id} className="flex items-center space-x-2 mb-2">
              <img src={cmt.data().userAvatar} alt='' className="h-7 rounded-full"/>
              <p className="text-sm flex-1">
                <span className="font-bold">{cmt.data().username}</span>{" "}
                <span>{cmt.data().comment}</span>
              </p>
              <p>{console.log(cmt.data())}</p>
            </div>
          ))}
        </div>
      )}

      {/*  Form input*/}
      {session && (
        <form className='flex items-center p-4'>
          <EmojiHappyIcon className='h-7' />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Add your comment...'
            type='text'
            className='border-none flex-1 focus:ring-0 outline-none '
          />
          <button type='submit' disabled={!comment.trim()} onClick={sendComment} className='text-blue-400'>Post</button>
        </form>
      )}
    </div>
  )
}
export default Post
