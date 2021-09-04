import * as axios from 'axios'

export const instance = axios.create({      
    baseURL: 'https://fathomless-plains-19083.herokuapp.com/api/',    
})
instance.interceptors.request.use(function(config){
    config.headers.Authorization  = 'Bearer ' + localStorage.getItem('token')
    return config    
})