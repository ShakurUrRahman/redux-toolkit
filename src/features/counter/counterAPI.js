import axios from "../../utils/axios.config"

export const fetchSomething = async () => {
    const data = await axios.get('/something');
    return data.data
}

export const postSomething = async (somethingData) => {
    await axios.post('/something', somethingData);
}

export const deleteSomething = async (id) => {
    await axios.delete(`/something/${id}`);
}