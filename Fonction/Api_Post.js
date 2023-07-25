////////LIBRARY/////////
import axios from "axios"

export default function API_POST(){
    return axios.create({
        baseURL: 'http://localhost:8080/cw',
        Vary: "Access-Control-Allow-Origin"
    })
}