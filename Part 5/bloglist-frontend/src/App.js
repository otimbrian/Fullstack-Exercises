import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import AddBlog from './components/AddBlog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginServices from './services/login'
import Togglable from './components/Togglable'
import './index.css'
import Notification from './components/Notification'


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [status, setStatus] = useState('')
    const [message, setMessage] = useState(null)

    const blogRef = useRef()
    const loginRef = useRef()

    const sortingBlogs = (blogs) => {
        blogs.sort((a, b) => {
            return b.likes - a.likes
          })
          return blogs
    }

    useEffect(() => {
        async function getData(){
            const blogs = await blogService.getAll()
            setBlogs(sortingBlogs(blogs))
        }
        getData()
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

    const addBlog = async (newBlog) => {
        const blog = await blogService.create(newBlog)
        setBlogs(blogs.concat(blog))
        
        setMessage(`Created blog ${newBlog.title} by ${newBlog.author}`)
        setStatus('success')
        setTimeout(() => {
            setStatus('')
            setMessage(null)
        }, 5000)

        blogRef.current.changeVisibility()
    }

    const likeChange  = async (id)=> {
        const requiredBlog = blogs.find(blog => blog.id === id)
        const newBlog = {...requiredBlog, likes: requiredBlog.likes + 1}

        const changedBlog = await blogService.update(id, newBlog)
        setBlogs(sortingBlogs(blogs.map(blog => blog.id !== id ? blog : changedBlog)))
    }

    const removeBlog = async (id) => {

       await blogService.remove(id)
       setBlogs(sortingBlogs(blogs.filter(blog => blog.id !== id)))
    }

  if(user === null){
    return(
        <div className='form'>
            <Notification message={message} status={status} />
            <Togglable buttonLabel='Sign In' ref={loginRef}>
                <Login handleLogin={handleLogin} handleUsernameChange={handleUsernameChange} 
                    handlePasswordChange={handlePasswordChange} username={username} 
                    password={password}/>
            </Togglable>
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
            <Togglable buttonLabel='New Blog' ref={blogRef}>
                <AddBlog createBlog={addBlog} />
            </Togglable>
        </div>
        <h2>Blogs</h2>
        {blogs.map(blog => <Blog key={blog.id
                } blog={blog} change={likeChange} deleteblog={removeBlog} logged={user}/>)}
    </div>
  )
}

export default App