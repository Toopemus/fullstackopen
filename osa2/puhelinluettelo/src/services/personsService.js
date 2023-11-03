import axios from 'axios'
const url = 'http://localhost:3001/persons'

const getPersons = () => {
  const promise = axios.get(url)
  return promise.then(response => response.data)
}

const create = (newPerson) => {
  const promise = axios.post(url, newPerson)
  return promise.then(response => response.data)
}

const remove = (id) => {
  return axios.delete(`${url}/${id}`)
}

const update = (id, updatedPerson) => {
  const promise = axios.put(`${url}/${id}`, updatedPerson)
  return promise.then(response => response.data)
}

export default { getPersons, create, remove, update }
