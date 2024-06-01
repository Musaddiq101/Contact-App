import axios from "axios";

const apiUrl ="https://my-json-server.typicode.com/Musaddiq101/Json-serve-contacts";

export default axios.create({
    baseURL: apiUrl,
})