import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
    const data = {
        headers: {Authorization: token}
      }
    const response = await axios.post(baseUrl, newObject, data)
    return response.data
}

const update = async (id, newBlog) => {
    const response = await axios.put(`${baseUrl}/${id}`, newBlog)
    return response.data
}

const remove = async (id) => {
    const data = {
        headers: {Authorization: token}
      }

    const response = await axios.delete(`${baseUrl}/${id}`, data)
    return response.data
}



const blogService = { getAll, create, setToken, update, remove }
export default blogService