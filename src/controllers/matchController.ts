import { Request, Response } from "express";
import { calculateDistance } from "../utils/distanceCalculator";
import { error } from 'console';
import { prisma } from "../config/database";
import { Prisma } from "@prisma/client";



export const matchRiderWithDriver = async(req:Request, res: Response)=>{
    const {lat, lng} = req.body;

    try{
        const drivers = await prisma.user.findMany({
            where: {
                role: "DRIVER",
                location: {not: Prisma.DbNull},
      },
      select: {id: true,name: true, location: true, }


        })
        
        if(!drivers.length){
             res.status(404).json({mesage: "No available drivers found"})
             return
        }

        let nearestDriver: any = null;
        let minDistance = 1;

        drivers.forEach((driver)=>{
            const driverLocation = driver.location as {lat: number, lng: number};
            const distance = calculateDistance(lat, lng,driverLocation.lat, driverLocation.lng);
            if (distance < minDistance){
                minDistance = distance;
                nearestDriver = driver;
            }
           
            
        })
        if(!nearestDriver){
            res.status(404).json({message: "No available drivers near you"})
            return
        }

        res.status(200).json({message: "Driver Found", nearestDriver, distance: minDistance})
    }
    catch(error){
        res.status(500).json({message: "Error matching driver", error})

    }
}