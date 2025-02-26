import { Response, Request } from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { prisma } from '../config/database';

dotenv.config()


export const registerUser = async (req: Request, res: Response)=>{
    const {name, email, password, role} = req.body
    const hasheshedPassword = await bcrypt.hash(password, 10)
    try{
        const already_exists = await prisma.user.findUnique({where: {email}})
        if(already_exists){
            res.status(400).json({message: "Invalid email or password"})
            return
        }
        const user = await prisma.user.create({
            data: {name, email, password: hasheshedPassword, role, location:{
                lat: 6.59471,
                lng: 2.4
            }}
        })
        res.status(201).json({message: "User successfully registered"})
    }
    catch(error){
        res.status(500).json({message: "Error creating User", error })

    }
}
export const loginUser = async(req: Request, res: Response)=>{
    const {email, password} = req.body;
    const user = await prisma.user.findUnique({where: {email}})
    if(!user){
        res.status(400).json({mesage: "User does not exist"})
        return
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
         res.status(400).json({message: " Password Mismatch"})
         return
    }
    const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET!, {expiresIn: "1h"})
    res.status(200).json({message: "Login Successful", id: user.id,token})
}