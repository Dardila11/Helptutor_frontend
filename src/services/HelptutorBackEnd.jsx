import axios from "axios"

const urlBase = "https://mdquilindo.pythonanywhere.com/api"

export const helpTutorBackEnd = {
  get,
  post,
  put,
  delete: _delete,
};

async function get(url) {
  return await axios
    .get(urlBase+url, { ...AuthHeader()})
    .then(handleResponse)
    .catch(handleResponse);
}

async function post(url, body) {
  return await axios
    .post(url, body, { ...AuthHeader() })
    .then(handleResponse)
    .catch(handleResponse);
}

async function put(url, body) {
  return await axios
    .put(url, body, { ...AuthHeader() })
    .then(handleResponse)
    .catch(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(url, body) {
  return await axios
    .delete(url, body, {}, { ...AuthHeader() })
    .then(handleResponse)
    .catch(handleResponse);
}

// helper functions
const AuthHeader = () => {
  const token = JSON.parse(localStorage.getItem("currentUser")).token
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  config.headers['Authorization'] = 'Token ' + token

  return config
}

function handleResponse(response) {
  console.log(response)
  if (response.status !== 200 && response.status !== 201) {
    return Promise.reject(response.response);
  }
  return response.data;
}
