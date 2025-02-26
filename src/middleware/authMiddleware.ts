import { NextFunction, Request,Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export interface AuthRequest extends Request{
    user? : any
}

export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction): void =>{
    const token = req.header("Authorization")?.split(" ")[1];
    if(!token){
        res.status(401).json({message: "Access denied. No token provided"})
        return
    }
    try{
        const decoded= jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decoded;
        next()
    }
    catch(err){
        res.status(400).json({message: "Invalid Token"});
        return
    }
    
}

