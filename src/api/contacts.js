import axios from "axios";

const apiUrl = "https://Musaddiq101.github.io/Json-serve-contacts/db.json"

export default axios.create({
    baseURL: apiUrl,
})