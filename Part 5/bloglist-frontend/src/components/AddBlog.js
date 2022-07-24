import React from "react"


const AddBlog = ({handleSubmit, handleTitleChange, handleAuthorChange,
                    handleUrlChange, title, author, url}) => {
    return(
        <form onSubmit={handleSubmit}>
            <div>
                Title :
                <input type="text" 
                    value={title} name="Title" 
                    onChange={handleTitleChange}/>
            </div>
            <div>
                Author : 
                <input type="text" 
                    value={author} name="Title" 
                    onChange={handleAuthorChange} />
            </div>
            <div>
                Url :
                <input type="text" 
                    value={url} name="Url"
                    onChange={handleUrlChange} />
            </div>
            <button type="submit">Add Blog</button>
        </form>
    )
}

export default AddBlog