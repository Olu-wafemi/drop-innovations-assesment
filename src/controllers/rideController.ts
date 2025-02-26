import { Request, Response } from "express";
import { RideStatus } from "@prisma/client";
import { error } from "console";
import {AuthRequest} from "../middleware/authMiddleware"
import { prisma } from "../config/database";

export const createRide = async(req: Request, res: Response)=>{
    const {pickup, destination, fare} = req.body
    const authReq = req as AuthRequest
    const riderId = authReq.user!.id

    try{
        const ride = await prisma.ride.create({
            data: {
                pickup,
                destination,
                riderId,
                fare: parseFloat(fare),
                status: RideStatus.PENDING,
            }
        })
        res.status(201).json({message: "Ride created", ride})
    }
    catch(error){
        res.status(500).json({message: "Error creating ride", error})     
    }
}

export const getAvailableRides = async(req: Request, res: Response)=>{
    try{
        const rides = await prisma.ride.findMany({
            where: {status: RideStatus.PENDING}
        })
        res.status(200).json({message: "Fetched Successfully", rides})
    }
    catch(error){
        res.status(500).json({message: "Error retrieving rides", error})
    }
}

export const acceptRide = async (req: Request, res: Response)=>{
    const rideId = req.params.id;
    const authReq = req as AuthRequest
    const driverId = authReq.user!.id
    
    try{
        const ride = await prisma.ride.findUnique({where: {id: rideId }})
        if(!ride){
             res.status(404).json({message: "Ride not Found"})
             return
        }
        if(ride.status!= RideStatus.PENDING){
             res.status(400).json({message: "Ride already accepted or completed"})
             return
        }

        const updatedRide = await prisma.ride.update({
            where:{id: rideId},
            data: {
                driverId,
                status: RideStatus.ACCEPTED
            }
        })
        res.status(201).json({message: "Ride accepted", ride: updatedRide})
    }
    catch(error){
        res.status(500).json({message: "Error accepting ride", error})
    }
}

export const completeRide = async(req: Request, res: Response)=>{
    const rideId = req.params.id;
    const authReq = req as AuthRequest
    const driverId = authReq.user!.id
    try{
        const ride = await prisma.ride.findUnique({where: {id: rideId}});
        if(!ride){
            res.status(404).json({message: "Ride not Found"});
            return  
        }
        if(ride.driverId !== driverId){
             res.status(403).json({message: "You are not authorized to complete this ride"})
             return
        }
        if(ride.status !== RideStatus.ACCEPTED){
             res.status(400).json({message: "Ride is not in progress"})
             return
        }

        const updatedRide = await prisma.ride.update({
            where: {id: rideId},
            data:{status: RideStatus.COMPLETED}
        })
        res.status(200).json({message: "Ride Completed", updatedRide})
    }
    catch(error){
        res.status(500).json({message: "Error completing ride", error})
    }
}

export const getUserRides = async(req: Request, res: Response)=>{
    const userId = req.params.id;
    const check_user = await prisma.user.findUnique({where: {id: userId}})
    if(!userId){
        res.status(404).json({message: "User not Found"})
        return
    }
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);
    const skip = (page-1) * limit

    try{
        const rides = await prisma.ride.findMany({
            where:{
                OR:[{riderId: userId}, {driverId: userId}],
            },
            skip,
            take: limit,
            orderBy: {createdAt: "desc"}
        })

        res.status(200).json({message: "Fetched Successfully", page, limit , rides})
    }
    catch{
        res.status(500).json({message: "Error retrieving ride history", error})
    }
} 