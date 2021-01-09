import axios from "axios";
import qs from "qs";
axios.defaults.baseURL = "http://129.211.169.131:5000/";


const get = (url, data) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: data
        }).then((response) => {
            resolve(response.data)
        }).catch((err) => {
            reject(err)
        })
    })
}
const post = (url, data) => {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(data)).then((response) => {
            resolve(response.data)
        }).catch((err) => {
            reject(err)
        })
    })
}

export default {
    get,
    post
}