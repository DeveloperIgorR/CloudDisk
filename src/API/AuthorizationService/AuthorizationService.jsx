import { instance } from "../instance"

export default class AuthorizationService {

    static async auth(email,password){
        return instance.post(`auth/login`,{
            email,
            password              
        })   
    }
    static async reg(email,password){
        return instance.post(`auth/registration`,{
            email,
            password              
        })   
    }   
}