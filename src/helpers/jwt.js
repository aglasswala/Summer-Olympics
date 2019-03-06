module.exports = {
  getJwt: () => {
    return localStorage.getItem("cool-jwt")
  },
}