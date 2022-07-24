import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import AddBlog from './components/AddBlog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginServices from './services/login'
import './index.css'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() =>{
      const loggedUser = window.localStorage.getItem('loggedInUser')
      if(loggedUser){
          const user = JSON.parse(loggedUser)
          blogService.setToken(user.token)
          setUser(user)
      }

  }, [])


  const handleLogin = async (event) => {
      event.preventDefault()
      try{
            const user = await loginServices.login({username, password})
            window.localStorage.setItem(
                'loggedInUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
      }catch(exeption){
            setStatus('error')
            setMessage('Invalid Username or Password Used')
            setTimeout(() => {
                setStatus('')
                setMessage(null)
        }, 5000)
      }
  }
  const handleUsernameChange = event => setUsername(event.target.value)
  const handlePasswordChange = event => setPassword(event.target.value)

  const handleLogout = async () => {
      console.log('logged out')
      window.localStorage.removeItem('loggedInUser')
      setUser(null)
  }
  const handleTitle = event => setTitle(event.target.value)
  const handleAuthor = event => setAuthor(event.target.value)
  const handleUrl = event => setUrl(event.target.value)
  const addBlog = async (event) => {
      event.preventDefault()
      const newBlog = {
            title: title,
            author: author,
            url: url,
      }

      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setMessage(`Created blog ${title} by ${author}`)
      setStatus('success')
      setTimeout(() => {
          setStatus('')
          setMessage(null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
  }

  if(user === null){
    return(
        <div className='form'>
            <Notification message={message} status={status} />
            <Login handleLogin={handleLogin} handleUsernameChange={handleUsernameChange} 
                handlePasswordChange={handlePasswordChange} username={username} 
                password={password}/>
        </div>
    )
  }
  return (
    <div className='form'>
        <Notification status={status} message={message} />
        <h3>{user.name} is logged in </h3>
        <button onClick={handleLogout}>Logout</button>
        <hr />
        <div>
            <AddBlog handleSubmit={addBlog} handleAuthorChange={handleAuthor}
                handleTitleChange={handleTitle} handleUrlChange={handleUrl} 
                title={title} author={author} url={url} />
        </div>
        <h2>Blogs</h2>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )
 
}

export default App