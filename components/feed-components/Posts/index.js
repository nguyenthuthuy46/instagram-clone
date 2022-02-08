import React, { useEffect, useState } from 'react'
import Post from '../Post'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../../../firebase'

const Posts = props => {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const unSubscribe = onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
      setPosts(snapshot.docs)
    })

    return unSubscribe
  }, [db])

  return (
    <div>
      {posts.map(post => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          avatar={post.data().profileImage}
          imagePost={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  )
}
export default Posts
