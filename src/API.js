// Define the URLs for our different routes
const baseURL = "http://localhost:3000"
const signInURL = `${baseURL}/sign-in`
const validateURL = `${baseURL}/validate`
const chatsURL = `${baseURL}/chats`

const post = (url, data) => {
  const configurationObject = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return fetch(`${baseURL}/${url}`, configurationObject)
    .then(console.log);
};

const patch = (url, data) => {
  const configurationObject = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return fetch(`${baseURL}/${url}`, configurationObject).then((res) =>
    res.json()
  );
};

const getFetch = (url) => {
  return fetch(`${baseURL}/${url}`).then((res) => res.json());
};

const get = (url, token) => {
  return token ? fetch(url, { headers: { AUTHORIZATION: token } }) : fetch(url);
};

const validate = token => {
  return get(validateURL, token).then(response => response.json())
}

const signIn = data => {
  return post(signInURL, data).then(response => response.json())
}

const getChats = token => {
    return get(chatsURL, token).then(response => response.json())
  }

// Export the necessary functions as part of one object which we will import elsewhere
export default { signIn, validate, getFetch, patch, post };
