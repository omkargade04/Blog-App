import { Request,Response } from "express"

export interface UserBody {
    body: {
    name:string,
    email:string,
    password:string,
    }

} 
export interface  ReqMid extends Request{
    user:{
        userId:number,
        name:string,
        email:string,
        password:string,
    }
    token: string
}
export interface Token {
    
}
