import { React, useState } from "react"



const AddBlog = ({createBlog}) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitle = event => setTitle(event.target.value)
    const handleAuthor = event => setAuthor(event.target.value)
    const handleUrl = event => setUrl(event.target.value)

    const handleSubmit = (event) => {
        event.preventDefault()
        
        const newBlog = {
            title: title,
            author: author,
            url: url,
        }
        createBlog(newBlog)
        
        setTitle('')
        setAuthor('')
        setUrl('')
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <div>
                Title :
                <input type="text" 
                    value={title} name="Title" 
                    onChange={handleTitle}/>
            </div>
            <div>
                Author : 
                <input type="text" 
                    value={author} name="Title" 
                    onChange={handleAuthor} />
            </div>
            <div>
                Url :
                <input type="text" 
                    value={url} name="Url"
                    onChange={handleUrl} />
            </div>
            <button type="submit">Add Blog</button>
        </form>
    )
}

export default AddBlog