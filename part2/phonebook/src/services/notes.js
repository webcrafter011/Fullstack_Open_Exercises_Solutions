import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

export const getAll = () => {
  return axios
    .get(baseUrl)
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const addPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => response.data);
};

export const deletePerson = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then((response) => {
      console.log(`Deleted person with id ${id}`);
      return response.data;
    })
    .catch((e) => console.error(e));
};

export const updateNumber = (changedPerson) => {
  return axios.put(`${baseUrl}/${changedPerson.id}`, changedPerson).then((response) => {
    return response.data;
  });
};