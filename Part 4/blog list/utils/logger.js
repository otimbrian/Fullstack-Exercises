
const infor = (...params) => {
    return console.log(...params)
}

const error = (...params) => {
    return console.error("Error:", error.message)
}

module.exports = { infor, error }