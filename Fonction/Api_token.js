////////LIBRARY/////////
import axios from 'axios'
var token = localStorage.getItem('token');

export default function API_TOKEN(){
    return axios.create({
        baseURL: 'http://localhost:8080/cw',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        }
    })
}