import React from 'react'
import Post from '../Post'

const Posts = props => {

  const posts = [{
    id: 1,
    username: 'nguyenthuthuy',
    avatar: 'http://lh3.ggpht.com/-yTn7Xc6YpII/WowY7yTjYcI/AAAAAAAAPlc/03foS8sY9ZQt21662m4irkORUfkUpQBJgCLcBGAs/s0/37-jpg',
    imagePost: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
    caption: 'Learn the difference between Formal & Informal words. ❤'
  }, {
    id: 2,
    username: 'nguyenthuthuy',
    avatar: 'http://lh3.ggpht.com/-yTn7Xc6YpII/WowY7yTjYcI/AAAAAAAAPlc/03foS8sY9ZQt21662m4irkORUfkUpQBJgCLcBGAs/s0/37-jpg',
    imagePost: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
    caption: 'Learn the difference between Formal & Informal words. ❤'
  }]
  return (
    <div>
      {posts.map(post => (
        <Post
        id={post.id}
        username={post.username}
        avatar={post.avatar}
        imagePost={post.imagePost}
        caption={post.caption}
        />
      ))}
    </div>
  )
}
export default Posts
