// import { getJwt } from '../../helpers/jwt'

module.exports = {
    login: (email, password) => {
        fetch('http://localhost:3001/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(response => {
           return new Promise((resolve, reject) => {
            return resolve(response)
           })   
        })
        .catch(err => console.log(err))

    }
}