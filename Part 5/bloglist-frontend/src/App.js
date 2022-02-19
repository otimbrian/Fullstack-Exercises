import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginServices from './services/login'
import './index.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
      event.preventDefault()
      try{
            const user = await loginServices.login({username, password})
            setUser(user)
            setUsername('')
            setPassword('')
      }catch(exeption){
          console.log('Wrong Credential')
          setTimeout(() => {
              console.log('Error')
          }, 5000)
      }
  }
  const handleUsernameChange = event => setUsername(event.target.value)
  const handlePasswordChange = event => setPassword(event.target.value)


  if(user === null){
    return(
        <div className='form'>
            <form onSubmit={handleLogin} >
                <h2>Login</h2>
                <div>
                    username
                    <input type="text" name="Username" onChange={handleUsernameChange} />
                </div>
                <div>
                    password
                    <input type="text" name="Username" onChange={handlePasswordChange} />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
  }
  return (
    <div className='form'>
        <h2>blogs</h2>
        <h3>{user.name} is logged in </h3>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )
 
}

export default App