import axios from "axios";
const baseUrl = '/api/users'

const getUser = async (name) => {
    const response = await axios.get(`${baseUrl}/${name}`)
    return response.data

}

const userService = {getUser}
export default userService
