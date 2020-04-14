// Define the URLs for our different routes
const baseURL = "http://localhost:3000"
const signInURL = `${baseURL}/sign-in`
const validateURL = `${baseURL}/validate`


// Make a post request to a given URL with a given data object as the body and return the Promise
const post = (url, data) => {
  const configurationObject = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }
  return fetch(url, configurationObject)
}

// Make a get request to a given URL and return the Promise. If a token has been provided, include it as a header called Authorization
const get = (url, token) => {
  return token ? fetch(url, { headers: { AUTHORIZATION: token } }) : fetch(url)
}

// Use the get function to make a request to the validate route and parse the response into JSON
const validate = token => {
  return get(validateURL, token).then(response => response.json())
}

// Use the post function to make a request to the validate route and parse the response into JSON
const signIn = data => {
  return post(signInURL, data).then(response => response.json())
}

// Use the get function to make a request to the items route and parse the response into JSON


// Export the necessary functions as part of one object which we will import elsewhere
export default { signIn, validate }