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

// const delete = () => {
//   const request = axios.delete(baseUrl/${id})
// }

const blogService = { getAll, create, setToken }
export default blogService