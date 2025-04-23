import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const getAll = () => {
  return axios
    .get(baseUrl)
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const addPerson = (newPerson) => {
  return axios
    .post(baseUrl, newPerson)
    .then((response) => response.data)
    .catch((e) => {
      throw e;
    });
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
  return axios
    .put(`${baseUrl}/${changedPerson.id}`, changedPerson)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      throw e;
    });
};
