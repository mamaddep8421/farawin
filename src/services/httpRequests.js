import axios from "axios"
const BASE_API = "https://farawin.iran.liara.run/api"
export const register = (username, password,name)=>{
  return axios.post(`${BASE_API}/user`,{
    username,
    password,
    name
  })
}
export const login = (username, password)=>{
  return axios.post(`${BASE_API}/user/login`,{
    username,
    password
  })
}