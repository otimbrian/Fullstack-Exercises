import { React, useState } from 'react'

const Blog = ({blog, change, deleteblog, logged}) => {
    const [visible, setVisible] = useState(false)
    const [buttonValue, setButtonValue] = useState('Show')


    const requiredStyle = visible ? {display: ''} : {display: 'None'}
    const buttonDisplay = logged.username === blog.user.username ? {display: ''} : {display: 'None'}


    const changeShow = () => {
            setVisible(!visible)
            visible ? setButtonValue('Show') : setButtonValue('Hide')
    }

    const updateBlog = () => {
        change(blog.id)
    }

    const deleteBlog = () => {
        if(window.confirm(`Delete blog titled ${blog.title}`)){
            deleteblog(blog.id)
        }
    }

    return(
        <div>
        <div>
            <ul></ul>
            <hr />
            {blog.title}
            <button className='button' onClick={changeShow}>{buttonValue}</button>
        </div> 
        <div style={requiredStyle}>
            <div>
                {blog.url}
            </div>
            <div>
                {blog.likes}
            </div>
            <b>{blog.author}</b>
            <div>
                <button onClick={updateBlog}>Like</button>
            </div>
            <div>
                <button onClick={deleteBlog} 
                        className='button' id='deleteButton' style={buttonDisplay}>Delete</button>
            </div>
        </div>
    </div>  
    )
}

export default Blog