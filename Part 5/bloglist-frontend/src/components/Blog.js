import React from 'react'
const Blog = ({blog}) => (
  <div>
    <div>
      <ul></ul>
      {blog.title}
    </div> 
    <div>
      <b>{blog.author}</b>
    </div>
  </div>  
)

export default Blog