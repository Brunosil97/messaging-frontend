
const baseURL = "http://localhost:3000"
const validateURL = `${baseURL}/validate`
const chatsURL = `${baseURL}/chats_for_users`

const post = (url, data) => {
  const configurationObject = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return fetch(`${baseURL}/${url}`, configurationObject).then((res) =>
  res.json()
  )
}

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
  return post("sign-in", data)
}

const getChats = token => {
    return get(chatsURL, token).then(response => response.json())
  }

export default { signIn, validate, getFetch, patch, post, getChats };
